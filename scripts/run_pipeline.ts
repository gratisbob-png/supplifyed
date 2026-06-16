/**
 * Runs the full automation pipeline for a given ASIN.
 * Usage: npm run pipeline:run -- <ASIN> [subcategory]
 *
 * Example:
 *   npm run pipeline:run -- B002DYIZEO Performance
 *
 * Stages:
 *   fetch → extract_label → classify_tier → identify_generic →
 *   generate_links → publish → [flag evidence/faq if new ingredient]
 *
 * PA API fetch is skipped gracefully if AMAZON_ACCESS_KEY is not set.
 * Set credentials in .env.local to activate full automated fetching.
 */

import { Surreal } from 'surrealdb';
import { runPipeline } from '../src/lib/pipeline';

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

async function main() {
  const args = process.argv.slice(2);
  const asin = args[0];
  const subcategory = args[1] ?? 'Performance';
  const dryRun = args.includes('--dry-run');

  if (!asin) {
    console.error('Usage: npm run pipeline:run -- <ASIN> [subcategory] [--dry-run]');
    console.error('Example: npm run pipeline:run -- B002DYIZEO Performance');
    process.exit(1);
  }

  if (!/^[A-Z0-9]{10}$/.test(asin)) {
    console.error(`Invalid ASIN format: ${asin} (must be 10 alphanumeric chars)`);
    process.exit(1);
  }

  console.log(`\nSupplifyed Pipeline Runner`);
  console.log(`ASIN        : ${asin}`);
  console.log(`Subcategory : ${subcategory}`);
  console.log(`Mode        : ${dryRun ? 'dry-run (no DB writes)' : 'live'}\n`);

  const db = await connectDb();

  console.log('Running pipeline...\n');
  const t0 = Date.now();

  const state = await runPipeline(asin, subcategory, db, { dryRun });

  await db.close();

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);

  console.log(`Status      : ${state.status}`);
  console.log(`Duration    : ${elapsed}s`);

  if (state.product_id) {
    console.log(`Product ID  : ${state.product_id}`);
  }
  if (state.name) {
    console.log(`Name        : ${state.name}`);
  }
  if (state.tier) {
    console.log(`Tier        : ${state.tier} (${state.tier_confidence ?? '?'} confidence)`);
  }
  if (state.link_amazon) {
    console.log(`Amazon link : ${state.link_amazon}`);
  }
  if (state.link_generic) {
    console.log(`Generic link: ${state.link_generic}`);
  }
  if (state.primary_ingredient_name) {
    console.log(`Ingredient  : ${state.primary_ingredient_name}${state.is_new_ingredient ? ' [NEW]' : ''}`);
  }

  if (state.flags.length > 0) {
    console.log(`\nFlags (${state.flags.length}):`);
    state.flags.forEach((f) => console.log(`  ⚠  ${f}`));
  }

  if (state.errors.length > 0) {
    console.log(`\nErrors (${state.errors.length}):`);
    state.errors.forEach((e) => console.error(`  ✗  ${e}`));
  }

  if (state.status === 'failed') {
    process.exit(1);
  }

  if (state.status === 'live') {
    console.log('\n✓ Pipeline complete.');
    if (state.is_new_ingredient) {
      console.log('\n⚠  New ingredient detected. Run next:');
      console.log('   /evidence_compiler for', state.primary_ingredient_name);
      console.log('   /faq_compiler for', state.primary_ingredient_name);
    }
  }
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
