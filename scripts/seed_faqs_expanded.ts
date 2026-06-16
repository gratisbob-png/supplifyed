/**
 * Seeds FAQ nodes for all expanded ingredients.
 * Run: npm run seed:faqs:expanded
 * Requires expanded ingredients seeded first.
 */

import { Surreal, RecordId } from 'surrealdb';

interface FAQSeed {
  id: string;
  question: string;
  answer: string;
  evidence_refs: string[];
  search_volume?: number;
  ingredient_id: string;
}

const FAQS: FAQSeed[] = [

  // ─── L-THEANINE ──────────────────────────────────────────────────────────────

  {
    id: 'faq:theanine-what-does-it-do',
    question: 'What does L-Theanine do?',
    answer: 'L-Theanine increases alpha brain wave activity — a brainwave pattern associated with calm, relaxed alertness without sedation. It modulates several neurotransmitters by increasing GABA, serotonin, and dopamine while reducing glutamate activity. A 2007 RCT (Kimura et al.) found 200mg L-Theanine significantly reduced physiological and psychological stress markers including heart rate and cortisol. It also partially antagonises the jittery effects of caffeine while preserving the cognitive performance benefits.',
    evidence_refs: ['evidence:kimura-2007-theanine-stress', 'evidence:owen-2008-theanine-caffeine-cognition'],
    search_volume: 60500,
    ingredient_id: 'ingredient:l-theanine',
  },
  {
    id: 'faq:theanine-with-caffeine',
    question: 'Should I take L-Theanine with caffeine?',
    answer: 'A 2008 crossover RCT (Owen et al., n=24) found combining L-Theanine (100mg) with caffeine (50mg) significantly improved attention switching speed and accuracy compared to caffeine alone, and reduced caffeine-associated jitteriness and blood pressure elevation. The combination is more effective for cognitive performance than either compound alone. A 2:1 to 1:1 ratio of L-Theanine to caffeine (e.g., 200mg L-Theanine with 100mg caffeine) is used in most combination studies. Many pre-formulated nootropic products combine both for this reason.',
    evidence_refs: ['evidence:owen-2008-theanine-caffeine-cognition', 'evidence:kimura-2007-theanine-stress'],
    search_volume: 33100,
    ingredient_id: 'ingredient:l-theanine',
  },
  {
    id: 'faq:theanine-sleep-dose',
    question: 'How much L-Theanine should I take for sleep?',
    answer: '200–400mg L-Theanine before bed is the range used in sleep studies. L-Theanine does not cause sedation directly — it promotes a calm mental state that may support sleep onset by reducing racing thoughts and anxiety. The mechanism (GABA modulation, reduced glutamate activity, increased alpha waves) is consistent with reduced sleep latency rather than direct sedation. Unlike melatonin, timing is less critical — taking it 30–60 minutes before bed is a common protocol. L-Theanine does not cause dependency or morning grogginess at typical doses.',
    evidence_refs: ['evidence:kimura-2007-theanine-stress'],
    search_volume: 22200,
    ingredient_id: 'ingredient:l-theanine',
  },
  {
    id: 'faq:theanine-safe',
    question: 'Is L-Theanine safe?',
    answer: 'L-Theanine has been found safe in clinical trials at doses up to 900mg/day in single-day studies. It has been consumed in green tea for centuries. No serious adverse effects have been reported in human trials at supplement doses. It does not cause dependency, tolerance, or withdrawal. L-Theanine is not sedating at standard doses (100–400mg) and does not impair driving or reaction time. In Japan, it is an approved food additive. It is generally considered one of the better-tolerated cognitive supplements available.',
    evidence_refs: ['evidence:kimura-2007-theanine-stress', 'evidence:owen-2008-theanine-caffeine-cognition'],
    search_volume: 18100,
    ingredient_id: 'ingredient:l-theanine',
  },

  // ─── 5-HTP ──────────────────────────────────────────────────────────────────

  {
    id: 'faq:5htp-serotonin-supplement',
    question: 'Does 5-HTP increase serotonin?',
    answer: '5-HTP is the direct precursor to serotonin in the biosynthesis pathway and crosses the blood-brain barrier more readily than L-Tryptophan. Research confirms 5-HTP supplementation increases serotonin levels in the brain. Serotonin itself cannot be supplemented (it does not cross the blood-brain barrier), making 5-HTP the most direct dietary route to raising central serotonin. The degree of increase depends on dose and individual metabolism. 5-HTP also enters the peripheral nervous system where the gut produces ~90% of total body serotonin.',
    evidence_refs: ['evidence:turner-2006-5htp-serotonin-review'],
    search_volume: 40500,
    ingredient_id: 'ingredient:5-htp',
  },
  {
    id: 'faq:5htp-antidepressant-combination',
    question: 'Can I take 5-HTP with antidepressants?',
    answer: '5-HTP should not be combined with SSRIs (fluoxetine, sertraline, etc.), SNRIs, MAOIs, triptans, or tramadol without medical supervision. These medications affect serotonin levels through different mechanisms, and combining them with 5-HTP risks serotonin syndrome — a potentially life-threatening condition characterised by agitation, rapid heart rate, high temperature, and in severe cases, seizures. If you are on any serotonergic medication, consult your prescribing physician before using 5-HTP. This is an absolute contraindication, not a precautionary note.',
    evidence_refs: ['evidence:turner-2006-5htp-serotonin-review'],
    search_volume: 22200,
    ingredient_id: 'ingredient:5-htp',
  },
  {
    id: 'faq:5htp-dose-mood',
    question: 'What dose of 5-HTP helps with mood?',
    answer: 'Clinical trials for mood and depression have used 50–300mg/day in divided doses, typically with meals. A review of the evidence (Turner et al., 2006) found consistent but modest effects on depressive symptoms in small trials. Starting at 50–100mg/day and increasing gradually allows individual response assessment and reduces nausea (the most common side effect at higher doses). 5-HTP should not replace prescribed antidepressant therapy without medical agreement. The evidence base is smaller and lower quality than that for pharmaceutical antidepressants.',
    evidence_refs: ['evidence:turner-2006-5htp-serotonin-review', 'evidence:cangiano-1992-5htp-appetite'],
    search_volume: 27100,
    ingredient_id: 'ingredient:5-htp',
  },

  // ─── BACOPA MONNIERI ─────────────────────────────────────────────────────────

  {
    id: 'faq:bacopa-memory-how-long',
    question: 'How long does Bacopa take to work?',
    answer: 'All positive clinical trials for Bacopa monnieri used supplementation for 12 weeks (3 months) minimum before measuring outcomes. A meta-analysis of 9 RCTs (Kongkeaw et al., 2014) confirmed that cognitive benefits — particularly delayed word recall — require consistent use for at least 12 weeks. Unlike stimulants, Bacopa does not work acutely. The mechanism involves progressive enhancement of synaptic transmission and antioxidant protection in neural tissue. Taking Bacopa for less than 12 weeks and not noticing effects does not indicate it is ineffective.',
    evidence_refs: ['evidence:kongkeaw-2014-bacopa-meta', 'evidence:stough-2001-bacopa-memory'],
    search_volume: 22200,
    ingredient_id: 'ingredient:bacopa-monnieri',
  },
  {
    id: 'faq:bacopa-cognitive-evidence',
    question: 'What is the evidence for Bacopa and memory?',
    answer: 'Bacopa monnieri has the strongest evidence base of any herbal nootropic for memory. A 2014 meta-analysis of 9 independent RCTs (Kongkeaw et al., n=518 healthy adults) found consistent, statistically significant improvement in memory recall. A 2001 double-blind RCT (Stough et al., n=46) found significant improvement in Rey Auditory Verbal Learning Test delayed recall after 12 weeks of 300mg/day standardised extract. The evidence is more consistent than most other herbal cognitive supplements, with multiple independent replications.',
    evidence_refs: ['evidence:kongkeaw-2014-bacopa-meta', 'evidence:stough-2001-bacopa-memory'],
    search_volume: 18100,
    ingredient_id: 'ingredient:bacopa-monnieri',
  },
  {
    id: 'faq:bacopa-dose-standardised',
    question: 'What is the correct dose of Bacopa monnieri?',
    answer: '300–450mg/day of standardised extract containing 55% bacosides is the dose used in most positive clinical trials. This is taken once daily with a fat-containing meal (the active bacosides are fat-soluble compounds). Unstandardised bulk bacopa powder requires significantly higher doses to achieve equivalent bacoside content — check the label for bacoside percentage. Taking it with food also reduces the GI side effects (nausea, loose stools) that some people experience at higher doses.',
    evidence_refs: ['evidence:stough-2001-bacopa-memory', 'evidence:kongkeaw-2014-bacopa-meta'],
    search_volume: 14800,
    ingredient_id: 'ingredient:bacopa-monnieri',
  },

  // ─── ALPHA-GPC ───────────────────────────────────────────────────────────────

  {
    id: 'faq:alphagpc-choline-source',
    question: 'Is Alpha-GPC the best choline supplement?',
    answer: 'Alpha-GPC and CDP-Choline (citicoline) are considered the two most effective choline supplements for raising brain choline levels. Alpha-GPC has approximately 40% choline content by weight and demonstrates the highest bioavailability to the brain of common choline supplements. Choline bitartrate is cheaper but has lower blood-brain barrier penetration. Lecithin provides phosphatidylcholine but in lower amounts and with poorer brain delivery. For cognitive applications, Alpha-GPC and CDP-Choline are preferred over choline bitartrate, but both have clinical evidence.',
    evidence_refs: ['evidence:moreno-2003-alphagpc-alzheimers', 'evidence:bellar-2012-alphagpc-power'],
    search_volume: 18100,
    ingredient_id: 'ingredient:alpha-gpc',
  },
  {
    id: 'faq:alphagpc-athletic-performance',
    question: 'Does Alpha-GPC improve athletic performance?',
    answer: 'A 2015 double-blind crossover RCT (Bellar et al., n=13) found 600mg Alpha-GPC taken 90 minutes before exercise significantly increased peak isometric force output versus placebo. The mechanism is thought to involve acetylcholine release at the neuromuscular junction, enhancing motor unit recruitment. For cognitive-motor performance and power output, Alpha-GPC at 600mg pre-workout is studied. Evidence is limited to small studies with manufacturer association — more independent replication is needed before strong conclusions can be drawn.',
    evidence_refs: ['evidence:bellar-2012-alphagpc-power'],
    search_volume: 12100,
    ingredient_id: 'ingredient:alpha-gpc',
  },

  // ─── GINKGO BILOBA ───────────────────────────────────────────────────────────

  {
    id: 'faq:ginkgo-dementia-prevention',
    question: 'Does ginkgo prevent dementia?',
    answer: 'No. The largest and longest ginkgo trial — the GEMS study (DeKosky et al., 2008, n=3,069, mean 6 years) — found 240mg/day of standardised EGb 761 extract did not reduce the incidence of dementia or Alzheimer\'s disease versus placebo. This government-funded trial contradicted earlier smaller positive studies. Ginkgo may improve cerebral blood flow and show acute cognitive effects in healthy adults, but the evidence does not support it as a dementia prevention strategy at current evidence levels.',
    evidence_refs: ['evidence:dekosky-2008-ginkgo-gems', 'evidence:scholey-2002-ginkgo-acute-cognition'],
    search_volume: 27100,
    ingredient_id: 'ingredient:ginkgo-biloba',
  },
  {
    id: 'faq:ginkgo-drug-interactions',
    question: 'Does ginkgo interact with blood thinners?',
    answer: 'Ginkgo biloba has anticoagulant and antiplatelet effects via ginkgolide B (a platelet-activating factor antagonist). Combining ginkgo with anticoagulants (warfarin, heparin) or antiplatelet drugs (aspirin, clopidogrel) may increase bleeding risk. Case reports of increased INR and bleeding events in patients combining ginkgo and warfarin exist. Standardised ginkgo extract should be discontinued at least 2 weeks before surgery. Inform your prescribing physician and pharmacist if you take ginkgo alongside any blood-thinning medication.',
    evidence_refs: ['evidence:dekosky-2008-ginkgo-gems'],
    search_volume: 14800,
    ingredient_id: 'ingredient:ginkgo-biloba',
  },

  // ─── NAC ─────────────────────────────────────────────────────────────────────

  {
    id: 'faq:nac-glutathione-precursor',
    question: 'Does NAC increase glutathione?',
    answer: 'Yes. NAC is the most established dietary supplement for raising intracellular glutathione levels. It provides cysteine — the rate-limiting amino acid in glutathione synthesis. A review (Millea, 2009) confirms NAC is the standard method for restoring glutathione in clinical settings including paracetamol overdose treatment (where IV acetylcysteine is the standard-of-care antidote). Direct glutathione supplementation is less established due to first-pass metabolism, making NAC the more pharmacologically reliable route.',
    evidence_refs: ['evidence:millea-2009-nac-clinical-applications'],
    search_volume: 40500,
    ingredient_id: 'ingredient:nac',
  },
  {
    id: 'faq:nac-respiratory-benefit',
    question: 'Does NAC help respiratory conditions?',
    answer: 'NAC thins respiratory mucus by breaking disulfide bonds in mucus glycoproteins — a well-established mucolytic mechanism used since the 1960s. For COPD, the BRONCUS trial (n=523, 3 years) found 600mg/day NAC significantly reduced exacerbations in the subgroup not taking inhaled corticosteroids. For chronic bronchitis and productive cough, NAC 600mg twice daily is used clinically. The mucolytic effect is separate from its antioxidant/glutathione effects. NAC is approved as a pharmaceutical mucolytic in many countries and as a supplement in others.',
    evidence_refs: ['evidence:millea-2009-nac-clinical-applications', 'evidence:decramer-2005-nac-copd'],
    search_volume: 22200,
    ingredient_id: 'ingredient:nac',
  },
  {
    id: 'faq:nac-ocd-mental-health',
    question: 'Can NAC help with OCD or mental health?',
    answer: 'NAC modulates glutamatergic signalling by restoring extracellular glutamate levels via the cystine-glutamate antiporter. This mechanism has relevance to conditions characterised by glutamate dysregulation including OCD, addictive behaviours, and depression. RCTs using 2,400–3,000mg/day NAC in OCD show significant symptom reduction — effect sizes are moderate and comparable to some pharmaceutical augmentation strategies. A review found positive trials in OCD, trichotillomania, nail biting, and addiction. Evidence quality is moderate; these are not first-line treatments.',
    evidence_refs: ['evidence:millea-2009-nac-clinical-applications'],
    search_volume: 18100,
    ingredient_id: 'ingredient:nac',
  },

  // ─── QUERCETIN ───────────────────────────────────────────────────────────────

  {
    id: 'faq:quercetin-immune-support',
    question: 'Does quercetin help with immunity?',
    answer: 'Quercetin has antiviral and immunomodulatory properties via multiple mechanisms: inhibition of NF-κB reduces inflammatory cytokine production; inhibition of histamine release from mast cells provides antihistamine effects; zinc ionophore activity (facilitating zinc entry into cells) has been proposed as relevant to antiviral activity. A 2010 RCT (Heinz et al., n=1,002) found quercetin supplementation at 500mg/day significantly reduced upper respiratory infection incidence in subjects under high physical stress. Bioavailability is low from standard quercetin — quercetin phytosome or formulations with bromelain significantly improve absorption.',
    evidence_refs: ['evidence:serban-2016-quercetin-bp-meta'],
    search_volume: 27100,
    ingredient_id: 'ingredient:quercetin',
  },
  {
    id: 'faq:quercetin-bioavailability',
    question: 'Why is quercetin bioavailability poor and what improves it?',
    answer: 'Standard quercetin aglycone has approximately 1–3% bioavailability from oral dosing — most is metabolised in the gut and liver before reaching systemic circulation. Several formulations significantly improve this: quercetin phytosome (complexed with sunflower lecithin, marketed as Quercefit) has demonstrated 20× greater bioavailability than standard quercetin in pharmacokinetic studies. Quercetin with bromelain improves absorption due to bromelain\'s protease activity. Quercetin in glucoside forms (as found naturally in food — rutin, isoquercitin) is better absorbed than the aglycone form. If using standard quercetin powder, higher doses may partially compensate for low bioavailability.',
    evidence_refs: ['evidence:serban-2016-quercetin-bp-meta'],
    search_volume: 12100,
    ingredient_id: 'ingredient:quercetin',
  },

  // ─── ELDERBERRY ──────────────────────────────────────────────────────────────

  {
    id: 'faq:elderberry-cold-flu',
    question: 'Does elderberry reduce cold and flu duration?',
    answer: 'Two double-blind RCTs show elderberry extract reduces illness duration. The Zakay-Rones 2004 trial (n=60 laboratory-confirmed influenza patients) found standardised elderberry extract reduced influenza duration from a mean of 7.1 to 3.1 days — a 4-day reduction. A 2016 independent RCT in air travellers (Tiralongo et al., n=312) found elderberry reduced cold duration by 2 days and severity by 50%. Evidence is strongest when started within 48 hours of symptom onset. Most effective preparations use Sambucus nigra standardised extract, not raw elderberry.',
    evidence_refs: ['evidence:zakay-rones-2004-elderberry-influenza', 'evidence:tiralongo-2016-elderberry-cold-travel'],
    search_volume: 40500,
    ingredient_id: 'ingredient:elderberry',
  },
  {
    id: 'faq:elderberry-safety',
    question: 'Is elderberry safe?',
    answer: 'Standardised elderberry extracts (Sambucol, Eldercraft) are well-tolerated in clinical trials with minimal adverse effects. Raw elderberries and unprocessed elderberry plant parts (leaves, stems, roots, unripe berries) contain cyanogenic glycosides (including sambunigrin) that can cause nausea and vomiting. Commercial elderberry extracts and supplements are processed to remove these compounds. Elderberry should be used cautiously by individuals on immunosuppressant medications due to potential immune stimulation. The 2004 Zakay-Rones trial and 2016 Tiralongo trial both reported good tolerability.',
    evidence_refs: ['evidence:tiralongo-2016-elderberry-cold-travel', 'evidence:zakay-rones-2004-elderberry-influenza'],
    search_volume: 22200,
    ingredient_id: 'ingredient:elderberry',
  },

  // ─── BOSWELLIA ───────────────────────────────────────────────────────────────

  {
    id: 'faq:boswellia-joint-pain',
    question: 'Does Boswellia help joint pain?',
    answer: 'Clinical evidence supports boswellia for reducing pain in osteoarthritis. A comparative RCT (Sontakke et al., 2007) found boswellia extract produced comparable pain reduction to valdecoxib (a COX-2 inhibitor) over 6 months, with significantly better GI tolerability. A 2015 meta-analysis of 7 RCTs confirmed significant improvement in pain and physical function in knee OA. The mechanism — 5-LOX inhibition reducing leukotriene production — is distinct from NSAIDs, which means boswellia does not cause gastric side effects at therapeutic doses. Time to effect: 2–4 weeks of consistent use.',
    evidence_refs: ['evidence:sontakke-2007-boswellia-oa'],
    search_volume: 27100,
    ingredient_id: 'ingredient:boswellia',
  },
  {
    id: 'faq:boswellia-vs-ibuprofen',
    question: 'How does Boswellia compare to ibuprofen for pain?',
    answer: 'A head-to-head open-label RCT found boswellia serrata extract produced comparable knee OA pain reduction to valdecoxib (a COX-2 inhibitor) over 6 months. Unlike ibuprofen and other NSAIDs, boswellia does not inhibit COX-1 — the enzyme that maintains gastric mucosal protection. This means boswellia does not cause the gastric ulceration, GI bleeding, or renal effects associated with long-term NSAID use. The clinical trial confirmed no peptic ulcer or gastritis events in the boswellia group vs 3 events in the NSAID group. Boswellia is not an analgesic in the acute sense — onset takes weeks, not hours.',
    evidence_refs: ['evidence:sontakke-2007-boswellia-oa'],
    search_volume: 14800,
    ingredient_id: 'ingredient:boswellia',
  },

  // ─── UC-II COLLAGEN ──────────────────────────────────────────────────────────

  {
    id: 'faq:ucii-vs-glucosamine',
    question: 'Is UC-II collagen better than glucosamine for joints?',
    answer: 'A 2016 multicenter double-blind RCT (Lugo et al., n=191) directly compared UC-II 40mg/day, glucosamine 1,500mg + chondroitin 1,200mg, and placebo over 180 days. UC-II outperformed glucosamine + chondroitin on all primary endpoints including WOMAC pain, stiffness, and physical function scores. This is notable because glucosamine + chondroitin is the established standard supplement for OA and UC-II achieved better results at 40mg versus 2,700mg of the comparator. UC-II works via a different mechanism (oral tolerisation) than glucosamine (structural substrate provision).',
    evidence_refs: ['evidence:lugo-2016-ucii-oa'],
    search_volume: 18100,
    ingredient_id: 'ingredient:uc-ii-collagen',
  },
  {
    id: 'faq:ucii-how-different-from-hydrolysed',
    question: 'How is UC-II different from regular collagen peptides?',
    answer: 'UC-II (undenatured type II collagen) must NOT be hydrolysed — the intact triple helix structure of the collagen molecule is essential for its mechanism. UC-II works via oral tolerisation: intact collagen is recognised in the gut\'s Peyer\'s patches, triggering regulatory T-cells that reduce the immune attack on articular cartilage. Hydrolysed collagen peptides (regular collagen supplements) work by providing glycine and proline as building blocks for collagen synthesis. These are completely different mechanisms requiring completely different doses — UC-II is effective at 40mg/day, while hydrolysed collagen requires 5–15g/day. Taking UC-II with heat or digestive enzymes may destroy its mechanism.',
    evidence_refs: ['evidence:lugo-2016-ucii-oa'],
    search_volume: 12100,
    ingredient_id: 'ingredient:uc-ii-collagen',
  },

  // ─── SAMe ────────────────────────────────────────────────────────────────────

  {
    id: 'faq:same-depression-evidence',
    question: 'Is SAMe effective for depression?',
    answer: 'A review of 11 double-blind RCTs (Mischoulon & Fava, 2002) found SAMe consistently more effective than placebo and comparable to tricyclic antidepressants (TCAs) for major depression. Antidepressant effects develop within 1–2 weeks — faster than many pharmaceutical antidepressants. SAMe has been approved as a prescription antidepressant in Italy and Spain. In the USA and UK, it is sold as a supplement. Evidence quality is moderate — most trials are small and older. SAMe also shows evidence as an augmentation agent when added to standard antidepressants. Avoid in bipolar disorder.',
    evidence_refs: ['evidence:mischoulon-2002-same-depression'],
    search_volume: 22200,
    ingredient_id: 'ingredient:same',
  },
  {
    id: 'faq:same-joint-pain',
    question: 'Does SAMe help with arthritis and joint pain?',
    answer: 'Multiple RCTs and meta-analyses show SAMe is comparable to NSAIDs (ibuprofen, naproxen) for reducing pain and improving function in osteoarthritis, with significantly better gastrointestinal tolerability. SAMe is thought to support cartilage proteoglycan synthesis and stimulate chondrocyte activity. A meta-analysis of 11 RCTs found SAMe equivalent to NSAIDs on pain (VAS) and function (Lequesne index) with fewer adverse events. The primary practical disadvantage of SAMe is cost — it is substantially more expensive than NSAIDs or glucosamine.',
    evidence_refs: ['evidence:mischoulon-2002-same-depression'],
    search_volume: 18100,
    ingredient_id: 'ingredient:same',
  },

  // ─── GYMNEMA SYLVESTRE ───────────────────────────────────────────────────────

  {
    id: 'faq:gymnema-blood-sugar',
    question: 'Does Gymnema sylvestre lower blood sugar?',
    answer: 'Clinical evidence shows gymnema supplementation reduces fasting blood glucose, glycated haemoglobin (HbA1c), and glycated plasma proteins in type 2 diabetics. The foundational study (Baskaran et al., 1990, n=22) found 400mg/day gymnema extract for 18–20 months as an adjunct to conventional treatment produced significant glucose reductions, allowing 5 of 22 patients to discontinue their conventional antidiabetic medications. This is meaningful clinical evidence. However, gymnema should not be used to replace prescribed diabetes medications without medical supervision and blood glucose monitoring.',
    evidence_refs: ['evidence:baskaran-1990-gymnema-diabetes'],
    search_volume: 22200,
    ingredient_id: 'ingredient:gymnema-sylvestre',
  },
  {
    id: 'faq:gymnema-sugar-taste',
    question: 'Does Gymnema suppress sweet taste?',
    answer: 'Yes — gymnemic acids bind sweet taste receptors on the tongue, temporarily blocking the perception of sweetness for 15–30 minutes. This effect is the origin of the name "gurmar" (sugar destroyer in Hindi). This is not a supplement effect but a direct receptor-binding effect that occurs when gymnema contacts taste receptors. The same compounds responsible for taste suppression also mediate the glucose-lowering effects. Gymnema tea or chewing the leaf produces immediate taste effects; encapsulated supplements reduce taste exposure. This taste-suppression effect may contribute to reduced sugar cravings and caloric intake.',
    evidence_refs: ['evidence:baskaran-1990-gymnema-diabetes'],
    search_volume: 14800,
    ingredient_id: 'ingredient:gymnema-sylvestre',
  },

  // ─── SAFFRON ─────────────────────────────────────────────────────────────────

  {
    id: 'faq:saffron-mood-depression',
    question: 'Does saffron help with depression?',
    answer: 'A 2014 systematic review (Lopresti & Drummond, 11 clinical studies) found saffron extract consistently outperformed placebo for mild-to-moderate depression in all included trials. Head-to-head RCTs found 30mg/day standardised saffron extract comparable to imipramine (a tricyclic antidepressant) and fluoxetine (SSRI) for antidepressant effects in mild-to-moderate depression. This is one of the strongest evidence bases among herbal mood supplements. Saffron is not evidenced for severe depression. At 30mg/day, it is well-tolerated with nausea and drowsiness as the primary adverse effects.',
    evidence_refs: ['evidence:lopresti-2014-saffron-depression'],
    search_volume: 27100,
    ingredient_id: 'ingredient:saffron',
  },
  {
    id: 'faq:saffron-dose',
    question: 'How much saffron should I take for mood?',
    answer: '30mg/day of standardised saffron extract (standardised to crocin/safranal content) is the dose used in all positive clinical trials. This is typically taken as 15mg twice daily. Raw culinary saffron at this dose would require approximately 0.5–1g of saffron threads — the equivalent of 50–100 saffron servings — making supplemental standardised extract the practical form. The Affron brand (28% Lepticrosalide safranal) has the most independent trial data. Evidence suggests 4–8 weeks for full effect, consistent with conventional antidepressants.',
    evidence_refs: ['evidence:lopresti-2014-saffron-depression'],
    search_volume: 12100,
    ingredient_id: 'ingredient:saffron',
  },

  // ─── ST. JOHN'S WORT ─────────────────────────────────────────────────────────

  {
    id: 'faq:stjohnswort-effectiveness',
    question: 'Does St. John\'s Wort actually work for depression?',
    answer: 'A 2008 Cochrane review of 29 trials (n=5,489) found St. John\'s Wort significantly more effective than placebo (relative risk of response 1.48) and similarly effective to standard antidepressants, with notably fewer adverse effects. This is one of the most robust evidence bases for any herbal supplement. Evidence is for mild-to-moderate depression, not severe depression. The critical caveat is drug interactions — St. John\'s Wort induces CYP3A4 and can reduce blood levels of many medications including oral contraceptives, antiretrovirals, immunosuppressants, and warfarin. For individuals on no other medications, the evidence supports efficacy.',
    evidence_refs: ['evidence:linde-2008-stjohnswort-cochrane'],
    search_volume: 40500,
    ingredient_id: 'ingredient:st-johns-wort',
  },
  {
    id: 'faq:stjohnswort-drug-interactions',
    question: 'What medications does St. John\'s Wort interact with?',
    answer: 'St. John\'s Wort is a potent inducer of cytochrome P450 3A4 (CYP3A4) and P-glycoprotein, accelerating the metabolism and elimination of many drugs. Documented interactions include: oral contraceptives (reduced efficacy — unintended pregnancies reported); antiretroviral drugs including HIV protease inhibitors (treatment failure); immunosuppressants including cyclosporine (transplant rejection reported); warfarin (reduced anticoagulation — clotting risk); digoxin; triptans; SSRIs (serotonin syndrome risk); and many others. This is a pharmacological interaction, not a theoretical concern — clinical consequences have been documented. Always disclose use to prescribers and pharmacists.',
    evidence_refs: ['evidence:linde-2008-stjohnswort-cochrane'],
    search_volume: 33100,
    ingredient_id: 'ingredient:st-johns-wort',
  },

  // ─── SACCHAROMYCES BOULARDII ─────────────────────────────────────────────────

  {
    id: 'faq:sboulardii-antibiotics',
    question: 'Should I take probiotics while on antibiotics?',
    answer: 'Saccharomyces boulardii is the best-evidenced option for antibiotic-associated diarrhoea (AAD) prevention. A 2015 meta-analysis of 21 RCTs (Szajewska & Kołodziej, n=4,780) found S. boulardii reduced AAD risk by 51% with an NNT of 8. Unlike bacterial probiotics, S. boulardii is a yeast and not affected by antibiotics — it can be taken simultaneously with antibiotic treatment without concern for antibiotic inactivation. Bacterial probiotics (Lactobacillus, Bifidobacterium) may be partially inactivated by some antibiotics and are generally recommended 2+ hours separated from the antibiotic dose.',
    evidence_refs: ['evidence:szajewska-2015-sboulardii-aad'],
    search_volume: 33100,
    ingredient_id: 'ingredient:saccharomyces-boulardii',
  },
  {
    id: 'faq:sboulardii-travellers-diarrhoea',
    question: 'Does Saccharomyces boulardii prevent traveller\'s diarrhoea?',
    answer: 'A Cochrane review found S. boulardii significantly reduces traveller\'s diarrhoea risk. Multiple trials show a significant reduction in incidence when started before travel and continued throughout. S. boulardii must be taken continuously during travel to be effective — it works through transient colonisation and does not persist in the gut long-term after stopping. Most studies used 250–500mg twice daily. For high-risk travel (Southeast Asia, Central/South America, Africa), beginning S. boulardii 5 days before departure and continuing through return is the protocol studied.',
    evidence_refs: ['evidence:szajewska-2015-sboulardii-aad'],
    search_volume: 14800,
    ingredient_id: 'ingredient:saccharomyces-boulardii',
  },

  // ─── INOSITOL ────────────────────────────────────────────────────────────────

  {
    id: 'faq:inositol-pcos',
    question: 'Does inositol help with PCOS?',
    answer: 'Inositol is among the most evidence-supported supplements for PCOS. A systematic review of 13 RCTs (Unfer et al., 2012) found myo-inositol significantly improved ovulation rate, fasting insulin, insulin resistance (HOMA-IR), total testosterone, and LH/FSH ratio in women with PCOS. The combination of myo-inositol and D-chiro-inositol in a 40:1 ratio — reflecting the physiological ratio — shows the strongest evidence. Effects appear at 2–4g myo-inositol daily, with results typically seen within 3–6 months of consistent use. Inositol does not replace medical management of PCOS but has strong evidence as an adjunct.',
    evidence_refs: ['evidence:unfer-2012-inositol-pcos-meta'],
    search_volume: 40500,
    ingredient_id: 'ingredient:inositol',
  },
  {
    id: 'faq:inositol-mood-anxiety',
    question: 'Does inositol help anxiety or OCD?',
    answer: 'Inositol has been studied at high doses (12–18g/day) for mood disorders. A crossover RCT found 12g/day significantly reduced panic attack frequency in panic disorder patients compared to placebo. Another RCT found 18g/day reduced OCD symptoms comparably to fluvoxamine (SSRI). These are high doses — substantially more than the 2–4g used for PCOS. The mechanism involves inositol\'s role in phosphatidylinositol signalling cascades downstream of serotonin receptors. Evidence is from small trials and is considered moderate. Not a first-line treatment.',
    evidence_refs: ['evidence:unfer-2012-inositol-pcos-meta'],
    search_volume: 18100,
    ingredient_id: 'ingredient:inositol',
  },

  // ─── LUTEIN & ZEAXANTHIN ─────────────────────────────────────────────────────

  {
    id: 'faq:lutein-macular-degeneration',
    question: 'Does lutein prevent macular degeneration?',
    answer: 'The AREDS2 trial (Age-Related Eye Disease Study 2, n=4,203, median 5 years) is the definitive evidence: adding 10mg lutein + 2mg zeaxanthin to the established AREDS formula significantly reduced AMD progression risk (10% overall; 26% in those with low dietary lutein intake). This was a government-funded trial (National Eye Institute). Lutein accumulates in the macular pigment and absorbs high-energy blue light that damages photoreceptors. This is among the strongest supplement evidence available for any condition — a large, long-term, government-funded RCT with a clinical endpoint.',
    evidence_refs: ['evidence:areds2-2013-lutein-zeaxanthin-amd'],
    search_volume: 33100,
    ingredient_id: 'ingredient:lutein',
  },
  {
    id: 'faq:lutein-dose-eye-health',
    question: 'How much lutein should I take for eye health?',
    answer: '10mg/day lutein was the dose used in the AREDS2 trial, which demonstrated a significant reduction in AMD progression. This is almost always combined with 2mg zeaxanthin to reflect the 5:1 lutein:zeaxanthin ratio in the human macula. The average Western diet provides approximately 1–2mg lutein daily — most people consuming a typical diet are far below the AREDS2 dose. Lutein must be taken with a fat-containing meal for absorption (it is fat-soluble). Common sources: kale (26mg/100g), spinach (12mg/100g), egg yolks (0.3mg each but in a highly bioavailable form).',
    evidence_refs: ['evidence:areds2-2013-lutein-zeaxanthin-amd'],
    search_volume: 22200,
    ingredient_id: 'ingredient:lutein',
  },

  // ─── CHAMOMILE ───────────────────────────────────────────────────────────────

  {
    id: 'faq:chamomile-anxiety-evidence',
    question: 'Does chamomile help with anxiety?',
    answer: 'A 2009 double-blind RCT (Amsterdam et al., n=57) funded by the NIH found chamomile extract at 1,100mg/day significantly reduced Hamilton Anxiety Rating Scale scores in adults with generalised anxiety disorder. A follow-up 2016 RCT by the same group found long-term chamomile significantly reduced relapse risk after GAD remission. These are well-designed government-funded trials — chamomile has more rigorous anxiety evidence than many other herbal anxiolytics. The primary active compound, apigenin, binds GABA-A receptors as a partial agonist.',
    evidence_refs: ['evidence:amsterdam-2009-chamomile-gad'],
    search_volume: 22200,
    ingredient_id: 'ingredient:chamomile',
  },

  // ─── KAVA ────────────────────────────────────────────────────────────────────

  {
    id: 'faq:kava-anxiety-evidence',
    question: 'Does kava help with anxiety?',
    answer: 'Kava has the strongest evidence base of any herbal anxiolytic. A 2002 Cochrane systematic review of 11 RCTs (Pittler & Ernst, n=645) found significant anxiolytic effects in all 11 trials. The Hamilton Anxiety Scale reduction (−9.69 points) represents a clinically meaningful improvement. Effect sizes are comparable to low-dose benzodiazepines in some head-to-head comparisons. The primary concern is hepatotoxicity — rare case reports of liver damage led to temporary bans in Germany and other countries. Using noble kava varieties with traditional water extraction and avoiding alcohol significantly reduces this risk.',
    evidence_refs: ['evidence:pittler-2002-kava-cochrane'],
    search_volume: 27100,
    ingredient_id: 'ingredient:kava',
  },
  {
    id: 'faq:kava-liver-safety',
    question: 'Is kava safe for the liver?',
    answer: 'This is the central safety question for kava. Case reports of serious liver injury (including liver failure requiring transplant) led to bans in Germany and Canada (2001). Most cases involved: non-noble kava varieties or stem/leaf material (which contains more toxic compounds), acetone or ethanol extracts (not traditional water extracts), alcohol co-use, and pre-existing liver disease or concurrent hepatotoxic medications. Germany lifted its ban after re-evaluation concluded the risk was primarily preparation-related. Risk mitigation: use water-extracted noble kava varieties, avoid daily use exceeding 8 weeks, avoid alcohol, have liver function tested periodically during use. The absolute risk is low but not zero.',
    evidence_refs: ['evidence:pittler-2002-kava-cochrane'],
    search_volume: 18100,
    ingredient_id: 'ingredient:kava',
  },

  // ─── FISETIN ─────────────────────────────────────────────────────────────────

  {
    id: 'faq:fisetin-senolytic',
    question: 'What does fisetin do as a senolytic?',
    answer: 'A 2018 government-funded study (Yousefzadeh et al., EBioMedicine) identified fisetin as the most potent senolytic among 10 tested natural compounds. Senolytics selectively eliminate senescent cells — damaged cells that resist programmed cell death and secrete pro-inflammatory factors (the "senescence-associated secretory phenotype" or SASP) that drive chronic inflammation and age-related disease. In aged mice, fisetin reduced senescent cell burden, extended healthy lifespan, and improved physical function. Human adipose tissue treated ex vivo showed significant senescent cell reduction. Human clinical trials are underway at Mayo Clinic.',
    evidence_refs: ['evidence:yousefzadeh-2018-fisetin-senolytic'],
    search_volume: 14800,
    ingredient_id: 'ingredient:fisetin',
  },

  // ─── METHYLFOLATE ────────────────────────────────────────────────────────────

  {
    id: 'faq:methylfolate-vs-folic-acid',
    question: 'What is the difference between methylfolate and folic acid?',
    answer: 'Folic acid (synthetic vitamin B9) must be converted by MTHFR enzyme to 5-methyltetrahydrofolate (methylfolate) before the body can use it. Approximately 10–15% of the population carry MTHFR gene variants (C677T polymorphism) that significantly impair this conversion. These individuals may not receive adequate folate from folic acid supplementation and fortified foods, even at adequate doses. Methylfolate (5-MTHF) is already in the bioactive form — it bypasses the MTHFR step entirely and is directly usable. Methylfolate is particularly important during pregnancy for neural tube defect prevention in MTHFR variant carriers.',
    evidence_refs: [],
    search_volume: 27100,
    ingredient_id: 'ingredient:methylfolate',
  },
  {
    id: 'faq:methylfolate-pregnancy',
    question: 'Should I take methylfolate in pregnancy?',
    answer: 'Neural tube defect prevention is one of the most evidence-supported supplement applications. Folate supplementation beginning 1 month before conception and through the first trimester reduces neural tube defect risk by approximately 70%. For individuals with MTHFR gene variants (C677T or A1298C), methylfolate is preferred over folic acid because it bypasses the impaired conversion step. If you are planning pregnancy or pregnant and do not know your MTHFR status, methylfolate provides equivalent or superior protection to folic acid. The recommended dose for neural tube defect prevention is 400–800mcg/day methylfolate. Consult your midwife or obstetrician for guidance specific to your situation.',
    evidence_refs: [],
    search_volume: 33100,
    ingredient_id: 'ingredient:methylfolate',
  },

  // ─── SELENIUM ────────────────────────────────────────────────────────────────

  {
    id: 'faq:selenium-thyroid',
    question: 'Does selenium support thyroid function?',
    answer: 'Selenium is essential for thyroid function — the iodothyronine deiodinase enzymes that convert thyroxine (T4) to active triiodothyronine (T3) are selenoproteins. Selenium deficiency impairs T4 to T3 conversion, contributing to hypothyroid symptoms despite normal T4 levels. The thyroid has the highest selenium concentration per gram of any organ. In autoimmune thyroid disease (Hashimoto\'s thyroiditis), supplemental selenium at 200mcg/day has been shown in several RCTs to reduce thyroid peroxidase antibody levels (TPOAb). Selenium is especially relevant in regions with low soil selenium content.',
    evidence_refs: [],
    search_volume: 22200,
    ingredient_id: 'ingredient:selenium',
  },

  // ─── IRON ───────────────────────────────────────────────────────────────────

  {
    id: 'faq:iron-deficiency-supplement',
    question: 'Should I take iron supplements without a blood test?',
    answer: 'No. Self-supplementing iron without confirmed deficiency is not recommended. Excess iron is toxic — hereditary haemochromatosis (iron overload) affects approximately 1 in 200 people of Northern European descent and can cause liver damage, heart disease, and joint damage if undiagnosed. Unlike most water-soluble vitamins, excess iron accumulates in tissues. Iron deficiency anaemia is definitively diagnosed via serum ferritin, haemoglobin, and transferrin saturation (TIBC). If you suspect iron deficiency, the correct step is a blood test. Once deficiency is confirmed, supplemental iron at appropriate doses (typically 100–200mg elemental iron/day in divided doses) is effective.',
    evidence_refs: [],
    search_volume: 33100,
    ingredient_id: 'ingredient:iron',
  },
  {
    id: 'faq:iron-supplement-form',
    question: 'Which form of iron supplement causes the least side effects?',
    answer: 'Iron bisglycinate (also called iron glycinate chelate or ferrous bisglycinate) consistently causes fewer gastrointestinal side effects than ferrous sulfate at equivalent elemental iron doses — approximately 90% fewer GI adverse events in comparative studies. Ferrous sulfate is the most widely prescribed form and is effective, but constipation, nausea, and abdominal discomfort are common. Ferrous gluconate is an intermediate — better tolerated than sulfate, less so than bisglycinate. Vitamin C (50–100mg) taken simultaneously increases non-haem iron absorption by 2–3×. Tea, coffee, calcium, and dairy consumed within 2 hours of iron significantly reduce absorption.',
    evidence_refs: [],
    search_volume: 22200,
    ingredient_id: 'ingredient:iron',
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

async function seedFaqsExpanded() {
  console.log('Connecting to SurrealDB...');
  const db = await connectDb();

  console.log(`Seeding ${FAQS.length} expanded FAQ nodes...\n`);

  let faqsOk = 0;
  let edgesOk = 0;
  let errors = 0;

  for (const seed of FAQS) {
    const { id: _id, ingredient_id, ...faqFields } = seed;

    const [fTable, ...fIdParts] = seed.id.split(':');
    const faqRid = new RecordId(fTable, fIdParts.join(':'));
    const [ingTable, ...ingIdParts] = ingredient_id.split(':');
    const ingRid = new RecordId(ingTable, ingIdParts.join(':'));

    try {
      await db.upsert(faqRid).content({ ...faqFields, last_updated: new Date() });

      await db.query(
        `RELATE $faqId->answers_about->$ingredientId SET search_volume = $sv`,
        { faqId: faqRid, ingredientId: ingRid, sv: seed.search_volume ?? null }
      );

      console.log(`  ✓ [${ingredient_id.split(':')[1].padEnd(25)}] ${seed.question.slice(0, 60)}`);
      faqsOk++;
      edgesOk++;
    } catch (err) {
      console.error(`  ✗ ${seed.id}: ${err}`);
      errors++;
    }
  }

  await db.close();
  console.log(`\n${faqsOk} FAQs · ${edgesOk} ANSWERS_ABOUT edges · ${errors} errors`);
  if (errors > 0) process.exit(1);
}

seedFaqsExpanded().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
