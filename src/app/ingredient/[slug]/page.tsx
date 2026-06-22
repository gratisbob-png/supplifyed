import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getIngredient } from '@/lib/queries';
import { getIngredientImage } from '@/lib/images';
import IngredientPage from '@/components/IngredientPage';
import JsonLd from '@/components/JsonLd';
import ScanLine from '@/components/ScanLine';

interface Props {
  params: { slug: string };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://supplifyed.com';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ingredient = await getIngredient(params.slug);
  if (!ingredient) return {};

  const title = `${ingredient.name} — Evidence, Dose, and Products`;
  const description = ingredient.description.length > 160
    ? ingredient.description.slice(0, 157) + '...'
    : ingredient.description;
  const url = `${SITE_URL}/ingredient/${ingredient.slug}`;

  return {
    title: ingredient.name,
    description,
    openGraph: { title, description, url, type: 'article', siteName: 'Supplifyed' },
    twitter: { card: 'summary', title, description },
    alternates: { canonical: url },
  };
}

export default async function IngredientRoute({ params }: Props) {
  const ingredient = await getIngredient(params.slug);
  if (!ingredient) notFound();

  const url = `${SITE_URL}/ingredient/${ingredient.slug}`;

  const substanceJsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ChemicalSubstance',
    name: ingredient.name,
    description: ingredient.description,
    url,
    ...(ingredient.synonyms?.length ? { alternateName: ingredient.synonyms } : {}),
    ...(ingredient.molecular_formula ? { chemicalComposition: ingredient.molecular_formula } : {}),
    ...(ingredient.mechanism_of_action ? { mechanismOfAction: ingredient.mechanism_of_action } : {}),
  };

  const faqJsonLd =
    (ingredient.faqs?.length ?? 0) > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: (ingredient.faqs ?? []).map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }
      : null;

  return (
    <>
      <ScanLine key={ingredient.slug} />
      <JsonLd data={substanceJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}

      {/* Full-width hero image */}
      <div
        className="ingredient-hero"
        style={{ backgroundImage: `url(${getIngredientImage(ingredient.name, 1200, 380)})` }}
      >
        <div className="ingredient-hero-overlay" />
        <p className="ingredient-hero-title" aria-hidden="true">{ingredient.name}</p>
      </div>

      <div className="space-y-8">
        {/* Breadcrumb */}
        <nav className="text-xs font-mono text-[var(--c-text-3)]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--c-text-2)] transition-colors">Home</Link>
          <span className="mx-2 text-[var(--c-border)]">·</span>
          <span className="text-[var(--c-text-3)]">{ingredient.category}</span>
          <span className="mx-2 text-[var(--c-border)]">·</span>
          <span className="text-[var(--c-text-2)]">{ingredient.name}</span>
        </nav>

        <IngredientPage ingredient={ingredient} />
      </div>
    </>
  );
}
