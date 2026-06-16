/**
 * Seeds peer-reviewed evidence nodes for all 10 Phase 1 ingredients.
 * Creates SUPPORTED_BY edges connecting evidence to ingredients.
 * Run: npm run seed:evidence
 * Requires ingredients seeded first: npm run seed:ingredients
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
  // Edge properties
  ingredient_id: string;
  relevance: string;
  direction: 'supports' | 'neutral' | 'contradicts';
}

const EVIDENCE: EvidenceSeed[] = [

  // ─── CREATINE MONOHYDRATE ──────────────────────────────────────────────────

  {
    id: 'evidence:rawson-volek-2003-creatine-strength',
    title: 'Effects of creatine supplementation and resistance training on muscle strength and weightlifting performance',
    authors: 'Rawson ES, Volek JS',
    year: 2003,
    journal: 'Journal of Strength and Conditioning Research',
    doi: '10.1519/1533-4287(2003)017<0822:EOCSARTOMSA>2.0.CO;2',
    link: 'https://pubmed.ncbi.nlm.nih.gov/14636102/',
    funded_by: 'independent',
    finding: 'Meta-analysis of 22 studies. Creatine supplementation combined with resistance training increased 1RM strength by 8% and upper body strength by 14% compared to resistance training alone. Effect consistent across studies.',
    dose_studied: '5–20g/day (loading phase 20g/day for 5–7 days, maintenance 5g/day)',
    outcome: 'Significant increase in maximal strength and muscle mass vs placebo with resistance training',
    ingredient_id: 'ingredient:creatine-monohydrate',
    relevance: 'Primary evidence for creatine monohydrate strength and performance claims',
    direction: 'supports',
  },
  {
    id: 'evidence:branch-2003-creatine-body-composition',
    title: 'Effect of creatine supplementation on body composition and performance: a meta-analysis',
    authors: 'Branch JD',
    year: 2003,
    journal: 'International Journal of Sport Nutrition and Exercise Metabolism',
    doi: '10.1123/ijsnem.13.2.198',
    link: 'https://pubmed.ncbi.nlm.nih.gov/12945830/',
    funded_by: 'independent',
    finding: 'Meta-analysis of 100 studies. Creatine supplementation significantly improved lean body mass (+1.37kg vs placebo) and high-intensity exercise performance. Effects more pronounced in resistance training protocols.',
    dose_studied: '20g/day loading for 5–7 days followed by 5g/day maintenance',
    outcome: 'Significant improvements in lean mass and high-intensity exercise performance vs placebo',
    ingredient_id: 'ingredient:creatine-monohydrate',
    relevance: 'Broad evidence base for creatine body composition and performance effects',
    direction: 'supports',
  },
  {
    id: 'evidence:lanhers-2017-creatine-upper-limb',
    title: 'Creatine Supplementation and Upper Limb Strength Performance: A Systematic Review and Meta-Analysis',
    authors: 'Lanhers C, Pereira B, Naughton G, Trousselard M, Lesage FX, Dutheil F',
    year: 2017,
    journal: 'Sports Medicine',
    doi: '10.1007/s40279-016-0571-4',
    link: 'https://pubmed.ncbi.nlm.nih.gov/27376891/',
    funded_by: 'government',
    finding: 'Systematic review and meta-analysis of 22 studies. Creatine supplementation significantly improved upper limb strength performance (SMD 0.316, p<0.0001). Effects present across age groups and training protocols.',
    dose_studied: '3–5g/day maintenance; 20g/day loading where used',
    outcome: 'Significant improvement in upper limb strength, consistent across populations and training types',
    ingredient_id: 'ingredient:creatine-monohydrate',
    relevance: 'Confirms creatine strength benefit across upper limb exercises with independent funding',
    direction: 'supports',
  },
  {
    id: 'evidence:gualano-2011-creatine-diabetes',
    title: 'Creatine in type 2 diabetes: a randomized, double-blind, placebo-controlled trial',
    authors: 'Gualano B, Novaes RB, Artioli GG, et al.',
    year: 2011,
    journal: 'Medicine and Science in Sports and Exercise',
    doi: '10.1249/MSS.0b013e3181fcee7f',
    link: 'https://pubmed.ncbi.nlm.nih.gov/20386132/',
    funded_by: 'government',
    finding: 'Creatine supplementation in type 2 diabetic patients undergoing exercise training improved glycaemic control (HbA1c, GLUT-4 expression) compared to placebo. Extends creatine evidence beyond athletic performance.',
    dose_studied: '5g/day for 12 weeks',
    outcome: 'Improved glycaemic control and GLUT-4 expression in type 2 diabetes with exercise training',
    ingredient_id: 'ingredient:creatine-monohydrate',
    relevance: 'Evidence for creatine cognitive and metabolic benefits beyond muscle',
    direction: 'supports',
  },

  // ─── MAGNESIUM (all forms share evidence — linked to each form node) ────────

  {
    id: 'evidence:abbasi-2012-magnesium-insomnia',
    title: 'The effect of magnesium supplementation on primary insomnia in elderly: A double-blind placebo-controlled clinical trial',
    authors: 'Abbasi B, Kimiagar M, Sadeghniiat K, Shirazi MM, Hedayati M, Rashidkhani B',
    year: 2012,
    journal: 'Journal of Research in Medical Sciences',
    link: 'https://pubmed.ncbi.nlm.nih.gov/23853635/',
    funded_by: 'government',
    finding: '500mg magnesium daily for 8 weeks in elderly subjects (60–75 years) significantly improved sleep time, sleep efficiency, and early morning awakening vs placebo. Serum magnesium, renin, and melatonin increased; serum cortisol decreased.',
    dose_studied: '500mg elemental magnesium daily for 8 weeks',
    outcome: 'Significant improvement in subjective and objective sleep quality, including sleep onset latency and early waking',
    ingredient_id: 'ingredient:magnesium-glycinate',
    relevance: 'Primary RCT evidence for magnesium and sleep quality',
    direction: 'supports',
  },
  {
    id: 'evidence:zhang-2016-magnesium-sleep-china',
    title: 'Magnesium intake and sleep disorder symptoms: Findings from the Jiangsu Nutrition Study of Chinese adults at five-year follow-up',
    authors: 'Zhang Y, Chen C, Lu L, et al.',
    year: 2022,
    journal: 'Nutrients',
    doi: '10.3390/nu14051131',
    link: 'https://pubmed.ncbi.nlm.nih.gov/35268106/',
    funded_by: 'government',
    finding: 'Higher dietary magnesium intake associated with lower odds of sleep disorder symptoms including short sleep duration and poor sleep quality in adults followed over 5 years. Association strongest in women.',
    dose_studied: 'Dietary intake (observational), average 235mg/day vs lower intakes',
    outcome: 'Higher magnesium intake associated with reduced risk of sleep disturbances in prospective cohort',
    ingredient_id: 'ingredient:magnesium-glycinate',
    relevance: 'Population-level evidence linking magnesium to sleep quality',
    direction: 'supports',
  },
  {
    id: 'evidence:schwalfenberg-2017-magnesium-clinical',
    title: 'The Importance of Magnesium in Clinical Healthcare',
    authors: 'Schwalfenberg GK, Genuis SJ',
    year: 2017,
    journal: 'Scientifica',
    doi: '10.1155/2017/4179326',
    link: 'https://pubmed.ncbi.nlm.nih.gov/29093983/',
    funded_by: 'independent',
    finding: 'Comprehensive review of magnesium\'s role in 300+ enzymatic reactions. Magnesium deficiency prevalent (60%+ of Western adults below RDA). Supplementation evidence reviewed for cardiovascular, metabolic, neurological, and sleep outcomes. Glycinate and citrate forms show superior bioavailability to oxide.',
    dose_studied: '200–400mg elemental magnesium daily reviewed',
    outcome: 'Review confirms magnesium deficiency prevalence and supplementation benefits across multiple health outcomes. Form matters: glycinate > citrate > oxide for bioavailability.',
    ingredient_id: 'ingredient:magnesium-glycinate',
    relevance: 'Evidence for magnesium form differences and bioavailability hierarchy',
    direction: 'supports',
  },
  {
    id: 'evidence:guerrero-romero-2004-magnesium-insulin',
    title: 'Oral magnesium supplementation improves insulin sensitivity in non-diabetic subjects with insulin resistance',
    authors: 'Guerrero-Romero F, Tamez-Perez HE, González-González G, et al.',
    year: 2004,
    journal: 'Diabetes & Metabolism',
    doi: '10.1016/s1262-3636(07)70105-7',
    link: 'https://pubmed.ncbi.nlm.nih.gov/15223977/',
    funded_by: 'independent',
    finding: 'Oral magnesium chloride supplementation for 3 months significantly improved insulin sensitivity (HOMA-IR) and reduced fasting glucose in insulin-resistant non-diabetic adults.',
    dose_studied: '2.5g magnesium chloride solution daily (~300mg elemental magnesium)',
    outcome: 'Significant improvement in insulin sensitivity and fasting glucose in insulin-resistant adults',
    ingredient_id: 'ingredient:magnesium-citrate',
    relevance: 'Evidence for magnesium metabolic effects including insulin sensitivity',
    direction: 'supports',
  },
  {
    id: 'evidence:rude-2009-magnesium-oxide-bioavailability',
    title: 'Magnesium Deficiency: A Cause of Heterogeneous Disease in Humans',
    authors: 'Rude RK, Singer FR, Gruber HE',
    year: 2009,
    journal: 'Journal of Bone and Mineral Research',
    doi: '10.1359/jbmr.090401',
    link: 'https://pubmed.ncbi.nlm.nih.gov/19348226/',
    funded_by: 'independent',
    finding: 'Review examining magnesium deficiency and disease. Magnesium oxide has ~4% bioavailability compared to 25–30% for organic forms (glycinate, citrate). Oxide form primarily used as laxative rather than systemic supplementation due to poor absorption.',
    dose_studied: 'Comparative bioavailability studies reviewed',
    outcome: 'Magnesium oxide bioavailability significantly lower than organic forms — relevant to product form comparison',
    ingredient_id: 'ingredient:magnesium-oxide',
    relevance: 'Evidence establishing bioavailability hierarchy between magnesium forms — key to tier story',
    direction: 'supports',
  },

  // ─── VITAMIN D3 ────────────────────────────────────────────────────────────

  {
    id: 'evidence:holick-2011-vitamin-d-guidelines',
    title: 'Evaluation, Treatment, and Prevention of Vitamin D Deficiency: an Endocrine Society Clinical Practice Guideline',
    authors: 'Holick MF, Binkley NC, Bischoff-Ferrari HA, et al.',
    year: 2011,
    journal: 'Journal of Clinical Endocrinology & Metabolism',
    doi: '10.1210/jc.2011-0385',
    link: 'https://pubmed.ncbi.nlm.nih.gov/21646368/',
    funded_by: 'independent',
    finding: 'Clinical practice guideline from the Endocrine Society. Vitamin D deficiency defined as serum 25(OH)D <20ng/mL. Adults require 1,500–2,000 IU/day to maintain sufficient levels. Upper tolerable intake 4,000 IU/day. D3 (cholecalciferol) more effective than D2 at raising serum levels.',
    dose_studied: '1,500–2,000 IU/day for maintenance; up to 50,000 IU/week for deficiency correction',
    outcome: 'Clinical guideline establishes D3 superiority over D2 and dose requirements for deficiency correction',
    ingredient_id: 'ingredient:vitamin-d3',
    relevance: 'Authoritative clinical guideline establishing vitamin D3 evidence base and dosing',
    direction: 'supports',
  },
  {
    id: 'evidence:martineau-2017-vitamin-d-respiratory',
    title: 'Vitamin D supplementation to prevent acute respiratory tract infections: systematic review and meta-analysis of individual participant data',
    authors: 'Martineau AR, Jolliffe DA, Hooper RL, et al.',
    year: 2017,
    journal: 'BMJ',
    doi: '10.1136/bmj.i6583',
    link: 'https://pubmed.ncbi.nlm.nih.gov/28202713/',
    funded_by: 'government',
    finding: 'Meta-analysis of 25 RCTs (n=11,321). Vitamin D supplementation protected against acute respiratory tract infection overall (OR 0.88). Daily or weekly supplementation most effective. Protective effect strongest in deficient individuals.',
    dose_studied: '400–4,000 IU/day (varies by trial)',
    outcome: 'Significant reduction in acute respiratory infection risk, especially in deficient individuals',
    ingredient_id: 'ingredient:vitamin-d3',
    relevance: 'Strong RCT meta-analysis evidence for vitamin D immune function beyond bone health',
    direction: 'supports',
  },
  {
    id: 'evidence:bischoff-ferrari-2012-vitamin-d-falls',
    title: 'A pooled analysis of vitamin D dose requirements for fracture prevention',
    authors: 'Bischoff-Ferrari HA, Willett WC, Orav EJ, et al.',
    year: 2012,
    journal: 'New England Journal of Medicine',
    doi: '10.1056/NEJMoa1109617',
    link: 'https://pubmed.ncbi.nlm.nih.gov/22762317/',
    funded_by: 'government',
    finding: 'Pooled analysis of 11 double-blind RCTs (n=31,022). Higher-dose vitamin D (800 IU+/day) significantly reduced hip fractures (30%) and non-vertebral fractures (14%) vs lower doses. 400 IU/day insufficient for fracture prevention.',
    dose_studied: '400–800 IU/day; effect threshold approximately 800 IU/day',
    outcome: 'Vitamin D doses ≥800 IU/day significantly reduce hip and non-vertebral fracture risk',
    ingredient_id: 'ingredient:vitamin-d3',
    relevance: 'Establishes dose-response relationship and minimum effective dose for bone outcomes',
    direction: 'supports',
  },

  // ─── OMEGA-3 FISH OIL ──────────────────────────────────────────────────────

  {
    id: 'evidence:bhatt-2019-reduce-it-epa',
    title: 'Cardiovascular Risk Reduction with Icosapentaenoic Acid for Hypertriglyceridemia',
    authors: 'Bhatt DL, Steg PG, Miller M, et al. (REDUCE-IT Investigators)',
    year: 2019,
    journal: 'New England Journal of Medicine',
    doi: '10.1056/NEJMoa1812792',
    link: 'https://pubmed.ncbi.nlm.nih.gov/30415628/',
    funded_by: 'manufacturer',
    finding: 'REDUCE-IT RCT (n=8,179). 4g/day icosapentaenoic acid (EPA) reduced the composite primary endpoint of major cardiovascular events by 25% (HR 0.75, p<0.001) vs placebo in patients with elevated triglycerides on statins. Note: funded by Amarin Corporation.',
    dose_studied: '4g/day pure EPA (icosapentaenoic acid) as prescription product Vascepa',
    outcome: '25% reduction in major cardiovascular events at pharmaceutical dose. Manufacturer-funded trial.',
    ingredient_id: 'ingredient:omega-3-fish-oil',
    relevance: 'Largest RCT for omega-3 cardiovascular outcomes — note manufacturer funding',
    direction: 'supports',
  },
  {
    id: 'evidence:calder-2017-omega3-inflammation',
    title: 'Omega-3 fatty acids and inflammatory processes: from molecules to man',
    authors: 'Calder PC',
    year: 2017,
    journal: 'Biochemical Society Transactions',
    doi: '10.1042/BST20160474',
    link: 'https://pubmed.ncbi.nlm.nih.gov/28900017/',
    funded_by: 'independent',
    finding: 'Review of mechanisms and evidence for EPA and DHA in inflammation. EPA and DHA incorporated into cell membrane phospholipids, displacing arachidonic acid and reducing pro-inflammatory eicosanoid production. Anti-inflammatory effects demonstrated at 2–4g EPA+DHA/day in multiple conditions.',
    dose_studied: '2–4g combined EPA+DHA daily in reviewed trials',
    outcome: 'Mechanistic and clinical evidence for omega-3 anti-inflammatory effects at 2–4g EPA+DHA/day',
    ingredient_id: 'ingredient:omega-3-fish-oil',
    relevance: 'Mechanistic evidence for omega-3 anti-inflammatory effects — independently funded review',
    direction: 'supports',
  },
  {
    id: 'evidence:mozaffarian-wu-2011-omega3-cardiovascular',
    title: 'Omega-3 Fatty Acids and Cardiovascular Disease: Effects on Risk Factors, Molecular Pathways, and Clinical Events',
    authors: 'Mozaffarian D, Wu JH',
    year: 2011,
    journal: 'Journal of the American College of Cardiology',
    doi: '10.1016/j.jacc.2011.06.063',
    link: 'https://pubmed.ncbi.nlm.nih.gov/22051327/',
    funded_by: 'independent',
    finding: 'Comprehensive review of cardiovascular evidence. EPA+DHA lower triglycerides (dose-dependently, ~30% at 4g/day), reduce blood pressure, slow atherosclerosis progression. Strongest evidence for triglyceride reduction. Mortality benefit unclear for general population.',
    dose_studied: '0.5–4g EPA+DHA/day across reviewed studies; triglyceride benefit dose-dependent',
    outcome: 'Strong evidence for triglyceride reduction; more modest evidence for cardiovascular mortality reduction',
    ingredient_id: 'ingredient:omega-3-fish-oil',
    relevance: 'Comprehensive independently-funded review of omega-3 cardiovascular evidence',
    direction: 'supports',
  },

  // ─── ASHWAGANDHA ──────────────────────────────────────────────────────────

  {
    id: 'evidence:chandrasekhar-2012-ashwagandha-stress',
    title: 'A Prospective, Randomized Double-Blind, Placebo-Controlled Study of Safety and Efficacy of a High-Concentration Full-Spectrum Extract of Ashwagandha Root in Reducing Stress and Anxiety in Adults',
    authors: 'Chandrasekhar K, Kapoor J, Anishetty S',
    year: 2012,
    journal: 'Indian Journal of Psychological Medicine',
    doi: '10.4103/0253-7176.106022',
    link: 'https://pubmed.ncbi.nlm.nih.gov/23439798/',
    funded_by: 'manufacturer',
    finding: 'RCT (n=64). 300mg KSM-66 ashwagandha extract twice daily (600mg/day) for 60 days significantly reduced serum cortisol by 27.9% (p<0.0001), stress scores (PSS), and anxiety vs placebo. Well-tolerated. Note: KSM-66 is a patented extract; trial appears manufacturer-associated.',
    dose_studied: '300mg KSM-66 extract twice daily (600mg/day) for 60 days',
    outcome: 'Significant reduction in cortisol, perceived stress, and anxiety scores vs placebo',
    ingredient_id: 'ingredient:ashwagandha',
    relevance: 'Key RCT establishing cortisol and stress reduction evidence for KSM-66 extract',
    direction: 'supports',
  },
  {
    id: 'evidence:wankhede-2015-ashwagandha-strength',
    title: 'Examining the effect of Withania somnifera supplementation on muscle strength and recovery: a randomized controlled trial',
    authors: 'Wankhede S, Langade D, Joshi K, Sinha SR, Bhattacharyya S',
    year: 2015,
    journal: 'Journal of the International Society of Sports Nutrition',
    doi: '10.1186/s12970-015-0104-9',
    link: 'https://pubmed.ncbi.nlm.nih.gov/26609282/',
    funded_by: 'manufacturer',
    finding: 'RCT (n=57). 300mg KSM-66 twice daily over 8 weeks significantly improved bench press strength (+46% vs +26% placebo), leg extension strength, and muscle recovery. Testosterone increased by 15% vs 2.5% in placebo. Note: manufacturer-associated.',
    dose_studied: '300mg KSM-66 extract twice daily (600mg/day) for 8 weeks',
    outcome: 'Significant improvements in muscle strength, muscle recovery, and testosterone vs placebo',
    ingredient_id: 'ingredient:ashwagandha',
    relevance: 'Evidence for ashwagandha effects on muscle strength and testosterone — manufacturer-funded',
    direction: 'supports',
  },
  {
    id: 'evidence:pratte-2014-ashwagandha-review',
    title: 'An Alternative Treatment for Anxiety: A Systematic Review of Human Trial Results Reported for the Ayurvedic Herb Ashwagandha (Withania somnifera)',
    authors: 'Pratte MA, Nanavati KB, Young V, Morley CP',
    year: 2014,
    journal: 'Journal of Alternative and Complementary Medicine',
    doi: '10.1089/acm.2014.0177',
    link: 'https://pubmed.ncbi.nlm.nih.gov/25405876/',
    funded_by: 'independent',
    finding: 'Systematic review of 5 human RCTs. All five showed consistent anxiolytic effects of ashwagandha extract vs placebo. Effects on cortisol, anxiety scales (Hamilton, PSS), and subjective stress. Review independently conducted.',
    dose_studied: '300–600mg standardised extract daily across reviewed trials',
    outcome: 'Consistent anxiolytic effects across 5 RCTs — independent review confirms pattern',
    ingredient_id: 'ingredient:ashwagandha',
    relevance: 'Independent systematic review confirming anxiolytic evidence across multiple trials',
    direction: 'supports',
  },

  // ─── MELATONIN ────────────────────────────────────────────────────────────

  {
    id: 'evidence:ferracioli-oda-2013-melatonin-meta',
    title: 'Meta-Analysis: Melatonin for the Treatment of Primary Sleep Disorders',
    authors: 'Ferracioli-Oda E, Qawasmi A, Bloch MH',
    year: 2013,
    journal: 'PLOS ONE',
    doi: '10.1371/journal.pone.0063773',
    link: 'https://pubmed.ncbi.nlm.nih.gov/23691095/',
    funded_by: 'government',
    finding: 'Meta-analysis of 19 studies (n=1,683). Melatonin significantly reduced sleep onset latency (mean 7.06 min, 95% CI 4.37–9.75), increased total sleep time (8.25 min, 95% CI 1.74–14.75), and improved overall sleep quality. Dose range studied: 0.1–5mg. No dose-response above 0.5–1mg.',
    dose_studied: '0.1–5mg; most studies used 0.5–3mg',
    outcome: 'Melatonin reduces sleep onset latency and improves sleep quality. No evidence that doses above 1–3mg improve outcomes.',
    ingredient_id: 'ingredient:melatonin',
    relevance: 'Core meta-analysis evidence — establishes effective dose range and dose-response ceiling',
    direction: 'supports',
  },
  {
    id: 'evidence:buscemi-2005-melatonin-systematic-review',
    title: 'The Efficacy and Safety of Exogenous Melatonin for Primary Sleep Disorders',
    authors: 'Buscemi N, Vandermeer B, Hooton N, et al.',
    year: 2005,
    journal: 'Journal of General Internal Medicine',
    doi: '10.1111/j.1525-1497.2005.0243.x',
    link: 'https://pubmed.ncbi.nlm.nih.gov/16423108/',
    funded_by: 'government',
    finding: 'Systematic review commissioned by the Agency for Healthcare Research and Quality. Melatonin significantly effective for delayed sleep phase disorder (DSPD) and jet lag. Doses of 0.5–3mg effective; no evidence that higher doses provide greater benefit. Safety profile acceptable for short-term use.',
    dose_studied: '0.5–5mg; no additional benefit observed above 3mg',
    outcome: 'Effective for DSPD and jet lag at 0.5–3mg. Higher doses not more effective. Government-commissioned review.',
    ingredient_id: 'ingredient:melatonin',
    relevance: 'Government-commissioned systematic review — establishes dose ceiling and primary indications',
    direction: 'supports',
  },
  {
    id: 'evidence:cajochen-2003-melatonin-physiology',
    title: 'Role of melatonin in the regulation of human circadian rhythms and sleep',
    authors: 'Cajochen C, Kräuchi K, Wirz-Justice A',
    year: 2003,
    journal: 'Journal of Neuroendocrinology',
    doi: '10.1046/j.1365-2826.2003.00989.x',
    link: 'https://pubmed.ncbi.nlm.nih.gov/12622847/',
    funded_by: 'government',
    finding: 'Review of melatonin physiology. Endogenous melatonin production is 0.1–0.3mg per night, producing peak blood levels of 80–120pg/mL. Exogenous doses of 0.3–1mg produce physiological blood levels. Doses of 5–10mg (typical product dose) produce supraphysiological blood levels 10–100x higher than endogenous peak.',
    dose_studied: 'Physiological: 0.1–0.3mg endogenous; exogenous range reviewed 0.3–10mg',
    outcome: 'Products typically contain 5–10mg — 17–100x the effective physiological dose. Supraphysiological doses do not improve sleep outcomes.',
    ingredient_id: 'ingredient:melatonin',
    relevance: 'Establishes the dose gap between evidence-based dose and typical product dose — the key story for this ingredient',
    direction: 'supports',
  },

  // ─── COLLAGEN PEPTIDES ────────────────────────────────────────────────────

  {
    id: 'evidence:proksch-2014-collagen-skin',
    title: 'Oral Supplementation of Specific Collagen Peptides Has Beneficial Effects on Human Skin Physiology: A Double-Blind, Placebo-Controlled Study',
    authors: 'Proksch E, Segger D, Degwert J, Schunck M, Zague V, Oesser S',
    year: 2014,
    journal: 'Skin Pharmacology and Physiology',
    doi: '10.1159/000351376',
    link: 'https://pubmed.ncbi.nlm.nih.gov/23949208/',
    funded_by: 'manufacturer',
    finding: 'RCT (n=69 women, 35–55 years). 2.5g or 5g Verisol hydrolysed collagen peptides daily for 8 weeks significantly improved skin elasticity (+7% at 2.5g, p<0.001) and skin moisture vs placebo. Effects maintained 4 weeks post-treatment. Note: GELITA-associated trial.',
    dose_studied: '2.5g and 5g hydrolysed collagen peptides daily for 8 weeks',
    outcome: 'Skin elasticity and moisture significantly improved at 2.5g/day — manufacturer-associated trial',
    ingredient_id: 'ingredient:collagen-peptides',
    relevance: 'Primary RCT evidence for collagen peptides and skin elasticity — manufacturer-funded',
    direction: 'supports',
  },
  {
    id: 'evidence:zdzieblik-2015-collagen-muscle',
    title: 'Collagen peptide supplementation in combination with resistance training improves body composition and increases muscle strength in elderly sarcopenic men: a randomised controlled trial',
    authors: 'Zdzieblik D, Oesser S, Baumstark MW, Gollhofer A, König D',
    year: 2015,
    journal: 'British Journal of Nutrition',
    doi: '10.1017/S0007114515002810',
    link: 'https://pubmed.ncbi.nlm.nih.gov/26353786/',
    funded_by: 'manufacturer',
    finding: 'RCT (n=53 sarcopenic men). 15g collagen peptides post-workout vs whey protein, over 12 weeks with resistance training. Collagen group showed greater increase in fat-free mass and muscle strength vs placebo. Collagen does not provide complete amino acid profile — effect attributed to glycine and proline on connective tissue.',
    dose_studied: '15g hydrolysed collagen peptides daily post-exercise for 12 weeks',
    outcome: 'Improved fat-free mass and strength vs placebo with resistance training — manufacturer-associated',
    ingredient_id: 'ingredient:collagen-peptides',
    relevance: 'RCT evidence for collagen and muscle/connective tissue with resistance training',
    direction: 'supports',
  },
  {
    id: 'evidence:shaw-2017-collagen-connective-tissue',
    title: 'Vitamin C-enriched gelatin supplementation before intermittent activity augments collagen synthesis',
    authors: 'Shaw G, Lee-Barthel A, Ross ML, Wang B, Baar K',
    year: 2017,
    journal: 'American Journal of Clinical Nutrition',
    doi: '10.3945/ajcn.116.138594',
    link: 'https://pubmed.ncbi.nlm.nih.gov/27852613/',
    funded_by: 'government',
    finding: 'Crossover RCT (n=8). 5g and 15g vitamin C-enriched gelatin before exercise significantly increased circulating collagen synthesis markers (P1NP) vs placebo. Effect supports role of collagen peptides in connective tissue synthesis with vitamin C co-administration.',
    dose_studied: '5g and 15g gelatin (collagen hydrolysate equivalent) with vitamin C, before exercise',
    outcome: 'Collagen synthesis markers significantly elevated — government-funded mechanistic study',
    ingredient_id: 'ingredient:collagen-peptides',
    relevance: 'Government-funded RCT evidence for collagen synthesis — supports joint and connective tissue angle',
    direction: 'supports',
  },

  // ─── WHEY PROTEIN ISOLATE ─────────────────────────────────────────────────

  {
    id: 'evidence:tang-2009-whey-mps',
    title: 'Ingestion of whey hydrolysate, casein, or soy protein isolate: effects on mixed muscle protein synthesis at rest and following resistance exercise in young men',
    authors: 'Tang JE, Moore DR, Kujbida GW, Tarnopolsky MA, Phillips SM',
    year: 2009,
    journal: 'Journal of Applied Physiology',
    doi: '10.1152/japplphysiol.00076.2009',
    link: 'https://pubmed.ncbi.nlm.nih.gov/19589961/',
    funded_by: 'government',
    finding: 'RCT comparing whey hydrolysate, casein, and soy protein. Whey stimulated muscle protein synthesis (MPS) to a greater extent than casein or soy, both at rest and following resistance exercise. Difference attributed to whey\'s superior leucine content and faster digestion kinetics.',
    dose_studied: '21g protein post-exercise (each type)',
    outcome: 'Whey produces greater MPS response than casein or soy post-exercise due to leucine content and absorption speed',
    ingredient_id: 'ingredient:whey-protein-isolate',
    relevance: 'Government-funded RCT establishing whey superiority for MPS — basis for WPI tier position',
    direction: 'supports',
  },
  {
    id: 'evidence:morton-2018-protein-meta-analysis',
    title: 'A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults',
    authors: 'Morton RW, Murphy KT, McKellar SR, et al.',
    year: 2018,
    journal: 'British Journal of Sports Medicine',
    doi: '10.1136/bjsports-2017-097608',
    link: 'https://pubmed.ncbi.nlm.nih.gov/28698222/',
    funded_by: 'government',
    finding: 'Systematic review and meta-analysis of 49 RCTs (n=1,863). Protein supplementation significantly increased muscle mass (+0.30kg) and strength with resistance training. Upper benefit plateau ~1.62g/kg/day. Effect independent of protein source (whey, soy, casein). Timing effect minimal if daily intake is adequate.',
    dose_studied: '1.6–2.2g protein/kg bodyweight/day; supplemental doses varied across trials',
    outcome: 'Protein supplementation significantly improves muscle mass and strength — effect plateaus at ~1.62g/kg/day regardless of source',
    ingredient_id: 'ingredient:whey-protein-isolate',
    relevance: 'Largest meta-analysis establishing protein dose requirements — key context for product serving sizes',
    direction: 'supports',
  },
  {
    id: 'evidence:phillips-van-loon-2011-protein-athletes',
    title: 'Dietary protein for athletes: From requirements to optimum adaptation',
    authors: 'Phillips SM, Van Loon LJ',
    year: 2011,
    journal: 'Journal of Sports Sciences',
    doi: '10.1080/02640414.2011.619204',
    link: 'https://pubmed.ncbi.nlm.nih.gov/22150425/',
    funded_by: 'independent',
    finding: 'Review establishing protein requirements for athletes. 1.6–2.2g/kg/day recommended for muscle gain. 20–40g leucine-rich protein per meal maximises MPS response. Whey protein isolate has the highest leucine content of any protein form (10–11% leucine), making it optimal for per-meal MPS stimulation.',
    dose_studied: '20–40g per meal; 1.6–2.2g/kg/day total daily protein',
    outcome: 'Whey protein isolate identified as optimal source for per-meal MPS due to highest leucine content',
    ingredient_id: 'ingredient:whey-protein-isolate',
    relevance: 'Establishes leucine threshold and per-meal dosing rationale — basis for WPI dose claims',
    direction: 'supports',
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

async function seedEvidence() {
  console.log('Connecting to SurrealDB...');
  const db = await connectDb();

  console.log(`Seeding ${EVIDENCE.length} evidence nodes...\n`);

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
      // Create evidence node
      await db.upsert(evidenceRecordId).content({
        ...evidenceFields,
      });

      // Create SUPPORTED_BY edge: ingredient → evidence
      await db.query(
        `RELATE $ingredientId->supported_by->$evidenceId SET relevance = $relevance, direction = $direction`,
        {
          ingredientId: ingredientRecordId,
          evidenceId: evidenceRecordId,
          relevance,
          direction,
        }
      );

      console.log(`  ✓ [${direction.toUpperCase().padEnd(11)}] ${seed.authors.split(',')[0]} ${seed.year} → ${ingredient_id.split(':')[1]}`);
      evidenceOk++;
      edgesOk++;
    } catch (err) {
      console.error(`  ✗ ${seed.id}: ${err}`);
      errors++;
    }
  }

  // Also link shared magnesium evidence to citrate and oxide nodes
  const CROSS_LINKS: { evidenceId: string; ingredientId: string; relevance: string; direction: 'supports' | 'neutral' | 'contradicts' }[] = [
    {
      evidenceId: 'evidence:abbasi-2012-magnesium-insomnia',
      ingredientId: 'ingredient:magnesium-citrate',
      relevance: 'Magnesium sleep evidence applies across forms; citrate has good bioavailability',
      direction: 'supports',
    },
    {
      evidenceId: 'evidence:abbasi-2012-magnesium-insomnia',
      ingredientId: 'ingredient:magnesium-oxide',
      relevance: 'Magnesium sleep evidence — note oxide has significantly lower bioavailability than form used in study',
      direction: 'supports',
    },
    {
      evidenceId: 'evidence:zhang-2016-magnesium-sleep-china',
      ingredientId: 'ingredient:magnesium-citrate',
      relevance: 'Population-level magnesium and sleep evidence applicable across forms',
      direction: 'supports',
    },
    {
      evidenceId: 'evidence:zhang-2016-magnesium-sleep-china',
      ingredientId: 'ingredient:magnesium-oxide',
      relevance: 'Population-level magnesium and sleep evidence applicable across forms',
      direction: 'supports',
    },
    {
      evidenceId: 'evidence:schwalfenberg-2017-magnesium-clinical',
      ingredientId: 'ingredient:magnesium-citrate',
      relevance: 'Review covers all magnesium forms including citrate bioavailability data',
      direction: 'supports',
    },
    {
      evidenceId: 'evidence:schwalfenberg-2017-magnesium-clinical',
      ingredientId: 'ingredient:magnesium-oxide',
      relevance: 'Review explicitly documents oxide\'s inferior bioavailability — directly relevant',
      direction: 'supports',
    },
    {
      evidenceId: 'evidence:guerrero-romero-2004-magnesium-insulin',
      ingredientId: 'ingredient:magnesium-glycinate',
      relevance: 'Magnesium metabolic evidence applies across forms; glycinate has superior bioavailability',
      direction: 'supports',
    },
    {
      evidenceId: 'evidence:rude-2009-magnesium-oxide-bioavailability',
      ingredientId: 'ingredient:magnesium-glycinate',
      relevance: 'Bioavailability comparison — glycinate shown as superior form',
      direction: 'supports',
    },
    {
      evidenceId: 'evidence:rude-2009-magnesium-oxide-bioavailability',
      ingredientId: 'ingredient:magnesium-citrate',
      relevance: 'Bioavailability comparison — citrate intermediate between glycinate and oxide',
      direction: 'supports',
    },
  ];

  console.log(`\nCreating ${CROSS_LINKS.length} cross-links for shared magnesium evidence...\n`);

  for (const link of CROSS_LINKS) {
    const [evTable, ...evIdParts] = link.evidenceId.split(':');
    const evRid = new RecordId(evTable, evIdParts.join(':'));
    const [ingTable, ...ingIdParts] = link.ingredientId.split(':');
    const ingRid = new RecordId(ingTable, ingIdParts.join(':'));

    try {
      await db.query(
        `RELATE $ingredientId->supported_by->$evidenceId SET relevance = $relevance, direction = $direction`,
        { ingredientId: ingRid, evidenceId: evRid, relevance: link.relevance, direction: link.direction }
      );
      edgesOk++;
    } catch (err) {
      // Duplicate edges are acceptable — skip silently
      const msg = String(err);
      if (!msg.includes('already exists')) {
        console.error(`  ✗ cross-link ${link.evidenceId} → ${link.ingredientId}: ${err}`);
        errors++;
      }
    }
  }

  await db.close();

  console.log(`\n${evidenceOk} evidence nodes created · ${edgesOk} SUPPORTED_BY edges created · ${errors} errors`);

  if (errors > 0) {
    process.exit(1);
  }
}

seedEvidence().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
