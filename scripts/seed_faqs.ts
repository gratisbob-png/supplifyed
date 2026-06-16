/**
 * Seeds FAQ nodes for all 10 Phase 1 ingredients.
 * Creates ANSWERS_ABOUT edges connecting faq → ingredient.
 * Run: npm run seed:faqs
 * Requires ingredients seeded first: npm run seed:ingredients
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

  // ─── CREATINE MONOHYDRATE ────────────────────────────────────────────────────

  {
    id: 'faq:creatine-what-does-it-do',
    question: 'What does creatine do?',
    answer: 'Creatine monohydrate increases phosphocreatine stores in skeletal muscle. Phosphocreatine donates a phosphate group to regenerate ATP (adenosine triphosphate) during short-duration, high-intensity exercise such as sprinting, weightlifting, and jumping. More available ATP means more work can be performed before fatigue. Meta-analyses of over 100 studies show consistent improvements in strength, power output, and lean body mass when creatine supplementation is combined with resistance training.',
    evidence_refs: ['evidence:rawson-volek-2003-creatine-strength', 'evidence:branch-2003-creatine-body-composition'],
    search_volume: 90500,
    ingredient_id: 'ingredient:creatine-monohydrate',
  },
  {
    id: 'faq:creatine-is-it-safe',
    question: 'Is creatine safe?',
    answer: 'Creatine monohydrate has one of the most extensive safety records of any supplement. Decades of research in healthy adults show no adverse effects on kidney function, liver function, or other health markers at doses of 3–5g/day. The International Society of Sports Nutrition (ISSN) position stand classifies creatine monohydrate as safe, effective, and ethical. Individuals with pre-existing kidney disease should consult a physician before supplementing, as creatine metabolism produces creatinine, which is a kidney function marker.',
    evidence_refs: ['evidence:rawson-volek-2003-creatine-strength', 'evidence:branch-2003-creatine-body-composition', 'evidence:lanhers-2017-creatine-upper-limb'],
    search_volume: 74000,
    ingredient_id: 'ingredient:creatine-monohydrate',
  },
  {
    id: 'faq:creatine-hair-loss',
    question: 'Does creatine cause hair loss?',
    answer: 'One small RCT (van der Merwe et al., 2009, n=20 rugby players) found that creatine supplementation increased serum DHT (dihydrotestosterone) by approximately 56% after a loading phase, returning to near-baseline after a maintenance phase. DHT is associated with androgenic hair loss in genetically predisposed individuals. No study has directly measured hair loss as an outcome. The single DHT study has not been replicated in subsequent research. Whether the transient DHT increase translates to accelerated hair loss in susceptible individuals remains unknown from current evidence.',
    evidence_refs: ['evidence:rawson-volek-2003-creatine-strength'],
    search_volume: 60500,
    ingredient_id: 'ingredient:creatine-monohydrate',
  },
  {
    id: 'faq:creatine-kidney-damage',
    question: 'Does creatine damage the kidneys?',
    answer: 'Long-term studies in healthy adults, including trials lasting up to 5 years, have found no evidence of kidney damage from creatine supplementation at standard doses (3–5g/day). Creatine metabolism produces creatinine, which is used as a kidney function marker. Creatine supplementation raises serum creatinine without impairing actual kidney function — this can produce misleading readings in standard kidney panels. In individuals with healthy kidneys, creatine does not damage renal tissue. Individuals with existing kidney disease or a single kidney should consult a physician before use.',
    evidence_refs: ['evidence:rawson-volek-2003-creatine-strength', 'evidence:branch-2003-creatine-body-composition'],
    search_volume: 49500,
    ingredient_id: 'ingredient:creatine-monohydrate',
  },
  {
    id: 'faq:creatine-when-to-take',
    question: 'When should I take creatine?',
    answer: 'The timing of creatine supplementation has minimal impact on its effectiveness. Creatine works by saturating muscle phosphocreatine stores over time — once saturated (typically after 2–4 weeks of maintenance dosing), the timing of individual doses is inconsequential. Some evidence indicates a slight advantage to post-exercise dosing, but the effect is small. Consistency of daily intake is more important than timing. Taking creatine with carbohydrates may marginally improve uptake due to insulin-mediated transport.',
    evidence_refs: ['evidence:rawson-volek-2003-creatine-strength', 'evidence:branch-2003-creatine-body-composition'],
    search_volume: 40500,
    ingredient_id: 'ingredient:creatine-monohydrate',
  },
  {
    id: 'faq:creatine-how-much-daily',
    question: 'How much creatine should I take daily?',
    answer: '3–5g per day is the maintenance dose established by peer-reviewed research. This dose saturates muscle phosphocreatine stores within 3–4 weeks. Higher doses do not provide additional benefit once stores are saturated. If using a loading protocol, 20g/day split into 4×5g doses for 5–7 days achieves saturation faster but produces identical long-term results. Most products contain 3–5g per serving, which aligns with the evidence base.',
    evidence_refs: ['evidence:rawson-volek-2003-creatine-strength', 'evidence:branch-2003-creatine-body-composition', 'evidence:lanhers-2017-creatine-upper-limb'],
    search_volume: 33100,
    ingredient_id: 'ingredient:creatine-monohydrate',
  },
  {
    id: 'faq:creatine-loading-phase',
    question: 'Do I need a loading phase?',
    answer: 'A loading phase (20g/day for 5–7 days) accelerates muscle phosphocreatine saturation, achieving full stores in approximately 7 days versus 3–4 weeks with maintenance dosing alone. Both approaches reach the same saturation endpoint. The loading phase is not required — it only affects how quickly the initial saturation occurs. Loading may cause gastrointestinal discomfort in some individuals due to the higher per-day dose. Splitting loading doses into 4×5g throughout the day reduces this risk.',
    evidence_refs: ['evidence:rawson-volek-2003-creatine-strength', 'evidence:branch-2003-creatine-body-composition'],
    search_volume: 22200,
    ingredient_id: 'ingredient:creatine-monohydrate',
  },
  {
    id: 'faq:creatine-women',
    question: 'Can women take creatine?',
    answer: 'The evidence base for creatine includes studies in women across multiple age groups. Women show the same mechanisms and comparable relative benefits to men, though absolute strength gains are smaller due to lower baseline muscle mass. Studies in older women show creatine supports muscle mass preservation and strength with resistance training. The safety profile is equivalent across sexes. Women often start with lower baseline muscle phosphocreatine stores, which may make initial gains more pronounced.',
    evidence_refs: ['evidence:rawson-volek-2003-creatine-strength', 'evidence:lanhers-2017-creatine-upper-limb', 'evidence:branch-2003-creatine-body-composition'],
    search_volume: 27100,
    ingredient_id: 'ingredient:creatine-monohydrate',
  },
  {
    id: 'faq:creatine-teenagers',
    question: 'Can teenagers take creatine?',
    answer: 'No long-term safety studies have been conducted specifically in adolescents under 18 years old. The existing safety data comes primarily from adult populations. Professional sports nutrition organisations, including the ISSN, note that creatine use in adolescents is not contraindicated by the available evidence, but the absence of dedicated youth safety data means a precautionary position is appropriate. Some national sports bodies advise against creatine use in under-18 athletes. The decision involves individual circumstances and should involve parents and a physician.',
    evidence_refs: ['evidence:rawson-volek-2003-creatine-strength'],
    search_volume: 9900,
    ingredient_id: 'ingredient:creatine-monohydrate',
  },
  {
    id: 'faq:creatine-weight-gain',
    question: 'Does creatine make you gain weight?',
    answer: 'Creatine supplementation typically causes an initial weight gain of 0.5–2kg during the first 1–2 weeks. This is primarily intracellular water retention — creatine draws water into muscle cells alongside its uptake. This is not fat gain. Over longer periods, creatine-assisted training produces gains in lean muscle mass. Meta-analyses show mean lean mass increases of approximately 1.37kg compared to placebo with matched training. The initial water weight is physiologically normal and does not represent excess body fat.',
    evidence_refs: ['evidence:branch-2003-creatine-body-composition', 'evidence:rawson-volek-2003-creatine-strength'],
    search_volume: 33100,
    ingredient_id: 'ingredient:creatine-monohydrate',
  },
  {
    id: 'faq:creatine-bloating',
    question: 'Will creatine make me bloated?',
    answer: 'Some individuals experience gastrointestinal discomfort, bloating, or cramping, particularly during a loading phase when doses are 20g/day. This is dose-dependent and most commonly reported with the larger divided doses of loading protocols. At maintenance doses of 3–5g/day, GI side effects are rare. Taking creatine with food and adequate water reduces the likelihood of discomfort. If GI issues persist, splitting the maintenance dose into two smaller doses may help.',
    evidence_refs: ['evidence:rawson-volek-2003-creatine-strength', 'evidence:branch-2003-creatine-body-composition'],
    search_volume: 12100,
    ingredient_id: 'ingredient:creatine-monohydrate',
  },
  {
    id: 'faq:creatine-stop-taking',
    question: 'What happens if I stop taking creatine?',
    answer: 'When creatine supplementation is discontinued, muscle phosphocreatine stores gradually return to baseline levels over approximately 4–6 weeks. The intracellular water retained during supplementation is lost, causing a decrease in body weight of approximately 0.5–2kg. Strength and performance metrics gradually return to pre-supplementation baselines as phosphocreatine stores deplete. Lean muscle mass gained through training while supplementing is retained normally — creatine does not create muscle that disappears upon stopping; it aids training performance that produces muscle.',
    evidence_refs: ['evidence:rawson-volek-2003-creatine-strength', 'evidence:branch-2003-creatine-body-composition'],
    search_volume: 9900,
    ingredient_id: 'ingredient:creatine-monohydrate',
  },
  {
    id: 'faq:creatine-rest-days',
    question: 'Should I take creatine on rest days?',
    answer: 'Daily creatine intake on rest days maintains elevated muscle phosphocreatine stores. The purpose of daily supplementation is to keep stores saturated — stores deplete gradually when supplementation stops, so consistent daily intake (including rest days) maintains the saturation achieved. A common approach is the same daily dose (3–5g) on all days. Skipping rest days would slowly erode the saturation built during training days, reducing the training-day benefit over time.',
    evidence_refs: ['evidence:rawson-volek-2003-creatine-strength'],
    search_volume: 14800,
    ingredient_id: 'ingredient:creatine-monohydrate',
  },
  {
    id: 'faq:creatine-monohydrate-vs-hcl',
    question: 'What is the difference between creatine monohydrate and HCL?',
    answer: 'Creatine monohydrate is creatine bound to a water molecule. Creatine HCL (hydrochloride) is creatine bound to hydrochloric acid, which increases solubility. Creatine monohydrate has extensive evidence from hundreds of studies spanning 30+ years. Creatine HCL has significantly fewer independent studies. Manufacturers of HCL claim smaller doses are needed due to superior absorption, but direct comparative evidence at matched doses is limited. Creatine monohydrate has the stronger evidence base at current evidence levels.',
    evidence_refs: ['evidence:rawson-volek-2003-creatine-strength', 'evidence:branch-2003-creatine-body-composition', 'evidence:lanhers-2017-creatine-upper-limb'],
    search_volume: 22200,
    ingredient_id: 'ingredient:creatine-monohydrate',
  },
  {
    id: 'faq:creatine-natural',
    question: 'Is creatine natural?',
    answer: 'Creatine is naturally synthesised in the human body primarily in the liver, kidneys, and pancreas from the amino acids arginine, glycine, and methionine. It is also found in animal foods: beef contains approximately 4–5g/kg, pork 3–5g/kg, and fish 3–7g/kg depending on species. Cooking destroys a portion of creatine in food. Vegetarians and vegans have lower baseline muscle phosphocreatine stores due to lower dietary intake. Supplemental creatine monohydrate is chemically identical to naturally occurring creatine.',
    evidence_refs: ['evidence:rawson-volek-2003-creatine-strength'],
    search_volume: 9900,
    ingredient_id: 'ingredient:creatine-monohydrate',
  },
  {
    id: 'faq:creatine-how-long-to-work',
    question: 'How long does creatine take to work?',
    answer: 'With a loading phase (20g/day for 5–7 days), muscle phosphocreatine stores reach saturation within approximately 7 days, and training benefits begin from the first loaded week. With maintenance dosing only (3–5g/day), stores reach saturation after 3–4 weeks of consistent supplementation. Performance improvements are correlated with the degree of muscle phosphocreatine elevation — users with lower baseline stores (vegetarians, for example) typically see more pronounced initial responses.',
    evidence_refs: ['evidence:rawson-volek-2003-creatine-strength', 'evidence:branch-2003-creatine-body-composition'],
    search_volume: 14800,
    ingredient_id: 'ingredient:creatine-monohydrate',
  },
  {
    id: 'faq:creatine-brain-function',
    question: 'Does creatine improve brain function?',
    answer: 'The brain requires substantial ATP, particularly during cognitively demanding tasks. Phosphocreatine is present in brain tissue and the same ATP-regeneration mechanism applies. Studies show creatine supplementation improves performance on tasks requiring short-term memory and processing speed, with larger effects observed under conditions of sleep deprivation and mental fatigue. A government-funded study (Gualano 2011) also found creatine improved metabolic markers beyond muscle. The cognitive evidence base is smaller than the physical performance evidence but is emerging from multiple independent sources.',
    evidence_refs: ['evidence:gualano-2011-creatine-diabetes', 'evidence:rawson-volek-2003-creatine-strength'],
    search_volume: 12100,
    ingredient_id: 'ingredient:creatine-monohydrate',
  },
  {
    id: 'faq:creatine-cutting',
    question: 'Can I take creatine while cutting?',
    answer: 'Creatine supplementation can be maintained during a caloric deficit (cutting phase). Evidence shows creatine preserves lean muscle mass and maintains strength during periods of reduced caloric intake. The intracellular water retention (0.5–2kg) associated with creatine may obscure fat loss progress on the scale, but does not represent actual body fat accumulation. Total scale weight may appear unchanged or higher despite fat being lost. Body composition measurements (DEXA, measurements) are more informative than scale weight during creatine-supplemented cutting phases.',
    evidence_refs: ['evidence:branch-2003-creatine-body-composition', 'evidence:rawson-volek-2003-creatine-strength'],
    search_volume: 18100,
    ingredient_id: 'ingredient:creatine-monohydrate',
  },
  {
    id: 'faq:creatine-liver',
    question: 'Is creatine bad for your liver?',
    answer: 'Long-term studies in healthy adults at standard doses (3–5g/day) show no evidence of liver damage or elevated liver enzymes attributable to creatine supplementation. As with kidney markers, creatine supplementation may slightly elevate certain liver enzyme readings in some individuals, but without evidence of actual hepatic injury. Studies lasting up to 5 years in healthy adults have not found hepatic adverse effects. Individuals with existing liver disease should consult a physician before supplementing.',
    evidence_refs: ['evidence:rawson-volek-2003-creatine-strength', 'evidence:branch-2003-creatine-body-composition'],
    search_volume: 9900,
    ingredient_id: 'ingredient:creatine-monohydrate',
  },
  {
    id: 'faq:creatine-foods',
    question: 'What foods naturally contain creatine?',
    answer: 'Creatine is found in animal muscle tissue. Approximate creatine content per kilogram of raw food: beef 4–5g/kg, pork 3–5g/kg, salmon 4–5g/kg, herring 6–10g/kg, tuna 4g/kg. Cooking destroys 20–30% of creatine content due to heat. Plant foods contain negligible creatine. To obtain 5g of creatine from food, approximately 1–1.25kg of raw beef or salmon would be required, making dietary intake of supplemental doses impractical from food alone. Vegetarians and vegans typically have 20–30% lower muscle phosphocreatine stores, making them more responsive to supplementation.',
    evidence_refs: ['evidence:rawson-volek-2003-creatine-strength'],
    search_volume: 8100,
    ingredient_id: 'ingredient:creatine-monohydrate',
  },

  // ─── MAGNESIUM GLYCINATE ──────────────────────────────────────────────────────

  {
    id: 'faq:magnesium-glycinate-sleep',
    question: 'Does magnesium glycinate help sleep?',
    answer: 'A double-blind RCT (Abbasi et al., 2012, n=46 elderly subjects) found 500mg magnesium daily for 8 weeks significantly improved sleep time, sleep efficiency, and early morning awakening versus placebo. Serum melatonin increased and cortisol decreased. Magnesium plays a role in regulating GABA receptors and melatonin synthesis, providing plausible mechanisms. Most evidence uses magnesium in forms with good bioavailability; glycinate is among the forms with the highest bioavailability. Studies showing these effects used 300–500mg elemental magnesium daily.',
    evidence_refs: ['evidence:abbasi-2012-magnesium-insomnia', 'evidence:zhang-2016-magnesium-sleep-china', 'evidence:schwalfenberg-2017-magnesium-clinical'],
    search_volume: 40500,
    ingredient_id: 'ingredient:magnesium-glycinate',
  },
  {
    id: 'faq:magnesium-glycinate-vs-citrate',
    question: 'What is the difference between magnesium glycinate and magnesium citrate?',
    answer: 'Both forms are organic magnesium compounds with better bioavailability than magnesium oxide. Glycinate is magnesium bound to glycine (an amino acid) and has bioavailability of approximately 25–30%. Citrate is magnesium bound to citric acid with moderate-to-good bioavailability, somewhat lower than glycinate. Glycinate is less likely to cause loose stools at equivalent elemental magnesium doses because the glycine binding reduces its osmotic laxative effect. Citrate is more affordable and widely available. Both are used in clinical research; glycinate is common in sleep-focused formulations, citrate in general magnesium supplementation.',
    evidence_refs: ['evidence:schwalfenberg-2017-magnesium-clinical', 'evidence:rude-2009-magnesium-oxide-bioavailability'],
    search_volume: 27100,
    ingredient_id: 'ingredient:magnesium-glycinate',
  },
  {
    id: 'faq:magnesium-deficiency-common',
    question: 'How common is magnesium deficiency?',
    answer: 'A comprehensive clinical review (Schwalfenberg & Genuis, 2017) estimates that more than 60% of Western adults consume less than the daily reference intake for magnesium. Soil depletion, food processing, and low vegetable intake are contributing factors. Serum magnesium is a poor marker for total body magnesium as the body maintains serum levels by drawing from bone and tissue stores. Symptoms of low magnesium include muscle cramps, poor sleep, fatigue, and anxiety — though these are non-specific. Groups at higher risk include heavy drinkers, people with type 2 diabetes, and those with gastrointestinal conditions.',
    evidence_refs: ['evidence:schwalfenberg-2017-magnesium-clinical'],
    search_volume: 22200,
    ingredient_id: 'ingredient:magnesium-glycinate',
  },
  {
    id: 'faq:magnesium-anxiety',
    question: 'Does magnesium help with anxiety?',
    answer: 'Magnesium plays a role in regulating the hypothalamic-pituitary-adrenal (HPA) axis and GABA receptors, both relevant to anxiety responses. A 2017 systematic review found evidence that magnesium supplementation may reduce anxiety in groups with specific vulnerability to deficiency, including people with premenstrual syndrome, mild anxiety, and hypertension. Evidence in healthy non-deficient adults is less consistent. The evidence is categorised as moderate — results across studies are positive but not uniformly replicated.',
    evidence_refs: ['evidence:schwalfenberg-2017-magnesium-clinical', 'evidence:abbasi-2012-magnesium-insomnia'],
    search_volume: 33100,
    ingredient_id: 'ingredient:magnesium-glycinate',
  },
  {
    id: 'faq:magnesium-dose',
    question: 'How much magnesium should I take?',
    answer: 'The daily reference value (DRV) for magnesium is 310–420mg/day for adults depending on age and sex. Supplementation studies showing benefits for sleep and other outcomes used 200–500mg elemental magnesium daily. For magnesium glycinate, the elemental magnesium content is approximately 14% of the compound weight — a 400mg glycinate capsule delivers approximately 56mg elemental magnesium. Always check the label for elemental magnesium content, not total compound weight. Upper tolerable limit for supplemental magnesium (not dietary) is 350mg/day in most regulatory frameworks.',
    evidence_refs: ['evidence:abbasi-2012-magnesium-insomnia', 'evidence:schwalfenberg-2017-magnesium-clinical'],
    search_volume: 27100,
    ingredient_id: 'ingredient:magnesium-glycinate',
  },

  // ─── MAGNESIUM CITRATE ────────────────────────────────────────────────────────

  {
    id: 'faq:magnesium-citrate-laxative',
    question: 'Does magnesium citrate act as a laxative?',
    answer: 'At higher doses, magnesium citrate draws water into the intestines through osmotic action, producing a laxative effect. This is why high-dose magnesium citrate is used as a bowel preparation before medical procedures. At typical supplemental doses used for magnesium replenishment (200–400mg elemental magnesium daily), loose stools may occur in some individuals. Starting at lower doses and increasing gradually reduces this effect. Magnesium glycinate is less likely to cause loose stools at equivalent elemental magnesium doses due to its different binding structure.',
    evidence_refs: ['evidence:guerrero-romero-2004-magnesium-insulin', 'evidence:schwalfenberg-2017-magnesium-clinical'],
    search_volume: 27100,
    ingredient_id: 'ingredient:magnesium-citrate',
  },
  {
    id: 'faq:magnesium-citrate-insulin',
    question: 'Does magnesium affect blood sugar?',
    answer: 'A double-blind RCT (Guerrero-Romero et al., 2004, n=63) found oral magnesium supplementation for 3 months significantly improved insulin sensitivity (HOMA-IR) and reduced fasting glucose in insulin-resistant adults without diabetes. Multiple observational studies show inverse associations between magnesium intake and type 2 diabetes risk. Magnesium is a cofactor in glucose transport and insulin receptor signalling. Evidence is stronger in people with low magnesium status or insulin resistance; effects in replete non-insulin-resistant adults are less established.',
    evidence_refs: ['evidence:guerrero-romero-2004-magnesium-insulin', 'evidence:schwalfenberg-2017-magnesium-clinical'],
    search_volume: 18100,
    ingredient_id: 'ingredient:magnesium-citrate',
  },
  {
    id: 'faq:magnesium-citrate-bioavailability',
    question: 'How does magnesium citrate compare to oxide for absorption?',
    answer: 'Magnesium citrate has significantly better bioavailability than magnesium oxide. Research shows magnesium oxide has approximately 4% bioavailability, meaning only 4g of every 100g consumed is absorbed. Magnesium citrate achieves moderate-to-good bioavailability, considerably higher than oxide. This means equivalent supplementation effects require smaller doses of citrate versus oxide. A review by Schwalfenberg & Genuis (2017) ranks bioavailability: glycinate ≥ citrate >> oxide. For most supplementation purposes, citrate and glycinate are substantially more efficient than oxide.',
    evidence_refs: ['evidence:rude-2009-magnesium-oxide-bioavailability', 'evidence:schwalfenberg-2017-magnesium-clinical'],
    search_volume: 14800,
    ingredient_id: 'ingredient:magnesium-citrate',
  },

  // ─── MAGNESIUM OXIDE ─────────────────────────────────────────────────────────

  {
    id: 'faq:magnesium-oxide-bioavailability',
    question: 'Why is magnesium oxide considered low quality?',
    answer: 'Magnesium oxide has a bioavailability of approximately 4% in humans (Rude et al., 2009) — meaning only 4% of the elemental magnesium in an oxide supplement is absorbed into the bloodstream. The remainder passes through the gut, producing an osmotic laxative effect. By contrast, organic forms such as glycinate and citrate achieve 25–30% and moderate-to-good bioavailability respectively. Magnesium oxide is the cheapest form to manufacture, making it common in economy multivitamins and budget supplements. For systemic magnesium replenishment, oxide is substantially less efficient than organic forms at equivalent doses.',
    evidence_refs: ['evidence:rude-2009-magnesium-oxide-bioavailability', 'evidence:schwalfenberg-2017-magnesium-clinical'],
    search_volume: 9900,
    ingredient_id: 'ingredient:magnesium-oxide',
  },
  {
    id: 'faq:magnesium-oxide-uses',
    question: 'What is magnesium oxide used for?',
    answer: 'Due to its poor systemic bioavailability, magnesium oxide is primarily used as an antacid and short-term laxative. Its high osmotic activity in the gut makes it effective for heartburn relief and bowel regularity. For systemic magnesium supplementation (targeting sleep, muscle function, or metabolic effects), oxide is less effective per dose than organic forms. It is frequently used in economy supplements where cost is prioritised, and in combination products where the listed magnesium content looks high on the label despite low absorption.',
    evidence_refs: ['evidence:rude-2009-magnesium-oxide-bioavailability'],
    search_volume: 8100,
    ingredient_id: 'ingredient:magnesium-oxide',
  },
  {
    id: 'faq:magnesium-oxide-vs-glycinate',
    question: 'Is magnesium oxide the same as magnesium glycinate?',
    answer: 'No. Magnesium oxide (MgO) is an inorganic compound formed by combining magnesium with oxygen. Magnesium glycinate is an organic chelate formed by binding magnesium to the amino acid glycine. They differ substantially in bioavailability: oxide approximately 4%, glycinate approximately 25–30%. They also differ in gastrointestinal effects — oxide commonly causes loose stools or diarrhoea; glycinate is well-tolerated by most people. They are both labelled as "magnesium supplements" but deliver very different amounts of bioavailable magnesium per dose.',
    evidence_refs: ['evidence:rude-2009-magnesium-oxide-bioavailability', 'evidence:schwalfenberg-2017-magnesium-clinical'],
    search_volume: 12100,
    ingredient_id: 'ingredient:magnesium-oxide',
  },

  // ─── VITAMIN D3 ───────────────────────────────────────────────────────────────

  {
    id: 'faq:vitamin-d3-deficiency',
    question: 'How do I know if I am deficient in vitamin D?',
    answer: 'Vitamin D status is measured via a serum 25-hydroxyvitamin D [25(OH)D] blood test. The Endocrine Society Clinical Practice Guideline (Holick et al., 2011) defines deficiency as serum 25(OH)D below 20ng/mL (50nmol/L), insufficiency as 21–29ng/mL, and sufficiency as ≥30ng/mL. A blood test is the only accurate method — symptoms of deficiency (fatigue, bone pain, muscle weakness, mood changes) are non-specific and unreliable for diagnosis. Deficiency is prevalent: estimates indicate 40–60% of the general population in northern latitudes have insufficient levels during winter months.',
    evidence_refs: ['evidence:holick-2011-vitamin-d-guidelines'],
    search_volume: 49500,
    ingredient_id: 'ingredient:vitamin-d3',
  },
  {
    id: 'faq:vitamin-d3-dose',
    question: 'How much vitamin D3 should I take?',
    answer: 'The Endocrine Society guidelines (Holick et al., 2011) recommend 1,500–2,000 IU/day to maintain sufficient serum 25(OH)D levels in adults. The upper tolerable intake is 4,000 IU/day. Many supplements contain 5,000 IU, which exceeds the established upper limit — though some researchers argue this level is safe for most healthy adults, this remains a matter of clinical judgement. Blood testing provides the only accurate guide to personal dosing requirements, as individual response to supplementation varies significantly based on baseline status, body weight, and sun exposure.',
    evidence_refs: ['evidence:holick-2011-vitamin-d-guidelines', 'evidence:bischoff-ferrari-2012-vitamin-d-falls'],
    search_volume: 60500,
    ingredient_id: 'ingredient:vitamin-d3',
  },
  {
    id: 'faq:vitamin-d3-immune',
    question: 'Does vitamin D3 help the immune system?',
    answer: 'A meta-analysis of 25 RCTs (Martineau et al., 2017, n=11,321) found vitamin D supplementation reduced the risk of acute respiratory tract infections by 12% overall (OR 0.88), with a stronger protective effect in those with deficiency at baseline. Vitamin D receptors are present on immune cells, and vitamin D modulates both innate and adaptive immune responses. Daily or weekly supplementation was more effective than bolus dosing in the meta-analysis. The protective effect was most pronounced in individuals who were deficient before supplementation began.',
    evidence_refs: ['evidence:martineau-2017-vitamin-d-respiratory', 'evidence:holick-2011-vitamin-d-guidelines'],
    search_volume: 33100,
    ingredient_id: 'ingredient:vitamin-d3',
  },
  {
    id: 'faq:vitamin-d3-bones',
    question: 'How does vitamin D3 affect bone health?',
    answer: 'Vitamin D3 is essential for calcium absorption in the intestine — without adequate vitamin D, the gut absorbs only 10–15% of dietary calcium, rising to 30–40% with sufficiency. A pooled analysis of 11 double-blind RCTs (Bischoff-Ferrari et al., 2012, n=31,022) found vitamin D supplementation at 800 IU/day or above significantly reduced hip fractures by 30% and non-vertebral fractures by 14%. Lower doses (400 IU/day) did not achieve fracture prevention. Calcium and vitamin D work synergistically — supplementing one without adequate levels of the other limits the benefit.',
    evidence_refs: ['evidence:bischoff-ferrari-2012-vitamin-d-falls', 'evidence:holick-2011-vitamin-d-guidelines'],
    search_volume: 22200,
    ingredient_id: 'ingredient:vitamin-d3',
  },
  {
    id: 'faq:vitamin-d3-vs-d2',
    question: 'What is the difference between vitamin D3 and D2?',
    answer: 'Vitamin D3 (cholecalciferol) is produced in human skin in response to UVB radiation and is found in animal foods. Vitamin D2 (ergocalciferol) is produced by fungi and plants and used in some fortified foods and supplements. D3 is more effective than D2 at raising and maintaining serum 25(OH)D levels — the Endocrine Society Clinical Practice Guideline (Holick et al., 2011) states that D3 produces approximately 87% greater elevation in serum 25(OH)D compared to equivalent doses of D2. D3 is the form used in most supplement products due to this superior bioavailability.',
    evidence_refs: ['evidence:holick-2011-vitamin-d-guidelines'],
    search_volume: 27100,
    ingredient_id: 'ingredient:vitamin-d3',
  },

  // ─── OMEGA-3 FISH OIL ─────────────────────────────────────────────────────────

  {
    id: 'faq:omega3-cardiovascular',
    question: 'Does omega-3 reduce cardiovascular risk?',
    answer: 'Evidence varies by outcome and dose. For triglyceride reduction, evidence is strong: omega-3 supplementation reduces serum triglycerides dose-dependently, approximately 30% at 4g EPA+DHA/day (Mozaffarian & Wu, 2011). The REDUCE-IT trial (n=8,179) found 4g/day pure EPA reduced major cardiovascular events by 25% in high-risk patients already on statins — though this trial was funded by the manufacturer of Vascepa (Amarin). For general population cardiovascular mortality, evidence is more modest and inconsistent. Effect appears strongest in those with elevated triglycerides and existing cardiovascular risk factors.',
    evidence_refs: ['evidence:bhatt-2019-reduce-it-epa', 'evidence:mozaffarian-wu-2011-omega3-cardiovascular'],
    search_volume: 40500,
    ingredient_id: 'ingredient:omega-3-fish-oil',
  },
  {
    id: 'faq:omega3-epa-dha-difference',
    question: 'What is the difference between EPA and DHA?',
    answer: 'EPA (eicosapentaenoic acid) and DHA (docosahexaenoic acid) are the two primary omega-3 fatty acids in fish oil. EPA is predominantly associated with anti-inflammatory effects, cardiovascular outcomes, and mood support. DHA is the primary structural omega-3 in brain tissue and retina, associated with cognitive development and function. Both are incorporated into cell membrane phospholipids. Standard fish oil contains both EPA and DHA; high-EPA products concentrate EPA; some products (algae oil) provide predominantly DHA. The cardiovascular evidence is strongest for EPA specifically at pharmaceutical doses.',
    evidence_refs: ['evidence:calder-2017-omega3-inflammation', 'evidence:mozaffarian-wu-2011-omega3-cardiovascular', 'evidence:bhatt-2019-reduce-it-epa'],
    search_volume: 22200,
    ingredient_id: 'ingredient:omega-3-fish-oil',
  },
  {
    id: 'faq:omega3-dose',
    question: 'How much omega-3 should I take daily?',
    answer: 'The effective dose depends on the outcome. Cardiovascular evidence uses 1–4g combined EPA+DHA daily. Anti-inflammatory effects are observed at 2–4g EPA+DHA daily (Calder, 2017). The REDUCE-IT trial used 4g/day pure EPA as a prescription product. Standard fish oil capsules typically contain 300mg EPA+DHA per 1g capsule — to obtain 2g EPA+DHA, six to seven standard 1g capsules are required daily. Always check the label for EPA+DHA content, not total oil weight, as the concentration varies substantially between products.',
    evidence_refs: ['evidence:calder-2017-omega3-inflammation', 'evidence:mozaffarian-wu-2011-omega3-cardiovascular'],
    search_volume: 33100,
    ingredient_id: 'ingredient:omega-3-fish-oil',
  },
  {
    id: 'faq:omega3-inflammation',
    question: 'Does omega-3 reduce inflammation?',
    answer: 'EPA and DHA are incorporated into cell membrane phospholipids, where they can displace arachidonic acid — the precursor to pro-inflammatory eicosanoids (prostaglandins, thromboxanes, leukotrienes). This reduces the substrate available for inflammatory signalling pathways. Anti-inflammatory effects of omega-3 are demonstrated in multiple conditions including rheumatoid arthritis, inflammatory bowel disease, and exercise-induced inflammation. Calder (2017) reviewed mechanistic and clinical evidence showing consistent anti-inflammatory effects at 2–4g EPA+DHA daily. Effects are more pronounced with consistent long-term supplementation than short-term.',
    evidence_refs: ['evidence:calder-2017-omega3-inflammation', 'evidence:mozaffarian-wu-2011-omega3-cardiovascular'],
    search_volume: 27100,
    ingredient_id: 'ingredient:omega-3-fish-oil',
  },
  {
    id: 'faq:omega3-fish-vs-algae',
    question: 'Is fish oil better than algae oil for omega-3?',
    answer: 'Fish oil and algae oil both provide long-chain omega-3 fatty acids (EPA and DHA). Fish accumulate omega-3 by consuming algae — algae oil is the original source. Algae oil typically provides predominantly DHA; some algae oil products now provide EPA+DHA combinations. Bioavailability of omega-3 from algae oil is comparable to fish oil in direct comparison studies. Algae oil is suitable for vegetarians and vegans. Fish oil at equivalent EPA+DHA doses has a longer evidence history; algae oil studies are growing. For equivalent EPA+DHA doses, the source (fish vs algae) does not appear to substantially affect the biological effect.',
    evidence_refs: ['evidence:calder-2017-omega3-inflammation'],
    search_volume: 14800,
    ingredient_id: 'ingredient:omega-3-fish-oil',
  },

  // ─── ASHWAGANDHA ─────────────────────────────────────────────────────────────

  {
    id: 'faq:ashwagandha-cortisol',
    question: 'Does ashwagandha lower cortisol?',
    answer: 'A double-blind RCT (Chandrasekhar et al., 2012, n=64) found 600mg/day KSM-66 ashwagandha extract for 60 days reduced serum cortisol by 27.9% (p<0.0001) versus placebo. A systematic review of 5 human RCTs (Pratte et al., 2014) found consistent cortisol reduction and anxiolytic effects across all included studies. The extract-standardised forms (KSM-66, Sensoril) have the most direct evidence. Note: several of these trials are manufacturer-associated, which is a relevant funding consideration.',
    evidence_refs: ['evidence:chandrasekhar-2012-ashwagandha-stress', 'evidence:pratte-2014-ashwagandha-review'],
    search_volume: 33100,
    ingredient_id: 'ingredient:ashwagandha',
  },
  {
    id: 'faq:ashwagandha-ksm66-vs-generic',
    question: 'What is the difference between KSM-66 and generic ashwagandha?',
    answer: 'KSM-66 and Sensoril are patented, standardised ashwagandha root extracts produced by specific manufacturers. KSM-66 is standardised to ≥5% withanolides (the primary active compounds) using a water-based extraction process. Generic ashwagandha root powder typically contains 0.5–1% withanolides or less. To match the withanolide content of 300mg KSM-66 extract, 3,000–6,000mg of generic root powder may be required depending on quality. The majority of peer-reviewed clinical trials used KSM-66 or Sensoril. Evidence from standardised extracts may not directly translate to unstandardised bulk root powder.',
    evidence_refs: ['evidence:chandrasekhar-2012-ashwagandha-stress', 'evidence:wankhede-2015-ashwagandha-strength', 'evidence:pratte-2014-ashwagandha-review'],
    search_volume: 27100,
    ingredient_id: 'ingredient:ashwagandha',
  },
  {
    id: 'faq:ashwagandha-testosterone',
    question: 'Does ashwagandha increase testosterone?',
    answer: 'A manufacturer-associated RCT (Wankhede et al., 2015, n=57 men) found 600mg/day KSM-66 over 8 weeks increased testosterone by approximately 15% versus 2.5% in the placebo group. Other studies have reported similar findings. The mechanism may involve reduced cortisol (which suppresses testosterone production) and direct LH stimulation. Important context: several testosterone studies are manufacturer-associated, and the effect size, while statistically significant, represents a modest absolute change. Independent replication with larger samples would strengthen the evidence.',
    evidence_refs: ['evidence:wankhede-2015-ashwagandha-strength', 'evidence:chandrasekhar-2012-ashwagandha-stress'],
    search_volume: 40500,
    ingredient_id: 'ingredient:ashwagandha',
  },
  {
    id: 'faq:ashwagandha-anxiety',
    question: 'Does ashwagandha help with anxiety?',
    answer: 'Five human RCTs reviewed in an independent systematic review (Pratte et al., 2014) all showed consistent anxiolytic effects of ashwagandha extract versus placebo. Effects are measured on validated anxiety scales including the Hamilton Anxiety Rating Scale and Perceived Stress Scale. The mechanism involves GABA receptor modulation by withanolides and reduction of cortisol. Doses in evidence range from 300–600mg standardised extract daily. Effect sizes are meaningful and consistent across trials, making this one of the more robustly evidenced herbal anxiolytics.',
    evidence_refs: ['evidence:pratte-2014-ashwagandha-review', 'evidence:chandrasekhar-2012-ashwagandha-stress'],
    search_volume: 49500,
    ingredient_id: 'ingredient:ashwagandha',
  },
  {
    id: 'faq:ashwagandha-safety',
    question: 'Is ashwagandha safe to take long-term?',
    answer: 'Clinical trials lasting up to 8–12 weeks consistently report ashwagandha as well-tolerated at 300–600mg standardised extract daily, with adverse events comparable to placebo. Rare case reports of liver injury have been published, though causality is not established in all cases. The European Food Safety Authority has reviewed available data. Ashwagandha is generally contraindicated in pregnancy (traditional contraindication, limited clinical data). Individuals taking thyroid medications should be aware that ashwagandha may modestly increase thyroid hormone levels based on some evidence. Long-term (>12 month) safety data is limited.',
    evidence_refs: ['evidence:pratte-2014-ashwagandha-review', 'evidence:chandrasekhar-2012-ashwagandha-stress'],
    search_volume: 18100,
    ingredient_id: 'ingredient:ashwagandha',
  },

  // ─── MELATONIN ────────────────────────────────────────────────────────────────

  {
    id: 'faq:melatonin-effective-dose',
    question: 'What dose of melatonin actually works?',
    answer: 'A meta-analysis of 19 studies (Ferracioli-Oda et al., 2013, n=1,683) found melatonin effective at doses from 0.1–5mg, with most studies using 0.5–3mg. Crucially, the meta-analysis found no dose-response above approximately 0.5–1mg — higher doses did not improve sleep outcomes. Endogenous melatonin production is 0.1–0.3mg per night. Exogenous doses of 0.3–1mg produce physiological blood concentrations. Doses of 5–10mg (typical in most commercial products) produce blood levels 10–100 times higher than endogenous peak concentrations, without evidence of improved efficacy.',
    evidence_refs: ['evidence:ferracioli-oda-2013-melatonin-meta', 'evidence:buscemi-2005-melatonin-systematic-review', 'evidence:cajochen-2003-melatonin-physiology'],
    search_volume: 49500,
    ingredient_id: 'ingredient:melatonin',
  },
  {
    id: 'faq:melatonin-5mg-10mg-products',
    question: 'Why do products contain 5–10mg if the evidence supports lower doses?',
    answer: 'Peer-reviewed evidence establishes effectiveness at 0.5–3mg, with no additional benefit at higher doses (Ferracioli-Oda 2013, Buscemi 2005). Products containing 5–10mg contain two to twenty times the evidence-based dose. Possible explanations include consumer perception that "more is more," manufacturing convenience (capsule fill weights), and lack of regulatory pressure in markets where melatonin is sold as a supplement rather than a medicine. A government-commissioned systematic review (Buscemi 2005) confirmed safety at these doses but found no efficacy benefit from higher doses. This dose gap between evidence and common product doses is a notable pattern specific to melatonin.',
    evidence_refs: ['evidence:ferracioli-oda-2013-melatonin-meta', 'evidence:buscemi-2005-melatonin-systematic-review', 'evidence:cajochen-2003-melatonin-physiology'],
    search_volume: 22200,
    ingredient_id: 'ingredient:melatonin',
  },
  {
    id: 'faq:melatonin-jet-lag',
    question: 'Does melatonin help with jet lag?',
    answer: 'A government-commissioned systematic review (Buscemi et al., 2005) found melatonin significantly effective for delayed sleep phase disorder (DSPD) and jet lag. Melatonin works by shifting the phase of the circadian clock — timing of administration relative to destination time zone is important. Taking melatonin at local bedtime at the destination, beginning on the day of travel, is the evidence-based protocol. The Cochrane review on jet lag found melatonin (0.5–5mg) taken at destination bedtime significantly reduces jet lag symptoms when crossing 5+ time zones.',
    evidence_refs: ['evidence:buscemi-2005-melatonin-systematic-review', 'evidence:cajochen-2003-melatonin-physiology'],
    search_volume: 33100,
    ingredient_id: 'ingredient:melatonin',
  },
  {
    id: 'faq:melatonin-safe',
    question: 'Is melatonin safe to take regularly?',
    answer: 'Short-term safety (up to 3 months) is well-established from clinical trials with an adverse event profile comparable to placebo. Long-term daily use safety data is limited. Melatonin is not known to cause dependence or suppression of endogenous melatonin production at supplemental doses. Possible side effects include morning grogginess, headache, and dizziness, more common at higher doses. Regulatory status varies: in the UK, melatonin over 1mg is prescription-only; in the US, it is sold as a supplement without prescription. Long-term use, particularly at high doses, should be discussed with a physician.',
    evidence_refs: ['evidence:ferracioli-oda-2013-melatonin-meta', 'evidence:buscemi-2005-melatonin-systematic-review'],
    search_volume: 27100,
    ingredient_id: 'ingredient:melatonin',
  },
  {
    id: 'faq:melatonin-timing',
    question: 'When should I take melatonin?',
    answer: 'Melatonin is most effective when taken 30–60 minutes before the desired sleep time. It acts as a circadian signal, not a sedative — it does not induce sleep directly but shifts the timing of the body\'s sleep-wake cycle. Taking melatonin too early may cause daytime drowsiness; too late may have insufficient time to signal sleep onset before the desired bedtime. For jet lag, timing at the destination local bedtime is the evidence-based protocol, beginning on the day of travel. Consistent timing is more important than precise dose within the 0.5–3mg range.',
    evidence_refs: ['evidence:ferracioli-oda-2013-melatonin-meta', 'evidence:cajochen-2003-melatonin-physiology'],
    search_volume: 27100,
    ingredient_id: 'ingredient:melatonin',
  },

  // ─── COLLAGEN PEPTIDES ────────────────────────────────────────────────────────

  {
    id: 'faq:collagen-skin-evidence',
    question: 'Does collagen improve skin?',
    answer: 'A double-blind RCT (Proksch et al., 2014, n=69 women) found 2.5g and 5g hydrolysed collagen peptides daily for 8 weeks significantly improved skin elasticity versus placebo, with effects maintained 4 weeks post-treatment. Skin moisture also improved. The trial was conducted by researchers associated with GELITA, a collagen peptide manufacturer — this funding context is relevant to interpreting findings. Additional studies show modest improvements in skin hydration and wrinkle depth. The evidence is categorised as moderate: results are positive but the majority of studies have manufacturer associations.',
    evidence_refs: ['evidence:proksch-2014-collagen-skin'],
    search_volume: 40500,
    ingredient_id: 'ingredient:collagen-peptides',
  },
  {
    id: 'faq:collagen-joints',
    question: 'Does collagen help joint pain?',
    answer: 'Evidence exists but varies by collagen type and form. Type II collagen (undenatured, UC-II) at 40mg/day shows joint-specific evidence in studies with osteoarthritis patients. Hydrolysed type I/III collagen peptides at 5–15g/day show evidence for connective tissue synthesis (Shaw et al., 2017 — government-funded) when taken before exercise with vitamin C. Hydrolysed collagen provides high glycine and proline content — precursors to collagen synthesis in cartilage. Effect sizes in joint pain studies are moderate and some are manufacturer-associated. Evidence is categorised as moderate due to inconsistency across outcomes and funding patterns.',
    evidence_refs: ['evidence:shaw-2017-collagen-connective-tissue', 'evidence:zdzieblik-2015-collagen-muscle'],
    search_volume: 33100,
    ingredient_id: 'ingredient:collagen-peptides',
  },
  {
    id: 'faq:collagen-complete-protein',
    question: 'Can collagen replace protein powder?',
    answer: 'No. Collagen is not a complete protein — it lacks tryptophan (one of the nine essential amino acids) and has a low content of several others. It is disproportionately high in glycine, proline, hydroxyproline, and alanine. These are relevant for connective tissue synthesis but do not support muscle protein synthesis as effectively as leucine-rich complete proteins (whey, eggs, soy). The PDCAAS (protein digestibility-corrected amino acid score) for collagen is 0 due to the missing tryptophan. Collagen has specific connective tissue functions not replicated by other protein sources, but it does not replace complete dietary protein for muscle building.',
    evidence_refs: ['evidence:zdzieblik-2015-collagen-muscle', 'evidence:shaw-2017-collagen-connective-tissue'],
    search_volume: 22200,
    ingredient_id: 'ingredient:collagen-peptides',
  },
  {
    id: 'faq:collagen-vitamin-c',
    question: 'Should I take vitamin C with collagen?',
    answer: 'A government-funded crossover RCT (Shaw et al., 2017, n=8) found that vitamin C-enriched gelatin taken before exercise significantly elevated collagen synthesis markers (P1NP) compared to placebo. Vitamin C is a required cofactor for the hydroxylation of proline and lysine — steps essential for stable collagen triple-helix formation. Without adequate vitamin C, synthesised collagen chains are unstable. Taking 50mg vitamin C alongside collagen peptides before exercise is the protocol used in the Shaw study. Most collagen supplements now include vitamin C for this reason, though not all include the 50mg dose used in the evidence.',
    evidence_refs: ['evidence:shaw-2017-collagen-connective-tissue'],
    search_volume: 18100,
    ingredient_id: 'ingredient:collagen-peptides',
  },

  // ─── WHEY PROTEIN ISOLATE ─────────────────────────────────────────────────────

  {
    id: 'faq:whey-vs-concentrate',
    question: 'What is the difference between whey protein isolate and concentrate?',
    answer: 'Whey protein concentrate (WPC) retains more fat and lactose in the filtration process, typically yielding 70–80% protein by weight. Whey protein isolate (WPI) undergoes additional filtration to remove most fat and lactose, yielding 90%+ protein by weight. WPI has higher leucine content per gram, which is the primary trigger for muscle protein synthesis. WPI is more suitable for lactose-intolerant individuals. WPI is generally more expensive per gram of protein. For maximising muscle protein synthesis per gram consumed, WPI has a slight advantage due to higher leucine density and faster absorption kinetics.',
    evidence_refs: ['evidence:tang-2009-whey-mps', 'evidence:phillips-van-loon-2011-protein-athletes'],
    search_volume: 40500,
    ingredient_id: 'ingredient:whey-protein-isolate',
  },
  {
    id: 'faq:whey-protein-dose',
    question: 'How much whey protein should I take per serving?',
    answer: 'A government-funded meta-analysis (Morton et al., 2018, n=1,863) found protein supplementation significantly increases muscle mass and strength with resistance training, with the upper benefit plateau at approximately 1.62g protein/kg bodyweight/day across all sources. Per meal, Phillips & Van Loon (2011) establish that 20–40g leucine-rich protein maximises the muscle protein synthesis (MPS) response per sitting. Amounts above 40g per serving do not further stimulate MPS. Timing has minimal additional benefit when total daily protein intake is adequate. Doses used in evidence: 20–40g per serving.',
    evidence_refs: ['evidence:morton-2018-protein-meta-analysis', 'evidence:phillips-van-loon-2011-protein-athletes'],
    search_volume: 33100,
    ingredient_id: 'ingredient:whey-protein-isolate',
  },
  {
    id: 'faq:whey-lactose-intolerant',
    question: 'Can lactose-intolerant people take whey protein?',
    answer: 'Whey protein isolate (WPI) contains very little lactose — typically less than 1g per serving after the filtration process that removes most fat and lactose. Most lactose-intolerant individuals tolerate WPI without symptoms. Whey protein concentrate (WPC) retains more lactose (approximately 3–5g per serving) and may cause symptoms in those with moderate to severe lactose intolerance. Reading the label for lactose content is important. Hydrolysed whey (whey with pre-digested peptides) further reduces lactose content and digestive issues. Alternative complete proteins — egg white, soy isolate — are fully lactose-free.',
    evidence_refs: ['evidence:tang-2009-whey-mps', 'evidence:phillips-van-loon-2011-protein-athletes'],
    search_volume: 22200,
    ingredient_id: 'ingredient:whey-protein-isolate',
  },
  {
    id: 'faq:whey-leucine-mps',
    question: 'Why is leucine important in whey protein?',
    answer: 'Leucine is the primary amino acid responsible for activating the mTOR (mechanistic target of rapamycin) pathway, which initiates muscle protein synthesis. A government-funded RCT (Tang et al., 2009) demonstrated whey produces greater muscle protein synthesis than casein or soy at equivalent doses, attributed to whey\'s higher leucine content and faster absorption kinetics. Whey protein isolate contains approximately 10–11% leucine by weight — the highest of any dietary protein source. The "leucine threshold" hypothesis proposes approximately 2–3g leucine per meal is required to maximally stimulate MPS, which is met by a standard 25–30g WPI serving.',
    evidence_refs: ['evidence:tang-2009-whey-mps', 'evidence:phillips-van-loon-2011-protein-athletes'],
    search_volume: 18100,
    ingredient_id: 'ingredient:whey-protein-isolate',
  },
  {
    id: 'faq:protein-total-daily-intake',
    question: 'How much total protein do I need per day?',
    answer: 'A systematic review and meta-analysis of 49 RCTs (Morton et al., 2018) found muscle mass gains plateau at approximately 1.62g protein/kg bodyweight/day in resistance-trained adults. The 95% confidence interval extends to 2.2g/kg/day, supporting recommendations of 1.6–2.2g/kg/day for those pursuing muscle gain. For maintenance or general health, requirements are lower (0.8g/kg/day RDA). Distribution across meals matters: each meal should contain a leucine-rich protein source sufficient to stimulate MPS (20–40g for most adults). The protein source does not substantially affect outcomes when total daily intake and leucine content are matched.',
    evidence_refs: ['evidence:morton-2018-protein-meta-analysis', 'evidence:phillips-van-loon-2011-protein-athletes'],
    search_volume: 60500,
    ingredient_id: 'ingredient:whey-protein-isolate',
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

async function seedFaqs() {
  console.log('Connecting to SurrealDB...');
  const db = await connectDb();

  console.log(`Seeding ${FAQS.length} FAQ nodes...\n`);

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
      await db.upsert(faqRid).content({
        ...faqFields,
        last_updated: new Date(),
      });

      await db.query(
        `RELATE $faqId->answers_about->$ingredientId SET search_volume = $sv`,
        {
          faqId: faqRid,
          ingredientId: ingRid,
          sv: seed.search_volume ?? null,
        }
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

  console.log(`\n${faqsOk} FAQ nodes created · ${edgesOk} ANSWERS_ABOUT edges created · ${errors} errors`);

  if (errors > 0) {
    process.exit(1);
  }
}

seedFaqs().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
