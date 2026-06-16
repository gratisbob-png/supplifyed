/**
 * Verifies all graph queries return correct results for Phase 2 data.
 * Run: npm run test:queries
 * Requires ingredients and products seeded.
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

interface TestResult {
  name: string;
  passed: boolean;
  detail?: string;
}

async function runTests(db: Surreal): Promise<TestResult[]> {
  const results: TestResult[] = [];

  // 1. Creatine ingredient exists
  {
    const [r] = await db.query<unknown[][]>(
      `SELECT * FROM ingredient WHERE slug = 'creatine-monohydrate'`
    );
    results.push({
      name: 'ingredient:creatine-monohydrate exists',
      passed: (r?.length ?? 0) > 0,
    });
  }

  // 2. All 10 Phase 1 ingredients exist
  {
    const SLUGS = [
      'creatine-monohydrate', 'magnesium-glycinate', 'magnesium-citrate',
      'magnesium-oxide', 'vitamin-d3', 'omega-3-fish-oil',
      'ashwagandha', 'melatonin', 'collagen-peptides', 'whey-protein-isolate',
    ];

    const [r] = await db.query<{ count: number }[][]>(
      `SELECT count() AS count FROM ingredient WHERE slug IN $slugs GROUP ALL`,
      { slugs: SLUGS }
    );
    const count = r?.[0]?.count ?? 0;
    results.push({
      name: `All 10 Phase 1 ingredients exist (found ${count})`,
      passed: count === SLUGS.length,
    });
  }

  // 3. search('creatine') returns an ingredient
  {
    const [r] = await db.query<unknown[][]>(
      `SELECT * FROM ingredient WHERE string::lowercase(name) CONTAINS 'creatine' LIMIT 5`
    );
    results.push({
      name: "search('creatine') returns ingredients",
      passed: (r?.length ?? 0) > 0,
    });
  }

  // 4. Creatine has products (CONTAINS edges)
  {
    const [r] = await db.query<unknown[][]>(
      `SELECT * FROM product WHERE ->contains->ingredient.slug CONTAINS 'creatine-monohydrate'`
    );
    results.push({
      name: 'Creatine has at least 3 products (tier stack)',
      passed: (r?.length ?? 0) >= 3,
      detail: `Found ${r?.length ?? 0} products`,
    });
  }

  // 5. Tier stack returns aspiration/rational/economic
  {
    const [r] = await db.query<{ tier: string }[][]>(
      `SELECT tier FROM product WHERE ->contains->ingredient.slug CONTAINS 'creatine-monohydrate'`
    );
    const tiers = new Set((r ?? []).map((p) => p.tier));
    results.push({
      name: 'Creatine tier stack has all three tiers',
      passed: tiers.has('aspiration') && tiers.has('rational') && tiers.has('economic'),
      detail: `Tiers found: ${Array.from(tiers).join(', ')}`,
    });
  }

  // 6. All products have a MADE_BY edge
  {
    const [r] = await db.query<{ count: number }[][]>(
      `SELECT count() AS count FROM product
       WHERE array::len(->made_by->brand) = 0
       GROUP ALL`
    );
    const count = r?.[0]?.count ?? 0;
    results.push({
      name: 'All products have a MADE_BY edge',
      passed: count === 0,
      detail: count > 0 ? `${count} product(s) missing brand` : undefined,
    });
  }

  // 7. All products have affiliate tag in amazon link
  {
    const tag = process.env.AMAZON_PARTNER_TAG ?? 'supplifyed-21';
    const [r] = await db.query<{ count: number }[][]>(
      `SELECT count() AS count FROM product
       WHERE !string::contains(link_amazon, $tag)
       GROUP ALL`,
      { tag }
    );
    const count = r?.[0]?.count ?? 0;
    results.push({
      name: 'All Amazon links contain affiliate tag',
      passed: count === 0,
      detail: count > 0 ? `${count} link(s) missing affiliate tag` : undefined,
    });
  }

  // 8. Melatonin dose gap is visible (1mg economic tier exists)
  {
    const [r] = await db.query<{ dose_per_serving: string }[][]>(
      `SELECT dose_per_serving FROM contains
       WHERE out = ingredient:melatonin AND in.tier = 'economic'`
    );
    results.push({
      name: 'Melatonin has economic-tier product (dose gap visible)',
      passed: (r?.length ?? 0) > 0,
    });
  }

  // 9. getIngredient graph traversal returns evidence + FAQs + products
  {
    const [r] = await db.query<unknown[][]>(
      `SELECT *,
        ->supported_by->evidence AS evidence,
        <-answers_about<-faq AS faqs,
        <-contains<-product.* AS products
       FROM ingredient WHERE slug = 'creatine-monohydrate'`
    );
    results.push({
      name: 'getIngredient graph traversal returns full context',
      passed: (r?.length ?? 0) > 0,
    });
  }

  // 10. No dead links at seed time
  {
    const [r] = await db.query<{ count: number }[][]>(
      `SELECT count() AS count FROM product WHERE link_status = 'dead' GROUP ALL`
    );
    const count = r?.[0]?.count ?? 0;
    results.push({
      name: 'No dead links at seed time',
      passed: count === 0,
      detail: count > 0 ? `${count} dead link(s)` : undefined,
    });
  }

  return results;
}

async function testQueries() {
  console.log('Connecting to SurrealDB...');
  const db = await connectDb();

  console.log('Running query tests...\n');

  const results = await runTests(db);
  await db.close();

  let passed = 0;
  let failed = 0;

  for (const r of results) {
    if (r.passed) {
      console.log(`  ✓ ${r.name}`);
      passed++;
    } else {
      console.log(`  ✗ ${r.name}`);
      if (r.detail) console.log(`    ${r.detail}`);
      failed++;
    }
  }

  console.log(`\n${passed}/${results.length} tests passed`);

  if (failed > 0) {
    console.error('Some tests failed. Seed data before running queries.');
    process.exit(1);
  }
}

testQueries().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
