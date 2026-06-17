import type { Metadata } from 'next';
import { search } from '@/lib/queries';
import ProductCard from '@/components/ProductCard';
import EvidenceRating from '@/components/EvidenceRating';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';
import { highlight } from '@/lib/highlight';

interface Props {
  searchParams: { q?: string };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const q = searchParams.q?.trim();
  if (!q) return { title: 'Search', robots: { index: false, follow: false } };
  return {
    title: `"${q}" — Search`,
    description: `Supplement information results for: ${q}`,
    robots: { index: false, follow: false },
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const q = searchParams.q?.trim() ?? '';

  if (!q) {
    return (
      <div className="space-y-6 max-w-2xl mx-auto py-8">
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--c-text-3)]">Search</p>
        <SearchBar autoFocus />
        <p className="text-[var(--c-text-3)] text-sm">Enter a search term to get started.</p>
      </div>
    );
  }

  const results = await search(q);
  const hasResults =
    results.ingredients.length > 0 || results.faqs.length > 0 || results.products.length > 0;

  return (
    <div className="space-y-12">

      {/* Search bar stays at top */}
      <div className="max-w-2xl">
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--c-text-3)] mb-3">Search</p>
        <SearchBar defaultValue={q} />
      </div>

      {!hasResults ? (
        <div className="py-16 text-center space-y-2">
          <p className="text-[var(--c-text-2)] text-lg">
            No results for &ldquo;{q}&rdquo;
          </p>
          <p className="text-[var(--c-text-3)] text-sm">
            Try an ingredient name, a supplement question, or a product name.
          </p>
        </div>
      ) : (
        <>
          {results.ingredients.length > 0 && (
            <section>
              <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--c-text-3)] mb-4">
                Ingredients
              </h2>
              <div className="space-y-2">
                {results.ingredients.map((ingredient) => (
                  <Link
                    key={ingredient.id}
                    href={`/ingredient/${ingredient.slug}`}
                    className="card group flex items-start gap-4 p-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className="font-semibold text-[var(--c-text)] group-hover:text-[var(--c-accent)] transition-colors text-sm"
                          dangerouslySetInnerHTML={{ __html: highlight(ingredient.name, q) }}
                        />
                        <EvidenceRating rating={ingredient.evidence_rating} />
                      </div>
                      <p className="text-[var(--c-text-3)] text-sm line-clamp-2 leading-relaxed">
                        {ingredient.description}
                      </p>
                    </div>
                    <span className="shrink-0 text-[var(--c-text-3)] group-hover:text-[var(--c-accent)] text-sm transition-colors mt-0.5">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {results.faqs.length > 0 && (
            <section>
              <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--c-text-3)] mb-4">
                Questions
              </h2>
              <div className="space-y-2">
                {results.faqs.map((faq) => (
                  <div key={faq.id} className="card p-4">
                    <p className="font-medium text-[var(--c-text)] text-sm mb-2">{faq.question}</p>
                    <p className="text-[var(--c-text-3)] text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {results.products.length > 0 && (
            <section>
              <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--c-text-3)] mb-4">
                Products
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {results.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
