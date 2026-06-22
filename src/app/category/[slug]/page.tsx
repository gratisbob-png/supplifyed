import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategoryBySlug, CATEGORIES } from '@/lib/categories';
import { getCategoryIngredients } from '@/lib/queries';
import EvidenceRating from '@/components/EvidenceRating';
import JsonLd from '@/components/JsonLd';

export const dynamic = 'force-dynamic';

interface Props {
  params: { slug: string };
}

// Ingredient card image strip — radial glow fades to card body (#0F1012)
const CARD_GRADIENTS: Record<string, string> = {
  'Sleep':       'radial-gradient(ellipse 120% 200% at 50% -5%, rgba(99,102,241,0.65) 0%, transparent 60%), linear-gradient(to bottom, #0d0d24 0%, #0F1012 100%)',
  'Performance': 'radial-gradient(ellipse 120% 200% at 50% -5%, rgba(59,130,246,0.65) 0%, transparent 60%), linear-gradient(to bottom, #0a1228 0%, #0F1012 100%)',
  'Recovery':    'radial-gradient(ellipse 120% 200% at 50% -5%, rgba(6,182,212,0.65) 0%, transparent 60%), linear-gradient(to bottom, #04121a 0%, #0F1012 100%)',
  'Gut Health':  'radial-gradient(ellipse 120% 200% at 50% -5%, rgba(16,185,129,0.65) 0%, transparent 60%), linear-gradient(to bottom, #071a10 0%, #0F1012 100%)',
  'Longevity':   'radial-gradient(ellipse 120% 200% at 50% -5%, rgba(5,150,105,0.60) 0%, transparent 60%), linear-gradient(to bottom, #051a0c 0%, #0F1012 100%)',
  'Vitamins':    'radial-gradient(ellipse 120% 200% at 50% -5%, rgba(245,158,11,0.65) 0%, transparent 60%), linear-gradient(to bottom, #1a1000 0%, #0F1012 100%)',
  'Minerals':    'radial-gradient(ellipse 120% 200% at 50% -5%, rgba(100,116,139,0.60) 0%, transparent 60%), linear-gradient(to bottom, #0f1015 0%, #0F1012 100%)',
  'Herbal':      'radial-gradient(ellipse 120% 200% at 50% -5%, rgba(132,204,22,0.65) 0%, transparent 60%), linear-gradient(to bottom, #0a1405 0%, #0F1012 100%)',
  'Omega Oils':  'radial-gradient(ellipse 120% 200% at 50% -5%, rgba(245,158,11,0.60) 0%, transparent 60%), linear-gradient(to bottom, #1a1200 0%, #0F1012 100%)',
  'Protein':     'radial-gradient(ellipse 120% 200% at 50% -5%, rgba(59,130,246,0.65) 0%, transparent 60%), linear-gradient(to bottom, #0a1228 0%, #0F1012 100%)',
  'Amino Acids': 'radial-gradient(ellipse 120% 200% at 50% -5%, rgba(59,130,246,0.60) 0%, transparent 60%), linear-gradient(to bottom, #0a1228 0%, #0F1012 100%)',
};
const DEFAULT_CARD_GRADIENT = 'radial-gradient(ellipse 120% 200% at 50% -5%, rgba(0,229,196,0.55) 0%, transparent 60%), linear-gradient(to bottom, #040f0a 0%, #0F1012 100%)';

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);
  if (!category) return {};

  const url = `https://supplifyed.com/category/${params.slug}`;
  const title = `${category.name} Supplements — Research & Evidence Ratings`;
  const catLower = category.name.toLowerCase();

  // Description: category description + keyword anchors
  const desc = `${category.description} Browse ${catLower} supplement ingredients with evidence ratings, dosage research, and source-badged citations. No opinions.`;
  const metaDesc = desc.length > 160 ? desc.slice(0, 157) + '…' : desc;

  const keywords = [
    `${catLower} supplements`,
    `${catLower} supplement research`,
    `best ${catLower} supplements`,
    `${catLower} ingredient evidence`,
    `evidence-based ${catLower}`,
    `${catLower} dosage research`,
    `${catLower} supplements review`,
    'supplement evidence rating',
    'evidence-based supplements',
    'supplement database',
  ];

  const ogImage = `/api/og?category=${encodeURIComponent(category.name)}&type=category`;

  return {
    title,
    description: metaDesc,
    keywords,
    openGraph: {
      title: `${category.name} Supplements | Supplifyed`,
      description: metaDesc,
      url,
      type: 'website',
      siteName: 'Supplifyed',
      locale: 'en_GB',
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${category.name} supplements — evidence ratings` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} Supplements — Evidence Ratings`,
      description: metaDesc,
      images: [ogImage],
      creator: '@supplifyed',
    },
    alternates: { canonical: url },
  };
}

export default async function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const ingredients = await getCategoryIngredients(params.slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://supplifyed.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} Supplements`,
    description: category.description,
    url: `${siteUrl}/category/${params.slug}`,
    mainEntity: ingredients.slice(0, 20).map((ing) => ({
      '@type': 'ChemicalSubstance',
      name: ing.name,
      url: `${siteUrl}/ingredient/${ing.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <div className="space-y-10">

        <nav className="text-xs font-mono text-[var(--c-text-3)]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--c-text-2)] transition-colors">Home</Link>
          <span className="mx-2 text-[var(--c-border)]">·</span>
          <span className="text-[var(--c-text-2)]">{category.name}</span>
        </nav>

        <div className="category-hero">
          <span className="category-hero-ghost" aria-hidden="true">{category.name}</span>
          <div className="category-hero-content">
            <h1 className="category-hero-title">{category.name}</h1>
            <p className="category-hero-desc">{category.description}</p>
            <p className="category-hero-count">
              {ingredients.length} ingredient{ingredients.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="evidence-filter-bar">
          <span className="evidence-filter-label">Evidence</span>
          {(['strong', 'moderate', 'mixed', 'limited'] as const).map((r) => (
            <span key={r} className={`evidence-filter-pill evidence-filter-pill--${r}`}>
              {r}
            </span>
          ))}
        </div>

        {ingredients.length === 0 ? (
          <p className="text-[var(--c-text-3)] py-16 text-center font-mono">
            No ingredients in this category yet.
          </p>
        ) : (
          <div className="ingredient-card-grid">
            {ingredients.map((ingredient, i) => (
              <Link
                key={ingredient.id}
                href={`/ingredient/${ingredient.slug}`}
                className="ingredient-card"
                style={{ '--i': i } as React.CSSProperties}
              >
                {/* Gradient image strip — category colour fades to card body */}
                <div
                  className="ingredient-card-image"
                  style={{ background: CARD_GRADIENTS[ingredient.category] ?? DEFAULT_CARD_GRADIENT }}
                />

                <div className="ingredient-card-content">
                  <div className="ingredient-card-header">
                    <h2 className="ingredient-card-name">{ingredient.name}</h2>
                    <EvidenceRating rating={ingredient.evidence_rating} />
                  </div>
                  <p className="ingredient-card-body">{ingredient.description}</p>
                  {ingredient.primary_use.length > 0 && (
                    <div className="ingredient-card-tags">
                      {ingredient.primary_use.slice(0, 3).map((use) => (
                        <span key={use} className="ingredient-card-tag">{use}</span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="pt-4 border-t border-[var(--c-border-subtle)]">
          <Link href="/" className="text-[var(--c-text-3)] hover:text-[var(--c-accent)] text-sm transition-colors">
            ← All categories
          </Link>
        </div>

      </div>
    </>
  );
}
