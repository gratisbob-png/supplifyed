import type { EvidenceRating as EvidenceRatingType } from '@/types';

const RATING_CONFIG: Record<EvidenceRatingType, { label: string; className: string; description: string }> = {
  strong: {
    label: 'Strong',
    className: 'evidence-tag evidence-tag--strong',
    description: '3+ independent peer-reviewed studies with consistent findings',
  },
  moderate: {
    label: 'Moderate',
    className: 'evidence-tag evidence-tag--moderate',
    description: 'Evidence exists, some inconsistency or limited study size',
  },
  mixed: {
    label: 'Mixed',
    className: 'evidence-tag evidence-tag--mixed',
    description: 'Studies exist but findings conflict',
  },
  limited: {
    label: 'Limited',
    className: 'evidence-tag evidence-tag--limited',
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
      <span className={config.className} title={config.description}>
        {config.label.toUpperCase()}
      </span>
      {showDescription && (
        <p className="text-xs text-[var(--c-text-3)]">{config.description}</p>
      )}
    </div>
  );
}
