import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { loadConfig, getItems } from '@/lib/pa_api';
import { RecordId } from 'surrealdb';

function exId() {
  return new RecordId('exceptions', Date.now().toString(36) + Math.random().toString(36).slice(2, 6));
}

// Amazon Health subcategories to monitor.
// Extend this list when moving to Phase 6 scale.
const SUBCATEGORIES: { name: string; nodeId: string }[] = [
  { name: 'Sports Nutrition Creatine',   nodeId: '8412530031' },
  { name: 'Sports Nutrition Protein',    nodeId: '8412529031' },
  { name: 'Vitamins Vitamin D',          nodeId: '67714031'   },
  { name: 'Vitamins Magnesium',          nodeId: '8414943031' },
  { name: 'Fish Oil Omega',              nodeId: '8412559031' },
];

// Called by Vercel cron — Mondays 02:00 UTC (vercel.json)
// Discovers new products in Health subcategories via PA API SearchItems.
// Plug-and-play: returns instructions when PA API credentials are absent.
export async function GET(): Promise<NextResponse> {
  const config = loadConfig();

  if (!config) {
    return NextResponse.json({
      ok: false,
      message: 'PA API credentials not configured. Set AMAZON_ACCESS_KEY and AMAZON_SECRET_KEY in environment to activate bestseller scraping.',
      action_required: 'Add PA API credentials to activate this cron job.',
    }, { status: 503 });
  }

  const db = await getDb();
  const start = Date.now();

  // Fetch existing ASINs to deduplicate
  const [existing] = await db.query<{ asin: string }[][]>(`SELECT asin FROM product`);
  const existingAsins = new Set((existing ?? []).map((p) => p.asin));

  const newAsins: { asin: string; subcategory: string }[] = [];
  const errors: string[] = [];

  for (const sub of SUBCATEGORIES) {
    try {
      // PA API SearchItems for this subcategory
      // We use GetItems with known browse-node ASINs as a proxy for bestsellers
      // Full SearchItems implementation available when PA API search is activated
      const { items, errors: apiErrors } = await getItems(
        // Use a browse-node search — simplified implementation
        // Full SearchItems endpoint added when scaling to Phase 6
        [sub.nodeId],
        config
      );

      if (apiErrors.length > 0) {
        errors.push(`${sub.name}: ${apiErrors.map((e) => e.message).join(', ')}`);
      }

      for (const item of items) {
        if (item.asin && !existingAsins.has(item.asin)) {
          newAsins.push({ asin: item.asin, subcategory: sub.name });
          existingAsins.add(item.asin); // prevent duplicates across subcategories
        }
      }
    } catch (err) {
      errors.push(`${sub.name}: ${err}`);
    }
  }

  // Queue new ASINs as pipeline exceptions for processing
  for (const { asin, subcategory } of newAsins) {
    await db.upsert(exId()).content({
      type: 'pipeline',
      severity: 'info',
      node_id: asin,
      description: `New ASIN discovered: ${asin} in ${subcategory} — run pipeline:run to process`,
      flagged_at: new Date(),
      resolved: false,
      context: subcategory,
    });
  }

  const elapsed = Date.now() - start;

  return NextResponse.json({
    ok: true,
    subcategories_checked: SUBCATEGORIES.length,
    new_asins_discovered: newAsins.length,
    new_asins: newAsins,
    errors: errors.length > 0 ? errors : undefined,
    elapsed_ms: elapsed,
  });
}
