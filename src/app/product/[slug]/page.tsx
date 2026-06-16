import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getProduct } from '@/lib/queries';
import ProductCard from '@/components/ProductCard';
import JsonLd from '@/components/JsonLd';

interface Props {
  params: { slug: string };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://supplifyed.com';

const CURRENCY_SYMBOL: Record<string, string> = {
  GBP: '£',
  USD: '$',
  EUR: '€',
  AUD: 'A$',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) return {};

  const title = `${product.name}${product.brand?.name ? ` — ${product.brand.name}` : ''}`;
  const description =
    product.packet_text.length > 160
      ? product.packet_text.slice(0, 157) + '...'
      : product.packet_text;
  const url = `${SITE_URL}/product/${product.slug}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Supplifyed`,
      description,
      url,
      type: 'website',
      siteName: 'Supplifyed',
    },
    twitter: {
      card: 'summary',
      title: `${title} | Supplifyed`,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProductRoute({ params }: Props) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  const url = `${SITE_URL}/product/${product.slug}`;
  const currencySymbol = CURRENCY_SYMBOL[product.rrp_currency] ?? product.rrp_currency;

  const productJsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.packet_text.slice(0, 500),
    url,
    ...(product.brand?.name
      ? { brand: { '@type': 'Brand', name: product.brand.name } }
      : {}),
    ...(product.certifications.length > 0
      ? { additionalProperty: product.certifications.map((c) => ({ '@type': 'PropertyValue', name: c })) }
      : {}),
    offers: {
      '@type': 'Offer',
      price: Number(product.rrp).toFixed(2),
      priceCurrency: product.rrp_currency,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: Number(product.rrp).toFixed(2),
        priceCurrency: product.rrp_currency,
        description: `RRP — ${currencySymbol}${Number(product.rrp).toFixed(2)}`,
      },
      availability:
        product.link_status === 'live'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/Discontinued',
      url: product.link_amazon,
    },
  };

  return (
    <>
      <JsonLd data={productJsonLd} />
      <div className="space-y-4">
        <nav className="text-xs font-mono text-[var(--c-text-3)]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--c-text-2)] transition-colors">Home</Link>
          <span className="mx-2 text-[var(--c-border)]">·</span>
          <span className="text-[var(--c-text-2)]">{product.name}</span>
        </nav>
        <div className="max-w-2xl">
          <ProductCard product={product} expanded />
        </div>
      </div>
    </>
  );
}
