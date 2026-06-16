# SPEC 02 — EVIDENCE LAYER
## Research Compilation and Evidence Rating

---

## Purpose

Converts peer-reviewed research into structured evidence nodes linked to ingredient nodes via SUPPORTED_BY edges. The evidence layer is what separates Supplifyed from every competitor.

## Evidence Node Fields

| Field | Type | Rule |
|-------|------|------|
| title | string | Exact paper title |
| authors | string | Author list |
| year | int | Publication year |
| journal | string | Journal name |
| doi | string? | DOI if available |
| link | string | PubMed or journal link |
| funded_by | enum | MANDATORY — independent/manufacturer/government/unknown |
| finding | string | Plain language summary of what was found |
| dose_studied | string | Exact dose used in study |
| outcome | string | What was measured |

## Evidence Rating Criteria

| Rating | Criteria |
|--------|---------|
| Strong | 3+ independent peer-reviewed studies, consistent findings |
| Moderate | Evidence exists, some inconsistency or limited study size |
| Mixed | Studies exist but findings conflict |
| Limited | Few or no independent studies |

## The funded_by Rule

Every evidence node must have funded_by populated. This is non-negotiable. Users deserve to know who paid for the study. Manufacturer-funded studies showing product efficacy are legitimate evidence — labelled as what they are.

## The Skill

`skills/SKILL_evidence_compiler.md` — automated evidence compilation per ingredient.

## Quality Gates

- funded_by populated on all evidence nodes
- direction (supports/neutral/contradicts) on all SUPPORTED_BY edges
- At least 3 evidence nodes per Strong-rated ingredient
- DOI present where available (not all papers have DOIs)
