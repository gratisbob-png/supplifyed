import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

// Category accent colours — mirror those in HERO_GRADIENTS
const CATEGORY_COLOUR: Record<string, string> = {
  'Sleep':       '#6366F1',
  'Performance': '#3B82F6',
  'Recovery':    '#06B6D4',
  'Gut Health':  '#10B981',
  'Longevity':   '#059669',
  'Vitamins':    '#F59E0B',
  'Minerals':    '#64748B',
  'Herbal':      '#84CC16',
  'Omega Oils':  '#F59E0B',
  'Protein':     '#3B82F6',
  'Amino Acids': '#3B82F6',
};
const DEFAULT_COLOUR = '#00E5C4';

const RATING_COLOUR: Record<string, string> = {
  strong:   '#10B981',
  moderate: '#3B82F6',
  mixed:    '#F59E0B',
  limited:  '#6B7280',
};

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const name     = searchParams.get('name')     ?? 'Supplifyed';
  const category = searchParams.get('category') ?? '';
  const rating   = searchParams.get('rating')   ?? '';
  const type     = searchParams.get('type')     ?? 'ingredient';

  const accent  = CATEGORY_COLOUR[category] ?? DEFAULT_COLOUR;
  const badge   = RATING_COLOUR[rating]     ?? '#6B7280';
  const isCategory = type === 'category';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background: '#08090A',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Radial glow — category colour */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 80% 100% at 20% 30%, ${accent}55 0%, transparent 60%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 50% 70% at 75% 70%, ${accent}22 0%, transparent 50%)`,
          }}
        />

        {/* Top-left brand */}
        <div
          style={{
            position: 'absolute',
            top: '48px',
            left: '64px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: accent,
              boxShadow: `0 0 20px ${accent}99`,
            }}
          />
          <span
            style={{
              color: '#F2F2F0',
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            SUPPLIFYED
          </span>
        </div>

        {/* Bottom content area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '0 64px 64px',
          }}
        >
          {/* Category label */}
          {category && (
            <span
              style={{
                color: accent,
                fontSize: '14px',
                fontWeight: 400,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              {category}
            </span>
          )}

          {/* Main name */}
          <div
            style={{
              color: '#F2F2F0',
              fontSize: isCategory ? '72px' : '60px',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              maxWidth: '800px',
            }}
          >
            {name}
          </div>

          {/* Bottom row: evidence badge + tagline */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              marginTop: '8px',
            }}
          >
            {rating && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: `${badge}22`,
                  border: `1px solid ${badge}66`,
                  borderRadius: '6px',
                  padding: '6px 14px',
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: badge,
                  }}
                />
                <span
                  style={{
                    color: badge,
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {rating} evidence
                </span>
              </div>
            )}
            {isCategory && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#FFFFFF08',
                  border: '1px solid #FFFFFF15',
                  borderRadius: '6px',
                  padding: '6px 14px',
                }}
              >
                <span
                  style={{
                    color: '#6B7280',
                    fontSize: '13px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Supplement category
                </span>
              </div>
            )}
            <span
              style={{
                color: '#4A4F58',
                fontSize: '13px',
                letterSpacing: '0.08em',
              }}
            >
              supplifyed.com
            </span>
          </div>
        </div>

        {/* Bottom edge glow */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(to right, transparent 0%, ${accent}88 30%, ${accent}88 70%, transparent 100%)`,
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
