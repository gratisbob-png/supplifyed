/**
 * Automation pipeline — runs a new product through all stages.
 *
 * Pipeline order (per SPEC_06_automation_layer):
 *   fetch → extract_label → classify_tier → identify_generic →
 *   generate_links → publish → [queue_evidence if new ingredient]
 *
 * PA API stages skip gracefully when credentials are absent.
 * Set AMAZON_ACCESS_KEY + AMAZON_SECRET_KEY in .env.local to activate.
 */

import { Surreal, RecordId } from 'surrealdb';
import { loadConfig, getItems } from './pa_api';
import { generateAmazonLink, generateGenericSearchLink } from './affiliate';
import { classifyTiers } from './tier_classifier';

// ─── Pipeline state ────────────────────────────────────────────────────────────

export type PipelineStatus =
  | 'queued'
  | 'fetching'
  | 'extracting'
  | 'classifying'
  | 'linking'
  | 'publishing'
  | 'live'
  | 'failed';

export interface PipelineState {
  asin: string;
  subcategory: string;
  status: PipelineStatus;

  // Data accumulated through stages
  product_id?: string;
  name?: string;
  brand_name?: string;
  brand_website?: string;
  price?: number;
  currency?: string;
  features: string[];
  image_url?: string;
  packet_text?: string;
  certifications: string[];

  tier?: 'aspiration' | 'rational' | 'economic';
  tier_confidence?: 'high' | 'medium' | 'low';

  link_amazon?: string;
  link_official?: string;
  link_generic?: string;

  primary_ingredient_name?: string;
  primary_ingredient_slug?: string;
  is_new_ingredient?: boolean;

  flags: string[];
  errors: string[];
  started_at: Date;
  completed_at?: Date;
}

function makeState(asin: string, subcategory: string): PipelineState {
  return {
    asin,
    subcategory,
    status: 'queued',
    features: [],
    certifications: [],
    flags: [],
    errors: [],
    started_at: new Date(),
  };
}

// ─── Exception helper ──────────────────────────────────────────────────────────

async function flag(
  db: Surreal,
  type: 'content' | 'data' | 'tier' | 'submission' | 'link' | 'pipeline',
  severity: 'critical' | 'warning' | 'info',
  description: string,
  nodeId?: string,
  context?: string
): Promise<void> {
  // Use a timestamp-based ID and upsert — avoids db.create null-vs-NONE issues with SCHEMAFULL
  const id = new RecordId('exceptions', Date.now().toString(36) + Math.random().toString(36).slice(2, 6));
  await db.upsert(id).content({
    type,
    severity,
    description,
    flagged_at: new Date(),
    resolved: false,
    ...(nodeId  ? { node_id: nodeId }  : {}),
    ...(context ? { context }          : {}),
  });
}

// ─── Stage 1: Fetch product data ───────────────────────────────────────────────

export async function stageFetch(state: PipelineState): Promise<PipelineState> {
  const config = loadConfig();

  if (!config) {
    state.flags.push('PA_API_UNAVAILABLE: skipped fetch stage — using placeholder data');
    state.features = ['PA API credentials required for live product data'];
    return state;
  }

  state.status = 'fetching';
  const { items, errors } = await getItems([state.asin], config);

  if (errors.length > 0) {
    state.errors.push(...errors.map((e) => `PA API [${e.code}]: ${e.message}`));
  }

  const item = items[0];
  if (!item) {
    state.status = 'failed';
    state.errors.push(`ASIN ${state.asin} not found in PA API response`);
    return state;
  }

  state.name = item.title || undefined;
  state.price = item.price;
  state.currency = item.currency ?? 'GBP';
  state.features = item.features;
  state.image_url = item.imageUrl;

  return state;
}

// ─── Stage 2: Extract label text ───────────────────────────────────────────────

export function stageExtractLabel(state: PipelineState): PipelineState {
  state.status = 'extracting';

  if (state.features.length === 0) {
    state.flags.push('LABEL_EMPTY: no features from API — packet_text will be empty');
    return state;
  }

  // Convert features array to clean packet text
  const raw = state.features.join('\n');
  // Strip HTML tags, normalise whitespace, preserve numbers and units
  const cleaned = raw
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();

  // Enforce 2000 char limit, break at sentence boundary
  if (cleaned.length > 2000) {
    const truncated = cleaned.slice(0, 2000);
    const lastStop = Math.max(
      truncated.lastIndexOf('. '),
      truncated.lastIndexOf('.\n')
    );
    state.packet_text = lastStop > 1500 ? truncated.slice(0, lastStop + 1) : truncated;
    state.flags.push('LABEL_TRUNCATED: packet_text truncated at 2000 chars');
  } else {
    state.packet_text = cleaned;
  }

  return state;
}

