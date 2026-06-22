/**
 * seed_evidence_verified.ts
 *
 * Rebuilds Supplifyed's evidence database using VERIFIED real citations.
 * Every evidence node stored satisfies ALL of:
 *   1. PMID resolves on PubMed AND the page title matches the stored title
 *   2. DOI is present and resolves via CrossRef API (status: ok)
 *   3. CrossRef title matches PubMed title (prevents hallucinated DOI ↔ PMID swaps)
 *
 * Run: npx tsx scripts/seed_evidence_verified.ts [--wipe] [--dry-run] [--limit=N]
 *
 * Flags:
 *   --wipe       Delete all existing evidence and supported_by records first
 *   --dry-run    Print what would be inserted but don't write to DB
 *   --limit=N    Only process first N ingredients (useful for testing)
 *
 * Rate limits (NCBI without API key: 3 req/s):
 *   PUBMED_DELAY_MS  = 400ms between NCBI calls
 *   CROSSREF_DELAY_MS = 350ms between CrossRef calls
 *   Set NCBI_API_KEY env var to raise NCBI limit to 10 req/s and reduce delay.
 */

import { Surreal, RecordId } from 'surrealdb';
import * as https from 'https';

// ─── CONFIG ──────────────────────────────────────────────────────────────────

const NCBI_API_KEY    = process.env.NCBI_API_KEY ?? '';
const PUBMED_DELAY    = NCBI_API_KEY ? 120 : 400; // ms between NCBI requests
const CROSSREF_DELAY  = 350;                       // ms between CrossRef requests
const MAX_PAPERS      = 4;  // PubMed results to fetch per ingredient (we keep those with verified DOIs)
const TITLE_MATCH_MIN = 0.5; // Fraction of words in CrossRef title that must appear in PubMed title

const args   = process.argv.slice(2);
const WIPE    = args.includes('--wipe');
const DRY_RUN = args.includes('--dry-run');
const LIMIT   = (() => {
  const a = args.find(a => a.startsWith('--limit='));
  return a ? parseInt(a.slice(8), 10) : Infinity;
})();

// ─── DB ──────────────────────────────────────────────────────────────────────

async function connectDb(): Promise<Surreal> {
  const db = new Surreal();
  await db.connect(process.env.SURREALDB_URL ?? 'http://localhost:8000');
  await db.signin({
    username: process.env.SURREALDB_USER ?? 'root',
    password: process.env.SURREALDB_PASS ?? 'root',
  });
  await db.use({
    namespace: process.env.SURREALDB_NS ?? 'supplifyed',
    database:  process.env.SURREALDB_DB ?? 'production',
  });
  return db;
}

// ─── HTTP ────────────────────────────────────────────────────────────────────

function fetchJson(url: string, timeoutMs = 12_000): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Supplifyed/1.0 (evidence-verification; contact@supplifyed.com)',
        'Accept':     'application/json',
      },
    }, (res) => {
      let body = '';
      res.on('data', (chunk: string) => { body += chunk; });
      res.on('end', () => {
        try   { resolve(JSON.parse(body) as Record<string, unknown>); }
        catch { reject(new Error(`Invalid JSON from ${url.slice(0, 80)}`)); }
      });
    });
    req.setTimeout(timeoutMs, () => { req.destroy(); reject(new Error('Timeout')); });
    req.on('error', reject);
  });
}

