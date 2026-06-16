import Link from 'next/link';
import type { Ingredient } from '@/types';

interface Props {
  ingredients: Ingredient[];
}

const ALL_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function IngredientIndex({ ingredients }: Props) {
  const grouped = new Map<string, Ingredient[]>();

  for (const ing of ingredients) {
    const letter = ing.name[0].toUpperCase();
    if (!grouped.has(letter)) grouped.set(letter, []);
    grouped.get(letter)!.push(ing);
  }

  const activeLetters = new Set(grouped.keys());
  const letters = ALL_LETTERS.filter((l) => grouped.has(l));

  return (
    <div>
      {/* ── Jump bar ── */}
      <div
        className="flex flex-wrap gap-x-0.5 gap-y-1 mb-10 font-mono text-sm select-none"
        aria-label="Jump to letter"
      >
        {ALL_LETTERS.map((l) =>
          activeLetters.has(l) ? (
            <a
              key={l}
              href={`#idx-${l}`}
              className="w-7 h-7 flex items-center justify-center rounded text-[var(--c-accent)] hover:bg-[var(--c-surface-2)] hover:text-[var(--c-text)] transition-all duration-150"
            >
              {l}
            </a>
          ) : (
            <span
              key={l}
              className="w-7 h-7 flex items-center justify-center text-[var(--c-text-3)]/30 cursor-default"
              aria-hidden="true"
            >
              {l}
            </span>
          )
        )}
        <span className="self-center ml-3 text-xs text-[var(--c-text-3)] font-mono">
          {ingredients.length} ingredients
        </span>
      </div>

      {/* ── Letter sections ── */}
      <div className="space-y-10">
        {letters.map((letter) => {
          const items = grouped.get(letter)!;
          return (
            <section key={letter} id={`idx-${letter}`}>
              <div className="flex items-baseline gap-3 mb-3 pb-2 border-b border-[var(--c-border-subtle)]">
                <span className="text-xl font-mono font-bold text-[var(--c-accent)] leading-none">
                  {letter}
                </span>
                <span className="text-xs font-mono text-[var(--c-text-3)]/40">
                  {items.length}
                </span>
              </div>
              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-1.5">
                {items.map((ing) => (
                  <li key={ing.id}>
                    <Link
                      href={`/ingredient/${ing.slug}`}
                      className="text-sm text-[var(--c-text-3)] hover:text-[var(--c-accent)] transition-colors leading-snug block py-0.5"
                    >
                      {ing.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
