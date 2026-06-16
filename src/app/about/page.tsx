import type { Metadata } from 'next';
import SourceBadge from '@/components/SourceBadge';
import EvidenceRating from '@/components/EvidenceRating';

export const metadata: Metadata = {
  title: 'About Supplifyed',
  description:
    'Supplifyed is a sourced information portal for supplements. Evidence-rated data, source-badged content, no opinions and no rankings.',
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-12">

      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--c-text-3)] mb-2">About</p>
        <h1 className="text-3xl font-bold text-[var(--c-text)] mb-3">Supplifyed</h1>
        <p className="text-[var(--c-text-2)] text-lg leading-relaxed">
          A sourced information portal for supplements. Provenance is the feature.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--c-text-3)]">
          What this is
        </h2>
        <div className="space-y-3 text-[var(--c-text-2)] text-sm leading-relaxed">
          <p>Supplifyed answers three questions for every supplement ingredient:</p>
          <ul className="space-y-2 pl-4">
            <li className="border-l border-[var(--c-border)] pl-4">
              <strong className="text-[var(--c-text)]">What is in it?</strong>{' '}
              Compound identity, molecular structure, synonyms, and available forms.
            </li>
            <li className="border-l border-[var(--c-border)] pl-4">
              <strong className="text-[var(--c-text)]">What does the evidence say?</strong>{' '}
              Peer-reviewed studies, dose data, outcomes, and funding sources — all visible.
            </li>
            <li className="border-l border-[var(--c-border)] pl-4">
              <strong className="text-[var(--c-text)]">Where can I find it?</strong>{' '}
              Three affiliate links per product: official store, Amazon, and a generic source.
            </li>
          </ul>
          <p>
            Supplifyed is not a review site. It does not rank products. It does not make
            recommendations. It does not publish opinions. These are not editorial decisions —
            they are the legal and commercial foundation of the platform.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--c-text-3)]">
          Source badge system
        </h2>
        <p className="text-[var(--c-text-3)] text-sm leading-relaxed">
          Every piece of content on Supplifyed carries a source badge. The badge tells you
          where the information came from before you read it.
        </p>
        <div className="space-y-2">
          {([
            ['PEER_REVIEWED', 'Published peer-reviewed research. Authors, journal, year, DOI, and funding source all visible.'],
            ['MANUFACTURER', "Data from the manufacturer's official listing or Amazon product page."],
            ['LABEL', 'Verbatim text from the product label. No editing or paraphrasing.'],
            ['BRAND_MARKETING', 'Content submitted by the manufacturer. Character-capped equally across all brands.'],
            ['INSTRUCTIONAL', 'Usage and dosing guidance. Contextual, not prescriptive.'],
            ['PRESS', 'Published media coverage.'],
          ] as const).map(([type, description]) => (
            <div key={type} className="card flex items-start gap-3 p-4">
              <div className="shrink-0 pt-0.5">
                <SourceBadge type={type} showTooltip={false} />
              </div>
              <p className="text-[var(--c-text-3)] text-sm">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--c-text-3)]">
          Evidence rating system
        </h2>
        <p className="text-[var(--c-text-3)] text-sm leading-relaxed">
          Each ingredient carries an evidence rating based on the volume and consistency
          of independent peer-reviewed research.
        </p>
        <div className="space-y-2">
          {([
            ['strong', '3 or more independent peer-reviewed studies with consistent findings.'],
            ['moderate', 'Evidence exists, with some inconsistency or limited study size.'],
            ['mixed', 'Studies exist but findings conflict meaningfully.'],
            ['limited', 'Few or no independent studies available.'],
          ] as const).map(([rating, description]) => (
            <div key={rating} className="card flex items-start gap-3 p-4">
              <div className="shrink-0 pt-0.5">
                <EvidenceRating rating={rating} />
              </div>
              <p className="text-[var(--c-text-3)] text-sm">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--c-text-3)]">
          Product tier system
        </h2>
        <p className="text-[var(--c-text-3)] text-sm leading-relaxed">
          Products are placed into one of three tiers based on formulation quality,
          standardisation, and certifications — not price or brand preference.
          All tiers are presented simultaneously; the user decides.
        </p>
        <div className="space-y-2 text-sm">
          <div className="p-4 rounded-xl border-l-2 border-[var(--c-accent)] bg-[var(--c-surface)] pl-5">
            <p className="text-[var(--c-accent)] font-mono uppercase text-xs mb-1 tracking-widest">Aspiration</p>
            <p className="text-[var(--c-text-3)]">Highest formulation quality. Standardised extracts, pharmaceutical-grade compounds, third-party tested.</p>
          </div>
          <div className="p-4 rounded-xl border-l-2 border-gray-600 bg-[var(--c-surface)] pl-5">
            <p className="text-gray-400 font-mono uppercase text-xs mb-1 tracking-widest">Rational</p>
            <p className="text-[var(--c-text-3)]">Mid-tier. Established brands with adequate quality. Standard forms.</p>
          </div>
          <div className="p-4 rounded-xl border-l-2 border-gray-700 bg-[var(--c-surface)] pl-5">
            <p className="text-gray-500 font-mono uppercase text-xs mb-1 tracking-widest">Economic</p>
            <p className="text-[var(--c-text-3)]">Entry-level. Bulk compounds or own-brand. No quality concerns, lower specification.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--c-text-3)]">
          Affiliate links
        </h2>
        <p className="text-[var(--c-text-3)] text-sm leading-relaxed">
          Links to retailers (Amazon, brand stores) include affiliate tracking parameters.
          Clicking a link and completing a purchase may earn Supplifyed a commission at no
          cost to you. Affiliate relationships do not influence which products appear on the
          platform, which tier they are placed in, or what content is shown about them.
        </p>
        <p className="text-[var(--c-text-3)] text-sm leading-relaxed">
          Every ingredient page includes a link to a generic (unbranded) source. This link
          cannot be removed by manufacturer submissions.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--c-text-3)]">
          Manufacturer submissions
        </h2>
        <p className="text-[var(--c-text-3)] text-sm leading-relaxed">
          Manufacturers may submit product data for inclusion on the platform. Submissions
          are validated against public ingredient data before publication. Brand marketing
          content is capped at an equal character limit applied identically to every brand.
          No exceptions. Only manufacturers may submit — not resellers or distributors.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--c-text-3)]">
          Pricing policy
        </h2>
        <p className="text-[var(--c-text-3)] text-sm leading-relaxed">
          Supplifyed displays RRP (Recommended Retail Price) only. Live pricing is never shown.
        </p>
      </section>

      <section className="space-y-2 pb-8">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--c-text-3)]">
          Contact
        </h2>
        <p className="text-[var(--c-text-3)] text-sm">
          General enquiries:{' '}
          <a href="mailto:hello@supplifyed.com" className="text-[var(--c-text-2)] underline hover:text-[var(--c-accent)] transition-colors">
            hello@supplifyed.com
          </a>
        </p>
        <p className="text-[var(--c-text-3)] text-sm">
          Manufacturer submissions:{' '}
          <a href="mailto:brands@supplifyed.com" className="text-[var(--c-text-2)] underline hover:text-[var(--c-accent)] transition-colors">
            brands@supplifyed.com
          </a>
        </p>
        <p className="text-[var(--c-text-3)] text-sm">
          Privacy:{' '}
          <a href="/privacy" className="text-[var(--c-text-2)] underline hover:text-[var(--c-accent)] transition-colors">
            Privacy policy
          </a>
        </p>
      </section>

    </div>
  );
}