// ─── Stage 3: Classify tier ────────────────────────────────────────────────────

export async function stageClassifyTier(
  state: PipelineState,
  db: Surreal
): Promise<PipelineState> {
  state.status = 'classifying';

  if (!state.price) {
    state.tier = 'rational';
    state.tier_confidence = 'low';
    state.flags.push('TIER_NO_PRICE: no price data — defaulted to rational, low confidence');
    return state;
  }

  // Fetch existing products in same subcategory for relative comparison
  const [peers] = await db.query<{ asin: string; rrp: number; certifications: string[] }[][]>(
    `SELECT asin, rrp, certifications FROM product
     WHERE ->contains->ingredient.category = $cat
       AND link_status = 'live'
     LIMIT 20`,
    { cat: state.subcategory }
  );

  const peerList = (peers ?? []).map((p) => ({
    asin: p.asin,
    name: p.asin,
    rrp: Number(p.rrp),
    certifications: p.certifications ?? [],
  }));

  // Add the incoming product to the comparison set
  peerList.push({
    asin: state.asin,
    name: state.asin,
    rrp: state.price,
    certifications: state.certifications,
  });

  if (peerList.length < 3) {
    state.tier = 'rational';
    state.tier_confidence = 'low';
    state.flags.push('TIER_INSUFFICIENT_PEERS: fewer than 3 peers — defaulted to rational, low confidence');
    return state;
  }

  const classified = classifyTiers(peerList);
  const result = classified.find((p) => p.asin === state.asin);

  if (!result) {
    state.tier = 'rational';
    state.tier_confidence = 'low';
    state.flags.push('TIER_CLASSIFY_FAILED: classification error — defaulted to rational');
    return state;
  }

  state.tier = result.assigned_tier;
  state.tier_confidence = 'high';

  return state;
}

// ─── Stage 4: Identify generic ingredient ─────────────────────────────────────

export async function stageIdentifyGeneric(
  state: PipelineState,
  db: Surreal
): Promise<PipelineState> {
  // Try to match against known ingredients by name from features/packet_text
  const content = [state.name ?? '', ...(state.features ?? [])].join(' ').toLowerCase();

  const [ingredients] = await db.query<{ name: string; slug: string; category: string }[][]>(
    `SELECT name, slug, category FROM ingredient ORDER BY name`
  );

  let matched: { name: string; slug: string; category: string } | undefined;
  let bestScore = 0;

  for (const ing of ingredients ?? []) {
    const ingLower = ing.name.toLowerCase();
    if (content.includes(ingLower)) {
      // Prefer longer matches (more specific ingredients)
      if (ingLower.length > bestScore) {
        bestScore = ingLower.length;
        matched = ing;
      }
    }
  }

  if (matched) {
    state.primary_ingredient_name = matched.name;
    state.primary_ingredient_slug = matched.slug;

    // Check if ingredient already in graph
    const [existing] = await db.query<unknown[][]>(
      `SELECT id FROM ingredient WHERE slug = $slug`,
      { slug: matched.slug }
    );
    state.is_new_ingredient = (existing ?? []).length === 0;
  } else {
    state.flags.push('GENERIC_UNMATCHED: could not match product to known ingredient — generic link empty');
  }

  return state;
}

// ─── Stage 5: Generate links ───────────────────────────────────────────────────

export function stageGenerateLinks(state: PipelineState): PipelineState {
  state.link_amazon = generateAmazonLink(state.asin);

  if (state.primary_ingredient_name) {
    state.link_generic = generateGenericSearchLink(state.primary_ingredient_name);
  } else {
    state.flags.push('LINK_NO_GENERIC: no primary ingredient identified — generic link omitted');
  }

  return state;
}

// ─── Stage 6: Publish to graph ─────────────────────────────────────────────────

