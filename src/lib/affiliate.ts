import type { AffiliateLinks, LinkStatus, Product, Ingredient } from '@/types';

// Plug-and-play: set AMAZON_PARTNER_TAG in .env.local to activate real affiliate tracking.
// Until set, links use this placeholder and still function — they just don't earn commission.
const PLACEHOLDER_TAG = 'supplifyed-21';

function getTag(): string {
  return process.env.AMAZON_PARTNER_TAG ?? PLACEHOLDER_TAG;
}

export function generateAmazonLink(asin: string): string {
  return `https://www.amazon.co.uk/dp/${asin}?tag=${getTag()}`;
}

export function generateGenericSearchLink(ingredientName: string): string {
  const query = encodeURIComponent(ingredientName);
  return `https://www.amazon.co.uk/s?k=${query}&tag=${getTag()}`;
}

export function buildLinks(product: Product, primaryIngredient?: Ingredient): AffiliateLinks {
  return {
    official: product.link_official,
    amazon: generateAmazonLink(product.asin),
    generic: primaryIngredient
      ? generateGenericSearchLink(primaryIngredient.name)
      : (product.link_generic ?? undefined),
  };
}

export async function checkLink(url: string): Promise<LinkStatus> {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      redirect: 'manual',
      signal: AbortSignal.timeout(10_000),
    });
    if (res.status >= 200 && res.status < 300) return 'live';
    if (res.status >= 300 && res.status < 400) return 'redirected';
    return 'dead';
  } catch {
    return 'dead';
  }
}

// Validate that an affiliate link contains the correct network tag
export function validateAffiliateTag(url: string): boolean {
  const tag = process.env.AMAZON_PARTNER_TAG;
  if (!tag) return false;
  return url.includes(`tag=${tag}`);
}
