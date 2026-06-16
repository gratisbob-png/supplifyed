# SKILL: Evidence Compiler
**Version:** 1.1
**Trigger:** On new ingredient node created, or when `review:exceptions` shows a "new ingredient" warning
**Input:** Ingredient ID and name
**Output:** Evidence nodes created in SurrealDB, SUPPORTED_BY edges connected, evidence_rating updated

## WHAT THIS SKILL DOES
Finds peer-reviewed research for a new ingredient.
Creates evidence nodes in the SurrealDB graph.
Connects evidence to the ingredient via SUPPORTED_BY edges.
Assigns evidence_rating based on volume, independence, and consistency of research.

This skill is LLM-assisted — it requires Claude Code to find, evaluate, and synthesize research.
All other pipeline stages are fully automated. This stage and SKILL_faq_compiler are the only ones requiring LLM execution.

## HOW TO TRIGGER
When `npm run review:exceptions` shows a warning like:
  "New ingredient 'X' added via pipeline — run SKILL_evidence_compiler and SKILL_faq_compiler"

Run this skill by invoking it in Claude Code:
  `/evidence_compiler ingredient_id=ingredient:X ingredient_name="X"`

## INPUTS
- ingredient_id: string — e.g. `ingredient:berberine`
- ingredient_name: string — e.g. `Berberine`
- primary_use_case: string — e.g. `glucose regulation`

## PROCESS
1. Search PubMed, Cochrane Reviews, EFSA opinions, NHS evidence for the ingredient
2. Prioritise: systematic reviews > RCTs > cohort studies > mechanistic reviews
3. For each study: extract title, authors, year, journal, DOI, funded_by, finding, dose_studied, outcome
4. Create evidence node using the seed_evidence.ts pattern:
   ```
   id: 'evidence:[first-author]-[year]-[ingredient-keyword]'
   ```
5. Create SUPPORTED_BY edge: ingredient → evidence
6. After all evidence compiled: assign evidence_rating using rating rules below
7. Update ingredient node evidence_rating field

## EVIDENCE RATING RULES
- `strong`:   3+ independent studies, consistent findings, no material conflicts
- `moderate`: 2+ studies OR some inconsistency OR limited study size
- `mixed`:    Studies exist but findings conflict materially
- `limited`:  Fewer than 2 independent studies, or mostly manufacturer-funded

## FUNDED_BY CLASSIFICATION
- `independent`: funded by university, government body, or charity with no commercial interest
- `manufacturer`: funded by or conducted by the selling brand
- `government`:   funded by NIH, EFSA, NHS, MRC, or similar government research body
- `unknown`:      funding source not disclosed in the paper

## RULES
- Minimum 2 sources required before `strong` rating is assigned
- dose_studied MUST be recorded — not just the finding
- Every evidence node requires a link to the source (PubMed, DOI, or journal)
- Manufacturer-funded studies are included but funded_by must be set to `manufacturer`
- No editorial commentary — record exactly what the study states in finding and outcome
- Dose gap must be noted where evidence dose differs significantly from typical products

## IMPLEMENTATION PATTERN
Follow the pattern in `scripts/seed_evidence.ts` exactly.
Use `npm run seed:evidence` as a reference for the insert pattern.
After adding evidence, run `npm run test:queries` to verify SUPPORTED_BY edges exist.

## ERROR HANDLING
- No studies found: create empty evidence set, assign `limited`, flag for review with context
- Paywalled study: record abstract content, set context: 'paywalled — full text not available'
- Conflicting findings: record all, let rating rules determine the classification
- Cannot determine funding: set funded_by = 'unknown'