export async function stagePublish(
  state: PipelineState,
  db: Surreal
): Promise<PipelineState> {
  state.status = 'publishing';

  if (!state.name) {
    state.status = 'failed';
    state.errors.push('PUBLISH_BLOCKED: product name missing — cannot publish');
    await flag(db, 'pipeline', 'critical', `ASIN ${state.asin}: missing name — publish blocked`, state.asin);
    return state;
  }

  if (!state.tier) {
    state.status = 'failed';
    state.errors.push('PUBLISH_BLOCKED: tier missing — cannot publish');
    await flag(db, 'tier', 'critical', `ASIN ${state.asin}: tier not assigned — publish blocked`, state.asin);
    return state;
  }

  if (!state.link_amazon) {
    state.status = 'failed';
    state.errors.push('PUBLISH_BLOCKED: Amazon link missing — cannot publish');
    await flag(db, 'link', 'critical', `ASIN ${state.asin}: link_amazon missing — publish blocked`, state.asin);
    return state;
  }

  // Upsert brand node
  const brandSlug = (state.brand_name ?? 'unknown').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const brandRid = new RecordId('brand', brandSlug);
  await db.upsert(brandRid).content({
    name: state.brand_name ?? 'Unknown',
    website: state.brand_website ?? '',
    affiliate_network: 'amazon',
    affiliate_link: state.link_amazon,
  });

  // Create product slug from ASIN + name
  const nameSlug = (state.name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);

  const productRid = new RecordId('product', nameSlug);

  await db.upsert(productRid).content({
    asin: state.asin,
    name: state.name,
    slug: nameSlug,
    brand_id: brandRid.toString(),
    tier: state.tier,
    rrp: state.price ?? 0,
    rrp_currency: state.currency ?? 'GBP',
    certifications: state.certifications,
    packet_text: state.packet_text ?? '',
    link_amazon: state.link_amazon,
    ...(state.link_official ? { link_official: state.link_official } : {}),
    ...(state.link_generic ? { link_generic: state.link_generic } : {}),
    link_status: 'live',
    source: 'bestseller_scrape',
    last_verified: new Date(),
  });

  // MADE_BY edge
  await db.query(
    `RELATE $productId->made_by->$brandId`,
    { productId: productRid, brandId: brandRid }
  );

  // CONTAINS edge (if ingredient identified)
  if (state.primary_ingredient_slug) {
    const ingRid = new RecordId('ingredient', state.primary_ingredient_slug);
    const [exists] = await db.query<unknown[][]>(
      `SELECT id FROM ingredient WHERE slug = $slug`,
      { slug: state.primary_ingredient_slug }
    );
    if ((exists ?? []).length > 0) {
      await db.query(
        `RELATE $productId->contains->$ingredientId SET dose_per_serving = '', unit = '', form = ''`,
        { productId: productRid, ingredientId: ingRid }
      );
    }
  }

  state.product_id = productRid.toString();
  state.status = 'live';
  state.completed_at = new Date();

  // Flag if tier confidence is low
  if (state.tier_confidence === 'low') {
    await flag(
      db, 'tier', 'warning',
      `Product ${state.name} (${state.asin}): tier=${state.tier} assigned with low confidence — review`,
      state.product_id
    );
  }

  // Flag if new ingredient needs evidence + FAQ compilation
  if (state.is_new_ingredient && state.primary_ingredient_name) {
    await flag(
      db, 'data', 'warning',
      `New ingredient "${state.primary_ingredient_name}" added via pipeline — run SKILL_evidence_compiler and SKILL_faq_compiler`,
      state.product_id
    );
  }

  return state;
}

// ─── Full pipeline ─────────────────────────────────────────────────────────────

export async function runPipeline(
  asin: string,
  subcategory: string,
  db: Surreal,
  opts: { dryRun?: boolean } = {}
): Promise<PipelineState> {
  let state = makeState(asin, subcategory);

  try {
    state = await stageFetch(state);
    if (state.status === 'failed') return state;

    state = stageExtractLabel(state);
    state = await stageClassifyTier(state, db);
    state = await stageIdentifyGeneric(state, db);
    state = stageGenerateLinks(state);

    if (!opts.dryRun) {
      state = await stagePublish(state, db);
    } else {
      state.status = 'live';
      state.completed_at = new Date();
      state.flags.push('DRY_RUN: publish stage skipped');
    }
  } catch (err) {
    state.status = 'failed';
    state.errors.push(`PIPELINE_ERROR: ${err}`);
    try {
      await flag(db, 'pipeline', 'critical', `Pipeline failed for ASIN ${asin}: ${err}`, asin);
    } catch {
      // flag creation failing shouldn't mask the original error
    }
  }

  return state;
}
