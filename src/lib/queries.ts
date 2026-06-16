import { getDb } from './db';
import { RecordId } from 'surrealdb';
import { getCategoryBySlug } from './categories';
import type {
  IngredientWithEvidence,
  ProductWithBrand,
  TierStack,
  IngredientBuilderResult,
  SearchResults,
  Ingredient,
  FAQ,
} from '@/types';

// SurrealDB v2 JS SDK returns `id` fields as RecordId objects and `datetime`
// fields as Date objects — neither can cross the Next.js Server→Client boundary
// as-is. This walks the result tree and converts every RecordId to its
// "table:id" string and every Date to an ISO 8601 string.
function toPlain<T>(val: T): T {
  if (val instanceof RecordId) return val.toString() as unknown as T;
  if (val instanceof Date) return val.toISOString() as unknown as T;
  if (Array.isArray(val)) return val.map(toPlain) as unknown as T;
  if (val !== null && typeof val === 'object') {
    return Object.fromEntries(
      Object.entries(val as object).map(([k, v]) => [k, toPlain(v)])
    ) as T;
  }
  return val;
}

// Re-inflate a normalised "table:id" string back into a RecordId for use as a
// query parameter (RecordId comparisons in WHERE clauses require the real type).
function parseId(id: string): RecordId {
  const i = id.indexOf(':');
  if (i === -1) throw new Error(`Invalid SurrealDB record ID: ${id}`);
  return new RecordId(id.slice(0, i), id.slice(i + 1));
}

// Returns the DB connection, or null if unavailable (DB offline / misconfigured).
// Query functions check for null and return empty results rather than crashing.
async function tryGetDb() {
  try {
    return await getDb();
  } catch {
    return null;
  }
}

const EVIDENCE_ORDER: Record<string, number> = {
  strong: 0,
  moderate: 1,
  mixed: 2,
  limited: 3,
};

// ─── Search ────────────────────────────────────────────────────────────────────

export async function search(query: string): Promise<SearchResults> {
  const db = await tryGetDb();
  if (!db) return { ingredients: [], faqs: [], products: [] };

  const normalised = query.toLowerCase().trim();

  const [ingredients] = await db.query<IngredientWithEvidence[][]>(
    `SELECT *,
      ->supported_by->evidence AS evidence,
      <-answers_about<-faq AS faqs,
      <-contains<-product.* AS products
    FROM ingredient
    WHERE string::lowercase(name) CONTAINS $query
       OR string::lowercase(description) CONTAINS $query
       OR primary_use CONTAINS $query
    LIMIT 5`,
    { query: normalised }
  );

  const [faqs] = await db.query<FAQ[][]>(
    `SELECT * FROM faq
    WHERE string::lowercase(question) CONTAINS $query
    LIMIT 10`,
    { query: normalised }
  );

  const [products] = await db.query<ProductWithBrand[][]>(
    `SELECT *,
      array::first(->made_by->brand.*) AS brand,
      (SELECT dose_per_serving, unit, form, out AS ingredient FROM ->contains FETCH ingredient) AS ingredients
    FROM product
    WHERE string::lowercase(name) CONTAINS $query
      AND link_status = 'live'
    LIMIT 10`,
    { query: normalised }
  );

  return {
    ingredients: toPlain(ingredients ?? []),
    faqs: toPlain(faqs ?? []),
    products: toPlain(products ?? []),
  };
}

// ─── Ingredient page ───────────────────────────────────────────────────────────

export async function getIngredient(slug: string): Promise<IngredientWithEvidence | null> {
  const db = await tryGetDb();
  if (!db) return null;

  const [results] = await db.query<IngredientWithEvidence[][]>(
    `SELECT *,
      ->supported_by->evidence.* AS evidence,
      <-answers_about<-faq.* AS faqs,
      (SELECT *,
        array::first(->made_by->brand.*) AS brand,
        (SELECT dose_per_serving, unit, form, out AS ingredient FROM ->contains FETCH ingredient) AS ingredients
       FROM <-contains<-product) AS products,
      ->related_to->ingredient.* AS related_compounds
    FROM ingredient
    WHERE slug = $slug`,
    { slug }
  );

  const raw = results?.[0] ?? null;
  if (!raw) return null;

  const plain = toPlain(raw);

  // Filter out nulls from related_compounds — graph traversal returns null for
  // RELATE targets that were never seeded as full ingredient records.
  const related = plain.related_compounds as (Ingredient | null)[] | undefined;
  if (related) {
    (plain as unknown as { related_compounds: Ingredient[] }).related_compounds =
      related.filter((r): r is Ingredient => r !== null && typeof r === 'object' && 'id' in r);
  }

  return plain;
}

// ─── Category ingredients ──────────────────────────────────────────────────────

export async function getCategoryIngredients(categorySlug: string): Promise<Ingredient[]> {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return [];

  const db = await tryGetDb();
  if (!db) return [];

  const seen = new Set<string>();
  const results: Ingredient[] = [];

  // Query by explicit DB category names
  if (category.dbCategories.length > 0) {
    const [rows] = await db.query<Ingredient[][]>(
      `SELECT * FROM ingredient WHERE category IN $categories`,
      { categories: category.dbCategories }
    );
    for (const row of rows ?? []) {
      const plain = toPlain(row);
      if (!seen.has(plain.id)) {
        seen.add(plain.id);
        results.push(plain);
      }
    }
  }

  // Query by primary_use keywords (for categories like Inflammation that span DB categories)
  if (category.primaryUseKeywords && category.primaryUseKeywords.length > 0) {
    for (const keyword of category.primaryUseKeywords) {
      const [rows] = await db.query<Ingredient[][]>(
        `SELECT * FROM ingredient WHERE primary_use CONTAINS $keyword`,
        { keyword }
      );
      for (const row of rows ?? []) {
        const plain = toPlain(row);
        if (!seen.has(plain.id)) {
          seen.add(plain.id);
          results.push(plain);
        }
      }
    }
  }

  results.sort((a, b) => {
    const ra = EVIDENCE_ORDER[a.evidence_rating] ?? 4;
    const rb = EVIDENCE_ORDER[b.evidence_rating] ?? 4;
    if (ra !== rb) return ra - rb;
    return a.name.localeCompare(b.name);
  });

  return results;
}

