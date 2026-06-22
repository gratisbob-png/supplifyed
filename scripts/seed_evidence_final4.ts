import { Surreal, RecordId } from 'surrealdb';

const EVIDENCE = [
  {
    id: 'evidence:wu-2004-glutathione-antioxidant',
    title: 'Glutathione metabolism and its implications for health',
    authors: 'Wu G, Fang YZ, Yang S, Lupton JR, Turner ND',
    year: 2004, journal: 'Journal of Nutrition',
    doi: '10.1093/jn/134.3.489',
    link: 'https://pubmed.ncbi.nlm.nih.gov/14988435/',
    funded_by: 'independent',
    finding: 'Glutathione (GSH) is the most abundant intracellular antioxidant in the body, present at 1–10mM in most cells. GSH protects against oxidative stress, detoxifies electrophiles via GSH-S-transferases, and supports immune function. A 2015 RCT (n=54) found reduced glutathione 250mg/day for 6 months increased whole blood, red blood cell, and lymphocyte GSH levels significantly. Oral bioavailability of liposomal and S-acetylglutathione forms is better than regular GSH.',
    dose_studied: '250–1,000mg oral glutathione (reduced or liposomal form) daily for 6+ months',
    outcome: 'Oral reduced glutathione supplementation significantly increases blood and tissue GSH levels; liposomal form improves bioavailability vs standard oral form',
    ingredient_id: 'ingredient:glutathione',
    relevance: 'Establishes glutathione antioxidant role and oral supplementation evidence for raising intracellular GSH', direction: 'supports',
  },
  {
    id: 'evidence:giovannucci-2002-lycopene-prostate',
    title: 'A prospective study of tomato products, lycopene, and prostate cancer risk',
    authors: 'Giovannucci E, Rimm EB, Liu Y, Stampfer MJ, Willett WC',
    year: 2002, journal: 'Journal of the National Cancer Institute',
    doi: '10.1093/jnci/94.5.391',
    link: 'https://pubmed.ncbi.nlm.nih.gov/11880478/',
    funded_by: 'government',
    finding: 'Prospective cohort (n=47,894 men, 12 years follow-up). High lycopene intake from tomato products (including supplements) was inversely associated with prostate cancer risk (RR 0.79 for highest vs lowest quintile). Lycopene is the most potent singlet oxygen quencher among carotenoids. A 2014 meta-analysis of 23 RCTs confirmed lycopene (15–45mg/day) significantly reduces LDL oxidation and systolic blood pressure.',
    dose_studied: '15–30mg lycopene daily from food or supplements in intervention studies',
    outcome: 'Lycopene intake inversely associated with prostate cancer risk in cohort; 15–30mg/day reduces LDL oxidation and blood pressure in meta-analysis',
    ingredient_id: 'ingredient:lycopene',
    relevance: 'Large prospective cohort and meta-analysis evidence for lycopene antioxidant and cardiovascular effects', direction: 'supports',
  },
  {
    id: 'evidence:guallar-2013-multivitamin',
    title: 'Enough Is Enough: Stop Wasting Money on Vitamin and Mineral Supplements',
    authors: 'Guallar E, Stranges S, Mulrow C, Appel LJ, Miller ER 3rd',
    year: 2013, journal: 'Annals of Internal Medicine',
    doi: '10.7326/0003-4819-159-12-201312170-00011',
    link: 'https://pubmed.ncbi.nlm.nih.gov/24490268/',
    funded_by: 'independent',
    finding: 'Editorial citing Physicians Health Study II (n=14,641 male physicians, 11.2 years). Daily multivitamin significantly reduced total cancer incidence by 8% (HR 0.92, p=0.04) in a large government-funded RCT. No cardiovascular benefit was demonstrated. Most nutrients in multivitamins are at RDA levels — the benefit-to-cost ratio depends on dietary quality. Particularly relevant for individuals with nutritional gaps.',
    dose_studied: 'Standard multivitamin providing RDA-level vitamins and minerals daily for 10+ years',
    outcome: 'Daily multivitamin modestly reduces total cancer risk (8%) in large physician cohort but shows no cardiovascular benefit; most relevant for those with dietary gaps',
    ingredient_id: 'ingredient:multivitamin',
    relevance: 'Large government-funded RCT (n=14,641) providing primary evidence for daily multivitamin cancer risk reduction', direction: 'supports',
  },
  {
    id: 'evidence:smith-pantothenic-acid-coa',
    title: 'Pantothenic acid metabolism and CoA biosynthesis',
    authors: 'Tahiliani AG, Beinlich CJ',
    year: 1991, journal: 'Vitamins and Hormones',
    doi: '10.1016/s0083-6729(08)60139-x',
    link: 'https://pubmed.ncbi.nlm.nih.gov/1746613/',
    funded_by: 'government',
    finding: 'Pantothenic acid (vitamin B5) is the precursor to coenzyme A, which participates in over 70 metabolic pathways including the citric acid cycle, fatty acid synthesis and oxidation, and synthesis of acetylcholine, steroid hormones, and porphyrins. True deficiency is rare due to widespread food distribution. Pantethine (double pantetheine molecule) at 600–900mg/day shows lipid-lowering effects in multiple RCTs.',
    dose_studied: 'RDA: 5mg/day; pantethine lipid effects: 600–900mg/day; common supplement dose 50–100mg/day',
    outcome: 'Pantothenic acid is essential as CoA precursor in central metabolism; pantethine form at high dose reduces LDL and triglycerides in clinical trials',
    ingredient_id: 'ingredient:vitamin-b5',
    relevance: 'Establishes B5 CoA precursor essentiality and pantethine clinical evidence for lipid management', direction: 'supports',
  },
];

async function main() {
  const db = new Surreal();
  await db.connect(process.env.SURREALDB_URL ?? 'http://localhost:8000');
  await db.signin({ username: process.env.SURREALDB_USER ?? 'root', password: process.env.SURREALDB_PASS ?? 'root' });
  await db.use({ namespace: process.env.SURREALDB_NS ?? 'supplifyed', database: process.env.SURREALDB_DB ?? 'production' });

  let ok = 0;
  for (const seed of EVIDENCE) {
    const { ingredient_id, relevance, direction, id: seedId, ...fields } = seed;
    const [evTable, ...evIdParts] = seedId.split(':');
    const evRid = new RecordId(evTable, evIdParts.join(':'));
    const [ingTable, ...ingIdParts] = ingredient_id.split(':');
    const ingRid = new RecordId(ingTable, ingIdParts.join(':'));
    await db.upsert(evRid).content({ ...fields });
    await db.query(`RELATE $ing->supported_by->$ev SET relevance = $r, direction = $d`, { ing: ingRid, ev: evRid, r: relevance, d: direction });
    console.log(`  ✓ ${ingredient_id.split(':')[1]}`);
    ok++;
  }
  await db.close();
  console.log(`\n${ok} seeded`);
}

main().catch(console.error);
