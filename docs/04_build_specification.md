# SUPPLIFYED — BUILD SPECIFICATION
## Complete Technical Specification for Claude Code

---

## STACK

| Layer | Technology | Why |
|-------|-----------|-----|
| Database | SurrealDB | Graph + relational in one. Laptop-first. Scales to cloud. |
| Backend / API | Next.js API routes | Unified with frontend. Vercel deployment. |
| Frontend | Next.js 14 + TypeScript | App router. Static generation where possible. |
| Hosting | Vercel | Free tier. GitHub integration. Automatic deploys. |
| Styling | Tailwind CSS | Utility-first. No opinion framework. Fast. |
| Testing | Vitest + Testing Library | Fast. Native TypeScript. |

---

## ENVIRONMENT VARIABLES

```bash
# .env.example — all required keys

# SurrealDB
SURREALDB_URL=
SURREALDB_NS=supplifyed
SURREALDB_DB=production
SURREALDB_USER=
SURREALDB_PASS=

# Amazon
AMAZON_ACCESS_KEY=
AMAZON_SECRET_KEY=
AMAZON_PARTNER_TAG=
AMAZON_HOST=webservices.amazon.co.uk

# Affiliate Networks
AWIN_PUBLISHER_ID=
CJ_WEBSITE_ID=
SHAREASALE_MERCHANT_ID=

# Analytics
NEXT_PUBLIC_GA4_ID=

# App Config
NEXT_PUBLIC_SITE_URL=https://supplifyed.com
BRAND_MARKETING_CHAR_LIMIT=500
LINK_CHECK_INTERVAL_DAYS=7
```

---

## TYPESCRIPT TYPES

```typescript
// src/types/index.ts

export type EvidenceRating = 'strong' | 'moderate' | 'mixed' | 'limited';
export type ProductTier = 'aspiration' | 'rational' | 'economic';
export type LinkStatus = 'live' | 'dead' | 'redirected';
export type FundedBy = 'independent' | 'manufacturer' | 'government' | 'unknown';
export type AffiliateNetwork = 'amazon' | 'awin' | 'cj' | 'shareasale' | 'direct';
export type ProductSource = 'bestseller_scrape' | 'manufacturer_submission';
export type SourceBadge = 'LABEL' | 'MANUFACTURER' | 'BRAND_MARKETING' | 'PEER_REVIEWED' | 'PRESS' | 'INSTRUCTIONAL';

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  description: string;
  primary_use: string[];
  evidence_rating: EvidenceRating;
  dose_context: string;
  legal_notes?: string;
  last_verified: Date;
}

export interface Product {
  id: string;
  asin: string;
  name: string;
  brand_id: string;
  tier: ProductTier;
  rrp: number;
  rrp_currency: string;
  certifications: string[];
  packet_text: string;
  brand_marketing?: string;
  link_official?: string;
  link_amazon: string;
  link_generic?: string;
  link_status: LinkStatus;
  source: ProductSource;
  last_verified: Date;
}

export interface Evidence {
  id: string;
  title: string;
  authors: string;
  year: number;
  journal: string;
  doi?: string;
  link: string;
  funded_by: FundedBy;
  finding: string;
  dose_studied: string;
  outcome: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  evidence_refs: string[];
  search_volume?: number;
  last_updated: Date;
}

export interface Brand {
  id: string;
  name: string;
  website: string;
  affiliate_network: AffiliateNetwork;
  affiliate_link: string;
  commission_rate?: number;
  submission_date?: Date;
}

// Graph traversal result types
export interface IngredientWithEvidence extends Ingredient {
  evidence: Evidence[];
  faqs: FAQ[];
  products: ProductWithBrand[];
}

export interface ProductWithBrand extends Product {
  brand: Brand;
  ingredients: IngredientContains[];
}

export interface IngredientContains {
  ingredient: Ingredient;
  dose_per_serving: string;
  unit: string;
  form: string;
}

export interface CardData {
  product: ProductWithBrand;
  primary_ingredient: Ingredient;
}

export interface IngredientBuilderResult {
  selected_ingredients: Ingredient[];
  matching_products: ProductWithBrand[];
}
```

---

## DATABASE CLIENT

```typescript
// src/lib/db.ts

import Surreal from 'surrealdb.js';

let db: Surreal | null = null;

export async function getDb(): Promise<Surreal> {
  if (db) return db;

  db = new Surreal();

  await db.connect(process.env.SURREALDB_URL!, {
    ns: process.env.SURREALDB_NS!,
    db: process.env.SURREALDB_DB!,
    auth: {
      username: process.env.SURREALDB_USER!,
      password: process.env.SURREALDB_PASS!,
    },
  });

  return db;
}

export async function closeDb(): Promise<void> {
  if (db) {
    await db.close();
    db = null;
  }
}
```

