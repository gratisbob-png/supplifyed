import type { Metadata } from 'next';
import SearchBar from '@/components/SearchBar';
import CategoryGrid from '@/components/CategoryGrid';
import IngredientIndex from '@/components/IngredientIndex';
import { getAllIngredients } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Supplifyed — Supplement Intelligence',
  description:
    'Evidence-rated supplement information by category. What is in it, what the research says, where to buy it. No opinions. No rankings.',
};

export default async function HomePage() {
  const ingredients = await getAllIngredients();

  return (
    <div className="space-y-20">

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative -mx-4 px-4 py-16 md:py-24 overflow-hidden hero-gradient">
        {/* Mesh grid overlay */}
        <div className="hero-mesh absolute inset-0 pointer-events-none" />

        {/* Edge vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_110%,rgba(0,0,0,0.7)_0%,transparent_70%)]" />

        <div className="relative max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--c-accent)]/30 bg-[var(--c-accent)]/5 text-[var(--c-accent)] text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--c-accent)] animate-pulse" />
            Evidence-rated · No opinions
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            <span className="text-gradient">Supplement</span>
            <br />
            <span className="text-[var(--c-text)]">Intelligence</span>
          </h1>

          <p className="text-[var(--c-text-2)] text-lg leading-relaxed max-w-xl">
            What is in it, what the research says, where to buy it.
            Every piece of content carries a source badge. No rankings. No opinions.
          </p>

          <div className="pt-2">
            <SearchBar autoFocus={false} />
            <p className="mt-3 text-sm text-[var(--c-text-3)]">
              Try:{' '}
              <span className="text-[var(--c-text-2)]">creatine</span>
              {' · '}
              <span className="text-[var(--c-text-2)]">magnesium glycinate</span>
              {' · '}
              <span className="text-[var(--c-text-2)]">does melatonin work</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Categories ─────────────────────────────────────────────── */}
      <section className="space-y-5">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--c-text-3)] mb-1">
            Browse by category
          </p>
          <h2 className="text-xl font-semibold text-[var(--c-text)]">
            Nine ingredient families
          </h2>
        </div>
        <CategoryGrid />
      </section>

      {/* ── Ingredient Builder CTA ──────────────────────────────────── */}
      <section>
        <div className="flex items-start gap-4 p-5 rounded-xl border border-[var(--c-border)] bg-[var(--c-surface)]">
          <div className="shrink-0 mt-0.5 text-[var(--c-accent)] text-xl">⊕</div>
          <div>
            <p className="text-sm font-medium text-[var(--c-text)] mb-1">
              Looking for multi-ingredient products?
            </p>
            <p className="text-sm text-[var(--c-text-2)] mb-3">
              Select up to five compounds and find products containing all of them simultaneously.
            </p>
            <a
              href="/builder"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--c-accent)] hover:text-[var(--c-text)] transition-colors"
            >
              Open Ingredient Builder →
            </a>
          </div>
        </div>
      </section>

      {/* ── Ingredient Index ────────────────────────────────────────── */}
      {ingredients.length > 0 && (
        <section>
          <div className="mb-6">
            <p className="text-xs font-mono uppercase tracking-widest text-[var(--c-text-3)] mb-1">
              A–Z reference
            </p>
            <h2 className="text-xl font-semibold text-[var(--c-text)]">
              Ingredient Index
            </h2>
          </div>
          <IngredientIndex ingredients={ingredients} />
        </section>
      )}

    </div>
  );
}
