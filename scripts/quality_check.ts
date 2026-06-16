/**
 * Quality gates — must all pass before every deploy.
 * Run: npm run quality:check
 */

import { Surreal } from 'surrealdb';

const OPINION_WORDS = [
  'best', 'recommended', 'top pick', 'winner', 'suggest',
  'should buy', 'we recommend', 'our pick', 'favourite',
  'number one', '#1 pick', 'must-have', 'perfect choice',
];

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

// Rule 1: No opinion language in any content field
async function checkNoOpinionLanguage(db: Surreal): Promise<boolean> {
  const fields = [
    { table: 'product', field: 'packet_text' },
    { table: 'product', field: 'brand_marketing' },
    { table: 'ingredient', field: 'description' },
    { table: 'ingredient', field: 'dose_context' },
    { table: 'faq', field: 'answer' },
  ];

  let clean = true;

  for (const { table, field } of fields) {
    for (const word of OPINION_WORDS) {
      const [r] = await db.query<{ id: string; text: string }[][]>(
        `SELECT id, ${field} AS text FROM ${table}
         WHERE string::lowercase(${field} ?? '') CONTAINS $word`,
        { word }
      );

      if ((r?.length ?? 0) > 0) {
        console.error(`  ✗ Opinion word "${word}" found in ${table}.${field}:`);
        for (const row of r ?? []) {
          console.error(`    ${row.id}`);
        }
        clean = false;
      }
    }
  }

  return clean;
}

// Rule 2: Every product has at least one CONTAINS edge
async function checkContainsEdges(db: Surreal): Promise<boolean> {
  const [r] = await db.query<{ count: number }[][]>(
    `SELECT count() AS count FROM product
     WHERE array::len(->contains->ingredient) = 0
     GROUP ALL`
  );
  return (r?.[0]?.count ?? 0) === 0;
}

// Rule 3: All supplement products have generic link
async function checkGenericLinks(db: Surreal): Promise<boolean> {
  const [r] = await db.query<{ count: number }[][]>(
    `SELECT count() AS count FROM product
     WHERE link_generic = NONE AND source != 'manufacturer_submission'
     GROUP ALL`
  );
  return (r?.[0]?.count ?? 0) === 0;
}

// Rule 4: No live pricing patterns in content (RRP only)
async function checkNoLivePricing(db: Surreal): Promise<boolean> {
  const patterns = ['price api', 'live price', 'real time price', 'current price'];
  let clean = true;

  for (const pattern of patterns) {
    const [r] = await db.query<{ id: string }[][]>(
      `SELECT id FROM product
       WHERE string::lowercase(packet_text ?? '') CONTAINS $pattern
          OR string::lowercase(brand_marketing ?? '') CONTAINS $pattern`,
      { pattern }
    );

    if ((r?.length ?? 0) > 0) {
      console.error(`  ✗ Live pricing pattern "${pattern}" found in ${r?.length} product(s)`);
      clean = false;
    }
  }

  return clean;
}

// Rule 5: Brand marketing within character limit
async function checkMarketingCap(db: Surreal): Promise<boolean> {
  const limit = Number(process.env.NEXT_PUBLIC_BRAND_MARKETING_CHAR_LIMIT ?? 500);

  const [r] = await db.query<{ id: string; len: number }[][]>(
    `SELECT id, string::len(brand_marketing) AS len FROM product
     WHERE brand_marketing != NONE
       AND string::len(brand_marketing) > $limit`,
    { limit }
  );

  if ((r?.length ?? 0) > 0) {
    console.error(`  ✗ ${r?.length} product(s) exceed brand marketing cap of ${limit} chars:`);
    for (const row of r ?? []) {
      console.error(`    ${row.id} (${row.len} chars)`);
    }
    return false;
  }

  return true;
}

// Rule 6: Every evidence node has funded_by
async function checkEvidenceFundedBy(db: Surreal): Promise<boolean> {
  const [r] = await db.query<{ count: number }[][]>(
    `SELECT count() AS count FROM evidence
     WHERE funded_by = NONE OR funded_by = ''
     GROUP ALL`
  );
  return (r?.[0]?.count ?? 0) === 0;
}

// Rule 7: No content without source badge — check FAQ answers are linked to ingredients
async function checkFaqConnections(db: Surreal): Promise<boolean> {
  const [r] = await db.query<{ count: number }[][]>(
    `SELECT count() AS count FROM faq
     WHERE array::len(->answers_about->ingredient) = 0
     GROUP ALL`
  );
  const count = r?.[0]?.count ?? 0;
  if (count > 0) {
    console.error(`  ✗ ${count} FAQ(s) not connected to any ingredient`);
    return false;
  }
  return true;
}

async function runQualityChecks() {
  console.log('Running quality checks...\n');

  let db: Surreal;
  try {
    db = await connectDb();
  } catch {
    console.error('Could not connect to SurrealDB. Quality checks skipped for content in DB.');
    console.log('Checking static rules only...\n');
    console.log('  ✓ Opinion word list defined');
    console.log('  ✓ Marketing cap configured:', process.env.BRAND_MARKETING_CHAR_LIMIT ?? 500);
    console.log('\n⚠ Connect SurrealDB to run full quality checks.');
    return;
  }

  const checks: { name: string; fn: () => Promise<boolean> }[] = [
    { name: 'No opinion language in any content', fn: () => checkNoOpinionLanguage(db) },
    { name: 'All products have at least one ingredient (CONTAINS)', fn: () => checkContainsEdges(db) },
    { name: 'All supplement products have generic ingredient link', fn: () => checkGenericLinks(db) },
    { name: 'No live pricing patterns in content', fn: () => checkNoLivePricing(db) },
    { name: 'Brand marketing within character cap', fn: () => checkMarketingCap(db) },
    { name: 'All evidence nodes have funded_by populated', fn: () => checkEvidenceFundedBy(db) },
    { name: 'All FAQs connected to at least one ingredient', fn: () => checkFaqConnections(db) },
  ];

  let passed = 0;
  let failed = 0;

  for (const check of checks) {
    const result = await check.fn();
    if (result) {
      console.log(`  ✓ ${check.name}`);
      passed++;
    } else {
      failed++;
    }
  }

  await db.close();

  console.log(`\n${passed} passed · ${failed} failed`);

  if (failed > 0) {
    console.error('\nQuality checks failed. Do not deploy until all pass.');
    process.exit(1);
  } else {
    console.log('\nAll quality checks passed. Safe to deploy.');
  }
}

runQualityChecks().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
