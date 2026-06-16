import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SourceBadge from '@/components/SourceBadge';
import EvidenceRating from '@/components/EvidenceRating';

describe('SourceBadge', () => {
  it('renders PEER_REVIEWED badge', () => {
    render(<SourceBadge type="PEER_REVIEWED" />);
    expect(screen.getByText('Peer Reviewed')).toBeInTheDocument();
  });

  it('renders BRAND_MARKETING badge', () => {
    render(<SourceBadge type="BRAND_MARKETING" />);
    expect(screen.getByText('Brand Marketing')).toBeInTheDocument();
  });

  it('renders LABEL badge', () => {
    render(<SourceBadge type="LABEL" />);
    expect(screen.getByText('Manufacturer Label')).toBeInTheDocument();
  });

  it('renders MANUFACTURER badge', () => {
    render(<SourceBadge type="MANUFACTURER" />);
    expect(screen.getByText('Official Specs')).toBeInTheDocument();
  });

  it('has tooltip by default', () => {
    render(<SourceBadge type="PEER_REVIEWED" />);
    const badge = screen.getByText('Peer Reviewed');
    expect(badge).toHaveAttribute('title');
  });

  it('hides tooltip when showTooltip is false', () => {
    render(<SourceBadge type="PEER_REVIEWED" showTooltip={false} />);
    const badge = screen.getByText('Peer Reviewed');
    expect(badge).not.toHaveAttribute('title');
  });
});

describe('EvidenceRating', () => {
  it('renders strong evidence rating', () => {
    render(<EvidenceRating rating="strong" />);
    expect(screen.getByText(/STRONG/i)).toBeInTheDocument();
  });

  it('renders limited evidence rating', () => {
    render(<EvidenceRating rating="limited" />);
    expect(screen.getByText(/LIMITED/i)).toBeInTheDocument();
  });

  it('shows description when showDescription is true', () => {
    render(<EvidenceRating rating="strong" showDescription />);
    expect(screen.getByText(/3\+ independent/i)).toBeInTheDocument();
  });

  it('hides description by default', () => {
    render(<EvidenceRating rating="strong" />);
    expect(screen.queryByText(/3\+ independent/i)).not.toBeInTheDocument();
  });

  // No opinion language test — critical rule
  it('contains no opinion language', () => {
    const { container } = render(<EvidenceRating rating="strong" showDescription />);
    const opinionWords = ['best', 'recommended', 'top pick', 'winner', 'our pick'];
    const text = container.textContent?.toLowerCase() ?? '';
    for (const word of opinionWords) {
      expect(text).not.toContain(word);
    }
  });
});
