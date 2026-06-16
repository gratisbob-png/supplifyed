/**
 * Integration tests for search functionality.
 * These tests require a running SurrealDB instance with seeded data.
 * Run: npm run seed:ingredients && npm run seed:products first.
 *
 * Skip in CI if SURREALDB_URL is not set.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Surreal } from 'surrealdb';

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

describe('Search: ingredient queries', () => {
  it.skipIf(SKIP)('finds creatine by name', async () => {
    const [results] = await db.query<unknown[][]>(
      `SELECT * FROM ingredient WHERE string::lowercase(name) CONTAINS 'creatine'`
    );
    expect(results?.length).toBeGreaterThan(0);
  });

  it.skipIf(SKIP)('finds magnesium and returns multiple forms', async () => {
    const [results] = await db.query<{ name: string }[][]>(
      `SELECT name FROM ingredient WHERE string::lowercase(name) CONTAINS 'magnesium'`
    );
    expect(results?.length).toBeGreaterThanOrEqual(3); // glycinate, citrate, oxide
  });

  it.skipIf(SKIP)('ingredient page includes products via graph traversal', async () => {
    const [results] = await db.query<{ products: unknown[] }[][]>(
      `SELECT <-contains<-product.* AS products
       FROM ingredient WHERE slug = 'creatine-monohydrate'`
    );
    const products = results?.[0]?.products ?? [];
    expect(products.length).toBeGreaterThanOrEqual(3);
  });
});

describe('Search: product queries', () => {
  it.skipIf(SKIP)('products have brand via MADE_BY edge', async () => {
    const [results] = await db.query<{ brand: unknown }[][]>(
      `SELECT ->made_by->brand AS brand FROM product LIMIT 1`
    );
    expect(results?.[0]?.brand).toBeDefined();
  });

  it.skipIf(SKIP)('products have ingredients via CONTAINS edge', async () => {
    const [results] = await db.query<{ ingredients: unknown[] }[][]>(
      `SELECT ->contains->ingredient.* AS ingredients FROM product LIMIT 1`
    );
    const ingredients = results?.[0]?.ingredients ?? [];
    expect(ingredients.length).toBeGreaterThan(0);
  });
});

describe('Search: tier stack', () => {
  it.skipIf(SKIP)('creatine returns aspiration, rational, and economic tiers', async () => {
    const [results] = await db.query<{ tier: string }[][]>(
      `SELECT tier FROM product WHERE ->contains->ingredient.slug CONTAINS 'creatine-monohydrate'`
    );
    const tiers = new Set((results ?? []).map((r) => r.tier));
    expect(tiers.has('aspiration')).toBe(true);
    expect(tiers.has('rational')).toBe(true);
    expect(tiers.has('economic')).toBe(true);
  });
});
