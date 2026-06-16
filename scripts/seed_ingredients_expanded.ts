/**
 * Seeds ~70 expanded ingredients beyond the Phase 1/2/3 base set.
 * Run: npm run seed:ingredients:expanded
 * Covers: nootropics, antioxidants, adaptogens, sleep/mood, immune, metabolic,
 *         joint/recovery, skin/beauty, additional minerals, vitamins, gut health.
 */

import { Surreal, RecordId } from 'surrealdb';

type IngredientSeed = {
  name: string;
  slug: string;
  category: string;
  description: string;
  primary_use: string[];
  evidence_rating: 'strong' | 'moderate' | 'mixed' | 'limited';
  dose_context?: string;
  legal_notes?: string;
  synonyms?: string[];
  mechanism_of_action?: string;
  history_of_use?: string;
};

const INGREDIENTS: IngredientSeed[] = [

  // ─── SLEEP / RELAXATION ────────────────────────────────────────────────────

  {
    name: 'L-Theanine',
    slug: 'l-theanine',
    category: 'Sleep',
    description: 'L-Theanine is a non-protein amino acid found primarily in tea leaves (Camellia sinensis), particularly green tea. It promotes a state of calm alertness without sedation by increasing alpha brain wave activity and modulating neurotransmitters. When combined with caffeine, it attenuates the jitteriness and anxiety associated with caffeine while preserving cognitive performance benefits.',
    primary_use: ['anxiety reduction', 'calm focus', 'sleep quality', 'stress reduction', 'caffeine synergy'],
    evidence_rating: 'moderate',
    synonyms: ['gamma-glutamylethylamide', 'N-ethyl-L-glutamine', '5-N-ethylglutamine'],
    mechanism_of_action: 'L-Theanine crosses the blood-brain barrier and modulates several neurotransmitters: it increases GABA, serotonin, and dopamine levels while reducing glutamate activity. It increases alpha brain wave activity (8–12 Hz), a pattern associated with relaxed alertness. It also antagonises caffeine\'s binding at adenosine receptors and attenuates cortisol response to stressors.',
    history_of_use: 'L-Theanine was isolated from green tea leaves in 1949 by Japanese researchers. Tea has been consumed in China and Japan for over 1,000 years, and the calm-yet-alert state associated with green tea consumption (chado, the way of tea) is attributed in part to L-Theanine. It has been a permitted food additive in Japan since 1964 and is now one of the most widely studied nootropic compounds.',
    dose_context: '100–400mg/day in human trials. For acute anxiety reduction: 200mg single dose (Kimura et al., 2007). For sleep quality: 200–400mg before bed. For cognitive performance with caffeine: 100–200mg L-Theanine with 50–100mg caffeine (1:1 to 2:1 ratio). Effects on alpha waves observed within 40 minutes of 50mg oral dose.',
  },
  {
    name: '5-HTP',
    slug: '5-htp',
    category: 'Sleep',
    description: '5-Hydroxytryptophan (5-HTP) is a naturally occurring amino acid and the direct precursor to serotonin in the brain. It is extracted from the seeds of Griffonia simplicifolia (a West African plant) and crosses the blood-brain barrier more readily than tryptophan. As serotonin is converted to melatonin by the pineal gland, 5-HTP supplementation may support both mood regulation and sleep onset.',
    primary_use: ['serotonin precursor', 'mood support', 'sleep onset', 'appetite regulation', 'anxiety reduction'],
    evidence_rating: 'mixed',
    synonyms: ['5-hydroxytryptophan', 'oxitriptan'],
    mechanism_of_action: '5-HTP is decarboxylated by aromatic amino acid decarboxylase (AADC) to serotonin (5-HT) in both the central and peripheral nervous systems. Unlike L-Tryptophan, 5-HTP bypasses the rate-limiting tryptophan hydroxylase step and is not diverted to kynurenine synthesis. Serotonin in the pineal gland is N-acetylated and then O-methylated to produce melatonin, providing the mechanistic link to sleep. Peripheral serotonin (gut, platelets) accounts for ~90% of total body serotonin — a relevant consideration for side effect profile.',
    history_of_use: '5-HTP was first described in the 1960s following the isolation of serotonin. Clinical use as a serotonin precursor was explored from the 1970s onward in Italy and Switzerland. The natural Griffonia simplicifolia extract became a dietary supplement in the 1990s, coinciding with interest in non-prescription mood support following SSRI approval.',
    dose_context: '50–300mg/day in clinical trials. For mood: 100–200mg three times daily with meals (Turner et al., 2006 review). For sleep: 100–300mg 30–45 minutes before bed. Not to be combined with SSRIs, SNRIs, MAOIs, or triptans (serotonin syndrome risk). Evidence in depression shows effects comparable to some antidepressants in small trials, but large high-quality RCTs are lacking. Evidence in fibromyalgia and migraines is more consistent.',
    legal_notes: 'Not to be combined with serotonergic medications including SSRIs, SNRIs, MAOIs, triptans, or tramadol without medical supervision due to risk of serotonin syndrome. Individuals taking prescription antidepressants should consult a physician before using 5-HTP.',
  },
  {
    name: 'GABA',
    slug: 'gaba-supplement',
    category: 'Sleep',
    description: 'Gamma-aminobutyric acid (GABA) is the primary inhibitory neurotransmitter in the central nervous system. Oral GABA supplementation is commercially popular for relaxation and sleep, but its ability to cross the blood-brain barrier in supplemental doses is debated. Evidence shows anxiolytic effects in humans at doses of 100mg, which may be partly mediated by peripheral GABA receptors in the enteric nervous system rather than direct CNS effects.',
    primary_use: ['relaxation', 'anxiety reduction', 'sleep support', 'stress response'],
    evidence_rating: 'limited',
    synonyms: ['gamma-aminobutyric acid', 'γ-aminobutyric acid'],
    mechanism_of_action: 'Endogenous GABA binds GABA-A (ionotropic, chloride channel) and GABA-B (metabotropic) receptors to produce neuronal inhibition. Whether supplemental oral GABA reaches the brain in meaningful concentrations is uncertain — GABA does not readily cross the blood-brain barrier via passive diffusion. Proposed alternative mechanisms include: peripheral vagal nerve stimulation via gut GABA-A receptors, indirect effects on brain blood flow, and conversion to GABA by gut microbiota. Pharmaceutical GABA-A agonists (benzodiazepines, barbiturates) bypass this issue via direct CNS penetration.',
    dose_context: '100–800mg/day in human studies. A 2006 Japanese RCT (Abdou et al., n=63) found 100mg oral GABA reduced physiological stress markers (salivary immunoglobulins, alpha waves) within 1 hour. Evidence base is small and predominantly from industry-affiliated research. The dose-CNS penetration relationship in humans has not been established from independent peer-reviewed studies.',
  },
  {
    name: 'L-Tryptophan',
    slug: 'l-tryptophan',
    category: 'Sleep',
    description: 'L-Tryptophan is an essential amino acid and the dietary precursor to both serotonin and melatonin via the 5-HTP pathway. Unlike 5-HTP, tryptophan must first be converted to 5-HTP by tryptophan hydroxylase — a rate-limiting enzyme subject to competition from other amino acids. Tryptophan also enters the kynurenine pathway, reducing the fraction available for serotonin synthesis.',
    primary_use: ['serotonin precursor', 'sleep quality', 'mood support', 'protein synthesis'],
    evidence_rating: 'mixed',
    synonyms: ['L-Trp', 'tryptophan'],
    dose_context: '500–2000mg/day in clinical trials for sleep and mood. A meta-analysis of sleep studies found tryptophan at 1g/day significantly reduced sleep onset latency. Transport across the blood-brain barrier competes with other large neutral amino acids (LNAAs) — consuming with carbohydrates and low protein enhances brain uptake by triggering insulin-mediated uptake of competing amino acids. 5-HTP is more efficient at raising central serotonin per mg dose.',
  },
  {
    name: 'Valerian Root',
    slug: 'valerian-root',
    category: 'Herbal',
    description: 'Valerian (Valeriana officinalis) root extract is one of the most studied herbal sleep aids. Evidence from meta-analyses is mixed — while some studies show improvements in sleep quality and latency, trials are heterogeneous in terms of extract standardisation, outcome measures, and population. Valerian may modulate GABA-A receptors via valerenic acid and isovaleric acid, providing a plausible mechanism for anxiolytic and sleep effects.',
    primary_use: ['sleep quality', 'sleep onset', 'anxiety reduction', 'relaxation'],
    evidence_rating: 'mixed',
    synonyms: ['Valeriana officinalis', 'garden valerian', 'all-heal'],
    mechanism_of_action: 'Valerenic acid (a sesquiterpene) binds GABA-A receptors as a positive allosteric modulator, increasing the receptor\'s sensitivity to GABA. Isovaleric acid inhibits GABA reuptake and breakdown. Valerene is also proposed to interact with adenosine receptors. The sedative effect profile overlaps with benzodiazepine mechanism but without receptor binding at the benzodiazepine site.',
    history_of_use: 'Valerian has been used medicinally since ancient Greece and Rome, where Galen and Hippocrates documented its use for insomnia. It was widely used across medieval Europe and was official in many European pharmacopoeias through the 19th century. The first modern clinical trials began in the 1980s in Germany, where herbal medicines (phytomedicines) are regulated as medicines.',
    dose_context: '300–600mg standardised extract (0.8% valerenic acid) 30–60 minutes before sleep. A systematic review and meta-analysis (Bent et al., 2006, n=16 studies) found evidence for subjective sleep improvement but study quality was generally low and heterogeneous. Trials lasting 2–4 weeks consistently show better results than single-night trials — suggesting a cumulative effect. Well-tolerated with no dependence or withdrawal in clinical trials to date.',
  },
  {
    name: 'Passionflower',
    slug: 'passionflower',
    category: 'Herbal',
    description: 'Passionflower (Passiflora incarnata) is a climbing plant native to the southeastern United States and Central/South America. Clinical evidence shows anxiolytic effects comparable to low-dose benzodiazepines in some trials, with better tolerability. The active compounds are flavonoids, particularly chrysin, which bind GABA-A receptors. Used as a pre-operative anxiolytic in surgical settings in some clinical trials.',
    primary_use: ['anxiety reduction', 'sleep quality', 'relaxation', 'pre-operative anxiety'],
    evidence_rating: 'limited',
    synonyms: ['Passiflora incarnata', 'maypop', 'wild passion vine'],
    dose_context: '400–500mg dried extract or 45 drops liquid extract daily in anxiety trials. A double-blind RCT (Movafegh et al., 2008, n=60 surgical patients) found oral passionflower significantly reduced pre-operative anxiety compared to placebo. A 2001 RCT found passionflower comparable to oxazepam for generalised anxiety disorder with fewer impairment side effects. Evidence for sleep specifically is thinner — most benefit is anxiety-mediated. Well-tolerated; drowsiness most common side effect.',
  },
  {
    name: 'Lemon Balm',
    slug: 'lemon-balm',
    category: 'Herbal',
    description: 'Lemon balm (Melissa officinalis) is a herb in the mint family with traditional use for anxiety and sleep. Active compounds include rosmarinic acid, which inhibits GABA transaminase (increasing GABA availability), and luteolin. Clinical evidence for anxiety and sleep at doses of 300–600mg is positive but limited in scale. Often combined with valerian root in sleep formulations.',
    primary_use: ['anxiety reduction', 'sleep quality', 'relaxation', 'cognitive function'],
    evidence_rating: 'limited',
    synonyms: ['Melissa officinalis', 'balm', 'sweet balm', 'melissa'],
    dose_context: '300–600mg extract twice daily in trials. A crossover study (Kennedy et al., 2004, n=20) found 600mg and 1,000mg lemon balm extract significantly improved mood and reduced anxiety. A pilot trial (Cases et al., 2011, n=20) found 600mg/day significantly improved sleep quality and reduced anxiety over 15 days. Combined valerian+lemon balm preparations have more clinical data than lemon balm alone.',
  },
  {
    name: 'Magnesium L-Threonate',
    slug: 'magnesium-l-threonate',
    category: 'Sleep',
    description: 'Magnesium L-Threonate is a magnesium salt of L-Threonic acid, developed at MIT specifically to increase brain magnesium levels. Preclinical research shows it crosses the blood-brain barrier more effectively than other magnesium forms, raising cerebrospinal fluid magnesium levels. Human evidence is early — a 2016 trial showed cognitive improvements in older adults, and the specific brain uptake profile has generated interest for sleep quality and cognitive applications.',
    primary_use: ['brain magnesium', 'cognitive function', 'sleep quality', 'neuroprotection'],
    evidence_rating: 'limited',
    synonyms: ['magnesium threonate', 'Magtein'],
    dose_context: '1,500–2,000mg L-Threonate form (delivering ~144mg elemental magnesium) in human trials. Developed as Magtein by MIT researchers. A 2016 RCT (Liu G et al., n=44 older adults with cognitive impairment) found Magtein significantly improved executive function and working memory. The high cost per elemental magnesium unit makes this the most expensive magnesium form — justified only if the specific brain-targeted delivery is required.',
  },

  // ─── NOOTROPICS / COGNITIVE PERFORMANCE ───────────────────────────────────

  {
    name: 'Alpha-GPC',
    slug: 'alpha-gpc',
    category: 'Performance',
    description: 'Alpha-glycerylphosphorylcholine (Alpha-GPC) is a choline-containing phospholipid that delivers choline to the brain more effectively than choline bitartrate or lecithin. In the brain, choline is used to synthesise acetylcholine — the neurotransmitter central to memory, learning, and muscle contraction. Alpha-GPC is used in pharmaceutical form in Europe and Asia for treating Alzheimer\'s disease and cognitive impairment.',
    primary_use: ['acetylcholine precursor', 'cognitive function', 'memory', 'athletic power output', 'neuroprotection'],
    evidence_rating: 'moderate',
    synonyms: ['Alpha-glycerophosphocholine', 'choline alfoscerate', 'L-alpha-glycerylphosphorylcholine'],
    mechanism_of_action: 'Alpha-GPC is rapidly absorbed and crosses the blood-brain barrier, where it is hydrolysed to glycerophosphocholine and then to choline and glycerophosphate. Choline is the rate-limiting substrate for acetylcholine synthesis via choline acetyltransferase. Alpha-GPC also contributes to cell membrane phospholipid synthesis, supporting neuronal membrane integrity.',
    dose_context: '300–1,200mg/day in clinical trials. For Alzheimer\'s and cognitive impairment: 400mg three times daily (1,200mg/day) in Italian pharmaceutical trials showing consistent cognitive improvements. For athletic performance: 600mg 90 minutes pre-exercise — a 2012 study found significant increases in peak power output. For general cognitive enhancement in healthy adults, evidence is more limited at lower doses of 300–600mg/day.',
  },
  {
    name: 'CDP-Choline',
    slug: 'cdp-choline',
    category: 'Performance',
    description: 'CDP-Choline (cytidine 5\'–diphosphocholine), also known as citicoline or Cognizin, is a compound that provides both choline and cytidine to the brain. Cytidine is converted to uridine in the brain, which supports brain phospholipid synthesis. CDP-Choline has pharmaceutical use for stroke recovery in several countries and is studied for cognitive enhancement, attention, and neuroprotection.',
    primary_use: ['acetylcholine precursor', 'cognitive function', 'attention', 'neuroprotection', 'stroke recovery'],
    evidence_rating: 'moderate',
    synonyms: ['citicoline', 'cytidine diphosphocholine', 'Cognizin'],
    mechanism_of_action: 'After oral administration, CDP-Choline is hydrolysed to cytidine and choline, which are absorbed separately and recombine in the brain to reconstitute CDP-Choline. This is the rate-limiting step in phosphatidylcholine synthesis via the Kennedy pathway. Additionally, cytidine is converted to uridine, which activates P2Y receptors and supports synthesis of synaptic proteins. Both choline (acetylcholine precursor) and uridine (membrane phospholipid precursor) contribute to the cognitive effects.',
    dose_context: '250–1,000mg/day in human trials. A Cochrane review found citicoline improved memory and behaviour in cognitive disorders. For healthy adult cognition (attention, memory): 250–500mg/day in studies showing improved attention performance. CDP-Choline and Alpha-GPC both provide choline but via different mechanisms — CDP-Choline additionally provides uridine. They are sometimes compared as the two primary choline-delivery compounds for cognitive supplementation.',
  },
  {
    name: 'Phosphatidylserine',
    slug: 'phosphatidylserine',
    category: 'Performance',
    description: 'Phosphatidylserine (PS) is a phospholipid that is a major component of neuronal cell membranes. It plays a key role in cell signalling, apoptosis regulation, and acetylcholine release. Clinical evidence from multiple RCTs shows PS supplementation can improve cognitive function and memory in older adults and delay the progression of age-related cognitive decline. The FDA allows a qualified health claim for PS and cognitive function.',
    primary_use: ['memory', 'cognitive function', 'cortisol reduction', 'attention', 'neuronal membrane support'],
    evidence_rating: 'moderate',
    synonyms: ['PS', 'ptidylserine', 'soy-derived phosphatidylserine'],
    dose_context: '100–800mg/day in clinical trials. Most evidence uses 300mg/day split across three 100mg doses with meals. A 1991 multicentre RCT (n=494 older adults with cognitive decline) found 300mg/day PS for 6 months significantly improved memory and attention scores. Important note: original studies used bovine cortex-derived PS; modern supplements use soy-derived PS. Soy-derived PS has less direct evidence but comparable bioavailability data. FDA allows a "qualified health claim" for PS and cognitive function — one of the few supplements with this regulatory status.',
  },
  {
    name: 'Bacopa Monnieri',
    slug: 'bacopa-monnieri',
    category: 'Herbal',
    description: 'Bacopa monnieri (brahmi) is an Ayurvedic herb with the most substantial peer-reviewed evidence base among herbal nootropics. Multiple double-blind RCTs and a 2014 meta-analysis confirm bacopa improves memory acquisition and recall after 12 weeks of supplementation. The active compounds — bacosides A and B — are triterpene saponins that modulate synaptic transmission and antioxidant enzyme activity.',
    primary_use: ['memory', 'cognitive function', 'learning', 'anxiety reduction', 'neuroprotection'],
    evidence_rating: 'moderate',
    synonyms: ['brahmi', 'water hyssop', 'Bacopa monniera', 'herb of grace'],
    mechanism_of_action: 'Bacosides enhance synaptic transmission by modulating cholinergic, serotonergic, and dopaminergic systems. They reduce beta-amyloid aggregation and improve antioxidant defences in brain tissue. Bacosides also modulate GABA-A and glutamate receptors. Kinase activity of neuroprotective proteins (HSP70, PKC) is upregulated by bacopa extract in animal models.',
    history_of_use: 'Bacopa has been used in Ayurvedic medicine for over 3,000 years, where it was classified as a medhya rasayana — a class of herbs for enhancing memory and intelligence. The Charaka Samhita (ancient Indian medical text) references its use for enhancing memory, concentration, and learning. Modern scientific investigation began in the 1980s in India and has expanded substantially through Australian and Indian research groups.',
    dose_context: '300–450mg/day standardised to 55% bacosides in clinical trials. A 2014 meta-analysis of 9 RCTs (Kongkeaw et al.) found bacopa significantly improved memory recall, processing speed, and attention. Effects require consistent use for 12 weeks — acute dosing does not demonstrate the same benefits. Fat-soluble compounds in bacopa are better absorbed with a fat-containing meal. Bacopa is one of the few herbal nootropics with replicated evidence in healthy adults from independent research groups.',
  },
  {
    name: 'Huperzine A',
    slug: 'huperzine-a',
    category: 'Herbal',
    description: 'Huperzine A is a naturally occurring sesquiterpene alkaloid extracted from Huperzia serrata (Chinese club moss). It is a potent, reversible inhibitor of acetylcholinesterase — the enzyme that breaks down acetylcholine. This mechanism of action is identical to pharmaceutical acetylcholinesterase inhibitors used for Alzheimer\'s disease (donepezil, rivastigmine). Huperzine A has a longer duration of action than many synthetic AChE inhibitors.',
    primary_use: ['acetylcholinesterase inhibition', 'memory', 'Alzheimer\'s research', 'cognitive function'],
    evidence_rating: 'mixed',
    synonyms: ['HupA', 'selagine', 'Huperzia serrata extract'],
    mechanism_of_action: 'Huperzine A reversibly inhibits acetylcholinesterase (AChE) with high selectivity, preventing the enzymatic breakdown of acetylcholine in synaptic clefts. This increases cholinergic transmission — the same mechanism as prescription AChE inhibitors used for Alzheimer\'s. Unlike synthetic AChE inhibitors, huperzine A also acts as an NMDA receptor antagonist, providing additional neuroprotective activity.',
    legal_notes: 'Huperzine A is classified as a prescription drug in some countries (Australia: Schedule 4). In the UK and USA it is sold as a dietary supplement. Given its pharmacological similarity to prescription AChE inhibitors, it should not be combined with pharmaceutical AChE inhibitors (donepezil, rivastigmine, galantamine). Individuals with epilepsy, heart conditions, or those taking anticholinergics should consult a physician.',
    dose_context: '50–200mcg/day in clinical trials. A 1995 Chinese double-blind RCT (n=103 Alzheimer\'s patients) found 400mcg/day for 8 weeks significantly improved memory and cognitive function on standardised assessments. For healthy adults, 50–100mcg/day is studied. Half-life is approximately 10–14 hours — daily dosing adequate. Cycling (5 days on, 2 days off) is suggested by some practitioners to prevent AChE downregulation, but this is not established by clinical evidence.',
  },
  {
    name: 'Ginkgo Biloba',
    slug: 'ginkgo-biloba',
    category: 'Herbal',
    description: 'Ginkgo biloba leaf extract (EGb 761 standardised extract) is one of the most extensively studied herbal supplements globally, with thousands of published studies. Evidence for slowing dementia progression is mixed — the large GEMS trial (n=3,069, mean 6 years) found no reduction in dementia incidence. For acute cognitive performance and cerebrovascular circulation, evidence is more positive. Ginkgo is consistently cited as an evidence benchmark for herbal cognitive supplements.',
    primary_use: ['circulation', 'cognitive function', 'tinnitus', 'Alzheimer\'s research', 'antioxidant'],
    evidence_rating: 'mixed',
    synonyms: ['EGb 761', 'ginkgo extract', 'maidenhair tree'],
    mechanism_of_action: 'Standardised ginkgo extract (EGb 761) contains flavone glycosides (24%) and terpene lactones — ginkgolides A, B, and bilobalide. Ginkgolide B is a platelet-activating factor (PAF) antagonist, reducing platelet aggregation and improving cerebrovascular blood flow. Flavone glycosides act as antioxidants. Bilobalide inhibits GABA-A receptors. Together these mechanisms increase cerebral blood flow, reduce oxidative damage to neurons, and modulate synaptic transmission.',
    dose_context: '120–240mg/day standardised EGb 761 extract (24% flavone glycosides, 6% terpene lactones) in clinical trials. Must use standardised extract — raw ginkgo leaves contain ginkgolic acids, which are toxic. The GEMS trial (DeKosky et al., 2008, n=3,069 over 6 years) found ginkgo did not reduce dementia incidence. For acute cognitive effects in younger adults, 240mg single dose shows improvements in memory speed. For tinnitus, evidence is mixed. Anticoagulant interaction: caution with warfarin, aspirin, clopidogrel.',
  },
  {
    name: 'PQQ',
    slug: 'pqq',
    category: 'Longevity',
    description: 'Pyrroloquinoline quinone (PQQ) is a small quinone molecule found in plant foods and human breast milk. It acts as a redox cofactor and potent antioxidant, with the unique property of catalysing mitochondrial biogenesis via PGC-1α activation — stimulating the creation of new mitochondria. A 2013 human trial confirmed PQQ alters mitochondrial-related metabolism markers.',
    primary_use: ['mitochondrial biogenesis', 'cognitive function', 'antioxidant', 'energy metabolism', 'neuroprotection'],
    evidence_rating: 'limited',
    synonyms: ['pyrroloquinoline quinone', 'methoxatin'],
    dose_context: '10–20mg/day in human clinical trials. A 2013 RCT (Harris et al., n=10) found 20mg/day PQQ significantly reduced inflammatory markers (CRP, IL-6) and altered urinary metabolites related to mitochondrial activity. A 2016 study found PQQ improved memory and attention in older adults with self-reported cognitive decline. Evidence base is small; well-tolerated with no significant adverse effects at 20mg/day in short trials.',
  },

  // ─── ANTIOXIDANTS / LONGEVITY ──────────────────────────────────────────────

  {
    name: 'NAC',
    slug: 'nac',
    category: 'Longevity',
    description: 'N-Acetylcysteine (NAC) is a derivative of the amino acid cysteine and the primary clinical antidote for paracetamol (acetaminophen) overdose. As a supplement, NAC replenishes glutathione — the body\'s master antioxidant — and has the most robust evidence base of any antioxidant supplement in clinical use. Applications span liver protection, respiratory mucus thinning, OCD treatment, and anti-inflammatory effects.',
    primary_use: ['glutathione precursor', 'liver protection', 'antioxidant', 'mucolytic', 'OCD research'],
    evidence_rating: 'strong',
    synonyms: ['N-Acetylcysteine', 'N-acetyl-L-cysteine', 'acetylcysteine'],
    mechanism_of_action: 'NAC provides cysteine, the rate-limiting substrate for glutathione (GSH) synthesis via the γ-glutamylcysteine synthetase pathway. GSH is the predominant intracellular antioxidant and cofactor for glutathione peroxidase and S-transferases. NAC also directly scavenges hydroxyl radicals and hypochlorous acid, reduces disulfide bonds in mucus glycoproteins (mucolytic effect), and modulates glutamatergic signalling (relevant to its OCD and addiction research applications).',
    history_of_use: 'Acetylcysteine was first approved as a pharmaceutical in the 1960s for mucus thinning in cystic fibrosis and chronic bronchitis. Its use as an antidote for paracetamol overdose was established in the 1970s and it remains the standard-of-care treatment. Supplemental use emerged as understanding of glutathione\'s role in cellular antioxidant defence grew through the 1990s and 2000s.',
    dose_context: '600–1,800mg/day in clinical trials depending on indication. For glutathione replenishment: 600–1,200mg/day. For chronic respiratory disease: 600mg twice daily (the NAC-COPD trials). For OCD: 2,400–3,000mg/day in psychiatric research. For liver protection: IV acetylcysteine is standard-of-care for paracetamol overdose; oral 600–1,200mg/day used in non-alcoholic fatty liver studies. Well-tolerated; nausea most common adverse effect at higher doses.',
  },
  {
    name: 'Glutathione',
    slug: 'glutathione',
    category: 'Longevity',
    description: 'Glutathione (GSH) is the body\'s most abundant intracellular antioxidant, a tripeptide of glutamate, cysteine, and glycine. It is central to cellular redox balance, detoxification, and immune function. Oral bioavailability of supplemental glutathione was historically questioned, but studies using liposomal and reduced forms now show measurable increases in plasma and erythrocyte GSH. Raising GSH indirectly via NAC is more established.',
    primary_use: ['antioxidant', 'detoxification', 'immune function', 'skin lightening', 'liver support'],
    evidence_rating: 'mixed',
    synonyms: ['GSH', 'L-glutathione', 'reduced glutathione'],
    dose_context: '250–1,000mg/day of reduced glutathione or liposomal glutathione in human trials. A 2015 RCT (Richie et al., n=54) found oral reduced glutathione at 250mg/day for 6 months significantly increased erythrocyte and whole blood GSH levels. Skin lightening effects: 500mg/day oral GSH produced significant lightening by reducing melanin synthesis in a 2014 Filipino RCT. NAC remains the more established route for raising GSH; direct oral glutathione supplementation has a shorter evidence history.',
  },
  {
    name: 'Quercetin',
    slug: 'quercetin',
    category: 'Longevity',
    description: 'Quercetin is a flavonoid antioxidant found in onions, apples, berries, and tea. It has anti-inflammatory effects via NF-κB inhibition and antiviral activity studied during COVID-19. Clinical evidence shows modest improvements in blood pressure and inflammation markers. Bioavailability is low from standard quercetin (1–3%) but significantly improved by formulations with bromelain, vitamin C, or as quercetin phytosome.',
    primary_use: ['antioxidant', 'anti-inflammatory', 'immune support', 'cardiovascular health', 'antihistamine activity'],
    evidence_rating: 'mixed',
    synonyms: ['3,3\',4\',5,7-pentahydroxyflavone', 'quercetin dihydrate', 'sophorin'],
    mechanism_of_action: 'Quercetin inhibits NF-κB nuclear translocation, reducing pro-inflammatory cytokine production. It inhibits histamine release from mast cells and basophils, contributing to antihistamine effects. Quercetin also inhibits JAK/STAT signalling, modulates SIRT1 (longevity pathway), and activates AMPK. It chelates metals that catalyse free radical generation. Zinc ionophore activity has been proposed as relevant to antiviral mechanisms.',
    dose_context: '500–1,000mg/day in clinical trials. A systematic review of 9 RCTs found quercetin significantly reduced blood pressure (−3.04 mmHg systolic) and inflammatory markers (CRP, IL-6). For immune/upper respiratory effects: 500mg twice daily. Quercetin phytosome (Quercefit) has demonstrated 20× greater bioavailability than standard quercetin. Often combined with vitamin C and zinc. COVID-19 trials showed modest results — evidence is preliminary.',
  },
  {
    name: 'Astaxanthin',
    slug: 'astaxanthin',
    category: 'Longevity',
    description: 'Astaxanthin is a red-orange carotenoid found in algae (Haematococcus pluvialis) and marine organisms including salmon, shrimp, and krill. It is classified as one of the most potent antioxidants studied, with singlet oxygen quenching activity estimated at 550 times greater than vitamin E. Evidence supports applications in exercise recovery, skin health, and eye protection.',
    primary_use: ['antioxidant', 'exercise recovery', 'skin health', 'eye health', 'anti-inflammatory'],
    evidence_rating: 'moderate',
    synonyms: ['astaxanthin', '3,3\'-dihydroxy-β,β-carotene-4,4\'-dione', 'AstaREAL'],
    dose_context: '4–12mg/day in human clinical trials. For exercise recovery: 4mg/day for 4 weeks reduced muscle damage markers in trained cyclists. For skin: 6mg/day improved skin elasticity, moisture, and wrinkle depth in a double-blind RCT (n=65). For eye fatigue: 6mg/day showed significant improvements in visual acuity and accommodation in a 2002 Japanese RCT. Natural-source Haematococcus pluvialis astaxanthin is considered superior to synthetic forms. Fat-soluble — must be taken with a fat-containing meal.',
  },
  {
    name: 'Pterostilbene',
    slug: 'pterostilbene',
    category: 'Longevity',
    description: 'Pterostilbene is a stilbenoid and natural analogue of resveratrol, found in blueberries and Pterocarpus marsupium heartwood. Unlike resveratrol, pterostilbene has approximately 80% oral bioavailability versus resveratrol\'s ~1%, making it more pharmacologically relevant per mg consumed. It activates the same SIRT1/AMPK longevity pathways as resveratrol but at substantially lower doses. Human evidence is early but growing.',
    primary_use: ['antioxidant', 'sirtuin activation', 'cognitive function', 'metabolic health', 'longevity research'],
    evidence_rating: 'limited',
    synonyms: ['3,5-dimethoxy-4\'-hydroxystilbene', 'trans-pterostilbene'],
    dose_context: '50–150mg/day in human trials. A 2013 clinical trial (n=80) compared pterostilbene 50mg/day and 100mg/day vs placebo for blood pressure — both doses significantly reduced systolic blood pressure. A dose of 100mg/day showed moderate LDL reduction in a secondary analysis. No large RCTs for longevity outcomes. Bioavailability advantage over resveratrol is its key differentiator — methoxy groups reduce first-pass metabolism significantly.',
  },
  {
    name: 'Lycopene',
    slug: 'lycopene',
    category: 'Longevity',
    description: 'Lycopene is a red carotenoid antioxidant found in high concentrations in tomatoes, watermelon, and pink grapefruit. Epidemiological evidence consistently associates higher lycopene intake with reduced prostate cancer risk, and a 2014 meta-analysis supports this association. Bioavailability is substantially higher from processed tomato products (tomato sauce, paste) than raw tomatoes — heat disrupts cell walls and the fat-soluble carotenoid requires dietary fat for absorption.',
    primary_use: ['antioxidant', 'prostate health', 'cardiovascular health', 'skin protection', 'cancer prevention research'],
    evidence_rating: 'mixed',
    synonyms: ['ψ,ψ-carotene', 'tomato lycopene'],
    dose_context: '15–30mg/day in human supplementation trials. A 2017 meta-analysis of 26 studies found lycopene supplementation significantly reduced blood pressure (−5.66 mmHg systolic) and LDL cholesterol. For prostate: epidemiological data shows 4–8mg/day from diet correlates with reduced risk, but RCT data for supplemental lycopene in prostate cancer prevention is inconclusive. Processed tomato products (paste, sauce) provide 3–10× more bioavailable lycopene than raw tomatoes due to cell wall disruption from heat processing.',
  },
  {
    name: 'Lutein',
    slug: 'lutein',
    category: 'Longevity',
    description: 'Lutein is a xanthophyll carotenoid that accumulates in the macula of the retina and in the brain. It is the primary pigment responsible for macular pigment optical density (MPOD), which protects the macula from high-energy blue light and oxidative damage. The AREDS2 study confirmed lutein + zeaxanthin supplementation reduces progression to advanced age-related macular degeneration (AMD). Cognitive benefits are also emerging from MPOD research.',
    primary_use: ['macular degeneration prevention', 'eye health', 'blue light protection', 'cognitive function', 'antioxidant'],
    evidence_rating: 'strong',
    synonyms: ['beta,epsilon-carotene-3,3\'-diol', 'FloraGLO lutein'],
    dose_context: '10–20mg/day in AMD and eye health trials. AREDS2 (Age-Related Eye Disease Study 2, n=4,203) replaced beta-carotene with 10mg lutein + 2mg zeaxanthin and found significant reduction in AMD progression (26% reduced risk). Lutein in the brain may contribute to cognitive function — older adults with higher serum lutein show better processing speed. Must be taken with fat-containing meal for absorption. Often formulated with zeaxanthin in a 5:1 ratio mirroring the macular ratio.',
  },
  {
    name: 'Zeaxanthin',
    slug: 'zeaxanthin',
    category: 'Longevity',
    description: 'Zeaxanthin is a xanthophyll carotenoid that, along with lutein, comprises the macular pigment of the human eye. It is found in corn, bell peppers, and egg yolks. Zeaxanthin preferentially accumulates in the central fovea of the macula, while lutein distributes in the peripheral macula. The AREDS2 clinical trial established the combination of lutein and zeaxanthin as the recommended supplemental form for AMD prevention and treatment.',
    primary_use: ['macular degeneration prevention', 'eye health', 'blue light protection', 'visual acuity'],
    evidence_rating: 'strong',
    synonyms: ['all-trans-zeaxanthin', 'zeaxanthin'],
    dose_context: '2mg/day in the AREDS2 formulation (combined with 10mg lutein). AREDS2 (n=4,203) found this combination significantly reduced AMD progression vs placebo. Used in a 5:1 lutein:zeaxanthin ratio reflecting the natural macular ratio. Zeaxanthin alone at 8mg/day improved visual acuity and contrast sensitivity in a 2017 RCT of subjects with early macular degeneration. As with lutein, dietary fat improves absorption.',
  },

  // ─── ADAPTOGENS ────────────────────────────────────────────────────────────

  {
    name: 'Eleuthero',
    slug: 'eleuthero',
    category: 'Herbal',
    description: 'Eleuthero (Eleutherococcus senticosus), formerly known as Siberian ginseng, is an adaptogenic herb widely studied in Soviet-era research. It does not contain ginsenosides (unlike Panax ginseng) but contains eleutherosides, which modulate cortisol, immune function, and exercise endurance. Soviet-era military and athletic use drove extensive but often non-peer-reviewed research.',
    primary_use: ['adaptogen', 'endurance', 'stress resilience', 'immune support', 'fatigue reduction'],
    evidence_rating: 'limited',
    synonyms: ['Eleutherococcus senticosus', 'Siberian ginseng', 'devil\'s shrub', 'touch-me-not'],
    history_of_use: 'Eleuthero has been used in traditional Chinese medicine (TCM) as a tonic (wu jia pi) for over 2,000 years. In the 1950s, Soviet pharmacologist Nikolai Lazarev coined the term "adaptogen" in part based on his research into eleuthero. The Soviet government conducted extensive research using eleuthero for cosmonauts, Olympic athletes, and factory workers. This research led to its widespread use in Eastern Europe and eventually Western supplement markets from the 1970s onward.',
    dose_context: '300–1,200mg/day dried root or 2–16ml liquid extract in human studies. A systematic review (Panossian & Wikman, 2009) found consistent evidence for fatigue reduction and improved work capacity. Most positive evidence comes from Soviet-era research with methodological limitations. Independent RCTs are fewer but show immune and endurance benefits. Often compared with Rhodiola as the two most studied Russian adaptogens.',
  },
  {
    name: 'Schisandra',
    slug: 'schisandra',
    category: 'Herbal',
    description: 'Schisandra chinensis (five-flavour berry, wu wei zi) is an adaptogenic berry used in traditional Chinese and Russian medicine. Modern research focuses on schisandrins (lignans) as the primary active compounds, showing liver-protective (hepatoprotective), anti-stress, and performance-enhancing effects. Schisandra increases the liver\'s P-glycoprotein activity, which can affect drug metabolism.',
    primary_use: ['adaptogen', 'liver protection', 'endurance', 'stress resilience', 'fatigue reduction'],
    evidence_rating: 'limited',
    synonyms: ['wu wei zi', 'five-flavour berry', 'Schizandra chinensis', 'magnolia vine'],
    dose_context: '500–3,000mg/day dried berry extract in human studies. A review (Panossian & Wikman, 2008) found schisandra significantly reduced fatigue and improved mental performance in a double-blind RCT of pilots in high-demand conditions. Hepatoprotective effects studied in clinical liver disease populations. Caution: schisandra significantly induces CYP3A4 and P-glycoprotein — potential drug interactions with many medications including immunosuppressants and antiretrovirals.',
  },
  {
    name: 'Astragalus',
    slug: 'astragalus',
    category: 'Herbal',
    description: 'Astragalus membranaceus (huang qi) is one of the most important herbs in traditional Chinese medicine, used as an immune tonic. Modern research has identified astragalosides as the key bioactive compounds, with astragaloside IV shown to activate telomerase (the enzyme that lengthens telomeres) — generating significant longevity research interest. Cycloastragenol (TA-65), a concentrated cycloastragenol extract, is marketed specifically for telomere support.',
    primary_use: ['immune support', 'telomere support', 'adaptogen', 'anti-aging research', 'kidney protection'],
    evidence_rating: 'limited',
    synonyms: ['huang qi', 'milk vetch root', 'Astragalus membranaceus', 'TA-65 (cycloastragenol form)'],
    dose_context: '3–30g dried root or standardised extract equivalent daily in TCM use; 250–500mg standardised extract in clinical trials. A 2016 pilot study found TA-65 (cycloastragenol) supplementation significantly increased telomere length in leucocytes. Most astragalus evidence for immune function comes from Chinese clinical trials with methodological limitations. More robust independent RCTs are needed. Well-tolerated with no significant adverse effects at standard doses.',
  },
  {
    name: 'Holy Basil',
    slug: 'holy-basil',
    category: 'Herbal',
    description: 'Holy basil (Ocimum tenuiflorum, also Ocimum sanctum) — tulsi in Sanskrit — is a central herb in Ayurvedic medicine classified as an adaptogen, rasayana, and sacred plant. Modern research shows anxiolytic effects in a small RCT and blood glucose modulation consistent with traditional uses. It contains eugenol, ursolic acid, and rosmarinic acid as primary bioactives.',
    primary_use: ['adaptogen', 'anxiety reduction', 'blood glucose support', 'anti-inflammatory', 'immune support'],
    evidence_rating: 'limited',
    synonyms: ['tulsi', 'Ocimum sanctum', 'Ocimum tenuiflorum', 'sacred basil'],
    dose_context: '300–2,000mg/day dried leaf extract in human trials. A 2008 RCT (Bhattacharyya et al., n=35) found 500mg twice daily of holy basil leaf extract significantly reduced generalised anxiety disorder scores and depression versus placebo. A 2012 randomised trial found significant improvements in fasting blood glucose, postprandial blood glucose, and HbA1c in type 2 diabetics. Evidence base is small and predominantly from Indian research groups.',
  },
  {
    name: 'Shilajit',
    slug: 'shilajit',
    category: 'Longevity',
    description: 'Shilajit (also shilajeet, mumijo) is a tar-like resinous substance that oozes from rock crevices in the Himalayas, Altai, and Caucasus mountains, formed from the decomposition of plant matter over millennia. The primary bioactive is fulvic acid, alongside humic acids, dibenzo-alpha-pyrones, and 80+ minerals. Human evidence includes testosterone support, NAD+ enhancement, and mitochondrial function improvement.',
    primary_use: ['testosterone support', 'NAD+ precursor', 'mitochondrial function', 'anti-fatigue', 'longevity research'],
    evidence_rating: 'limited',
    synonyms: ['mumijo', 'mumiyo', 'salajeet', 'mineral pitch', 'Himalayan shilajit'],
    dose_context: '200–500mg/day purified shilajit extract in human trials. A 2015 RCT (Pandit S et al., n=75 healthy men) found 250mg twice daily for 90 days significantly increased total and free testosterone and DHEAS compared to placebo. A 2016 study found shilajit supplementation reduced the decline in coenzyme Q10 levels in overweight adults. Quality control is critical — unpurified shilajit may contain heavy metals and mycotoxins. Only pharmaceutical-grade purified extracts (Primavie, PrimaVie) should be used.',
  },
  {
    name: 'Mucuna Pruriens',
    slug: 'mucuna-pruriens',
    category: 'Herbal',
    description: 'Mucuna pruriens (velvet bean) seeds contain high concentrations of L-DOPA (levodopa), the direct precursor to dopamine. Pharmaceutical L-DOPA is the gold standard treatment for Parkinson\'s disease. A clinical trial confirmed Mucuna pruriens extract produced comparable clinical benefits to standard levodopa/carbidopa in Parkinson\'s patients. Used in Ayurveda (as kapikachhu) for male fertility and libido support.',
    primary_use: ['dopamine precursor', 'testosterone support', 'Parkinson\'s research', 'fertility support', 'mood support'],
    evidence_rating: 'limited',
    synonyms: ['velvet bean', 'kapikachhu', 'cowage', 'L-DOPA containing bean'],
    legal_notes: 'Mucuna pruriens contains significant amounts of L-DOPA, which is a prescription drug in pharmaceutical form. Individuals taking pharmaceutical L-DOPA/carbidopa (for Parkinson\'s disease) should not combine with Mucuna pruriens without neurologist supervision, as this can lead to L-DOPA toxicity. Not suitable for individuals with psychosis, cardiovascular disease, or pregnancy.',
    dose_context: '5g seed powder (providing ~250mg L-DOPA) in the Parkinson\'s clinical trial (Katzenschlager 2004). For male fertility: 5g seed powder for 3 months increased sperm count and motility in infertile men (Shukla 2010). L-DOPA content varies by preparation — standardised extracts report L-DOPA percentage for accurate dosing. Seeds must be processed to remove serotonin and itching compounds (mucunain) that cause irritation.',
  },

  // ─── IMMUNE SUPPORT ────────────────────────────────────────────────────────

  {
    name: 'Elderberry',
    slug: 'elderberry',
    category: 'Herbal',
    description: 'Elderberry (Sambucus nigra) fruit extract has consistent clinical evidence for reducing the duration and severity of influenza and common cold. Two double-blind RCTs show elderberry extract (Sambucol, Eldercraft) reduces influenza duration by 2–4 days. The proposed mechanism involves flavonoid binding to influenza virus proteins, preventing cellular entry, and cytokine stimulation.',
    primary_use: ['cold and flu duration', 'immune support', 'antiviral', 'antioxidant'],
    evidence_rating: 'moderate',
    synonyms: ['Sambucus nigra', 'black elderberry', 'European elderberry', 'Sambucol'],
    dose_context: '600–900mg elderberry extract (standardised to 3.2% anthocyanins) or 15ml liquid 4× daily in clinical trials. A 2016 RCT (Tiralongo et al., n=312 air travellers) found elderberry supplementation reduced cold duration by 2 days. The 2004 RCT (Zakay-Rones et al., n=60 influenza patients) found 15ml 4× daily reduced influenza duration from 6 to 3 days. Raw elderberries contain sambunigrin (cyanogenic glycoside) and must be cooked or processed. Standardised extracts are safe. Must not be used with immunosuppressants.',
  },
  {
    name: 'Echinacea',
    slug: 'echinacea',
    category: 'Herbal',
    description: 'Echinacea (primarily Echinacea purpurea and Echinacea angustifolia) is the most commonly used herbal immune supplement in Western markets. Evidence for preventing or reducing common cold duration is mixed across the large body of trials — a 2015 Cochrane review of 24 studies found modest benefits for cold prevention (relative risk reduction 10–20%) with some preparations but not others. The species, plant part, and extraction method significantly affect efficacy.',
    primary_use: ['immune support', 'common cold prevention', 'common cold treatment', 'antiviral'],
    evidence_rating: 'mixed',
    synonyms: ['purple coneflower', 'Echinacea purpurea', 'Echinacea angustifolia'],
    dose_context: '400–900mg dried extract (E. purpurea above-ground parts, standardised to >4% echinacosides or >2.5% alkylamides) up to three times daily at first sign of cold. A 2007 meta-analysis (Shah et al.) found echinacea reduced cold incidence by 58% and duration by 1.4 days — but included heterogeneous studies. Cochrane review (2015, 24 RCTs) found modest to no benefit depending on preparation. Key finding: product quality and species matter enormously — not all "echinacea" products behave the same. Contraindicated in autoimmune disorders.',
  },
  {
    name: 'Beta-Glucan',
    slug: 'beta-glucan',
    category: 'Gut Health',
    description: 'Beta-glucans are polysaccharides found in the cell walls of oats, barley, yeasts (Saccharomyces cerevisiae), and medicinal mushrooms. Oat and barley beta-glucans have FDA-approved health claims for lowering cholesterol. Yeast-derived beta-1,3/1,6-glucans (Baker\'s Yeast glucan, Wellmune) have the strongest immune evidence, with multiple RCTs showing reductions in upper respiratory tract infection incidence.',
    primary_use: ['immune stimulation', 'cholesterol reduction', 'gut health', 'upper respiratory infection prevention'],
    evidence_rating: 'strong',
    synonyms: ['beta-1,3/1,6-glucan', 'oat beta-glucan', 'yeast beta-glucan', 'Wellmune'],
    dose_context: '250mg–3g/day depending on source and indication. Oat/barley beta-glucan: 3g/day for the FDA-approved LDL cholesterol reduction claim. Yeast beta-glucan (Wellmune): 250mg/day reduced upper respiratory infection incidence by 25% in a 12-week RCT of marathon runners. A meta-analysis of 34 studies found oat beta-glucan reduces LDL by ~5% at 3g/day. Immune effects differ by source: yeast (1,3/1,6 linkage) has more immune evidence; oat (1,3/1,4 linkage) has more cholesterol evidence.',
  },
  {
    name: 'Andrographis',
    slug: 'andrographis',
    category: 'Herbal',
    description: 'Andrographis paniculata (King of Bitters) is a bitter herb widely used in Ayurvedic and traditional Asian medicine for upper respiratory infections, fever, and inflammation. The primary active compound, andrographolide, has demonstrated antiviral, anti-inflammatory, and immunomodulatory activity. A systematic review and meta-analysis of 7 RCTs confirms significant efficacy for uncomplicated upper respiratory tract infection.',
    primary_use: ['upper respiratory infection', 'anti-inflammatory', 'antiviral', 'fever reduction', 'immune support'],
    evidence_rating: 'moderate',
    synonyms: ['King of Bitters', 'creat', 'andrographolide', 'Kan Jang'],
    dose_context: '400–1,200mg/day standardised extract (4–6% andrographolides) in URTI trials. A systematic review of 7 RCTs (Poolsup et al., 2004) found andrographis significantly improved cold symptom scores and reduced duration versus placebo. The Kan Jang proprietary preparation (SHA-10) has the most clinical evidence. Most effective when started within 24–48 hours of symptom onset. Note: bitter taste may cause nausea; take with food. Not recommended in pregnancy.',
  },
  {
    name: 'Black Seed Oil',
    slug: 'black-seed-oil',
    category: 'Herbal',
    description: 'Black seed oil from Nigella sativa seeds (also called black cumin, haba sawda) has been used in Islamic medicine for centuries — referenced in Hadith as "a cure for everything except death." Thymoquinone is the primary active compound with antioxidant, anti-inflammatory, and antimicrobial properties. Clinical evidence is strongest for metabolic outcomes: blood glucose, blood pressure, and lipids.',
    primary_use: ['anti-inflammatory', 'blood glucose support', 'lipid reduction', 'asthma', 'immune support'],
    evidence_rating: 'mixed',
    synonyms: ['Nigella sativa', 'black cumin oil', 'haba al-sawda', 'kalonji', 'thymoquinone source'],
    dose_context: '1–3g/day black seed oil or 1,000mg/day seed powder in clinical trials. A 2016 meta-analysis of 17 RCTs found black seed oil significantly reduced fasting blood glucose, total cholesterol, LDL, and triglycerides. A 2016 meta-analysis on blood pressure found significant reductions at 2–3g/day seed powder. Evidence quality is variable — many studies from single research groups. Well-tolerated at up to 3g/day; hepatotoxicity reported at very high doses (not relevant at supplement doses).',
  },

  // ─── MOOD / HORMONAL ───────────────────────────────────────────────────────

  {
    name: 'Saffron',
    slug: 'saffron',
    category: 'Herbal',
    description: 'Saffron (Crocus sativus) stigmas contain crocins, crocetin, and safranal — compounds with serotonergic activity that support mood regulation. Clinical evidence for mild-to-moderate depression is consistent across multiple RCTs, with effect sizes comparable to low-dose antidepressants in some trials. A 2014 systematic review identified 11 human trials with positive results for depression and anxiety.',
    primary_use: ['mood support', 'depression research', 'anxiety reduction', 'antioxidant', 'PMS symptoms'],
    evidence_rating: 'moderate',
    synonyms: ['Crocus sativus', 'crocin', 'safranal', 'Affron'],
    dose_context: '30–88.5mg/day standardised extract in depression trials (or 15mg extract twice daily). A 2014 systematic review (Lopresti & Drummond, 11 RCTs) found saffron consistently improved depression scores in mild-to-moderate depression. Effect sizes comparable to low-dose imipramine and fluoxetine in head-to-head trials. At 30mg/day standardised extract (Affron): significantly reduced depressive symptoms in multiple RCTs. Well-tolerated at clinical doses; nausea and drowsiness most common adverse effects.',
  },
  {
    name: 'St. John\'s Wort',
    slug: 'st-johns-wort',
    category: 'Herbal',
    description: 'St. John\'s Wort (Hypericum perforatum) is the most extensively studied herbal antidepressant. A 2008 Cochrane systematic review of 29 studies (n=5,489) found it significantly more effective than placebo and as effective as standard antidepressants for mild-to-moderate depression, with fewer adverse effects. However, it is a potent inducer of CYP3A4 and P-glycoprotein, causing clinically significant drug interactions with numerous medications.',
    primary_use: ['depression (mild-moderate)', 'anxiety', 'mood support', 'sleep quality'],
    evidence_rating: 'strong',
    synonyms: ['Hypericum perforatum', 'hypericum', 'Tipton\'s weed', 'klamath weed'],
    legal_notes: 'St. John\'s Wort is a potent inducer of cytochrome P450 enzymes (CYP3A4, CYP2C9) and P-glycoprotein. This causes significant drug interactions: it can reduce blood levels of oral contraceptives (unintended pregnancy risk), antiretroviral drugs (treatment failure risk), immunosuppressants (transplant rejection risk), warfarin (clotting risk), and many other medications. Contraindicated with SSRIs due to serotonin syndrome risk. In several European countries, St. John\'s Wort is available only as a licensed medicine, not a food supplement. Always disclose use to prescribers.',
    dose_context: '300–900mg/day of extract standardised to 0.3% hypericin or 5% hyperforin in clinical trials. Cochrane review (Linde et al., 2008, 29 RCTs, n=5,489) found significant benefit vs placebo (RR 1.48) and comparable to antidepressants with better tolerability. Effect takes 4–6 weeks — same onset as pharmaceutical antidepressants. Drug interactions (see legal notes) are the primary clinical concern and are dose-dependent.',
  },
  {
    name: 'DIM',
    slug: 'dim',
    category: 'Herbal',
    description: 'Diindolylmethane (DIM) is formed from indole-3-carbinol (I3C) during digestion of cruciferous vegetables (broccoli, cauliflower, Brussels sprouts). It modulates oestrogen metabolism, promoting conversion of oestrogens to 2-hydroxyestrone (less potent) over 16α-hydroxyestrone (more potent). Clinical use in hormonal balance, oestrogen-dominant conditions (PMS, endometriosis, PCOS), and as an adjunct in breast and prostate cancer research.',
    primary_use: ['oestrogen metabolism', 'hormonal balance', 'PMS', 'breast cancer research', 'prostate health'],
    evidence_rating: 'limited',
    synonyms: ['diindolylmethane', '3,3\'-diindolylmethane', 'I3C metabolite'],
    dose_context: '75–300mg/day DIM in human trials. A 2012 RCT found DIM (108mg/day) shifted oestrogen metabolism toward 2-hydroxylation in women at elevated breast cancer risk. A 2014 study (BioResponse DIM, 150mg/day) improved oestrogen metabolite ratios and reduced PSA doubling time in prostate cancer patients. Bioavailability of standard DIM is poor; microencapsulated or liposomal forms (BioResponse DIM) significantly improve absorption. Not suitable for use with oestrogen-containing medications without medical supervision.',
  },
  {
    name: 'Inositol',
    slug: 'inositol',
    category: 'Gut Health',
    description: 'Inositol is a carbocyclic sugar and isomer of glucose found in many foods and synthesised by the body. Myo-inositol is the most abundant form and is a precursor to phosphatidylinositol, a key component of cell membrane signalling. Clinical evidence is strongest for PCOS (polycystic ovary syndrome) — a systematic review of 13 RCTs shows myo-inositol significantly improves ovulation, insulin resistance, and metabolic parameters in PCOS. Also studied for OCD and panic disorder.',
    primary_use: ['PCOS treatment', 'insulin sensitivity', 'ovarian function', 'mood disorders', 'fertility'],
    evidence_rating: 'moderate',
    synonyms: ['myo-inositol', 'D-chiro-inositol', 'vitamin B8 (obsolete)'],
    dose_context: '2–4g/day myo-inositol (or 2g myo-inositol + 50mg D-chiro-inositol in 40:1 ratio) for PCOS. A 2012 systematic review (Unfer et al., 13 RCTs) found myo-inositol significantly improved ovulation rate, fasting insulin, and androgens in PCOS. The 40:1 myo:D-chiro ratio mimics the physiological ratio. OCD studies: 12–18g/day in RCTs showed benefit comparable to serotonin reuptake inhibitors. Panic disorder: 12g/day in crossover RCT reduced panic attacks versus placebo. Generally very well-tolerated; mild GI effects at high doses.',
  },
  {
    name: 'DHEA',
    slug: 'dhea',
    category: 'Longevity',
    description: 'Dehydroepiandrosterone (DHEA) is an adrenal steroid hormone and the most abundant circulating steroid in the body. Serum DHEA declines markedly with age (peak at 20–30 years, declining ~2% per year thereafter). DHEA serves as a precursor to sex hormones (testosterone, oestrogens). Clinical evidence shows modest benefits for bone density in older women, sexual function in adrenal insufficiency, and reduced autoimmune markers in lupus.',
    primary_use: ['adrenal hormone support', 'libido', 'bone density', 'anti-aging research', 'adrenal insufficiency'],
    evidence_rating: 'mixed',
    synonyms: ['dehydroepiandrosterone', 'dehydroisoandrosterone', 'prasterone'],
    legal_notes: 'DHEA is a controlled substance in several countries including Canada, UK, Australia, and most of Europe, where it is available only on prescription. In the United States, DHEA is legal as a dietary supplement under DSHEA. In competitive sports, DHEA is prohibited by WADA as an endogenous anabolic androgenic steroid. Individuals subject to drug testing should not use DHEA. Those with hormone-sensitive conditions (prostate cancer, breast cancer, oestrogen-receptor positive cancer) should not use without medical supervision.',
    dose_context: '25–50mg/day in most adult studies; 5–10mg/day in studies of older women for bone health. Labrie et al. (1997) documented the age-related decline in DHEA. A 2001 Cochrane review found DHEA improved sexual function in women with adrenal insufficiency. For lupus: 200mg/day DHEA reduced disease activity in RCTs. Blood testing before and during supplementation is recommended to avoid supraphysiological levels.',
  },

  // ─── METABOLIC / BLOOD GLUCOSE ─────────────────────────────────────────────

  {
    name: 'Bitter Melon',
    slug: 'bitter-melon',
    category: 'Herbal',
    description: 'Bitter melon (Momordica charantia) is a tropical fruit used in Asian, African, and Caribbean traditional medicine for blood glucose management. Active compounds include charantin, polypeptide-p, and vicine, which modulate glucose metabolism via mechanisms resembling insulin and AMPK activation. Clinical evidence from RCTs is inconsistent — some trials show meaningful glucose reductions, others do not.',
    primary_use: ['blood glucose support', 'insulin sensitivity', 'type 2 diabetes research', 'anti-diabetic'],
    evidence_rating: 'mixed',
    synonyms: ['Momordica charantia', 'karela', 'bitter gourd', 'foo gwa', 'balsam pear'],
    dose_context: '1,000–2,000mg/day dried fruit powder or 50–100ml fresh juice in clinical trials. A 2011 RCT (Fuangchan et al., n=143) compared bitter melon with metformin in newly diagnosed type 2 diabetics — both reduced fasting glucose and HbA1c, but metformin was more effective. Most positive trials used standardised extracts. Evidence quality is generally low-to-moderate. Not to replace prescribed diabetes medications. Monitor blood glucose when combining with antidiabetic drugs.',
  },
  {
    name: 'Gymnema Sylvestre',
    slug: 'gymnema-sylvestre',
    category: 'Herbal',
    description: 'Gymnema sylvestre (gurmar, "sugar destroyer") is an Ayurvedic herb named for its ability to suppress sweet taste perception — gymnemic acids bind sweet taste receptors, temporarily blocking sugar detection. Clinical evidence shows blood glucose and HbA1c reductions in both type 1 and type 2 diabetes patients, and reduced sugar cravings. The 200-400mg gymnemic acid content standardised extract has the most evidence.',
    primary_use: ['blood glucose support', 'sugar craving reduction', 'insulin support', 'weight management'],
    evidence_rating: 'moderate',
    synonyms: ['gurmar', 'sugar destroyer', 'Gymnema sylvestre leaf extract', 'gymnemic acids'],
    dose_context: '400mg/day standardised gymnema extract (75% gymnemic acids) in diabetes trials. A foundational study (Baskaran et al., 1990, n=22 type 2 diabetics) found 400mg/day for 18–20 months allowed conventional antidiabetic drug reduction with maintained glucose control. A type 1 diabetes study found gymnema extract reduced insulin requirements. Effect on sweet taste: temporary (30–60 minutes) — relevant for reducing sugar palatability and cravings. Monitor blood glucose when combining with antidiabetic medications.',
  },
  {
    name: 'White Mulberry',
    slug: 'white-mulberry',
    category: 'Herbal',
    description: 'White mulberry (Morus alba) leaf extract inhibits alpha-glucosidase enzymes in the gut, slowing carbohydrate digestion and reducing postprandial blood glucose spikes. The active compound 1-deoxynojirimycin (DNJ) is an iminosugar with a similar mechanism to the pharmaceutical alpha-glucosidase inhibitor acarbose. Clinical trials show significant reductions in postprandial blood glucose when taken before carbohydrate-containing meals.',
    primary_use: ['blood glucose management', 'postprandial glucose reduction', 'alpha-glucosidase inhibition', 'insulin sensitivity'],
    evidence_rating: 'moderate',
    synonyms: ['Morus alba', 'sang ye', '1-deoxynojirimycin', 'DNJ source', 'mulberry leaf extract'],
    dose_context: '200–3,000mg dried leaf powder or extract taken before meals in clinical trials. Key: must be taken 0–20 minutes before a carbohydrate-containing meal to inhibit postprandial glucose rise. A 2017 meta-analysis found mulberry leaf extract significantly reduced 2-hour postprandial blood glucose and HbA1c. Evidence quality varies; well-tolerated with no significant adverse effects at clinical doses. Standardised to DNJ content for consistent dosing.',
  },

  // ─── JOINT / RECOVERY ──────────────────────────────────────────────────────

  {
    name: 'Boswellia',
    slug: 'boswellia',
    category: 'Herbal',
    description: 'Boswellia serrata (Indian frankincense) resin extract is a potent anti-inflammatory herb with evidence for osteoarthritis, inflammatory bowel disease, and asthma. The primary active compounds — AKBA (acetyl-11-keto-beta-boswellic acid) and other boswellic acids — selectively inhibit 5-lipoxygenase (5-LOX), reducing leukotriene production. Unlike NSAIDs, boswellia does not inhibit COX-1 and therefore does not cause gastric ulceration at therapeutic doses.',
    primary_use: ['anti-inflammatory', 'osteoarthritis', 'joint pain', 'inflammatory bowel disease', 'asthma'],
    evidence_rating: 'moderate',
    synonyms: ['Indian frankincense', 'Boswellia serrata', 'olibanum', 'salai guggul', 'Aflapin', 'AprèsFlex'],
    mechanism_of_action: 'Boswellic acids, particularly AKBA, inhibit 5-lipoxygenase (5-LOX) — the enzyme responsible for converting arachidonic acid to leukotrienes. Leukotrienes are potent pro-inflammatory mediators involved in arthritis and asthma. Unlike NSAIDs, boswellic acids do not inhibit COX-1, so they do not increase gastric acid secretion or reduce gastric mucosal protection. This mechanism explains the superior GI tolerability compared to ibuprofen in comparative trials.',
    dose_context: '100–400mg/day standardised to 30–65% boswellic acids, or 100mg Aflapin (20% AKBA) in osteoarthritis trials. A 2015 meta-analysis of 7 RCTs found boswellia significantly reduced knee OA pain and improved function. Aflapin (20% AKBA concentration) shows effects at 100mg/day — lower dose than standard extract due to AKBA concentration. Comparable to NSAIDs for pain reduction in some direct comparison trials, with substantially better GI tolerability. Time to effect: 2–4 weeks.',
  },
  {
    name: 'Devil\'s Claw',
    slug: 'devils-claw',
    category: 'Herbal',
    description: 'Devil\'s claw (Harpagophytum procumbens) is a South African plant whose tuberous roots are used for back pain and arthritis. The primary active compound harpagoside is an iridoid glycoside with demonstrated anti-inflammatory effects. A 2016 Cochrane review found devil\'s claw reduces low back pain to a greater degree than placebo, with evidence comparable to some pharmaceutical pain relievers for short-term relief.',
    primary_use: ['back pain', 'joint pain', 'osteoarthritis', 'anti-inflammatory'],
    evidence_rating: 'moderate',
    synonyms: ['Harpagophytum procumbens', 'grapple plant', 'wood spider', 'harpagoside source'],
    dose_context: '600–1,200mg/day dried extract standardised to 50–100mg harpagoside in clinical trials. A systematic review of 12 RCTs found standardised devil\'s claw extract significantly reduced low back pain. An open-label trial of 183 patients with hip and knee OA found devil\'s claw comparable to diacerhein (a pharmaceutical) for pain reduction. Must be standardised to harpagoside content — unstandardised products are ineffective. Caution: may interact with anticoagulants; contraindicated in peptic ulcer disease (stimulates gastric acid secretion).',
  },
  {
    name: 'UC-II Collagen',
    slug: 'uc-ii-collagen',
    category: 'Recovery',
    description: 'Undenatured type II collagen (UC-II) is a specific form of chicken sternal cartilage-derived type II collagen that is NOT hydrolysed. Unlike hydrolysed collagen peptides (which provide amino acid precursors), UC-II works via oral tolerance — small amounts (40mg) trigger regulatory T-cells in the gut to suppress autoimmune attack on joint cartilage. Evidence shows UC-II reduces osteoarthritis symptoms more effectively than glucosamine + chondroitin.',
    primary_use: ['joint pain', 'osteoarthritis', 'cartilage protection', 'rheumatoid arthritis research'],
    evidence_rating: 'moderate',
    synonyms: ['undenatured type II collagen', 'UC-II', 'native type II collagen'],
    mechanism_of_action: 'UC-II works via oral tolerisation rather than providing collagen building blocks. Intact type II collagen reaches the Peyer\'s patches of the gut-associated lymphoid tissue (GALT), where it activates regulatory T-cells (Tregs) that suppress the immune response against articular cartilage. This mechanism requires the collagen to remain undenatured (intact triple helix) — cooking or hydrolysis destroys the effect. This is why UC-II works at 40mg while hydrolysed collagen requires 5–15g.',
    dose_context: '40mg/day UC-II taken on an empty stomach in clinical trials. A 2016 RCT (Lugo et al., n=191) found UC-II 40mg/day significantly improved knee OA symptoms over placebo and outperformed glucosamine 1,500mg + chondroitin 1,200mg on WOMAC and VAS pain scores. A separate RCT in healthy athletes found UC-II reduced exercise-induced joint discomfort. The 40mg dose is substantially lower than hydrolysed collagen — this is not a dose error but reflects the different mechanism.',
  },
  {
    name: 'SAMe',
    slug: 'same',
    category: 'Recovery',
    description: 'S-Adenosyl-L-Methionine (SAMe) is a naturally occurring compound produced in all living cells and is the primary methyl donor in biochemical reactions. SAMe has pharmaceutical status in some countries and clinical evidence for both depression and osteoarthritis. For depression, multiple meta-analyses show efficacy comparable to tricyclic antidepressants. For osteoarthritis, SAMe reduces pain as effectively as NSAIDs in head-to-head trials.',
    primary_use: ['depression', 'osteoarthritis', 'liver support', 'methylation support', 'joint pain'],
    evidence_rating: 'moderate',
    synonyms: ['S-Adenosylmethionine', 'ademetionine', 'SAM-e'],
    dose_context: '400–1,600mg/day (as tosylate or butanedisulfonate salt) in clinical trials. For depression: 800–1,600mg/day — a 2002 review (Mischoulon & Fava) found evidence comparable to standard antidepressants. For osteoarthritis: 600–1,200mg/day — a meta-analysis of 11 RCTs found SAMe equivalent to NSAIDs for pain and functional improvement with significantly better GI tolerability. Unstable compound — must be enteric-coated or foil-packaged. High cost limits widespread use. Avoid in bipolar disorder (may trigger mania). Not to be combined with MAOIs.',
  },

  // ─── SKIN / BEAUTY ─────────────────────────────────────────────────────────

  {
    name: 'Marine Collagen',
    slug: 'marine-collagen',
    category: 'Recovery',
    description: 'Marine collagen is collagen extracted from the skin, scales, and bones of fish, predominantly yielding type I collagen. Compared to bovine collagen, marine collagen has a lower molecular weight (making it more readily absorbed) and is free from mammalian pathogens. Evidence for skin elasticity and wrinkle reduction mirrors that of bovine collagen peptides — predominantly from manufacturer-associated trials but with consistent positive findings.',
    primary_use: ['skin elasticity', 'wrinkle reduction', 'collagen synthesis', 'joint support', 'hair and nail health'],
    evidence_rating: 'moderate',
    synonyms: ['fish collagen', 'marine collagen peptides', 'hydrolysed fish collagen'],
    dose_context: '2.5–10g/day hydrolysed marine collagen peptides in skin trials. A 2018 systematic review of 11 studies found oral collagen supplementation (1–12g/day, 4–24 weeks) significantly improved skin hydration, elasticity, and wrinkle depth in all included studies. Marine collagen molecular weight (~300–500 Da after hydrolysis) provides rapid intestinal absorption. Take with vitamin C to support collagen synthesis. Most studies have manufacturer associations — independent RCTs are limited.',
  },
  {
    name: 'Evening Primrose Oil',
    slug: 'evening-primrose-oil',
    category: 'Omega Oils',
    description: 'Evening primrose oil (EPO) is extracted from the seeds of Oenothera biennis and is one of the richest plant sources of gamma-linolenic acid (GLA, 8–10% of total fatty acids). GLA is an omega-6 fatty acid that serves as a precursor to dihomo-gamma-linolenic acid (DGLA), an anti-inflammatory prostaglandin precursor. Clinical evidence for EPO is established for mastalgia (breast pain), eczema, and rheumatoid arthritis.',
    primary_use: ['GLA source', 'mastalgia', 'eczema', 'rheumatoid arthritis', 'PMS symptoms', 'skin health'],
    evidence_rating: 'mixed',
    synonyms: ['EPO', 'Oenothera biennis oil', 'GLA supplement', 'gamma-linolenic acid source'],
    dose_context: '2–4g/day EPO (providing 160–320mg GLA) in most clinical trials. For mastalgia: 3g/day for 3–6 months is the most studied dose with consistent positive evidence. For eczema: 3–4g/day showed benefits in older trials but a 2013 Cochrane review found insufficient evidence for atopic eczema. For rheumatoid arthritis: 1.4–2.8g GLA/day (from EPO or borage oil) showed anti-inflammatory effects in RCTs. Onset of effect takes 3–6 months. Combine with vitamin E to protect GLA from oxidation.',
  },
  {
    name: 'Silica',
    slug: 'silica',
    category: 'Minerals',
    description: 'Silicon (as orthosilicic acid, the bioavailable form) is the third most abundant trace element in the human body and plays structural roles in bone, cartilage, skin, hair, and nails. Most research uses choline-stabilised orthosilicic acid (BioSil) as it provides bioavailable silicon rather than the poorly absorbed silicon dioxide. Clinical evidence shows improved hair, nail, and skin outcomes at 10mg/day of orthosilicic acid.',
    primary_use: ['collagen synthesis', 'bone density', 'hair strength', 'nail strength', 'skin health'],
    evidence_rating: 'limited',
    synonyms: ['orthosilicic acid', 'silicon dioxide', 'BioSil', 'colloidal silica'],
    dose_context: '6–10mg/day of bioavailable orthosilicic acid (as BioSil or similar) in human trials. A 2005 RCT (n=48) found choline-stabilised orthosilicic acid (BioSil, 10mg Si/day) significantly improved hair thickness and nail brittleness vs placebo over 20 weeks. A 2008 RCT found BioSil reduced skin roughness and improved skin elasticity. Silicon dioxide (SiO2) — common in supplements as anti-caking agent — has very low bioavailability compared to orthosilicic acid.',
  },

  // ─── ADDITIONAL MINERALS ───────────────────────────────────────────────────

  {
    name: 'Selenium',
    slug: 'selenium',
    category: 'Minerals',
    description: 'Selenium is a trace element essential for the function of selenoproteins including glutathione peroxidases (antioxidant), thioredoxin reductases, and iodothyronine deiodinases (thyroid hormone conversion). Selenium deficiency is associated with Keshan disease (cardiomyopathy) and Kashin-Beck disease (osteoarthropathy). Evidence for cancer prevention is mixed — the SELECT trial found no cancer prevention benefit from selenomethionine.',
    primary_use: ['antioxidant enzymes', 'thyroid function', 'immune support', 'male fertility'],
    evidence_rating: 'moderate',
    synonyms: ['selenomethionine', 'selenium yeast', 'sodium selenite'],
    dose_context: '100–400mcg/day in human supplementation trials. Recommended daily allowance: 55–70mcg. Upper tolerable limit: 400mcg/day (selenium toxicity — selenosis — occurs above this level with chronic use). Form matters: selenomethionine (organic) has ~90% bioavailability; sodium selenite (inorganic) ~50%. Thyroid: selenium is required for conversion of T4 to active T3 (by deiodinase enzymes) — deficiency impairs thyroid function. SELECT trial (35,533 men): 200mcg/day selenomethionine did not reduce prostate cancer.',
  },
  {
    name: 'Iodine',
    slug: 'iodine',
    category: 'Minerals',
    description: 'Iodine is an essential trace mineral required for thyroid hormone synthesis — thyroxine (T4) contains 4 iodine atoms, triiodothyronine (T3) contains 3. Iodine deficiency is the most prevalent cause of preventable intellectual disability worldwide. Deficiency causes hypothyroidism and goitre. Iodine excess can also impair thyroid function. Most populations in iodine-sufficient countries (using iodised salt) do not require supplementation.',
    primary_use: ['thyroid function', 'thyroid hormone synthesis', 'iodine deficiency', 'cognitive development'],
    evidence_rating: 'strong',
    synonyms: ['potassium iodide', 'potassium iodate', 'molecular iodine'],
    dose_context: 'RDA: 150mcg/day adults; 220–290mcg/day pregnant and lactating women. Tolerable upper limit: 1,100mcg/day (lower for thyroid conditions). Zimmermann (2009) comprehensive review: iodine deficiency affects ~2 billion people globally — the leading preventable cause of brain damage. Sources: seaweed (highly variable), iodised salt, dairy. Iodine excess: both deficiency and excess can trigger thyroid dysfunction (autoimmune and non-autoimmune). Individuals with thyroid disease, Hashimoto\'s, or Graves\' disease should consult a physician before supplementing.',
  },
  {
    name: 'Copper',
    slug: 'copper',
    category: 'Minerals',
    description: 'Copper is an essential trace mineral required as a cofactor for numerous enzymes including ceruloplasmin (iron metabolism), superoxide dismutase (antioxidant), lysyl oxidase (collagen and elastin crosslinking), and cytochrome c oxidase (mitochondrial electron transport). Deficiency — while uncommon — causes anaemia, osteoporosis, and neurological dysfunction. High zinc supplementation inhibits copper absorption, making copper monitoring important in high-dose zinc users.',
    primary_use: ['enzyme cofactor', 'iron metabolism', 'collagen synthesis', 'antioxidant support', 'zinc balance'],
    evidence_rating: 'moderate',
    synonyms: ['cupric sulfate', 'copper glycinate', 'copper sebacate'],
    dose_context: 'RDA: 900mcg/day adults. Tolerable upper limit: 10mg/day. Zinc:copper ratio in supplements is important — high zinc intake (>40mg/day) reduces copper absorption via competition for metallothionein binding. Supplements providing >40mg/day zinc should include 1–2mg copper. Copper deficiency symptoms: microcytic anaemia unresponsive to iron, neuropathy, impaired immune function. Excess copper: hepatotoxicity at very high doses. Normal dietary intake usually sufficient in Western populations.',
  },
  {
    name: 'Manganese',
    slug: 'manganese',
    category: 'Minerals',
    description: 'Manganese is an essential trace mineral serving as a cofactor for manganese superoxide dismutase (MnSOD — the primary mitochondrial antioxidant enzyme), arginase, and enzymes in glucosamine and chondroitin synthesis. It is essential for bone formation, carbohydrate metabolism, and normal brain function. Dietary deficiency is rare. Manganese toxicity (manganism) from excessive intake causes Parkinson\'s-like neurological symptoms.',
    primary_use: ['antioxidant enzyme cofactor', 'bone health', 'glucose metabolism', 'cartilage synthesis'],
    evidence_rating: 'moderate',
    synonyms: ['manganese sulfate', 'manganese gluconate', 'manganese glycinate'],
    dose_context: 'Adequate intake: 1.8–2.3mg/day adults. Tolerable upper limit: 11mg/day. Found abundantly in whole grains, legumes, nuts, and tea. Deficiency uncommon from diet alone. Often included in joint formulations (glucosamine + chondroitin + manganese) as a cofactor for proteoglycan synthesis. High doses or occupational inhalation exposure (welding fumes) causes manganism — supplement doses are far below toxic ranges.',
  },
  {
    name: 'Iron',
    slug: 'iron',
    category: 'Minerals',
    description: 'Iron is an essential mineral for haemoglobin synthesis (oxygen transport), myoglobin (muscle oxygen storage), and numerous enzyme cofactors. Iron deficiency anaemia is the most common nutritional deficiency globally. Supplementation is indicated for documented deficiency or risk groups (menstruating women, vegans, endurance athletes, pregnant women). Excess iron is toxic and supplementation without confirmed deficiency is not recommended.',
    primary_use: ['haemoglobin synthesis', 'anaemia treatment', 'oxygen transport', 'energy production'],
    evidence_rating: 'strong',
    synonyms: ['ferrous sulfate', 'ferrous gluconate', 'ferrous bisglycinate', 'ferric iron'],
    dose_context: 'Therapeutic doses for iron deficiency anaemia: 150–200mg elemental iron/day (split doses). RDA: 8mg/day men, 18mg/day premenopausal women. Tolerable upper limit: 45mg/day. Form matters substantially: ferrous bisglycinate (iron glycinate chelate) causes 90% less GI side effects (constipation, nausea) than ferrous sulfate at equivalent doses. Blood testing (serum ferritin, haemoglobin, TIBC) required before supplementation — iron overload (hereditary haemochromatosis) is life-threatening. Take on empty stomach or with vitamin C (increase absorption); avoid calcium, tea, coffee within 2 hours (decrease absorption).',
  },

  // ─── ADDITIONAL VITAMINS ───────────────────────────────────────────────────

  {
    name: 'Methylfolate',
    slug: 'methylfolate',
    category: 'Vitamins',
    description: 'Methylfolate (5-methyltetrahydrofolate, 5-MTHF) is the bioactive form of folate (vitamin B9) that requires no metabolic conversion. Standard folic acid (synthetic folate) must be converted by MTHFR enzyme before use — approximately 10–15% of the population have MTHFR gene variants (677C>T polymorphism) that significantly impair this conversion. Methylfolate bypasses MTHFR and is directly usable by the body.',
    primary_use: ['methylation support', 'neural tube defect prevention', 'homocysteine reduction', 'MTHFR gene variant support', 'mood'],
    evidence_rating: 'strong',
    synonyms: ['5-methyltetrahydrofolate', '5-MTHF', 'L-methylfolate', 'Metafolin', 'Quatrefolic'],
    dose_context: 'RDA for folate: 400mcg DFE/day adults; 600mcg DFE/day pregnancy. For MTHFR heterozygotes: 400–800mcg methylfolate. For depression augmentation: 7.5–15mg methylfolate (Deplin) in trials. Neural tube defect prevention: 400mcg/day methylfolate starting 1 month before conception through first trimester — most important supplementation period. Note: methylfolate may mask vitamin B12 deficiency signs (anaemia) while allowing neurological damage to progress — combine with B12 assessment. Folic acid in fortified foods is not equivalent for MTHFR variant carriers.',
  },
  {
    name: 'Vitamin K1',
    slug: 'vitamin-k1',
    category: 'Vitamins',
    description: 'Vitamin K1 (phylloquinone) is found in leafy green vegetables and is the predominant dietary form of vitamin K. It is primarily used by the liver for synthesis of blood clotting factors (factors II, VII, IX, X, and proteins C and S). Unlike vitamin K2, which circulates to peripheral tissues and activates osteocalcin and matrix Gla protein, K1 is preferentially taken up by the liver. Deficiency causes impaired blood clotting.',
    primary_use: ['blood clotting factors', 'anticoagulant reversal', 'bone health (moderate effect)', 'vitamin K deficiency'],
    evidence_rating: 'strong',
    synonyms: ['phylloquinone', 'phytomenadione', 'phytonadione'],
    dose_context: 'Adequate intake: 90–120mcg/day adults. Dietary sources: kale (~547mcg/100g), spinach, broccoli, Brussels sprouts. Drug interaction: vitamin K1 directly antagonises warfarin (anticoagulant) — patients on warfarin should maintain consistent K1 intake and not supplement without anticoagulation monitoring. K1 vs K2: K1 primarily liver-directed (coagulation), K2 more peripheral (bone, vessels). Most evidence for bone and cardiovascular outcomes uses K2 (MK-7 specifically).',
  },

  // ─── GUT HEALTH EXTRAS ─────────────────────────────────────────────────────

  {
    name: 'Saccharomyces Boulardii',
    slug: 'saccharomyces-boulardii',
    category: 'Gut Health',
    description: 'Saccharomyces boulardii is a non-pathogenic yeast probiotic derived from tropical fruit. It is the best-evidenced probiotic for antibiotic-associated diarrhoea (AAD) prevention, with a 2015 meta-analysis of 21 RCTs showing 51% risk reduction. It is also evidence-based for preventing traveller\'s diarrhoea and reducing Clostridium difficile recurrence. As a yeast, it is not affected by antibiotics and survives intestinal transit at body temperature.',
    primary_use: ['antibiotic-associated diarrhoea prevention', 'traveller\'s diarrhoea', 'C. difficile prevention', 'gut microbiome support'],
    evidence_rating: 'strong',
    synonyms: ['S. boulardii', 'Saccharomyces cerevisiae var. boulardii', 'Florastor'],
    dose_context: '250–500mg (containing 5–10 billion CFU equivalent) 2× daily in clinical trials. A 2015 meta-analysis (Szajewska & Kołodziej, 21 RCTs, n=4,780) found S. boulardii reduced antibiotic-associated diarrhoea incidence by 51% (NNT=8). Can be taken concurrently with antibiotics (unlike bacterial probiotics which are partially inactivated by antibiotics). A distinct advantage of yeast-based probiotics: antibiotics do not affect S. boulardii survival. Well-tolerated; caution in immunocompromised individuals (rare fungaemia risk).',
  },
  {
    name: 'Colostrum',
    slug: 'colostrum',
    category: 'Gut Health',
    description: 'Bovine colostrum is the first milk produced by cows (and all mammals) in the 24–72 hours after calving. It is rich in immunoglobulins (IgG, IgA, IgM), lactoferrin, growth factors (IGF-1, TGF-β), and proline-rich polypeptides. Evidence from RCTs shows bovine colostrum reduces upper respiratory tract infections and gastrointestinal permeability (leaky gut) in athletes, and prevents exercise-induced gut damage.',
    primary_use: ['immune support', 'gut permeability', 'upper respiratory infection prevention', 'athletic performance'],
    evidence_rating: 'moderate',
    synonyms: ['bovine colostrum', 'first milk', 'beestings'],
    dose_context: '20–60g/day in athlete studies; 400mg–2.4g/day in immune studies. A 2016 meta-analysis found bovine colostrum supplementation significantly reduced upper respiratory tract infection incidence in athletes (50% reduction). A study by Davison et al. (2016) found 20g colostrum/day for 8 weeks attenuated the decrease in salivary IgA during heavy training. IgG concentration varies by product — standardised immunoglobulin content (25–40% IgG) is recommended for consistent dosing.',
  },
  {
    name: 'Slippery Elm',
    slug: 'slippery-elm',
    category: 'Herbal',
    description: 'Slippery elm (Ulmus rubra) inner bark powder contains mucilage polysaccharides that form a gel-like coating when mixed with water. This coating soothes and protects irritated gut mucosa in conditions including GERD, IBS, and Crohn\'s disease. Clinical evidence is limited primarily to case series and small studies, but mechanistic evidence for mucosal protection is well-understood. Approved by the US FDA as a demulcent.',
    primary_use: ['gut mucosal protection', 'GERD', 'IBS', 'Crohn\'s disease', 'throat soothing'],
    evidence_rating: 'limited',
    synonyms: ['Ulmus rubra', 'red elm', 'Indian elm', 'moose elm'],
    dose_context: '1–4g powder mixed with water before meals in IBS and IBD studies. Classified as a Category I (safe and effective) demulcent by FDA for oral mucosa and throat. Evidence for GI conditions comes primarily from two small studies: a 2002 herbal formula study in IBS-C showed significant improvements, and case series in Crohn\'s disease. Well-tolerated; may slow absorption of other medications if taken simultaneously.',
  },

  // ─── PERFORMANCE EXTRAS ────────────────────────────────────────────────────

  {
    name: 'Theacrine',
    slug: 'theacrine',
    category: 'Performance',
    description: 'Theacrine (1,3,7,9-tetramethyluric acid) is a purine alkaloid found in Camellia assamica (kucha tea) and some tropical fruits. It has a similar chemical structure to caffeine and shares some mechanisms — adenosine receptor antagonism — but with a longer half-life and evidence for reduced tolerance development. A 2015 human RCT found theacrine improved energy, cognitive function, and mood without increasing heart rate.',
    primary_use: ['energy', 'cognitive focus', 'reduced tolerance vs caffeine', 'adenosine antagonism'],
    evidence_rating: 'limited',
    synonyms: ['1,3,7,9-tetramethyluric acid', 'TeaCrine', 'kucha tea alkaloid'],
    dose_context: '50–300mg/day theacrine in human trials. A 2015 RCT (Kuhman et al., n=60) found 200mg theacrine significantly improved energy, mood, and concentration vs placebo without adverse cardiovascular effects. At 300mg, some subjects reported jitteriness — similar to high-dose caffeine. Theacrine + caffeine combinations show synergistic effects in preliminary research. Limited long-term safety data — most trials are ≤4 weeks.',
  },
  {
    name: 'Agmatine Sulfate',
    slug: 'agmatine-sulfate',
    category: 'Performance',
    description: 'Agmatine is a metabolite of L-Arginine (produced by arginine decarboxylase) and acts as a neuromodulator with multiple receptor interactions including NMDA, imidazoline, and alpha-2-adrenergic receptors. Clinical evidence is strongest for neuropathic pain — an open-label dose-escalation study found agmatine effective for lumbar disc radiculopathy. Also studied for nitric oxide modulation in athletic performance.',
    primary_use: ['neuropathic pain', 'nitric oxide modulation', 'insulin sensitivity', 'cognitive function'],
    evidence_rating: 'limited',
    synonyms: ['4-(aminobutyl)guanidine', 'agmatine', 'decarboxylated arginine'],
    dose_context: '1,300–2,670mg/day in the neuropathic pain clinical trial. An open-label dose-escalation study (Keynan et al., 2010) followed by a randomised double-blind trial found agmatine sulfate 1,300–2,670mg/day significantly reduced radicular back pain scores. For athletic performance and nitric oxide: 500mg–1g before exercise in smaller studies. Well-tolerated with no serious adverse events at clinical doses.',
  },

  // ─── LONGEVITY EXTRAS ──────────────────────────────────────────────────────

  {
    name: 'Fisetin',
    slug: 'fisetin',
    category: 'Longevity',
    description: 'Fisetin is a flavonoid antioxidant found in strawberries, apples, grapes, onions, and cucumbers. A landmark 2018 study (Yousefzadeh et al.) identified fisetin as the most potent senolytic compound among 10 tested natural products, meaning it selectively eliminates senescent cells (damaged cells that resist apoptosis and drive chronic inflammation). This senolytic activity has generated substantial longevity research interest.',
    primary_use: ['senolytic', 'antioxidant', 'anti-inflammatory', 'longevity research', 'neuroprotection'],
    evidence_rating: 'limited',
    synonyms: ['3,3\',4\',7-tetrahydroxyflavone', '3,7,3\',4\'-tetrahydroxyflavone'],
    dose_context: '100–1,000mg/day in longevity protocols; 20mg/kg in the mouse study (extremely high relative to human weight). The 2018 EBioMedicine study (Yousefzadeh et al.) demonstrated fisetin significantly extended healthspan and lifespan in mice, and reduced senescent cell burden in human adipose tissue ex vivo. Human clinical trials are in progress (Mayo Clinic SIWA trial). No large human RCT data yet. Often used in "senolytic cycles" (2 consecutive days per month at high dose) based on animal pharmacokinetics.',
  },
  {
    name: 'Spermidine',
    slug: 'spermidine',
    category: 'Longevity',
    description: 'Spermidine is a naturally occurring polyamine found in all living cells and in concentrated amounts in wheat germ, soybeans, aged cheese, mushrooms, and peas. It is a potent inducer of autophagy — the cellular self-cleaning process where damaged proteins and organelles are recycled. A 2016 Nature Medicine study found spermidine extended lifespan in mice and reduced cardiovascular mortality risk in a human cohort study.',
    primary_use: ['autophagy induction', 'cardiovascular health', 'anti-aging', 'cognitive function', 'longevity research'],
    evidence_rating: 'limited',
    synonyms: ['spermidine trihydrochloride', 'wheat germ extract'],
    dose_context: '1–5mg/day from wheat germ extract supplements; dietary intake ~2–6mg/day from food. The Eisenberg et al. 2016 Nature Medicine study found spermidine extended lifespan in multiple model organisms and a human dietary cohort with higher spermidine intake had reduced all-cause mortality. A 2021 randomised pilot trial (n=100 older adults) found 1.2mg/day spermidine for 12 months improved cognitive function. Human evidence is very early but mechanistic understanding is strong.',
  },
  {
    name: 'GLA',
    slug: 'gla',
    category: 'Omega Oils',
    description: 'Gamma-linolenic acid (GLA) is an omega-6 polyunsaturated fatty acid found in evening primrose oil (8–10%), borage oil (20–24%), and black currant seed oil (15–18%). Unlike most omega-6 fatty acids, GLA bypasses the delta-6-desaturase enzyme (often rate-limiting in the fatty acid conversion pathway) and is directly converted to dihomo-GLA (DGLA), a precursor to anti-inflammatory prostaglandin E1. This distinguishes GLA from linoleic acid.',
    primary_use: ['anti-inflammatory', 'mastalgia', 'eczema', 'rheumatoid arthritis', 'PMS symptoms'],
    evidence_rating: 'mixed',
    synonyms: ['gamma-linolenic acid', '(6Z,9Z,12Z)-octadeca-6,9,12-trienoic acid', 'GLA'],
    dose_context: '270–2,800mg/day GLA (not source oil) in clinical trials. For mastalgia (cyclic breast pain): 3g evening primrose oil (~240mg GLA) significantly reduced pain — the most consistent GLA evidence. For rheumatoid arthritis: 1.4g GLA/day (from borage oil, 6–8g/day) reduced joint tenderness and swelling in RCTs independently of NSAIDs. Borage seed oil contains higher GLA concentration than EPO — 2–3× more GLA per gram of oil. Concerns: borage oil contains unsaturated pyrrolizidine alkaloids in some preparations — use certified pyrrolizidine alkaloid-free products.',
  },
  {
    name: 'Kava',
    slug: 'kava',
    category: 'Herbal',
    description: 'Kava (Piper methysticum) root extract has the most robust evidence base of any herbal anxiolytic — a 2002 Cochrane meta-analysis of 11 RCTs found significant reduction in anxiety symptoms versus placebo. The active kavalactones modulate GABA-A receptors and inhibit MAO-B. However, case reports of hepatotoxicity led to bans in Germany, Canada, and other countries (later partially lifted). Evidence-to-risk balance is debated.',
    primary_use: ['anxiety reduction', 'sleep quality', 'relaxation', 'generalised anxiety disorder'],
    evidence_rating: 'moderate',
    synonyms: ['Piper methysticum', 'kava kava', 'awa', 'kawa kawa'],
    legal_notes: 'Kava was banned in Germany, Canada, Switzerland, and the UK between 2001 and 2009 following case reports of hepatotoxicity (liver damage). Germany and the UK later lifted their bans but restrictions remain in some countries. In the UK, kava products require a Traditional Herbal Registration. In Australia, kava importation for personal use is regulated. Legal status varies by country — verify local regulations before purchase. Use of water-extracted kava from noble kava varieties (not stems/leaves) and avoiding alcohol are risk mitigation strategies based on hepatotoxicity case analysis.',
    dose_context: '70–240mg kavalactones daily (standardised 30–70% kavalactones extract) in anxiety trials. Cochrane review (Pittler & Ernst, 2002, 11 RCTs) found significant anxiolytic effect (weighted mean difference −9.69 on Hamilton Anxiety Scale). Most clinical evidence used acetone or ethanol extracts at 70–240mg/day kavalactones. Water extracts (traditional preparation) may have different hepatotoxicity profiles. Duration should not exceed 8 weeks without medical supervision. Avoid alcohol and hepatotoxic medications.',
  },
  {
    name: 'Chamomile',
    slug: 'chamomile',
    category: 'Herbal',
    description: 'German chamomile (Matricaria recutita) is one of the most consumed herbal teas globally, traditionally used for anxiety and sleep. The primary active compound, apigenin, binds GABA-A receptors as a partial agonist. A 2009 RCT found chamomile extract significantly reduced generalised anxiety disorder (GAD) symptoms. A 2016 long-term RCT found chamomile significantly reduced GAD relapse rate after response.',
    primary_use: ['anxiety reduction', 'sleep quality', 'gastrointestinal comfort', 'anti-inflammatory'],
    evidence_rating: 'moderate',
    synonyms: ['Matricaria recutita', 'Matricaria chamomilla', 'German chamomile', 'chamomilla'],
    dose_context: '220–1,100mg/day chamomile extract in anxiety RCTs. A 2009 double-blind RCT (Amsterdam et al., n=57) found 220mg 5× daily chamomile extract significantly improved GAD symptoms over 8 weeks. A 2016 long-term RCT (n=179) found chamomile significantly reduced relapse after stopping (HR 0.57) — notable for an herbal. Well-tolerated; rare allergic reactions in individuals with ragweed allergy (cross-reactivity). Tea provides much lower apigenin than standardised extract.',
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

async function seedIngredientsExpanded() {
  console.log('Connecting to SurrealDB...');
  const db = await connectDb();

  console.log(`Seeding ${INGREDIENTS.length} expanded ingredients...\n`);

  let ok = 0;
  let errors = 0;

  for (const seed of INGREDIENTS) {
    try {
      await db.upsert(new RecordId('ingredient', seed.slug)).content({
        ...seed,
        last_verified: new Date(),
      });
      console.log(`  ✓ ${seed.name}`);
      ok++;
    } catch (err) {
      console.error(`  ✗ ${seed.name}: ${err}`);
      errors++;
    }
  }

  await db.close();

  console.log(`\n${ok} ingredients seeded · ${errors} errors`);
  if (errors > 0) process.exit(1);
}

seedIngredientsExpanded().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
