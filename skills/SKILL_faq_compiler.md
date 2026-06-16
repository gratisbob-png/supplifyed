# SKILL: FAQ Compiler
**Version:** 1.1
**Trigger:** After SKILL_evidence_compiler completes for a new ingredient
**Input:** Ingredient ID, ingredient name, compiled evidence nodes
**Output:** FAQ nodes created in SurrealDB, ANSWERS_ABOUT edges connected

## WHAT THIS SKILL DOES
Generates empirical FAQ nodes for a new ingredient.
Answers each question using only peer-reviewed evidence and documented facts.
Creates ANSWERS_ABOUT edges from FAQ nodes to the ingredient node.

This skill is LLM-assisted — it requires Claude Code to write evidence-based answers.
Run it after SKILL_evidence_compiler has populated the ingredient's SUPPORTED_BY evidence.

## HOW TO TRIGGER
After evidence compilation completes for a new ingredient:
  `/faq_compiler ingredient_id=ingredient:X ingredient_name="X"`

## INPUTS
- ingredient_id: string — e.g. `ingredient:berberine`
- ingredient_name: string — e.g. `Berberine`
- evidence_nodes: Evidence[] — already compiled (read from graph via SUPPORTED_BY edges)

## PROCESS
1. Read all evidence nodes connected to this ingredient via SUPPORTED_BY edges
2. Identify the top 15-20 questions searched for this ingredient
3. For each question: write an empirical answer grounded in the compiled evidence
4. Create FAQ nodes following the `scripts/seed_faqs.ts` pattern:
   ```
   id: 'faq:[ingredient-slug]-[question-slug]'
   ```
5. Create ANSWERS_ABOUT edge: faq → ingredient
6. Run `npm run quality:check` to verify no opinion language

## QUESTION SOURCES
For each new ingredient, compile questions from:
1. High search volume supplement questions (docs/02_ingredient_database.md FAQ section)
2. Questions specific to this ingredient's primary claims
3. Safety questions (interactions, side effects, upper limits, contraindications)
4. Dose questions (effective dose, loading, timing, forms)
5. Comparison questions (vs alternatives, different forms)

Minimum: 5 questions. Target: 15-20.
For high-volume ingredients (creatine tier): 20 questions (see creatine FAQs as reference).

## ANSWER RULES (HARD — enforced by quality_check)
- Use only what peer-reviewed evidence shows — cite the study inline
- State clearly what evidence does NOT show
- Note if the only evidence available is manufacturer-funded
- Note dose studied vs typical product doses where relevant
- Use: "Evidence indicates..." or "Studies show..." or "A meta-analysis found..."
- Never use: "you should", "we recommend", "best", "suggest"
- If evidence is absent: "No peer-reviewed evidence is currently available for this claim"
- Never advise on personal supplementation — factual reporting only

## ID FORMAT
```
faq:[ingredient-slug]-[question-slug]
```
Where question-slug is the question lowercased, spaces replaced with hyphens, max 40 chars.
Example: `faq:berberine-does-berberine-lower-blood-sugar`

## IMPLEMENTATION PATTERN
Follow the pattern in `scripts/seed_faqs.ts` exactly.
After adding FAQs, verify with:
  `npm run test:queries` — confirms ANSWERS_ABOUT edges exist
  `npm run quality:check` — confirms no opinion language in answers

## RULES
- Minimum 5 FAQ nodes per ingredient before publishing
- Every answer must reference at least one evidence node ID in evidence_refs
- If evidence is absent for a claim: explicitly state absence — do not invent
- No duplicate question slugs per ingredient
- Run quality:check before declaring the FAQ compilation complete
