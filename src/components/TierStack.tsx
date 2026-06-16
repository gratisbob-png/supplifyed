'use client';

import { useState } from 'react';
import { analytics } from '@/lib/analytics';
import ProductCard from './ProductCard';
import CardCompare from './CardCompare';
import type { TierStack as TierStackType, ProductWithBrand } from '@/types';

interface Props {
  tiers: TierStackType;
  ingredientId: string;
}

const TIER_LABELS: Record<string, { title: string; subtitle: string }> = {
  aspiration: { title: 'Aspiration tier', subtitle: 'Premium formulation' },
  rational:   { title: 'Rational tier',   subtitle: 'Balanced value' },
  economic:   { title: 'Economic tier',   subtitle: 'Budget option' },
};

export default function TierStack({ tiers, ingredientId }: Props) {
  const [compareList, setCompareList] = useState<ProductWithBrand[]>([]);

  function handleTierView(tier: 'aspiration' | 'rational' | 'economic') {
    analytics.tierView(ingredientId, tier);
  }

  function addToCompare(product: ProductWithBrand) {
    setCompareList((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      if (prev.length >= 4) return prev;
      return [...prev, product];
    });
  }

  function removeFromCompare(productId: string) {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  }

  const tierOrder = ['aspiration', 'rational', 'economic'] as const;
  const hasAny = tierOrder.some((t) => tiers[t].length > 0);
  if (!hasAny) return null;

  return (
    <div className="space-y-10">
      {tierOrder.map((tier) => {
        const products = tiers[tier];
        if (products.length === 0) return null;
        const label = TIER_LABELS[tier];

        return (
          <section key={tier} onMouseEnter={() => handleTierView(tier)}>
            <div className="flex items-baseline gap-3 mb-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--c-text-3)]">
                {label.title}
              </h3>
              <span className="text-xs text-[var(--c-text-3)]/40 font-mono">
                {products.length} product{products.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onCompareAdd={addToCompare}
                />
              ))}
            </div>
          </section>
        );
      })}

      {compareList.length >= 2 && (
        <div className="mt-12 pt-8 border-t border-[var(--c-border)]">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--c-text-3)]">
              Comparing {compareList.length} product{compareList.length !== 1 ? 's' : ''}
            </h3>
            <button
              onClick={() => setCompareList([])}
              className="text-xs text-[var(--c-text-3)] hover:text-[var(--c-accent)] transition-colors font-mono"
            >
              Clear compare
            </button>
          </div>
          <CardCompare
            products={compareList}
            onRemove={removeFromCompare}
          />
        </div>
      )}
    </div>
  );
}
