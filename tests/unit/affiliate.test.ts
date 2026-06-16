import { describe, it, expect, beforeEach } from 'vitest';
import { generateAmazonLink, generateGenericSearchLink, validateAffiliateTag, buildLinks } from '@/lib/affiliate';
import type { Product, Brand, IngredientContains, Ingredient } from '@/types';

beforeEach(() => {
  process.env.AMAZON_PARTNER_TAG = 'supplifyed-21';
});

describe('generateAmazonLink', () => {
  it('generates a valid Amazon UK affiliate link', () => {
    const link = generateAmazonLink('B002DYIZEO');
    expect(link).toBe('https://www.amazon.co.uk/dp/B002DYIZEO?tag=supplifyed-21');
  });

  it('uses placeholder tag if AMAZON_PARTNER_TAG is not set', () => {
    delete process.env.AMAZON_PARTNER_TAG;
    const link = generateAmazonLink('B002DYIZEO');
    expect(link).toContain('tag=');
    expect(link).toContain('B002DYIZEO');
  });
});

describe('generateGenericSearchLink', () => {
  it('generates a valid generic search link with encoded query', () => {
    const link = generateGenericSearchLink('creatine monohydrate bulk powder');
    expect(link).toContain('https://www.amazon.co.uk/s?k=');
    expect(link).toContain('tag=supplifyed-21');
    expect(link).toContain('creatine%20monohydrate');
  });
});

describe('validateAffiliateTag', () => {
  it('returns true for link with correct tag', () => {
    const url = 'https://www.amazon.co.uk/dp/B002DYIZEO?tag=supplifyed-21';
    expect(validateAffiliateTag(url)).toBe(true);
  });

  it('returns false for link missing tag', () => {
    const url = 'https://www.amazon.co.uk/dp/B002DYIZEO';
    expect(validateAffiliateTag(url)).toBe(false);
  });

  it('returns false if AMAZON_PARTNER_TAG not set and url has no tag', () => {
    delete process.env.AMAZON_PARTNER_TAG;
    const url = 'https://www.amazon.co.uk/dp/B002DYIZEO';
    expect(validateAffiliateTag(url)).toBe(false);
  });
});

describe('buildLinks', () => {
  const mockBrand: Brand = {
    id: 'brand:test',
    name: 'Test Brand',
    website: 'https://test.com',
    affiliate_network: 'amazon',
    affiliate_link: 'https://test.com',
  };

  const mockIngredient: Ingredient = {
    id: 'ingredient:creatine-monohydrate',
    name: 'Creatine Monohydrate',
    slug: 'creatine-monohydrate',
    category: 'Performance',
    description: 'Test',
    primary_use: [],
    evidence_rating: 'strong',
    dose_context: 'Test',
    last_verified: new Date(),
  };

  const mockProduct: Product & { brand: Brand; ingredients: IngredientContains[] } = {
    id: 'product:test',
    asin: 'B002DYIZEO',
    name: 'Test Product',
    slug: 'test-product',
    brand_id: 'brand:test',
    tier: 'rational',
    rrp: 19.99,
    rrp_currency: 'GBP',
    certifications: [],
    packet_text: 'Test',
    link_amazon: 'https://www.amazon.co.uk/dp/B002DYIZEO?tag=supplifyed-21',
    link_status: 'live',
    source: 'bestseller_scrape',
    last_verified: new Date(),
    brand: mockBrand,
    ingredients: [],
  };

  it('builds links with official URL when present', () => {
    const product = { ...mockProduct, link_official: 'https://brand.com/product' };
    const links = buildLinks(product, mockIngredient);
    expect(links.official).toBe('https://brand.com/product');
    expect(links.amazon).toContain('B002DYIZEO');
    expect(links.generic).toBeDefined();
  });

  it('builds links without official URL when absent', () => {
    const links = buildLinks(mockProduct, mockIngredient);
    expect(links.official).toBeUndefined();
    expect(links.amazon).toContain('B002DYIZEO');
  });

  it('generates generic link from ingredient name', () => {
    const links = buildLinks(mockProduct, mockIngredient);
    expect(links.generic).toContain('Creatine');
    expect(links.generic).toContain('tag=supplifyed-21');
  });

  it('all links contain affiliate tag', () => {
    const links = buildLinks(mockProduct, mockIngredient);
    expect(validateAffiliateTag(links.amazon)).toBe(true);
    expect(validateAffiliateTag(links.generic!)).toBe(true);
  });
});
