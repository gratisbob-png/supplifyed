/**
 * Creates RELATED_TO edges between ingredients in the expanded set,
 * and between new and existing ingredients.
 * Run: npm run seed:related:expanded
 */

import { Surreal, RecordId } from 'surrealdb';

type RelationPair = { from: string; to: string; relationship_type?: string };

/**
 * Each pair creates a bidirectional RELATED_TO relationship.
 * Slugs must match exactly what was seeded in ingredient nodes.
 */
const RELATIONS: RelationPair[] = [
  // ── Choline compounds (cognitive) ─────────────────────────────────────────
  { from: 'alpha-gpc', to: 'cdp-choline', relationship_type: 'same_family' },
  { from: 'alpha-gpc', to: 'phosphatidylserine', relationship_type: 'same_family' },
  { from: 'cdp-choline', to: 'phosphatidylserine', relationship_type: 'same_family' },

  // ── Serotonin pathway ─────────────────────────────────────────────────────
  { from: '5-htp', to: 'l-tryptophan', relationship_type: 'same_family' },
  { from: '5-htp', to: 'l-theanine', relationship_type: 'synergistic' },
  { from: 'l-theanine', to: 'gaba-supplement', relationship_type: 'synergistic' },
  { from: 'l-theanine', to: 'l-tryptophan', relationship_type: 'synergistic' },

  // ── Sleep / anxiolytic cluster ─────────────────────────────────────────────
  { from: 'valerian-root', to: 'passionflower', relationship_type: 'same_family' },
  { from: 'valerian-root', to: 'lemon-balm', relationship_type: 'same_family' },
  { from: 'passionflower', to: 'lemon-balm', relationship_type: 'same_family' },
  { from: 'lemon-balm', to: 'chamomile', relationship_type: 'same_family' },
  { from: 'chamomile', to: 'l-theanine', relationship_type: 'synergistic' },
  { from: 'kava', to: 'valerian-root', relationship_type: 'same_family' },
  { from: 'kava', to: 'passionflower', relationship_type: 'same_family' },

  // ── Nootropic cluster ─────────────────────────────────────────────────────
  { from: 'bacopa-monnieri', to: 'huperzine-a', relationship_type: 'synergistic' },
  { from: 'bacopa-monnieri', to: 'ginkgo-biloba', relationship_type: 'same_family' },
  { from: 'huperzine-a', to: 'alpha-gpc', relationship_type: 'synergistic' },

  // ── NAD+ / longevity pathway ──────────────────────────────────────────────
  { from: 'nmn', to: 'nicotinamide-riboside', relationship_type: 'same_family' },
  { from: 'pqq', to: 'nmn', relationship_type: 'synergistic' },
  { from: 'pqq', to: 'nicotinamide-riboside', relationship_type: 'synergistic' },

  // ── Antioxidant cluster ───────────────────────────────────────────────────
  { from: 'nac', to: 'glutathione', relationship_type: 'cofactor' },
  { from: 'nac', to: 'alpha-lipoic-acid', relationship_type: 'synergistic' },
  { from: 'glutathione', to: 'alpha-lipoic-acid', relationship_type: 'synergistic' },
  { from: 'quercetin', to: 'resveratrol', relationship_type: 'same_family' },
  { from: 'quercetin', to: 'fisetin', relationship_type: 'same_family' },
  { from: 'fisetin', to: 'resveratrol', relationship_type: 'same_family' },
  { from: 'fisetin', to: 'pterostilbene', relationship_type: 'same_family' },
  { from: 'pterostilbene', to: 'resveratrol', relationship_type: 'same_family' },
  { from: 'astaxanthin', to: 'lycopene', relationship_type: 'same_family' },
  { from: 'astaxanthin', to: 'lutein', relationship_type: 'same_family' },
  { from: 'lutein', to: 'zeaxanthin', relationship_type: 'same_family' },
  { from: 'lycopene', to: 'zeaxanthin', relationship_type: 'same_family' },

  // ── Joint / connective tissue ─────────────────────────────────────────────
  { from: 'boswellia', to: 'turmeric', relationship_type: 'synergistic' },
  { from: 'boswellia', to: 'devils-claw', relationship_type: 'same_family' },
  { from: 'uc-ii-collagen', to: 'glucosamine', relationship_type: 'synergistic' },
  { from: 'uc-ii-collagen', to: 'chondroitin', relationship_type: 'synergistic' },
  { from: 'uc-ii-collagen', to: 'msm', relationship_type: 'synergistic' },
  { from: 'devils-claw', to: 'boswellia', relationship_type: 'same_family' },
  { from: 'marine-collagen', to: 'uc-ii-collagen', relationship_type: 'same_family' },

  // ── Gut health cluster ────────────────────────────────────────────────────
  { from: 'saccharomyces-boulardii', to: 'beta-glucan', relationship_type: 'synergistic' },
  { from: 'saccharomyces-boulardii', to: 'colostrum', relationship_type: 'synergistic' },
  { from: 'beta-glucan', to: 'colostrum', relationship_type: 'synergistic' },
  { from: 'slippery-elm', to: 'saccharomyces-boulardii', relationship_type: 'synergistic' },
  { from: 'inositol', to: 'saccharomyces-boulardii', relationship_type: 'synergistic' },

  // ── Immune cluster ────────────────────────────────────────────────────────
  { from: 'elderberry', to: 'echinacea', relationship_type: 'same_family' },
  { from: 'elderberry', to: 'andrographis', relationship_type: 'same_family' },
  { from: 'andrographis', to: 'echinacea', relationship_type: 'same_family' },
  { from: 'black-seed-oil', to: 'elderberry', relationship_type: 'same_family' },
  { from: 'astragalus', to: 'elderberry', relationship_type: 'same_family' },
  { from: 'astragalus', to: 'eleuthero', relationship_type: 'same_family' },

  // ── Adaptogen cluster ─────────────────────────────────────────────────────
  { from: 'eleuthero', to: 'schisandra', relationship_type: 'same_family' },
  { from: 'eleuthero', to: 'holy-basil', relationship_type: 'same_family' },
  { from: 'schisandra', to: 'astragalus', relationship_type: 'same_family' },
  { from: 'holy-basil', to: 'schisandra', relationship_type: 'same_family' },
  { from: 'shilajit', to: 'pqq', relationship_type: 'synergistic' },
  { from: 'mucuna-pruriens', to: 'holy-basil', relationship_type: 'same_family' },
  { from: 'eleuthero', to: 'ashwagandha', relationship_type: 'same_family' },
  { from: 'holy-basil', to: 'ashwagandha', relationship_type: 'same_family' },

  // ── Mood / hormonal cluster ───────────────────────────────────────────────
  { from: 'saffron', to: 'st-johns-wort', relationship_type: 'same_family' },
  { from: 'saffron', to: '5-htp', relationship_type: 'synergistic' },
  { from: 'st-johns-wort', to: '5-htp', relationship_type: 'synergistic' },
  { from: 'dhea', to: 'shilajit', relationship_type: 'synergistic' },
  { from: 'dim', to: 'dhea', relationship_type: 'synergistic' },
  { from: 'inositol', to: 'saffron', relationship_type: 'synergistic' },

  // ── Metabolic cluster ─────────────────────────────────────────────────────
  { from: 'gymnema-sylvestre', to: 'bitter-melon', relationship_type: 'same_family' },
  { from: 'gymnema-sylvestre', to: 'white-mulberry', relationship_type: 'same_family' },
  { from: 'bitter-melon', to: 'white-mulberry', relationship_type: 'same_family' },
  { from: 'gymnema-sylvestre', to: 'berberine', relationship_type: 'synergistic' },
  { from: 'bitter-melon', to: 'berberine', relationship_type: 'synergistic' },

  // ── Magnesium forms ───────────────────────────────────────────────────────
  { from: 'magnesium-l-threonate', to: 'magnesium', relationship_type: 'same_family' },
  { from: 'magnesium-l-threonate', to: 'l-theanine', relationship_type: 'synergistic' },

  // ── Skin / beauty ─────────────────────────────────────────────────────────
  { from: 'marine-collagen', to: 'hyaluronic-acid', relationship_type: 'synergistic' },
  { from: 'evening-primrose-oil', to: 'gla', relationship_type: 'same_family' },
  { from: 'gla', to: 'evening-primrose-oil', relationship_type: 'same_family' },
  { from: 'silica', to: 'marine-collagen', relationship_type: 'synergistic' },

  // ── Eye health ────────────────────────────────────────────────────────────
  { from: 'lutein', to: 'astaxanthin', relationship_type: 'same_family' },

  // ── Methylation / B vitamins ──────────────────────────────────────────────
  { from: 'methylfolate', to: 'same', relationship_type: 'cofactor' },
  { from: 'methylfolate', to: 'vitamin-b12', relationship_type: 'cofactor' },
  { from: 'same', to: 'methylfolate', relationship_type: 'cofactor' },

  // ── Minerals ─────────────────────────────────────────────────────────────
  { from: 'selenium', to: 'iodine', relationship_type: 'synergistic' },
  { from: 'iodine', to: 'selenium', relationship_type: 'synergistic' },
  { from: 'copper', to: 'zinc', relationship_type: 'cofactor' },
  { from: 'iron', to: 'vitamin-c', relationship_type: 'cofactor' },
  { from: 'manganese', to: 'selenium', relationship_type: 'synergistic' },

  // ── Performance stimulants ────────────────────────────────────────────────
  { from: 'theacrine', to: 'caffeine', relationship_type: 'synergistic' },
  { from: 'agmatine-sulfate', to: 'l-arginine', relationship_type: 'same_family' },
  { from: 'agmatine-sulfate', to: 'l-citrulline', relationship_type: 'synergistic' },

  // ── SAMe and joint ────────────────────────────────────────────────────────
  { from: 'same', to: 'glucosamine', relationship_type: 'synergistic' },

  // ── Spermidine / longevity ────────────────────────────────────────────────
  { from: 'spermidine', to: 'fisetin', relationship_type: 'synergistic' },
  { from: 'spermidine', to: 'nmn', relationship_type: 'synergistic' },
];