---

## GRAPH QUERIES

```typescript
// src/lib/queries.ts

import { getDb } from './db';
import type { IngredientWithEvidence, ProductWithBrand, IngredientBuilderResult } from '../types';

// Search — single query entry point
export async function search(query: string): Promise<{
  ingredients: IngredientWithEvidence[];
  faqs: FAQ[];
  products: ProductWithBrand[];
}> {
  const db = await getDb();
  const normalised = query.toLowerCase().trim();

  // Try ingredient match first
  const [ingredients] = await db.query<IngredientWithEvidence[][]>(`
    SELECT *,
      ->supported_by->evidence AS evidence,
      <-answers_about<-faq AS faqs,
      <-contains<-product.* AS products
    FROM ingredient
    WHERE string::lowercase(name) CONTAINS $query
       OR string::lowercase(description) CONTAINS $query
       OR primary_use CONTAINS $query
    LIMIT 5
  `, { query: normalised });

  // Try FAQ match
  const [faqs] = await db.query<FAQ[][]>(`
    SELECT * FROM faq
    WHERE string::lowercase(question) CONTAINS $query
    LIMIT 10
  `, { query: normalised });

  // Try product match
  const [products] = await db.query<ProductWithBrand[][]>(`
    SELECT *,
      ->made_by->brand AS brand,
      ->contains->(ingredient.*) AS ingredients
    FROM product
    WHERE string::lowercase(name) CONTAINS $query
    LIMIT 10
  `, { query: normalised });

  return {
    ingredients: ingredients ?? [],
    faqs: faqs ?? [],
    products: products ?? [],
  };
}

// Get full ingredient page data
export async function getIngredient(slug: string): Promise<IngredientWithEvidence | null> {
  const db = await getDb();

  const [[ingredient]] = await db.query<IngredientWithEvidence[][]>(`
    SELECT *,
      ->supported_by->evidence AS evidence,
      <-answers_about<-faq AS faqs,
      <-contains<-product.* AS products
    FROM ingredient
    WHERE id = $id
  `, { id: `ingredient:${slug}` });

  return ingredient ?? null;
}

// Get products for three-tier display on ingredient page
export async function getTierStack(ingredientId: string): Promise<{
  aspiration: ProductWithBrand[];
  rational: ProductWithBrand[];
  economic: ProductWithBrand[];
}> {
  const db = await getDb();

  const [products] = await db.query<ProductWithBrand[][]>(`
    SELECT *,
      ->made_by->brand AS brand,
      ->contains->(ingredient.*) AS ingredients
    FROM product
    WHERE ->contains->ingredient.id CONTAINS $ingredientId
      AND link_status = 'live'
    ORDER BY tier
  `, { ingredientId });

  const tiers = { aspiration: [], rational: [], economic: [] };
  for (const p of products ?? []) {
    tiers[p.tier as keyof typeof tiers]?.push(p);
  }
  return tiers;
}

// Ingredient builder — find intersection of multiple ingredients
export async function ingredientBuilder(ingredientIds: string[]): Promise<IngredientBuilderResult> {
  const db = await getDb();

  if (ingredientIds.length === 0) return { selected_ingredients: [], matching_products: [] };

  // Find products containing ALL selected ingredients
  const [products] = await db.query<ProductWithBrand[][]>(`
    SELECT *,
      ->made_by->brand AS brand,
      ->contains->(ingredient.*) AS ingredients
    FROM product
    WHERE link_status = 'live'
      AND (
        SELECT count() FROM ->contains->ingredient
        WHERE id IN $ingredientIds
        GROUP ALL
      )[0].count = $count
  `, { ingredientIds, count: ingredientIds.length });

  const [selected] = await db.query<Ingredient[][]>(`
    SELECT * FROM ingredient WHERE id IN $ids
  `, { ids: ingredientIds });

  return {
    selected_ingredients: selected ?? [],
    matching_products: products ?? [],
  };
}

// Get full product page data
export async function getProduct(slug: string): Promise<ProductWithBrand | null> {
  const db = await getDb();

  const [[product]] = await db.query<ProductWithBrand[][]>(`
    SELECT *,
      ->made_by->brand AS brand,
      ->contains->(ingredient.* AS ingredient, dose_per_serving, unit, form) AS ingredients
    FROM product
    WHERE id = $id
  `, { id: `product:${slug}` });

  return product ?? null;
}
```

---

## AFFILIATE LINK GENERATION

