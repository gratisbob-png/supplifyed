import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getIngredient } from '@/lib/queries';
import IngredientPage from '@/components/IngredientPage';
import JsonLd from '@/components/JsonLd';
import ScanLine from '@/components/ScanLine';

interface Props {
  params: { slug: string };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://supplifyed.com';

// Full-bleed hero gradients — two radial glows + linear base per category
const HERO_GRADIENTS: Record<string, string> = {
  'Sleep': [
    'radial-gradient(ellipse 100% 120% at 28% 20%, rgba(99,102,241,0.75) 0%, transparent 55%)',
    'radial-gradient(ellipse 60% 80% at 78% 70%, rgba(139,92,246,0.38) 0%, transparent 50%)',
    'linear-gradient(160deg, #04040f 0%, #0a0a1e 50%, #08090A 100%)',
  ].join(','),
  'Performance': [
    'radial-gradient(ellipse 100% 120% at 28% 20%, rgba(59,130,246,0.70) 0%, transparent 55%)',
    'radial-gradient(ellipse 60% 80% at 78% 70%, rgba(37,99,235,0.35) 0%, transparent 50%)',
    'linear-gradient(160deg, #030810 0%, #0a1525 50%, #08090A 100%)',
  ].join(','),
  'Recovery': [
    'radial-gradient(ellipse 100% 120% at 28% 20%, rgba(6,182,212,0.70) 0%, transparent 55%)',
    'radial-gradient(ellipse 60% 80% at 78% 70%, rgba(14,165,233,0.35) 0%, transparent 50%)',
    'linear-gradient(160deg, #020b10 0%, #061520 50%, #08090A 100%)',
  ].join(','),
  'Gut Health': [
    'radial-gradient(ellipse 100% 120% at 28% 20%, rgba(16,185,129,0.70) 0%, transparent 55%)',
    'radial-gradient(ellipse 60% 80% at 78% 70%, rgba(5,150,105,0.35) 0%, transparent 50%)',
    'linear-gradient(160deg, #021008 0%, #071a10 50%, #08090A 100%)',
  ].join(','),
  'Longevity': [
    'radial-gradient(ellipse 100% 120% at 28% 20%, rgba(5,150,105,0.65) 0%, transparent 55%)',
    'radial-gradient(ellipse 60% 80% at 78% 70%, rgba(245,158,11,0.28) 0%, transparent 50%)',
    'linear-gradient(160deg, #02100a 0%, #051a0e 50%, #08090A 100%)',
  ].join(','),
  'Vitamins': [
    'radial-gradient(ellipse 100% 120% at 28% 20%, rgba(245,158,11,0.75) 0%, transparent 55%)',
    'radial-gradient(ellipse 60% 80% at 78% 70%, rgba(249,115,22,0.38) 0%, transparent 50%)',
    'linear-gradient(160deg, #100800 0%, #1e1200 50%, #08090A 100%)',
  ].join(','),
  'Minerals': [
    'radial-gradient(ellipse 100% 120% at 28% 20%, rgba(100,116,139,0.65) 0%, transparent 55%)',
    'radial-gradient(ellipse 60% 80% at 78% 70%, rgba(71,85,105,0.35) 0%, transparent 50%)',
    'linear-gradient(160deg, #070808 0%, #0f1015 50%, #08090A 100%)',
  ].join(','),
  'Herbal': [
    'radial-gradient(ellipse 100% 120% at 28% 20%, rgba(132,204,22,0.70) 0%, transparent 55%)',
    'radial-gradient(ellipse 60% 80% at 78% 70%, rgba(101,163,13,0.35) 0%, transparent 50%)',
    'linear-gradient(160deg, #050f02 0%, #0a1a05 50%, #08090A 100%)',
  ].join(','),
  'Omega Oils': [
    'radial-gradient(ellipse 100% 120% at 28% 20%, rgba(245,158,11,0.68) 0%, transparent 55%)',
    'radial-gradient(ellipse 60% 80% at 78% 70%, rgba(234,179,8,0.32) 0%, transparent 50%)',
    'linear-gradient(160deg, #0f0a00 0%, #1a1200 50%, #08090A 100%)',
  ].join(','),
  'Protein': [
    'radial-gradient(ellipse 100% 120% at 28% 20%, rgba(59,130,246,0.70) 0%, transparent 55%)',
    'radial-gradient(ellipse 60% 80% at 78% 70%, rgba(37,99,235,0.35) 0%, transparent 50%)',
    'linear-gradient(160deg, #030810 0%, #0a1525 50%, #08090A 100%)',
  ].join(','),
  'Amino Acids': [
    'radial-gradient(ellipse 100% 120% at 28% 20%, rgba(59,130,246,0.68) 0%, transparent 55%)',
    'radial-gradient(ellipse 60% 80% at 78% 70%, rgba(37,99,235,0.32) 0%, transparent 50%)',
    'linear-gradient(160deg, #030810 0%, #0a1525 50%, #08090A 100%)',
  ].join(','),
};
const DEFAULT_HERO_GRADIENT = [
  'radial-gradient(ellipse 100% 120% at 28% 20%, rgba(0,229,196,0.55) 0%, transparent 55%)',
  'linear-gradient(160deg, #040f0a 0%, #081a10 50%, #08090A 100%)',
].join(',');

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ingredient = await getIngredient(params.slug);
  if (!ingredient) return {};

  const { name, category, evidence_rating: rating, description: rawDesc, synonyms, slug } = ingredient;
  const url = `${SITE_URL}/ingredient/${slug}`;

  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  // Keyword-dense meta description: name + rating + leading sentence of description
  const lead = rawDesc.length > 130 ? rawDesc.slice(0, 127) + '…' : rawDesc;
  const metaDesc = `${name} (${rating} evidence, ${category}): ${lead}`.slice(0, 160);

  const title = `${name} — Evidence, Benefits & ${category} Research`;

  const keywords = [
    `${name} evidence`,
    `${name} benefits`,
    `${name} research`,
    `${name} dosage`,
    `${name} supplement`,
    `${category.toLowerCase()} supplements`,
    `${category.toLowerCase()} research`,
    `${name} side effects`,
    `${name} studies`,
    'evidence-based supplement',
    ...(synonyms?.slice(0, 3).map(s => `${s} supplement`) ?? []),
  ];

  const ogImage = `/api/og?name=${encodeURIComponent(name)}&category=${encodeURIComponent(category)}&rating=${encodeURIComponent(rating)}`;

  return {
    title,
    description: metaDesc,
    keywords,
    openGraph: {
      title: `${name} — ${cap(rating)} Evidence | Supplifyed`,
      description: metaDesc,
      url,
      type: 'article',
      siteName: 'Supplifyed',
      locale: 'en_GB',
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${name} — ${category} supplement, ${rating} evidence` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} — ${cap(rating)} Evidence`,
      description: metaDesc,
      images: [ogImage],
      creator: '@supplifyed',
    },
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

      {/* Full-width hero — category colour radial glow, no external requests */}
      <div
        className="ingredient-hero"
        style={{ background: HERO_GRADIENTS[ingredient.category] ?? DEFAULT_HERO_GRADIENT }}
      >
        <div className="ingredient-hero-overlay" />
        <p className="ingredient-hero-title" aria-hidden="true">{ingredient.name}</p>
      </div>

      <div className="space-y-8">
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
