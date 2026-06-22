import type { Metadata } from 'next';
import ParticleCursor from '@/components/ParticleCursor';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://supplifyed.com'),
  title: {
    default: 'Supplifyed — Supplement Intelligence',
    template: '%s | Supplifyed',
  },
  description:
    'Evidence-rated supplement intelligence. What is in it, what the research says, where to buy it. Every claim carries a source badge. No rankings. No opinions.',
  keywords: [
    'supplement ingredients',
    'evidence-based supplements',
    'supplement research',
    'ingredient evidence rating',
    'supplement database',
    'nootropics research',
    'vitamin evidence',
    'mineral supplements research',
    'supplement intelligence',
    'source-badged supplements',
  ],
  authors: [{ name: 'Supplifyed' }],
  creator: 'Supplifyed',
  publisher: 'Supplifyed',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://supplifyed.com',
    siteName: 'Supplifyed',
    title: 'Supplifyed — Supplement Intelligence',
    description:
      'Evidence-rated supplement intelligence. 156 ingredients. 215 evidence nodes. Zero opinions.',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Supplifyed — Supplement Intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Supplifyed — Supplement Intelligence',
    description:
      'Evidence-rated supplement intelligence. 156 ingredients. Zero opinions.',
    images: ['/api/og'],
    creator: '@supplifyed',
  },
  alternates: {
    canonical: 'https://supplifyed.com',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: 'var(--bg-void)', color: 'var(--text-primary)' }} className="min-h-screen antialiased">
        <div className="max-w-6xl mx-auto px-4">

          {/* ── Nav ── */}
          <header className="navbar">
            <a href="/" className="navbar-logo-link">
              <span className="navbar-logo-dot" />
              <span className="navbar-logo-text">Supplifyed</span>
            </a>
            <div className="navbar-right">
              <nav className="navbar-links">
                <a href="/about" className="navbar-link">About</a>
                <a href="/builder" className="navbar-link">Builder</a>
              </nav>
              <form action="/search" method="get">
                <input
                  type="text"
                  name="q"
                  placeholder="Search 156 ingredients..."
                  aria-label="Search"
                  className="navbar-search-input"
                />
              </form>
            </div>
          </header>

          <ParticleCursor />

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
                <a href="/disclaimer" className="hover:text-[var(--c-text)] transition-colors">Disclaimer</a>
                <a href="/builder" className="hover:text-[var(--c-text)] transition-colors">Ingredient Builder</a>
              </nav>
            </div>

            <div style={{
              borderTop: '1px solid var(--c-border-subtle)',
              marginTop: '24px',
              paddingTop: '16px',
              maxWidth: '800px',
            }}>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px',
                lineHeight: '1.7',
                color: 'var(--text-tertiary)',
                letterSpacing: '0.02em',
              }}>
                DISCLAIMER: The information presented on Supplifyed is sourced from third-party peer-reviewed research and is provided for informational purposes only. It does not constitute medical advice, diagnosis, or treatment. Evidence ratings reflect the current state of published research and are not endorsements. Individual results may vary. Always consult a qualified healthcare professional before starting any supplement regimen. Supplifyed does not manufacture, endorse, or recommend any specific product. Links to retailers may include affiliate commissions. Supplement statements have not been evaluated by the Food and Drug Administration or equivalent regulatory body.
              </p>
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
