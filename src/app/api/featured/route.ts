import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
  try {
    const db = await getDb();
    const [rows] = await db.query<{
      name: string;
      slug: string;
      evidence_rating: string;
    }[][]>(
      `SELECT name, slug, evidence_rating
       FROM ingredient
       WHERE evidence_rating = 'strong'
       ORDER BY name
       LIMIT 6`
    );
    const ingredients = (rows ?? []).map(row => ({
      name: row.name ?? '',
      slug: row.slug ?? '',
      rating: row.evidence_rating ?? 'strong',
    }));
    return NextResponse.json({ ingredients });
  } catch {
    return NextResponse.json({ ingredients: [] });
  }
}
