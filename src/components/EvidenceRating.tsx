import type { EvidenceRating as EvidenceRatingType } from '@/types';

const RATING_CONFIG: Record<EvidenceRatingType, { label: string; dotColor: string; badgeStyle: string; description: string }> = {
  strong: {
    label: 'Strong',
    dotColor: '#34d399',
    badgeStyle: 'bg-emerald-900/40 text-emerald-300 border-emerald-800/50',
    description: '3+ independent peer-reviewed studies with consistent findings',
  },
  moderate: {
    label: 'Moderate',
    dotColor: '#fbbf24',
    badgeStyle: 'bg-amber-900/40 text-amber-300 border-amber-800/50',
    description: 'Evidence exists, some inconsistency or limited study size',
  },
  mixed: {
    label: 'Mixed',
    dotColor: '#fb923c',
    badgeStyle: 'bg-orange-900/40 text-orange-300 border-orange-800/50',
    description: 'Studies exist but findings conflict',
  },
  limited: {
    label: 'Limited',
    dotColor: '#f87171',
    badgeStyle: 'bg-red-900/40 text-red-300 border-red-800/50',
    description: 'Few or no independent studies',
  },
};

interface Props {
  rating: EvidenceRatingType;
  showDescription?: boolean;
}

export default function EvidenceRating({ rating, showDescription = false }: Props) {
  const config = RATING_CONFIG[rating];

  return (
    <div className="inline-flex flex-col gap-1.5">
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[11px] font-mono font-medium tracking-wide ${config.badgeStyle}`}
        title={config.description}
      >
        <span
          className="evidence-dot"
          style={{ background: config.dotColor }}
        />
        {config.label.toUpperCase()}
      </span>
      {showDescription && (
        <p className="text-xs text-[var(--c-text-3)]">{config.description}</p>
      )}
    </div>
  );
}
