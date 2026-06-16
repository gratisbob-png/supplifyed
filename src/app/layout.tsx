import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://supplifyed.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Supplifyed — Supplement Intelligence',
    template: '%s | Supplifyed',
  },
  description:
    'Evidence-rated supplement information. What is in it, what the research says, where to buy it. No opinions. No rankings.',
  openGraph: {
    type: 'website',
    siteName: 'Supplifyed',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary',
    site: '@supplifyed',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: 'var(--c-bg)', color: 'var(--c-text)' }} className="min-h-screen antialiased">
        <div className="max-w-6xl mx-auto px-4">

          {/* ── Nav ── */}
          <header className="sticky top-0 z-50 flex items-center justify-between h-14 border-b border-[var(--c-border-subtle)] backdrop-blur-md"
            style={{ background: 'rgba(0,0,0,0.72)' }}>
            <a href="/" className="flex items-center gap-2.5 group">
              <span className="text-[var(--c-accent)] text-lg leading-none select-none">✦</span>
              <span className="text-base font-semibold tracking-tight text-[var(--c-text)] group-hover:text-[var(--c-accent)] transition-colors">
                Supplifyed
              </span>
            </a>
            <nav className="flex items-center gap-1">
              <a
                href="/about"
                className="px-3 py-1.5 rounded-md text-sm text-[var(--c-text-3)] hover:text-[var(--c-text)] hover:bg-[var(--c-surface-2)] transition-all"
              >
                About
              </a>
              <a
                href="/builder"
                className="px-3 py-1.5 rounded-md text-sm text-[var(--c-text-3)] hover:text-[var(--c-text)] hover:bg-[var(--c-surface-2)] transition-all"
              >
                Builder
              </a>
              <a
                href="/search"
                className="ml-1 px-3 py-1.5 rounded-md text-sm font-medium text-[var(--c-bg)] bg-[var(--c-accent)] hover:opacity-90 transition-opacity"
              >
                Search
              </a>
            </nav>
          </header>

          {/* ── Page content ── */}
          <main className="py-8">{children}</main>

          {/* ── Footer ── */}
          <footer className="mt-24 py-10 border-t border-[var(--c-border-subtle)]">
            <div className="flex flex-wrap gap-x-8 gap-y-4 items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--c-accent)] text-sm">✦</span>
                  <span className="text-sm font-semibold text-[var(--c-text)]">Supplifyed</span>
                </div>
                <p className="text-xs text-[var(--c-text-3)] max-w-xs leading-relaxed">
                  Structured, source-badged supplement information.
                  Links to retailers may include affiliate commissions.
                </p>
              </div>
              <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--c-text-3)]">
                <a href="/about" className="hover:text-[var(--c-text)] transition-colors">About</a>
                <a href="/privacy" className="hover:text-[var(--c-text)] transition-colors">Privacy</a>
                <a href="/builder" className="hover:text-[var(--c-text)] transition-colors">Ingredient Builder</a>
              </nav>
            </div>
            <p className="mt-6 text-[10px] font-mono text-[var(--c-text-3)]/40 tracking-widest uppercase">
              supplifyed.com
            </p>
          </footer>

        </div>
      </body>
    </html>
  );
}