async function connectDb(): Promise<Surreal> {
  const url = process.env.SURREALDB_URL ?? 'http://localhost:8000';
  const ns = process.env.SURREALDB_NS ?? 'supplifyed';
  const database = process.env.SURREALDB_DB ?? 'production';
  const username = process.env.SURREALDB_USER ?? 'root';
  const password = process.env.SURREALDB_PASS ?? 'root';
  const db = new Surreal();
  await db.connect(url);
  await db.signin({ username, password });
  await db.use({ namespace: ns, database });
  return db;
}

async function seedRelatedEdgesExpanded() {
  console.log('Connecting to SurrealDB...');
  const db = await connectDb();

  console.log(`Creating ${RELATIONS.length * 2} RELATED_TO edges (bidirectional)...\n`);

  let edgesOk = 0;
  let errors = 0;

  for (const { from, to, relationship_type = 'same_family' } of RELATIONS) {
    const fromRid = new RecordId('ingredient', from);
    const toRid = new RecordId('ingredient', to);
    try {
      // Bidirectional
      await db.query(
        `RELATE $a->related_to->$b SET relationship_type = $type; RELATE $b->related_to->$a SET relationship_type = $type`,
        { a: fromRid, b: toRid, type: relationship_type }
      );
      console.log(`  ✓ ${from} ↔ ${to}`);
      edgesOk += 2;
    } catch (err) {
      console.warn(`  ✗ ${from} ↔ ${to}: ${err}`);
      errors++;
    }
  }

  await db.close();
  console.log(`\n${edgesOk} edges created · ${errors} errors`);
  if (errors > 0) process.exit(1);
}

seedRelatedEdgesExpanded().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
