import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';
import { getCategoryImage } from '@/lib/images';

interface Props {
  counts?: Record<string, number>;
}

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
            backgroundImage: `url(${getCategoryImage(cat.slug)})`,
          } as React.CSSProperties}
        >
          <div className="cat-img-overlay" />

          {/* Ingredient count pill — top-right */}
          {(counts[cat.slug] ?? 0) > 0 && (
            <div className="cat-img-count">
              {counts[cat.slug]} ingredients
            </div>
          )}

          {/* Bottom: category name */}
          <div className="cat-img-content">
            <p className="cat-img-name">{cat.name}</p>
          </div>

          {/* Bottom accent line — scales in on hover */}
          <div className="cat-img-accent" />
        </Link>
      ))}
    </div>
  );
}