```typescript
// src/lib/affiliate.ts

export interface AffiliateLinks {
  official?: string;
  amazon: string;
  generic?: string;
}

export function generateAmazonLink(asin: string): string {
  const tag = process.env.AMAZON_PARTNER_TAG;
  if (!tag) throw new Error('AMAZON_PARTNER_TAG not set');
  return `https://www.amazon.co.uk/dp/${asin}?tag=${tag}`;
}

export function generateGenericLink(ingredientName: string): string {
  const tag = process.env.AMAZON_PARTNER_TAG;
  const query = encodeURIComponent(ingredientName);
  return `https://www.amazon.co.uk/s?k=${query}&tag=${tag}`;
}

export function buildLinks(product: Product, primaryIngredient?: Ingredient): AffiliateLinks {
  return {
    official: product.link_official,
    amazon: generateAmazonLink(product.asin),
    generic: primaryIngredient
      ? generateGenericLink(primaryIngredient.name)
      : product.link_generic ?? undefined,
  };
}

// Validate all links are live
export async function checkLink(url: string): Promise<LinkStatus> {
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'manual' });
    if (res.status >= 200 && res.status < 300) return 'live';
    if (res.status >= 300 && res.status < 400) return 'redirected';
    return 'dead';
  } catch {
    return 'dead';
  }
}
```

---

## SOURCE BADGE SYSTEM

```typescript
// src/components/SourceBadge.tsx

const BADGE_CONFIG = {
  LABEL: {
    label: 'Manufacturer Label',
    colour: 'bg-emerald-900 text-white',
    description: 'Verbatim text from the product label'
  },
  MANUFACTURER: {
    label: 'Official Specs',
    colour: 'bg-emerald-800 text-white',
    description: 'Data from manufacturer or Amazon listing'
  },
  BRAND_MARKETING: {
    label: 'Brand Marketing',
    colour: 'bg-amber-700 text-white',
    description: 'Content submitted by the manufacturer'
  },
  PEER_REVIEWED: {
    label: 'Peer Reviewed',
    colour: 'bg-blue-900 text-white',
    description: 'Published peer-reviewed research'
  },
  PRESS: {
    label: 'Press',
    colour: 'bg-slate-700 text-white',
    description: 'Published media coverage'
  },
  INSTRUCTIONAL: {
    label: 'Instructional',
    colour: 'bg-gray-600 text-white',
    description: 'Usage and dosing guidance'
  },
} as const;
```

---

## QUALITY CHECKS — AUTOMATED

```typescript
// scripts/quality_check.ts
// Run before any deploy. Must all pass.

const OPINION_WORDS = [
  'best', 'recommended', 'top', 'winner', 'suggest',
  'should buy', 'we recommend', 'our pick', 'favourite',
  'number one', '#1 pick', 'must-have'
];

export async function checkNoOpinionLanguage(text: string): Promise<boolean> {
  const lower = text.toLowerCase();
  const found = OPINION_WORDS.filter(word => lower.includes(word));
  if (found.length > 0) {
    console.error(`Opinion language found: ${found.join(', ')}`);
    return false;
  }
  return true;
}

export async function checkAllProductsHaveContainsEdge(): Promise<boolean> {
  const db = await getDb();
  const [[result]] = await db.query<{count: number}[][]>(`
    SELECT count() AS count FROM product
    WHERE array::len(->contains->ingredient) = 0
    GROUP ALL
  `);
  return (result?.count ?? 0) === 0;
}

export async function checkAllSupplementsHaveGenericLink(): Promise<boolean> {
  const db = await getDb();
  const [[result]] = await db.query<{count: number}[][]>(`
    SELECT count() AS count FROM product
    WHERE link_generic = NONE AND source != 'manufacturer_submission'
    GROUP ALL
  `);
  return (result?.count ?? 0) === 0;
}

export async function checkNoLivePricing(content: string): Promise<boolean> {
  // RRP must be a static number, never a dynamic price endpoint
  const livePatterns = [/price.*api/i, /live.*price/i, /real.*time.*price/i];
  return !livePatterns.some(p => p.test(content));
}

export async function runAllQualityChecks(): Promise<void> {
  console.log('Running quality checks...');
  const checks = [
    checkAllProductsHaveContainsEdge(),
    checkAllSupplementsHaveGenericLink(),
  ];
  const results = await Promise.all(checks);
  const failed = results.filter(r => !r).length;
  if (failed > 0) {
    throw new Error(`${failed} quality check(s) failed. Fix before deploying.`);
  }
  console.log('All quality checks passed.');
}
```

---

## BUILD SEQUENCE — DETAILED

### Phase 0 — Before Any Code

```bash
# Required accounts — apply for all before touching code
# Amazon Associates:  https://affiliate-program.amazon.co.uk
# Amazon PA API:      https://webservices.amazon.com/paapi5
# Awin:               https://www.awin.com/gb/publishers
# CJ Affiliate:       https://www.cj.com/publisher
# ShareASale:         https://www.shareasale.com/info/publisher.cfm
# Google Analytics:   https://analytics.google.com
# Google Search Console: https://search.google.com/search-console

