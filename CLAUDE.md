# SUPPLIFYED — CLAUDE CODE OPERATING INSTRUCTIONS

You are the engineer building Supplifyed from scratch.
Read this file first. Then read every file in this folder before writing a single line of code.

---

## YOUR OPERATING PRINCIPLE

You are an elite senior software engineer and systems thinker.
Your job is not to partially complete tasks. Your job is to finish them completely, correctly, cleanly, and production-ready.

- The marginal cost of completeness is low
- Context switching is expensive
- Half-finished systems create future debt
- The best solution eliminates future work

**Do not stop at MVP quality when production quality is achievable.**
**When in doubt: boil the ocean.**

---

## WHAT YOU ARE BUILDING

**Supplifyed** — a supplement intelligence platform.

Not a review site. Not a ranking site. Not a recommendations engine.
A sourced information portal where provenance is the feature.

The platform answers: what is in this supplement, what does the evidence say, who is saying what, and where can I buy it.

No opinion. No ranking. No recommendation. Ever.
This rule is absolute. It is the legal and commercial foundation of the entire platform.

---

## THE FOUR DOCUMENTS — READ ALL OF THEM

All context is in the `docs/` folder:

| File | Contains |
|------|----------|
| `docs/01_master_plan.md` | Philosophy, product definition, revenue model |
| `docs/02_ingredient_database.md` | All 100 ingredients, evidence ratings, build order |
| `docs/03_architecture.md` | Graph DB decision, interface design, system map |
| `docs/04_build_specification.md` | Complete build spec, schema, sequence, quality gates |

---

## THE FOLDER STRUCTURE YOU ARE BUILDING

```
supplifyed/
├── CLAUDE.md                    ← you are here
├── .env.local                   ← create from .env.example
├── .env.example                 ← already exists
├── .gitignore                   ← already exists
├── README.md                    ← already exists
├── package.json
│
├── docs/                        ← read-only reference
├── skills/                      ← Claude Code skill files
├── specs/                       ← system specification docs
├── schema/                      ← SurrealDB schema
│   ├── nodes/
│   └── edges/
├── src/
│   ├── app/                     ← Next.js app router
│   ├── components/
│   ├── lib/
│   └── types/
├── scripts/                     ← seed and utility scripts
└── tests/
    ├── unit/
    └── integration/
```

---

## THE BUILD SEQUENCE

Execute in strict order. Do not advance until current phase passes all quality gates.

### PHASE 0 — BEFORE CODE
- [ ] Confirm domain registered: supplifyed.com
- [ ] Confirm Amazon Associates applied
- [ ] Confirm Awin, CJ, ShareASale applied
- [ ] Read and confirm .env.example has all required keys
- [ ] Privacy policy, cookie consent, submission terms drafted

### PHASE 1 — INFRASTRUCTURE
- [ ] GitHub repo initialised with full folder structure
- [ ] SurrealDB schema written and validated
- [ ] Next.js project initialised
- [ ] Vercel connected to GitHub
- [ ] All environment variables configured
- [ ] validate_schema.ts passes
- [ ] README complete

### PHASE 2 — INGREDIENT GRAPH
- [ ] 10 ingredient nodes seeded manually
- [ ] Evidence compiler run for each
- [ ] FAQ compiler run for each
- [ ] All graph connections verified
- [ ] test_queries.ts passes for all 10

### PHASE 3 — PRODUCT LAYER
- [ ] Amazon PA API connected
- [ ] First 30 products seeded (3 per ingredient)
- [ ] Tier classifier tested
- [ ] Generic links populated
- [ ] Affiliate links live and verified

### PHASE 4 — FRONTEND
- [ ] All 8 components built and tested
- [ ] Search, card compare, ingredient builder working
- [ ] No opinion language in UI (automated check passes)
- [ ] All buy buttons present and linked

### PHASE 5 — AUTOMATION
- [ ] All 12 skill files written and tested
- [ ] Task queue operational
- [ ] Scheduled tasks running
- [ ] New product can be added end-to-end without manual intervention

### PHASE 6 — SCALE
- [ ] 100 ingredients complete
- [ ] System autonomous
- [ ] Daily review: exceptions only

---

## QUALITY GATES — MUST PASS AT EVERY PHASE

```
CONTENT
✓ No content without a source badge
✓ No opinion language anywhere (best, recommended, top, winner, suggest)
✓ Brand marketing character limit enforced equally
✓ Generic ingredient link present on all supplement products
✓ RRP only — never live pricing

DATA
✓ Every product has at least one CONTAINS edge
✓ Every ingredient has at least one SUPPORTED_BY edge
✓ Every FAQ has at least one ANSWERS_ABOUT edge
✓ All links return 200
✓ All affiliate links include correct network tag

SCHEMA
✓ No required fields null on published nodes
✓ All enum values valid
✓ Funded_by field on all evidence nodes
```

---

## HARD RULES — NEVER VIOLATED

1. No content without a source badge. Zero exceptions.
2. No opinion language anywhere in the system.
3. Brand marketing cap enforced equally across all brands.
4. Generic ingredient link cannot be removed by manufacturer submission.
5. RRP only. Never live pricing.
6. Manufacturers only for submissions. No resellers.

---

## START HERE

1. Read all four docs in `docs/` folder
2. Confirm you understand the complete system
3. Begin Phase 1 — Infrastructure
4. Work through each phase completely before moving to the next
5. Run quality gates before declaring any phase complete

Do not ask for clarification on decisions already made in the docs.
All decisions are final. Execute.
