'use client';

import { useState, useRef, useTransition } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  autoFocus?: boolean;
  defaultValue?: string;
}

export default function SearchBar({ autoFocus = false, defaultValue = '' }: Props) {
  const [value, setValue] = useState(defaultValue);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    startTransition(() => {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative flex items-center group">
        {/* Search icon */}
        <svg
          className="absolute left-4 w-4 h-4 text-[var(--c-text-3)] transition-colors group-focus-within:text-[var(--c-accent)] pointer-events-none shrink-0"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ingredient, question, or product..."
          autoFocus={autoFocus}
          style={{
            background: 'var(--c-surface-2)',
            borderColor: 'var(--c-border)',
            color: 'var(--c-text)',
          }}
          className={`
            w-full pl-11 pr-14 py-3.5 rounded-xl border
            text-base placeholder:text-[var(--c-text-3)]
            focus:outline-none focus:border-[var(--c-accent)]/50
            focus:ring-1 focus:ring-[var(--c-accent)]/30
            transition-all duration-200
          `}
          aria-label="Search supplements"
        />

        <button
          type="submit"
          disabled={!value.trim() || isPending}
          style={{ color: value.trim() ? 'var(--c-accent)' : 'var(--c-text-3)' }}
          className="absolute right-3 p-1.5 rounded-lg hover:bg-[var(--c-surface-3)] disabled:opacity-40 transition-all duration-150"
          aria-label="Search"
        >
          {isPending ? (
            <span
              className="inline-block w-4 h-4 border-2 border-transparent rounded-full animate-spin"
              style={{ borderTopColor: 'var(--c-accent)' }}
            />
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}
