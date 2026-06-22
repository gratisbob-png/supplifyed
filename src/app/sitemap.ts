import type { MetadataRoute } from 'next';
import { CATEGORIES } from '@/lib/categories';
import { getAllIngredients, getAllProducts } from '@/lib/queries';

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://supplifyed.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/builder`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  let ingredientPages: MetadataRoute.Sitemap = [];
  let productPages: MetadataRoute.Sitemap = [];

  try {
    const [ingredients, products] = await Promise.all([
      getAllIngredients(),
      getAllProducts(),
    ]);

    ingredientPages = ingredients.map((ing) => ({
      url: `${SITE_URL}/ingredient/${ing.slug}`,
      lastModified: ing.last_verified ? new Date(ing.last_verified) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    productPages = products.map((prod) => ({
      url: `${SITE_URL}/product/${prod.slug}`,
      lastModified: prod.last_verified ? new Date(prod.last_verified) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch {
    // DB unavailable at build time — static pages only
  }

  return [...staticPages, ...categoryPages, ...ingredientPages, ...productPages];
}
