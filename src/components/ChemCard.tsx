'use client';

import SourceBadge from './SourceBadge';

interface Props {
  formula?: string;
  molecular_weight?: number;
  iupac_name?: string;
  common_name?: string;
}

const SUBSCRIPT: Record<string, string> = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
  '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
};

function toSubscript(formula: string): string {
  return formula.replace(/[0-9]/g, (d) => SUBSCRIPT[d] ?? d);
}

export default function ChemCard({ formula, molecular_weight, iupac_name, common_name }: Props) {
  if (!formula && !molecular_weight && !iupac_name && !common_name) return null;

  const displayFormula = formula ? toSubscript(formula) : null;

  return (
    <div
      className="holo-card rounded-xl border border-[var(--c-accent)]/20 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, rgba(5,150,105,0.08) 0%, var(--c-surface) 60%)' }}
    >
      <div className="px-5 pt-4 pb-2 flex items-center justify-between relative z-10">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--c-text-3)]">
          Chemical identity
        </span>
        <SourceBadge type="PEER_REVIEWED" showTooltip={false} />
      </div>

      {displayFormula && (
        <div className="px-5 pb-4 pt-1 relative z-10">
          <p
            className="text-4xl font-mono font-bold text-gradient-green leading-none tracking-wide"
            aria-label={`Molecular formula: ${formula}`}
          >
            {displayFormula}
          </p>
        </div>
      )}

      <div className="border-t border-[var(--c-accent)]/10 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[var(--c-accent)]/10 relative z-10">
        {molecular_weight && (
          <div className="px-5 py-3">
            <p className="text-xs font-mono uppercase text-[var(--c-text-3)] mb-0.5 tracking-wide">Mol. weight</p>
            <p className="text-[var(--c-text)] font-mono text-sm">
              {molecular_weight.toFixed(2)}
              <span className="text-[var(--c-text-3)] text-xs ml-1">g/mol</span>
            </p>
          </div>
        )}
        {common_name && (
          <div className="px-5 py-3">
            <p className="text-xs font-mono uppercase text-[var(--c-text-3)] mb-0.5 tracking-wide">Common name</p>
            <p className="text-[var(--c-text)] font-mono text-sm">{common_name}</p>
          </div>
        )}
        {iupac_name && (
          <div className="px-5 py-3 sm:col-span-1">
            <p className="text-xs font-mono uppercase text-[var(--c-text-3)] mb-0.5 tracking-wide">IUPAC name</p>
            <p className="text-[var(--c-text-2)] font-mono text-xs leading-snug" title={iupac_name}>
              {iupac_name.length > 80 ? iupac_name.slice(0, 77) + '…' : iupac_name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
