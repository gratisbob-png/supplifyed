import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { checkLink } from '@/lib/affiliate';
import { RecordId } from 'surrealdb';

function exId() {
  return new RecordId('exceptions', Date.now().toString(36) + Math.random().toString(36).slice(2, 6));
}

// Called by Vercel cron — Mondays 09:00 UTC (vercel.json)
// Checks all live product links and updates their status.
// Dead links create critical exceptions; redirected links create warnings.
export async function GET(): Promise<NextResponse> {
  const start = Date.now();

  try {
    const db = await getDb();

    const [products] = await db.query<{
      id: string; name: string; link_amazon: string; link_official?: string;
    }[][]>(
      `SELECT id, name, link_amazon, link_official FROM product WHERE link_status = 'live'`
    );

    if (!products || products.length === 0) {
      return NextResponse.json({ ok: true, checked: 0, dead: 0, redirected: 0 });
    }

    let dead = 0;
    let redirected = 0;
    let live = 0;

    for (const product of products) {
      const status = await checkLink(product.link_amazon);

      await db.query(
        `UPDATE type::thing($id) SET link_status = $status, last_verified = time::now()`,
        { id: product.id, status }
      );

      if (status === 'dead') {
        dead++;
        await db.upsert(exId()).content({
          type: 'link',
          severity: 'critical',
          node_id: product.id,
          description: `Dead Amazon link for "${product.name}": ${product.link_amazon}`,
          flagged_at: new Date(),
          resolved: false,
          context: 'HTTP status indicates link is dead',
        });
      } else if (status === 'redirected') {
        redirected++;
        await db.upsert(exId()).content({
          type: 'link',
          severity: 'warning',
          node_id: product.id,
          description: `Redirected Amazon link for "${product.name}" — verify destination`,
          flagged_at: new Date(),
          resolved: false,
          context: product.link_amazon,
        });
      } else {
        live++;
      }

      // Rate limit: 1 req/s to avoid bot detection
      await new Promise((r) => setTimeout(r, 1000));
    }

    const elapsed = Date.now() - start;

    return NextResponse.json({
      ok: true,
      checked: products.length,
      live,
      dead,
      redirected,
      elapsed_ms: elapsed,
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
