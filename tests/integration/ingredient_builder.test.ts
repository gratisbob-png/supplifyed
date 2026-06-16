/**
 * Integration tests for the ingredient builder.
 * Requires SurrealDB running with seeded data.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Surreal, RecordId } from 'surrealdb';

const SKIP = !process.env.SURREALDB_URL;

let db: Surreal;

beforeAll(async () => {
  if (SKIP) return;
  db = new Surreal();
  await db.connect(process.env.SURREALDB_URL!);
  await db.signin({
    username: process.env.SURREALDB_USER ?? 'root',
    password: process.env.SURREALDB_PASS ?? 'root',
  });
  await db.use({
    namespace: process.env.SURREALDB_NS ?? 'supplifyed',
    database: process.env.SURREALDB_DB ?? 'production',
  });
});

afterAll(async () => {
  if (db) await db.close();
});

describe('Ingredient Builder', () => {
  it.skipIf(SKIP)('returns products containing a single ingredient', async () => {
    const slug = 'creatine-monohydrate';
    const [results] = await db.query<unknown[][]>(
      `SELECT * FROM product
       WHERE link_status = 'live'
         AND ->contains->ingredient.slug CONTAINS $slug`,
      { slug }
    );
    expect(results?.length).toBeGreaterThanOrEqual(3);
  });

  it.skipIf(SKIP)('returns empty result when no product contains all selected ingredients simultaneously', async () => {
    // 3-ingredient combination that no single seeded product contains
    const [results] = await db.query<unknown[][]>(
      `SELECT * FROM product
       WHERE link_status = 'live'
         AND ->contains->ingredient.slug CONTAINS 'creatine-monohydrate'
         AND ->contains->ingredient.slug CONTAINS 'melatonin'
         AND ->contains->ingredient.slug CONTAINS 'omega-3-fish-oil'`
    );
    // Seed data has single-ingredient products only — expect 0
    expect(results?.length ?? 0).toBe(0);
  });

  it.skipIf(SKIP)('only returns live products', async () => {
    const [results] = await db.query<{ link_status: string }[][]>(
      `SELECT link_status FROM product
       WHERE link_status = 'live'
         AND ->contains->ingredient.slug CONTAINS 'creatine-monohydrate'`
    );
    expect((results ?? []).length).toBeGreaterThanOrEqual(3);
    for (const r of results ?? []) {
      expect(r.link_status).toBe('live');
    }
  });
});
