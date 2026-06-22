import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategoryBySlug, CATEGORIES } from '@/lib/categories';
import { getCategoryIngredients } from '@/lib/queries';
import { getIngredientImage } from '@/lib/images';
import EvidenceRating from '@/components/EvidenceRating';
import JsonLd from '@/components/JsonLd';

export const dynamic = 'force-dynamic';

interface Props {
  params: { slug: string };
}

// Maps ingredient.category (DB value) → subtle rgba tint for image overlay
const CATEGORY_TINTS: Record<string, string> = {
  'Sleep':        'rgba(99,  102, 241, 0.15)',
  'Performance':  'rgba(16,  185, 129, 0.15)',
  'Recovery':     'rgba(59,  130, 246, 0.15)',
  'Gut Health':   'rgba(132, 204,  22, 0.15)',
  'Longevity':    'rgba(139,  92, 246, 0.15)',
  'Vitamins':     'rgba(249, 115,  22, 0.15)',
  'Minerals':     'rgba(6,   182, 212, 0.15)',
  'Herbal':       'rgba(236,  72, 153, 0.15)',
  'Omega Oils':   'rgba(245, 158,  11, 0.15)',
  'Protein':      'rgba(16,  185, 129, 0.15)',
  'Amino Acids':  'rgba(16,  185, 129, 0.15)',
};

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);
  if (!category) return {};

  const title = `${category.name} Supplements`;
  const description = category.description;
  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://supplifyed.com'}/category/${params.slug}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} — Supplifyed`,
      description,
      url,
      type: 'website',
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

        {/* Breadcrumb */}
        <nav className="text-xs font-mono text-[var(--c-text-3)]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--c-text-2)] transition-colors">Home</Link>
          <span className="mx-2 text-[var(--c-border)]">·</span>
          <span className="text-[var(--c-text-2)]">{category.name}</span>
        </nav>

        {/* Header */}
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

        {/* Evidence rating key */}
        <div className="evidence-filter-bar">
          <span className="evidence-filter-label">Evidence</span>
          {(['strong', 'moderate', 'mixed', 'limited'] as const).map((r) => (
            <span key={r} className={`evidence-filter-pill evidence-filter-pill--${r}`}>
              {r}
            </span>
          ))}
        </div>

        {/* Ingredient grid */}
        {ingredients.length === 0 ? (
          <p className="text-[var(--c-text-3)] py-16 text-center font-mono">
            No ingredients in this category yet.
          </p>
        ) : (
          <div className="ingredient-card-grid">
            {ingredients.map((ingredient, i) => {
              const tint = CATEGORY_TINTS[ingredient.category] ?? 'rgba(16,185,129,0.12)';
              return (
                <Link
                  key={ingredient.id}
                  href={`/ingredient/${ingredient.slug}`}
                  className="ingredient-card"
                  style={{ '--i': i } as React.CSSProperties}
                >
                  {/* Image strip */}
                  <div
                    className="ingredient-card-image"
                    style={{
                      backgroundImage: `url(${getIngredientImage(ingredient.name, 400, 200)})`,
                    }}
                  >
                    <div
                      className="ingredient-card-image-overlay"
                      style={{
                        background: `linear-gradient(135deg, ${tint} 0%, transparent 60%), linear-gradient(to bottom, transparent 30%, var(--bg-surface) 100%)`,
                      }}
                    />
                  </div>

                  {/* Card content */}
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
              );
            })}
          </div>
        )}

        {/* Back */}
        <div className="pt-4 border-t border-[var(--c-border-subtle)]">
          <Link href="/" className="text-[var(--c-text-3)] hover:text-[var(--c-accent)] text-sm transition-colors">
            ← All categories
          </Link>
        </div>

      </div>
    </>
  );
}
