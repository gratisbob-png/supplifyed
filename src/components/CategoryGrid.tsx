import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';

interface Props {
  counts?: Record<string, number>;
}

// Radial-glow gradients — guaranteed to work, no external requests
const CATEGORY_GRADIENTS: Record<string, string> = {
  'performance': [
    'radial-gradient(ellipse 80% 120% at 18% 60%, rgba(59,130,246,0.50) 0%, transparent 65%)',
    'radial-gradient(ellipse 50% 80% at 80% 20%, rgba(37,99,235,0.28) 0%, transparent 55%)',
    'linear-gradient(155deg, #05080f 0%, #0a1220 60%, #0f1a30 100%)',
  ].join(','),
  'sleep': [
    'radial-gradient(ellipse 80% 120% at 18% 55%, rgba(99,102,241,0.50) 0%, transparent 65%)',
    'radial-gradient(ellipse 50% 80% at 78% 20%, rgba(139,92,246,0.28) 0%, transparent 55%)',
    'linear-gradient(155deg, #04040f 0%, #0a0a1e 60%, #12103a 100%)',
  ].join(','),
  'inflammation': [
    'radial-gradient(ellipse 80% 120% at 18% 60%, rgba(220,38,38,0.50) 0%, transparent 65%)',
    'radial-gradient(ellipse 50% 80% at 80% 20%, rgba(239,68,68,0.22) 0%, transparent 55%)',
    'linear-gradient(155deg, #0f0505 0%, #1a0808 60%, #280c0c 100%)',
  ].join(','),
  'gut-health': [
    'radial-gradient(ellipse 80% 120% at 22% 60%, rgba(16,185,129,0.45) 0%, transparent 65%)',
    'radial-gradient(ellipse 50% 80% at 78% 20%, rgba(5,150,105,0.22) 0%, transparent 55%)',
    'linear-gradient(155deg, #020f08 0%, #051a10 60%, #071f12 100%)',
  ].join(','),
  'longevity': [
    'radial-gradient(ellipse 80% 120% at 18% 60%, rgba(5,150,105,0.45) 0%, transparent 60%)',
    'radial-gradient(ellipse 50% 60% at 78% 25%, rgba(245,158,11,0.22) 0%, transparent 50%)',
    'linear-gradient(155deg, #02100a 0%, #041a0c 60%, #061f0e 100%)',
  ].join(','),
  'recovery': [
    'radial-gradient(ellipse 80% 120% at 18% 60%, rgba(6,182,212,0.45) 0%, transparent 65%)',
    'radial-gradient(ellipse 50% 80% at 80% 20%, rgba(14,165,233,0.22) 0%, transparent 55%)',
    'linear-gradient(155deg, #020b10 0%, #041520 60%, #061a28 100%)',
  ].join(','),
  'vitamins': [
    'radial-gradient(ellipse 80% 120% at 18% 60%, rgba(245,158,11,0.50) 0%, transparent 65%)',
    'radial-gradient(ellipse 50% 80% at 80% 20%, rgba(249,115,22,0.22) 0%, transparent 55%)',
    'linear-gradient(155deg, #0f0800 0%, #1e1000 60%, #281800 100%)',
  ].join(','),
  'minerals': [
    'radial-gradient(ellipse 80% 120% at 18% 60%, rgba(100,116,139,0.45) 0%, transparent 65%)',
    'radial-gradient(ellipse 50% 80% at 80% 20%, rgba(71,85,105,0.28) 0%, transparent 55%)',
    'linear-gradient(155deg, #07080a 0%, #0f1015 60%, #161820 100%)',
  ].join(','),
  'herbals': [
    'radial-gradient(ellipse 80% 120% at 18% 60%, rgba(132,204,22,0.45) 0%, transparent 65%)',
    'radial-gradient(ellipse 50% 80% at 80% 20%, rgba(101,163,13,0.22) 0%, transparent 55%)',
    'linear-gradient(155deg, #050f02 0%, #0a1a05 60%, #0d200a 100%)',
  ].join(','),
};

const DEFAULT_GRADIENT = [
  'radial-gradient(ellipse 80% 120% at 18% 60%, rgba(0,229,196,0.35) 0%, transparent 65%)',
  'linear-gradient(155deg, #040f0a 0%, #081a10 100%)',
].join(',');

export default function CategoryGrid({ counts = {} }: Props) {
  return (
    <div className="cat-img-grid">
      {CATEGORIES.map((cat, i) => (
        <Link
          key={cat.slug}
          href={`/category/${cat.slug}`}
          className="cat-img-card"
          style={{
            '--ci': i,
            background: CATEGORY_GRADIENTS[cat.slug] ?? DEFAULT_GRADIENT,
          } as React.CSSProperties}
        >
          <div className="cat-img-overlay" />

          {(counts[cat.slug] ?? 0) > 0 && (
            <div className="cat-img-count">
              {counts[cat.slug]} ingredients
            </div>
          )}

          <div className="cat-img-content">
            <p className="cat-img-name">{cat.name}</p>
          </div>

          <div className="cat-img-accent" />
        </Link>
      ))}
    </div>
  );
}