# Legal docs required before launch:
# - Privacy policy (references affiliate links, data licensing, cookies)
# - Cookie consent (GDPR compliant)
# - Manufacturer submission terms
```

### Phase 1 — Infrastructure

```bash
# 1. Initialise project
npx create-next-app@latest supplifyed --typescript --tailwind --app
cd supplifyed

# 2. Install dependencies
npm install surrealdb.js
npm install -D vitest @testing-library/react @testing-library/jest-dom

# 3. Set up SurrealDB locally
# Install SurrealDB: https://surrealdb.com/install
surreal start --log trace --user root --pass root memory

# 4. Run schema
surreal import --conn http://localhost:8000 --user root --pass root \
  --ns supplifyed --db production schema/nodes/ingredient.surql
# Repeat for all schema files

# 5. Validate
npx tsx scripts/validate_schema.ts

# 6. Connect Vercel
vercel init
vercel link
```

### Phase 2 — Ingredient Graph

```bash
# Seed first 10 ingredients manually
npx tsx scripts/seed_ingredients.ts

# Run evidence compiler for each
# (manually at Phase 1, automated at Phase 2)

# Verify graph connections
npx tsx scripts/test_queries.ts

# All 10 must pass:
# ✓ ingredient:creatine has >0 evidence nodes
# ✓ ingredient:creatine has >0 faq nodes
# ✓ search('creatine') returns ingredient with evidence
# ✓ search('does creatine cause hair loss') returns faq node
```

### Phase 3 — Product Layer

```bash
# Connect PA API
npx tsx scripts/test_pa_api.ts

# Seed first products
npx tsx scripts/seed_products.ts

# Verify tier classification
npx tsx scripts/test_tier_classifier.ts

# Verify affiliate links
npx tsx scripts/test_affiliate_links.ts
```

### Phase 4 — Frontend

```bash
# Development
npm run dev

# Component checklist:
# ✓ SearchBar returns results for all 10 ingredients
# ✓ IngredientPage renders with evidence + FAQ sections
# ✓ ProductCard shows all fields with source badges
# ✓ TierStack shows all three tiers correctly
# ✓ BuyButtons show correct number of links per product type
# ✓ CardCompare renders 2-4 cards side by side without breakage
# ✓ IngredientBuilder returns intersection correctly
# ✓ No opinion language in any rendered output

# Run quality check
npx tsx scripts/quality_check.ts

# Run tests
npm test
```

### Phase 5 — Automation

```bash
# All 12 skill files must be written before automation phase begins
# Each skill file is a markdown document in skills/
# Claude Code reads the skill and executes it

# Test each skill individually before running in sequence
# Verify task queue prevents API rate limit collisions
# Set up scheduled tasks via Vercel cron or external scheduler

# MILESTONE: Run full pipeline on one new product without any manual intervention
# Product identified → fetched → tiered → linked → published → verified
```

---

## SKILL FILE TEMPLATE

Each skill file in `skills/` follows this structure:

```markdown
# SKILL: [Name]
**Version:** 1.0
**Trigger:** [When this skill runs]
**Input:** [What it receives]
**Output:** [What it produces]

## WHAT THIS SKILL DOES
[Plain language description]

## INPUTS
- field_name: type — description

## PROCESS
1. Step one
2. Step two
3. Step three

## OUTPUT
- field_name: type — description

## RULES
- Rule one (must)
- Rule two (must not)

## ERROR HANDLING
- What to do if X fails
- What to flag for human review

## QUALITY CHECKS
- Check one
- Check two
```

---

## HARD RULES SUMMARY

These are encoded in the quality checker and must never be violated:

```
1. NO CONTENT WITHOUT SOURCE BADGE — zero exceptions
2. NO OPINION LANGUAGE — no best, recommended, top, winner, suggest
3. BRAND MARKETING CAP — same limit for every brand, enforced at intake
4. GENERIC INGREDIENT LINK — never removed by manufacturer submission
5. RRP ONLY — never live pricing, never a dynamic price endpoint
6. MANUFACTURERS ONLY — no resellers, distributors, third parties
7. EVIDENCE FUNDED_BY — every evidence node must have funded_by populated
8. LINK STATUS — every product link checked weekly, dead links flagged immediately
```
