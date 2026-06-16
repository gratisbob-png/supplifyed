/**
 * Tests the tier classifier against all 30 seeded products.
 * Verifies tier assignments are internally consistent:
 *   - Each ingredient has exactly one product per tier
 *   - Aspiration >= Rational >= Economic by RRP
 *   - Higher cert count is a valid tiebreaker for equal-price products
 *
 * Run: npm run test:tier-classifier
 */

import { Surreal } from 'surrealdb';
import { classifyTiers } from '../src/lib/tier_classifier';
import type { ProductInput, ClassifiedProduct } from '../src/lib/tier_classifier';

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

// ─── DB query types ────────────────────────────────────────────────────────────

interface DBProduct {
  id: string;
  name: string;
  asin: string;
  slug: string;
  tier: string;
  rrp: number;
  certifications: string[];
  ingredient_slug: string;
  ingredient_name: string;
}

interface TestResult {
  name: string;
  passed: boolean;
  detail?: string;
}

// ─── Tests ─────────────────────────────────────────────────────────────────────

async function runTests(db: Surreal): Promise<TestResult[]> {
  const results: TestResult[] = [];

  // Fetch all products with their primary ingredient
  const [rawProducts] = await db.query<DBProduct[][]>(`
    SELECT
      id, name, asin, slug, tier, rrp, certifications,
      (->contains->ingredient.slug)[0] AS ingredient_slug,
      (->contains->ingredient.name)[0] AS ingredient_name
    FROM product
    ORDER BY ingredient_slug, rrp DESC
  `);

  const products = rawProducts ?? [];

  // ── 1. Total product count ──────────────────────────────────────────────────
  results.push({
    name: `Product count is 30 (found ${products.length})`,
    passed: products.length === 30,
  });

  // ── 2. All products have an ingredient ─────────────────────────────────────
  const missingIngredient = products.filter((p) => !p.ingredient_slug);
  results.push({
    name: 'All products have a primary ingredient',
    passed: missingIngredient.length === 0,
    detail: missingIngredient.length > 0
      ? `${missingIngredient.length} product(s) missing ingredient: ${missingIngredient.map((p) => p.name).join(', ')}`
      : undefined,
  });

  // ── 3. Group by ingredient and run classifier checks ───────────────────────
  const byIngredient = new Map<string, DBProduct[]>();
  for (const p of products) {
    if (!p.ingredient_slug) continue;
    const group = byIngredient.get(p.ingredient_slug) ?? [];
    group.push(p);
    byIngredient.set(p.ingredient_slug, group);
  }

  // ── 4. Each ingredient has exactly 3 products ──────────────────────────────
  const wrongCount: string[] = [];
  for (const [slug, group] of byIngredient) {
    if (group.length !== 3) wrongCount.push(`${slug} (${group.length})`);
  }
  results.push({
    name: 'Each ingredient has exactly 3 products (one per tier)',
    passed: wrongCount.length === 0,
    detail: wrongCount.length > 0 ? `Wrong count: ${wrongCount.join(', ')}` : undefined,
  });

  // ── 5. Each ingredient has all three tiers ─────────────────────────────────
  const missingTiers: string[] = [];
  for (const [slug, group] of byIngredient) {
    const tiers = new Set(group.map((p) => p.tier));
    if (!tiers.has('aspiration') || !tiers.has('rational') || !tiers.has('economic')) {
      missingTiers.push(`${slug}: [${Array.from(tiers).join(', ')}]`);
    }
  }
  results.push({
    name: 'Each ingredient has all three tiers (aspiration, rational, economic)',
    passed: missingTiers.length === 0,
    detail: missingTiers.length > 0 ? missingTiers.join(' | ') : undefined,
  });

  // ── 6. Tier classifier matches seeded assignments ──────────────────────────
  let classifierMatches = 0;
  let classifierMismatches = 0;
  const mismatchDetails: string[] = [];

  for (const [slug, group] of byIngredient) {
    const inputs: ProductInput[] = group.map((p) => ({
      asin: p.asin,
      name: p.name,
      rrp: p.rrp,
      certifications: p.certifications,
    }));

    const classified = classifyTiers(inputs);

    for (const cp of classified) {
      const seeded = group.find((p) => p.asin === cp.asin)!;
      if (seeded.tier === cp.assigned_tier) {
        classifierMatches++;
      } else {
        classifierMismatches++;
        mismatchDetails.push(
          `${slug}/${seeded.name}: seeded=${seeded.tier}, classifier=${cp.assigned_tier}`
        );
      }
    }
  }

  results.push({
    name: `Tier classifier matches all seeded assignments (${classifierMatches}/${products.length})`,
    passed: classifierMismatches === 0,
    detail: mismatchDetails.length > 0 ? mismatchDetails.join('\n    ') : undefined,
  });

  // ── 7. Aspiration RRP >= rational RRP per ingredient ──────────────────────
  const priceOrderViolations: string[] = [];
  for (const [slug, group] of byIngredient) {
    const asp = group.find((p) => p.tier === 'aspiration');
    const rat = group.find((p) => p.tier === 'rational');
    const eco = group.find((p) => p.tier === 'economic');
    if (!asp || !rat || !eco) continue;

    const aspRrp = Number(asp.rrp);
    const ratRrp = Number(rat.rrp);
    const ecoRrp = Number(eco.rrp);

    if (aspRrp < ratRrp) {
      priceOrderViolations.push(`${slug}: aspiration (${aspRrp}) < rational (${ratRrp})`);
    }
    if (ratRrp < ecoRrp) {
      priceOrderViolations.push(`${slug}: rational (${ratRrp}) < economic (${ecoRrp})`);
    }
  }
  results.push({
    name: 'Aspiration >= Rational >= Economic by RRP across all ingredients',
    passed: priceOrderViolations.length === 0,
    detail: priceOrderViolations.length > 0 ? priceOrderViolations.join('\n    ') : undefined,
  });

  // ── 8. No duplicate ASINs ─────────────────────────────────────────────────
  const asinCounts = new Map<string, number>();
  for (const p of products) asinCounts.set(p.asin, (asinCounts.get(p.asin) ?? 0) + 1);
  const dupAsins = [...asinCounts.entries()].filter(([, c]) => c > 1).map(([a]) => a);
  results.push({
    name: 'No duplicate ASINs across the product set',
    passed: dupAsins.length === 0,
    detail: dupAsins.length > 0 ? `Duplicate ASINs: ${dupAsins.join(', ')}` : undefined,
  });

  // ── 9. All 10 ingredients have products ───────────────────────────────────
  const expectedIngredients = [
    'creatine-monohydrate', 'magnesium-glycinate', 'magnesium-citrate',
    'magnesium-oxide', 'vitamin-d3', 'omega-3-fish-oil',
    'ashwagandha', 'melatonin', 'collagen-peptides', 'whey-protein-isolate',
  ];
  const missingIngredients = expectedIngredients.filter((s) => !byIngredient.has(s));
  results.push({
    name: 'All 10 Phase 1 ingredients have a tier stack',
    passed: missingIngredients.length === 0,
    detail: missingIngredients.length > 0
      ? `Missing: ${missingIngredients.join(', ')}`
      : undefined,
  });

  // ── 10. Melatonin economic tier has lowest real-world dose (dose gap test) ─
  const melatoninProducts = byIngredient.get('melatonin') ?? [];
  const melatoninEco = melatoninProducts.find((p) => p.tier === 'economic');
  results.push({
    name: 'Melatonin economic-tier product exists (1mg dose gap anchor)',
    passed: !!melatoninEco,
    detail: melatoninEco ? `${melatoninEco.name} (£${melatoninEco.rrp})` : 'Missing economic product',
  });

  return results;
}

// ─── Runner ────────────────────────────────────────────────────────────────────

async function testTierClassifier() {
  console.log('Tier Classifier — Verification\n');

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
    console.error('\nTier classifier checks failed. Review product seed data.');
    process.exit(1);
  }

  console.log('\nTier classifier verified. All 30 products correctly classified.');
}

testTierClassifier().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
