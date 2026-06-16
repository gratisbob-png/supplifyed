/**
 * Tier classifier — pure function, no DB dependencies.
 * For a set of products sharing one ingredient, assigns aspiration/rational/economic.
 * Used by the automation pipeline and verified by test_tier_classifier.ts.
 */

export type Tier = 'aspiration' | 'rational' | 'economic';

export interface ProductInput {
  asin: string;
  name: string;
  rrp: number;
  certifications: string[];
}

export interface ClassifiedProduct extends ProductInput {
  assigned_tier: Tier;
}

// Sort by RRP descending; certifications break ties (more = higher tier).
// Cast rrp to Number — SurrealDB decimal serialises as Decimal object across the SDK boundary.
export function classifyTiers(products: ProductInput[]): ClassifiedProduct[] {
  if (products.length === 0) return [];

  const sorted = [...products].sort((a, b) => {
    const aRrp = Number(a.rrp);
    const bRrp = Number(b.rrp);
    if (bRrp !== aRrp) return bRrp - aRrp;
    return b.certifications.length - a.certifications.length;
  });

  return sorted.map((p, i): ClassifiedProduct => {
    let assigned_tier: Tier;
    if (i === 0) {
      assigned_tier = 'aspiration';
    } else if (i === sorted.length - 1) {
      assigned_tier = 'economic';
    } else {
      assigned_tier = 'rational';
    }
    return { ...p, assigned_tier };
  });
}
