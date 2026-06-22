import type { Metadata } from 'next';
import Link from 'next/link';
import loadDynamic from 'next/dynamic';
import SearchBar from '@/components/SearchBar';
import CategoryGrid from '@/components/CategoryGrid';
import IngredientIndex from '@/components/IngredientIndex';
import { getAllIngredients } from '@/lib/queries';
import { CATEGORIES } from '@/lib/categories';

export const dynamic = 'force-dynamic';

const KnowledgeGraph = loadDynamic(
  () => import('@/components/KnowledgeGraph'),
  {
    ssr: false,
    loading: () => (
      <div style={{
        height: '100%',
        background: '#08090A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '11px',
        letterSpacing: '0.1em',
        color: '#4A4F58',
        textTransform: 'uppercase',
      }}>
        Loading graph...
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: 'Supplifyed — Supplement Intelligence',
  description:
    'Evidence-rated supplement information by category. What is in it, what the research says, where to buy it. No opinions. No rankings.',
};

export default async function HomePage() {
  const ingredients = await getAllIngredients();

  // Ingredient counts per category slug (approximate — based on primary DB category)
  const categoryCounts: Record<string, number> = {};
  for (const cat of CATEGORIES) {
    categoryCounts[cat.slug] = ingredients.filter(
      ing => cat.dbCategories.includes(ing.category)
    ).length;
  }

  // Top 6 strong-evidence ingredients for featured row
  const featuredIngredients = ingredients
    .filter(ing => ing.evidence_rating === 'strong')
    .slice(0, 6);

  return (
    <div>

      {/* ── Category Nav Bar ────────────────────────────────────────────── */}
      <nav className="cat-nav">
        <div className="cat-nav-inner">
          {CATEGORIES.map(cat => (
            <Link key={cat.slug} href={`/category/${cat.slug}`} className="cat-nav-pill">
              {cat.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* ── 3D Knowledge Graph Hero ─────────────────────────────────────── */}
      <section className="kg-hero-section">
        <div style={{ height: '100vh' }}>
          <KnowledgeGraph />
        </div>
        <div className="kg-scroll-hint">
          <span className="kg-chevron">⌄</span>
        </div>
      </section>


      {/* ── Below-fold content ──────────────────────────────────────────── */}
      <div className="space-y-20 mt-20">

        {/* ── Text hero ───────────────────────────────────────────────────── */}
        <section className="relative -mx-4 px-4 py-20 md:py-32 overflow-hidden hero-gradient">
          <div className="hero-mesh absolute inset-0 pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_110%,rgba(0,0,0,0.7)_0%,transparent_70%)]" />

          <div className="relative max-w-3xl space-y-8">
            <p className="home-eyebrow">
              <span className="home-eyebrow-dot" />
              Evidence-rated · No opinions
            </p>

            <h1 className="home-headline">
              <span className="home-headline-light">Supplement</span>
              <br />
              <span className="home-headline-bold text-gradient-green">Intelligence</span>
            </h1>

            <p className="home-subcopy">
              What is in it, what the research says, where to buy it.
              Every claim carries a source. No rankings. No opinions. Ever.
            </p>

            <div className="home-stats">
              <div className="home-stat">
                <span className="home-stat-num">156</span>
                <span className="home-stat-label">Compounds</span>
              </div>
              <div className="home-stat-divider" />
              <div className="home-stat">
                <span className="home-stat-num">215</span>
                <span className="home-stat-label">Evidence nodes</span>
              </div>
              <div className="home-stat-divider" />
              <div className="home-stat">
                <span className="home-stat-num">9</span>
                <span className="home-stat-label">Categories</span>
              </div>
            </div>

            <div className="pt-2">
              <SearchBar autoFocus={false} />
              <p className="mt-4 text-sm text-[var(--c-text-3)]">
                Try:{' '}
                <span className="text-[var(--c-text-2)]">bacopa monnieri</span>
                {' · '}
                <span className="text-[var(--c-text-2)]">magnesium L-threonate</span>
                {' · '}
                <span className="text-[var(--c-text-2)]">does l-theanine work</span>
              </p>
            </div>
          </div>
        </section>

        {/* ── Featured Ingredients (strong evidence) ──────────────────────── */}
        {featuredIngredients.length > 0 && (
          <section className="space-y-4">
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--text-tertiary)',
              margin: 0,
            }}>
              Highest Evidence
            </p>
            <div className="featured-row">
              {featuredIngredients.map(ing => (
                <Link key={ing.slug} href={`/ingredient/${ing.slug}`} className="featured-pill">
                  <span>{ing.name}</span>
                  <span className="featured-pill-badge">STRONG</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Categories ──────────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="space-y-2">
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              margin: 0,
            }}>
              Browse by category
            </p>
            <h2 style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(32px, 5vw, 48px)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              Nine ingredient families
            </h2>
          </div>
          <CategoryGrid counts={categoryCounts} />
        </section>

        {/* ── Ingredient Builder CTA ───────────────────────────────────────── */}
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

        {/* ── Ingredient Index ─────────────────────────────────────────────── */}
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
    </div>
  );
}
