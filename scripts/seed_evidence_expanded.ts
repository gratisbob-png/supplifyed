/**
 * Seeds evidence nodes for all expanded ingredients.
 * Run: npm run seed:evidence:expanded
 * Requires expanded ingredients seeded first.
 */

import { Surreal, RecordId } from 'surrealdb';

interface EvidenceSeed {
  id: string;
  title: string;
  authors: string;
  year: number;
  journal: string;
  doi?: string;
  link: string;
  funded_by: 'independent' | 'manufacturer' | 'government' | 'unknown';
  finding: string;
  dose_studied: string;
  outcome: string;
  ingredient_id: string;
  relevance: string;
  direction: 'supports' | 'neutral' | 'contradicts';
}

const EVIDENCE: EvidenceSeed[] = [

  // ─── L-THEANINE ─────────────────────────────────────────────────────────────

  {
    id: 'evidence:kimura-2007-theanine-stress',
    title: 'L-Theanine reduces psychological and physiological stress responses',
    authors: 'Kimura K, Ozeki M, Juneja LR, Ohira H',
    year: 2007, journal: 'Biological Psychology',
    doi: '10.1016/j.biopsycho.2006.06.006',
    link: 'https://pubmed.ncbi.nlm.nih.gov/16930802/',
    funded_by: 'manufacturer',
    finding: 'Crossover RCT (n=12). L-Theanine 200mg vs placebo given before an arithmetic stress task. L-Theanine significantly attenuated heart rate and salivary immunoglobulin A (s-IgA) stress responses. Alpha brain wave power was significantly increased. Note: Suntheanine-associated research.',
    dose_studied: '200mg L-Theanine oral dose before stressor',
    outcome: 'L-Theanine reduced physiological stress markers and increased alpha wave activity — supports calming mechanism without sedation',
    ingredient_id: 'ingredient:l-theanine', relevance: 'Primary mechanistic RCT for stress reduction and alpha wave increase', direction: 'supports',
  },
  {
    id: 'evidence:owen-2008-theanine-caffeine-cognition',
    title: 'The combined effects of L-theanine and caffeine on cognitive performance and mood',
    authors: 'Owen GN, Parnell H, De Bruin EA, Rycroft JA',
    year: 2008, journal: 'Nutritional Neuroscience',
    doi: '10.1179/147683008X301513',
    link: 'https://pubmed.ncbi.nlm.nih.gov/18681988/',
    funded_by: 'manufacturer',
    finding: 'Crossover RCT (n=24). L-Theanine 100mg + caffeine 50mg vs each alone and placebo on cognitive test battery. The combination significantly improved speed and accuracy of attention switching and reduced susceptibility to distraction vs caffeine alone. L-Theanine attenuated caffeine-induced increases in jitteriness.',
    dose_studied: '100mg L-Theanine + 50mg caffeine combination',
    outcome: 'L-Theanine + caffeine combination improves attention switching and reduces caffeine-associated jitteriness vs caffeine alone',
    ingredient_id: 'ingredient:l-theanine', relevance: 'Evidence for L-Theanine + caffeine synergy — the most common combined application', direction: 'supports',
  },

  // ─── 5-HTP ──────────────────────────────────────────────────────────────────

  {
    id: 'evidence:turner-2006-5htp-serotonin-review',
    title: 'Serotonin a la carte: supplementation with the serotonin precursor 5-hydroxytryptophan',
    authors: 'Turner EH, Loftis JM, Blackwell AD',
    year: 2006, journal: 'Pharmacology and Therapeutics',
    doi: '10.1016/j.pharmthera.2005.06.004',
    link: 'https://pubmed.ncbi.nlm.nih.gov/16023217/',
    funded_by: 'government',
    finding: 'Comprehensive review of 5-HTP pharmacology and clinical evidence. 5-HTP crosses the blood-brain barrier and increases central serotonin synthesis. Clinical trials show efficacy in depression, fibromyalgia, obesity (appetite regulation), and anxiety. Most trials are small with methodological limitations. Serotonin syndrome risk when combined with serotonergic medications is the primary safety concern.',
    dose_studied: '50–300mg/day across reviewed trials',
    outcome: 'Evidence supports 5-HTP for depression, fibromyalgia, and appetite suppression; small trials only — quality evidence is limited',
    ingredient_id: 'ingredient:5-htp', relevance: 'Comprehensive independently-funded review of 5-HTP evidence and mechanism', direction: 'supports',
  },
  {
    id: 'evidence:cangiano-1992-5htp-appetite',
    title: 'Eating behavior and adherence to dietary prescriptions in obese adult subjects treated with 5-hydroxytryptophan',
    authors: 'Cangiano C, Ceci F, Cascino A, et al.',
    year: 1992, journal: 'American Journal of Clinical Nutrition',
    doi: '10.1093/ajcn/56.5.863',
    link: 'https://pubmed.ncbi.nlm.nih.gov/1384305/',
    funded_by: 'government',
    finding: 'Double-blind RCT (n=20 obese subjects). 5-HTP 750mg/day vs placebo with caloric restriction for 6 weeks. 5-HTP group consumed significantly fewer calories, increased satiety, reduced carbohydrate and fat intake, and lost more weight (mean −4.2kg vs −1.8kg placebo). Effects attributed to serotonin-mediated satiety signalling.',
    dose_studied: '750mg/day 5-HTP for 6 weeks',
    outcome: 'Significant caloric intake reduction and greater weight loss vs placebo — evidence for serotonin-mediated appetite suppression',
    ingredient_id: 'ingredient:5-htp', relevance: 'RCT evidence for 5-HTP appetite regulation and weight management', direction: 'supports',
  },

  // ─── L-TRYPTOPHAN ───────────────────────────────────────────────────────────

  {
    id: 'evidence:silber-2010-tryptophan-sleep-meta',
    title: 'The subjective effects of L-tryptophan and 5-hydroxytryptophan on wakefulness and sleep',
    authors: 'Silber BY, Schmitt JA',
    year: 2010, journal: 'Sleep Medicine Reviews',
    doi: '10.1016/j.smrv.2009.01.005',
    link: 'https://pubmed.ncbi.nlm.nih.gov/19349193/',
    funded_by: 'independent',
    finding: 'Review of 14 clinical studies examining L-Tryptophan effects on sleep. At doses of 1g/day, L-Tryptophan significantly reduced sleep onset latency in most studies. Effects are stronger in individuals with mild sleep difficulties. 5-HTP showed greater effect per mg due to bypassing the rate-limiting tryptophan hydroxylase step. Competitive transport across the blood-brain barrier with other large neutral amino acids is the primary pharmacokinetic challenge.',
    dose_studied: '1–5g/day L-Tryptophan across reviewed studies',
    outcome: 'L-Tryptophan reduces sleep onset latency, particularly at 1g/day; effect is LNAA competition-dependent',
    ingredient_id: 'ingredient:l-tryptophan', relevance: 'Sleep evidence review — establishes effective dose and mechanism context', direction: 'supports',
  },

  // ─── VALERIAN ROOT ──────────────────────────────────────────────────────────

  {
    id: 'evidence:bent-2006-valerian-meta',
    title: 'Valerian for sleep: a systematic review and meta-analysis',
    authors: 'Bent S, Padula A, Moore D, Patterson M, Mehling W',
    year: 2006, journal: 'American Journal of Medicine',
    doi: '10.1016/j.amjmed.2006.02.026',
    link: 'https://pubmed.ncbi.nlm.nih.gov/17145239/',
    funded_by: 'independent',
    finding: 'Systematic review and meta-analysis of 16 RCTs. Valerian may improve sleep quality without producing side effects. Majority of studies used 300–600mg standardised extract. Results were heterogeneous: subjective sleep improvement more consistently reported than objective measurement. Study quality was generally low. Binary outcome (improved vs not improved) significantly favoured valerian vs placebo (OR 1.8).',
    dose_studied: '300–600mg standardised valerian extract before sleep',
    outcome: 'Valerian showed subjective sleep improvement vs placebo — evidence is positive but heterogeneous and study quality variable',
    ingredient_id: 'ingredient:valerian-root', relevance: 'Primary systematic review and meta-analysis for valerian sleep evidence', direction: 'supports',
  },

  // ─── BACOPA MONNIERI ────────────────────────────────────────────────────────

  {
    id: 'evidence:stough-2001-bacopa-memory',
    title: 'The chronic effects of an extract of Bacopa monniera (Brahmi) on cognitive function in healthy human subjects',
    authors: 'Stough C, Lloyd J, Clarke J, et al.',
    year: 2001, journal: 'Psychopharmacology',
    doi: '10.1007/s002130100803',
    link: 'https://pubmed.ncbi.nlm.nih.gov/11498727/',
    funded_by: 'manufacturer',
    finding: 'Double-blind RCT (n=46 healthy volunteers). 300mg standardised Bacopa monnieri extract (Keen Mind) or placebo for 12 weeks. Bacopa significantly improved Rey Auditory Verbal Learning Test (AVLT) delayed recall at 12 weeks. Tests of visual information processing speed and spatial working memory also improved. No improvement in anxiety or depression.',
    dose_studied: '300mg standardised bacopa extract for 12 weeks',
    outcome: 'Significant improvement in delayed verbal recall and information processing at 12 weeks — effect requires chronic dosing',
    ingredient_id: 'ingredient:bacopa-monnieri', relevance: 'First major RCT in healthy adults establishing 12-week requirement for bacopa memory effects', direction: 'supports',
  },
  {
    id: 'evidence:kongkeaw-2014-bacopa-meta',
    title: 'Meta-analysis of randomized controlled trials on cognitive effects of Bacopa monnieri extract',
    authors: 'Kongkeaw C, Dilokthornsakul P, Thanarangsarit P, Limpeanchob N, Scholfield CN',
    year: 2014, journal: 'Journal of Ethnopharmacology',
    doi: '10.1016/j.jep.2013.11.008',
    link: 'https://pubmed.ncbi.nlm.nih.gov/24252493/',
    funded_by: 'independent',
    finding: 'Meta-analysis of 9 RCTs (n=518 healthy individuals). Bacopa monnieri extract significantly improved memory recall (standardised mean difference 0.25, 95% CI 0.12–0.38, p<0.001). Effects were consistent across studies. Cognitive processing, attention, and executive function also improved. Time to effect: minimum 12 weeks consistent supplementation in all positive trials.',
    dose_studied: '300–450mg/day standardised extract (55% bacosides) for ≥12 weeks',
    outcome: 'Significant improvement in memory recall across 9 RCTs — meta-analysis from independent research group confirms bacopa cognitive benefits',
    ingredient_id: 'ingredient:bacopa-monnieri', relevance: 'Independent meta-analysis confirming cognitive benefits — key evidence for bacopa nootropic claims', direction: 'supports',
  },

  // ─── ALPHA-GPC ──────────────────────────────────────────────────────────────

  {
    id: 'evidence:moreno-2003-alphagpc-alzheimers',
    title: 'Cognitive improvement in mild to moderate Alzheimer\'s dementia after treatment with the acetylcholine precursor choline alfoscerate',
    authors: 'De Jesus Moreno Moreno M',
    year: 2003, journal: 'Clinical Therapeutics',
    doi: '10.1016/s0149-2918(03)90023-3',
    link: 'https://pubmed.ncbi.nlm.nih.gov/12860303/',
    funded_by: 'manufacturer',
    finding: 'Multicenter, double-blind, placebo-controlled RCT (n=261 Alzheimer\'s patients). Alpha-GPC 400mg three times daily (1,200mg/day) for 180 days significantly improved cognitive function on ADAS-Cog, MMSE, and GDS scales versus placebo. Well-tolerated with adverse events comparable to placebo.',
    dose_studied: '400mg Alpha-GPC three times daily (1,200mg/day) for 180 days',
    outcome: 'Significant cognitive improvement on multiple validated scales in Alzheimer\'s — the key pharmaceutical-level evidence for Alpha-GPC',
    ingredient_id: 'ingredient:alpha-gpc', relevance: 'Largest RCT for Alpha-GPC cognitive effects — pharmaceutical trial in Alzheimer\'s population', direction: 'supports',
  },
  {
    id: 'evidence:bellar-2012-alphagpc-power',
    title: 'The effect of 6 days of alpha glycerylphosphorylcholine on isometric strength',
    authors: 'Bellar D, LeBlanc NR, Campbell B',
    year: 2015, journal: 'Journal of the International Society of Sports Nutrition',
    doi: '10.1186/s12970-015-0066-y',
    link: 'https://pubmed.ncbi.nlm.nih.gov/26582972/',
    funded_by: 'manufacturer',
    finding: 'Double-blind crossover RCT (n=13 healthy male volunteers). 600mg Alpha-GPC 90 minutes pre-exercise significantly increased peak isometric mid-thigh pull force compared to placebo. Upper body endurance and growth hormone responses also trending positive. Note: manufacturer (AlphaSize) associated trial.',
    dose_studied: '600mg Alpha-GPC 90 minutes before exercise',
    outcome: 'Significant increase in peak isometric force output vs placebo — evidence for Alpha-GPC acute athletic performance benefit',
    ingredient_id: 'ingredient:alpha-gpc', relevance: 'Evidence for Alpha-GPC acute power output benefit in athletes — manufacturer-associated', direction: 'supports',
  },

  // ─── CDP-CHOLINE ────────────────────────────────────────────────────────────

  {
    id: 'evidence:fioravanti-2006-citicoline-review',
    title: 'Citicoline (Cognizin) in the treatment of cognitive impairment',
    authors: 'Fioravanti M, Buckley AE',
    year: 2006, journal: 'Clinical Interventions in Aging',
    doi: '10.2147/ciia.2006.1.3.247',
    link: 'https://pubmed.ncbi.nlm.nih.gov/18046878/',
    funded_by: 'independent',
    finding: 'Systematic review of 14 clinical trials of citicoline. Consistent evidence for improvement in memory and behaviour in cognitive impairment and vascular dementia. Effect sizes were modest to moderate. Most studies used 500–1,000mg/day for 4–12 weeks. Adverse events minimal and comparable to placebo across all included studies.',
    dose_studied: '500–1,000mg/day citicoline across reviewed trials',
    outcome: 'Consistent evidence for cognitive improvement in impaired populations — supports citicoline as a choline-delivery compound with CNS evidence',
    ingredient_id: 'ingredient:cdp-choline', relevance: 'Independent systematic review confirming citicoline cognitive efficacy across 14 trials', direction: 'supports',
  },

  // ─── PHOSPHATIDYLSERINE ─────────────────────────────────────────────────────

  {
    id: 'evidence:kato-kataoka-2010-ps-memory',
    title: 'Soybean-derived phosphatidylserine improves memory function of the elderly Japanese subjects with memory complaints',
    authors: 'Kato-Kataoka A, Sakai M, Ebina R, Nonaka C, Asano T, Miyamori T',
    year: 2010, journal: 'Journal of Clinical Biochemistry and Nutrition',
    doi: '10.3164/jcbn.10-62',
    link: 'https://pubmed.ncbi.nlm.nih.gov/21103034/',
    funded_by: 'manufacturer',
    finding: 'Double-blind RCT (n=78 older adults with memory complaints). 100mg/day soy-derived phosphatidylserine for 6 months significantly improved composite memory scores, delayed verbal recall, and word recall capacity vs placebo. PS levels in erythrocyte membranes increased, confirming absorption. Well-tolerated.',
    dose_studied: '100mg/day soy-derived phosphatidylserine for 6 months',
    outcome: 'Significant memory improvement in cognitively declining older adults — soy PS evidence comparable to earlier bovine PS data',
    ingredient_id: 'ingredient:phosphatidylserine', relevance: 'Key RCT demonstrating soy-derived PS (current standard form) improves memory in elderly', direction: 'supports',
  },

  // ─── HUPERZINE A ────────────────────────────────────────────────────────────

  {
    id: 'evidence:li-2008-huperzine-cochrane',
    title: 'Huperzine A for Alzheimer\'s disease',
    authors: 'Li J, Wu HM, Zhou RL, Liu GJ, Dong BR',
    year: 2008, journal: 'Cochrane Database of Systematic Reviews',
    doi: '10.1002/14651858.CD005592.pub2',
    link: 'https://pubmed.ncbi.nlm.nih.gov/18253993/',
    funded_by: 'government',
    finding: 'Cochrane systematic review of 6 RCTs of huperzine A for Alzheimer\'s disease. Huperzine A significantly improved cognitive function (MMSE), global clinical status, and activities of daily living versus placebo in all included trials. All trials were conducted in China; quality was moderate. No serious adverse events reported at doses used.',
    dose_studied: '100–400mcg/day huperzine A in Chinese trials',
    outcome: 'Consistent evidence for cognitive and functional improvements in Alzheimer\'s — government-commissioned Cochrane review with positive findings',
    ingredient_id: 'ingredient:huperzine-a', relevance: 'Cochrane review confirming huperzine A cognition evidence — the highest evidence synthesis level', direction: 'supports',
  },

  // ─── GINKGO BILOBA ──────────────────────────────────────────────────────────

  {
    id: 'evidence:dekosky-2008-ginkgo-gems',
    title: 'Ginkgo biloba for prevention of dementia: a randomized controlled trial',
    authors: 'DeKosky ST, Williamson JD, Fitzpatrick AL, et al. (GEMS Study)',
    year: 2008, journal: 'JAMA',
    doi: '10.1001/jama.300.19.2253',
    link: 'https://pubmed.ncbi.nlm.nih.gov/19017911/',
    funded_by: 'government',
    finding: 'Randomised double-blind trial (n=3,069, mean 6.1 years). 120mg EGb 761 twice daily vs placebo in adults ≥75 years. Ginkgo did not reduce the incidence of dementia or Alzheimer\'s disease compared to placebo (HR 1.12, p=0.41). No difference in cognitive decline rates. The largest and longest ginkgo trial, government-funded.',
    dose_studied: '240mg/day EGb 761 standardised extract for mean 6.1 years',
    outcome: 'No reduction in dementia incidence in the largest, longest RCT to date — contradicts earlier smaller positive trials',
    ingredient_id: 'ingredient:ginkgo-biloba', relevance: 'The definitive large RCT — government-funded GEMS study showing no dementia prevention benefit', direction: 'neutral',
  },
  {
    id: 'evidence:scholey-2002-ginkgo-acute-cognition',
    title: 'Acute, dose-dependent cognitive effects of Ginkgo biloba, Panax ginseng and their combination in healthy young volunteers',
    authors: 'Scholey AB, Kennedy DO',
    year: 2002, journal: 'Psychopharmacology',
    doi: '10.1007/s00213-002-1071-2',
    link: 'https://pubmed.ncbi.nlm.nih.gov/12373421/',
    funded_by: 'manufacturer',
    finding: 'Crossover RCT in healthy volunteers. Ginkgo (360mg) significantly improved numeric working memory and spatial working memory 6 hours post-dose. Combined ginkgo + ginseng showed additional benefits on specific tasks. Acute effects at this dose are consistent with improved cerebral blood flow. Manufacturer-associated funding.',
    dose_studied: '360mg EGb 761 acute dose',
    outcome: 'Acute cognitive improvements in healthy adults at 360mg — working memory benefits — manufacturer-funded',
    ingredient_id: 'ingredient:ginkgo-biloba', relevance: 'Evidence for acute cognitive effects in healthy adults — provides context for ginkgo use beyond dementia prevention', direction: 'supports',
  },

  // ─── PQQ ────────────────────────────────────────────────────────────────────

  {
    id: 'evidence:harris-2013-pqq-mitochondria',
    title: 'Dietary pyrroloquinoline quinone (PQQ) alters indicators of inflammation, oxidative stress, and mitochondrial-related metabolism in human subjects',
    authors: 'Harris CB, Chowanadisai W, Mishchuk DO, Satre MA, Slupsky CM, Rucker RB',
    year: 2013, journal: 'Journal of Nutritional Biochemistry',
    doi: '10.1016/j.jnutbio.2012.12.009',
    link: 'https://pubmed.ncbi.nlm.nih.gov/23684437/',
    funded_by: 'government',
    finding: 'Crossover RCT (n=10 healthy adults). 20mg/day PQQ for 12 weeks significantly decreased inflammatory markers (CRP, IL-6) and urinary metabolites related to mitochondrial activity and oxidative stress vs placebo. Plasma antioxidant capacity increased. Government-funded via USDA.',
    dose_studied: '20mg/day PQQ for 12 weeks',
    outcome: 'PQQ at 20mg/day reduced inflammatory markers and altered mitochondrial metabolism markers — government-funded pilot evidence',
    ingredient_id: 'ingredient:pqq', relevance: 'Only published human RCT for PQQ — government-funded, provides mechanistic confirmation in humans', direction: 'supports',
  },

  // ─── NAC ────────────────────────────────────────────────────────────────────

  {
    id: 'evidence:millea-2009-nac-clinical-applications',
    title: 'N-acetylcysteine: multiple clinical applications',
    authors: 'Millea PJ',
    year: 2009, journal: 'American Family Physician',
    link: 'https://pubmed.ncbi.nlm.nih.gov/19725487/',
    funded_by: 'independent',
    finding: 'Clinical review of NAC evidence across multiple applications. Strongest evidence: paracetamol overdose antidote (IV acetylcysteine is standard-of-care with >95% efficacy). Moderate evidence: COPD symptom reduction (600mg twice daily reduces exacerbations), idiopathic pulmonary fibrosis (delay of decline). Emerging evidence: OCD (2,400–3,000mg/day), addictive behaviours, psychiatric conditions. Mechanism: glutathione replenishment and direct antioxidant effects.',
    dose_studied: '600mg twice daily for COPD; 2,400–3,000mg/day for OCD trials',
    outcome: 'Strong evidence for paracetamol antidote; moderate evidence for COPD; emerging evidence across psychiatric and metabolic applications',
    ingredient_id: 'ingredient:nac', relevance: 'Comprehensive independent review of NAC clinical evidence across applications', direction: 'supports',
  },
  {
    id: 'evidence:decramer-2005-nac-copd',
    title: 'Effects of N-acetylcysteine on outcomes in chronic obstructive pulmonary disease',
    authors: 'Decramer M, Rutten-van Mölken M, Dekhuijzen PN, et al.',
    year: 2005, journal: 'The Lancet',
    doi: '10.1016/S0140-6736(05)61027-6',
    link: 'https://pubmed.ncbi.nlm.nih.gov/16198768/',
    funded_by: 'manufacturer',
    finding: 'Double-blind RCT (n=523 COPD patients, BRONCUS trial). 600mg/day NAC for 3 years vs placebo. No significant reduction in rate of exacerbations in the overall group. Pre-specified subgroup of patients not taking inhaled corticosteroids showed significant benefit (exacerbation reduction). Note: trial funded in part by Zambon Group (NAC manufacturer).',
    dose_studied: '600mg/day NAC for 3 years',
    outcome: 'No overall benefit in the primary endpoint; subgroup benefit in COPD patients not on inhaled steroids. Manufacturer-funded.',
    ingredient_id: 'ingredient:nac', relevance: 'Largest COPD trial for NAC — mixed results, important for contextualising the evidence', direction: 'neutral',
  },

  // ─── QUERCETIN ──────────────────────────────────────────────────────────────

  {
    id: 'evidence:serban-2016-quercetin-bp-meta',
    title: 'A systematic review and meta-analysis of the effect of quercetin on blood pressure',
    authors: 'Serban MC, Sahebkar A, Zanchetti A, et al.',
    year: 2016, journal: 'Journal of the American Heart Association',
    doi: '10.1161/JAHA.115.002713',
    link: 'https://pubmed.ncbi.nlm.nih.gov/27405877/',
    funded_by: 'independent',
    finding: 'Meta-analysis of 7 RCTs (n=587). Quercetin supplementation significantly reduced blood pressure (systolic: −3.04 mmHg, 95% CI −5.75 to −0.33; diastolic: −2.63 mmHg, 95% CI −3.61 to −1.65). Effects were more pronounced at doses ≥500mg/day and in studies ≥8 weeks. No significant effects on cholesterol or glucose.',
    dose_studied: '500–1,000mg/day quercetin across included trials',
    outcome: 'Significant reduction in systolic and diastolic blood pressure at ≥500mg/day — independent meta-analysis of 7 RCTs',
    ingredient_id: 'ingredient:quercetin', relevance: 'Best available evidence synthesis for quercetin cardiovascular effects — independently funded', direction: 'supports',
  },

  // ─── ASTAXANTHIN ────────────────────────────────────────────────────────────

  {
    id: 'evidence:iwamoto-2000-astaxanthin-exercise',
    title: 'Inhibition of low-density lipoprotein oxidation by astaxanthin',
    authors: 'Iwamoto T, Hosoda K, Hirano R, et al.',
    year: 2000, journal: 'Journal of Atherosclerosis and Thrombosis',
    doi: '10.5551/jat1994.7.216',
    link: 'https://pubmed.ncbi.nlm.nih.gov/11425994/',
    funded_by: 'manufacturer',
    finding: 'Human trial examining astaxanthin\'s antioxidant effects on LDL oxidation. 6mg/day astaxanthin for 14 days significantly reduced LDL oxidation markers. Plasma astaxanthin concentrations reached steady state within 4 days. Significant antioxidant effects at 6mg/day — establishing dose relevance for human supplementation.',
    dose_studied: '6mg/day astaxanthin for 14 days',
    outcome: 'Significant reduction in LDL oxidation markers at 6mg/day — supports antioxidant activity at supplement doses',
    ingredient_id: 'ingredient:astaxanthin', relevance: 'Early human dose-finding study establishing 6mg/day as effective antioxidant dose', direction: 'supports',
  },
  {
    id: 'evidence:tominaga-2012-astaxanthin-skin',
    title: 'Cosmetic benefits of astaxanthin on humans subjects',
    authors: 'Tominaga K, Hongo N, Karato M, Yamashita E',
    year: 2012, journal: 'Acta Biochimica Polonica',
    link: 'https://pubmed.ncbi.nlm.nih.gov/22428137/',
    funded_by: 'manufacturer',
    finding: 'Double-blind RCT (n=65 middle-aged women). 6mg/day astaxanthin for 8 weeks significantly improved skin wrinkle depth, age spot size, skin texture, moisture content, and elasticity vs placebo. Topical + oral combination showed greater effects than oral alone.',
    dose_studied: '6mg/day oral astaxanthin for 8 weeks',
    outcome: 'Significant skin improvements (elasticity, moisture, wrinkle reduction) at 6mg/day — manufacturer-associated RCT',
    ingredient_id: 'ingredient:astaxanthin', relevance: 'RCT evidence for astaxanthin skin benefits — manufacturer-funded but well-designed', direction: 'supports',
  },

  // ─── LUTEIN ─────────────────────────────────────────────────────────────────

  {
    id: 'evidence:areds2-2013-lutein-zeaxanthin-amd',
    title: 'Lutein + zeaxanthin and omega-3 fatty acids for age-related macular degeneration: The Age-Related Eye Disease Study 2 (AREDS2)',
    authors: 'Age-Related Eye Disease Study 2 Research Group',
    year: 2013, journal: 'JAMA',
    doi: '10.1001/jama.2013.4997',
    link: 'https://pubmed.ncbi.nlm.nih.gov/23644932/',
    funded_by: 'government',
    finding: 'RCT (n=4,203, median 5 years follow-up). Adding lutein 10mg + zeaxanthin 2mg to the AREDS formula reduced risk of progression to advanced AMD (HR 0.90, 95% CI 0.82–0.99, p=0.04). In participants with low dietary lutein/zeaxanthin intake, the benefit was stronger (26% risk reduction). Government-funded (NIH National Eye Institute).',
    dose_studied: '10mg lutein + 2mg zeaxanthin daily',
    outcome: 'Significant reduction in AMD progression — government-funded trial, the definitive evidence for lutein/zeaxanthin in eye health',
    ingredient_id: 'ingredient:lutein', relevance: 'AREDS2 — the gold standard RCT establishing lutein efficacy for AMD, government-funded', direction: 'supports',
  },

  // ─── ZEAXANTHIN ─────────────────────────────────────────────────────────────

  {
    id: 'evidence:areds2-2013-zeaxanthin-amd',
    title: 'Lutein + zeaxanthin and omega-3 fatty acids for age-related macular degeneration: The Age-Related Eye Disease Study 2 (AREDS2)',
    authors: 'Age-Related Eye Disease Study 2 Research Group',
    year: 2013, journal: 'JAMA',
    doi: '10.1001/jama.2013.4997',
    link: 'https://pubmed.ncbi.nlm.nih.gov/23644932/',
    funded_by: 'government',
    finding: 'AREDS2 RCT (n=4,203). Zeaxanthin 2mg combined with lutein 10mg in the AREDS supplement formula significantly reduced AMD progression risk. Zeaxanthin concentrates preferentially in the foveal region of the macula, the area of highest visual acuity, complementing lutein\'s peripheral macular distribution.',
    dose_studied: '2mg zeaxanthin + 10mg lutein daily for median 5 years',
    outcome: 'Significant AMD progression reduction — combined with lutein in the definitive AREDS2 trial',
    ingredient_id: 'ingredient:zeaxanthin', relevance: 'AREDS2 evidence — zeaxanthin component of the definitive AMD prevention study', direction: 'supports',
  },

  // ─── ELDERBERRY ─────────────────────────────────────────────────────────────

  {
    id: 'evidence:zakay-rones-2004-elderberry-influenza',
    title: 'Randomized study of the efficacy and safety of oral elderberry extract in the treatment of influenza A and B virus infections',
    authors: 'Zakay-Rones Z, Thom E, Wollan T, Wadstein J',
    year: 2004, journal: 'Journal of International Medical Research',
    doi: '10.1177/147323000403200205',
    link: 'https://pubmed.ncbi.nlm.nih.gov/15080016/',
    funded_by: 'manufacturer',
    finding: 'Double-blind RCT (n=60 patients with influenza in Norway). 15ml Sambucol elderberry extract 4× daily for 5 days vs placebo. Elderberry group had significantly shorter disease duration (mean 3.1 days vs 7.1 days for placebo) and required less rescue medication. Antibody titres increased significantly more in the elderberry group. Well-tolerated. Note: Sambucol manufacturer associated.',
    dose_studied: '15ml Sambucol elderberry extract 4× daily (60ml/day) for 5 days',
    outcome: 'Influenza duration reduced from 7 to 3 days vs placebo — significant clinical benefit in laboratory-confirmed influenza',
    ingredient_id: 'ingredient:elderberry', relevance: 'Primary RCT for elderberry influenza evidence — significant duration reduction', direction: 'supports',
  },
  {
    id: 'evidence:tiralongo-2016-elderberry-cold-travel',
    title: 'Elderberry Supplementation Reduces Cold Duration and Symptoms in Air-Travellers',
    authors: 'Tiralongo E, Wee SS, Lea RA',
    year: 2016, journal: 'Nutrients',
    doi: '10.3390/nu8040182',
    link: 'https://pubmed.ncbi.nlm.nih.gov/27023596/',
    funded_by: 'independent',
    finding: 'Double-blind RCT (n=312 air travellers). 300mg elderberry extract before and after long-haul travel vs placebo. Elderberry significantly reduced cold duration by 2 days and severity scores by 50% compared to placebo. The effect was particularly notable for colds beginning during or immediately after travel.',
    dose_studied: '300mg elderberry extract 3× daily before and during long-haul travel',
    outcome: 'Cold duration reduced by 2 days and severity by 50% in air travellers — independently funded trial',
    ingredient_id: 'ingredient:elderberry', relevance: 'Independent RCT in travellers — real-world evidence for elderberry cold duration reduction', direction: 'supports',
  },

  // ─── ECHINACEA ──────────────────────────────────────────────────────────────

  {
    id: 'evidence:shah-2007-echinacea-meta',
    title: 'Evaluation of echinacea for the prevention and treatment of the common cold: a meta-analysis',
    authors: 'Shah SA, Sander S, White CM, Rinaldi M, Coleman CI',
    year: 2007, journal: 'Lancet Infectious Diseases',
    doi: '10.1016/S1473-3099(07)70160-3',
    link: 'https://pubmed.ncbi.nlm.nih.gov/17597571/',
    funded_by: 'independent',
    finding: 'Meta-analysis of 14 unique studies (22 randomised trials). Overall: echinacea reduced cold incidence by 58% (OR 0.42) and duration by 1.4 days vs placebo. Effect varied by preparation: E. purpurea above-ground parts showed most consistent benefit. Heterogeneity was high across studies. The preparation type and part of plant used significantly affected outcomes.',
    dose_studied: '400–900mg standardised echinacea extract across included trials',
    outcome: 'Echinacea reduces cold incidence (58%) and duration (1.4 days) — but effect is highly preparation-dependent',
    ingredient_id: 'ingredient:echinacea', relevance: 'Meta-analysis establishing modest cold prevention/treatment evidence — effect is preparation-specific', direction: 'supports',
  },

  // ─── BETA-GLUCAN ────────────────────────────────────────────────────────────

  {
    id: 'evidence:murphy-2010-betaglucan-immune',
    title: 'Immune modulating effects of beta-glucan',
    authors: 'Murphy EA, Davis JM, Carmichael MD',
    year: 2010, journal: 'Current Opinion in Clinical Nutrition and Metabolic Care',
    doi: '10.1097/MCO.0b013e32833ec5b9',
    link: 'https://pubmed.ncbi.nlm.nih.gov/20827163/',
    funded_by: 'government',
    finding: 'Review of beta-glucan immunomodulatory mechanisms and clinical evidence. Beta-1,3/1,6-glucan (yeast-derived) activates innate immunity via Dectin-1 receptor on macrophages and dendritic cells, enhancing pathogen recognition and killing capacity. Clinical trials in athletes show 250mg/day reduces upper respiratory infection incidence. FDA health claims for cholesterol confirmed for oat/barley beta-glucan at 3g/day.',
    dose_studied: '250mg/day yeast beta-glucan (immune); 3g/day oat beta-glucan (cholesterol)',
    outcome: 'Beta-glucan reduces URTI incidence in athletes and reduces LDL cholesterol — government-funded review confirms mechanism and evidence',
    ingredient_id: 'ingredient:beta-glucan', relevance: 'Government-funded review confirming immune mechanism and evidence for two distinct applications', direction: 'supports',
  },

  // ─── ANDROGRAPHIS ───────────────────────────────────────────────────────────

  {
    id: 'evidence:poolsup-2004-andrographis-urti',
    title: 'Andrographis paniculata in the symptomatic treatment of uncomplicated upper respiratory tract infection: systematic review of randomized controlled trials',
    authors: 'Poolsup N, Suthisisang C, Prathanturarug S, Asawamekin A, Chanchareon U',
    year: 2004, journal: 'Journal of Clinical Pharmacy and Therapeutics',
    doi: '10.1111/j.1365-2710.2004.00534.x',
    link: 'https://pubmed.ncbi.nlm.nih.gov/14748896/',
    funded_by: 'independent',
    finding: 'Systematic review of 7 RCTs (Andrographis paniculata vs placebo or active comparators for URTI). All 7 trials showed significant improvement in overall symptom scores. Throat pain, sore throat, and nasal secretion reduced significantly. Andrographolide standardised extracts (Kan Jang) showed the most consistent results. Well-tolerated with minor GI side effects.',
    dose_studied: '400–1,200mg/day standardised andrographolide extract in included trials',
    outcome: 'Consistent significant symptom improvement across all 7 URTI trials — one of the more robust herbal URTI evidence bases',
    ingredient_id: 'ingredient:andrographis', relevance: 'Systematic review of 7 positive RCTs — strongest summary evidence for andrographis URTI treatment', direction: 'supports',
  },

  // ─── BOSWELLIA ──────────────────────────────────────────────────────────────

  {
    id: 'evidence:sontakke-2007-boswellia-oa',
    title: 'Open, randomized, controlled clinical trial of Boswellia serrata extract as compared to valdecoxib in osteoarthritis of knee',
    authors: 'Sontakke S, Thawani V, Pimpalkhute S, Kabra P, Babhulkar S, Hingorani L',
    year: 2007, journal: 'Indian Journal of Pharmacology',
    doi: '10.4103/0253-7613.27716',
    link: 'https://pubmed.ncbi.nlm.nih.gov/21814356/',
    funded_by: 'independent',
    finding: 'Open-label RCT (n=66 knee OA patients). Boswellia serrata extract vs valdecoxib (COX-2 inhibitor) for 6 months. Both significantly reduced pain (VAS) and improved walking distance. Boswellia showed comparable pain reduction to valdecoxib with a notably better GI tolerability profile. No peptic ulcer or gastritis events in boswellia group vs 3 events in valdecoxib group.',
    dose_studied: 'Boswellia serrata extract standardised to 40% boswellic acids vs valdecoxib 10mg/day',
    outcome: 'Comparable pain reduction to pharmaceutical COX-2 inhibitor with superior GI tolerability in OA — independently funded comparative trial',
    ingredient_id: 'ingredient:boswellia', relevance: 'Comparative trial vs pharmaceutical reference — key evidence for boswellia OA efficacy and GI safety advantage', direction: 'supports',
  },

  // ─── UC-II COLLAGEN ─────────────────────────────────────────────────────────

  {
    id: 'evidence:lugo-2016-ucii-oa',
    title: 'Efficacy and tolerability of an undenatured type II collagen supplement in modulating knee osteoarthritis symptoms',
    authors: 'Lugo JP, Saiyed ZM, Lane NE',
    year: 2016, journal: 'Nutrition Journal',
    doi: '10.1186/s12937-016-0130-8',
    link: 'https://pubmed.ncbi.nlm.nih.gov/26822714/',
    funded_by: 'manufacturer',
    finding: 'Multicenter, double-blind, placebo-controlled RCT (n=191 knee OA patients). UC-II 40mg/day vs glucosamine 1,500mg + chondroitin 1,200mg vs placebo for 180 days. UC-II significantly improved WOMAC total score, pain, stiffness, and physical function vs placebo and outperformed glucosamine + chondroitin on all primary endpoints. Well-tolerated.',
    dose_studied: 'UC-II 40mg/day vs glucosamine 1,500mg + chondroitin 1,200mg for 180 days',
    outcome: 'UC-II 40mg/day superior to glucosamine + chondroitin and placebo for knee OA — manufacturer-funded but multi-site RCT',
    ingredient_id: 'ingredient:uc-ii-collagen', relevance: 'Primary RCT demonstrating UC-II superiority over glucosamine + chondroitin at 40mg dose', direction: 'supports',
  },

  // ─── SAMe ───────────────────────────────────────────────────────────────────

  {
    id: 'evidence:mischoulon-2002-same-depression',
    title: 'Role of S-adenosyl-L-methionine in the treatment of depression: a review of the evidence',
    authors: 'Mischoulon D, Fava M',
    year: 2002, journal: 'American Journal of Clinical Nutrition',
    doi: '10.1093/ajcn/76.5.1158S',
    link: 'https://pubmed.ncbi.nlm.nih.gov/12420702/',
    funded_by: 'independent',
    finding: 'Review of 11 double-blind RCTs comparing SAMe to placebo or tricyclic antidepressants (TCAs). SAMe consistently more effective than placebo and comparable to TCAs for major depression. Antidepressant action develops within 1–2 weeks. SAMe also shows potential for augmenting conventional antidepressants. Safety profile superior to TCAs (no anticholinergic or cardiovascular effects).',
    dose_studied: '400–1,600mg/day SAMe in reviewed trials',
    outcome: 'SAMe consistently more effective than placebo and comparable to TCAs for depression — independently reviewed evidence',
    ingredient_id: 'ingredient:same', relevance: 'Independent review of 11 RCTs confirming SAMe antidepressant activity comparable to tricyclics', direction: 'supports',
  },

  // ─── GYMNEMA SYLVESTRE ──────────────────────────────────────────────────────

  {
    id: 'evidence:baskaran-1990-gymnema-diabetes',
    title: 'Antidiabetic effect of a leaf extract from Gymnema sylvestre in non-insulin-dependent diabetes mellitus patients',
    authors: 'Baskaran K, Kizar Ahamath B, Radha Shanmugasundaram K, Shanmugasundaram ER',
    year: 1990, journal: 'Journal of Ethnopharmacology',
    doi: '10.1016/0378-8741(90)90107-S',
    link: 'https://pubmed.ncbi.nlm.nih.gov/2259216/',
    funded_by: 'independent',
    finding: 'Controlled trial (n=22 type 2 diabetics). 400mg/day Gymnema sylvestre leaf extract (GS4) as adjunct to conventional antidiabetic drugs for 18–20 months. Fasting blood glucose, glycated haemoglobin, and glycated plasma proteins all significantly reduced. 5 of 22 patients achieved sufficient glucose control to discontinue their conventional drugs.',
    dose_studied: '400mg/day gymnema extract (GS4 fraction) as adjunct for 18–20 months',
    outcome: 'Significant blood glucose reduction; 5/22 patients discontinued conventional drugs — foundational evidence for gymnema in T2DM',
    ingredient_id: 'ingredient:gymnema-sylvestre', relevance: 'Foundational clinical trial establishing gymnema blood glucose evidence — led by the compound discoverers', direction: 'supports',
  },

  // ─── WHITE MULBERRY ─────────────────────────────────────────────────────────

  {
    id: 'evidence:chen-2015-mulberry-glycemic',
    title: 'White mulberry leaf supplementation and postprandial glycaemia: systematic review and meta-analysis',
    authors: 'Chen C, Zhang Y, Huang C',
    year: 2015, journal: 'Evidence-Based Complementary and Alternative Medicine',
    doi: '10.1155/2015/892749',
    link: 'https://pubmed.ncbi.nlm.nih.gov/26290629/',
    funded_by: 'independent',
    finding: 'Systematic review and meta-analysis of 9 RCTs. Mulberry leaf extract significantly reduced 2-hour postprandial blood glucose (standardised mean difference −0.88 mmol/L, p<0.001) and HbA1c in both type 2 diabetics and healthy adults. Effect was dose-dependent and most pronounced when taken immediately before a carbohydrate-containing meal.',
    dose_studied: 'Varied by trial; mulberry extract taken before carbohydrate meals',
    outcome: 'Significant postprandial glucose reduction across 9 RCTs — consistent independent meta-analysis evidence',
    ingredient_id: 'ingredient:white-mulberry', relevance: 'Independent meta-analysis of 9 RCTs confirming postprandial glucose reduction', direction: 'supports',
  },

  // ─── SAFFRON ────────────────────────────────────────────────────────────────

  {
    id: 'evidence:lopresti-2014-saffron-depression',
    title: 'Saffron (Crocus sativus) for depression: a systematic review of clinical studies and examination of underlying antidepressant mechanisms of action',
    authors: 'Lopresti AL, Drummond PD',
    year: 2014, journal: 'Human Psychopharmacology',
    doi: '10.1002/hup.2434',
    link: 'https://pubmed.ncbi.nlm.nih.gov/25384672/',
    funded_by: 'independent',
    finding: 'Systematic review of 11 clinical studies. Saffron extract consistently outperformed placebo for depression in all included trials. Head-to-head trials vs imipramine and fluoxetine showed comparable antidepressant efficacy at 30mg/day standardised extract. Antidepressant mechanisms include serotonin, dopamine, and norepinephrine reuptake inhibition by crocins and safranal. Well-tolerated.',
    dose_studied: '30mg/day standardised saffron extract (15mg twice daily) across included trials',
    outcome: 'Consistent antidepressant effect vs placebo; comparable to imipramine and fluoxetine in head-to-head trials — independent systematic review',
    ingredient_id: 'ingredient:saffron', relevance: 'Independent systematic review of 11 RCTs — strongest evidence synthesis for saffron antidepressant activity', direction: 'supports',
  },

  // ─── ST. JOHN'S WORT ────────────────────────────────────────────────────────

  {
    id: 'evidence:linde-2008-stjohnswort-cochrane',
    title: 'St John\'s wort for major depression',
    authors: 'Linde K, Berner MM, Kriston L',
    year: 2008, journal: 'Cochrane Database of Systematic Reviews',
    doi: '10.1002/14651858.CD000448.pub3',
    link: 'https://pubmed.ncbi.nlm.nih.gov/18843608/',
    funded_by: 'government',
    finding: 'Cochrane systematic review of 29 trials (n=5,489). St. John\'s Wort significantly more effective than placebo (RR 1.48, 95% CI 1.23–1.77) and similarly effective to standard antidepressants (RR 1.01, 95% CI 0.93–1.09). Adverse effects significantly fewer than standard antidepressants. Important caveat: significant drug interactions via CYP3A4 induction limit applicability in polypharmacy patients.',
    dose_studied: '300–900mg/day standardised extract (0.3% hypericin; 5% hyperforin) in included trials',
    outcome: 'Significantly more effective than placebo; comparable to antidepressants with fewer adverse effects — Cochrane review of 29 RCTs',
    ingredient_id: 'ingredient:st-johns-wort', relevance: 'Definitive Cochrane review establishing St. John\'s Wort efficacy and contextualising drug interaction risk', direction: 'supports',
  },

  // ─── SACCHAROMYCES BOULARDII ────────────────────────────────────────────────

  {
    id: 'evidence:szajewska-2015-sboulardii-aad',
    title: 'Systematic review with meta-analysis: Saccharomyces boulardii in the prevention of antibiotic-associated diarrhoea',
    authors: 'Szajewska H, Kołodziej M',
    year: 2015, journal: 'Alimentary Pharmacology and Therapeutics',
    doi: '10.1111/apt.13404',
    link: 'https://pubmed.ncbi.nlm.nih.gov/26216624/',
    funded_by: 'independent',
    finding: 'Systematic review and meta-analysis of 21 RCTs (n=4,780). S. boulardii significantly reduced risk of antibiotic-associated diarrhoea by 51% (RR 0.49, 95% CI 0.38–0.63). NNT = 8. Effect consistent across age groups and antibiotic types. No serious adverse events reported. S. boulardii is the best-evidenced probiotic for AAD prevention.',
    dose_studied: '250–500mg (5–10 billion CFU equivalent) twice daily during antibiotic course',
    outcome: '51% reduction in antibiotic-associated diarrhoea — meta-analysis of 21 RCTs; NNT of 8',
    ingredient_id: 'ingredient:saccharomyces-boulardii', relevance: 'Independent meta-analysis of 21 RCTs — the definitive evidence for S. boulardii AAD prevention', direction: 'supports',
  },

  // ─── COLOSTRUM ──────────────────────────────────────────────────────────────

  {
    id: 'evidence:davison-2016-colostrum-athletes',
    title: 'Bovine colostrum supplementation attenuates the decrease of salivary IgA in a dose dependent manner in athletes',
    authors: 'Davison G, Marchbank T, March DS, et al.',
    year: 2016, journal: 'European Journal of Nutrition',
    doi: '10.1007/s00394-015-1105-0',
    link: 'https://pubmed.ncbi.nlm.nih.gov/25963198/',
    funded_by: 'independent',
    finding: 'Randomised crossover trial (n=8 cyclists). 10g and 20g/day bovine colostrum vs whey protein for 8 weeks. 20g/day colostrum significantly attenuated the fall in salivary IgA (sIgA) associated with heavy training. Colostrum at 10g/day showed intermediate effect. sIgA reduction is a marker of immune suppression in overtraining. Whey protein did not attenuate sIgA decline.',
    dose_studied: '10g and 20g/day bovine colostrum for 8 weeks',
    outcome: 'Colostrum 20g/day attenuated immune marker (sIgA) decline in athletes — independently funded — dose-dependent effect',
    ingredient_id: 'ingredient:colostrum', relevance: 'Independent evidence for colostrum immune marker protection in high-training athletes', direction: 'supports',
  },

  // ─── INOSITOL ───────────────────────────────────────────────────────────────

  {
    id: 'evidence:unfer-2012-inositol-pcos-meta',
    title: 'Effects of myo-inositol in women with PCOS: a systematic review of randomized controlled trials',
    authors: 'Unfer V, Carlomagno G, Dante G, Facchinetti F',
    year: 2012, journal: 'Gynecological Endocrinology',
    doi: '10.3109/09513590.2011.650660',
    link: 'https://pubmed.ncbi.nlm.nih.gov/22296306/',
    funded_by: 'independent',
    finding: 'Systematic review of 13 RCTs. Myo-inositol significantly improved ovulation rate, fasting insulin, HOMA-IR, total testosterone, and LH/FSH ratio in women with PCOS. Some trials showed restoration of menstrual regularity. D-chiro-inositol at lower doses in the physiological 40:1 ratio also showed benefit. Well-tolerated with minimal adverse effects.',
    dose_studied: '2–4g/day myo-inositol or 2g + 50mg D-chiro-inositol (40:1 ratio)',
    outcome: 'Significant improvements in PCOS metabolic and hormonal parameters across 13 RCTs — strong evidence for this indication',
    ingredient_id: 'ingredient:inositol', relevance: 'Independent meta-analysis of 13 RCTs confirming inositol efficacy in PCOS — one of the more evidence-supported herbal/supplement interventions for PCOS', direction: 'supports',
  },

  // ─── FISETIN ────────────────────────────────────────────────────────────────

  {
    id: 'evidence:yousefzadeh-2018-fisetin-senolytic',
    title: 'Fisetin is a senotherapeutic that extends health and lifespan',
    authors: 'Yousefzadeh MJ, Zhu Y, McGowan SJ, et al.',
    year: 2018, journal: 'EBioMedicine',
    doi: '10.1016/j.ebiom.2018.09.015',
    link: 'https://pubmed.ncbi.nlm.nih.gov/30279143/',
    funded_by: 'government',
    finding: 'Preclinical study with human tissue validation. Fisetin identified as the most potent senolytic among 10 natural compounds tested. In mice: fisetin significantly extended median and maximum lifespan, improved physical function in aged mice. In human adipose tissue ex vivo: fisetin reduced senescent cell markers. Government-funded (NIH). Human clinical trials initiated.',
    dose_studied: '100mg/kg in mice (equivalent human dose calculation highly uncertain); ex vivo human tissue data',
    outcome: 'Potent senolytic activity — extends mouse lifespan and reduces human senescent cell markers ex vivo. Government-funded discovery study.',
    ingredient_id: 'ingredient:fisetin', relevance: 'Landmark government-funded discovery paper establishing fisetin as the most potent natural senolytic', direction: 'supports',
  },

  // ─── SPERMIDINE ─────────────────────────────────────────────────────────────

  {
    id: 'evidence:eisenberg-2016-spermidine-cardioprotection',
    title: 'Cardioprotection and lifespan extension by the natural polyamine spermidine',
    authors: 'Eisenberg T, Abdellatif M, Schroeder S, et al.',
    year: 2016, journal: 'Nature Medicine',
    doi: '10.1038/nm.4222',
    link: 'https://pubmed.ncbi.nlm.nih.gov/27841876/',
    funded_by: 'government',
    finding: 'Multimodel longevity and mechanistic study. Spermidine extended lifespan in yeast, flies, worms, and mice. In mice: dietary spermidine supplementation reduced age-related cardiovascular risk. Human cohort data (n=812 adults, Bruneck study, 20-year follow-up): higher dietary spermidine intake significantly associated with reduced all-cause mortality and cardiovascular events. Government-funded.',
    dose_studied: 'Animal models varied; human cohort dietary spermidine intake levels analysed',
    outcome: 'Lifespan extension in multiple model organisms; human cohort data shows all-cause and cardiovascular mortality reduction with higher dietary spermidine',
    ingredient_id: 'ingredient:spermidine', relevance: 'Landmark Nature Medicine study establishing spermidine longevity evidence across model organisms and human cohort data', direction: 'supports',
  },

  // ─── CHAMOMILE ──────────────────────────────────────────────────────────────

  {
    id: 'evidence:amsterdam-2009-chamomile-gad',
    title: 'A randomized, double-blind, placebo-controlled trial of oral Matricaria recutita (chamomile) extract therapy for generalized anxiety disorder',
    authors: 'Amsterdam JD, Li Y, Soeller I, Rockwell K, Mao JJ, Shults J',
    year: 2009, journal: 'Journal of Clinical Psychopharmacology',
    doi: '10.1097/JCP.0b013e3181b011fb',
    link: 'https://pubmed.ncbi.nlm.nih.gov/19783835/',
    funded_by: 'government',
    finding: 'Double-blind RCT (n=57 adults with mild-to-moderate GAD). 220mg 5× daily chamomile extract (1,100mg/day) or placebo for 8 weeks. Chamomile significantly reduced Hamilton Anxiety Rating Scale (HAMA) total score (mean reduction −7.8 vs −5.3 placebo, p=0.047). Response rate 57.4% chamomile vs 35.5% placebo. Government-funded (NCCAM).',
    dose_studied: '220mg chamomile extract 5× daily (1,100mg/day) for 8 weeks',
    outcome: 'Significant GAD symptom reduction at 1,100mg/day — government-funded RCT establishing anxiolytic evidence',
    ingredient_id: 'ingredient:chamomile', relevance: 'Government-funded RCT establishing chamomile efficacy for GAD — well-controlled trial', direction: 'supports',
  },

  // ─── KAVA ───────────────────────────────────────────────────────────────────

  {
    id: 'evidence:pittler-2002-kava-cochrane',
    title: 'Kava extract for treating anxiety',
    authors: 'Pittler MH, Ernst E',
    year: 2002, journal: 'Cochrane Database of Systematic Reviews',
    doi: '10.1002/14651858.CD003383',
    link: 'https://pubmed.ncbi.nlm.nih.gov/12076486/',
    funded_by: 'independent',
    finding: 'Cochrane systematic review of 11 RCTs (n=645). Kava extract significantly more effective than placebo for anxiety (weighted mean difference on Hamilton Anxiety Scale −9.69, 95% CI −13.27 to −6.11). All 11 trials showed positive results. Adverse events were mild and reversible in trials. Note: hepatotoxicity risk from case reports outside of trial setting remains a relevant safety concern not fully captured by trial data.',
    dose_studied: '70–240mg kavalactones daily across included trials',
    outcome: 'Significant anxiolytic effect across all 11 RCTs — the strongest evidence among herbal anxiolytics',
    ingredient_id: 'ingredient:kava', relevance: 'Cochrane review establishing kava as the most evidence-based herbal anxiolytic — hepatotoxicity risk requires contextualisation', direction: 'supports',
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

async function seedEvidenceExpanded() {
  console.log('Connecting to SurrealDB...');
  const db = await connectDb();

  console.log(`Seeding ${EVIDENCE.length} expanded evidence nodes...\n`);

  let evidenceOk = 0;
  let edgesOk = 0;
  let errors = 0;

  for (const seed of EVIDENCE) {
    const { id: _id, ingredient_id, relevance, direction, ...evidenceFields } = seed;

    const [evTable, ...evIdParts] = seed.id.split(':');
    const evidenceRecordId = new RecordId(evTable, evIdParts.join(':'));
    const [ingTable, ...ingIdParts] = ingredient_id.split(':');
    const ingredientRecordId = new RecordId(ingTable, ingIdParts.join(':'));

    try {
      await db.upsert(evidenceRecordId).content({ ...evidenceFields });

      await db.query(
        `RELATE $ingredientId->supported_by->$evidenceId SET relevance = $relevance, direction = $direction`,
        { ingredientId: ingredientRecordId, evidenceId: evidenceRecordId, relevance, direction }
      );

      console.log(`  ✓ [${direction.toUpperCase().padEnd(11)}] ${seed.authors.split(',')[0]} ${seed.year} → ${ingredient_id.split(':')[1]}`);
      evidenceOk++;
      edgesOk++;
    } catch (err) {
      console.error(`  ✗ ${seed.id}: ${err}`);
      errors++;
    }
  }

  await db.close();
  console.log(`\n${evidenceOk} evidence nodes · ${edgesOk} SUPPORTED_BY edges · ${errors} errors`);
  if (errors > 0) process.exit(1);
}

seedEvidenceExpanded().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
