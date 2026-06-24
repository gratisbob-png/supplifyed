/**
 * Batch 1: Proteins, Amino Acids, Performance minerals (~30 ingredients)
 * Run: npx tsx scripts/seed_batch1.ts
 */
import { Surreal, RecordId } from 'surrealdb';

type IngredientSeed = {
  name: string; slug: string; category: string; description: string;
  primary_use: string[]; evidence_rating: 'strong'|'moderate'|'mixed'|'limited';
  dose_context?: string; legal_notes?: string;
};

const INGREDIENTS: IngredientSeed[] = [
  { name: 'Whey Protein Concentrate', slug: 'whey-protein-concentrate', category: 'Protein',
    description: 'Whey protein concentrate (WPC) is the most common form of whey protein, typically containing 70–80% protein by weight with residual lactose and fat. It provides all essential amino acids and a high leucine content for muscle protein synthesis, at a lower cost than isolate.',
    primary_use: ['muscle protein synthesis', 'muscle mass', 'recovery', 'protein supplementation'],
    evidence_rating: 'strong',
    dose_context: '20–40g per serving. Slightly lower protein density than WPI but cost-effective for most users. Evidence for muscle gain is equivalent to WPI when total protein intake is matched.' },

  { name: 'Casein Protein', slug: 'casein-protein', category: 'Protein',
    description: 'Micellar casein is the slow-digesting fraction of milk protein, forming a gel in the stomach that provides a sustained release of amino acids over 5–7 hours. It is the dominant protein in cow\'s milk and is used for overnight recovery and anti-catabolic support.',
    primary_use: ['overnight recovery', 'anti-catabolism', 'sustained amino acid release', 'muscle mass'],
    evidence_rating: 'strong',
    dose_context: '30–40g before sleep. A 2012 study (Res et al.) found 40g casein before sleep significantly increased overnight muscle protein synthesis and next-morning metabolic rate vs placebo.' },

  { name: 'Egg Protein', slug: 'egg-protein', category: 'Protein',
    description: 'Egg white protein (ovalbumin) has the highest biological value of any whole-food protein source and a complete essential amino acid profile. It is lactose-free and digests at an intermediate rate between whey and casein, making it a versatile alternative for dairy-intolerant individuals.',
    primary_use: ['muscle protein synthesis', 'lactose-free protein', 'complete amino acid profile', 'recovery'],
    evidence_rating: 'strong',
    dose_context: '20–40g per serving. BV of approximately 100 — the reference standard against which other proteins are measured. No large RCTs comparing egg protein powder specifically to whey, but protein quality evidence is robust.' },

  { name: 'Soy Protein Isolate', slug: 'soy-protein-isolate', category: 'Protein',
    description: 'Soy protein isolate provides a complete amino acid profile and is the highest-quality plant-based protein. It contains phytoestrogens (isoflavones) which have generated debate about hormonal effects; current evidence does not support clinically significant hormonal disruption at typical supplement doses in healthy adults.',
    primary_use: ['muscle protein synthesis', 'plant-based protein', 'cholesterol reduction', 'recovery'],
    evidence_rating: 'strong',
    dose_context: '20–40g per serving. Meta-analyses show equivalent muscle gains to whey when matched for leucine content. The isoflavone controversy: systematic reviews find no clinically significant effect on testosterone or oestrogen at supplement doses.' },

  { name: 'Pea Protein', slug: 'pea-protein', category: 'Protein',
    description: 'Pea protein isolate (from yellow split peas) is the fastest-growing plant protein, with a near-complete amino acid profile and high arginine content. It is hypoallergenic, vegan, and well-tolerated. A 2015 RCT found pea protein produced equivalent bicep gains to whey over 12 weeks in resistance-trained men.',
    primary_use: ['plant-based protein', 'muscle mass', 'hypoallergenic protein source', 'vegan protein'],
    evidence_rating: 'moderate',
    dose_context: '25–40g per serving. Lysine content is lower than whey but can be compensated by a balanced diet. Often combined with rice protein to achieve a complete amino acid profile.' },

  { name: 'Rice Protein', slug: 'rice-protein', category: 'Protein',
    description: 'Brown rice protein concentrate is hypoallergenic and gluten-free, with a moderate amino acid profile that is limiting in lysine. It is frequently combined with pea protein to create a complete plant-based amino acid profile. Digestibility is lower than whey but competitive among plant proteins.',
    primary_use: ['plant-based protein', 'hypoallergenic protein', 'vegan protein', 'muscle support'],
    evidence_rating: 'moderate',
    dose_context: '20–40g per serving. A 2013 RCT found rice protein produced equivalent gains in body composition and strength to whey over 8 weeks of resistance training when doses were matched.' },

  { name: 'Hemp Protein', slug: 'hemp-protein', category: 'Protein',
    description: 'Hemp protein is derived from hemp seeds and contains a complete amino acid profile with a notably high content of the omega-3 fatty acid ALA and gamma-linolenic acid (GLA). However, it has the lowest protein content per gram (typically 50% protein) among plant protein powders, limiting its utility as a primary protein source.',
    primary_use: ['plant-based protein', 'omega fatty acid content', 'fibre content', 'complete amino acids'],
    evidence_rating: 'limited',
    dose_context: '30–40g per serving for approximately 15–20g protein. The combination of protein and beneficial fatty acids is the key differentiator. Contains no THC or CBD at commercially processed levels. Not suitable as a sole protein source due to low protein density.' },

  { name: 'BCAA Blend', slug: 'bcaa-blend', category: 'Amino Acids',
    description: 'Branched-chain amino acids (leucine, isoleucine, and valine) are the three essential amino acids with aliphatic side chains. BCAA supplementation has been widely marketed for muscle growth; however, evidence shows benefits are primarily limited to those with inadequate total protein intake — sufficient dietary protein already provides optimal BCAA levels.',
    primary_use: ['muscle protein synthesis support', 'intra-workout nutrition', 'muscle soreness reduction', 'anti-catabolism'],
    evidence_rating: 'moderate',
    dose_context: '5–10g in a 2:1:1 ratio (leucine:isoleucine:valine). If total daily protein intake meets targets (1.6–2.2g/kg), standalone BCAA supplementation provides marginal additional benefit. Value is highest for fasted training or plant-protein-dominant diets with limited leucine.' },

  { name: 'Leucine', slug: 'leucine', category: 'Amino Acids',
    description: 'L-Leucine is the most anabolic of the branched-chain amino acids and the primary activator of mTORC1 — the central signalling hub for muscle protein synthesis. A minimum leucine threshold (~2–3g per meal) is required to maximally stimulate MPS, making leucine content the key quality metric for protein supplements.',
    primary_use: ['mTOR activation', 'muscle protein synthesis', 'muscle mass', 'recovery'],
    evidence_rating: 'strong',
    dose_context: '2–4g per serving as a standalone supplement to boost low-leucine meals. Often used to enrich plant protein meals that fall below the leucine threshold. Leucine co-ingestion with suboptimal protein doses can rescue MPS to levels equivalent to higher protein intakes.' },

  { name: 'Isoleucine', slug: 'isoleucine', category: 'Amino Acids',
    description: 'L-Isoleucine is one of the three branched-chain amino acids and plays roles in glucose uptake, glycogen synthesis, and haemoglobin formation. It has a lower anabolic potency than leucine but contributes to energy metabolism during exercise and is typically sold as part of a BCAA blend.',
    primary_use: ['BCAA component', 'glucose metabolism', 'energy during exercise', 'haemoglobin support'],
    evidence_rating: 'moderate',
    dose_context: 'Typically consumed as part of a BCAA blend at 2.5–5g total BCAAs. Independent isoleucine supplementation is rarely studied in isolation; most evidence derives from BCAA combination studies.' },

  { name: 'Valine', slug: 'valine', category: 'Amino Acids',
    description: 'L-Valine is the third branched-chain amino acid, contributing to muscle metabolism, tissue repair, and nitrogen balance. Like isoleucine, it is rarely supplemented independently and its primary use is as a component of standard BCAA blends in the 2:1:1 leucine:isoleucine:valine ratio.',
    primary_use: ['BCAA component', 'nitrogen balance', 'tissue repair', 'energy metabolism'],
    evidence_rating: 'moderate',
    dose_context: 'Consumed as part of BCAA blends. The 2:1:1 ratio is the most studied formulation and reflects the approximate BCAA composition of muscle tissue. Isolated valine supplementation has minimal independent evidence base.' },

  { name: 'Essential Amino Acids', slug: 'essential-amino-acids', category: 'Amino Acids',
    description: 'Essential amino acid (EAA) blends provide all nine essential amino acids that cannot be synthesised by the human body. EAAs have a stronger evidence base than BCAAs alone because they include histidine, lysine, methionine, phenylalanine, and threonine alongside the BCAAs — all required for complete muscle protein synthesis.',
    primary_use: ['complete muscle protein synthesis', 'intra-workout nutrition', 'muscle mass', 'recovery'],
    evidence_rating: 'strong',
    dose_context: '10–15g EAA blend providing all 9 essential amino acids. Evidence consistently shows EAAs are superior to BCAAs alone for stimulating MPS, since BCAAs alone cannot form complete muscle protein without the remaining EAAs.' },

  { name: 'L-Glutamine', slug: 'l-glutamine', category: 'Amino Acids',
    description: 'L-Glutamine is the most abundant amino acid in the body and the primary fuel source for enterocytes (gut lining cells) and immune cells. It is conditionally essential during periods of high physiological stress, critical illness, or intense exercise. Evidence for muscle gain in healthy athletes is weak; gut health and immune support evidence is stronger.',
    primary_use: ['gut mucosal integrity', 'immune support', 'conditionally essential amino acid', 'recovery'],
    evidence_rating: 'mixed',
    dose_context: '5–40g/day depending on indication. For gut health and leaky gut: 5–15g/day. For critical illness and surgical recovery: 20–40g/day IV or oral. For muscle recovery in athletes with adequate protein: benefit is marginal. Best use case is gut permeability support during intense training blocks.' },

  { name: 'L-Arginine', slug: 'l-arginine', category: 'Amino Acids',
    description: 'L-Arginine is a conditionally essential amino acid and the direct precursor to nitric oxide (NO) via nitric oxide synthase. Despite its NO-precursor role, oral arginine supplementation has poor bioavailability due to extensive first-pass metabolism. L-Citrulline is converted to arginine in the kidneys and produces higher plasma arginine than oral arginine supplementation.',
    primary_use: ['nitric oxide precursor', 'blood flow', 'erectile dysfunction research', 'wound healing'],
    evidence_rating: 'mixed',
    dose_context: '3–9g before exercise for pump/performance — less effective than citrulline at equivalent doses. For erectile dysfunction: 5g/day L-arginine showed modest benefits in small trials. Citrulline (2:1 conversion advantage) is the preferred NO precursor for performance applications.' },

  { name: 'L-Citrulline', slug: 'l-citrulline', category: 'Amino Acids',
    description: 'L-Citrulline is a non-essential amino acid that bypasses first-pass hepatic metabolism and is converted to arginine in the kidneys, raising plasma arginine levels more effectively than direct arginine supplementation. Evidence supports improved exercise performance, reduced muscle soreness, and enhanced blood flow at 6–8g doses.',
    primary_use: ['nitric oxide production', 'exercise performance', 'blood flow', 'muscle pump', 'soreness reduction'],
    evidence_rating: 'strong',
    dose_context: '6–8g pure L-citrulline 60 minutes before exercise. A 2010 RCT found 8g citrulline malate reduced muscle soreness by 40% and increased repetition count by 53% vs placebo in resistance training. Citrulline is now preferred over arginine in performance supplementation.' },

  { name: 'Citrulline Malate', slug: 'citrulline-malate', category: 'Amino Acids',
    description: 'Citrulline malate combines L-citrulline with malic acid (malate), a Krebs cycle intermediate. The malate component may provide additional energy-producing benefits by acting as a substrate for the citric acid cycle. It is the most common form of citrulline in pre-workout formulations, with the majority of performance research conducted on the 2:1 citrulline:malate form.',
    primary_use: ['exercise performance', 'nitric oxide production', 'energy metabolism', 'endurance', 'muscle pump'],
    evidence_rating: 'strong',
    dose_context: '6–8g citrulline malate (2:1 ratio, providing ~4g citrulline) before training. Most pre-workout research uses this form. Equivalent performance outcomes to pure citrulline at matched citrulline doses, with possible additional energy benefit from malate.' },

  { name: 'Beta-Alanine', slug: 'beta-alanine', category: 'Amino Acids',
    description: 'Beta-alanine is a non-essential amino acid that combines with histidine to form carnosine in muscle tissue. Carnosine acts as an intramuscular pH buffer, reducing acidosis during high-intensity exercise. Beta-alanine supplementation is the only proven method to increase muscle carnosine stores. The hallmark side effect — paraesthesia (tingling) — is harmless and dose-dependent.',
    primary_use: ['muscle carnosine synthesis', 'exercise endurance', 'high-intensity performance', 'lactic acid buffering'],
    evidence_rating: 'strong',
    dose_context: '3.2–6.4g/day (split into doses of 0.8–1.6g to minimise paraesthesia). A 2012 meta-analysis of 15 studies found beta-alanine significantly improved exercise capacity in efforts lasting 1–4 minutes. Effects require 4–6 weeks of loading to fully saturate muscle carnosine stores.' },

  { name: 'Taurine', slug: 'taurine', category: 'Amino Acids',
    description: 'Taurine is a sulfonic amino acid (not incorporated into proteins) found in high concentrations in the heart, brain, retina, and skeletal muscle. It plays roles in osmoregulation, calcium signalling, bile acid conjugation, and antioxidant defence. Clinical evidence supports cardiovascular and exercise recovery benefits.',
    primary_use: ['cardiovascular support', 'exercise performance', 'antioxidant', 'osmoregulation', 'neurological function'],
    evidence_rating: 'moderate',
    dose_context: '500–3,000mg/day in human trials. A 2018 systematic review found taurine significantly improved VO2 max, time to exhaustion, and reduced oxidative stress markers. Cardiovascular: 3g/day taurine significantly reduced systolic blood pressure in a 2016 RCT. Well-tolerated; safe at up to 6g/day from supplement studies.' },

  { name: 'Glycine', slug: 'glycine', category: 'Amino Acids',
    description: 'Glycine is the simplest amino acid, serving as a structural component of collagen, a neurotransmitter (inhibitory in the spinal cord, co-agonist at NMDA receptors in the brain), and a substrate for glutathione and creatine synthesis. Emerging evidence shows glycine (3g) significantly improves sleep quality by lowering core body temperature.',
    primary_use: ['sleep quality', 'collagen synthesis', 'glutathione precursor', 'creatine synthesis', 'joint health'],
    evidence_rating: 'moderate',
    dose_context: '3–5g before bed for sleep quality. A 2012 RCT (Bannai et al.) found 3g glycine before sleep significantly improved subjective sleep quality, daytime sleepiness, and cognitive performance. For collagen synthesis support: 3–5g alongside vitamin C and proline. Often underrated relative to evidence quality.' },

  { name: 'L-Tyrosine', slug: 'l-tyrosine', category: 'Amino Acids',
    description: 'L-Tyrosine is a non-essential amino acid and precursor to the catecholamine neurotransmitters dopamine, norepinephrine, and epinephrine, as well as thyroid hormones. Evidence is strongest for cognitive performance under stress, sleep deprivation, and cold exposure — conditions that deplete catecholamines. Effects in non-stressed, rested individuals are minimal.',
    primary_use: ['catecholamine precursor', 'cognitive function under stress', 'focus', 'thyroid hormone precursor'],
    evidence_rating: 'moderate',
    dose_context: '500–2,000mg 30–60 minutes before a stressful event or cognitive task. A military study found tyrosine significantly improved cognitive performance during acute cold stress vs placebo. Acetyl-L-Tyrosine (NALT) is sometimes used for better blood-brain barrier penetration. Not effective as a stimulant in rested, non-stressed individuals.' },

  { name: 'L-Carnitine', slug: 'l-carnitine', category: 'Amino Acids',
    description: 'L-Carnitine is a quaternary ammonium compound that transports long-chain fatty acids across the inner mitochondrial membrane for beta-oxidation. Despite its role in fat metabolism, evidence for fat loss in healthy individuals is inconsistent. More consistent evidence exists for male fertility, exercise recovery, and cognitive support in older adults.',
    primary_use: ['fat metabolism', 'male fertility', 'exercise recovery', 'cognitive function in elderly', 'fatigue reduction'],
    evidence_rating: 'mixed',
    dose_context: '1,000–4,000mg/day. For male fertility: 2–3g/day significantly improved sperm motility in multiple RCTs. For fat loss: inconsistent — most studies show no significant effect in non-deficient healthy adults. Acetyl-L-Carnitine (ALCAR) crosses the blood-brain barrier more readily for cognitive applications.' },

  { name: 'Acetyl-L-Carnitine', slug: 'acetyl-l-carnitine', category: 'Amino Acids',
    description: 'Acetyl-L-Carnitine (ALCAR) is the acetylated form of carnitine that crosses the blood-brain barrier more effectively than L-carnitine. The acetyl group is donated to form acetylcholine, providing a dual mechanism: carnitine\'s mitochondrial role plus cholinergic support. Evidence is strongest for cognitive decline in the elderly and neuropathic pain.',
    primary_use: ['cognitive function', 'neuroprotection', 'mitochondrial support', 'neuropathic pain', 'acetylcholine precursor'],
    evidence_rating: 'moderate',
    dose_context: '500–2,000mg/day. A 2003 Cochrane review found ALCAR significantly slowed cognitive decline in Alzheimer\'s disease patients. For neuropathic pain: 1,500–3,000mg/day showed significant reductions in two RCTs. Better brain penetrance than L-carnitine makes ALCAR the preferred form for cognitive applications.' },

  { name: 'HMB', slug: 'hmb', category: 'Amino Acids',
    description: 'Beta-hydroxy beta-methylbutyrate (HMB) is a leucine metabolite produced in small amounts by the body. It is proposed to reduce muscle protein breakdown and enhance protein synthesis. Evidence is strongest in untrained beginners and elderly populations experiencing muscle wasting; data in trained athletes is inconsistent.',
    primary_use: ['muscle preservation', 'anti-catabolism', 'muscle mass in elderly', 'recovery'],
    evidence_rating: 'mixed',
    dose_context: '3g/day (in two 1.5g doses). Most consistent benefits in untrained individuals starting resistance training, elderly with sarcopenia, and during caloric restriction. In trained athletes, a 2014 meta-analysis found no significant effect on strength or body composition. Free acid form (HMB-FA) shows faster absorption than calcium HMB.' },

  { name: 'Creatine HCL', slug: 'creatine-hcl', category: 'Performance',
    description: 'Creatine hydrochloride is creatine bound to hydrochloric acid, producing a more water-soluble salt than creatine monohydrate. Manufacturers claim this allows lower doses (750mg vs 3–5g) and reduced GI side effects. However, no published RCTs demonstrate equivalent efficacy to monohydrate at lower doses. The evidence base is significantly smaller than for monohydrate.',
    primary_use: ['muscle strength', 'power output', 'high-solubility creatine form'],
    evidence_rating: 'moderate',
    dose_context: '750mg–1,500mg marketed dose, though without evidence of equivalence to 3–5g monohydrate. Solubility advantage does not necessarily translate to bioavailability or efficacy advantage in vivo. Until head-to-head RCTs confirm dose equivalence, creatine monohydrate at 3–5g/day remains the evidence-based standard.' },

  { name: 'Creatine Nitrate', slug: 'creatine-nitrate', category: 'Performance',
    description: 'Creatine nitrate combines creatine with nitrate, theoretically providing both creatine and nitric oxide benefits in one compound. Evidence is very limited with no independent peer-reviewed RCTs demonstrating superiority over standard creatine monohydrate. It represents the highest-tier/lowest-evidence creatine form.',
    primary_use: ['muscle strength', 'nitric oxide production', 'exercise performance'],
    evidence_rating: 'limited',
    dose_context: '1–2g in marketed pre-workout products. No peer-reviewed independent RCTs compare creatine nitrate directly to monohydrate at matched doses. The nitrate component theoretically adds NO pathway benefits, but this has not been validated vs combined separate supplementation. Monohydrate remains the evidence standard.' },

  { name: 'Betaine Anhydrous', slug: 'betaine-anhydrous', category: 'Performance',
    description: 'Betaine (trimethylglycine) is found naturally in beetroot, spinach, and quinoa. It acts as an osmolyte and methyl donor, supporting creatine synthesis, homocysteine metabolism, and cellular hydration. A growing body of evidence supports modest benefits for power output and body composition with chronic supplementation.',
    primary_use: ['power output', 'homocysteine reduction', 'osmolyte', 'methyl donor', 'muscle endurance'],
    evidence_rating: 'moderate',
    dose_context: '2.5g/day in two divided doses. A 2018 meta-analysis of 11 studies found betaine significantly improved power output (ES=0.53) and strength (ES=0.49). A 2013 study found 2.5g/day betaine for 6 weeks significantly improved body composition vs placebo. Well-tolerated; fishy body odour reported by some users at higher doses.' },

  { name: 'Zinc', slug: 'zinc', category: 'Minerals',
    description: 'Zinc is an essential trace mineral serving as a cofactor for over 300 enzymes involved in immune function, protein synthesis, DNA replication, wound healing, and testosterone metabolism. Deficiency is widespread globally and impairs immune function, growth, and male reproductive health. Form significantly affects bioavailability: bisglycinate and picolinate have substantially higher absorption than oxide.',
    primary_use: ['immune function', 'testosterone support', 'wound healing', 'protein synthesis', 'antioxidant defence'],
    evidence_rating: 'strong',
    dose_context: 'RDA: 8–11mg/day. Therapeutic: 25–45mg/day for deficiency or immune support. Tolerable upper limit: 40mg/day (higher doses compete with copper absorption — include 1–2mg copper with chronic high-dose zinc). Zinc acetate lozenges reduce cold duration by ~1 day when started within 24 hours of symptom onset (Cochrane meta-analysis).' },

  { name: 'Calcium', slug: 'calcium', category: 'Minerals',
    description: 'Calcium is the most abundant mineral in the human body, essential for bone and teeth mineralisation, muscle contraction, nerve signal transmission, and blood clotting. Calcium carbonate is most concentrated (40% elemental calcium) but requires stomach acid for absorption; calcium citrate is better absorbed without food and in people with low stomach acid.',
    primary_use: ['bone mineralisation', 'muscle contraction', 'nerve function', 'osteoporosis prevention', 'blood pressure'],
    evidence_rating: 'strong',
    dose_context: 'RDA: 1,000–1,200mg/day from all sources. Supplement doses typically 500–600mg per serving (absorption efficiency declines above 500mg per dose). Must be taken with vitamin D3 and vitamin K2 MK-7 for optimal bone health outcomes. Calcium supplementation without vitamin K2 may increase cardiovascular calcification risk — evidence debated.' },

  { name: 'Potassium', slug: 'potassium', category: 'Minerals',
    description: 'Potassium is the primary intracellular cation, essential for maintaining membrane potential, nerve impulse transmission, muscle contraction (including cardiac muscle), and blood pressure regulation. Evidence consistently shows higher dietary potassium reduces hypertension and cardiovascular mortality. Most Western diets are potassium-deficient relative to guidelines.',
    primary_use: ['blood pressure regulation', 'cardiovascular health', 'muscle function', 'electrolyte balance', 'nerve function'],
    evidence_rating: 'strong',
    dose_context: 'Adequate intake: 2,600–3,400mg/day. Supplement servings are capped at 99mg in many jurisdictions (US, EU) to prevent accidental overdose. Potassium chloride and citrate forms have good bioavailability. People on ACE inhibitors, ARBs, or with kidney disease should consult a physician before supplementing.' },

  { name: 'Sodium', slug: 'sodium', category: 'Minerals',
    description: 'Sodium is the primary extracellular cation and is essential for fluid balance, blood pressure regulation, nerve signalling, and muscle contraction. While most adults consume excess dietary sodium, endurance athletes, those on very low-carbohydrate diets, or individuals in hot climates may benefit from targeted sodium supplementation to maintain electrolyte balance and performance.',
    primary_use: ['electrolyte balance', 'fluid retention', 'nerve function', 'endurance performance', 'hyponatremia prevention'],
    evidence_rating: 'strong',
    dose_context: '300–1,000mg sodium per serving in electrolyte products. Endurance athletes: 300–1,000mg/hour during prolonged exercise to replace sweat losses and prevent exercise-induced hyponatremia. General population: most people should reduce dietary sodium rather than supplement. Himalayan pink salt provides no evidence-based advantage over standard sodium chloride.' },
];

async function connectDb(): Promise<Surreal> {
  const db = new Surreal();
  await db.connect(process.env.SURREALDB_URL ?? 'http://localhost:8000');
  await db.signin({ username: process.env.SURREALDB_USER ?? 'root', password: process.env.SURREALDB_PASS ?? 'root' });
  await db.use({ namespace: process.env.SURREALDB_NS ?? 'supplifyed', database: process.env.SURREALDB_DB ?? 'production' });
  return db;
}

async function main() {
  console.log('Connecting to SurrealDB...');
  const db = await connectDb();
  console.log(`Seeding ${INGREDIENTS.length} ingredients (Batch 1)...\n`);
  let ok = 0; let errors = 0;
  for (const seed of INGREDIENTS) {
    try {
      await db.upsert(new RecordId('ingredient', seed.slug)).content({ ...seed, last_verified: new Date() });
      console.log(`  ✓ ${seed.name}`);
      ok++;
    } catch (err) { console.error(`  ✗ ${seed.name}: ${err}`); errors++; }
  }
  await db.close();
  console.log(`\n${ok} seeded · ${errors} errors`);
  if (errors > 0) process.exit(1);
}
main().catch(err => { console.error('Fatal:', err); process.exit(1); });
