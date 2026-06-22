'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { analytics } from '@/lib/analytics';
import EvidenceRating from './EvidenceRating';
import SourceBadge from './SourceBadge';
import TierStack from './TierStack';
import ChemCard from './ChemCard';
import Reveal from './Reveal';
import type { IngredientWithEvidence } from '@/types';

interface Props {
  ingredient: IngredientWithEvidence;
}

function buildTierStack(ingredient: IngredientWithEvidence) {
  const tiers = { aspiration: [], rational: [], economic: [] } as {
    aspiration: typeof ingredient.products;
    rational: typeof ingredient.products;
    economic: typeof ingredient.products;
  };

  for (const product of ingredient.products ?? []) {
    const t = product.tier as keyof typeof tiers;
    if (t in tiers) tiers[t].push(product);
  }

  return tiers;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--c-text-3)] mb-4">
      {children}
    </h2>
  );
}

export default function IngredientPage({ ingredient }: Props) {
  useEffect(() => {
    analytics.pageView(ingredient.id);
  }, [ingredient.id]);

  const tiers = buildTierStack(ingredient);

  const hasForms = ingredient.forms && ingredient.forms.length > 0;
  const hasInteractions = ingredient.interactions && ingredient.interactions.length > 0;
  const relatedCompounds = (ingredient.related_compounds ?? []).filter(
    (r): r is NonNullable<typeof r> => r !== null && typeof r === 'object' && 'id' in r
  );
  const hasRelated = relatedCompounds.length > 0;
  const hasSynonyms = ingredient.synonyms && ingredient.synonyms.length > 0;

  return (
    <div className="space-y-12">

      {/* ── Header ── */}
      <Reveal>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--c-text)]">
            {ingredient.name}
          </h1>
          <EvidenceRating rating={ingredient.evidence_rating} showDescription />
          <p className="text-[var(--c-text-2)] text-lg leading-relaxed max-w-3xl">
            {ingredient.description}
          </p>
        </div>
      </Reveal>

      {/* ── Disclaimer banner ── */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        background: 'rgba(245,166,35,0.06)',
        border: '1px solid rgba(245,166,35,0.2)',
        borderRadius: '8px',
        padding: '12px 16px',
        marginBottom: '24px',
      }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '10px',
          color: '#F5A623',
          letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
          flexShrink: 0,
          paddingTop: '1px',
        }}>
          ⚠ INFO
        </span>
        <p style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '10px',
          lineHeight: '1.6',
          color: 'var(--text-tertiary)',
          margin: 0,
          letterSpacing: '0.02em',
        }}>
          This information is sourced from third-party peer-reviewed research. It is not medical advice. Evidence ratings reflect published research only — not product endorsements. Consult a healthcare professional before use.
        </p>
      </div>

      {/* ── Chemical identity ── */}
      {(ingredient.molecular_formula || ingredient.molecular_weight || ingredient.iupac_name || ingredient.common_name) && (
        <Reveal delay={60}>
          <ChemCard
            formula={ingredient.molecular_formula}
            molecular_weight={ingredient.molecular_weight}
            iupac_name={ingredient.iupac_name}
            common_name={ingredient.common_name}
          />
        </Reveal>
      )}

      {/* ── Synonyms ── */}
      {hasSynonyms && (
        <Reveal delay={80}>
          <section>
            <SectionHeading>Alternative names</SectionHeading>
            <div className="flex items-center gap-2 mb-3">
              <SourceBadge type="PEER_REVIEWED" />
            </div>
            <div className="flex flex-wrap gap-2">
              {ingredient.synonyms!.map((syn) => (
                <span
                  key={syn}
                  className="px-3 py-1 rounded-full border border-[var(--c-border)] text-[var(--c-text-2)] text-sm font-mono"
                >
                  {syn}
                </span>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {/* ── Common uses ── */}
      {ingredient.primary_use.length > 0 && (
        <Reveal>
          <section>
            <SectionHeading>Common uses</SectionHeading>
            <ul className="flex flex-wrap gap-2">
              {ingredient.primary_use.map((use) => (
                <li
                  key={use}
                  className="px-3 py-1 rounded-full border border-[var(--c-border)] text-[var(--c-text-2)] text-sm"
                >
                  {use}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      )}

      {/* ── Mechanism ── */}
      {ingredient.mechanism_of_action && (
        <Reveal>
          <section>
            <SectionHeading>Mechanism of action</SectionHeading>
            <div className="flex items-center gap-2 mb-3">
              <SourceBadge type="PEER_REVIEWED" />
            </div>
            <p className="text-[var(--c-text-2)] text-sm leading-relaxed">
              {ingredient.mechanism_of_action}
            </p>
          </section>
        </Reveal>
      )}

      {/* ── History ── */}
      {ingredient.history_of_use && (
        <Reveal>
          <section>
            <SectionHeading>History of use</SectionHeading>
            <div className="flex items-center gap-2 mb-3">
              <SourceBadge type="INSTRUCTIONAL" />
            </div>
            <p className="text-[var(--c-text-2)] text-sm leading-relaxed">
              {ingredient.history_of_use}
            </p>
          </section>
        </Reveal>
      )}

      {/* ── Forms & bioavailability ── */}
      {hasForms && (
        <Reveal>
          <section>
            <SectionHeading>Available forms and bioavailability</SectionHeading>
            <div className="overflow-x-auto rounded-xl border border-[var(--c-border)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--c-border)] bg-[var(--c-surface-2)]">
                    <th className="text-left px-4 py-2.5 text-xs font-mono uppercase text-[var(--c-text-3)] font-normal">Form</th>
                    <th className="text-left px-4 py-2.5 text-xs font-mono uppercase text-[var(--c-text-3)] font-normal">Bioavailability</th>
                    <th className="text-left px-4 py-2.5 text-xs font-mono uppercase text-[var(--c-text-3)] font-normal hidden sm:table-cell">Source</th>
                    <th className="text-left px-4 py-2.5 text-xs font-mono uppercase text-[var(--c-text-3)] font-normal">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {ingredient.forms!.map((form, i) => (
                    <tr
                      key={form.name}
                      className={`border-b border-[var(--c-border-subtle)] ${i % 2 === 0 ? 'bg-[var(--c-surface)]' : 'bg-transparent'}`}
                    >
                      <td className="px-4 py-3 text-[var(--c-text-2)] font-medium">{form.name}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                            form.bioavailability === 'high'
                              ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-800/50'
                              : form.bioavailability === 'moderate'
                              ? 'bg-amber-900/40 text-amber-300 border border-amber-800/50'
                              : 'bg-red-900/40 text-red-300 border border-red-800/50'
                          }`}
                        >
                          {form.bioavailability}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <SourceBadge type={form.source_badge} showTooltip={false} />
                      </td>
                      <td className="px-4 py-3 text-[var(--c-text-3)] text-xs leading-relaxed">{form.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </Reveal>
      )}

      {/* ── Dose context ── */}
      {ingredient.dose_context && (
        <Reveal>
          <section>
            <SectionHeading>Dose context</SectionHeading>
            <div className="flex items-center gap-2 mb-2">
              <SourceBadge type="PEER_REVIEWED" />
            </div>
            <p className="text-[var(--c-text-2)] text-sm leading-relaxed mt-2">
              {ingredient.dose_context}
            </p>
          </section>
        </Reveal>
      )}

      {/* ── Legal note ── */}
      {ingredient.legal_notes && (
        <Reveal>
          <section className="border border-amber-800/50 rounded-xl p-5 bg-amber-950/30">
            <p className="text-amber-400/80 text-xs font-mono uppercase tracking-wide mb-2">
              Legal note
            </p>
            <p className="text-amber-200/90 text-sm leading-relaxed">{ingredient.legal_notes}</p>
          </section>
        </Reveal>
      )}

      {/* ── Interactions ── */}
      {hasInteractions && (
        <Reveal>
          <section>
            <SectionHeading>Drug and supplement interactions</SectionHeading>
            <div className="overflow-x-auto rounded-xl border border-[var(--c-border)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--c-border)] bg-[var(--c-surface-2)]">
                    <th className="text-left px-4 py-2.5 text-xs font-mono uppercase text-[var(--c-text-3)] font-normal">Compound</th>
                    <th className="text-left px-4 py-2.5 text-xs font-mono uppercase text-[var(--c-text-3)] font-normal hidden sm:table-cell">Type</th>
                    <th className="text-left px-4 py-2.5 text-xs font-mono uppercase text-[var(--c-text-3)] font-normal">Severity</th>
                    <th className="text-left px-4 py-2.5 text-xs font-mono uppercase text-[var(--c-text-3)] font-normal hidden md:table-cell">Source</th>
                    <th className="text-left px-4 py-2.5 text-xs font-mono uppercase text-[var(--c-text-3)] font-normal">Mechanism</th>
                  </tr>
                </thead>
                <tbody>
                  {ingredient.interactions!.map((interaction, i) => (
                    <tr
                      key={i}
                      className={`border-b border-[var(--c-border-subtle)] ${i % 2 === 0 ? 'bg-[var(--c-surface)]' : 'bg-transparent'}`}
                    >
                      <td className="px-4 py-3 text-[var(--c-text-2)] font-medium">{interaction.name}</td>
                      <td className="px-4 py-3 text-[var(--c-text-3)] text-xs font-mono capitalize hidden sm:table-cell">
                        {interaction.type}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                            interaction.severity === 'avoid'
                              ? 'bg-red-900/40 text-red-300 border border-red-800/50'
                              : interaction.severity === 'caution'
                              ? 'bg-amber-900/40 text-amber-300 border border-amber-800/50'
                              : 'bg-blue-900/40 text-blue-300 border border-blue-800/50'
                          }`}
                        >
                          {interaction.severity}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <SourceBadge type={interaction.source_badge} showTooltip={false} />
                      </td>
                      <td className="px-4 py-3 text-[var(--c-text-3)] text-xs leading-relaxed">{interaction.mechanism}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[var(--c-text-3)]/50 mt-3 font-mono">
              Interaction data sourced from peer-reviewed literature. Consult a qualified healthcare provider before combining supplements or medications.
            </p>
          </section>
        </Reveal>
      )}

      {/* ── Evidence ── */}
      {(ingredient.evidence?.length ?? 0) > 0 && (
        <Reveal>
          <section>
            <SectionHeading>Evidence</SectionHeading>
            <div className="space-y-3">
              {(ingredient.evidence ?? []).map((ev) => (
                <div
                  key={ev.id}
                  className="card p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <a
                        href={ev.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[var(--c-text)] hover:text-[var(--c-accent)] text-sm transition-colors"
                      >
                        {ev.title}
                      </a>
                      <p className="text-[var(--c-text-3)] text-xs mt-0.5 font-mono">
                        {ev.authors} · {ev.journal} · {ev.year}
                        {ev.doi && (
                          <>
                            {' '}·{' '}
                            <a
                              href={`https://doi.org/${ev.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-[var(--c-text-2)] transition-colors"
                            >
                              DOI
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                    <div className="shrink-0 flex flex-col gap-1 items-end">
                      <SourceBadge type="PEER_REVIEWED" showTooltip={false} />
                      <span
                        className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                          ev.funded_by === 'independent'
                            ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-800/50'
                            : ev.funded_by === 'manufacturer'
                            ? 'bg-amber-900/40 text-amber-300 border border-amber-800/50'
                            : ev.funded_by === 'government'
                            ? 'bg-blue-900/40 text-blue-300 border border-blue-800/50'
                            : 'bg-[var(--c-surface-3)] text-[var(--c-text-3)] border border-[var(--c-border)]'
                        }`}
                      >
                        {ev.funded_by}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm pt-1 border-t border-[var(--c-border-subtle)]">
                    <div>
                      <span className="text-[var(--c-text-3)] text-xs font-mono uppercase tracking-wide">Dose studied</span>
                      <p className="text-[var(--c-text-2)] text-sm mt-0.5">{ev.dose_studied}</p>
                    </div>
                    <div>
                      <span className="text-[var(--c-text-3)] text-xs font-mono uppercase tracking-wide">Outcome</span>
                      <p className="text-[var(--c-text-2)] text-sm mt-0.5">{ev.outcome}</p>
                    </div>
                  </div>
                  {ev.finding && (
                    <p className="text-[var(--c-text-3)] text-sm border-t border-[var(--c-border-subtle)] pt-3">
                      {ev.finding}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '9px',
              color: 'var(--text-tertiary)',
              lineHeight: '1.6',
              marginTop: '12px',
              letterSpacing: '0.02em',
              opacity: 0.7,
            }}>
              Study data sourced from PubMed and CrossRef. Supplifyed does not conduct original research. All citations link to original third-party publications. Funding source classifications are inferred from available metadata.
            </p>
          </section>
        </Reveal>
      )}

      {/* ── FAQs ── */}
      {(ingredient.faqs?.length ?? 0) > 0 && (
        <Reveal>
          <section>
            <SectionHeading>Common questions</SectionHeading>
            <div className="space-y-2">
              {(ingredient.faqs ?? []).map((faq) => (
                <div key={faq.id} className="card p-5">
                  <h3 className="font-medium text-[var(--c-text)] text-sm mb-2">{faq.question}</h3>
                  <p className="text-[var(--c-text-3)] text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {/* ── Related compounds ── */}
      {hasRelated && (
        <Reveal>
          <section>
            <SectionHeading>Related compounds</SectionHeading>
            <div className="flex flex-wrap gap-2">
              {relatedCompounds.map((related) => (
                <Link
                  key={related.id}
                  href={`/ingredient/${related.slug}`}
                  className="card flex items-center gap-2.5 px-4 py-2.5 group"
                >
                  <span className="text-[var(--c-text-2)] text-sm group-hover:text-[var(--c-accent)] transition-colors">
                    {related.name}
                  </span>
                  <EvidenceRating rating={related.evidence_rating} />
                </Link>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {/* ── Product tier stack ── */}
      {(ingredient.products?.length ?? 0) > 0 && (
        <Reveal>
          <section>
            <SectionHeading>Products containing {ingredient.name}</SectionHeading>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '9px',
              color: 'var(--text-tertiary)',
              letterSpacing: '0.05em',
              marginBottom: '12px',
              opacity: 0.7,
            }}>
              ↗ AFFILIATE DISCLOSURE — Links to retailers may earn Supplifyed a commission at no cost to you. Product selection is based on ingredient content only, not commercial relationships.
            </p>
            <TierStack tiers={tiers} ingredientId={ingredient.id} />
          </section>
        </Reveal>
      )}

      {/* ── Last verified ── */}
      <p className="text-[var(--c-text-3)]/40 text-xs font-mono">
        Last verified: {new Date(ingredient.last_verified).toLocaleDateString('en-GB')}
      </p>
    </div>
  );
}
