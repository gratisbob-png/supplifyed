import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { RecordId } from 'surrealdb';

function toStr(v: unknown): string {
  if (v instanceof RecordId) return v.toString();
  if (typeof v === 'string') return v;
  if (v !== null && typeof v === 'object') {
    const o = v as Record<string, unknown>;
    if (typeof o.tb === 'string') return `${o.tb}:${o.id}`;
  }
  return String(v ?? '');
}

export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
  try {
    const db = await getDb();

    const [ingredientRows] = await db.query<{
      id: unknown;
      name: string;
      slug: string;
      evidence_rating: string;
      category: string;
      evidence_count: number;
    }[][]>(
      `SELECT id, name, slug, evidence_rating, category,
        array::len(->supported_by->evidence) AS evidence_count
       FROM ingredient
       ORDER BY name`
    );

    const [edgeRows] = await db.query<{
      in: unknown;
      out: unknown;
    }[][]>(`SELECT in, out FROM related_to`);

    const nodes = (ingredientRows ?? []).map(row => ({
      id: toStr(row.id),
      name: row.name ?? '',
      slug: row.slug ?? '',
      rating: row.evidence_rating ?? 'limited',
      category: row.category ?? '',
      evidenceCount: row.evidence_count ?? 0,
    }));

    // Deduplicate: bidirectional RELATE creates two records per pair
    const seen = new Set<string>();
    const links: { source: string; target: string }[] = [];
    for (const row of edgeRows ?? []) {
      const s = toStr(row.in);
      const t = toStr(row.out);
      if (!s || !t || s === t) continue;
      const key = [s, t].sort().join('|||');
      if (!seen.has(key)) {
        seen.add(key);
        links.push({ source: s, target: t });
      }
    }

    return NextResponse.json({ nodes, links });
  } catch {
    return NextResponse.json({ nodes: [], links: [] });
  }
}
