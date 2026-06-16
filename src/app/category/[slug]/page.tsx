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
    alternates: {
      canonical: url,
    },
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
          <Link href="/" className="hover:text-[var(--c-text-2)] transition-colors">
            Home
          </Link>
          <span className="mx-2 text-[var(--c-border)]">·</span>
          <span className="text-[var(--c-text-2)]">{category.name}</span>
        </nav>

        {/* Header */}
        <div className={`cat-${params.slug} -mx-4 px-4 py-10 rounded-xl border border-white/[0.06]`}>
          <h1 className="text-3xl font-bold text-white mb-2">{category.name}</h1>
          <p className="text-[var(--c-text-2)] text-base max-w-2xl leading-relaxed">
            {category.description}
          </p>
          <p className="text-[var(--c-text-3)] text-xs font-mono mt-3">
            {ingredients.length} ingredient{ingredients.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Evidence rating key */}
        <div className="flex flex-wrap gap-3 p-4 rounded-xl border border-[var(--c-border)] bg-[var(--c-surface)]">
          <span className="text-xs font-mono text-[var(--c-text-3)] uppercase tracking-wide self-center">
            Evidence rating
          </span>
          {(['strong', 'moderate', 'mixed', 'limited'] as const).map((r) => (
            <EvidenceRating key={r} rating={r} />
          ))}
        </div>

        {/* Ingredient grid */}
        {ingredients.length === 0 ? (
          <p className="text-[var(--c-text-3)] py-16 text-center font-mono">
            No ingredients in this category yet.
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {ingredients.map((ingredient) => (
              <Link
                key={ingredient.id}
                href={`/ingredient/${ingredient.slug}`}
                className="card group block p-5 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-semibold text-[var(--c-text)] group-hover:text-[var(--c-accent)] text-sm leading-snug transition-colors">
                    {ingredient.name}
                  </h2>
                  <div className="shrink-0">
                    <EvidenceRating rating={ingredient.evidence_rating} />
                  </div>
                </div>

                <p className="text-[var(--c-text-3)] text-sm line-clamp-3 leading-relaxed">
                  {ingredient.description}
                </p>

                {ingredient.primary_use.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {ingredient.primary_use.slice(0, 3).map((use) => (
                      <span
                        key={use}
                        className="text-xs text-[var(--c-text-3)] border border-[var(--c-border-subtle)] rounded-full px-2 py-0.5"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
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
