'use client';

import { useState } from 'react';
import { analytics } from '@/lib/analytics';
import SourceBadge from './SourceBadge';
import EvidenceRating from './EvidenceRating';
import BuyButtons from './BuyButtons';
import type { ProductWithBrand } from '@/types';

const TIER_CONFIG = {
  aspiration: {
    label: 'ASPIRATION',
    strip: 'bg-[var(--c-green-1)]',
    badge: 'text-[var(--c-accent)] border-[var(--c-accent)]/40 bg-[var(--c-accent)]/5',
    holo: true,
  },
  rational: {
    label: 'RATIONAL',
    strip: 'bg-gray-600',
    badge: 'text-gray-400 border-gray-700 bg-gray-800/50',
    holo: false,
  },
  economic: {
    label: 'ECONOMIC',
    strip: 'bg-gray-700',
    badge: 'text-gray-500 border-gray-700/60 bg-gray-900/50',
    holo: false,
  },
};

interface Props {
  product: ProductWithBrand;
  expanded?: boolean;
  onCompareAdd?: (product: ProductWithBrand) => void;
}

export default function ProductCard({ product, expanded = false, onCompareAdd }: Props) {
  const [showPacketText, setShowPacketText] = useState(false);
  const [showMarketing, setShowMarketing] = useState(false);

  const tier = TIER_CONFIG[product.tier];
  const charLimit = Number(process.env.NEXT_PUBLIC_BRAND_MARKETING_CHAR_LIMIT ?? 500);
  const marketingText = product.brand_marketing
    ? product.brand_marketing.slice(0, charLimit)
    : null;

  function handleSectionExpand(section: 'LABEL' | 'BRAND_MARKETING') {
    analytics.sectionExpand(product.id, section);
  }

  return (
    <article
      data-tier={product.tier}
      className={`card overflow-hidden${tier.holo ? ' holo-card' : ''}`}
    >
      {/* Tier strip — 3px top border */}
      <div className={`tier-strip h-[3px] w-full ${tier.strip}`} />

      {/* Header */}
      <div className="p-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <a
            href={`/product/${product.slug}`}
            className="font-semibold text-[var(--c-text)] hover:text-[var(--c-accent)] transition-colors line-clamp-2 leading-snug"
          >
            {product.name}
          </a>
          {product.brand?.name && (
            <div className="text-xs text-[var(--c-text-3)] mt-0.5 font-mono">
              {product.brand.name}
            </div>
          )}
        </div>
        <span className={`shrink-0 text-[10px] font-mono border px-2 py-0.5 rounded tracking-widest ${tier.badge}`}>
          {tier.label}
        </span>
      </div>

      {/* Ingredients / dose */}
      {product.ingredients && product.ingredients.length > 0 && (
        <div className="px-4 pb-3 border-t border-[var(--c-border-subtle)]">
          <div className="pt-3 mb-2">
            <SourceBadge type="MANUFACTURER" />
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[var(--c-text-3)] text-xs">
                <th className="text-left font-normal py-0.5">Ingredient</th>
                <th className="text-right font-normal py-0.5">Per serving</th>
              </tr>
            </thead>
            <tbody>
              {product.ingredients.map((ic) => (
                <tr key={ic.ingredient.id} className="border-t border-[var(--c-border-subtle)]">
                  <td className="py-1.5 text-[var(--c-text-2)]">
                    <a
                      href={`/ingredient/${ic.ingredient.slug}`}
                      className="hover:text-[var(--c-accent)] transition-colors"
                    >
                      {ic.ingredient.name}
                      {ic.form && (
                        <span className="text-[var(--c-text-3)] text-xs ml-1">({ic.form})</span>
                      )}
                    </a>
                  </td>
                  <td className="py-1.5 text-right text-[var(--c-text)] font-mono text-xs">
                    {ic.dose_per_serving}{ic.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Evidence */}
      {product.ingredients?.[0]?.ingredient && (
        <div className="px-4 pb-3 border-t border-[var(--c-border-subtle)] pt-3">
          <div className="flex items-center gap-2 mb-2">
            <SourceBadge type="PEER_REVIEWED" />
          </div>
          <EvidenceRating rating={product.ingredients[0].ingredient.evidence_rating} />
        </div>
      )}

      {/* Certifications */}
      {product.certifications.length > 0 && (
        <div className="px-4 pb-3 border-t border-[var(--c-border-subtle)] pt-3">
          <div className="flex flex-wrap gap-1.5">
            {product.certifications.map((cert) => (
              <span
                key={cert}
                className="text-xs px-2 py-0.5 rounded border border-[var(--c-border)] text-[var(--c-text-3)] font-mono"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* RRP */}
      <div className="px-4 pb-3 border-t border-[var(--c-border-subtle)] pt-3 flex items-center justify-between">
        <span className="text-[var(--c-text-3)] text-xs font-mono uppercase tracking-wide">RRP</span>
        <span className="text-[var(--c-text)] font-mono font-medium">
          {product.rrp_currency === 'GBP' ? '£' : product.rrp_currency}{' '}
          {Number(product.rrp).toFixed(2)}
        </span>
      </div>

      {/* Packet text (expandable) */}
      {(expanded || showPacketText) && product.packet_text && (
        <div className="px-4 pb-3 border-t border-[var(--c-border-subtle)] pt-3">
          <div className="flex items-center gap-2 mb-2">
            <SourceBadge type="LABEL" />
          </div>
          <p className="text-[var(--c-text-3)] text-xs whitespace-pre-wrap font-mono leading-relaxed">
            {product.packet_text}
          </p>
        </div>
      )}
      {!expanded && product.packet_text && (
        <button
          onClick={() => {
            setShowPacketText(!showPacketText);
            if (!showPacketText) handleSectionExpand('LABEL');
          }}
          className="w-full px-4 py-2.5 text-left text-xs text-[var(--c-text-3)] hover:text-[var(--c-text-2)] hover:bg-[var(--c-surface-2)] border-t border-[var(--c-border-subtle)] transition-all"
        >
          {showPacketText ? '↑ Hide label' : '↓ Manufacturer Label'}
        </button>
      )}

      {/* Brand marketing (expandable, capped) */}
      {marketingText && (
        <>
          {(expanded || showMarketing) && (
            <div className="px-4 pb-3 border-t border-[var(--c-border-subtle)] pt-3">
              <div className="flex items-center gap-2 mb-2">
                <SourceBadge type="BRAND_MARKETING" />
              </div>
              <p className="text-[var(--c-text-3)] text-sm">{marketingText}</p>
              {product.brand_marketing && product.brand_marketing.length > charLimit && (
                <p className="text-xs text-[var(--c-text-3)]/50 mt-1 font-mono">
                  Content capped at {charLimit} characters — equal across all brands
                </p>
              )}
            </div>
          )}
          {!expanded && (
            <button
              onClick={() => {
                setShowMarketing(!showMarketing);
                if (!showMarketing) handleSectionExpand('BRAND_MARKETING');
              }}
              className="w-full px-4 py-2.5 text-left text-xs text-[var(--c-text-3)] hover:text-[var(--c-text-2)] hover:bg-[var(--c-surface-2)] border-t border-[var(--c-border-subtle)] transition-all"
            >
              {showMarketing ? '↑ Hide marketing' : '↓ Brand Marketing'}
            </button>
          )}
        </>
      )}

      {/* Buy buttons */}
      <div className="p-4 border-t border-[var(--c-border-subtle)]">
        <BuyButtons product={product} />
      </div>

      {/* Compare */}
      {onCompareAdd && (
        <div className="px-4 pb-4">
          <button
            onClick={() => {
              analytics.compareAdd(product.id);
              onCompareAdd(product);
            }}
            className="w-full text-xs text-[var(--c-text-3)] hover:text-[var(--c-accent)] border border-[var(--c-border)] hover:border-[var(--c-accent)]/40 rounded-lg py-2 transition-all"
          >
            + Add to compare
          </button>
        </div>
      )}
    </article>
  );
}
