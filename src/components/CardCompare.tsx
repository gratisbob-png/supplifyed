'use client';

import ProductCard from './ProductCard';
import type { ProductWithBrand } from '@/types';

interface Props {
  products: ProductWithBrand[];
  onRemove?: (productId: string) => void;
}

export default function CardCompare({ products, onRemove }: Props) {
  if (products.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${products.length}, minmax(280px, 1fr))` }}
      >
        {products.map((product) => (
          <div key={product.id} className="relative">
            {onRemove && (
              <button
                onClick={() => onRemove(product.id)}
                className="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full text-[var(--c-text-3)] hover:text-[var(--c-text)] text-xs transition-colors"
                style={{ background: 'var(--c-surface-3)', border: '1px solid var(--c-border)' }}
                aria-label="Remove from compare"
              >
                ×
              </button>
            )}
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
