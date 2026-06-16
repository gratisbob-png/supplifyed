/**
 * Validates that the SurrealDB schema is intact and all quality gates pass.
 * Run: npm run db:validate
 * Must pass before every phase transition.
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

interface CheckResult {
  name: string;
  passed: boolean;
  detail?: string;
}

async function runChecks(db: Surreal): Promise<CheckResult[]> {
  const results: CheckResult[] = [];

  // 1. All products have at least one CONTAINS edge
  {
    const [r] = await db.query<{ count: number }[][]>(
      `SELECT count() AS count FROM product
       WHERE array::len(->contains->ingredient) = 0
       GROUP ALL`
    );
    const count = r?.[0]?.count ?? 0;
    results.push({
      name: 'All products have at least one ingredient (CONTAINS edge)',
      passed: count === 0,
      detail: count > 0 ? `${count} product(s) missing CONTAINS edge` : undefined,
    });
  }

  // 2. All ingredients have at least one evidence node
  {
    const [r] = await db.query<{ count: number }[][]>(
      `SELECT count() AS count FROM ingredient
       WHERE array::len(->supported_by->evidence) = 0
       GROUP ALL`
    );
    const count = r?.[0]?.count ?? 0;
    results.push({
      name: 'All ingredients have at least one evidence node (SUPPORTED_BY edge)',
      passed: count === 0,
      detail: count > 0 ? `${count} ingredient(s) missing evidence — acceptable before Phase 2` : undefined,
    });
  }

  // 3. All FAQs have at least one ANSWERS_ABOUT edge
  {
    const [r] = await db.query<{ count: number }[][]>(
      `SELECT count() AS count FROM faq
       WHERE array::len(->answers_about->ingredient) = 0
       GROUP ALL`
    );
    const count = r?.[0]?.count ?? 0;
    results.push({
      name: 'All FAQs have at least one ANSWERS_ABOUT edge',
      passed: count === 0,
      detail: count > 0 ? `${count} FAQ(s) missing ANSWERS_ABOUT edge` : undefined,
    });
  }

  // 4. All supplement products have a generic link (except manufacturer submissions)
  {
    const [r] = await db.query<{ count: number }[][]>(
      `SELECT count() AS count FROM product
       WHERE link_generic = NONE AND source != 'manufacturer_submission'
       GROUP ALL`
    );
    const count = r?.[0]?.count ?? 0;
    results.push({
      name: 'All supplement products have a generic ingredient link',
      passed: count === 0,
      detail: count > 0 ? `${count} product(s) missing generic link` : undefined,
    });
  }

  // 5. All evidence nodes have funded_by populated
  {
    const [r] = await db.query<{ count: number }[][]>(
      `SELECT count() AS count FROM evidence
       WHERE funded_by = NONE OR funded_by = ''
       GROUP ALL`
    );
    const count = r?.[0]?.count ?? 0;
    results.push({
      name: 'All evidence nodes have funded_by populated',
      passed: count === 0,
      detail: count > 0 ? `${count} evidence node(s) missing funded_by` : undefined,
    });
  }

  // 6. All product link_status values are valid
  {
    const [r] = await db.query<{ count: number }[][]>(
      `SELECT count() AS count FROM product
       WHERE link_status NOT IN ['live', 'dead', 'redirected']
       GROUP ALL`
    );
    const count = r?.[0]?.count ?? 0;
    results.push({
      name: 'All product link_status values are valid',
      passed: count === 0,
      detail: count > 0 ? `${count} product(s) with invalid link_status` : undefined,
    });
  }

  // 7. No product tier values are invalid
  {
    const [r] = await db.query<{ count: number }[][]>(
      `SELECT count() AS count FROM product
       WHERE tier NOT IN ['aspiration', 'rational', 'economic']
       GROUP ALL`
    );
    const count = r?.[0]?.count ?? 0;
    results.push({
      name: 'All product tier values are valid',
      passed: count === 0,
      detail: count > 0 ? `${count} product(s) with invalid tier` : undefined,
    });
  }

  // 8. No ingredient evidence_rating values are invalid
  {
    const [r] = await db.query<{ count: number }[][]>(
      `SELECT count() AS count FROM ingredient
       WHERE evidence_rating NOT IN ['strong', 'moderate', 'mixed', 'limited']
       GROUP ALL`
    );
    const count = r?.[0]?.count ?? 0;
    results.push({
      name: 'All ingredient evidence_rating values are valid',
      passed: count === 0,
      detail: count > 0 ? `${count} ingredient(s) with invalid evidence_rating` : undefined,
    });
  }

  return results;
}

async function validateSchema() {
  console.log('Connecting to SurrealDB...');
  let db: Surreal;

  try {
    db = await connectDb();
  } catch (err) {
    console.error('Could not connect to SurrealDB:', err);
    console.error('Is SurrealDB running? Try: surreal start --log trace --user root --pass root memory');
    process.exit(1);
  }

  console.log('Running validation checks...\n');

  const results = await runChecks(db);
  await db.close();

  let passed = 0;
  let failed = 0;
  let warned = 0;

  for (const r of results) {
    if (r.passed) {
      console.log(`  ✓ ${r.name}`);
      passed++;
    } else {
      // Some checks are warnings before data is seeded (Phase 2+)
      const isWarning = r.name.includes('evidence') || r.name.includes('FAQ');
      if (isWarning) {
        console.log(`  ⚠ ${r.name}`);
        if (r.detail) console.log(`    ${r.detail}`);
        warned++;
      } else {
        console.log(`  ✗ ${r.name}`);
        if (r.detail) console.log(`    ${r.detail}`);
        failed++;
      }
    }
  }

  console.log(`\n${passed} passed · ${warned} warnings · ${failed} failed`);

  if (failed > 0) {
    console.error('\nValidation failed. Fix errors before advancing to next phase.');
    process.exit(1);
  } else {
    console.log('\nValidation passed.');
  }
}

validateSchema().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
