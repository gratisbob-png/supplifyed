/**
 * Batch 2: Vitamins, Omega Oils, Gut Health (~30 ingredients)
 * Run: npx tsx scripts/seed_batch2.ts
 */
import { Surreal, RecordId } from 'surrealdb';

type IngredientSeed = {
  name: string; slug: string; category: string; description: string;
  primary_use: string[]; evidence_rating: 'strong'|'moderate'|'mixed'|'limited';
  dose_context?: string; legal_notes?: string;
};

const INGREDIENTS: IngredientSeed[] = [
  { name: 'Vitamin K2 (MK-7)', slug: 'vitamin-k2-mk7', category: 'Vitamins',
    description: 'Vitamin K2 (menaquinone-7, MK-7) activates two key proteins: osteocalcin (directs calcium into bone) and matrix Gla protein (prevents calcium deposition in arteries). MK-7 has a half-life of ~72 hours vs <24 hours for K1, enabling once-daily dosing and superior carboxylation of vitamin K-dependent proteins.',
    primary_use: ['bone calcium deposition', 'arterial calcification prevention', 'osteoporosis support', 'vitamin D synergy'],
    evidence_rating: 'moderate',
    dose_context: '90–360mcg/day MK-7. A 2013 Dutch RCT (n=244 postmenopausal women) found 180mcg/day MK-7 for 3 years significantly improved bone mineral density and reduced bone stiffness loss. Caution: vitamin K2 affects warfarin anticoagulation — do not use without monitoring if on anticoagulants.' },

  { name: 'Vitamin C', slug: 'vitamin-c', category: 'Vitamins',
    description: 'Vitamin C (ascorbic acid) is a water-soluble vitamin and potent antioxidant required for collagen synthesis, iron absorption, immune function, and neurotransmitter production. It is the most purchased individual vitamin globally. Plasma saturation occurs at ~200mg/day, above which absorption efficiency declines significantly. Liposomal vitamin C achieves higher plasma levels than standard ascorbic acid.',
    primary_use: ['antioxidant', 'collagen synthesis', 'immune function', 'iron absorption', 'cold duration reduction'],
    evidence_rating: 'strong',
    dose_context: '200–1,000mg/day for immune and antioxidant support. Cochrane review found vitamin C (200mg/day) reduces cold duration by 8–14% in regular supplementers and by 50% in people under extreme physical stress. Above 200mg, additional benefit diminishes. Liposomal form at 1,000mg achieves plasma levels comparable to IV administration in some studies.' },

  { name: 'Vitamin A', slug: 'vitamin-a', category: 'Vitamins',
    description: 'Vitamin A (retinol and its esters) is a fat-soluble vitamin essential for vision (retinal function), immune regulation, cell differentiation, and reproduction. Preformed vitamin A (retinol) has a narrow therapeutic window — chronic excess causes teratogenicity and liver toxicity. Beta-carotene (provitamin A) is safer as it is converted to retinol only on demand.',
    primary_use: ['vision health', 'immune function', 'skin cell differentiation', 'reproduction', 'antioxidant (beta-carotene)'],
    evidence_rating: 'strong',
    dose_context: 'RDA: 700–900mcg RAE/day. Tolerable upper limit for preformed vitamin A: 3,000mcg RAE/day. Pregnant women: avoid supplements containing >700mcg retinol (teratogenic risk). Beta-carotene form is preferred for supplementation safety. Retinyl palmitate is the standard form in multivitamins.',
    legal_notes: 'Pregnant women should not exceed 3,000 IU (900mcg) preformed vitamin A daily due to teratogenic risk. Consult a healthcare provider before supplementing during pregnancy.' },

  { name: 'Vitamin E', slug: 'vitamin-e', category: 'Vitamins',
    description: 'Vitamin E refers to eight fat-soluble compounds (four tocopherols and four tocotrienols), of which alpha-tocopherol is the most biologically active. Natural mixed tocopherols better reflect the dietary form. Evidence for antioxidant benefits in deficient populations is strong; cardiovascular disease prevention evidence is inconsistent in non-deficient populations.',
    primary_use: ['antioxidant', 'immune function', 'skin health', 'cardiovascular support', 'neuroprotection'],
    evidence_rating: 'mixed',
    dose_context: 'RDA: 15mg (22.4 IU) alpha-tocopherol/day. Tolerable upper limit: 1,000mg/day. High-dose supplementation (>400 IU/day) showed increased all-cause mortality in a 2005 meta-analysis — avoid high doses. Natural form (d-alpha-tocopherol) has approximately 2× higher bioavailability than synthetic (dl-alpha-tocopherol). Mixed tocopherols preferred over isolated alpha-tocopherol.' },

  { name: 'Vitamin B1 (Thiamine)', slug: 'vitamin-b1-thiamine', category: 'Vitamins',
    description: 'Thiamine (vitamin B1) is a water-soluble vitamin serving as a cofactor for key enzymes in carbohydrate and branched-chain amino acid metabolism, including pyruvate dehydrogenase and the Krebs cycle. Deficiency causes beriberi (cardiovascular/neurological) and Wernicke-Korsakoff syndrome (in alcohol dependence). Supplementation is most relevant for deficiency correction rather than performance enhancement.',
    primary_use: ['energy metabolism', 'nervous system function', 'deficiency prevention', 'carbohydrate metabolism'],
    evidence_rating: 'strong',
    dose_context: 'RDA: 1.1–1.2mg/day. Deficiency risk groups: heavy alcohol users, bariatric surgery patients, elderly, and those on poor diets. Thiamine HCl and thiamine mononitrate are the common supplement forms. High-dose thiamine (100–300mg/day) is used therapeutically for some neurological conditions without established toxicity.' },

  { name: 'Vitamin B2 (Riboflavin)', slug: 'vitamin-b2-riboflavin', category: 'Vitamins',
    description: 'Riboflavin (vitamin B2) is a water-soluble vitamin central to oxidative phosphorylation, fatty acid oxidation, and the electron transport chain as a component of FAD and FMN coenzymes. Notable clinical evidence includes a 2004 Cochrane review finding riboflavin (400mg/day) significantly reduces migraine frequency by 59% compared to placebo.',
    primary_use: ['energy metabolism', 'FAD/FMN coenzyme', 'migraine prevention', 'antioxidant enzyme support'],
    evidence_rating: 'strong',
    dose_context: 'RDA: 1.1–1.3mg/day. For migraine prevention: 400mg/day in clinical trials. Riboflavin causes bright yellow/orange urine at therapeutic doses — harmless. No known toxicity at high doses. MTHFR gene variant carriers may have higher riboflavin requirements for optimal methylation support.' },

  { name: 'Vitamin B3 (Niacin)', slug: 'vitamin-b3-niacin', category: 'Vitamins',
    description: 'Niacin (vitamin B3) exists as nicotinic acid and nicotinamide (niacinamide). Nicotinic acid at pharmacological doses (1,000–3,000mg) raises HDL and reduces triglycerides but causes uncomfortable skin flushing. Niacinamide does not flush and is preferred for skin and NAD+ precursor applications. NAD+ depletion underlies much of the longevity interest in B3 derivatives.',
    primary_use: ['NAD+ precursor', 'cholesterol management', 'skin health', 'energy metabolism', 'pellagra prevention'],
    evidence_rating: 'strong',
    dose_context: 'RDA: 14–16mg/day as NE. For cholesterol: 1,000–3,000mg/day nicotinic acid (prescription doses). For skin: 500mg–1,000mg niacinamide/day. For NAD+ support: NMN and NR are more direct precursors. Flush-free niacin (inositol hexanicotinate) has poor evidence for lipid effects. Hepatotoxicity at very high sustained doses.' },

  { name: 'Vitamin B5', slug: 'vitamin-b5', category: 'Vitamins',
    description: 'Pantothenic acid (vitamin B5) is a component of coenzyme A (CoA), essential for energy metabolism, fatty acid synthesis, and the acetylation of numerous metabolites. Deficiency is rare given its wide distribution in food. It is commonly included in skin supplements, though evidence for topical vs oral benefit for acne is limited.',
    primary_use: ['coenzyme A synthesis', 'energy metabolism', 'acne research', 'adrenal function', 'wound healing'],
    evidence_rating: 'moderate',
    dose_context: 'Adequate intake: 5mg/day. No established upper limit — pantothenic acid is considered non-toxic. For acne: 2.2g/day pantothenic acid showed significant improvement in an RCT (Leung, 1995). Often present in B-complex products. Deficiency is exceptionally rare in humans eating a varied diet.' },

  { name: 'Vitamin B6', slug: 'vitamin-b6', category: 'Vitamins',
    description: 'Pyridoxine (vitamin B6) is a cofactor for over 100 enzymatic reactions including amino acid metabolism, neurotransmitter synthesis (serotonin, dopamine, GABA), and haemoglobin production. P5P (pyridoxal-5-phosphate) is the active coenzyme form and does not require hepatic conversion. High-dose B6 supplementation (>200mg/day) causes peripheral neuropathy.',
    primary_use: ['amino acid metabolism', 'neurotransmitter synthesis', 'homocysteine reduction', 'immune function', 'PMS symptoms'],
    evidence_rating: 'strong',
    dose_context: 'RDA: 1.3–1.7mg/day. Tolerable upper limit: 100mg/day (neuropathy risk above this level with chronic use). For PMS: 80–100mg/day showed significant benefit in a Cochrane review. P5P form bypasses hepatic conversion and is preferred for those with B6 metabolism issues. Homocysteine reduction: B6 + B12 + folate combination is evidence-based.' },

  { name: 'Vitamin B7 (Biotin)', slug: 'vitamin-b7-biotin', category: 'Vitamins',
    description: 'Biotin (vitamin B7) is a water-soluble B vitamin and cofactor for five carboxylase enzymes involved in fatty acid synthesis, amino acid metabolism, and gluconeogenesis. It is widely supplemented for hair, skin, and nail health; however, evidence for these outcomes is limited to deficient populations. True biotin deficiency is rare.',
    primary_use: ['hair health', 'nail strength', 'glucose metabolism', 'fatty acid synthesis', 'biotin deficiency'],
    evidence_rating: 'mixed',
    dose_context: 'Adequate intake: 30mcg/day. Supplements typically provide 1,000–10,000mcg. Evidence for hair/nail benefits in non-deficient individuals is weak. Important: biotin supplementation (>1,000mcg/day) can cause false results on thyroid function and troponin immunoassay tests — inform your doctor. No known toxicity at supplement doses.' },

  { name: 'Vitamin B12', slug: 'vitamin-b12', category: 'Vitamins',
    description: 'Cobalamin (vitamin B12) is essential for DNA synthesis, neurological function, and red blood cell formation. Deficiency causes megaloblastic anaemia and irreversible neurological damage (subacute combined degeneration of the spinal cord). At-risk groups: vegans, vegetarians, elderly (reduced intrinsic factor), and those on metformin or PPIs. Methylcobalamin is the neurologically active form.',
    primary_use: ['neurological function', 'red blood cell formation', 'DNA synthesis', 'homocysteine reduction', 'vegan supplementation'],
    evidence_rating: 'strong',
    dose_context: 'RDA: 2.4mcg/day. For deficiency treatment: 1,000mcg/day oral (or IM injection if absorption impaired). Methylcobalamin vs cyanocobalamin: methylcobalamin is the active form that does not require conversion; cyanocobalamin is cheaper and well-studied. Vegans and those over 60 should routinely supplement. Sublingual and spray delivery bypass intrinsic factor.' },

  { name: 'Multivitamin Blend', slug: 'multivitamin-blend', category: 'Vitamins',
    description: 'Multivitamin supplements provide a range of essential vitamins and minerals in a single product. Evidence for disease prevention in non-deficient populations is limited; the USPSTF found insufficient evidence for multivitamin supplementation to prevent cardiovascular disease or cancer in non-deficient adults. However, multivitamins can effectively address widespread subclinical deficiencies.',
    primary_use: ['nutritional insurance', 'deficiency prevention', 'micronutrient adequacy', 'immune support'],
    evidence_rating: 'mixed',
    dose_context: 'Once daily with food (fat-soluble vitamins require dietary fat for absorption). Form quality matters: iron-free for men and post-menopausal women; methylated B vitamins (methylfolate, methylcobalamin) for MTHFR gene variant carriers. Evidence suggests targeted supplementation of identified deficiencies outperforms broad multivitamin use.' },

  { name: 'Omega-3 EPA', slug: 'omega-3-epa', category: 'Omega Oils',
    description: 'Eicosapentaenoic acid (EPA) is a long-chain omega-3 fatty acid with the strongest evidence for anti-inflammatory and cardiovascular effects. EPA is the primary precursor to anti-inflammatory eicosanoids (series-3 prostaglandins, series-5 leukotrienes). The pharmaceutical drug Vascepa (icosapentaenoic acid, pure EPA) demonstrated 25% cardiovascular event reduction in the REDUCE-IT trial.',
    primary_use: ['cardiovascular health', 'anti-inflammatory', 'triglyceride reduction', 'depression support', 'immune modulation'],
    evidence_rating: 'strong',
    dose_context: '1–4g EPA/day. REDUCE-IT trial (Bhatt et al., 2018, n=8,179): 4g pure EPA/day reduced cardiovascular events by 25% in high-risk patients. For depression: meta-analyses show EPA-dominant formulations (>60% EPA) outperform DHA for mood. For triglycerides: 2–4g combined EPA+DHA/day reduces triglycerides 25–30%.' },

  { name: 'Omega-3 DHA', slug: 'omega-3-dha', category: 'Omega Oils',
    description: 'Docosahexaenoic acid (DHA) is a long-chain omega-3 fatty acid and the dominant structural lipid in the brain and retina. DHA is essential for brain development, cognitive function, and visual acuity. It is conditionally essential during pregnancy and infancy. DHA-dominant formulations show stronger benefits for brain and eye health vs EPA.',
    primary_use: ['brain development', 'cognitive function', 'visual acuity', 'fetal brain development', 'neuroprotection'],
    evidence_rating: 'strong',
    dose_context: '200–1,000mg DHA/day. Pregnancy: 200–300mg DHA/day (critical for fetal brain and retinal development). For cognitive support in adults: 500–1,000mg DHA/day. Algae-derived DHA is the vegan-equivalent source (fish DHA derives from marine algae in the food chain). AREDS2 found DHA not beneficial for AMD, distinguishing DHA from lutein/zeaxanthin for eye health.' },

  { name: 'Krill Oil', slug: 'krill-oil', category: 'Omega Oils',
    description: 'Krill oil provides EPA and DHA in phospholipid form (rather than triglyceride form in fish oil), which is theorised to enable more efficient cellular incorporation. It also contains the antioxidant astaxanthin. A 2011 comparative study showed krill oil raised omega-3 index equivalently to fish oil at doses 37% lower. Sustainability concerns exist for Antarctic krill fishing.',
    primary_use: ['EPA and DHA source', 'cardiovascular health', 'anti-inflammatory', 'phospholipid omega-3'],
    evidence_rating: 'moderate',
    dose_context: '1–3g krill oil/day (providing 150–300mg EPA+DHA at typical concentrations). Lower EPA+DHA per gram than concentrated fish oil — check the EPA+DHA content, not the total oil amount. Phospholipid omega-3 may require smaller doses for equivalent plasma response, but direct disease outcome RCTs matching krill to fish oil at equivalent EPA+DHA are limited.' },

  { name: 'Algae Oil', slug: 'algae-oil', category: 'Omega Oils',
    description: 'Algae oil is derived from marine microalgae (primarily Schizochytrium and Thraustochytrid species) and is the original vegan/vegetarian source of long-chain omega-3 DHA and EPA. Fish accumulate omega-3 fatty acids by consuming algae — algae oil eliminates the fish intermediary and avoids marine contaminants (mercury, PCBs). Evidence for bioavailability equivalence to fish oil is established.',
    primary_use: ['vegan omega-3 source', 'DHA and EPA', 'sustainable omega-3', 'brain health', 'cardiovascular health'],
    evidence_rating: 'moderate',
    dose_context: '250–500mg DHA per serving in algae oils. A 2012 comparison study found algae DHA raised omega-3 index equivalently to cooked salmon. For vegans and vegetarians: the only direct long-chain omega-3 source without fish consumption. ALA from flaxseed has <5% conversion efficiency to EPA/DHA — algae oil provides the active forms directly.' },

  { name: 'MCT Oil', slug: 'mct-oil', category: 'Omega Oils',
    description: 'Medium-chain triglycerides (MCTs) — primarily caprylic acid (C8) and capric acid (C10) — are metabolised differently from long-chain fats: they are rapidly transported to the liver and converted to ketones without requiring carnitine. Evidence supports rapid energy production and modest cognitive benefits in Alzheimer\'s patients. Fat loss claims are overstated by marketing.',
    primary_use: ['ketone production', 'rapid energy', 'cognitive support in Alzheimer\'s', 'ketogenic diet support', 'satiety'],
    evidence_rating: 'moderate',
    dose_context: '15–30ml (1–2 tablespoons) per day, starting at 5ml to avoid GI upset. C8 (caprylic acid) produces more ketones per gram than C10 or C12. A 2009 RCT found MCT oil significantly improved cognitive scores in Alzheimer\'s patients who were APOE4-negative (n=152). Fat loss evidence: MCT oil produces modest but statistically significant reductions in body fat vs LCT oils in some meta-analyses.' },

  { name: 'CLA', slug: 'cla', category: 'Omega Oils',
    description: 'Conjugated linoleic acid (CLA) is a group of geometric isomers of linoleic acid found naturally in ruminant fat and dairy. CLA has been widely marketed for fat loss and lean mass preservation. A 2007 meta-analysis found CLA reduced body fat by a modest 0.1kg/week. However, some CLA isomers (t10,c12) may increase insulin resistance and inflammatory markers.',
    primary_use: ['body composition', 'fat reduction', 'lean mass preservation'],
    evidence_rating: 'limited',
    dose_context: '3.2g/day in most trials. The 2007 meta-analysis (Whigham et al., 18 studies) found 3.2g CLA reduced body fat by ~0.09kg/week — statistically significant but clinically marginal. t10,c12 isomer showed insulin resistance concerns in some trials. Natural CLA from grass-fed dairy has a different isomer ratio than synthetic supplement CLA.' },

  { name: 'Flaxseed Oil', slug: 'flaxseed-oil', category: 'Omega Oils',
    description: 'Flaxseed oil is the richest plant source of alpha-linolenic acid (ALA, 55%), the plant form of omega-3. ALA must be converted to EPA and DHA by the body; however, conversion efficiency is typically less than 5% for EPA and less than 0.5% for DHA. Flaxseed oil is a poor substitute for fish or algae oil for EPA/DHA delivery but is useful for ALA itself and lignans.',
    primary_use: ['ALA source', 'cardiovascular health', 'anti-inflammatory', 'skin health', 'gut transit'],
    evidence_rating: 'moderate',
    dose_context: '1–2 tablespoons (14–28ml) per day. ALA has independent cardiovascular evidence at dietary levels. For omega-3 purposes, algae oil provides direct EPA/DHA without conversion loss. Flaxseed (not the oil) also provides lignans (phytoestrogens with breast cancer research interest) and soluble fibre. Refrigerate — ALA oxidises rapidly.' },

  { name: 'Probiotics (Multi-strain)', slug: 'probiotics-multi-strain', category: 'Gut Health',
    description: 'Multi-strain probiotic supplements contain mixtures of bacterial species (typically Lactobacillus and Bifidobacterium genera) intended to colonise the gut and support microbiome diversity. The evidence is indication-specific and strain-specific — generic claims about "gut health" are unsupported, but specific strain combinations have robust evidence for IBS-D, antibiotic-associated diarrhoea, and immune modulation.',
    primary_use: ['IBS symptom reduction', 'antibiotic-associated diarrhoea prevention', 'immune modulation', 'gut microbiome support'],
    evidence_rating: 'moderate',
    dose_context: '1–50 billion CFU/day depending on indication. Specific strains matter — Lactobacillus rhamnosus GG (LGG) has the most evidence for AAD prevention. For IBS: VSL#3 multi-strain combination has consistent evidence. Refrigerated products maintain viability better than room-temperature. Timing: with or shortly before a meal to survive gastric acid transit.' },

  { name: 'Lactobacillus', slug: 'lactobacillus', category: 'Gut Health',
    description: 'Lactobacillus is the most studied probiotic genus, encompassing species including L. acidophilus, L. rhamnosus, L. reuteri, and L. plantarum. Different species have distinct evidence profiles: L. rhamnosus GG for AAD prevention, L. reuteri for H. pylori eradication, L. acidophilus for IBS, L. plantarum 299v for bloating. Strain specificity determines clinical utility.',
    primary_use: ['diarrhoea prevention', 'IBS symptoms', 'H. pylori eradication support', 'vaginal microbiome', 'immune support'],
    evidence_rating: 'strong',
    dose_context: '5–40 billion CFU/day of specific strains. L. rhamnosus GG (Culturelle): 1 capsule (10 billion CFU) daily during and for 2 weeks after antibiotic use — reduced AAD by 60% in a Cochrane meta-analysis. Strain identity is critical: look for genus, species, and strain designation on the label (e.g., Lactobacillus rhamnosus GG, not just "Lactobacillus").' },

  { name: 'Bifidobacterium', slug: 'bifidobacterium', category: 'Gut Health',
    description: 'Bifidobacterium is the dominant bacterial genus in the infant gut and declines with age. Key species include B. longum, B. infantis, B. lactis, and B. breve, with evidence for IBS, inflammatory bowel disease, constipation, and immune function. B. infantis 35624 (Align) has consistent evidence for IBS symptom relief across multiple independent RCTs.',
    primary_use: ['IBS symptom relief', 'constipation', 'immune regulation', 'infant microbiome', 'inflammatory bowel disease'],
    evidence_rating: 'strong',
    dose_context: '1–20 billion CFU/day of specific strains. B. infantis 35624 (1 billion CFU/day): significant IBS symptom improvement in a large multicentre RCT (Whorwell 2006, n=362). B. lactis DN-173 010: accelerated gut transit and reduced bloating in multiple trials. Bifidobacterium levels naturally decline with age — making probiotic support more relevant in adults over 40.' },

  { name: 'Prebiotic Fibre', slug: 'prebiotic-fibre', category: 'Gut Health',
    description: 'Prebiotic fibres are non-digestible carbohydrates that selectively feed beneficial gut bacteria (particularly Bifidobacterium and Lactobacillus). Common prebiotics include fructooligosaccharides (FOS), galactooligosaccharides (GOS), and inulin. Evidence for increasing Bifidobacterium counts and improving constipation is well-established.',
    primary_use: ['microbiome diversification', 'Bifidobacterium growth', 'constipation relief', 'immune support', 'satiety'],
    evidence_rating: 'strong',
    dose_context: '3–10g/day; start at 3g and increase gradually to reduce gas and bloating. GOS and FOS have the most clinical data for Bifidobacterium stimulation. Timing: can be taken at any time, often added to food. Prebiotic fibres combined with probiotics (synbiotic formulations) show greater Bifidobacterium increases than either alone.' },

  { name: 'Inulin', slug: 'inulin', category: 'Gut Health',
    description: 'Inulin is a naturally occurring polysaccharide prebiotic found in chicory root, Jerusalem artichokes, and onions. It is the most widely studied prebiotic fibre, selectively feeding Bifidobacterium species. Evidence includes improvements in constipation, stool frequency, calcium absorption, and blood lipids. Chicory root inulin is the commercial standard.',
    primary_use: ['Bifidobacterium prebiotic', 'constipation', 'calcium absorption', 'cholesterol reduction', 'blood glucose modulation'],
    evidence_rating: 'strong',
    dose_context: '3–15g/day. A 2019 meta-analysis found inulin significantly increased Bifidobacterium counts and improved constipation scores. For calcium absorption: 8g/day inulin significantly increased calcium absorption in adolescents (Abrams 2005 RCT). Start at 3–5g/day — abdominal gas and bloating are dose-dependent and reduce with adaptation over 2–3 weeks.' },

  { name: 'Psyllium Husk', slug: 'psyllium-husk', category: 'Gut Health',
    description: 'Psyllium husk is a soluble fibre from Plantago ovata seeds with the highest water-holding capacity of any commercially available fibre. It forms a gel in the gut that slows glucose absorption, reduces LDL cholesterol, and regulates bowel transit (bulking in diarrhoea, softening in constipation). The FDA approves a cardiovascular health claim for psyllium.',
    primary_use: ['cholesterol reduction', 'blood glucose modulation', 'constipation', 'IBS-C', 'prebiotic'],
    evidence_rating: 'strong',
    dose_context: '5–15g/day in divided doses with large volumes of water. FDA-approved claim: 7g/day psyllium reduces LDL cholesterol. A 2018 meta-analysis of 28 RCTs found psyllium significantly reduced fasting glucose and total cholesterol. Must be taken with at least 240ml water per serving — can cause oesophageal obstruction if taken without adequate fluid.' },

  { name: 'Digestive Enzymes', slug: 'digestive-enzymes', category: 'Gut Health',
    description: 'Supplemental digestive enzymes include proteases (protein digestion), lipases (fat digestion), amylases (carbohydrate digestion), and specific enzymes like lactase (dairy) and alpha-galactosidase (legumes/beans). Clinical evidence is strongest for pancreatic enzyme replacement in exocrine pancreatic insufficiency (EPI) — prescription grade. OTC blends have weaker evidence.',
    primary_use: ['protein digestion', 'fat digestion', 'lactose intolerance', 'bloating reduction', 'IBS support'],
    evidence_rating: 'moderate',
    dose_context: 'With meals, as directed. Lactase (for lactose intolerance): 3,000–9,000 FCC units with lactose-containing meals — well-evidenced. Alpha-galactosidase (Beano) for legume-induced gas: 1,000 GalU units before legume meals — demonstrated in RCTs. Broad-spectrum digestive enzyme blends have moderate evidence for bloating and dyspepsia in functional GI conditions.' },

  { name: 'Postbiotics', slug: 'postbiotics', category: 'Gut Health',
    description: 'Postbiotics are defined by the International Scientific Association for Probiotics and Prebiotics (ISAPP, 2021) as "preparations of inanimate microorganisms and/or their components that confer a health benefit on the host." They include heat-killed bacteria, bacterial lysates, and metabolites. HMO (human milk oligosaccharides) and short-chain fatty acids are key emerging postbiotic categories.',
    primary_use: ['gut barrier function', 'immune modulation', 'inflammation reduction', 'microbiome support'],
    evidence_rating: 'moderate',
    dose_context: 'No standardised dosing yet — an emerging category. Heat-killed L. reuteri DSM 17648 (Pylopass): 200mg/day significantly reduced H. pylori counts in RCTs. Postbiotics offer stability advantages over live probiotics (no refrigeration, longer shelf life) and cannot cause infection in immunocompromised individuals — a key safety advantage.' },

  { name: 'Phosphorus', slug: 'phosphorus', category: 'Minerals',
    description: 'Phosphorus is the second most abundant mineral in the body after calcium, essential for bone and teeth mineralisation (hydroxyapatite), ATP energy production, DNA and RNA synthesis, and cell membrane phospholipids. Dietary deficiency is rare in Western populations as phosphorus is widespread in protein-rich foods and food additives.',
    primary_use: ['bone mineralisation', 'ATP energy production', 'DNA and RNA synthesis', 'acid-base balance'],
    evidence_rating: 'moderate',
    dose_context: 'RDA: 700mg/day adults. Kidney disease patients must limit phosphorus intake as impaired excretion causes hyperphosphataemia and cardiovascular calcification. Supplementation is rarely needed in those eating adequate protein. Sodium phosphate loading (1–2g three hours before time trials) is an ergogenic strategy with evidence for improved VO2 max and time trial performance.' },

  { name: 'Chromium Picolinate', slug: 'chromium-picolinate', category: 'Minerals',
    description: 'Chromium picolinate is the most bioavailable form of the trace mineral chromium. Chromium was historically believed to enhance insulin signalling and blood glucose regulation. The evidence is inconsistent — a 2002 Cochrane review found chromium significantly reduced fasting glucose in type 2 diabetics, but effect sizes were modest and evidence quality was generally poor.',
    primary_use: ['blood glucose support', 'insulin sensitivity', 'carbohydrate metabolism', 'body composition'],
    evidence_rating: 'mixed',
    dose_context: '200–1,000mcg/day chromium picolinate in trials. Picolinate form has significantly better bioavailability than chromium chloride or polynicotinate. A 1997 landmark RCT (Anderson et al., n=180 type 2 diabetics) found 1,000mcg/day significantly reduced HbA1c and fasting glucose. Independent replications have been inconsistent. Tolerable upper limit: not established (no known toxicity at supplement doses).' },

  { name: 'Boron', slug: 'boron', category: 'Minerals',
    description: 'Boron is a trace mineral found in plant foods, particularly fruits and nuts. It appears to modulate hormone metabolism, particularly testosterone and oestrogen, and support bone health by reducing calcium excretion. Marketing testosterone-boosting claims significantly outrun the available evidence. A small clinical trial showed modest testosterone increases from boron supplementation.',
    primary_use: ['testosterone modulation', 'bone health', 'joint health', 'cognitive function', 'oestrogen metabolism'],
    evidence_rating: 'limited',
    dose_context: '3–10mg/day boron citrate or calcium fructoborate. A 2015 review found boron supplementation (3–10mg/day) raised free testosterone by 28% and reduced oestradiol after 7 days in 8 healthy men — a very small, short study. Larger independent RCTs are lacking. Daily dietary intake is approximately 1–3mg; supplemental doses add minimal risk at 3–10mg.' },

  { name: 'Electrolyte Blend', slug: 'electrolyte-blend', category: 'Performance',
    description: 'Electrolyte blends combine sodium, potassium, magnesium, and calcium to support hydration, muscle contraction, and nerve function. Evidence for endurance performance is well-established; evidence for "daily hydration" in sedentary individuals is weak. Sodium is the primary driver of both hydration status and electrolyte losses in sweat.',
    primary_use: ['hydration', 'endurance performance', 'muscle cramp prevention', 'electrolyte replacement', 'hyponatremia prevention'],
    evidence_rating: 'strong',
    dose_context: 'During exercise >60 minutes: sodium 300–1,000mg, potassium 100–200mg, magnesium 20–40mg per serving. LMNT and similar high-sodium electrolyte products are designed for endurance athletes and low-carbohydrate dieters. For sedentary individuals, electrolyte deficiency from sweating is uncommon — plain water typically sufficient.' },
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
  console.log(`Seeding ${INGREDIENTS.length} ingredients (Batch 2)...\n`);
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
