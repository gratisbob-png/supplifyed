/**
 * Seeds molecular formula, molecular weight, IUPAC name, and common name
 * for all seeded ingredients. For herbal/complex extracts, the formula
 * shown is that of the primary active compound (noted in common_name).
 * Run: npm run seed:chem
 */

import { Surreal, RecordId } from 'surrealdb';

interface ChemData {
  slug: string;
  molecular_formula?: string;
  molecular_weight?: number;
  iupac_name?: string;
  common_name?: string;
}

const CHEM: ChemData[] = [

  // ─── PHASE 1 BASE INGREDIENTS ─────────────────────────────────────────────

  {
    slug: 'creatine-monohydrate',
    molecular_formula: 'C4H9N3O2',
    molecular_weight: 131.13,
    iupac_name: '2-(carbamimidamido)acetic acid',
    common_name: 'Creatine',
  },
  {
    slug: 'magnesium-glycinate',
    molecular_formula: 'C4H8MgN2O4',
    molecular_weight: 172.40,
    iupac_name: 'magnesium bis(2-aminoacetate)',
    common_name: 'Magnesium Bisglycinate',
  },
  {
    slug: 'vitamin-d3',
    molecular_formula: 'C27H44O',
    molecular_weight: 384.64,
    iupac_name: '(1R,3Z)-3-[(2E)-2-[(1R,3aS,7aR)-1-[(2R)-6-methylheptan-2-yl]-7a-methyloctahydro-1H-inden-4(2H)-ylidene]ethylidene]-4-methylenecyclohexan-1-ol',
    common_name: 'Cholecalciferol',
  },
  {
    slug: 'omega-3-fish-oil',
    molecular_formula: 'C20H30O2',
    molecular_weight: 302.45,
    iupac_name: '(5Z,8Z,11Z,14Z,17Z)-icosa-5,8,11,14,17-pentaenoic acid',
    common_name: 'EPA (Eicosapentaenoic Acid)',
  },
  {
    slug: 'ashwagandha',
    molecular_formula: 'C28H38O6',
    molecular_weight: 470.59,
    iupac_name: '(4β,5β,6β,22R)-4,27-dihydroxy-1-oxo-5,6:22,26-diepoxyergosta-2,24-dien-26-oic acid δ-lactone',
    common_name: 'Withaferin A (primary active)',
  },
  {
    slug: 'melatonin',
    molecular_formula: 'C13H16N2O2',
    molecular_weight: 232.28,
    iupac_name: 'N-[2-(5-methoxy-1H-indol-3-yl)ethyl]acetamide',
    common_name: 'Melatonin',
  },
  {
    slug: 'magnesium-citrate',
    molecular_formula: 'C12H10Mg3O14',
    molecular_weight: 451.11,
    iupac_name: 'trimagnesium 2-hydroxypropane-1,2,3-tricarboxylate',
    common_name: 'Magnesium Citrate',
  },
  {
    slug: 'magnesium-oxide',
    molecular_formula: 'MgO',
    molecular_weight: 40.30,
    iupac_name: 'magnesium oxide',
    common_name: 'Magnesia',
  },

  // ─── SLEEP / RELAXATION ─────────────────────────────────────────────────────

  {
    slug: 'l-theanine',
    molecular_formula: 'C7H14N2O3',
    molecular_weight: 174.20,
    iupac_name: '(S)-2-amino-4-(ethylcarbamoyl)butanoic acid',
    common_name: 'Theanine',
  },
  {
    slug: '5-htp',
    molecular_formula: 'C11H12N2O3',
    molecular_weight: 220.23,
    iupac_name: '(S)-2-amino-3-(5-hydroxy-1H-indol-3-yl)propanoic acid',
    common_name: 'Oxitriptan',
  },
  {
    slug: 'gaba-supplement',
    molecular_formula: 'C4H9NO2',
    molecular_weight: 103.12,
    iupac_name: '4-aminobutanoic acid',
    common_name: 'GABA',
  },
  {
    slug: 'l-tryptophan',
    molecular_formula: 'C11H12N2O2',
    molecular_weight: 204.23,
    iupac_name: '(S)-2-amino-3-(1H-indol-3-yl)propanoic acid',
    common_name: 'L-Tryptophan',
  },
  {
    slug: 'valerian-root',
    molecular_formula: 'C15H22O2',
    molecular_weight: 234.34,
    iupac_name: '(1S,5R)-5-isopropyl-8-methylenebicyclo[3.2.1]oct-2-ene-2-carboxylic acid',
    common_name: 'Valerenic Acid (primary active)',
  },
  {
    slug: 'passionflower',
    molecular_formula: 'C15H10O4',
    molecular_weight: 254.24,
    iupac_name: '5,7-dihydroxy-2-phenyl-4H-chromen-4-one',
    common_name: 'Chrysin (primary active)',
  },
  {
    slug: 'lemon-balm',
    molecular_formula: 'C18H16O8',
    molecular_weight: 360.31,
    iupac_name: '(E)-3-(3,4-dihydroxyphenyl)-1-[(R)-1-carboxy-2-(3,4-dihydroxyphenyl)ethyl] propenoate',
    common_name: 'Rosmarinic Acid (primary active)',
  },

  // ─── COGNITIVE / NOOTROPIC ─────────────────────────────────────────────────

  {
    slug: 'magnesium-l-threonate',
    molecular_formula: 'C8H14MgO10',
    molecular_weight: 294.49,
    iupac_name: 'magnesium bis[(2R,3S)-2,3,4-trihydroxybutanoate]',
    common_name: 'Magnesium L-Threonate',
  },
  {
    slug: 'alpha-gpc',
    molecular_formula: 'C8H20NO6P',
    molecular_weight: 257.22,
    iupac_name: '[2-(2,3-dihydroxypropoxy)-2-hydroxyethyl]-trimethylazanium hydrogen phosphate',
    common_name: 'Alpha-GPC',
  },
  {
    slug: 'cdp-choline',
    molecular_formula: 'C14H26N4O11P2',
    molecular_weight: 488.32,
    iupac_name: 'cytidine 5\'-diphosphocholine',
    common_name: 'Citicoline',
  },
  {
    slug: 'phosphatidylserine',
    molecular_formula: 'C3H8NO6P',
    molecular_weight: 185.07,
    iupac_name: '2-aminopropanedioic acid ester with phosphocholine',
    common_name: 'Phosphatidylserine head group',
  },
  {
    slug: 'bacopa-monnieri',
    molecular_formula: 'C41H68O13',
    molecular_weight: 756.97,
    iupac_name: '(3β,20R)-20-[(6-O-β-D-glucopyranosyl-β-D-glucopyranosyl)oxy]-3-(β-D-glucopyranosyloxy)dammar-24-en-12-one',
    common_name: 'Bacoside A (primary active)',
  },
  {
    slug: 'huperzine-a',
    molecular_formula: 'C15H18N2O',
    molecular_weight: 242.32,
    iupac_name: '(1R,9S,13E)-1-amino-13-ethylidene-11-methyl-6-azatricyclo[7.3.1.02,7]trideca-2(7),3,10-trien-5-one',
    common_name: 'Huperzine A',
  },
  {
    slug: 'ginkgo-biloba',
    molecular_formula: 'C20H24O10',
    molecular_weight: 424.39,
    iupac_name: '(1R,2S,6R,8S,11R)-8-tert-butyl-3,4,6,12,15,15-hexahydroxy-1,6,14-trimethyl-11-oxo-1,2,4,5,6,7,8,9,10,11-decahydro-1H-1,4a-methanobenzo[c][1]benzoxin-3(4H)-yl',
    common_name: 'Ginkgolide B (primary active)',
  },
  {
    slug: 'pqq',
    molecular_formula: 'C14H6N2O8',
    molecular_weight: 330.21,
    iupac_name: '4,5-dioxo-4,5-dihydro-1H-pyrrolo[2,3-f]quinoline-2,7,9-tricarboxylic acid',
    common_name: 'Pyrroloquinoline Quinone',
  },

  // ─── ANTIOXIDANTS ────────────────────────────────────────────────────────────

  {
    slug: 'nac',
    molecular_formula: 'C5H9NO3S',
    molecular_weight: 163.20,
    iupac_name: '(R)-2-acetamido-3-sulfanylpropanoic acid',
    common_name: 'N-Acetylcysteine',
  },
  {
    slug: 'glutathione',
    molecular_formula: 'C10H17N3O6S',
    molecular_weight: 307.32,
    iupac_name: '(2S)-2-amino-4-[[(1R)-1-[(carboxymethyl)carbamoyl]-2-sulfanylethyl]carbamoyl]butanoic acid',
    common_name: 'Glutathione (GSH)',
  },
  {
    slug: 'quercetin',
    molecular_formula: 'C15H10O7',
    molecular_weight: 302.24,
    iupac_name: '2-(3,4-dihydroxyphenyl)-3,5,7-trihydroxy-4H-chromen-4-one',
    common_name: 'Quercetin',
  },
  {
    slug: 'astaxanthin',
    molecular_formula: 'C40H52O4',
    molecular_weight: 596.84,
    iupac_name: '(3S,3\'S)-3,3\'-dihydroxy-β,β-carotene-4,4\'-dione',
    common_name: 'Astaxanthin',
  },
  {
    slug: 'pterostilbene',
    molecular_formula: 'C16H16O3',
    molecular_weight: 256.30,
    iupac_name: '(E)-4-(3,5-dimethoxystyryl)phenol',
    common_name: 'Pterostilbene',
  },
  {
    slug: 'lycopene',
    molecular_formula: 'C40H56',
    molecular_weight: 536.87,
    iupac_name: '(6E,8E,10E,12E,14E,16E,18E,20E,22E,24E,26E)-2,6,10,14,19,23,27,31-octamethyldotriaconta-2,6,8,10,12,14,16,18,20,22,24,26,30-tridecaene',
    common_name: 'Lycopene',
  },
  {
    slug: 'lutein',
    molecular_formula: 'C40H56O2',
    molecular_weight: 568.87,
    iupac_name: '(3R,3\'R,6\'R)-β,ε-carotene-3,3\'-diol',
    common_name: 'Lutein',
  },
  {
    slug: 'zeaxanthin',
    molecular_formula: 'C40H56O2',
    molecular_weight: 568.87,
    iupac_name: '(3R,3\'R)-β,β-carotene-3,3\'-diol',
    common_name: 'Zeaxanthin',
  },
  {
    slug: 'fisetin',
    molecular_formula: 'C15H10O6',
    molecular_weight: 286.24,
    iupac_name: '2-(3,4-dihydroxyphenyl)-3,7-dihydroxy-4H-chromen-4-one',
    common_name: 'Fisetin',
  },
  {
    slug: 'spermidine',
    molecular_formula: 'C7H19N3',
    molecular_weight: 145.25,
    iupac_name: 'N-(3-aminopropyl)butane-1,4-diamine',
    common_name: 'Spermidine',
  },

  // ─── ADAPTOGENS ─────────────────────────────────────────────────────────────

  {
    slug: 'eleuthero',
    molecular_formula: 'C17H24O9',
    molecular_weight: 372.37,
    iupac_name: '4-(3-hydroxy-1-propenyl)-2,6-dimethoxyphenyl β-D-glucopyranoside',
    common_name: 'Syringin (Eleutheroside B, primary active)',
  },
  {
    slug: 'schisandra',
    molecular_formula: 'C24H32O7',
    molecular_weight: 432.50,
    iupac_name: '1,2,3,13-tetramethoxy-6,7-dimethyl-5,6,7,8-tetrahydrobenzo[3,4]cycloocta[1,2-f][1,3]benzodioxol-10-yl methyl ether',
    common_name: 'Schisandrin A (primary active)',
  },
  {
    slug: 'astragalus',
    molecular_formula: 'C41H68O14',
    molecular_weight: 784.97,
    iupac_name: 'Astragaloside IV',
    common_name: 'Astragaloside IV (primary active)',
  },
  {
    slug: 'holy-basil',
    molecular_formula: 'C30H48O3',
    molecular_weight: 456.70,
    iupac_name: '3β-hydroxyurs-12-en-28-oic acid',
    common_name: 'Ursolic Acid (primary active)',
  },
  {
    slug: 'mucuna-pruriens',
    molecular_formula: 'C9H11NO4',
    molecular_weight: 197.19,
    iupac_name: '(S)-2-amino-3-(3,4-dihydroxyphenyl)propanoic acid',
    common_name: 'L-DOPA (primary active)',
  },

  // ─── IMMUNE SUPPORT ─────────────────────────────────────────────────────────

  {
    slug: 'elderberry',
    molecular_formula: 'C21H21ClO11',
    molecular_weight: 484.84,
    iupac_name: '2-(3,4-dihydroxyphenyl)-5,7-dihydroxy-3-(((3R,4S,5S,6R)-3,4,5-trihydroxy-6-((((3R,4S,5S,6R)-3,4,5-trihydroxy-6-(hydroxymethyl)tetrahydro-2H-pyran-2-yl)oxy)methyl)tetrahydro-2H-pyran-2-yl)oxy)chromenium chloride',
    common_name: 'Cyanidin-3-glucoside chloride (primary active)',
  },
  {
    slug: 'echinacea',
    molecular_formula: 'C35H46O20',
    molecular_weight: 786.72,
    iupac_name: 'echinacoside',
    common_name: 'Echinacoside (primary active)',
  },
  {
    slug: 'andrographis',
    molecular_formula: 'C20H30O5',
    molecular_weight: 350.45,
    iupac_name: '(3E,4S)-3-[2-[(1R,4aS,5R,6R,8aS)-6-hydroxy-5-(hydroxymethyl)-5,8a-dimethyl-2-methylenedecahydronaphthalen-1-yl]ethylidene]dihydrofuran-2(3H)-one',
    common_name: 'Andrographolide (primary active)',
  },
  {
    slug: 'black-seed-oil',
    molecular_formula: 'C10H12O2',
    molecular_weight: 164.20,
    iupac_name: '2-isopropyl-5-methyl-1,4-benzoquinone',
    common_name: 'Thymoquinone (primary active)',
  },

  // ─── MOOD / HORMONAL ────────────────────────────────────────────────────────

  {
    slug: 'saffron',
    molecular_formula: 'C10H14O',
    molecular_weight: 150.22,
    iupac_name: '2,6,6-trimethylcyclohexa-1,3-diene-1-carbaldehyde',
    common_name: 'Safranal (primary volatile active)',
  },
  {
    slug: 'st-johns-wort',
    molecular_formula: 'C30H16O8',
    molecular_weight: 504.44,
    iupac_name: '1,3,4,6,8,13-hexahydroxy-10,11-dimethyl-9-oxo-9H-benzo[a]xanthene-2,5-dione',
    common_name: 'Hypericin (primary active)',
  },
  {
    slug: 'dim',
    molecular_formula: 'C17H14N2',
    molecular_weight: 246.31,
    iupac_name: '3,3\'-methylenebis(1H-indole)',
    common_name: 'Diindolylmethane',
  },
  {
    slug: 'inositol',
    molecular_formula: 'C6H12O6',
    molecular_weight: 180.16,
    iupac_name: '(1R,2S,3r,4R,5S,6s)-cyclohexane-1,2,3,4,5,6-hexol',
    common_name: 'Myo-Inositol',
  },
  {
    slug: 'dhea',
    molecular_formula: 'C19H28O2',
    molecular_weight: 288.43,
    iupac_name: '(3β)-3-hydroxyandrost-5-en-17-one',
    common_name: 'Dehydroepiandrosterone',
  },
  {
    slug: 'same',
    molecular_formula: 'C15H22N6O5S',
    molecular_weight: 398.44,
    iupac_name: '(2S)-2-amino-4-[[(2S,3S,4R,5R)-5-(6-aminopurin-9-yl)-3,4-dihydroxytetrahydrofuran-2-yl]methyl-methylsulfonio]butanoate',
    common_name: 'S-Adenosylmethionine',
  },

  // ─── METABOLIC SUPPORT ──────────────────────────────────────────────────────

  {
    slug: 'bitter-melon',
    molecular_formula: 'C35H60O6',
    molecular_weight: 580.84,
    iupac_name: '(3β,5α,25R)-spirost-6-en-3-yl β-D-glucopyranoside',
    common_name: 'β-Sitosteryl glucoside (representative active)',
  },
  {
    slug: 'gymnema-sylvestre',
    molecular_formula: 'C34H58O10',
    molecular_weight: 626.82,
    iupac_name: 'Gymnemic acid I aglycone glycoside',
    common_name: 'Gymnemic Acid A1 (representative active)',
  },
  {
    slug: 'white-mulberry',
    molecular_formula: 'C6H13NO4',
    molecular_weight: 163.17,
    iupac_name: '(2R,3R,4R,5R)-2-(hydroxymethyl)piperidine-3,4,5-triol',
    common_name: '1-Deoxynojirimycin (primary active)',
  },

  // ─── JOINT / ANTI-INFLAMMATORY ──────────────────────────────────────────────

  {
    slug: 'boswellia',
    molecular_formula: 'C32H48O4',
    molecular_weight: 512.73,
    iupac_name: '3α-acetoxy-11-oxo-β-boswellic acid',
    common_name: 'AKBA (Acetyl-11-keto-β-boswellic acid)',
  },
  {
    slug: 'devils-claw',
    molecular_formula: 'C24H30O11',
    molecular_weight: 494.49,
    iupac_name: '(1S,2S,4S)-1-((E)-4-(β-D-glucopyranosyloxy)-3-methoxystyryl)-2,4-dihydroxymethyl-2-methylbutyl β-D-glucopyranoside',
    common_name: 'Harpagoside (primary active)',
  },
  {
    slug: 'theacrine',
    molecular_formula: 'C9H12N4O3',
    molecular_weight: 224.22,
    iupac_name: '1,3,7,9-tetramethyl-2,6-dioxo-2,3,6,7,8,9-hexahydro-1H-purine',
    common_name: 'Theacrine',
  },

  // ─── PERFORMANCE ─────────────────────────────────────────────────────────────

  {
    slug: 'agmatine-sulfate',
    molecular_formula: 'C5H14N4',
    molecular_weight: 130.19,
    iupac_name: '(4-aminobutyl)guanidine',
    common_name: 'Agmatine',
  },

  // ─── SKIN / BEAUTY ──────────────────────────────────────────────────────────

  {
    slug: 'marine-collagen',
    molecular_formula: undefined,
    molecular_weight: undefined,
    iupac_name: undefined,
    common_name: 'Hydrolysed Fish Collagen Peptides (protein, no single formula)',
  },
  {
    slug: 'evening-primrose-oil',
    molecular_formula: 'C18H30O2',
    molecular_weight: 278.43,
    iupac_name: '(6Z,9Z,12Z)-octadeca-6,9,12-trienoic acid',
    common_name: 'Gamma-Linolenic Acid (GLA)',
  },
  {
    slug: 'gla',
    molecular_formula: 'C18H30O2',
    molecular_weight: 278.43,
    iupac_name: '(6Z,9Z,12Z)-octadeca-6,9,12-trienoic acid',
    common_name: 'Gamma-Linolenic Acid',
  },
  {
    slug: 'silica',
    molecular_formula: 'SiO2',
    molecular_weight: 60.09,
    iupac_name: 'dioxosilane',
    common_name: 'Silicon Dioxide',
  },

  // ─── MINERALS ────────────────────────────────────────────────────────────────

  {
    slug: 'selenium',
    molecular_formula: 'C5H11NO2Se',
    molecular_weight: 196.11,
    iupac_name: '(2S)-2-amino-4-(methylselanyl)butanoic acid',
    common_name: 'Selenomethionine (supplement form)',
  },
  {
    slug: 'iodine',
    molecular_formula: 'I2',
    molecular_weight: 253.81,
    iupac_name: 'molecular iodine',
    common_name: 'Iodine',
  },
  {
    slug: 'copper',
    molecular_formula: 'Cu',
    molecular_weight: 63.55,
    iupac_name: 'copper',
    common_name: 'Copper',
  },
  {
    slug: 'manganese',
    molecular_formula: 'Mn',
    molecular_weight: 54.94,
    iupac_name: 'manganese',
    common_name: 'Manganese',
  },
  {
    slug: 'iron',
    molecular_formula: 'Fe',
    molecular_weight: 55.85,
    iupac_name: 'iron',
    common_name: 'Iron',
  },

  // ─── VITAMINS ────────────────────────────────────────────────────────────────

  {
    slug: 'methylfolate',
    molecular_formula: 'C20H25N7O7',
    molecular_weight: 459.45,
    iupac_name: 'N-(4-{[(6S)-2-amino-5-(methylamino)-4-oxo-3,4,5,6,7,8-hexahydropteridin-6-yl]methyl}benzoyl)-L-glutamic acid',
    common_name: '5-Methyltetrahydrofolate (5-MTHF)',
  },
  {
    slug: 'vitamin-k1',
    molecular_formula: 'C31H46O2',
    molecular_weight: 450.70,
    iupac_name: '2-methyl-3-[(2E,7R,11R)-3,7,11,15-tetramethylhexadec-2-en-1-yl]-2,3-dihydronaphthalene-1,4-dione',
    common_name: 'Phylloquinone',
  },

  // ─── GUT HEALTH ─────────────────────────────────────────────────────────────

  {
    slug: 'chamomile',
    molecular_formula: 'C15H10O5',
    molecular_weight: 270.24,
    iupac_name: '4\',5,7-trihydroxyflavone',
    common_name: 'Apigenin (primary active)',
  },
  {
    slug: 'kava',
    molecular_formula: 'C14H14O3',
    molecular_weight: 230.26,
    iupac_name: '(R)-5,6-dihydro-4-methoxy-6-styryl-2H-pyran-2-one',
    common_name: 'Kavain (primary kavalactone)',
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

async function seedChemData() {
  console.log('Connecting to SurrealDB...');
  const db = await connectDb();

  console.log(`Updating ${CHEM.length} ingredients with chemical data...\n`);

  let ok = 0;
  let errors = 0;
  let skipped = 0;

  for (const entry of CHEM) {
    const rid = new RecordId('ingredient', entry.slug);

    const updateData: Record<string, unknown> = {};
    if (entry.molecular_formula !== undefined) updateData.molecular_formula = entry.molecular_formula;
    if (entry.molecular_weight !== undefined) updateData.molecular_weight = entry.molecular_weight;
    if (entry.iupac_name !== undefined) updateData.iupac_name = entry.iupac_name;
    if (entry.common_name !== undefined) updateData.common_name = entry.common_name;

    if (Object.keys(updateData).length === 0) {
      console.log(`  · [skip] ${entry.slug}`);
      skipped++;
      continue;
    }

    try {
      await db.query(`UPDATE $id MERGE $data`, { id: rid, data: updateData });
      const formula = entry.molecular_formula ?? '—';
      console.log(`  ✓ ${entry.slug.padEnd(28)} ${formula}`);
      ok++;
    } catch (err) {
      console.error(`  ✗ ${entry.slug}: ${err}`);
      errors++;
    }
  }

  await db.close();
  console.log(`\n${ok} updated · ${skipped} skipped · ${errors} errors`);
  if (errors > 0) process.exit(1);
}

seedChemData().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