function fetchText(url: string, timeoutMs = 12_000): Promise<string> {
  return new Promise((resolve) => {
    const req = https.get(url, {
      headers: { 'User-Agent': 'Supplifyed/1.0' },
    }, (res) => {
      let body = '';
      res.on('data', (chunk: string) => { body += chunk; });
      res.on('end', () => resolve(body));
    });
    req.setTimeout(timeoutMs, () => { req.destroy(); resolve(''); });
    req.on('error', () => resolve(''));
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface PubMedSummary {
  pmid:    string;
  title:   string;
  authors: string;
  year:    number;
  journal: string;
  doi:     string;
}

interface CrossRefResult {
  verified: boolean;
  title?:   string;
  authors?: string;
  year?:    number;
  journal?: string;
}

// ─── PUBMED SEARCH ───────────────────────────────────────────────────────────

async function searchPubMed(ingredientName: string): Promise<string[]> {
  const term  = `"${ingredientName}"[Title/Abstract] AND (supplement OR "clinical trial" OR randomized OR "systematic review" OR "meta-analysis" OR human)[Title/Abstract]`;
  const key   = NCBI_API_KEY ? `&api_key=${NCBI_API_KEY}` : '';
  const url   = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(term)}&retmax=${MAX_PAPERS + 2}&retmode=json&sort=relevance${key}`;

  try {
    const data = await fetchJson(url);
    const ids  = ((data.esearchresult as Record<string, unknown>)?.idlist as string[]) ?? [];
    return ids.slice(0, MAX_PAPERS + 2);
  } catch {
    return [];
  }
}

// ─── PUBMED DETAILS ──────────────────────────────────────────────────────────

async function fetchPubMedDetails(pmids: string[]): Promise<PubMedSummary[]> {
  if (!pmids.length) return [];
  const key = NCBI_API_KEY ? `&api_key=${NCBI_API_KEY}` : '';
  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${pmids.join(',')}&retmode=json${key}`;

  try {
    const data   = await fetchJson(url);
    const result = data.result as Record<string, Record<string, unknown>>;

    return pmids
      .filter(id => result[id] && !result[id].error)
      .map(id => {
        const p       = result[id];
        const ids     = (p.articleids as { idtype: string; value: string }[]) ?? [];
        const doi     = ids.find(a => a.idtype === 'doi')?.value ?? '';
        const yearRaw = (p.pubdate as string)?.slice(0, 4);
        const year    = parseInt(yearRaw ?? '0', 10);
        const authors = ((p.authors as { name: string }[]) ?? [])
          .slice(0, 4).map(a => a.name).filter(Boolean).join(', ');

        return {
          pmid:    id,
          title:   (p.title as string) ?? '',
          authors: authors || 'et al.',
          year:    isNaN(year) ? 0 : year,
          journal: (p.source as string) ?? '',
          doi,
        };
      })
      .filter(p => p.title.length > 10 && p.year >= 1990);
  } catch {
    return [];
  }
}

// ─── CROSSREF VERIFY ─────────────────────────────────────────────────────────
// Uses the filter search endpoint rather than the single-work /works/{doi}
// endpoint because Node.js https path encoding causes 400s on the latter.
// /works?filter=doi:{doi}&select=... returns the same data correctly.

async function verifyDoi(doi: string): Promise<CrossRefResult> {
  if (!doi) return { verified: false };

  try {
    const encodedDoi = encodeURIComponent(doi);
    const fields     = 'DOI,title,author,published,container-title';
    const path       = `/works?filter=doi:${encodedDoi}&select=${fields}&rows=1`;
    const url        = `https://api.crossref.org${path}`;
    const data       = await fetchJson(url);

    if (data.status !== 'ok' || !data.message) return { verified: false };

    const msg   = data.message as Record<string, unknown>;
    const items = (msg.items as Record<string, unknown>[]) ?? [];
    if (!items.length) return { verified: false };

    const item    = items[0];
    const titles  = item.title as string[] | undefined;
    const title   = titles?.[0] ?? '';
    const authors = ((item.author as { family?: string; given?: string }[]) ?? [])
      .slice(0, 3)
      .map(a => `${a.family ?? ''} ${a.given ? a.given[0] + '.' : ''}`.trim())
      .filter(Boolean).join(', ');
    const dateParts = (item.published as { 'date-parts': number[][] } | undefined)?.['date-parts'];
    const year      = dateParts?.[0]?.[0];
    const ctitles   = item['container-title'] as string[] | undefined;
    const journal   = ctitles?.[0] ?? '';

    return { verified: !!title, title, authors, year, journal };
  } catch {
    return { verified: false };
  }
}

// ─── TITLE SIMILARITY CHECK ──────────────────────────────────────────────────
// Prevents a valid DOI+PMID pair where the DOI belongs to a different paper.

function titlesAlign(pubmedTitle: string, crossrefTitle: string): boolean {
  if (!pubmedTitle || !crossrefTitle) return false;

  const normalize = (s: string) =>
    s.toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 3);

  const pm   = new Set(normalize(pubmedTitle));
  const cr   = normalize(crossrefTitle);
  if (!cr.length) return false;

  const overlap = cr.filter(w => pm.has(w)).length;
  return overlap / cr.length >= TITLE_MATCH_MIN;
}

// ─── INGREDIENT RELEVANCE CHECK ──────────────────────────────────────────────
// Rejects real-but-irrelevant papers (PubMed may match the ingredient name
// deep in an abstract unrelated to supplementation of that compound).
// At least one meaningful token from the ingredient name must appear in
// the CrossRef title or the abstract text.

function isPaperRelevant(ingredientName: string, crTitle: string, abstractText: string): boolean {
  // Build a set of meaningful tokens from the ingredient name
  // Strip common prefixes (L-, D-, N-, dl-, alpha-, beta-)
  const cleaned = ingredientName
    .toLowerCase()
    .replace(/\b(l-|d-|dl-|n-|alpha-|beta-|gamma-)\b/g, '')
    .replace(/[^a-z0-9\s]/g, ' ');

  const tokens = cleaned.split(/\s+/).filter(t => t.length >= 3);
  if (!tokens.length) return true; // can't check — assume relevant

  const haystack = `${crTitle} ${abstractText}`.toLowerCase();

  // At least one core token must appear in the title+abstract
  return tokens.some(tok => haystack.includes(tok));
}

// ─── FETCH ABSTRACT TEXT ─────────────────────────────────────────────────────

async function fetchAbstract(pmid: string): Promise<string> {
  const key = NCBI_API_KEY ? `&api_key=${NCBI_API_KEY}` : '';
  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pmid}&rettype=abstract&retmode=text${key}`;
  const raw = await fetchText(url);

  // PubMed plain text: first lines are citation metadata, abstract starts after blank line + title
  const lines = raw.split('\n').map(l => l.trim()).filter(l => l.length > 30);

  // Try to grab lines that look like actual abstract content (skip citation header)
  const abstractLines: string[] = [];
  let pastHeader = false;
  for (const line of lines) {
    if (!pastHeader) {
      // Abstract content begins after journal citation line (contains year + volume)
      if (/\b(BACKGROUND|OBJECTIVE|PURPOSE|AIM|INTRODUCTION|METHODS|RESULTS|CONCLUSION|ABSTRACT)\b/i.test(line)) {
        pastHeader = true;
        continue;
      }
      // Also start after 5th line regardless
      if (lines.indexOf(line) >= 5) pastHeader = true;
    }
    if (pastHeader) {
      abstractLines.push(line);
      if (abstractLines.join(' ').length > 350) break;
    }
  }

  return abstractLines.join(' ').replace(/\s+/g, ' ').trim().slice(0, 400);
}

// ─── INFER FUNDING ───────────────────────────────────────────────────────────

function inferFundedBy(
  paper: PubMedSummary,
  abstractText: string,
): 'independent' | 'manufacturer' | 'government' | 'unknown' {
  const corpus = `${paper.title} ${paper.journal} ${abstractText}`.toLowerCase();

  // Government / public-institution signals
  if (/\b(cochrane|nih|nccih|nccam|nsf|wellcome trust|medical research council|public health|funded by.*grant|supported by.*nih|supported by.*nccih|national institute)\b/.test(corpus)) {
    return 'government';
  }
  // Major independent journals
  const journalL = paper.journal.toLowerCase();
  if (/\b(new england journal|lancet|british medical journal|bmj|jama|plos|annals of internal medicine|cochrane database)\b/.test(journalL)) {
    return 'independent';
  }
  // Manufacturer / industry signals
  if (/\b(sponsored by|provided by|suntheanine|naturex|sabinsa|kemin|chromadex|dsm|lonza|manufacturer funded|industry funded|company funded)\b/.test(corpus)) {
    return 'manufacturer';
  }
  // Sports nutrition journals lean manufacturer-adjacent
  if (/\b(jissn|international society of sports nutrition|sports nutrition)\b/.test(journalL)) {
    return 'manufacturer';
  }
  // Academic journals with no industry signals → independent
  if (/\b(american journal|european journal|journal of clinical|journal of nutrition|clinical pharmacology|pharmacology|neuroscience|nutrients)\b/.test(journalL)) {
    return 'independent';
  }

  return 'unknown';
}

// ─── EXTRACT DOSE FROM ABSTRACT ──────────────────────────────────────────────

function extractDose(text: string): string {
  const matches = text.match(/\d+(?:\.\d+)?\s*(?:mg\/(?:day|kg|d)|g\/(?:day|kg|d)|μg\/(?:day|kg)|mcg\/(?:day|kg)|IU\/(?:day|kg)|mg|g|μg|mcg|IU)\b/gi);
  if (!matches?.length) return 'See full paper';
  const unique = [...new Set(matches.map(m => m.trim()))].slice(0, 3);
  return unique.join(', ');
}

// ─── INFER DIRECTION ─────────────────────────────────────────────────────────

function inferDirection(title: string, abstractText: string): 'supports' | 'neutral' | 'contradicts' {
  const corpus = `${title} ${abstractText}`.toLowerCase();

  if (/\b(harmful|adverse effect|toxic|increased risk|worsened|dangerous|detrimental|contraindicated)\b/.test(corpus)) {
    return 'contradicts';
  }
  if (/\b(no significant|no effect|did not|failed to|ineffective|no benefit|no difference|not statistically|null)\b/.test(corpus)) {
    return 'neutral';
  }
  return 'supports';
}

// ─── RECORD ID HELPERS ───────────────────────────────────────────────────────

function toRecordId(table: string, id: string): RecordId {
  return new RecordId(table, id);
}

function evidenceRecordId(pmid: string, ingredientSlug: string): RecordId {
  return toRecordId('evidence', `${pmid}-${ingredientSlug}`);
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log('');
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║  Supplifyed — Verified Evidence Pipeline             ║');
  console.log('╚══════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`Mode:    ${DRY_RUN ? 'DRY RUN (no writes)' : 'LIVE'}`);
  console.log(`Wipe:    ${WIPE ? 'YES — deleting existing evidence first' : 'NO — upserting on top of existing'}`);
  console.log(`Limit:   ${isFinite(LIMIT) ? `${LIMIT} ingredients` : 'all ingredients'}`);
  console.log(`NCBI:    ${NCBI_API_KEY ? 'API key present (10 req/s)' : 'No key (3 req/s)'}`);
  console.log('');

  const db = await connectDb();
  console.log('✓ Connected to SurrealDB\n');

  // ── Pre-flight: count existing records ──────────────────────────────────────
  const evBeforeRes = await db.query<{ count: number }[][]>('SELECT count() FROM evidence GROUP ALL');
  const edBeforeRes = await db.query<{ count: number }[][]>('SELECT count() FROM supported_by GROUP ALL');
  const evBefore = evBeforeRes[0]?.[0]?.count ?? 0;
  const edBefore = edBeforeRes[0]?.[0]?.count ?? 0;
  console.log(`Before: ${evBefore} evidence nodes, ${edBefore} supported_by edges`);

  // ── Wipe ────────────────────────────────────────────────────────────────────
  if (WIPE && !DRY_RUN) {
    console.log('\n⚠  Wiping existing evidence and supported_by records…');
    await db.query('DELETE evidence');
    await db.query('DELETE supported_by');
    console.log('✓ Wiped\n');
  }

  // ── Fetch all ingredients ───────────────────────────────────────────────────
  const [ingredients] = await db.query<{ id: string | RecordId; name: string; slug: string; category: string }[][]>(
    'SELECT id, name, slug, category FROM ingredient ORDER BY name'
  );

  const batch = isFinite(LIMIT) ? ingredients.slice(0, LIMIT) : ingredients;
  console.log(`Processing ${batch.length} of ${ingredients.length} ingredients…\n`);

  let verified   = 0;
  let rejected   = 0;
  let errors     = 0;
  let totalEdges = 0;

  for (const ingredient of batch) {
    const { name, slug, category } = ingredient;
    const ingRecordId = toRecordId('ingredient', slug);

    console.log(`\n── ${name} (${category})`);

    // ── PubMed search ─────────────────────────────────────────────────────────
    await sleep(PUBMED_DELAY);
    const pmids = await searchPubMed(name);

    if (!pmids.length) {
      console.log('  ⚠  No PubMed results');
      continue;
    }

    // ── Fetch paper summaries ──────────────────────────────────────────────────
    await sleep(PUBMED_DELAY);
    const papers = await fetchPubMedDetails(pmids);

    // Only process papers that have a DOI — no DOI = cannot CrossRef-verify
    const papersWithDoi = papers.filter(p => p.doi.length > 5);
    if (!papersWithDoi.length) {
      console.log('  ⚠  No papers with DOIs found');
      continue;
    }

    let stored = 0;

    for (const paper of papersWithDoi.slice(0, MAX_PAPERS)) {
      // ── CrossRef verification ───────────────────────────────────────────────
      await sleep(CROSSREF_DELAY);
      const cr = await verifyDoi(paper.doi);

      if (!cr.verified) {
        console.log(`  ✗ CrossRef 404: ${paper.doi}`);
        rejected++;
        continue;
      }

      // ── Title alignment check ───────────────────────────────────────────────
      // Guards against hallucinated DOI/PMID swaps where both individually exist
      // but belong to different papers
      const aligned = titlesAlign(paper.title, cr.title ?? '');
      if (!aligned) {
        console.log(`  ✗ Title mismatch (DOI belongs to different paper): ${paper.doi.slice(0, 40)}`);
        console.log(`    PubMed: ${paper.title.slice(0, 60)}`);
        console.log(`    CrossRef: ${(cr.title ?? '').slice(0, 60)}`);
        rejected++;
        continue;
      }

      // ── Fetch abstract ──────────────────────────────────────────────────────
      await sleep(PUBMED_DELAY);
      const abstractText = await fetchAbstract(paper.pmid);

      // ── Relevance check ─────────────────────────────────────────────────────
      // Reject papers that are verified real DOIs but irrelevant to this
      // ingredient (e.g. PubMed matched the name deep in an unrelated abstract)
      if (!isPaperRelevant(name, cr.title ?? paper.title, abstractText)) {
        console.log(`  ✗ Irrelevant (name absent from title+abstract): PMID ${paper.pmid}`);
        rejected++;
        continue;
      }

      // ── Build evidence record ───────────────────────────────────────────────
      const evId       = evidenceRecordId(paper.pmid, slug);
      const title      = cr.title ?? paper.title;
      const authors    = cr.authors ?? paper.authors;
      const year       = cr.year ?? paper.year;
      const journal    = cr.journal ?? paper.journal;
      const funded_by  = inferFundedBy(paper, abstractText);
      const direction  = inferDirection(title, abstractText);
      const dose       = extractDose(abstractText);
      const finding    = abstractText || `${title}. Published ${year} in ${journal}.`;
      const outcome    = `${title.slice(0, 120)}${title.length > 120 ? '…' : ''} — CrossRef-verified DOI ${paper.doi}`;
      const relevance  = `PMID ${paper.pmid} · DOI ${paper.doi} · CrossRef-verified ${new Date().toISOString().slice(0, 10)}`;

      if (DRY_RUN) {
        console.log(`  [DRY] PMID ${paper.pmid} — ${title.slice(0, 65)}`);
        console.log(`        DOI: ${paper.doi} | Year: ${year} | Direction: ${direction} | Funded: ${funded_by}`);
        verified++;
        totalEdges++;
        stored++;
        continue;
      }

      // ── Upsert evidence node ────────────────────────────────────────────────
      try {
        await (db.upsert(evId) as unknown as { content: (d: object) => Promise<unknown> }).content({
          title, authors, year, journal,
          doi:          paper.doi,
          link:         `https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/`,
          funded_by,
          finding:      finding.slice(0, 600),
          dose_studied: dose,
          outcome:      outcome.slice(0, 300),
        });

        // ── Create SUPPORTED_BY edge ──────────────────────────────────────────
        await db.query(
          `RELATE $ingId->supported_by->$evId SET relevance = $relevance, direction = $direction`,
          { ingId: ingRecordId, evId, relevance, direction }
        );

        console.log(`  ✓ PMID ${paper.pmid} [${direction.padEnd(11)} / ${funded_by}] ${title.slice(0, 55)}…`);
        verified++;
        totalEdges++;
        stored++;
      } catch (err) {
        console.error(`  ✗ DB error for PMID ${paper.pmid}: ${err}`);
        errors++;
      }
    }

    if (stored === 0) {
      console.log('  ⚠  No verified papers stored for this ingredient');
    }
  }

  // ── Summary ──────────────────────────────────────────────────────────────────
  if (!DRY_RUN) {
    const evAfterRes = await db.query<{ count: number }[][]>('SELECT count() FROM evidence GROUP ALL');
    const edAfterRes = await db.query<{ count: number }[][]>('SELECT count() FROM supported_by GROUP ALL');
    const evAfter = evAfterRes[0]?.[0]?.count ?? 0;
    const edAfter = edAfterRes[0]?.[0]?.count ?? 0;

    console.log('');
    console.log('╔══════════════════════════════════════════════════════╗');
    console.log('║  Complete                                            ║');
    console.log('╚══════════════════════════════════════════════════════╝');
    console.log(`Evidence before: ${evBefore}  →  after: ${evAfter}  (net ${evAfter - evBefore >= 0 ? '+' : ''}${evAfter - evBefore})`);
    console.log(`Edges    before: ${edBefore}  →  after: ${edAfter}  (net ${edAfter - edBefore >= 0 ? '+' : ''}${edAfter - edBefore})`);
  } else {
    console.log('');
    console.log('── DRY RUN SUMMARY ───────────────────────────────────');
    console.log(`Would insert: ${verified} evidence nodes, ${totalEdges} edges`);
  }

  console.log(`Verified:  ${verified}`);
  console.log(`Rejected:  ${rejected}  (DOI 404, CrossRef miss, or title mismatch)`);
  console.log(`DB errors: ${errors}`);
  console.log('');

  await db.close();

  if (errors > 0) process.exit(1);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
