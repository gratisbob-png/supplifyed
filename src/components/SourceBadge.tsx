'use client';

import type { SourceBadge as SourceBadgeType } from '@/types';

const BADGE_CONFIG: Record<
  SourceBadgeType,
  { label: string; style: string; description: string }
> = {
  LABEL: {
    label: 'Manufacturer Label',
    style: 'bg-emerald-900/50 text-emerald-300 border border-emerald-800/60',
    description: 'Verbatim text from the product label',
  },
  MANUFACTURER: {
    label: 'Official Specs',
    style: 'bg-emerald-900/40 text-emerald-400 border border-emerald-800/50',
    description: 'Data from manufacturer or Amazon listing',
  },
  BRAND_MARKETING: {
    label: 'Brand Marketing',
    style: 'bg-amber-900/40 text-amber-400 border border-amber-800/50',
    description: 'Content submitted by the manufacturer',
  },
  PEER_REVIEWED: {
    label: 'Peer Reviewed',
    style: 'bg-blue-900/40 text-blue-300 border border-blue-800/50',
    description: 'Published peer-reviewed research',
  },
  PRESS: {
    label: 'Press',
    style: 'bg-slate-800/60 text-slate-400 border border-slate-700/50',
    description: 'Published media coverage',
  },
  INSTRUCTIONAL: {
    label: 'Instructional',
    style: 'bg-[var(--c-surface-3)] text-[var(--c-text-3)] border border-[var(--c-border)]',
    description: 'Usage and dosing guidance',
  },
};

interface Props {
  type: SourceBadgeType;
  showTooltip?: boolean;
}

export default function SourceBadge({ type, showTooltip = true }: Props) {
  const config = BADGE_CONFIG[type];

  return (
    <span
      className={`source-badge ${config.style}`}
      title={showTooltip ? config.description : undefined}
    >
      {config.label}
    </span>
  );
}
