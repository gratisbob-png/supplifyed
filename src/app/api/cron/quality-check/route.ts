import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { RecordId } from 'surrealdb';

function exId() {
  return new RecordId('exceptions', Date.now().toString(36) + Math.random().toString(36).slice(2, 6));
}

const OPINION_WORDS = [
  'best', 'recommended', 'top pick', 'winner', 'suggest',
  'should buy', 'we recommend', 'our pick', 'favourite',
  'number one', '#1 pick', 'must-have', 'perfect choice',
];

// Called by Vercel cron — daily 06:00 UTC (vercel.json)
// Runs all quality gates and writes exceptions for any violations.
export async function GET(): Promise<NextResponse> {
  const start = Date.now();
  let exceptions = 0;

  try {
    const db = await getDb();

    // ── Opinion language check ───────────────────────────────────────────────
    for (const word of OPINION_WORDS) {
      const [hits] = await db.query<{ id: string; field: string }[][]>(
        `SELECT id, 'packet_text' AS field FROM product
         WHERE string::lowercase(packet_text ?? '') CONTAINS $word
         UNION ALL
         SELECT id, 'brand_marketing' AS field FROM product
         WHERE string::lowercase(brand_marketing ?? '') CONTAINS $word
         UNION ALL
         SELECT id, 'answer' AS field FROM faq
         WHERE string::lowercase(answer) CONTAINS $word`,
        { word }
      );

      for (const hit of hits ?? []) {
        await db.upsert(exId()).content({
          type: 'content',
          severity: 'critical',
          node_id: hit.id,
          description: `Opinion word "${word}" found in ${hit.field} of ${hit.id}`,
          flagged_at: new Date(),
          resolved: false,
        });
        exceptions++;
      }
    }

    // ── Products without CONTAINS edges ─────────────────────────────────────
    const [noContains] = await db.query<{ id: string }[][]>(
      `SELECT id FROM product WHERE array::len(->contains->ingredient) = 0`
    );
    for (const p of noContains ?? []) {
      await db.upsert(exId()).content({
        type: 'data',
        severity: 'critical',
        node_id: p.id,
        description: `Product ${p.id} has no CONTAINS edge — missing ingredient link`,
        flagged_at: new Date(),
        resolved: false,
      });
      exceptions++;
    }

    // ── Products without generic link ────────────────────────────────────────
    const [noGeneric] = await db.query<{ id: string }[][]>(
      `SELECT id FROM product
       WHERE link_generic = NONE AND source != 'manufacturer_submission'`
    );
    for (const p of noGeneric ?? []) {
      await db.upsert(exId()).content({
        type: 'data',
        severity: 'warning',
        node_id: p.id,
        description: `Product ${p.id} missing generic ingredient link`,
        flagged_at: new Date(),
        resolved: false,
      });
      exceptions++;
    }

    // ── Evidence without funded_by ───────────────────────────────────────────
    const [noFunding] = await db.query<{ id: string }[][]>(
      `SELECT id FROM evidence WHERE funded_by = NONE OR funded_by = ''`
    );
    for (const e of noFunding ?? []) {
      await db.upsert(exId()).content({
        type: 'data',
        severity: 'warning',
        node_id: e.id,
        description: `Evidence node ${e.id} missing funded_by — required field`,
        flagged_at: new Date(),
        resolved: false,
      });
      exceptions++;
    }

    // ── Dead links older than 48 hours ───────────────────────────────────────
    const [deadLinks] = await db.query<{ id: string; name: string }[][]>(
      `SELECT id, name FROM product
       WHERE link_status = 'dead'
         AND last_verified < time::now() - 2d`
    );
    for (const p of deadLinks ?? []) {
      await db.upsert(exId()).content({
        type: 'link',
        severity: 'critical',
        node_id: p.id,
        description: `Product "${p.name}" has dead link status for >48 hours — remove or replace`,
        flagged_at: new Date(),
        resolved: false,
      });
      exceptions++;
    }

    const elapsed = Date.now() - start;

    return NextResponse.json({
      ok: true,
      exceptions_created: exceptions,
      elapsed_ms: elapsed,
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
