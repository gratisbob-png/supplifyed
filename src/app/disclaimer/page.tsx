import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Disclaimer & Disclosure',
  description: 'Legal disclaimer, affiliate disclosure, and terms of use for Supplifyed supplement intelligence platform.',
};

const SECTIONS = [
  {
    heading: 'Not Medical Advice',
    body: 'The information presented on Supplifyed is for informational and educational purposes only. Nothing on this site constitutes medical advice, diagnosis, or treatment recommendations. The content is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or supplement regimen.',
  },
  {
    heading: 'Third-Party Research',
    body: 'All evidence presented on Supplifyed is sourced from third-party peer-reviewed publications indexed in PubMed and CrossRef. Supplifyed does not conduct original research. We compile, organise, and present existing published research. Evidence ratings reflect the volume and consistency of published findings — they are not original assessments or endorsements.',
  },
  {
    heading: 'Regulatory Status',
    body: 'Dietary supplements are not evaluated by the Food and Drug Administration (FDA) or equivalent regulatory bodies in most jurisdictions before they are sold. Supplement statements on this site have not been evaluated by any regulatory authority. Supplements are not intended to diagnose, treat, cure, or prevent any disease.',
  },
  {
    heading: 'Affiliate Disclosure',
    body: 'Supplifyed participates in affiliate marketing programmes. Links to third-party retailers (including Amazon Associates) may earn us a commission when you make a purchase, at no additional cost to you. Product selection and placement on this site is based solely on ingredient content and evidence ratings — not on commercial relationships or commission rates. We do not accept payment for product placement or positive reviews.',
  },
  {
    heading: 'Manufacturer Submissions',
    body: 'Manufacturers may submit products for inclusion in the Supplifyed database. Submission does not guarantee inclusion. All submitted products are evaluated against the same evidence standards as all other listed products. Payment for submission covers the cost of review only — it does not influence evidence ratings or editorial decisions.',
  },
  {
    heading: 'Accuracy & Updates',
    body: 'We make every effort to ensure the accuracy of information presented. However, supplement research evolves rapidly. Evidence ratings and study data are updated periodically but may not reflect the most recent publications at all times. Users should verify current research independently before making decisions.',
  },
  {
    heading: 'Individual Results',
    body: 'Supplement effects vary significantly between individuals based on genetics, health status, medications, diet, and other factors. Evidence ratings reflect population-level research findings. They do not predict individual outcomes.',
  },
];

export default function DisclaimerPage() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px' }}>

      <p style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '11px',
        color: 'var(--accent)',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        marginBottom: '16px',
      }}>
        Legal
      </p>

      <h1 style={{
        fontFamily: 'Sora, sans-serif',
        fontWeight: 300,
        fontSize: '48px',
        letterSpacing: '-0.02em',
        color: 'var(--text-primary)',
        marginBottom: '32px',
        lineHeight: 1,
      }}>
        Disclaimer &amp; Disclosure
      </h1>

      {SECTIONS.map(({ heading, body }) => (
        <div key={heading} style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontWeight: 500,
            fontSize: '18px',
            color: 'var(--text-primary)',
            marginBottom: '10px',
          }}>
            {heading}
          </h2>
          <p style={{
            fontSize: '15px',
            lineHeight: '1.7',
            color: 'var(--text-secondary)',
          }}>
            {body}
          </p>
        </div>
      ))}

      <div style={{
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '24px',
        marginTop: '16px',
      }}>
        <p style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '10px',
          color: 'var(--text-tertiary)',
          letterSpacing: '0.05em',
        }}>
          Last updated: June 2026 ·{' '}
          <Link href="/about" style={{ color: 'var(--accent)' }}>
            About Supplifyed
          </Link>
        </p>
      </div>

    </div>
  );
}