// ─── Tier stack ────────────────────────────────────────────────────────────────

export async function getTierStack(ingredientId: string): Promise<TierStack> {
  const db = await tryGetDb();
  if (!db) return { aspiration: [], rational: [], economic: [] };

  const ingredientRecordId = parseId(ingredientId);

  const [products] = await db.query<ProductWithBrand[][]>(
    `SELECT *,
      array::first(->made_by->brand.*) AS brand,
      (SELECT dose_per_serving, unit, form, out AS ingredient FROM ->contains FETCH ingredient) AS ingredients
    FROM product
    WHERE ->contains->ingredient CONTAINS $ingredientId
      AND link_status = 'live'
    ORDER BY tier`,
    { ingredientId: ingredientRecordId }
  );

  const tiers: TierStack = { aspiration: [], rational: [], economic: [] };

  for (const p of toPlain(products ?? [])) {
    const tier = p.tier as keyof TierStack;
    if (tier in tiers) tiers[tier].push(p);
  }

  return tiers;
}

// ─── Ingredient builder ────────────────────────────────────────────────────────

export async function ingredientBuilder(ingredientIds: string[]): Promise<IngredientBuilderResult> {
  if (ingredientIds.length === 0) {
    return { selected_ingredients: [], matching_products: [] };
  }

  const db = await tryGetDb();
  if (!db) return { selected_ingredients: [], matching_products: [] };

  const ids = ingredientIds.map(parseId);

  const [products] = await db.query<ProductWithBrand[][]>(
    `SELECT *,
      array::first(->made_by->brand.*) AS brand,
      (SELECT dose_per_serving, unit, form, out AS ingredient FROM ->contains FETCH ingredient) AS ingredients
    FROM product
    WHERE link_status = 'live'
      AND (
        SELECT count() FROM ->contains->ingredient
        WHERE id IN $ingredientIds
        GROUP ALL
      )[0].count = $count`,
    { ingredientIds: ids, count: ingredientIds.length }
  );

  const [selected] = await db.query<Ingredient[][]>(
    `SELECT * FROM ingredient WHERE id IN $ids`,
    { ids }
  );

  return {
    selected_ingredients: toPlain(selected ?? []),
    matching_products: toPlain(products ?? []),
  };
}

// ─── Product page ──────────────────────────────────────────────────────────────

export async function getProduct(slug: string): Promise<ProductWithBrand | null> {
  const db = await tryGetDb();
  if (!db) return null;

  const [results] = await db.query<ProductWithBrand[][]>(
    `SELECT *,
      array::first(->made_by->brand.*) AS brand,
      (SELECT dose_per_serving, unit, form, out AS ingredient FROM ->contains FETCH ingredient) AS ingredients
    FROM product
    WHERE slug = $slug`,
    { slug }
  );

  return toPlain(results?.[0] ?? null);
}

// ─── All ingredients list ──────────────────────────────────────────────────────

export async function getAllIngredients(): Promise<Ingredient[]> {
  const db = await tryGetDb();
  if (!db) return [];
  const [results] = await db.query<Ingredient[][]>(`SELECT * FROM ingredient ORDER BY name`);
  return toPlain(results ?? []);
}

// ─── All products list (for sitemap) ──────────────────────────────────────────

export async function getAllProducts(): Promise<Pick<ProductWithBrand, 'slug' | 'last_verified'>[]> {
  const db = await tryGetDb();
  if (!db) return [];
  const [results] = await db.query<Pick<ProductWithBrand, 'slug' | 'last_verified'>[][]>(
    `SELECT slug, last_verified FROM product WHERE link_status = 'live'`
  );
  return toPlain(results ?? []);
}

// ─── Ingredients with no evidence ─────────────────────────────────────────────

export async function getIngredientsWithNoEvidence(): Promise<Ingredient[]> {
  const db = await tryGetDb();
  if (!db) return [];
  const [results] = await db.query<Ingredient[][]>(
    `SELECT * FROM ingredient
    WHERE array::len(->supported_by->evidence) = 0`
  );
  return toPlain(results ?? []);
}

// ─── Products with no CONTAINS edge ───────────────────────────────────────────

export async function getProductsWithNoIngredient(): Promise<{ count: number }> {
  const db = await tryGetDb();
  if (!db) return { count: 0 };
  const [results] = await db.query<{ count: number }[][]>(
    `SELECT count() AS count FROM product
    WHERE array::len(->contains->ingredient) = 0
    GROUP ALL`
  );
  return results?.[0] ?? { count: 0 };
}

// ─── Products with no generic link ────────────────────────────────────────────

export async function getProductsWithNoGenericLink(): Promise<{ count: number }> {
  const db = await tryGetDb();
  if (!db) return { count: 0 };
  const [results] = await db.query<{ count: number }[][]>(
    `SELECT count() AS count FROM product
    WHERE link_generic = NONE AND source != 'manufacturer_submission'
    GROUP ALL`
  );
  return results?.[0] ?? { count: 0 };
}
