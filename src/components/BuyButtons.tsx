'use client';

import { analytics } from '@/lib/analytics';
import type { ProductWithBrand, Ingredient } from '@/types';

interface Props {
  product: ProductWithBrand;
  primaryIngredient?: Ingredient;
}

export default function BuyButtons({ product }: Props) {
  function handleClick(linkType: 'official' | 'amazon' | 'generic') {
    analytics.linkClick(product.id, linkType, product.tier);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {product.link_official && (
        <a
          href={product.link_official}
          target="_blank"
          rel="noopener noreferrer nofollow"
          onClick={() => handleClick('official')}
          className="flex-1 min-w-[110px] px-3 py-2 text-center text-xs font-medium rounded-lg border border-[var(--c-border)] text-[var(--c-text-2)] hover:border-[var(--c-accent)]/50 hover:text-[var(--c-accent)] transition-all duration-150"
        >
          Official Store
        </a>
      )}
      <a
        href={product.link_amazon}
        target="_blank"
        rel="noopener noreferrer nofollow"
        onClick={() => handleClick('amazon')}
        className="flex-1 min-w-[110px] px-3 py-2 text-center text-xs font-medium rounded-lg bg-[#FF9900]/10 border border-[#FF9900]/30 text-[#FF9900] hover:bg-[#FF9900]/20 hover:border-[#FF9900]/50 transition-all duration-150"
      >
        Amazon
      </a>
      {product.link_generic && (
        <a
          href={product.link_generic}
          target="_blank"
          rel="noopener noreferrer nofollow"
          onClick={() => handleClick('generic')}
          className="flex-1 min-w-[110px] px-3 py-2 text-center text-xs font-medium rounded-lg border border-[var(--c-border-subtle)] text-[var(--c-text-3)] hover:text-[var(--c-text-2)] hover:border-[var(--c-border)] transition-all duration-150"
          title="Generic compound — unbranded, lowest cost"
        >
          Generic ↓
        </a>
      )}
    </div>
  );
}
