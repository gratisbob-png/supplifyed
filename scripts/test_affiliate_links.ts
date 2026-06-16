/**
 * Verifies all affiliate links are correctly formatted.
 * Checks format, tag presence, generic links, and link counts.
 * Does NOT make HTTP requests — use npm run links:check for live status checks.
 *
 * Run: npm run test:affiliate-links
 */

import { Surreal } from 'surrealdb';

async function connectDb(): Promise<Surreal> {
  const url = process.env.SURREALDB_URL ?? 'http://localhost:8000';
  const ns = process.env.SURREALDB_NS ?? 'supplifyed';
  const database = process.env.SURREALDB_DB ?? 'production';
  const username = process.env.SURREALDB_USER ?? 'root';
  const password = process.env.SURREALDB_PASS ?? 'root';

  const db = new Surreal();
  await db.connect(url);
  await db.signin({ username, password });
  await db.use({ namespace: ns, database });
  return db;
}

interface DBProduct {
  id: string;
  name: string;
  asin: string;
  tier: string;
  link_amazon: string;
  link_generic: string | null;
  link_official: string | null;
  link_status: string;
}

interface TestResult {
  name: string;
  passed: boolean;
  detail?: string;
}

async function runTests(db: Surreal): Promise<TestResult[]> {
  const results: TestResult[] = [];

  const tag = process.env.AMAZON_PARTNER_TAG ?? 'supplifyed-21';

  const [products] = await db.query<DBProduct[][]>(
    `SELECT id, name, asin, tier, link_amazon, link_generic, link_official, link_status FROM product`
  );

  const all = products ?? [];

  // ── 1. Product count ────────────────────────────────────────────────────────
  results.push({
    name: `30 products in database (found ${all.length})`,
    passed: all.length === 30,
  });

  // ── 2. All Amazon links contain the affiliate tag ──────────────────────────
  const missingTag = all.filter((p) => !p.link_amazon.includes(`tag=${tag}`));
  results.push({
    name: `All Amazon links contain affiliate tag (tag=${tag})`,
    passed: missingTag.length === 0,
    detail: missingTag.length > 0
      ? `${missingTag.length} missing: ${missingTag.map((p) => p.name).join(', ')}`
      : undefined,
  });

  // ── 3. Amazon link format: /dp/ASIN?tag= ──────────────────────────────────
  const badFormat = all.filter((p) => {
    const expected = `https://www.amazon.co.uk/dp/${p.asin}?tag=${tag}`;
    return p.link_amazon !== expected;
  });
  results.push({
    name: 'All Amazon links match expected format (amazon.co.uk/dp/ASIN?tag=)',
    passed: badFormat.length === 0,
    detail: badFormat.length > 0
      ? badFormat.map((p) => `${p.name}: ${p.link_amazon}`).join('\n    ')
      : undefined,
  });

  // ── 4. All products have a generic ingredient link ─────────────────────────
  const noGeneric = all.filter((p) => !p.link_generic);
  results.push({
    name: 'All products have a generic ingredient link (link_generic)',
    passed: noGeneric.length === 0,
    detail: noGeneric.length > 0
      ? `${noGeneric.length} missing: ${noGeneric.map((p) => p.name).join(', ')}`
      : undefined,
  });

  // ── 5. Generic links contain affiliate tag ────────────────────────────────
  const genericMissingTag = all.filter((p) => p.link_generic && !p.link_generic.includes(`tag=${tag}`));
  results.push({
    name: 'All generic links contain affiliate tag',
    passed: genericMissingTag.length === 0,
    detail: genericMissingTag.length > 0
      ? `${genericMissingTag.length} missing tag: ${genericMissingTag.map((p) => p.name).join(', ')}`
      : undefined,
  });

  // ── 6. Generic links use Amazon search format (/s?k=) ─────────────────────
  const badGenericFormat = all.filter((p) => p.link_generic && !p.link_generic.includes('amazon.co.uk/s?k='));
  results.push({
    name: 'All generic links use Amazon search format (amazon.co.uk/s?k=)',
    passed: badGenericFormat.length === 0,
    detail: badGenericFormat.length > 0
      ? badGenericFormat.map((p) => `${p.name}: ${p.link_generic}`).join('\n    ')
      : undefined,
  });

  // ── 7. All products have link_status = live ────────────────────────────────
  const notLive = all.filter((p) => p.link_status !== 'live');
  results.push({
    name: 'All products have link_status = live at seed time',
    passed: notLive.length === 0,
    detail: notLive.length > 0
      ? `${notLive.length} not live: ${notLive.map((p) => `${p.name} (${p.link_status})`).join(', ')}`
      : undefined,
  });

  // ── 8. Count links per product (each should have 2-3 links) ───────────────
  const linkCounts = all.map((p) => ({
    name: p.name,
    count: [p.link_amazon, p.link_generic, p.link_official].filter(Boolean).length,
  }));
  const tooFewLinks = linkCounts.filter((p) => p.count < 2);
  results.push({
    name: 'All products have at least 2 links (Amazon + generic)',
    passed: tooFewLinks.length === 0,
    detail: tooFewLinks.length > 0
      ? tooFewLinks.map((p) => `${p.name} (${p.count} links)`).join(', ')
      : undefined,
  });

  // ── 9. Three links distribution ────────────────────────────────────────────
  const threeLinks = linkCounts.filter((p) => p.count === 3).length;
  const twoLinks = linkCounts.filter((p) => p.count === 2).length;
  results.push({
    name: `Link distribution: ${threeLinks} products with 3 links (incl. official), ${twoLinks} with 2`,
    passed: true, // informational
    detail: 'Official links are optional — only products with submitted store URLs have 3 links',
  });

  // ── 10. Amazon ASINs are non-empty and 10 chars ────────────────────────────
  const badAsins = all.filter((p) => !p.asin || p.asin.length !== 10);
  results.push({
    name: 'All ASINs are 10 characters (valid Amazon ASIN format)',
    passed: badAsins.length === 0,
    detail: badAsins.length > 0
      ? `${badAsins.length} invalid: ${badAsins.map((p) => `${p.name} (${p.asin})`).join(', ')}`
      : undefined,
  });

  return results;
}

async function testAffiliateLinks() {
  const tag = process.env.AMAZON_PARTNER_TAG ?? 'supplifyed-21';
  console.log(`Affiliate Link Verification (tag: ${tag})\n`);

  const db = await connectDb();
  const results = await runTests(db);
  await db.close();

  let passed = 0;
  let failed = 0;

  for (const r of results) {
    if (r.passed) {
      const detail = r.detail ? ` — ${r.detail}` : '';
      console.log(`  ✓ ${r.name}${detail}`);
      passed++;
    } else {
      console.log(`  ✗ ${r.name}`);
      if (r.detail) console.log(`    ${r.detail}`);
      failed++;
    }
  }

  console.log(`\n${passed}/${results.length} checks passed`);

  if (failed > 0) {
    console.error('\nAffiliate link checks failed. Fix before deploying.');
    process.exit(1);
  }

  console.log('\nAll affiliate links verified.');
  console.log('Note: Run npm run links:check to verify links are live (makes HTTP requests).');
}

testAffiliateLinks().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
