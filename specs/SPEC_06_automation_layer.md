# SPEC 06 — AUTOMATION LAYER
## Skill Files, Task Queue, Scheduled Triggers

---

## Purpose

Keeps the platform self-maintaining. New products enter automatically. Links checked on schedule. Evidence updated when new research is available. Daily commitment: 1-2 hours reviewing exceptions.

## The 12 Skill Files

Each skill file is a markdown document in `skills/`. Claude Code reads the skill and executes it.

| Skill | Trigger | What It Does |
|-------|---------|-------------|
| SKILL_scrape_bestsellers | Scheduled, weekly | Identifies top 5 products per Amazon subcategory |
| SKILL_fetch_product_data | On new ASIN | Fetches full product data from Amazon PA API |
| SKILL_tier_classifier | On new product | Assigns aspiration/rational/economic based on price + rank |
| SKILL_generic_identifier | On new ingredient | Identifies the raw compound and generates generic link |
| SKILL_evidence_compiler | On new ingredient | Compiles peer-reviewed evidence per ingredient |
| SKILL_label_extractor | On new product | Extracts structured data from packet label text |
| SKILL_faq_compiler | On new ingredient | Compiles FAQ nodes from high-search questions |
| SKILL_link_generator | On new product | Generates and validates all affiliate links |
| SKILL_link_checker | Scheduled, weekly | Checks all links, flags dead/redirected |
| SKILL_brand_intake | On manufacturer submission | Processes and validates manufacturer content |
| SKILL_data_exporter | On demand | Exports anonymised aggregate data for licensing |
| SKILL_quality_flagger | Scheduled, daily | Checks all content against quality rules |

## Task Queue

Skills run sequentially per product to prevent API rate limit collisions. No skill should be called on a product until the previous skill has completed.

```
New ASIN identified →
  SKILL_fetch_product_data →
  SKILL_label_extractor →
  SKILL_tier_classifier →
  SKILL_generic_identifier →
  SKILL_link_generator →
  Published to graph →
  SKILL_evidence_compiler (if new ingredient) →
  SKILL_faq_compiler (if new ingredient)
```

## Milestone

Run full pipeline on one new product without any manual intervention:
Product identified → fetched → tiered → linked → published → verified

This is the Phase 5 completion milestone.

## Scheduling

Via Vercel cron jobs (vercel.json) or external scheduler. Weekly for scraping and link checks. Daily for quality flags. On-demand for manufacturer submissions.
