'use client';

import { useState, useRef, useTransition, useEffect, useCallback } from 'react';
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

  const [suggestions, setSuggestions] = useState<{ name: string; slug: string }[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.length < 1) { setSuggestions([]); setShowDropdown(false); return; }
    try {
      const res = await fetch(`/api/suggestions?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setSuggestions(data.suggestions ?? []);
      setShowDropdown(data.suggestions?.length > 0);
      setActiveIndex(-1);
    } catch {
      setSuggestions([]);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchSuggestions(value), 150);
    return () => clearTimeout(timer);
  }, [value, fetchSuggestions]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    startTransition(() => {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
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
          onKeyDown={(e) => {
            if (!showDropdown) return;
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActiveIndex((i) => Math.max(i - 1, -1));
            } else if (e.key === 'Enter' && activeIndex >= 0) {
              e.preventDefault();
              const s = suggestions[activeIndex];
              router.push(`/ingredient/${s.slug}`);
              setShowDropdown(false);
            } else if (e.key === 'Escape') {
              setShowDropdown(false);
              setActiveIndex(-1);
            }
          }}
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

      {showDropdown && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          role="listbox"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
          }}
          className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-50"
        >
          {suggestions.map((s, i) => (
            <div
              key={s.slug}
              role="option"
              aria-selected={i === activeIndex}
              onMouseDown={() => {
                router.push(`/ingredient/${s.slug}`);
                setShowDropdown(false);
              }}
              onMouseEnter={() => setActiveIndex(i)}
              style={{
                background: i === activeIndex ? 'var(--accent-dim)' : 'transparent',
                borderLeft: i === activeIndex
                  ? '2px solid var(--accent)'
                  : '2px solid transparent',
                color: i === activeIndex ? 'var(--text-primary)' : 'var(--text-secondary)',
              }}
              className="flex items-center justify-between px-4 py-3 cursor-pointer transition-all duration-100"
            >
              <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '14px' }}>
                {s.name}
              </span>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px',
                color: 'var(--text-tertiary)',
                letterSpacing: '0.08em'
              }}>
                INGREDIENT →
              </span>
            </div>
          ))}
        </div>
      )}
    </form>
  );
}
