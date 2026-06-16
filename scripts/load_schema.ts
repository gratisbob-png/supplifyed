/**
 * Loads all SurrealDB schema files in the correct order.
 * Run: npm run db:schema
 * Requires SurrealDB running locally: surreal start --log trace --user root --pass root memory
 */

import { readFile } from 'fs/promises';
import { join } from 'path';
import { Surreal } from 'surrealdb';

const SCHEMA_ORDER = [
  // Nodes first
  'schema/nodes/ingredient.surql',
  'schema/nodes/product.surql',
  'schema/nodes/evidence.surql',
  'schema/nodes/faq.surql',
  'schema/nodes/brand.surql',
  'schema/nodes/exceptions.surql',
  // Then edges
  'schema/edges/contains.surql',
  'schema/edges/supported_by.surql',
  'schema/edges/answers_about.surql',
  'schema/edges/made_by.surql',
  'schema/edges/related_to.surql',
];

async function loadSchema() {
  const url = process.env.SURREALDB_URL ?? 'http://localhost:8000';
  const ns = process.env.SURREALDB_NS ?? 'supplifyed';
  const database = process.env.SURREALDB_DB ?? 'production';
  const username = process.env.SURREALDB_USER ?? 'root';
  const password = process.env.SURREALDB_PASS ?? 'root';

  console.log(`Connecting to SurrealDB at ${url}...`);

  const db = new Surreal();
  await db.connect(url);

  // Sign in as root before selecting any namespace/database
  await db.signin({ username, password });

  // Create namespace and database if they don't exist.
  // DEFINE NAMESPACE runs without a namespace context when authenticated as root.
  await db.query(`DEFINE NAMESPACE IF NOT EXISTS \`${ns}\``);
  await db.use({ namespace: ns });
  await db.query(`DEFINE DATABASE IF NOT EXISTS \`${database}\``);
  await db.use({ namespace: ns, database });

  console.log(`Connected. Loading schema into ${ns}/${database}...`);

  const root = process.cwd();

  for (const file of SCHEMA_ORDER) {
    const path = join(root, file);
    const sql = await readFile(path, 'utf-8');

    // Strip comments and run
    const cleaned = sql
      .split('\n')
      .filter((line) => !line.trim().startsWith('--'))
      .join('\n')
      .trim();

    if (!cleaned) continue;

    try {
      await db.query(cleaned);
      console.log(`  ✓ ${file}`);
    } catch (err) {
      console.error(`  ✗ ${file}: ${err}`);
      await db.close();
      process.exit(1);
    }
  }

  console.log('\nSchema loaded successfully.');
  await db.close();
}

loadSchema().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
