import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'Privacy policy for Supplifyed — what data we collect and how we use it.',
};

const SECTIONS = [
  {
    heading: 'No personal data',
    body: 'Supplifyed has no user accounts, no registration, and no email capture. We collect no personally identifiable information by default. Search queries are not stored or tracked.',
  },
  {
    heading: 'Anonymised usage data',
    body: 'We collect anonymised usage data — which ingredients are viewed, which product tiers attract attention, and which links are clicked. This data is aggregate and anonymised. No individual user can be identified from it. We sell anonymised category behaviour data to brands and manufacturers. This is stated explicitly here and in our terms.',
  },
  {
    heading: 'Affiliate links',
    body: 'Links to retailers (Amazon, brand stores, Awin, CJ) include affiliate tracking parameters. Clicking these links and completing a purchase may earn Supplifyed a commission at no cost to you. Affiliate clicks may be tracked by third-party networks per their own privacy policies.',
  },
  {
    heading: 'Cookies',
    body: 'Google Analytics 4 (if enabled) collects anonymous usage data and requires cookies. A session identifier stored in sessionStorage — not cookies — is used for behaviour aggregation. It is not stored between sessions. No cookies beyond what Next.js requires for operation are set.',
  },
  {
    heading: 'Your rights',
    body: 'As we collect no personally identifiable information, there is no personal data to access, correct, or delete. For Google Analytics data, see Google\'s privacy controls.',
  },
];

export default function PrivacyPage() {
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
        Privacy
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
          <a href="mailto:privacy@supplifyed.com" style={{ color: 'var(--accent)' }}>
            privacy@supplifyed.com
          </a>
          {' · '}
          <Link href="/about" style={{ color: 'var(--accent)' }}>
            About Supplifyed
          </Link>
        </p>
      </div>

    </div>
  );
}
