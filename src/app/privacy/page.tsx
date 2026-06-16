import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--c-text-3)] mb-2">Legal</p>
        <h1 className="text-2xl font-bold text-[var(--c-text)]">Privacy Policy</h1>
      </div>

      <div className="space-y-6 text-[var(--c-text-2)] text-sm leading-relaxed">
        <p>
          Supplifyed provides structured supplement information. This policy explains what data we
          collect and how we use it.
        </p>

        <section>
          <h2 className="text-[var(--c-text)] font-semibold mb-2">No user accounts</h2>
          <p>
            Supplifyed has no user accounts, no registration, and no email capture of any kind. We
            collect no personally identifiable information.
          </p>
        </section>

        <section>
          <h2 className="text-[var(--c-text)] font-semibold mb-2">Anonymised behaviour data</h2>
          <p>
            We collect anonymised usage data — which ingredients are viewed, which product tiers
            attract attention, and which links are clicked. This data is aggregate and anonymised.
            No individual user can be identified from it.
          </p>
          <p className="mt-2">
            We sell anonymised category behaviour data to brands and manufacturers. This is stated
            explicitly here and in our terms.
          </p>
        </section>

        <section>
          <h2 className="text-[var(--c-text)] font-semibold mb-2">Affiliate links</h2>
          <p>
            Links to retailers (Amazon, brand stores) may include affiliate tracking parameters.
            Clicking these links may earn Supplifyed a commission at no cost to you. Affiliate links
            are a commercial convenience, not an endorsement of any product.
          </p>
        </section>

        <section>
          <h2 className="text-[var(--c-text)] font-semibold mb-2">Cookies</h2>
          <p>
            We use Google Analytics 4 for traffic analysis, which requires cookies. We use a
            session identifier (stored in sessionStorage, not cookies) for behaviour aggregation.
            This identifier is not stored between sessions.
          </p>
        </section>

        <section>
          <h2 className="text-[var(--c-text)] font-semibold mb-2">Your rights</h2>
          <p>
            As we collect no personally identifiable information, there is no personal data to
            access, correct, or delete. For Google Analytics data, see Google&rsquo;s privacy
            controls.
          </p>
        </section>

        <section>
          <h2 className="text-[var(--c-text)] font-semibold mb-2">Contact</h2>
          <p>
            Questions about this policy:{' '}
            <a href="mailto:privacy@supplifyed.com" className="text-[var(--c-accent)] hover:opacity-80 transition-opacity">
              privacy@supplifyed.com
            </a>
          </p>
        </section>

        <p className="text-[var(--c-text-3)] text-xs font-mono pt-4 border-t border-[var(--c-border-subtle)]">
          Last updated: June 2026
        </p>
      </div>
    </div>
  );
}
