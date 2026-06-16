import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';

const CATEGORY_ICONS: Record<string, string> = {
  performance: '⚡',
  sleep:       '🌙',
  inflammation:'🔥',
  'gut-health':'🦠',
  longevity:   '⏱',
  recovery:    '🔄',
  vitamins:    '💊',
  minerals:    '🪨',
  herbals:     '🌿',
};

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {CATEGORIES.map((cat, i) => (
        <Link
          key={cat.slug}
          href={`/category/${cat.slug}`}
          className={`cat-${cat.slug} group relative block overflow-hidden rounded-xl border border-white/[0.06] p-5 min-h-[130px] transition-all duration-300 hover:border-white/[0.14] hover:scale-[1.02]`}
          style={{ animationDelay: `${i * 60}ms` }}
        >
          {/* Subtle top-edge highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Icon */}
          <div className="text-2xl mb-3 leading-none select-none">
            {CATEGORY_ICONS[cat.slug] ?? '●'}
          </div>

          <h3 className="font-semibold text-white text-sm tracking-tight mb-1">
            {cat.name}
          </h3>
          <p className="text-[var(--c-text-3)] text-xs leading-relaxed line-clamp-2">
            {cat.description}
          </p>

          {/* Arrow reveals on hover */}
          <div className="absolute bottom-4 right-4 text-white/20 transition-all duration-200 group-hover:text-[var(--c-accent)] group-hover:translate-x-0.5">
            →
          </div>
        </Link>
      ))}
    </div>
  );
}
