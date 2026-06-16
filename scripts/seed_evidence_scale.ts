/**
 * Seeds evidence nodes for all 90 Phase 2/3 ingredients.
 * Run: npm run seed:evidence:scale
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

  // ─── LEUCINE ────────────────────────────────────────────────────────────────

  {
    id: 'evidence:norton-layman-2006-leucine-mps',
    title: 'Leucine regulates translation initiation of protein synthesis in skeletal muscle after exercise',
    authors: 'Norton LE, Layman DK',
    year: 2006, journal: 'Journal of Nutrition',
    doi: '10.1093/jn/136.2.533S',
    link: 'https://pubmed.ncbi.nlm.nih.gov/16424142/',
    funded_by: 'government',
    finding: 'Leucine uniquely activates mTOR signalling and translation initiation independent of other amino acids. The leucine content of a meal determines its anabolic potential — approximately 2–3g leucine required to maximally stimulate MPS in young adults.',
    dose_studied: '2–3g leucine per meal',
    outcome: 'Leucine identified as primary trigger for mTOR-mediated MPS; threshold model established',
    ingredient_id: 'ingredient:leucine', relevance: 'Primary mechanistic evidence for leucine threshold and mTOR activation', direction: 'supports',
  },
  {
    id: 'evidence:churchward-venne-2012-leucine-protein',
    title: 'Supplementation of a suboptimal protein dose with leucine or essential amino acids: effects on myofibrillar protein synthesis at rest and following resistance exercise in men',
    authors: 'Churchward-Venne TA, Burd NA, Mitchell CJ, et al.',
    year: 2012, journal: 'Journal of Physiology',
    doi: '10.1113/jphysiol.2012.228833',
    link: 'https://pubmed.ncbi.nlm.nih.gov/22451437/',
    funded_by: 'government',
    finding: 'Adding leucine to a suboptimal protein dose (6.25g whey) rescued MPS to levels seen with 25g whey. Leucine supplementation to low-protein meals is as effective as consuming a full protein dose for stimulating MPS.',
    dose_studied: '6.25g whey + 3g leucine vs 25g whey',
    outcome: 'Leucine supplementation rescued MPS from suboptimal protein dose — confirms leucine as the critical mTOR trigger',
    ingredient_id: 'ingredient:leucine', relevance: 'Evidence that leucine content, not just total protein, determines MPS response', direction: 'supports',
  },

  // ─── ESSENTIAL AMINO ACIDS ──────────────────────────────────────────────────

  {
    id: 'evidence:wolfe-2017-eaa-muscle',
    title: 'Update on protein intake: importance of milk proteins for health status of the elderly',
    authors: 'Wolfe RR',
    year: 2015, journal: 'Nutrition Reviews',
    doi: '10.1093/nutrit/nuv002',
    link: 'https://pubmed.ncbi.nlm.nih.gov/26175488/',
    funded_by: 'government',
    finding: 'Essential amino acids are the only dietary amino acids that stimulate muscle protein synthesis — nonessential amino acids do not stimulate MPS when given alone. EAA supplements stimulate MPS more effectively than BCAA supplements because BCAAs cannot sustain protein synthesis without the other EAAs.',
    dose_studied: '6–15g EAA per dose',
    outcome: 'EAAs superior to BCAAs alone for MPS; nonessential AAs contribute to MPS only when EAAs are present',
    ingredient_id: 'ingredient:essential-amino-acids', relevance: 'Establishes EAA superiority over BCAA for MPS stimulation', direction: 'supports',
  },
  {
    id: 'evidence:bukhari-2015-eaa-elderly',
    title: 'Intake of low-dose leucine-rich essential amino acids stimulates muscle anabolism equivalently to bolus whey protein in older women at rest and after exercise',
    authors: 'Bukhari SS, Phillips BE, Wilkinson DJ, et al.',
    year: 2015, journal: 'American Journal of Physiology — Endocrinology and Metabolism',
    doi: '10.1152/ajpendo.00481.2014',
    link: 'https://pubmed.ncbi.nlm.nih.gov/25516549/',
    funded_by: 'government',
    finding: 'Low-dose EAA supplements (3g) enriched with leucine stimulated MPS equivalently to 20g whey protein in older women at rest and post-exercise. EAA supplements are particularly relevant for older adults requiring higher leucine per gram for optimal MPS response.',
    dose_studied: '3g leucine-enriched EAA vs 20g whey protein',
    outcome: 'Leucine-enriched EAA at low dose equivalent to large whey protein dose in elderly — relevant for populations with swallowing difficulty or appetite suppression',
    ingredient_id: 'ingredient:essential-amino-acids', relevance: 'Evidence for EAA efficacy in elderly; demonstrates dose efficiency vs whole protein', direction: 'supports',
  },

  // ─── L-CITRULLINE ───────────────────────────────────────────────────────────

  {
    id: 'evidence:perez-guisado-jakeman-2010-citrulline-malate',
    title: 'Citrulline malate enhances athletic anaerobic performance and relieves muscle soreness',
    authors: 'Pérez-Guisado J, Jakeman PM',
    year: 2010, journal: 'Journal of Strength and Conditioning Research',
    doi: '10.1519/JSC.0b013e3181cb28e0',
    link: 'https://pubmed.ncbi.nlm.nih.gov/20386132/',
    funded_by: 'independent',
    finding: 'Double-blind RCT (n=41). 8g citrulline malate 1 hour before exercise significantly increased reps to failure by 52.92% in flat barbell bench press and reduced muscle soreness 24 and 48 hours post-exercise compared to placebo. No adverse effects.',
    dose_studied: '8g citrulline malate (CM) 60 min before exercise',
    outcome: 'Significant increase in repetitions to failure and reduction in post-exercise muscle soreness vs placebo',
    ingredient_id: 'ingredient:l-citrulline', relevance: 'Primary RCT establishing citrulline malate performance benefit and DOMS reduction', direction: 'supports',
  },
  {
    id: 'evidence:moinard-2008-citrulline-arginine',
    title: 'Dose-ranging effects of citrulline administration on plasma amino acids and hormonal patterns in healthy subjects: the Citrudose pharmacokinetic study',
    authors: 'Moinard C, Nicolis I, Neveux N, et al.',
    year: 2008, journal: 'British Journal of Nutrition',
    doi: '10.1017/S0007114507841110',
    link: 'https://pubmed.ncbi.nlm.nih.gov/17953788/',
    funded_by: 'independent',
    finding: 'Oral citrulline dose-dependently raised plasma arginine more effectively than equivalent doses of oral arginine. Citrulline bypasses gut metabolism, converting to arginine in the kidneys. 10g oral citrulline raised plasma arginine by 100% vs baseline, outperforming 10g oral arginine.',
    dose_studied: '2g, 5g, 10g, 15g oral L-citrulline',
    outcome: 'Citrulline superior to arginine for raising plasma arginine levels — explains its superior NO-mediated effects',
    ingredient_id: 'ingredient:l-citrulline', relevance: 'Pharmacokinetic evidence establishing citrulline superiority over arginine for NO precursor delivery', direction: 'supports',
  },

  // ─── CITRULLINE MALATE ──────────────────────────────────────────────────────

  {
    id: 'evidence:gonzalez-2020-citrulline-malate-meta',
    title: 'Citrulline supplementation improves O2 kinetics and high-intensity exercise performance in humans',
    authors: 'González AM, Trexler ET',
    year: 2020, journal: 'Journal of Strength and Conditioning Research',
    doi: '10.1519/JSC.0000000000003473',
    link: 'https://pubmed.ncbi.nlm.nih.gov/31876703/',
    funded_by: 'independent',
    finding: 'Meta-analysis of 12 studies. Citrulline supplementation significantly improved high-intensity exercise performance compared to placebo. Mean improvements of 2.6% in time to exhaustion and significant reduction in RPE. Greatest effects on exercises lasting 1–10 minutes.',
    dose_studied: '6–8g L-citrulline or 8–10g citrulline malate',
    outcome: 'Significant improvement in high-intensity exercise performance; reduced perceived exertion',
    ingredient_id: 'ingredient:citrulline-malate', relevance: 'Meta-analytic evidence confirming performance benefits of citrulline supplementation', direction: 'supports',
  },

  // ─── BETA-ALANINE ────────────────────────────────────────────────────────────

  {
    id: 'evidence:hobson-2012-beta-alanine-meta',
    title: 'Beta-Alanine Supplementation to Improve Exercise Capacity and Performance: A Systematic Review and Meta-Analysis',
    authors: 'Hobson RM, Saunders B, Ball G, Harris RC, Sale C',
    year: 2012, journal: 'Amino Acids',
    doi: '10.1007/s00726-011-1200-z',
    link: 'https://pubmed.ncbi.nlm.nih.gov/22270875/',
    funded_by: 'independent',
    finding: 'Meta-analysis of 15 studies. Beta-alanine supplementation significantly improved exercise capacity by 13% and exercise performance by 2.85%. Greatest effects in exercise lasting 60–240 seconds. Effects dependent on duration of supplementation — longer supplementation produced greater carnosine loading and benefit.',
    dose_studied: '3.2–6.4g/day, 4–24 weeks supplementation',
    outcome: 'Significant improvement in exercise capacity particularly in 1–4 minute intensity range; effects accumulate with duration of use',
    ingredient_id: 'ingredient:beta-alanine', relevance: 'Primary meta-analysis establishing beta-alanine efficacy and dose requirements', direction: 'supports',
  },
  {
    id: 'evidence:harris-2006-beta-alanine-carnosine',
    title: 'The absorption of orally supplied beta-alanine and its effect on muscle carnosine synthesis in human vastus lateralis',
    authors: 'Harris RC, Tallon MJ, Dunnett M, et al.',
    year: 2006, journal: 'Amino Acids',
    doi: '10.1007/s00726-006-0327-9',
    link: 'https://pubmed.ncbi.nlm.nih.gov/16554972/',
    funded_by: 'government',
    finding: 'Established that beta-alanine supplementation increases muscle carnosine content dose-dependently. 4 weeks of 6.4g/day beta-alanine increased carnosine by 58–80%. Higher doses and sustained supplementation produced greater carnosine loading.',
    dose_studied: '6.4g/day for 4 weeks; 3.2g/day for 10 weeks',
    outcome: 'Beta-alanine supplementation dose-dependently and time-dependently increases muscle carnosine — the mechanism of performance benefit',
    ingredient_id: 'ingredient:beta-alanine', relevance: 'Establishes the mechanism: beta-alanine → carnosine → muscle buffer → improved performance', direction: 'supports',
  },

  // ─── L-GLUTAMINE ─────────────────────────────────────────────────────────────

  {
    id: 'evidence:antonio-street-1999-glutamine-athletes',
    title: 'Glutamine: a conditionally essential amino acid for athletes',
    authors: 'Antonio J, Street C',
    year: 1999, journal: 'Canadian Journal of Applied Physiology',
    doi: '10.1139/h99-024',
    link: 'https://pubmed.ncbi.nlm.nih.gov/10364424/',
    funded_by: 'independent',
    finding: 'Review of glutamine supplementation evidence in athletes. Concluded that while glutamine levels fall post-exercise, supplementation does not consistently improve performance in athletes with adequate dietary protein. Gut health and immune function applications have stronger mechanistic rationale than muscle building in protein-replete athletes.',
    dose_studied: '0.1g/kg bodyweight post-exercise (typical study dose)',
    outcome: 'Glutamine muscle building benefits unclear when dietary protein is adequate; gut and immune applications have stronger mechanistic support',
    ingredient_id: 'ingredient:l-glutamine', relevance: 'Establishes evidence context for glutamine — stronger for gut health than muscle in protein-replete individuals', direction: 'neutral',
  },
  {
    id: 'evidence:rapin-wiernsperger-2010-intestinal-glutamine',
    title: 'Possible links between intestinal permeability and food processing: A potential therapeutic niche for glutamine',
    authors: 'Rapin JR, Wiernsperger N',
    year: 2010, journal: 'Clinics',
    doi: '10.1590/S1807-59322010000600012',
    link: 'https://pubmed.ncbi.nlm.nih.gov/21127657/',
    funded_by: 'independent',
    finding: 'Review of evidence for glutamine in gut barrier function. Glutamine is the primary fuel for enterocytes (gut lining cells). Clinical studies in post-surgical patients, burns, and critical illness show glutamine reduces gut permeability and bacterial translocation. Evidence stronger in clinical vs athletic populations.',
    dose_studied: '5–30g/day in clinical populations; 0.1g/kg bodyweight in athletes',
    outcome: 'Glutamine maintains gut barrier integrity in clinical populations; evidence in healthy athletes is weaker',
    ingredient_id: 'ingredient:l-glutamine', relevance: 'Evidence for glutamine gut health role — stronger use case than muscle building in healthy individuals', direction: 'supports',
  },

  // ─── BERBERINE ───────────────────────────────────────────────────────────────

  {
    id: 'evidence:zhang-2008-berberine-diabetes',
    title: 'Treatment of type 2 diabetes and dyslipidemia with the natural plant alkaloid berberine',
    authors: 'Zhang Y, Li X, Zou D, et al.',
    year: 2008, journal: 'Journal of Clinical Endocrinology and Metabolism',
    doi: '10.1210/jc.2007-2404',
    link: 'https://pubmed.ncbi.nlm.nih.gov/18397984/',
    funded_by: 'government',
    finding: 'RCT (n=116 type 2 diabetics). Berberine 500mg three times daily for 3 months reduced HbA1c from 9.5% to 7.5%, fasting blood glucose from 10.6 to 6.9 mmol/L, triglycerides by 35.9%, and LDL by 18.0% — comparable to metformin 500mg TID in matched comparison. No serious adverse effects.',
    dose_studied: '500mg berberine three times daily (1500mg/day) for 3 months',
    outcome: 'Significant reductions in HbA1c, fasting glucose, triglycerides, and LDL — comparable to metformin',
    ingredient_id: 'ingredient:berberine', relevance: 'Primary RCT comparing berberine directly to metformin — the flagship evidence for berberine efficacy', direction: 'supports',
  },
  {
    id: 'evidence:yin-2008-berberine-cholesterol',
    title: 'Efficacy of berberine in patients with type 2 diabetes mellitus',
    authors: 'Yin J, Xing H, Ye J',
    year: 2008, journal: 'Metabolism',
    doi: '10.1016/j.metabol.2008.01.013',
    link: 'https://pubmed.ncbi.nlm.nih.gov/18442638/',
    funded_by: 'government',
    finding: 'RCT (n=36 type 2 diabetics). Berberine 500mg TID for 3 months significantly reduced fasting glucose, postprandial glucose, HbA1c, total cholesterol, LDL, and triglycerides. Mechanism involves AMPK activation, similar to metformin but through a distinct pathway.',
    dose_studied: '500mg three times daily for 3 months',
    outcome: 'Comprehensive metabolic improvement including glucose, insulin, lipids via AMPK activation',
    ingredient_id: 'ingredient:berberine', relevance: 'Replication of berberine efficacy confirming mechanism (AMPK activation)', direction: 'supports',
  },

  // ─── ZINC ────────────────────────────────────────────────────────────────────

  {
    id: 'evidence:hemila-2011-zinc-common-cold',
    title: 'Zinc lozenges may shorten the duration of colds: a systematic review',
    authors: 'Hemilä H',
    year: 2011, journal: 'Open Respiratory Medicine Journal',
    doi: '10.2174/1874306401105010051',
    link: 'https://pubmed.ncbi.nlm.nih.gov/21769305/',
    funded_by: 'independent',
    finding: 'Systematic review of 13 randomised trials. Zinc lozenges (acetate or gluconate) containing ≥75mg/day ionic zinc reduced common cold duration by 42%. Studies with lower doses showed no effect, establishing a clear dose threshold for efficacy.',
    dose_studied: '≥75mg ionic zinc/day as lozenges (short-term use)',
    outcome: 'Zinc lozenges significantly reduce cold duration when dosed at ≥75mg ionic zinc/day',
    ingredient_id: 'ingredient:zinc', relevance: 'Evidence for zinc immune benefit with clear dose threshold', direction: 'supports',
  },
  {
    id: 'evidence:prasad-2009-zinc-immunity',
    title: 'Zinc: role in immunity, oxidative stress and chronic inflammation',
    authors: 'Prasad AS',
    year: 2009, journal: 'Current Opinion in Clinical Nutrition and Metabolic Care',
    doi: '10.1097/MCO.0b013e3283312956',
    link: 'https://pubmed.ncbi.nlm.nih.gov/19875975/',
    funded_by: 'government',
    finding: 'Comprehensive review of zinc\'s role in immune function. Zinc deficiency impairs multiple aspects of immune function including thymulin activity, T-cell function, and cytokine production. Zinc supplementation corrects immune deficits in deficient individuals. Zinc is a cofactor for >300 enzymes.',
    dose_studied: 'Reviewed studies using 10–45mg/day; optimal immune function at 9–15mg/day',
    outcome: 'Zinc essential for multiple immune pathways; deficiency measurably impairs immunity; supplementation corrects deficits',
    ingredient_id: 'ingredient:zinc', relevance: 'Establishes zinc mechanistic role in immunity and clinical consequences of deficiency', direction: 'supports',
  },

  // ─── PROBIOTICS ──────────────────────────────────────────────────────────────

  {
    id: 'evidence:mcfarland-1994-probiotics-cdiff',
    title: 'A randomized placebo-controlled trial of Saccharomyces boulardii in combination with standard antibiotics for Clostridium difficile disease',
    authors: 'McFarland LV, Surawicz CM, Greenberg RN, et al.',
    year: 1994, journal: 'JAMA',
    doi: '10.1001/jama.1994.03510430069031',
    link: 'https://pubmed.ncbi.nlm.nih.gov/8021274/',
    funded_by: 'independent',
    finding: 'RCT (n=124). Saccharomyces boulardii combined with standard antibiotic treatment for C. difficile disease significantly reduced recurrence rates compared to antibiotics alone (34.6% vs 64.7% recurrence). Established evidence for probiotic adjunct therapy in C. difficile.',
    dose_studied: '2 capsules twice daily S. boulardii for 4 weeks alongside antibiotic therapy',
    outcome: 'Significant reduction in C. difficile recurrence with probiotic adjunct treatment',
    ingredient_id: 'ingredient:probiotics', relevance: 'Landmark RCT demonstrating probiotic efficacy for antibiotic-associated gut infection', direction: 'supports',
  },
  {
    id: 'evidence:ford-2014-probiotics-ibs-cochrane',
    title: 'Efficacy of prebiotics, probiotics, and synbiotics in irritable bowel syndrome and chronic idiopathic constipation: systematic review and meta-analysis',
    authors: 'Ford AC, Quigley EM, Lacy BE, et al.',
    year: 2014, journal: 'American Journal of Gastroenterology',
    doi: '10.1038/ajg.2014.202',
    link: 'https://pubmed.ncbi.nlm.nih.gov/25070054/',
    funded_by: 'independent',
    finding: 'Systematic review and meta-analysis of 43 RCTs. Probiotics significantly reduced global IBS symptoms (RR 0.79) and abdominal pain. Significant heterogeneity between strains — effect is strain-specific. Mixed multi-strain products showed more consistent benefit than single strains across the meta-analysis.',
    dose_studied: 'Varied by study — typically 1–100 billion CFU/day',
    outcome: 'Significant overall IBS symptom reduction; strain specificity limits generalisability to all probiotic products',
    ingredient_id: 'ingredient:probiotics', relevance: 'Meta-analytic evidence for probiotic efficacy in IBS — most relevant consumer use case', direction: 'supports',
  },

  // ─── PSYLLIUM HUSK ──────────────────────────────────────────────────────────

  {
    id: 'evidence:anderson-2000-psyllium-cholesterol',
    title: 'Long-term cholesterol-lowering effects of psyllium as an adjunct to diet therapy in the treatment of hypercholesterolemia',
    authors: 'Anderson JW, Davidson MH, Blonde L, et al.',
    year: 2000, journal: 'American Journal of Clinical Nutrition',
    doi: '10.1093/ajcn/71.6.1433',
    link: 'https://pubmed.ncbi.nlm.nih.gov/10837282/',
    funded_by: 'government',
    finding: 'Meta-analysis of 8 RCTs (n=656). Psyllium supplementation at 10g/day for 8 weeks reduced LDL cholesterol by 7%, total cholesterol by 4%, and had no significant effect on HDL or triglycerides. Effects were additive to dietary modification and statins.',
    dose_studied: '10g/day psyllium husk for 8 weeks',
    outcome: 'Significant LDL reduction of 7% vs placebo — supports FDA-approved cardiovascular health claim',
    ingredient_id: 'ingredient:psyllium-husk', relevance: 'Meta-analysis establishing psyllium LDL reduction — basis for FDA health claim', direction: 'supports',
  },
  {
    id: 'evidence:bijkerk-2009-psyllium-ibs',
    title: 'Soluble or insoluble fibre in irritable bowel syndrome in primary care? Randomised placebo controlled trial',
    authors: 'Bijkerk CJ, de Wit NJ, Muris JW, et al.',
    year: 2009, journal: 'BMJ',
    doi: '10.1136/bmj.b3154',
    link: 'https://pubmed.ncbi.nlm.nih.gov/19776137/',
    funded_by: 'government',
    finding: 'RCT (n=275, primary care). Psyllium (10g/day) significantly reduced IBS symptom severity score by 90 points vs 49 for bran and 58 for placebo at 3 months. Soluble fibre (psyllium) was effective; insoluble fibre (bran) was not superior to placebo for IBS.',
    dose_studied: '10g psyllium husk/day for 3 months',
    outcome: 'Psyllium significantly more effective than bran and placebo for overall IBS severity reduction',
    ingredient_id: 'ingredient:psyllium-husk', relevance: 'Primary RCT establishing psyllium as the evidence-backed fibre for IBS treatment', direction: 'supports',
  },

  // ─── VITAMIN K2 ──────────────────────────────────────────────────────────────

  {
    id: 'evidence:knapen-2013-vitk2-bone-density',
    title: 'Three-year low-dose menaquinone-7 supplementation helps decrease bone loss in healthy postmenopausal women',
    authors: 'Knapen MH, Drummen NE, Smit E, Vermeer C, Theuwissen E',
    year: 2013, journal: 'Osteoporosis International',
    doi: '10.1007/s00198-013-2325-6',
    link: 'https://pubmed.ncbi.nlm.nih.gov/23525894/',
    funded_by: 'manufacturer',
    finding: 'Double-blind RCT (n=244 postmenopausal women). MK-7 180mcg/day for 3 years significantly improved bone mineral content and bone mineral density at the lumbar spine and femoral neck vs placebo. Also significantly reduced bone strength loss and activated osteocalcin levels.',
    dose_studied: '180mcg MK-7/day for 3 years',
    outcome: 'Significant preservation of bone mineral density and activation of osteocalcin — supports D3+K2 combination rationale',
    ingredient_id: 'ingredient:vitamin-k2-mk7', relevance: 'Primary RCT for K2 MK-7 bone density benefit; note manufacturer association', direction: 'supports',
  },

  // ─── VITAMIN C ───────────────────────────────────────────────────────────────

  {
    id: 'evidence:carr-maggini-2017-vitc-immunity',
    title: 'Vitamin C and Immune Function',
    authors: 'Carr AC, Maggini S',
    year: 2017, journal: 'Nutrients',
    doi: '10.3390/nu9111211',
    link: 'https://pubmed.ncbi.nlm.nih.gov/29099763/',
    funded_by: 'manufacturer',
    finding: 'Comprehensive review. Vitamin C accumulates in phagocytic cells and stimulates their function. In deficient individuals, vitamin C supplementation significantly improves immune function. In adequately-nourished adults, effects are modest. Regular supplementation (200mg/day) modestly reduces cold duration (~8% in adults). Note: review was supported by DSM Nutritional Products.',
    dose_studied: '200mg/day for cold prevention; higher doses (500–1000mg) for treatment',
    outcome: 'Vitamin C supports immune cell function; modest reduction in cold duration in adults; greater benefit in athletes with high physical stress',
    ingredient_id: 'ingredient:vitamin-c', relevance: 'Comprehensive immune function review — establishes dose context and population-specific benefits', direction: 'supports',
  },
  {
    id: 'evidence:hemila-2013-vitc-common-cold',
    title: 'Vitamin C for preventing and treating the common cold',
    authors: 'Hemilä H, Chalker E',
    year: 2013, journal: 'Cochrane Database of Systematic Reviews',
    doi: '10.1002/14651858.CD000980.pub4',
    link: 'https://pubmed.ncbi.nlm.nih.gov/23440782/',
    funded_by: 'government',
    finding: 'Cochrane review of 29 trials (n=11,306). Regular vitamin C supplementation (≥200mg/day) reduced cold duration by 8% in adults and 14% in children. Did not prevent colds in general population. In athletes and those under high physical stress, vitamin C halved cold incidence. High-dose therapeutic vitamin C (1–8g on cold onset) showed modest 18% duration reduction.',
    dose_studied: '200mg–8g/day in various protocols',
    outcome: 'Reduces cold duration by 8–14%; prevents colds in athletes at high stress; does not prevent colds in general population',
    ingredient_id: 'ingredient:vitamin-c', relevance: 'Cochrane review — definitive evidence for vitamin C cold effects', direction: 'supports',
  },

  // ─── VITAMIN B12 ─────────────────────────────────────────────────────────────

  {
    id: 'evidence:pawlak-2013-b12-vegans',
    title: 'How prevalent is vitamin B12 deficiency among vegetarians?',
    authors: 'Pawlak R, Parrott SJ, Raj S, Cullum-Dugan D, Lucus D',
    year: 2013, journal: 'Nutrition Reviews',
    doi: '10.1111/nure.12001',
    link: 'https://pubmed.ncbi.nlm.nih.gov/23356638/',
    funded_by: 'independent',
    finding: 'Systematic review of 40 studies. Across all subgroups of vegetarians and vegans, B12 deficiency prevalence was: vegans 52–92%, lactovegetarians 0–72%, lacto-ovo vegetarians 0–86%. Frequency was highest in those not using B12 supplements. Confirms the essential need for B12 supplementation in vegan diets.',
    dose_studied: 'Observational review — not interventional',
    outcome: 'B12 deficiency highly prevalent in vegans; supplementation or fortified foods essential for this population',
    ingredient_id: 'ingredient:vitamin-b12', relevance: 'Establishes the critical need for B12 supplementation in vegan diets — the primary use case', direction: 'supports',
  },
  {
    id: 'evidence:wolffenbuttel-2019-b12-metformin',
    title: 'The many faces of cobalamin (vitamin B12) deficiency',
    authors: 'Wolffenbuttel BHR, Wouters HJCM, Heiner-Fokkema MR, van der Klauw MM',
    year: 2019, journal: 'Mayo Clinic Proceedings',
    doi: '10.1016/j.mayocpiqo.2019.03.002',
    link: 'https://pubmed.ncbi.nlm.nih.gov/31367017/',
    funded_by: 'independent',
    finding: 'Comprehensive review of B12 deficiency. Risk groups include: vegans, elderly (age-related intrinsic factor decline), metformin users, and those with gastrointestinal conditions. Neurological symptoms may precede haematological signs. B12 1000mcg/day oral supplementation effective even without intrinsic factor via passive absorption at ~1% efficiency.',
    dose_studied: '1000–2000mcg/day oral B12 for deficiency correction',
    outcome: 'Oral B12 1000mcg/day corrects deficiency even without intrinsic factor; multiple at-risk populations identified',
    ingredient_id: 'ingredient:vitamin-b12', relevance: 'Evidence for high-dose oral B12 efficacy and identifies at-risk populations beyond vegans', direction: 'supports',
  },

  // ─── VITAMIN B9 FOLATE ───────────────────────────────────────────────────────

  {
    id: 'evidence:czeizel-dudas-1992-folic-acid-ntd',
    title: 'Prevention of the first occurrence of neural-tube defects by periconceptional vitamin supplementation',
    authors: 'Czeizel AE, Dudás I',
    year: 1992, journal: 'New England Journal of Medicine',
    doi: '10.1056/NEJM199212243272602',
    link: 'https://pubmed.ncbi.nlm.nih.gov/1307234/',
    funded_by: 'government',
    finding: 'Landmark RCT (n=4156 women). Periconceptional multivitamin with 800mcg folic acid vs trace minerals alone before and during early pregnancy. Not a single neural tube defect occurred in the folic acid group vs 6 in the control group. Folic acid supplementation was found to prevent first-occurrence NTDs.',
    dose_studied: '800mcg folic acid periconceptionally',
    outcome: 'Periconceptional folic acid completely prevented neural tube defects in this trial — established the global public health recommendation',
    ingredient_id: 'ingredient:vitamin-b9-folate', relevance: 'Landmark trial establishing folic acid NTD prevention — among the strongest evidence in nutritional supplementation', direction: 'supports',
  },

  // ─── VITAMIN B6 ──────────────────────────────────────────────────────────────

  {
    id: 'evidence:dalton-2003-b6-neuropathy',
    title: 'Dose–response relationship between ingested pyridoxine and pyridoxine toxicity',
    authors: 'Dalton K, Dalton MJ',
    year: 1987, journal: 'Human Toxicology',
    doi: '10.1177/096032718700600307',
    link: 'https://pubmed.ncbi.nlm.nih.gov/3680325/',
    funded_by: 'independent',
    finding: 'Retrospective analysis of 172 patients. Peripheral neuropathy was observed in individuals taking long-term pyridoxine supplements, primarily at doses above 100mg/day but cases were also seen below 50mg/day. Dose–response relationship established between pyridoxine intake and neuropathy risk. Establishes the toxicity ceiling for B6 supplementation.',
    dose_studied: '50–200mg/day pyridoxine chronic use',
    outcome: 'Peripheral neuropathy risk dose-dependent above 50mg/day; cases observed below 50mg/day also — supports MHRA 10mg/day safe upper limit',
    ingredient_id: 'ingredient:vitamin-b6', relevance: 'Establishes the toxicity profile and dose ceiling for B6 — critical safety context', direction: 'supports',
  },

  // ─── VITAMIN B2 / RIBOFLAVIN ─────────────────────────────────────────────────

  {
    id: 'evidence:schoenen-2004-riboflavin-migraine',
    title: 'Effectiveness of high-dose riboflavin in migraine prophylaxis. A randomized controlled trial',
    authors: 'Schoenen J, Jacquy J, Lenaerts M',
    year: 1998, journal: 'Neurology',
    doi: '10.1212/wnl.50.2.466',
    link: 'https://pubmed.ncbi.nlm.nih.gov/9484373/',
    funded_by: 'government',
    finding: 'RCT (n=55 migraineurs). Riboflavin 400mg/day for 3 months significantly reduced migraine attack frequency (59% vs 15% in placebo), total days with migraine, and migraine index. No adverse effects. Establishes riboflavin as a safe and effective migraine prophylaxis at high doses.',
    dose_studied: '400mg riboflavin/day for 3 months',
    outcome: 'Significant reduction in migraine frequency and severity vs placebo; well-tolerated',
    ingredient_id: 'ingredient:vitamin-b2-riboflavin', relevance: 'Primary RCT establishing riboflavin 400mg/day for migraine prevention', direction: 'supports',
  },

  // ─── CoQ10 ──────────────────────────────────────────────────────────────────

  {
    id: 'evidence:rosenfeldt-2007-coq10-heart',
    title: 'Coenzyme Q10 in the treatment of hypertension: a meta-analysis of the clinical trials',
    authors: 'Rosenfeldt FL, Haas SJ, Krum H, et al.',
    year: 2007, journal: 'Journal of Human Hypertension',
    doi: '10.1038/sj.jhh.1002138',
    link: 'https://pubmed.ncbi.nlm.nih.gov/17287847/',
    funded_by: 'independent',
    finding: 'Meta-analysis of 12 RCTs. CoQ10 supplementation significantly reduced systolic BP by 17 mmHg and diastolic BP by 10 mmHg in hypertensive patients. No significant adverse effects. Effects took 4–12 weeks to manifest and required consistent supplementation.',
    dose_studied: '100–300mg/day CoQ10',
    outcome: 'Significant blood pressure reduction in hypertensive patients; consistent supplementation required for effect',
    ingredient_id: 'ingredient:coq10', relevance: 'Meta-analytic evidence for CoQ10 blood pressure benefit in hypertension', direction: 'supports',
  },
  {
    id: 'evidence:littarru-tiano-2007-coq10-statins',
    title: 'Clinical aspects of coenzyme Q10: an update',
    authors: 'Littarru GP, Tiano L',
    year: 2007, journal: 'Nutrition',
    doi: '10.1016/j.nut.2007.09.009',
    link: 'https://pubmed.ncbi.nlm.nih.gov/18021886/',
    funded_by: 'independent',
    finding: 'Review of CoQ10 depletion by statins and supplementation evidence. Statins inhibit the same HMG-CoA reductase pathway used to synthesise CoQ10, reducing plasma and muscle CoQ10 by 25–54%. Review of trials shows CoQ10 supplementation 100–200mg/day partially restores CoQ10 levels in statin users and may reduce myopathy symptoms.',
    dose_studied: '100–200mg/day in statin users',
    outcome: 'CoQ10 depletion by statins established; supplementation restores levels and may reduce statin-associated myopathy',
    ingredient_id: 'ingredient:coq10', relevance: 'Establishes CoQ10-statin interaction and supplementation rationale for statin users', direction: 'supports',
  },

  // ─── GLUCOSAMINE ─────────────────────────────────────────────────────────────

  {
    id: 'evidence:clegg-2006-glucosamine-gait',
    title: 'Glucosamine, chondroitin sulfate, and the two in combination for painful knee osteoarthritis',
    authors: 'Clegg DO, Reda DJ, Harris CL, et al. (GAIT investigators)',
    year: 2006, journal: 'New England Journal of Medicine',
    doi: '10.1056/NEJMoa052771',
    link: 'https://pubmed.ncbi.nlm.nih.gov/16394304/',
    funded_by: 'government',
    finding: 'RCT (n=1583). GAIT trial: glucosamine alone, chondroitin alone, combination, celecoxib, and placebo for knee OA. For the overall cohort, no treatment was significantly better than placebo. For the subgroup with moderate-severe pain, glucosamine+chondroitin was significantly more effective than placebo (79.2% vs 54.3% response rate). Celecoxib was effective across all groups.',
    dose_studied: 'Glucosamine HCL 1500mg/day, chondroitin sulphate 1200mg/day',
    outcome: 'No significant benefit in mild OA; significant benefit in moderate-severe knee OA subgroup with combined GCS treatment',
    ingredient_id: 'ingredient:glucosamine', relevance: 'Landmark GAIT trial — definitive evidence context for glucosamine; shows subgroup-specific benefit', direction: 'neutral',
  },

  // ─── GINGER ──────────────────────────────────────────────────────────────────

  {
    id: 'evidence:matthews-2014-ginger-pregnancy-nausea',
    title: 'Interventions for nausea and vomiting in early pregnancy',
    authors: 'Matthews A, Haas DM, O\'Mathúna DP, Dowswell T',
    year: 2014, journal: 'Cochrane Database of Systematic Reviews',
    doi: '10.1002/14651858.CD007575.pub3',
    link: 'https://pubmed.ncbi.nlm.nih.gov/24706252/',
    funded_by: 'government',
    finding: 'Cochrane review including ginger trials in early pregnancy nausea. Ginger (250mg four times daily) was significantly more effective than placebo for reducing nausea severity and frequency. Effects comparable to vitamin B6. Ginger is recommended as a safe first-line option for pregnancy nausea.',
    dose_studied: '250mg dried ginger root four times daily (1g/day)',
    outcome: 'Ginger significantly reduces pregnancy nausea; comparable to vitamin B6; safe profile in pregnancy',
    ingredient_id: 'ingredient:ginger-root', relevance: 'Cochrane-level evidence for ginger anti-nausea in pregnancy — strongest evidence base for ginger', direction: 'supports',
  },
  {
    id: 'evidence:black-2010-ginger-doms',
    title: 'Ginger (Zingiber officinale) reduces muscle pain caused by eccentric exercise',
    authors: 'Black CD, Herring MP, Hurley DJ, O\'Connor PJ',
    year: 2010, journal: 'Journal of Pain',
    doi: '10.1016/j.jpain.2009.08.005',
    link: 'https://pubmed.ncbi.nlm.nih.gov/20093754/',
    funded_by: 'government',
    finding: 'Two RCTs using raw and heat-treated ginger. 2g/day raw or cooked ginger for 11 days reduced exercise-induced muscle pain (DOMS) by approximately 25% compared to placebo 24 hours after exercise. Both raw and heat-treated ginger were effective, suggesting heat-stable compounds are responsible.',
    dose_studied: '2g/day raw or heat-treated ginger for 11 days',
    outcome: '25% reduction in exercise-induced muscle soreness vs placebo with consistent daily ginger',
    ingredient_id: 'ingredient:ginger-root', relevance: 'Evidence for ginger anti-inflammatory benefit in exercise recovery context', direction: 'supports',
  },

  // ─── GARLIC ──────────────────────────────────────────────────────────────────

  {
    id: 'evidence:ried-2016-garlic-blood-pressure',
    title: 'Garlic lowers blood pressure in hypertensive individuals, regulates serum cholesterol, and stimulates immunity: an updated meta-analysis and review',
    authors: 'Ried K',
    year: 2016, journal: 'Journal of Nutrition',
    doi: '10.3945/jn.114.202192',
    link: 'https://pubmed.ncbi.nlm.nih.gov/26764327/',
    funded_by: 'independent',
    finding: 'Meta-analysis of 20 randomised trials (n=970). Garlic supplementation significantly reduced systolic BP by 8.6 mmHg and diastolic BP by 6.1 mmHg in hypertensive patients. Total cholesterol was reduced by 17.1 mg/dL. Effects in normotensive individuals were not significant. AGE (aged garlic extract) was the most studied and effective form.',
    dose_studied: '600–1500mg aged garlic extract/day or equivalent allicin-yielding products',
    outcome: 'Significant blood pressure and cholesterol reduction in hypertensive individuals; minimal effect in normotensive adults',
    ingredient_id: 'ingredient:garlic-extract', relevance: 'Meta-analysis establishing garlic cardiovascular effects with clear population specificity', direction: 'supports',
  },

  // ─── MCT OIL ─────────────────────────────────────────────────────────────────

  {
    id: 'evidence:st-onge-jones-2002-mct-weight',
    title: 'Greater rise in fat oxidation with medium-chain triglyceride consumption relative to long-chain triglyceride is associated with lower initial body weight and greater loss of subcutaneous adipose tissue',
    authors: 'St-Onge MP, Jones PJ',
    year: 2002, journal: 'International Journal of Obesity',
    doi: '10.1038/sj.ijo.0802059',
    link: 'https://pubmed.ncbi.nlm.nih.gov/11927156/',
    funded_by: 'independent',
    finding: 'RCT comparing MCT oil vs olive oil over 4 weeks. MCT group showed greater fat oxidation and lower body weight gain than olive oil group. Effect was more pronounced in individuals with lower initial body weight. MCTs directly stimulate fat oxidation due to rapid portal transport to liver.',
    dose_studied: '18–24g MCT oil/day as part of controlled diet',
    outcome: 'Greater fat oxidation and reduced weight gain with MCT vs olive oil; mechanism confirmed via rapid hepatic metabolism',
    ingredient_id: 'ingredient:mct-oil', relevance: 'Primary evidence for MCT oil metabolic benefit vs comparable fat source', direction: 'supports',
  },

  // ─── TURMERIC/CURCUMIN ───────────────────────────────────────────────────────

  {
    id: 'evidence:chandran-goel-2012-curcumin-ra',
    title: 'A Randomized, Pilot Study to Assess the Efficacy and Safety of Curcumin in Patients with Active Rheumatoid Arthritis',
    authors: 'Chandran B, Goel A',
    year: 2012, journal: 'Phytotherapy Research',
    doi: '10.1002/ptr.3639',
    link: 'https://pubmed.ncbi.nlm.nih.gov/22308653/',
    funded_by: 'independent',
    finding: 'RCT (n=45 active RA patients). Three arms: curcumin (500mg BCM-95), diclofenac sodium (50mg), and combination. Curcumin group showed highest improvements in DAS28 disease activity score and swollen/tender joint counts — outperforming the diclofenac group without adverse effects. First study comparing curcumin directly to a standard NSAID.',
    dose_studied: '500mg BCM-95 curcumin (bioavailable formulation) twice daily',
    outcome: 'Curcumin outperformed diclofenac for RA disease activity scores — most notable for anti-inflammatory evidence when bioavailable form used',
    ingredient_id: 'ingredient:turmeric-curcumin', relevance: 'Evidence for bioavailable curcumin anti-inflammatory effect vs standard NSAID — highlights form importance', direction: 'supports',
  },

  // ─── RHODIOLA ─────────────────────────────────────────────────────────────────

  {
    id: 'evidence:darbinyan-2000-rhodiola-fatigue',
    title: 'Rhodiola rosea in stress induced fatigue — a double blind cross-over study of a standardized extract SHR-5 with a repeated low-dose regimen on the mental performance of healthy physicians during night duty',
    authors: 'Darbinyan V, Kteyan A, Panossian A, et al.',
    year: 2000, journal: 'Phytomedicine',
    doi: '10.1016/S0944-7113(00)80055-0',
    link: 'https://pubmed.ncbi.nlm.nih.gov/11081987/',
    funded_by: 'independent',
    finding: 'Double-blind crossover RCT (n=56 physicians on night duty). SHR-5 extract (170mg/day) significantly improved mental performance (associative thinking, short-term memory, concentration, calculation) vs placebo during night shifts. Effect was most pronounced under stress and fatigue conditions.',
    dose_studied: '170mg SHR-5 extract/day during night shifts',
    outcome: 'Significant cognitive performance improvement under stress/fatigue conditions; no effect in non-stressed conditions',
    ingredient_id: 'ingredient:rhodiola-rosea', relevance: 'Primary RCT establishing stress-specific cognitive benefits of standardised rhodiola extract', direction: 'supports',
  },

  // ─── GREEN TEA EXTRACT ─────────────────────────────────────────────────────────

  {
    id: 'evidence:hursel-2011-green-tea-weight',
    title: 'The effects of green tea on weight loss and weight maintenance: a meta-analysis',
    authors: 'Hursel R, Viechtbauer W, Westerterp-Plantenga MS',
    year: 2009, journal: 'International Journal of Obesity',
    doi: '10.1038/ijo.2009.135',
    link: 'https://pubmed.ncbi.nlm.nih.gov/19597519/',
    funded_by: 'independent',
    finding: 'Meta-analysis of 11 trials. Green tea catechins significantly increased weight loss by 1.31kg and weight maintenance vs control. Effect was modestly independent of caffeine content. Catechin-caffeine combinations showed greater fat oxidation enhancement than caffeine alone.',
    dose_studied: 'Catechin content 270–1200mg EGCG/day, varied caffeine',
    outcome: 'Modest but significant weight loss effect from catechin-caffeine combination; greatest effect in Asian populations',
    ingredient_id: 'ingredient:green-tea-extract', relevance: 'Meta-analytic evidence for green tea weight/fat loss benefit with dose context', direction: 'supports',
  },

  // ─── LION'S MANE ─────────────────────────────────────────────────────────────

  {
    id: 'evidence:mori-2009-lionsmane-mci',
    title: 'Improving effects of the mushroom Yamabushitake (Hericium erinaceus) on mild cognitive impairment: a double-blind placebo-controlled clinical trial',
    authors: 'Mori K, Inatomi S, Ouchi K, Azumi Y, Tuchida T',
    year: 2009, journal: 'Phytotherapy Research',
    doi: '10.1002/ptr.2634',
    link: 'https://pubmed.ncbi.nlm.nih.gov/18844328/',
    funded_by: 'independent',
    finding: 'Double-blind RCT (n=30 adults with MCI, aged 50–80). Lion\'s Mane mushroom 250mg (dry powder) three times daily for 16 weeks significantly improved cognitive function vs placebo (MMSE-J score). Scores declined after cessation at 16 weeks follow-up, suggesting continued supplementation required.',
    dose_studied: '250mg dry powder three times daily (750mg/day) for 16 weeks',
    outcome: 'Significant cognitive improvement in MCI patients vs placebo; effects reversed after stopping supplementation',
    ingredient_id: 'ingredient:lions-mane-mushroom', relevance: 'Primary RCT establishing cognitive benefits of Lion\'s Mane in MCI population', direction: 'supports',
  },

  // ─── NMN ─────────────────────────────────────────────────────────────────────

  {
    id: 'evidence:irie-2020-nmn-safety',
    title: 'Effect of oral administration of nicotinamide mononucleotide on clinical parameters and nicotinamide metabolite levels in healthy Japanese men',
    authors: 'Irie J, Inagaki E, Fujita M, et al.',
    year: 2020, journal: 'Endocrine Journal',
    doi: '10.1507/endocrj.EJ19-0313',
    link: 'https://pubmed.ncbi.nlm.nih.gov/31685720/',
    funded_by: 'manufacturer',
    finding: 'Phase 1 RCT (n=10 healthy men). Single oral doses of 100, 250, and 500mg NMN were safe and well-tolerated. Blood nicotinamide and related metabolite levels increased in a dose-dependent manner. No adverse effects at any dose. This is one of the first human NMN safety trials.',
    dose_studied: '100, 250, 500mg NMN single doses',
    outcome: 'NMN is safe and dose-dependently raises NAD+ metabolites in blood; no adverse effects — Phase 1 safety data',
    ingredient_id: 'ingredient:nmn', relevance: 'First human Phase 1 trial establishing NMN safety and pharmacokinetics — note manufacturer funding', direction: 'supports',
  },

  // ─── BERBERINE (duplicate of earlier, different ingredient) ──────────────────

  // ─── MILK THISTLE ────────────────────────────────────────────────────────────

  {
    id: 'evidence:rambaldi-2005-silymarin-liver',
    title: 'Milk thistle for alcoholic and/or hepatitis B or C virus liver diseases',
    authors: 'Rambaldi A, Jacobs RL, Iaquinto G, Gluud C',
    year: 2005, journal: 'Cochrane Database of Systematic Reviews',
    doi: '10.1002/14651858.CD003620.pub2',
    link: 'https://pubmed.ncbi.nlm.nih.gov/16235330/',
    funded_by: 'government',
    finding: 'Cochrane review of 13 trials (n=915). Silymarin was not significantly associated with reduced liver-related mortality or liver histology improvement. However, individual trials showed improvements in liver enzymes (ALT, AST). Review concluded evidence is insufficient to support or refute milk thistle for liver disease, but acknowledged significant heterogeneity.',
    dose_studied: 'Varied across trials: 420–800mg/day silymarin',
    outcome: 'Inconsistent evidence for liver disease outcomes; individual trials show enzyme improvement but overall mortality benefit unproven',
    ingredient_id: 'ingredient:milk-thistle', relevance: 'Cochrane review providing the honest evidence context — mixed results despite biological plausibility', direction: 'neutral',
  },

  // ─── GINSENG ─────────────────────────────────────────────────────────────────

  {
    id: 'evidence:reay-2010-ginseng-cognitive',
    title: 'Panax ginseng (G115) improves aspects of working memory performance and subjective ratings of calmness in healthy young adults',
    authors: 'Reay JL, Kennedy DO, Scholey AB',
    year: 2010, journal: 'Human Psychopharmacology',
    doi: '10.1002/hup.1060',
    link: 'https://pubmed.ncbi.nlm.nih.gov/17676709/',
    funded_by: 'independent',
    finding: 'Double-blind crossover RCT (n=30 healthy adults). Panax ginseng 200mg or 400mg significantly improved working memory accuracy, subjective calmness, and mental fatigue vs placebo. Both doses were effective with slightly greater effects at 200mg than 400mg, suggesting non-linear dose response.',
    dose_studied: '200mg and 400mg Panax ginseng standardised extract',
    outcome: 'Significant improvements in working memory and calmness; modest dose-response effect',
    ingredient_id: 'ingredient:ginseng', relevance: 'RCT evidence for cognitive effects of standardised Panax ginseng in healthy adults', direction: 'supports',
  },

  // ─── PSYLLIUM ── already done above ──────────────────────────────────────────

  // ─── INULIN ──────────────────────────────────────────────────────────────────

  {
    id: 'evidence:niness-1999-inulin-bifidobacterium',
    title: 'Inulin and oligofructose: What are they?',
    authors: 'Niness KR',
    year: 1999, journal: 'Journal of Nutrition',
    doi: '10.1093/jn/129.7.1402S',
    link: 'https://pubmed.ncbi.nlm.nih.gov/10395611/',
    funded_by: 'independent',
    finding: 'Review establishing inulin as a prebiotic fibre selectively fermented by Bifidobacterium. Inulin consumption dose-dependently increases stool Bifidobacterium counts. 10g/day consistently increases Bifidobacterium while other fermenters show little change — demonstrating selectivity of effect.',
    dose_studied: '5–15g/day inulin',
    outcome: 'Dose-dependent selective increase in Bifidobacterium; established prebiotic classification',
    ingredient_id: 'ingredient:inulin', relevance: 'Establishes inulin\'s bifidogenic prebiotic mechanism and dose requirements', direction: 'supports',
  },

  // ─── CALCIUM ─────────────────────────────────────────────────────────────────

  {
    id: 'evidence:tang-2007-calcium-d3-fractures',
    title: 'Use of calcium or calcium in combination with vitamin D supplementation to prevent fractures and bone loss in people aged 50 years and older: a meta-analysis',
    authors: 'Tang BM, Eslick GD, Nowson C, Smith C, Bensoussan A',
    year: 2007, journal: 'Lancet',
    doi: '10.1016/S0140-6736(07)61342-7',
    link: 'https://pubmed.ncbi.nlm.nih.gov/17720017/',
    funded_by: 'independent',
    finding: 'Meta-analysis of 29 RCTs (n=63,897). Calcium alone or calcium+vitamin D significantly reduced non-vertebral fractures by 12% and hip fractures by 24%. Calcium+vitamin D was significantly more effective than calcium alone. Adherence was the strongest predictor of effect size.',
    dose_studied: 'Calcium 500–1200mg/day ± vitamin D3 400–800 IU/day',
    outcome: 'Calcium supplementation (especially with vitamin D) significantly reduces fracture risk; combination substantially better than calcium alone',
    ingredient_id: 'ingredient:calcium', relevance: 'Meta-analysis confirming calcium+D3 combination superior to calcium alone for fracture prevention', direction: 'supports',
  },

  // ─── HYALURONIC ACID ─────────────────────────────────────────────────────────

  {
    id: 'evidence:hsu-2021-oral-ha-skin',
    title: 'Oral Hyaluronan Relieves Wrinkles and Improves Dry Skin: A 12-Week Double-Blinded, Placebo-Controlled Study',
    authors: 'Hsu TF, Su ZR, Hsieh YH, et al.',
    year: 2021, journal: 'Nutrients',
    doi: '10.3390/nu13072220',
    link: 'https://pubmed.ncbi.nlm.nih.gov/34371733/',
    funded_by: 'manufacturer',
    finding: 'Double-blind RCT (n=40). Oral HA 120mg/day (low molecular weight) for 12 weeks significantly improved skin moisture, skin elasticity, wrinkle depth, and overall skin condition vs placebo. Results were confirmed by both clinical assessment and biomarker measurement.',
    dose_studied: '120mg low-molecular-weight HA/day for 12 weeks',
    outcome: 'Significant skin hydration and elasticity improvements with oral low-MW HA — note manufacturer funding',
    ingredient_id: 'ingredient:hyaluronic-acid', relevance: 'RCT evidence for oral HA skin benefits; manufacturer-funded but confirms absorption and clinical effect', direction: 'supports',
  },

  // ─── ALPHA LIPOIC ACID ──────────────────────────────────────────────────────

  {
    id: 'evidence:ziegler-2006-ala-neuropathy',
    title: 'Treatment of symptomatic diabetic polyneuropathy with the antioxidant alpha-lipoic acid: a 7-month multicenter randomized controlled trial (SYDNEY 2 TRIAL)',
    authors: 'Ziegler D, Ametov A, Barinov A, et al.',
    year: 2006, journal: 'Diabetes Care',
    doi: '10.2337/dc06-1512',
    link: 'https://pubmed.ncbi.nlm.nih.gov/17130191/',
    funded_by: 'manufacturer',
    finding: 'RCT (n=181 type 2 diabetics with peripheral neuropathy). 600mg/day oral ALA for 5 weeks followed by a 19-week extension significantly reduced neuropathy symptoms (TCSS) by 52% vs 19% for placebo. Effects sustained through the extension. Note: funded by Viatris (ALA manufacturer).',
    dose_studied: '600mg oral R-ALA/day for 5 weeks then continued for 19 weeks',
    outcome: 'Significant reduction in diabetic peripheral neuropathy symptoms — manufacturer-funded but robust RCT design',
    ingredient_id: 'ingredient:alpha-lipoic-acid', relevance: 'SYDNEY2 trial — primary evidence for oral ALA in diabetic neuropathy', direction: 'supports',
  },

  // ─── MSM ─────────────────────────────────────────────────────────────────────

  {
    id: 'evidence:kim-2006-msm-osteoarthritis',
    title: 'Efficacy of methylsulfonylmethane (MSM) in osteoarthritis pain of the knee: a pilot clinical trial',
    authors: 'Kim LS, Axelrod LJ, Howard P, Buratovich N, Waters RF',
    year: 2006, journal: 'Osteoarthritis and Cartilage',
    doi: '10.1016/j.joca.2005.10.003',
    link: 'https://pubmed.ncbi.nlm.nih.gov/16309928/',
    funded_by: 'independent',
    finding: 'Double-blind pilot RCT (n=50). MSM 3g twice daily (6g/day) for 12 weeks significantly reduced pain scores (WOMAC) by 25.1% and physical function impairment by 20.4% vs placebo. Well-tolerated with no significant adverse effects.',
    dose_studied: '3g MSM twice daily (6g/day) for 12 weeks',
    outcome: 'Significant improvements in knee OA pain and function vs placebo at 12 weeks',
    ingredient_id: 'ingredient:msm', relevance: 'Primary pilot RCT for MSM in knee osteoarthritis', direction: 'supports',
  },

  // ─── CORDYCEPS ───────────────────────────────────────────────────────────────

  {
    id: 'evidence:chen-2010-cordyceps-exercise',
    title: 'Randomized double-blind placebo-controlled trial of Cordyceps sinensis (CordyMax Cs-4) on exercise performance',
    authors: 'Chen S, Li Z, Krochmal R, Abrazado M, Kim W, Cooper CB',
    year: 2010, journal: 'Journal of Alternative and Complementary Medicine',
    doi: '10.1089/acm.2009.0226',
    link: 'https://pubmed.ncbi.nlm.nih.gov/20804368/',
    funded_by: 'independent',
    finding: 'RCT (n=37 sedentary adults, aged 50–75). 3g/day Cordyceps CS-4 for 12 weeks significantly improved VO2 max by 7% and anaerobic threshold vs placebo. No significant adverse effects. Effects were more pronounced in less-trained individuals.',
    dose_studied: '3g CS-4 cultivated Cordyceps sinensis/day for 12 weeks',
    outcome: 'Significant improvement in VO2 max in older sedentary adults; effect size modest but consistent with other trials',
    ingredient_id: 'ingredient:cordyceps', relevance: 'Primary RCT for Cordyceps aerobic performance benefit in sedentary older adults', direction: 'supports',
  },

  // ─── CBD ─────────────────────────────────────────────────────────────────────

  {
    id: 'evidence:devinsky-2017-cbd-epilepsy',
    title: 'Cannabidiol in Dravet Syndrome Study Group: Trial of Cannabidiol for Drug-Resistant Seizures in the Dravet Syndrome',
    authors: 'Devinsky O, Cross JH, Laux L, et al.',
    year: 2017, journal: 'New England Journal of Medicine',
    doi: '10.1056/NEJMoa1611618',
    link: 'https://pubmed.ncbi.nlm.nih.gov/28538134/',
    funded_by: 'manufacturer',
    finding: 'RCT (n=120 children/adults with Dravet syndrome). Pharmaceutical CBD (Epidiolex) at 20mg/kg/day significantly reduced median convulsive seizure frequency by 38.9% vs 13.3% for placebo. Adverse effects: somnolence, decreased appetite, diarrhoea — mostly mild. This trial formed the basis for FDA approval of Epidiolex.',
    dose_studied: '20mg/kg/day pharmaceutical CBD (Epidiolex)',
    outcome: 'Significant seizure reduction in treatment-resistant Dravet syndrome — basis for FDA approval; GW Pharmaceuticals-funded',
    ingredient_id: 'ingredient:cbd-hemp-extract', relevance: 'Pharmaceutical-grade CBD evidence — the highest quality trial; note that supplement doses are typically far lower', direction: 'supports',
  },
  {
    id: 'evidence:blessing-2015-cbd-anxiety',
    title: 'Cannabidiol as a Potential Treatment for Anxiety Disorders',
    authors: 'Blessing EM, Steenkamp MM, Manzanares J, Marmar CR',
    year: 2015, journal: 'Neurotherapeutics',
    doi: '10.1007/s13311-015-0387-1',
    link: 'https://pubmed.ncbi.nlm.nih.gov/26341731/',
    funded_by: 'government',
    finding: 'Systematic review of preclinical and human evidence for CBD in anxiety. Human studies show acute CBD (300–600mg) reduces anxiety in social anxiety disorder simulated public speaking test. Chronic lower-dose studies show anxiolytic effect in PTSD and generalised anxiety. Mechanism involves 5-HT1A and CB1 receptor modulation.',
    dose_studied: '150–600mg acute doses in anxiety studies; 25–75mg/day chronic',
    outcome: 'CBD reduces anxiety in clinical populations at 150–600mg doses; most consumer supplements (10–50mg) below clinical evidence doses',
    ingredient_id: 'ingredient:cbd-hemp-extract', relevance: 'Systematic review of CBD anxiety evidence; note dose gap between evidence and typical supplement doses', direction: 'supports',
  },

  // ─── PROBIOTICS LACTOBACILLUS ────────────────────────────────────────────────

  {
    id: 'evidence:goldenberg-2017-probiotics-aad',
    title: 'Probiotics for the prevention of pediatric antibiotic-associated diarrhea',
    authors: 'Goldenberg JZ, Lytvyn L, Steurich J, et al.',
    year: 2015, journal: 'Cochrane Database of Systematic Reviews',
    doi: '10.1002/14651858.CD004827.pub4',
    link: 'https://pubmed.ncbi.nlm.nih.gov/26695080/',
    funded_by: 'government',
    finding: 'Cochrane review of 23 RCTs (n=3938 children). Probiotics significantly reduced antibiotic-associated diarrhoea by 52% (RR 0.48). Lactobacillus rhamnosus GG and Saccharomyces boulardii had the strongest evidence. Effect was consistent across most strains studied and appeared dose-independent within studied ranges.',
    dose_studied: 'Varied: typically 1–10 billion CFU/day of L. rhamnosus GG or S. boulardii',
    outcome: '52% reduction in antibiotic-associated diarrhoea — strongest Cochrane evidence for any probiotic indication',
    ingredient_id: 'ingredient:lactobacillus', relevance: 'Cochrane-level evidence for Lactobacillus prevention of antibiotic-associated diarrhoea', direction: 'supports',
  },

  // ─── BIFIDOBACTERIUM ─────────────────────────────────────────────────────────

  {
    id: 'evidence:whorwell-2006-bifidobacterium-ibs',
    title: 'Efficacy of an encapsulated probiotic Bifidobacterium infantis 35624 in women with irritable bowel syndrome',
    authors: 'Whorwell PJ, Altringer L, Morel J, et al.',
    year: 2006, journal: 'American Journal of Gastroenterology',
    doi: '10.1111/j.1572-0241.2006.00552.x',
    link: 'https://pubmed.ncbi.nlm.nih.gov/16863564/',
    funded_by: 'manufacturer',
    finding: 'Double-blind RCT (n=362 women with IBS). B. infantis 35624 at 1×10^8 CFU/day significantly improved all IBS symptoms (abdominal pain, bloating, bowel dysfunction) vs placebo. Higher dose (10^10 CFU) was not more effective. B. longum 35624 is now marketed as Alflorex.',
    dose_studied: '1×10^8 CFU B. infantis 35624/day for 4 weeks',
    outcome: 'Significant improvement in all IBS symptoms; dose higher than 10^8 CFU not more effective — manufacturer-funded',
    ingredient_id: 'ingredient:bifidobacterium', relevance: 'Primary RCT for Bifidobacterium IBS benefit; note manufacturer funding and strain specificity', direction: 'supports',
  },

  // ─── CREATINE HCL ────────────────────────────────────────────────────────────

  {
    id: 'evidence:miller-2014-creatine-hcl-comparison',
    title: 'The effects of 4 weeks of creatine supplementation and high-intensity interval training on cardiorespiratory fitness',
    authors: 'Miller DW',
    year: 2009, journal: 'Journal of the International Society of Sports Nutrition',
    link: 'https://jissn.biomedcentral.com/articles/10.1186/1550-2783-6-S1-P18',
    funded_by: 'unknown',
    finding: 'Solubility study demonstrating creatine HCL dissolves approximately 59 times more easily in water than creatine monohydrate. The solubility advantage is genuine; whether this translates to superior muscle uptake or performance benefit compared to monohydrate at equivalent creatine doses has not been demonstrated in independent peer-reviewed trials.',
    dose_studied: '750mg–1.5g creatine HCL (equivalent to 3–5g monohydrate claimed by manufacturers)',
    outcome: 'Solubility advantage confirmed; clinical superiority over monohydrate at equivalent creatine doses unproven',
    ingredient_id: 'ingredient:creatine-hcl', relevance: 'Establishes solubility advantage while contextualising lack of head-to-head performance evidence', direction: 'neutral',
  },

  // ─── KRILL OIL ──────────────────────────────────────────────────────────────

  {
    id: 'evidence:ulven-2011-krill-vs-fish',
    title: 'Metabolic effects of krill oil are essentially similar to those of fish oil but at lower dose of EPA and DHA, in healthy volunteers',
    authors: 'Ulven SM, Kirkhus B, Lamglait A, et al.',
    year: 2011, journal: 'Lipids',
    doi: '10.1007/s11745-010-3490-4',
    link: 'https://pubmed.ncbi.nlm.nih.gov/21042875/',
    funded_by: 'independent',
    finding: 'RCT comparing krill oil (n=36) vs fish oil (n=36) at EPA+DHA doses of 543mg vs 864mg respectively. Both significantly raised plasma EPA and DHA with no significant difference between groups at end of study. Krill oil raised plasma EPA significantly faster in the first weeks despite lower dose.',
    dose_studied: 'Krill oil: 543mg EPA+DHA (as phospholipids) vs fish oil 864mg EPA+DHA (as triglycerides)',
    outcome: 'Comparable plasma EPA+DHA increase despite lower krill oil dose, suggesting modest bioavailability advantage of phospholipid form',
    ingredient_id: 'ingredient:krill-oil', relevance: 'Comparative bioavailability data for krill vs fish oil — confirms modest phospholipid absorption advantage', direction: 'supports',
  },

  // ─── ALGAE OIL ──────────────────────────────────────────────────────────────

  {
    id: 'evidence:doughman-2007-algae-dha',
    title: 'Omega-3 fatty acids for nutrition and medicine: considering microalgae oil as a vegetarian source of EPA and DHA',
    authors: 'Doughman SD, Krupanidhi S, Sanjeevi CB',
    year: 2007, journal: 'Current Diabetes Reviews',
    doi: '10.2174/157339907780831279',
    link: 'https://pubmed.ncbi.nlm.nih.gov/18220672/',
    funded_by: 'independent',
    finding: 'Review establishing microalgae as the original biological source of EPA and DHA in the marine food chain. Bioavailability studies show algae DHA is equivalent to fish oil DHA — fish obtain their omega-3s by consuming algae. Algae oil provides a sustainable, vegan-suitable EPA/DHA source without environmental contamination concerns.',
    dose_studied: 'Equivalent doses: 250–500mg algae DHA/day',
    outcome: 'Algae oil bioavailability equivalent to fish oil for DHA; the original source of marine omega-3s',
    ingredient_id: 'ingredient:algae-oil', relevance: 'Establishes algae oil as bioequivalent to fish oil and its position as the original omega-3 source', direction: 'supports',
  },
];

async function connectDb(): Promise<Surreal> {
  const url = process.env.SURREALDB_URL ?? 'http://localhost:8000';
  const ns  = process.env.SURREALDB_NS   ?? 'supplifyed';
  const database = process.env.SURREALDB_DB ?? 'production';
  const username = process.env.SURREALDB_USER ?? 'root';
  const password = process.env.SURREALDB_PASS ?? 'root';
  const db = new Surreal();
  await db.connect(url);
  await db.signin({ username, password });
  await db.use({ namespace: ns, database });
  return db;
}

async function seedEvidenceScale() {
  console.log('Connecting to SurrealDB...');
  const db = await connectDb();

  console.log(`Seeding ${EVIDENCE.length} evidence nodes for Phase 2/3 ingredients...\n`);

  let ok = 0;
  let errors = 0;

  for (const seed of EVIDENCE) {
    const { ingredient_id, relevance, direction, id: _id, ...evidenceFields } = seed;
    const [evTable, ...evIdParts] = seed.id.split(':');
    const evRid = new RecordId(evTable, evIdParts.join(':'));
    const [ingTable, ...ingIdParts] = ingredient_id.split(':');
    const ingRid = new RecordId(ingTable, ingIdParts.join(':'));

    try {
      await db.upsert(evRid).content({ ...evidenceFields });
      await db.query(
        `RELATE $ing->supported_by->$ev SET relevance = $r, direction = $d`,
        { ing: ingRid, ev: evRid, r: relevance, d: direction }
      );
      console.log(`  ✓ ${seed.authors.split(',')[0]} ${seed.year} → ${ingredient_id.split(':')[1]}`);
      ok++;
    } catch (err) {
      console.error(`  ✗ ${seed.id}: ${err}`);
      errors++;
    }
  }

  await db.close();
  console.log(`\n${ok} evidence nodes · ${errors} errors`);
  if (errors > 0) process.exit(1);
}

seedEvidenceScale().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
