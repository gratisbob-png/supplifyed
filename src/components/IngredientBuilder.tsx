'use client';

import { useState, useTransition } from 'react';
import { analytics } from '@/lib/analytics';
import ProductCard from './ProductCard';
import type { Ingredient, IngredientBuilderResult } from '@/types';

interface Props {
  allIngredients: Ingredient[];
}

export default function IngredientBuilder({ allIngredients }: Props) {
  const [selected, setSelected] = useState<Ingredient[]>([]);
  const [result, setResult] = useState<IngredientBuilderResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState('');

  const MAX_SELECTION = 5;

  const filtered = allIngredients.filter(
    (i) =>
      !selected.find((s) => s.id === i.id) &&
      i.name.toLowerCase().includes(search.toLowerCase())
  );

  function addIngredient(ingredient: Ingredient) {
    if (selected.length >= MAX_SELECTION) return;
    analytics.builderSelect(ingredient.id);
    setSelected((prev) => [...prev, ingredient]);
    setResult(null);
  }

  function removeIngredient(id: string) {
    setSelected((prev) => prev.filter((i) => i.id !== id));
    setResult(null);
  }

  function handleFind() {
    if (selected.length === 0) return;

    startTransition(async () => {
      const ids = selected.map((i) => i.id);
      const res = await fetch(`/api/ingredient-builder?ids=${ids.join(',')}`);
      const data: IngredientBuilderResult = await res.json();
      setResult(data);
    });
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--c-text-3)] mb-1">
          Ingredient Builder
        </p>
        <h1 className="text-2xl font-semibold text-[var(--c-text)] mb-2">
          Find multi-ingredient products
        </h1>
        <p className="text-[var(--c-text-2)] text-sm">
          Select up to {MAX_SELECTION} compounds. Find products containing all of them simultaneously.
        </p>
      </div>

      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((ingredient) => (
            <span
              key={ingredient.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--c-accent)]/10 border border-[var(--c-accent)]/30 text-sm text-[var(--c-accent)]"
            >
              {ingredient.name}
              <button
                onClick={() => removeIngredient(ingredient.id)}
                className="text-[var(--c-accent)]/60 hover:text-[var(--c-accent)] transition-colors leading-none"
                aria-label={`Remove ${ingredient.name}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search + add */}
      {selected.length < MAX_SELECTION && (
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ingredients to add..."
            style={{
              background: 'var(--c-surface-2)',
              borderColor: search ? 'var(--c-accent)' : 'var(--c-border)',
              color: 'var(--c-text)',
            }}
            className="w-full px-4 py-3 rounded-xl border text-sm placeholder:text-[var(--c-text-3)] focus:outline-none focus:ring-1 focus:ring-[var(--c-accent)]/30 transition-all"
          />
          {search && filtered.length > 0 && (
            <ul
              className="absolute top-full left-0 right-0 mt-1.5 rounded-xl border border-[var(--c-border)] overflow-hidden divide-y divide-[var(--c-border-subtle)] max-h-52 overflow-y-auto z-10"
              style={{ background: 'var(--c-surface-2)' }}
            >
              {filtered.slice(0, 10).map((ingredient) => (
                <li key={ingredient.id}>
                  <button
                    onClick={() => {
                      addIngredient(ingredient);
                      setSearch('');
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-[var(--c-text-2)] hover:bg-[var(--c-surface-3)] hover:text-[var(--c-accent)] transition-colors flex items-center justify-between gap-2"
                  >
                    <span>{ingredient.name}</span>
                    <span className="text-xs text-[var(--c-text-3)] font-mono shrink-0">{ingredient.category}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Find button */}
      {selected.length > 0 && (
        <button
          onClick={handleFind}
          disabled={isPending}
          className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
          style={{
            background: 'var(--c-accent)',
            color: 'var(--c-bg)',
          }}
        >
          {isPending
            ? 'Searching…'
            : `Find products with all ${selected.length} ingredient${selected.length > 1 ? 's' : ''}`}
        </button>
      )}

      {/* Results */}
      {result && (
        <div className="pt-6 border-t border-[var(--c-border-subtle)]">
          {result.matching_products.length === 0 ? (
            <p className="text-[var(--c-text-3)] text-sm py-8 text-center">
              No products found containing all selected ingredients simultaneously.
            </p>
          ) : (
            <>
              <p className="text-xs text-[var(--c-text-3)] font-mono mb-5">
                {result.matching_products.length} product{result.matching_products.length > 1 ? 's' : ''} found
              </p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {result.matching_products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
