/**
 * Seeds the 10 Phase 1 ingredients into SurrealDB.
 * Run: npm run seed:ingredients
 * Run load_schema first: npm run db:schema
 */

import { Surreal, RecordId } from 'surrealdb';
import type { Ingredient } from '../src/types';

type IngredientSeed = Omit<Ingredient, 'id' | 'last_verified'>;

const PHASE_1_INGREDIENTS: IngredientSeed[] = [
  {
    name: 'Creatine Monohydrate',
    slug: 'creatine-monohydrate',
    category: 'Performance',
    description:
      'Creatine monohydrate is the most studied ergogenic aid in sports nutrition. It increases phosphocreatine stores in muscle, regenerating ATP during high-intensity exercise, and has established evidence for strength, power, and muscle mass gains.',
    primary_use: ['muscle strength', 'power output', 'muscle mass', 'cognitive support'],
    evidence_rating: 'strong',
    dose_context:
      '3–5g daily is the established maintenance dose from peer-reviewed research. A loading phase of 20g/day for 5–7 days saturates stores faster but produces identical long-term results. Most products contain 3–5g per serving, which aligns with evidence.',
  },
  {
    name: 'Magnesium Glycinate',
    slug: 'magnesium-glycinate',
    category: 'Minerals',
    description:
      'Magnesium glycinate is magnesium bound to the amino acid glycine. It has the highest bioavailability of all magnesium forms and is the aspiration-tier choice for sleep quality, muscle relaxation, and nervous system support.',
    primary_use: ['sleep quality', 'muscle relaxation', 'stress reduction', 'nervous system'],
    evidence_rating: 'strong',
    dose_context:
      'Studies use 200–400mg elemental magnesium daily. Glycinate form delivers more elemental magnesium per gram than oxide. Most clinical sleep studies used 350–500mg glycinate.',
  },
  {
    name: 'Magnesium Citrate',
    slug: 'magnesium-citrate',
    category: 'Minerals',
    description:
      'Magnesium citrate is magnesium bound to citric acid. Good bioavailability, widely available, and often used for muscle function and bowel regularity. The rational-tier magnesium form.',
    primary_use: ['muscle function', 'sleep support', 'gut motility', 'energy metabolism'],
    evidence_rating: 'strong',
    dose_context:
      '200–400mg elemental magnesium daily from evidence. Citrate has moderate-to-good bioavailability, significantly better than oxide. Common in pharmacy-grade formulas.',
  },
  {
    name: 'Magnesium Oxide',
    slug: 'magnesium-oxide',
    category: 'Minerals',
    description:
      'Magnesium oxide is the lowest-cost and most widely available form of magnesium, but has the poorest bioavailability of all forms — approximately 4% compared to 25–30% for glycinate. The economic-tier magnesium form.',
    primary_use: ['magnesium replenishment', 'heartburn relief', 'bowel regularity'],
    evidence_rating: 'moderate',
    dose_context:
      'Poor bioavailability means higher doses are needed to achieve the same elemental magnesium. Common in budget multivitamins and economy supplements. 500mg oxide delivers roughly equivalent absorbed magnesium to 200mg glycinate.',
  },
  {
    name: 'Vitamin D3',
    slug: 'vitamin-d3',
    category: 'Vitamins',
    description:
      'Vitamin D3 (cholecalciferol) is the most bioavailable form of vitamin D, produced in skin on exposure to UVB radiation. The most widely purchased supplement globally. Evidence is strong for bone health, immune function, and deficiency correction.',
    primary_use: ['bone health', 'immune function', 'mood support', 'calcium absorption'],
    evidence_rating: 'strong',
    dose_context:
      'Most evidence-based recommendations are 1,000–4,000 IU daily for deficiency correction and maintenance. Government upper limits are typically 4,000 IU/day. Many products contain 5,000 IU — above the upper limit but common in premium products. Blood testing is the only accurate way to determine personal requirement.',
  },
  {
    name: 'Omega-3 Fish Oil',
    slug: 'omega-3-fish-oil',
    category: 'Omega Oils',
    description:
      'Fish oil provides EPA and DHA, the two key omega-3 fatty acids with strong evidence for cardiovascular health, inflammation reduction, and cognitive support. Pharmaceutical-grade concentrates provide higher EPA/DHA per gram than standard fish oil.',
    primary_use: ['cardiovascular health', 'inflammation', 'cognitive function', 'joint health'],
    evidence_rating: 'strong',
    dose_context:
      'Studies typically use 1–4g combined EPA+DHA daily. Pharmaceutical-grade products (Vascepa, Lovaza) use 4g EPA+DHA daily for cardiovascular outcomes. Standard fish oil capsules often contain 300mg EPA+DHA per 1g capsule — check the label, not the total oil amount.',
  },
  {
    name: 'Ashwagandha',
    slug: 'ashwagandha',
    category: 'Herbal',
    description:
      'Ashwagandha (Withania somnifera) is an adaptogenic herb with consistent evidence for cortisol reduction, stress and anxiety support, and modest testosterone and strength benefits. KSM-66 and Sensoril are patented extracts with the strongest evidence base.',
    primary_use: ['stress reduction', 'cortisol control', 'anxiety support', 'testosterone', 'recovery'],
    evidence_rating: 'strong',
    dose_context:
      'Studies use 300–600mg of standardised extract (KSM-66 or Sensoril) daily. Bulk root powder requires 3,000–6,000mg to deliver equivalent withanolides. Check extract standardisation percentage, not total dose.',
  },
  {
    name: 'Melatonin',
    slug: 'melatonin',
    category: 'Sleep',
    description:
      'Melatonin is a hormone produced by the pineal gland that regulates the sleep-wake cycle. Evidence is strong for sleep onset assistance and jet lag correction. There is a significant gap between evidence-based doses and typical product doses.',
    primary_use: ['sleep onset', 'jet lag', 'circadian rhythm regulation'],
    evidence_rating: 'strong',
    dose_context:
      'Peer-reviewed evidence shows 0.5–3mg is effective for sleep onset. Higher doses do not improve efficacy and may cause grogginess. Most products contain 5–10mg — two to twenty times the evidence-based dose. The dose gap between evidence and products is a key data point on this platform.',
    legal_notes:
      'Melatonin is prescription-only in some countries (UK: available OTC, EU: varies by country). Always check local regulations.',
  },
  {
    name: 'Collagen Peptides',
    slug: 'collagen-peptides',
    category: 'Protein',
    description:
      'Hydrolysed collagen peptides are broken-down collagen chains. Evidence indicates potential support for joint cartilage, skin elasticity, and gut lining integrity, with moderate certainty — studies show benefits but inconsistency exists across outcomes.',
    primary_use: ['joint health', 'skin elasticity', 'gut health', 'hair and nails'],
    evidence_rating: 'moderate',
    dose_context:
      'Studies use 2.5–15g daily. Type II collagen shows joint-specific evidence at 10–40mg (undenatured form). Hydrolysed peptides (type I/III) show skin evidence at 2.5–10g. Collagen lacks the full amino acid profile to replace protein from complete sources.',
  },
  {
    name: 'Whey Protein Isolate',
    slug: 'whey-protein-isolate',
    category: 'Protein',
    description:
      'Whey protein isolate (WPI) is the purest form of whey protein, filtered to remove most lactose and fat, yielding 90%+ protein by weight. It has the highest leucine content and fastest absorption of any protein form.',
    primary_use: ['muscle protein synthesis', 'muscle mass', 'recovery', 'protein supplementation'],
    evidence_rating: 'strong',
    dose_context:
      '20–40g protein per serving to maximise muscle protein synthesis. The mTOR pathway is primarily activated by leucine content — WPI has the highest leucine of any protein form. Evidence supports total daily protein (1.6–2.2g/kg bodyweight) over individual serving timing in most contexts.',
  },
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

async function seedIngredients() {
  console.log('Connecting to SurrealDB...');
  const db = await connectDb();

  console.log(`Seeding ${PHASE_1_INGREDIENTS.length} Phase 1 ingredients...\n`);

  for (const seed of PHASE_1_INGREDIENTS) {
    try {
      await db.upsert(new RecordId('ingredient', seed.slug)).content({
        ...seed,
        last_verified: new Date(),
      });
      console.log(`  ✓ ${seed.name}`);
    } catch (err) {
      console.error(`  ✗ ${seed.name}: ${err}`);
    }
  }

  console.log('\nSeeding complete.');
  console.log('Next: run npm run seed:products to seed the first 30 products.');
  await db.close();
}

seedIngredients().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
