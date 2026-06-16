import { NextRequest, NextResponse } from 'next/server';
import type { BehaviourEvent } from '@/types';

// Receives anonymised behaviour events from the client.
// Aggregates and stores — no PII, no user IDs, no cross-session tracking.
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const events: BehaviourEvent[] = body?.events;

    if (!Array.isArray(events) || events.length === 0) {
      return NextResponse.json({ ok: false, error: 'No events' }, { status: 400 });
    }

    // Strip session_id before any persistence — anonymised aggregate only
    const anonymised = events.map(({ session_id: _, ...rest }) => rest);

    // TODO: persist to analytics store (Phase 7)
    // For now: log in development only
    if (process.env.NODE_ENV === 'development') {
      console.log('[analytics]', anonymised.length, 'events');
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
