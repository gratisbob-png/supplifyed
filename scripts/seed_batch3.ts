/**
 * Batch 3: Herbal extracts, Longevity, Recovery (~29 ingredients)
 * Run: npx tsx scripts/seed_batch3.ts
 */
import { Surreal, RecordId } from 'surrealdb';

type IngredientSeed = {
  name: string; slug: string; category: string; description: string;
  primary_use: string[]; evidence_rating: 'strong'|'moderate'|'mixed'|'limited';
  dose_context?: string; legal_notes?: string;
};

const INGREDIENTS: IngredientSeed[] = [
  { name: 'Turmeric / Curcumin', slug: 'turmeric-curcumin', category: 'Herbal',
    description: 'Curcumin is the primary polyphenol in turmeric (Curcuma longa) and a potent NF-κB inhibitor and antioxidant. Standard curcumin has poor bioavailability (<1% absorbed) due to rapid metabolism. Bioavailability-enhanced formulations — curcumin with piperine (BioPerine), lecithin-phospholipid complexes (Meriva), or nanoparticle forms — achieve 20–200× higher plasma concentrations.',
    primary_use: ['anti-inflammatory', 'joint pain', 'antioxidant', 'NF-κB inhibition', 'gut health'],
    evidence_rating: 'moderate',
    dose_context: '500–2,000mg curcumin with bioavailability enhancer daily. Meriva (phospholipid-curcumin): 1,000mg/day significantly reduced joint pain in OA trials. Adding 5–20mg piperine increases curcumin bioavailability by 2,000%. Plain turmeric powder (~3% curcumin) and unenhanced curcumin supplements have insufficient bioavailability for systemic effects.' },

  { name: 'Green Tea Extract', slug: 'green-tea-extract', category: 'Herbal',
    description: 'Green tea extract is standardised to epigallocatechin gallate (EGCG), the primary bioactive catechin. EGCG inhibits COMT enzyme, extending norepinephrine activity, and has evidence for fat oxidation, antioxidant activity, and cognitive enhancement. Green tea catechins combined with caffeine produce synergistic thermogenic effects. Hepatotoxicity has been reported at very high doses of isolated EGCG.',
    primary_use: ['fat oxidation', 'antioxidant', 'cognitive function', 'thermogenesis', 'COMT inhibition'],
    evidence_rating: 'moderate',
    dose_context: '400–800mg EGCG/day or 250–500mg standardised green tea extract (50% EGCG). A 2009 meta-analysis of 11 RCTs found green tea catechins significantly reduced body weight and BMI. Hepatotoxicity risk: isolated EGCG supplements >800mg/day have case reports of liver injury — take with food. Avoid in those with liver conditions.',
    legal_notes: 'High-dose isolated EGCG supplements (>800mg/day) have been linked to case reports of hepatotoxicity. Take with food and avoid excessive doses. Individuals with liver conditions should consult a physician.' },

  { name: 'Rhodiola Rosea', slug: 'rhodiola-rosea', category: 'Herbal',
    description: 'Rhodiola rosea is an adaptogenic root with the best-evidenced fatigue-reducing effects among herbal adaptogens. Active compounds — rosavins (Rhodiola-specific) and salidroside — are standardised in clinical extracts. Evidence from European and Russian studies consistently shows reduced mental fatigue, improved stress resilience, and acute exercise capacity benefits at 200–400mg.',
    primary_use: ['fatigue reduction', 'stress resilience', 'cognitive function', 'adaptogen', 'exercise endurance'],
    evidence_rating: 'moderate',
    dose_context: '200–400mg standardised extract (3% rosavins, 1% salidroside) daily. A 2009 meta-analysis of 11 trials found consistent evidence for fatigue reduction and mental performance under stress. Acute dosing (200mg 1–2 hours before performance) may improve cognitive and physical endurance. Lower doses than ashwagandha; SHR-5 extract has the most clinical evidence.' },

  { name: 'Ginseng', slug: 'ginseng', category: 'Herbal',
    description: 'Panax ginseng (Korean/Asian ginseng) contains ginsenosides — triterpenoid saponins that modulate HPA axis activity, immune function, cognitive performance, and erectile function. American ginseng (Panax quinquefolius) has distinct ginsenoside ratios emphasising different effects. Both are distinct from Siberian ginseng (Eleuthero), which contains no ginsenosides.',
    primary_use: ['cognitive function', 'fatigue reduction', 'immune support', 'erectile function', 'adaptogen'],
    evidence_rating: 'moderate',
    dose_context: '200–400mg standardised extract (4–7% ginsenosides) twice daily. A 2013 Cochrane review found Panax ginseng improved cognitive function in healthy adults. For erectile dysfunction: 900mg 3× daily for 8 weeks significantly improved International Index of Erectile Function scores vs placebo in a 2008 RCT. Korean Red Ginseng (steamed Panax) has additional evidence for immune and libido.' },

  { name: 'Maca Root', slug: 'maca-root', category: 'Herbal',
    description: 'Maca (Lepidium meyenii) is a Peruvian cruciferous plant root used traditionally for energy and fertility. Clinical evidence shows consistent benefits for sexual dysfunction (libido and erectile function), modest benefits for energy perception, and no significant effects on testosterone. It operates via mechanisms distinct from androgen pathways.',
    primary_use: ['libido enhancement', 'energy', 'sexual function', 'fertility support', 'hormonal balance'],
    evidence_rating: 'limited',
    dose_context: '1,500–3,000mg/day dried maca root powder or extract. A 2010 systematic review found maca significantly improved sexual desire in 4 of 4 RCTs and reduced menopausal symptoms in 2 of 2 RCTs. Despite marketing, maca does not raise testosterone — its libido effects appear to be hormone-independent. Gelatinised maca is better absorbed than raw powder.' },

  { name: "Lion's Mane Mushroom", slug: 'lions-mane-mushroom', category: 'Herbal',
    description: "Lion's mane (Hericium erinaceus) mushroom contains hericenones and erinacines that stimulate nerve growth factor (NGF) synthesis, promoting neuronal growth and myelin repair. A 2009 Japanese double-blind RCT found lion's mane significantly improved cognitive function in adults with mild cognitive impairment. Evidence for fruiting body extracts is distinct from mycelium-based products.",
    primary_use: ['NGF stimulation', 'cognitive function', 'neuroprotection', 'memory', 'anxiety reduction'],
    evidence_rating: 'moderate',
    dose_context: "500–3,000mg/day of fruiting body extract. The 2009 RCT (Mori et al., n=30, 16 weeks) used 3g/day dried lion's mane and found significant improvements in cognitive function scores that reversed upon cessation. Fruiting body extracts contain beta-glucans and hericenones; mycelium-on-grain products may contain primarily grain starch. Check for active compound verification." },

  { name: 'Reishi Mushroom', slug: 'reishi-mushroom', category: 'Herbal',
    description: 'Reishi (Ganoderma lucidum) is a medicinal mushroom used in East Asian medicine for centuries, termed the "mushroom of immortality." Active compounds include triterpene ganoderic acids and beta-glucan polysaccharides. Evidence is strongest for immune modulation, fatigue reduction in cancer patients, and sleep quality. Standardised extracts (triterpenes 4%, beta-glucans 20%) are required for consistent dosing.',
    primary_use: ['immune modulation', 'sleep quality', 'fatigue reduction', 'anti-inflammatory', 'cancer support research'],
    evidence_rating: 'moderate',
    dose_context: '1,500–9,000mg/day dried mushroom powder or 200–600mg extract. A 2012 systematic review found reishi significantly reduced fatigue and improved quality of life in cancer patients. A 2015 meta-analysis found reishi had a significant immunostimulatory effect. Extract forms are more dose-efficient than raw powder — check standardisation for beta-glucan and triterpene content.' },

  { name: 'Cordyceps', slug: 'cordyceps', category: 'Herbal',
    description: 'Cordyceps (Cordyceps sinensis/militaris) is a parasitic fungus used in Traditional Chinese Medicine for energy and endurance. Active compounds include cordycepin and adenosine, which modulate ATP production. Evidence for aerobic performance is mixed — positive results in older adults and clinical populations are not consistently replicated in trained athletes. CS-4 is the most studied standardised extract.',
    primary_use: ['aerobic endurance', 'ATP production', 'fatigue reduction', 'libido', 'immune support'],
    evidence_rating: 'moderate',
    dose_context: '1,000–3,000mg/day CS-4 extract. A 2010 randomised trial found cordyceps significantly improved VO2 max and time to exhaustion in older adults. Results in trained athletes are less consistent. Natural Cordyceps sinensis is prohibitively expensive; Cordyceps militaris (cultivated) provides cordycepin and is used in modern supplements.' },

  { name: 'Milk Thistle', slug: 'milk-thistle', category: 'Herbal',
    description: 'Milk thistle (Silybum marianum) seed extract is standardised to silymarin (a flavonolignan complex), with the most robust evidence of any hepatoprotective supplement. Silymarin promotes liver cell regeneration, inhibits inflammatory signalling, and has antioxidant activity in hepatocytes. Evidence supports liver protection in alcoholic liver disease, non-alcoholic fatty liver disease (NAFLD), and hepatotoxin exposure.',
    primary_use: ['liver protection', 'hepatoprotective', 'NAFLD support', 'antioxidant in liver cells', 'alcohol liver damage'],
    evidence_rating: 'moderate',
    dose_context: '420–600mg/day silymarin (as 70–80% standardised extract, 2–3 divided doses). A 2005 systematic review of 13 RCTs found silymarin significantly reduced liver enzyme levels (AST, ALT) in liver disease patients. For NAFLD: 210–420mg/day silymarin reduced steatosis scores in RCTs. Well-tolerated; rare GI upset. Silybin phosphatidylcholine complex (Siliphos) has improved bioavailability.' },

  { name: 'Berberine', slug: 'berberine', category: 'Herbal',
    description: 'Berberine is an isoquinoline alkaloid found in goldenseal, barberry, and Oregon grape. It activates AMPK (the "metabolic master switch") — the same pathway targeted by the anti-diabetic drug metformin. Evidence for blood glucose reduction is strong and comparable to metformin in head-to-head trials. Also shows lipid-lowering and gut microbiome-modulating effects.',
    primary_use: ['blood glucose reduction', 'AMPK activation', 'cholesterol reduction', 'gut microbiome', 'insulin sensitivity'],
    evidence_rating: 'strong',
    dose_context: '500mg 2–3× daily (1,000–1,500mg/day total) with meals. A 2008 RCT (Zhang et al., n=116) found berberine 500mg 3× daily reduced HbA1c equivalently to metformin over 3 months. A 2012 meta-analysis found berberine significantly reduced LDL (−0.65mmol/L) and triglycerides. Drug interactions: inhibits CYP3A4 and CYP2D6 — check interactions with prescription medications.' },

  { name: 'Fenugreek', slug: 'fenugreek', category: 'Herbal',
    description: 'Fenugreek (Trigonella foenum-graecum) is a legume with seeds used in Ayurvedic medicine and as a culinary spice. Active compounds include furostanolic saponins and 4-hydroxyisoleucine, which modulate testosterone metabolism and insulin signalling. Evidence supports modest testosterone enhancement and blood glucose effects, plus lactation support (milk production) in nursing mothers.',
    primary_use: ['testosterone support', 'blood glucose management', 'lactation support', 'libido', 'insulin sensitivity'],
    evidence_rating: 'moderate',
    dose_context: '500–600mg standardised extract (50% fenusides/furostanolic saponins) daily. A 2010 double-blind RCT (Bushey et al., n=49) found 500mg/day fenugreek significantly maintained testosterone and strength during caloric restriction. For blood glucose: 10–15g seed powder with meals. Testofen (TF-SEED extract) has the most clinical evidence for testosterone outcomes.' },

  { name: 'Tongkat Ali', slug: 'tongkat-ali', category: 'Herbal',
    description: 'Tongkat ali (Eurycoma longifolia, Long Jack) is a Southeast Asian plant with the most consistent evidence among herbal testosterone boosters. LJ100 is the proprietary 100:1 water extract with the most RCT evidence. Evidence shows modest but statistically significant increases in total and free testosterone, and improvements in sexual function and stress resilience.',
    primary_use: ['testosterone support', 'libido', 'cortisol reduction', 'sexual function', 'muscle mass support'],
    evidence_rating: 'moderate',
    dose_context: '200–400mg LJ100 extract (100:1 standardised) daily. A 2012 pilot study (Tambi et al., n=76 men with late-onset hypogonadism) found 200mg/day LJ100 significantly restored testosterone to normal range in 90% of subjects. A 2013 RCT found significant reductions in cortisol and improvements in testosterone and libido. Well-tolerated at 200–400mg/day.' },

  { name: 'Tribulus Terrestris', slug: 'tribulus-terrestris', category: 'Herbal',
    description: 'Tribulus terrestris is a plant whose fruits are marketed heavily for testosterone enhancement and sexual performance. However, multiple well-controlled RCTs in humans find no significant effect on testosterone levels. The proposed mechanism (raising LH to stimulate testosterone production) is not supported by human clinical data. It is included as an evidence benchmark for marketing vs evidence discrepancy.',
    primary_use: ['marketed for testosterone', 'marketed for libido', 'marketed for athletic performance'],
    evidence_rating: 'limited',
    dose_context: '750–1,500mg/day in most trials. A 2014 systematic review found no RCTs demonstrating testosterone increases in humans from tribulus supplementation. A 2016 RCT in elite rugby players found no effect on testosterone, body composition, or performance vs placebo. Evidence for libido effects is slightly better but inconsistent. This is the platform\'s primary example of marketing-evidence discrepancy.' },

  { name: 'Garlic Extract', slug: 'garlic-extract', category: 'Herbal',
    description: 'Garlic (Allium sativum) contains allicin (produced when garlic is crushed or chopped) and other organosulphur compounds with evidence for cardiovascular, immune, and antimicrobial effects. Aged garlic extract (AGE) and allicin-standardised extracts are the clinical forms. Evidence for blood pressure reduction is consistent across multiple meta-analyses.',
    primary_use: ['blood pressure reduction', 'LDL cholesterol reduction', 'immune support', 'antimicrobial', 'platelet aggregation inhibition'],
    evidence_rating: 'strong',
    dose_context: '600–1,500mg/day aged garlic extract or 400–500mg allicin-standardised extract. A 2012 meta-analysis of 17 trials found garlic significantly reduced systolic (−3.75 mmHg) and diastolic (−3.39 mmHg) blood pressure. A 2016 meta-analysis found garlic reduced total cholesterol by 17mg/dL. Aged garlic extract (Kyolic) has the most clinical evidence and is odour-free.' },

  { name: 'Ginger Root', slug: 'ginger-root', category: 'Herbal',
    description: 'Ginger (Zingiber officinale) rhizome contains gingerols and shogaols that inhibit serotonin (5-HT3) receptors and substance P, providing the strongest herbal evidence for nausea reduction. Cochrane-quality evidence supports ginger for pregnancy-induced nausea, chemotherapy-induced nausea, and post-operative nausea. Anti-inflammatory evidence is secondary.',
    primary_use: ['nausea reduction', 'pregnancy nausea', 'chemotherapy nausea', 'anti-inflammatory', 'digestive support'],
    evidence_rating: 'strong',
    dose_context: '1,000–1,500mg/day divided doses for nausea. A 2014 Cochrane review found ginger significantly reduced pregnancy nausea (5 RCTs). For chemotherapy-induced nausea: 0.5–1g ginger root taken with standard antiemetics significantly reduced nausea severity. Well-tolerated; may increase bleeding time with anticoagulants at high doses. Standardised to 5–8% gingerols for consistency.' },

  { name: 'Cinnamon Extract', slug: 'cinnamon-extract', category: 'Herbal',
    description: 'Ceylon cinnamon (Cinnamomum verum) and cassia cinnamon (Cinnamomum aromaticum) are two distinct species with different evidence profiles and safety considerations. Cassia contains high coumarin (a hepatotoxic compound at high doses); Ceylon has negligible coumarin. Clinical evidence for blood glucose reduction is modest and primarily from cassia at doses below hepatotoxic coumarin levels.',
    primary_use: ['blood glucose support', 'insulin sensitivity', 'anti-inflammatory', 'antioxidant'],
    evidence_rating: 'moderate',
    dose_context: '1–6g Ceylon cinnamon or 500–1,000mg standardised extract daily. A 2013 meta-analysis of 10 RCTs found cinnamon significantly reduced fasting blood glucose (−8.11 mg/dL) and total cholesterol. Ceylon cinnamon is preferred for daily supplementation to avoid coumarin accumulation from cassia. Effect size is modest — adjunctive to, not replacing, diabetes medication.' },

  { name: 'Saw Palmetto', slug: 'saw-palmetto', category: 'Herbal',
    description: 'Saw palmetto (Serenoa repens) berry extract is the most commonly used herbal supplement for benign prostatic hyperplasia (BPH). It is proposed to inhibit 5-alpha-reductase (reducing DHT) and alpha-1-adrenergic receptors in the prostate. Evidence from a 2012 Cochrane review of 32 RCTs found no significant benefit over placebo for urinary flow or symptom scores.',
    primary_use: ['BPH symptom research', '5-alpha-reductase inhibition', 'prostate health', 'hair loss research'],
    evidence_rating: 'mixed',
    dose_context: '160–320mg lipophilic extract (CO2 or hexane extract, 85–95% fatty acids) twice daily. The 2012 Cochrane review (MacDonald & Tacklind, 32 RCTs, n=5,666) found saw palmetto no more effective than placebo for BPH symptoms or urinary flow. Earlier positive trials used the proprietary Permixon extract — subsequent high-quality RCTs including a 2011 JAMA trial (n=369) found no benefit.' },

  { name: 'CoQ10', slug: 'coq10', category: 'Longevity',
    description: 'Coenzyme Q10 (ubiquinone) is an endogenous antioxidant and electron carrier in the mitochondrial electron transport chain. CoQ10 levels decline with age and are depleted by statin drugs (statins inhibit CoQ10 synthesis alongside cholesterol). Evidence supports CoQ10 supplementation for statin-associated myopathy, heart failure, and mitochondrial diseases.',
    primary_use: ['mitochondrial energy production', 'statin-myopathy support', 'heart failure', 'antioxidant', 'blood pressure'],
    evidence_rating: 'moderate',
    dose_context: '100–400mg/day. Ubiquinone is the oxidised form (standard CoQ10); ubiquinol is the reduced active form with higher bioavailability claimed but equivalent clinical evidence. For statin myopathy: 100–200mg/day (evidence for symptom relief is inconsistent). For heart failure: 300mg/day significantly improved outcomes in the Q-SYMBIO trial (n=420). Take with a fat-containing meal.' },

  { name: 'Ubiquinol', slug: 'ubiquinol', category: 'Longevity',
    description: 'Ubiquinol is the reduced (electron-rich, active) form of CoQ10. Proponents argue ubiquinol has superior bioavailability vs ubiquinone — supported by some pharmacokinetic studies showing higher plasma CoQ10. However, the body interconverts ubiquinone and ubiquinol efficiently, and clinical outcomes RCTs comparing the two forms are limited. Ubiquinol is substantially more expensive.',
    primary_use: ['active CoQ10 form', 'mitochondrial support', 'antioxidant', 'heart health', 'bioavailability advantage'],
    evidence_rating: 'moderate',
    dose_context: '100–300mg/day. Pharmacokinetic studies show ubiquinol achieves approximately 2× higher plasma CoQ10 than equivalent ubiquinone doses. For individuals with absorption issues or over 60 (reduced conversion capacity), ubiquinol may be preferred. Q-SYMBIO trial used ubiquinone — direct large RCTs on ubiquinol for clinical outcomes are lacking.' },

  { name: 'NMN', slug: 'nmn', category: 'Longevity',
    description: 'Nicotinamide mononucleotide (NMN) is a direct precursor to NAD+ (nicotinamide adenine dinucleotide), a coenzyme essential for mitochondrial energy production, DNA repair, and sirtuin activation. NAD+ declines with age. NMN bypasses rate-limiting NR conversion steps. Human RCT data is very early — initial trials show NAD+ elevation in blood but clinical benefit in healthy humans requires further investigation.',
    primary_use: ['NAD+ precursor', 'mitochondrial energy', 'sirtuin activation', 'anti-aging research', 'DNA repair support'],
    evidence_rating: 'limited',
    dose_context: '250–1,200mg/day in human trials. A 2021 Japanese RCT (Igarashi et al., n=30 healthy men) found 250mg/day NMN significantly raised blood NMN levels and improved muscle insulin sensitivity. A 2023 trial found NMN significantly reduced biological age markers. Clinical outcomes for longevity are not yet established in long-duration human RCTs. High cost per dose is a practical limitation.' },

  { name: 'Nicotinamide Riboside (NR)', slug: 'nicotinamide-riboside', category: 'Longevity',
    description: 'Nicotinamide riboside (NR) is a form of vitamin B3 and a direct NAD+ precursor that converts to NMN then NAD+ via the salvage pathway. Sold commercially as Tru Niagen. Multiple short-term human RCTs confirm NR raises blood NAD+ levels dose-dependently. Clinical evidence for health outcomes beyond NAD+ elevation in healthy adults is emerging but not yet established.',
    primary_use: ['NAD+ precursor', 'mitochondrial support', 'sirtuin activation', 'anti-aging research', 'cellular energy'],
    evidence_rating: 'limited',
    dose_context: '250–1,000mg/day. A 2018 RCT (Trammell et al., n=12) found single oral doses of NR dose-dependently increased blood NAD+ by up to 2.7-fold. A 2021 systematic review of 9 RCTs found NR consistently elevated NAD+ but clinical benefits (cardiovascular, metabolic, cognitive) were not consistently demonstrated. NMN vs NR: different conversion pathways; no strong evidence for superiority of either.' },

  { name: 'Alpha Lipoic Acid (ALA)', slug: 'alpha-lipoic-acid', category: 'Longevity',
    description: 'Alpha lipoic acid (ALA) is a naturally occurring antioxidant and enzyme cofactor that regenerates other antioxidants (vitamins C, E, glutathione) and chelates metals. Both R-ALA (natural form) and S-ALA (synthetic, in racemic mixtures) are present in supplements; R-ALA is the biologically active form. Evidence is strongest for diabetic neuropathy at pharmacological doses (600–1,800mg/day).',
    primary_use: ['diabetic neuropathy', 'antioxidant regeneration', 'blood glucose support', 'metal chelation', 'mitochondrial function'],
    evidence_rating: 'moderate',
    dose_context: '300–600mg R-ALA or 600–1,800mg racemic ALA/day. For diabetic neuropathy: 600mg intravenous ALA significantly improved neuropathy scores in the ALADIN trial (n=328). For blood glucose: 600mg/day ALA significantly reduced insulin resistance. R-ALA is more potent than S-ALA — racemic mixtures require approximately 2× the dose. Take on an empty stomach for best absorption.' },

  { name: 'Resveratrol', slug: 'resveratrol', category: 'Longevity',
    description: 'Resveratrol is a stilbenoid polyphenol found in red grape skins, red wine, and Japanese knotweed. It activates SIRT1 and other sirtuins (the "longevity enzymes"), modulates AMPK, and extends lifespan in various model organisms. However, oral bioavailability in humans is extremely poor (<1%) due to rapid Phase II metabolism, limiting the clinical translation of preclinical findings.',
    primary_use: ['sirtuin activation', 'AMPK modulation', 'antioxidant', 'cardiovascular health', 'longevity research'],
    evidence_rating: 'limited',
    dose_context: '150–1,000mg/day; some longevity protocols use 1,000–2,000mg. A 2021 meta-analysis of 45 RCTs found resveratrol significantly reduced triglycerides and fasting blood glucose. Bioavailability is the key limitation — pterostilbene achieves ~80% bioavailability vs resveratrol\'s <1%. Liposomal and cyclodextrin formulations improve absorption. No long-term human longevity RCTs.' },

  { name: 'Hyaluronic Acid', slug: 'hyaluronic-acid', category: 'Recovery',
    description: 'Hyaluronic acid (HA) is a glycosaminoglycan found abundantly in joint fluid, cartilage, skin, and connective tissue, where it provides lubrication and water retention. Oral HA supplementation has evidence for knee OA pain reduction and skin hydration improvement. HA is also administered by intra-articular injection (visco-supplementation) for knee OA — a separate, more established application.',
    primary_use: ['joint lubrication', 'skin hydration', 'osteoarthritis pain', 'wound healing', 'eye health'],
    evidence_rating: 'moderate',
    dose_context: '80–200mg/day oral HA for joint and skin outcomes. A 2016 RCT found 80mg/day HA for 12 months significantly reduced knee pain in mild OA. A 2017 systematic review found oral HA significantly improved skin elasticity and wrinkle depth. Low-molecular-weight HA (<50 kDa) is better absorbed orally than high-molecular-weight forms.' },

  { name: 'Glucosamine', slug: 'glucosamine', category: 'Recovery',
    description: 'Glucosamine is an amino sugar and precursor for glycosaminoglycans and proteoglycans in cartilage. It is one of the most purchased joint supplements globally. Evidence from large independent RCTs (GAIT trial, n=1,583) is inconsistent — glucosamine did not significantly outperform placebo overall, though a subgroup with moderate-to-severe pain showed benefit. Sulfate form shows better evidence than HCl.',
    primary_use: ['cartilage support', 'joint pain', 'osteoarthritis', 'glycosaminoglycan synthesis'],
    evidence_rating: 'mixed',
    dose_context: '1,500mg/day glucosamine sulfate. The GAIT trial (Clegg 2006, n=1,583): glucosamine + chondroitin did not outperform placebo in primary analysis but showed benefit in moderate-severe OA subgroup. European EULAR guidelines show more positive evidence from European manufacturer studies. Glucosamine sulfate (crystalline, patented form used in European trials) consistently outperforms glucosamine HCl.' },

  { name: 'Chondroitin', slug: 'chondroitin', category: 'Recovery',
    description: 'Chondroitin sulfate is a glycosaminoglycan component of cartilage extracellular matrix, providing compressive resistance. It is typically combined with glucosamine. Evidence is mixed and product-quality-dependent — a 2015 Cochrane review found high-quality trials show minimal clinically significant benefit, while lower-quality trials showed larger effects, suggesting publication bias.',
    primary_use: ['cartilage support', 'joint pain', 'osteoarthritis', 'joint lubrication'],
    evidence_rating: 'mixed',
    dose_context: '800–1,200mg/day chondroitin sulfate. Typically combined with glucosamine 1,500mg. Bioavailability varies significantly by molecular weight and source (bovine vs marine). A 2017 RCT (n=604) found chondroitin sulfate equivalent to celecoxib (prescription NSAID) for knee OA pain reduction over 6 months — the highest-quality positive result to date.' },

  { name: 'MSM', slug: 'msm', category: 'Recovery',
    description: 'Methylsulfonylmethane (MSM) is an organic sulfur compound found in small amounts in foods and produced commercially from DMSO. It is proposed to provide bioavailable sulfur for collagen and glutathione synthesis. Evidence from RCTs shows consistent but modest reductions in joint pain and inflammation markers with chronic supplementation.',
    primary_use: ['joint pain', 'anti-inflammatory', 'sulfur source', 'collagen support', 'exercise recovery'],
    evidence_rating: 'moderate',
    dose_context: '1,500–6,000mg/day in divided doses. A 2011 RCT (n=49 OA patients) found 3g MSM twice daily significantly reduced pain and physical impairment scores vs placebo over 12 weeks. A 2017 systematic review of 5 RCTs found MSM consistently reduced pain and swelling with good tolerability. Well-tolerated; mild GI effects at high doses. Often combined with glucosamine and chondroitin.' },

  { name: 'CBD Hemp Extract', slug: 'cbd-hemp-extract', category: 'Recovery',
    description: 'Cannabidiol (CBD) is a non-psychoactive phytocannabinoid from Cannabis sativa. FDA-approved Epidiolex (pharmaceutical CBD) treats severe childhood epilepsy (Dravet and Lennox-Gastaut syndromes) with strong evidence. For anxiety, sleep, and pain in adults, RCT evidence is emerging but inconsistent. CBD interacts with the endocannabinoid system via indirect mechanisms rather than CB1/CB2 receptor agonism.',
    primary_use: ['anxiety reduction', 'sleep support', 'pain reduction', 'epilepsy (pharmaceutical)', 'anti-inflammatory'],
    evidence_rating: 'mixed',
    legal_notes: 'Legal status varies by country and jurisdiction. In the UK: CBD is legal as a food supplement (FSA registered products). In the EU: Novel Food authorisation required. In Australia: prescription required for therapeutic use. In the USA: hemp-derived CBD (≤0.3% THC) is federally legal under the 2018 Farm Bill. Athletes: CBD was removed from WADA prohibited list in 2018, but THC remains prohibited.',
    dose_context: '25–300mg/day in human anxiety and sleep trials. A 2019 case series (Shannon et al., n=72) found 25mg/day CBD significantly improved anxiety in 79% and sleep in 67% of participants. Full-spectrum CBD retains minor cannabinoids and terpenes; isolate contains only CBD. Check for third-party certificates of analysis for THC content — important for drug-tested athletes.' },
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
  console.log(`Seeding ${INGREDIENTS.length} ingredients (Batch 3)...\n`);
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
