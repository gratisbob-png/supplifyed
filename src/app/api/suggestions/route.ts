import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const q = req.nextUrl.searchParams.get('q')?.trim();
  if (!q || q.length < 1) return NextResponse.json({ suggestions: [] });

  try {
    const db = await getDb();
    const [results] = await db.query<{ name: string; slug: string }[][]>(
      `SELECT name, slug FROM ingredient
       WHERE string::lowercase(name) CONTAINS string::lowercase($q)
       ORDER BY name ASC
       LIMIT 8`,
      { q }
    );
    return NextResponse.json({ suggestions: results ?? [] });
  } catch {
    return NextResponse.json({ suggestions: [] });
  }
}
