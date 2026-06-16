# SUPPLIFYED — ARCHITECTURE
## Graph Database, Interface Design, System Map

---

## THE CORE ARCHITECTURE DECISION

### Graph Database — Not Relational

**Technology: SurrealDB**

Why not relational (Supabase): Flat tables with foreign keys cannot hold the natural connections between ingredients, products, evidence, FAQs, and use cases simultaneously. A relational database forces you to choose a single category for each piece of information.

Why graph: Information exists in multiple contexts simultaneously. Magnesium is a mineral, sleep aid, performance supplement, and electrolyte — all at once. A graph holds all connections. The LLM traverses connections naturally and finds relationships a table query would miss.

**The superposition principle:**
Every piece of information exists in relation to every other relevant piece. Melatonin connects to sleep, dose research, safety questions, product tiers, the dose gap between evidence and products, and every FAQ about it. All simultaneously. Until a query observes it.

**Build this right once.** Starting with relational and migrating later is expensive and painful.

### Why SurrealDB over Neo4j

SurrealDB handles both graph and relational in one. Better for a solo laptop-first build. Runs locally for development, cloud for production. Neo4j is more established but heavier.

---

## SYSTEM MAP

```
                 ┌─────────────────────┐
                 │      FRONTEND        │
                 │  Next.js on Vercel   │
                 │  Search · Cards      │
                 │  Ingredient Builder  │
                 └──────────┬──────────┘
                            │ reads
                 ┌──────────▼──────────┐
       ┌─────────│     PAGE LAYER       │─────────┐
       │         │  Ingredient pages    │         │
       │         │  Product pages       │         │
       │         └──────────┬──────────┘         │
       │                    │ reads               │
writes │         ┌──────────▼──────────┐         │ writes
       │         │     DATA LAYER       │         │
       │         │  SurrealDB Graph     │         │
       │         │  Nodes + Edges       │         │
       │         └──────────┬──────────┘         │
       │                    │                     │
┌──────▼──────┐   ┌─────────▼────────┐   ┌──────▼──────┐
│  EVIDENCE   │   │   AUTOMATION     │   │ SUBMISSION  │
│  LAYER      │   │   Claude Code    │   │  LAYER      │
│  Research   │   │   Skill files    │   │  Mfr intake │
└─────────────┘   └────────┬─────────┘   └─────────────┘
                           │
             ┌─────────────┼─────────────┐
    ┌────────▼───┐  ┌──────▼──────┐  ┌──▼──────────┐
    │ AFFILIATE  │  │  ANALYTICS  │  │  INFRA      │
    │  3 links   │  │  Behaviour  │  │  GitHub     │
    │ per product│  │  data layer │  │  Vercel     │
    └────────────┘  └─────────────┘  └─────────────┘
```

---

## THE NINE SYSTEM PARTS

| Part | Function | Feeds Into | Receives From |
|------|----------|-----------|---------------|
| 1. Data Layer | Graph database. Ingredient and product nodes. All connections. | Page Layer, Frontend | Automation, Evidence, Submission |
| 2. Evidence Layer | Research compiled per ingredient. Evidence rated. Sources linked. | Data Layer | External research, Automation |
| 3. Page Layer | Ingredient pages and product pages rendered from graph. | Frontend | Data Layer |
| 4. Affiliate Layer | Three links per product. Associates tags. Commission tracking. | Page Layer, Cards | Amazon PA API, Brand submissions |
| 5. Submission Layer | Manufacturer intake. Validation. Page enrichment. Cap enforcement. | Data Layer | Manufacturers |
| 6. Automation Layer | Skill files. Claude Code. Task queue. Keeps everything fed. | All layers | Amazon PA API, Scheduled triggers |
| 7. Analytics Layer | Behavioural capture. Anonymised aggregation. Licensing reports. | Data licensing revenue | Frontend behaviour events |
| 8. Frontend | Search bar. Card view. Ingredient builder. Hosted on Vercel. | User | Page Layer, Data Layer |
| 9. Infrastructure | GitHub, Vercel, SurrealDB, Domain. | All parts | Everything |

---

## GRAPH SCHEMA

### Nodes

```surql
-- INGREDIENT NODE
DEFINE TABLE ingredient SCHEMAFULL;
DEFINE FIELD id             ON ingredient TYPE string;
DEFINE FIELD name           ON ingredient TYPE string;
DEFINE FIELD category       ON ingredient TYPE string;
DEFINE FIELD description    ON ingredient TYPE string;
DEFINE FIELD primary_use    ON ingredient TYPE array;
DEFINE FIELD evidence_rating ON ingredient TYPE string
  ASSERT $value IN ["strong","moderate","mixed","limited"];
DEFINE FIELD dose_context   ON ingredient TYPE string;
DEFINE FIELD legal_notes    ON ingredient TYPE option<string>;
DEFINE FIELD last_verified  ON ingredient TYPE datetime;

-- PRODUCT NODE
DEFINE TABLE product SCHEMAFULL;
DEFINE FIELD id               ON product TYPE string;
DEFINE FIELD asin             ON product TYPE string;
DEFINE FIELD name             ON product TYPE string;
DEFINE FIELD brand_id         ON product TYPE string;
DEFINE FIELD tier             ON product TYPE string
  ASSERT $value IN ["aspiration","rational","economic"];
DEFINE FIELD rrp              ON product TYPE decimal;
DEFINE FIELD rrp_currency     ON product TYPE string;
DEFINE FIELD certifications   ON product TYPE array;
DEFINE FIELD packet_text      ON product TYPE string;
DEFINE FIELD brand_marketing  ON product TYPE option<string>;
DEFINE FIELD link_official    ON product TYPE option<string>;
DEFINE FIELD link_amazon      ON product TYPE string;
DEFINE FIELD link_generic     ON product TYPE option<string>;
DEFINE FIELD link_status      ON product TYPE string
  ASSERT $value IN ["live","dead","redirected"];
DEFINE FIELD source           ON product TYPE string
  ASSERT $value IN ["bestseller_scrape","manufacturer_submission"];
DEFINE FIELD last_verified    ON product TYPE datetime;

-- EVIDENCE NODE
DEFINE TABLE evidence SCHEMAFULL;
DEFINE FIELD id           ON evidence TYPE string;
DEFINE FIELD title        ON evidence TYPE string;
DEFINE FIELD authors      ON evidence TYPE string;
DEFINE FIELD year         ON evidence TYPE int;
DEFINE FIELD journal      ON evidence TYPE string;
DEFINE FIELD doi          ON evidence TYPE option<string>;
DEFINE FIELD link         ON evidence TYPE string;
DEFINE FIELD funded_by    ON evidence TYPE string
  ASSERT $value IN ["independent","manufacturer","government","unknown"];
DEFINE FIELD finding      ON evidence TYPE string;
DEFINE FIELD dose_studied ON evidence TYPE string;
DEFINE FIELD outcome      ON evidence TYPE string;

-- FAQ NODE
DEFINE TABLE faq SCHEMAFULL;
DEFINE FIELD id            ON faq TYPE string;
DEFINE FIELD question      ON faq TYPE string;
DEFINE FIELD answer        ON faq TYPE string;
DEFINE FIELD evidence_refs ON faq TYPE array;
DEFINE FIELD search_volume ON faq TYPE option<int>;
DEFINE FIELD last_updated  ON faq TYPE datetime;

-- BRAND NODE
DEFINE TABLE brand SCHEMAFULL;
DEFINE FIELD id                ON brand TYPE string;
DEFINE FIELD name              ON brand TYPE string;
DEFINE FIELD website           ON brand TYPE string;
DEFINE FIELD affiliate_network ON brand TYPE string
  ASSERT $value IN ["amazon","awin","cj","shareasale","direct"];
DEFINE FIELD affiliate_link    ON brand TYPE string;
DEFINE FIELD commission_rate   ON brand TYPE option<decimal>;
DEFINE FIELD submission_date   ON brand TYPE option<datetime>;
```

### Edges

```surql
-- (product) -[CONTAINS]-> (ingredient)
DEFINE TABLE contains SCHEMAFULL TYPE RELATION FROM product TO ingredient;
DEFINE FIELD dose_per_serving ON contains TYPE string;
DEFINE FIELD unit             ON contains TYPE string;
DEFINE FIELD form             ON contains TYPE string;

-- (ingredient) -[SUPPORTED_BY]-> (evidence)
DEFINE TABLE supported_by SCHEMAFULL TYPE RELATION FROM ingredient TO evidence;
DEFINE FIELD relevance  ON supported_by TYPE string;
DEFINE FIELD direction  ON supported_by TYPE string;

-- (faq) -[ANSWERS_ABOUT]-> (ingredient)
DEFINE TABLE answers_about SCHEMAFULL TYPE RELATION FROM faq TO ingredient;
DEFINE FIELD search_volume ON answers_about TYPE option<int>;

-- (product) -[MADE_BY]-> (brand)
DEFINE TABLE made_by SCHEMAFULL TYPE RELATION FROM product TO brand;

-- (ingredient) -[RELATED_TO]-> (ingredient)
DEFINE TABLE related_to SCHEMAFULL TYPE RELATION FROM ingredient TO ingredient;
DEFINE FIELD relationship_type ON related_to TYPE string;
```

---

## THE INTERFACE

### Three Navigation Modes

| Mode | How It Works | User Type | Graph Operation |
|------|-------------|-----------|----------------|
| Search | Type ingredient, question, or product name. Deep single result. | Specific question. | Traverse from query node outward. |
| Card Compare | Multiple product cards side by side. All empirical data at a glance. | Evaluating options. | Render multiple product nodes simultaneously. |
| Ingredient Builder | Select 1-5 compounds. Returns all products containing all of them. | Building a stack. | Find intersection of ingredient nodes. |

### The Search Bar

One search bar. The entire platform interface.
Simple surface. Entire knowledge graph working underneath.

```
User types: melatonin
→ Graph finds: melatonin node
→ Returns: ingredient page + evidence + FAQ + product tier stack

User types: does creatine cause hair loss
→ Graph finds: creatine node → hair loss FAQ node
→ Returns: empirical answer with sources + creatine page

User types: best magnesium for sleep
→ Graph traverses: magnesium → sleep connection → glycinate form
→ Returns: magnesium glycinate surfaced by graph connection
   Not editorial. The data connection produced the result.
```

### The Pokemon Card Layout

```
┌──────────────────────────────────────────────────┐
│  PRODUCT NAME                          [TIER]    │
│  Brand Name  ·  Variant                          │
├──────────────────────────────────────────────────┤
│  INGREDIENTS                  DOSE PER SERVING   │
│  Primary compound             Xmg                │
│  Secondary compound           Xmg                │
├──────────────────────────────────────────────────┤
│  EVIDENCE    [PEER REVIEWED]  [MANUFACTURER]     │
│  Summary of evidence status for key compounds    │
├──────────────────────────────────────────────────┤
│  CERTIFICATIONS  Badge · Badge · Badge           │
├──────────────────────────────────────────────────┤
│  RRP  £XX.XX per unit  (£X.XX per serving)       │
├──────────────────────────────────────────────────┤
│  [Official Store]   [Amazon]   [Generic ↓]       │
└──────────────────────────────────────────────────┘

Tier badge colours:
  ASPIRATION = deep green border
  RATIONAL   = standard border
  ECONOMIC   = light border

No ranking text. No score. No star rating. Ever.
```

### The Ingredient Builder

```
User selects: Magnesium + L-Theanine + Melatonin

→ Graph traverses all three ingredient nodes
→ Finds intersection: products containing all three
→ Returns as Pokemon cards
→ User sees which products hit all ingredients,
  at what doses, at what price tier

No ranking. Cards presented. User decides.
```

---

## FILE STRUCTURE

```
supplifyed/
├── CLAUDE.md                    ← Claude Code instructions
├── .env.local                   ← API keys — never committed
├── .env.example                 ← Template
├── .gitignore
├── README.md
├── package.json
│
├── docs/                        ← Read-only reference
│   ├── 01_master_plan.md
│   ├── 02_ingredient_database.md
│   ├── 03_architecture.md
│   └── 04_build_specification.md
│
├── skills/                      ← Claude Code skill files
│   ├── SKILL_scrape_bestsellers.md
│   ├── SKILL_fetch_product_data.md
│   ├── SKILL_tier_classifier.md
│   ├── SKILL_generic_identifier.md
│   ├── SKILL_evidence_compiler.md
│   ├── SKILL_label_extractor.md
│   ├── SKILL_faq_compiler.md
│   ├── SKILL_link_generator.md
│   ├── SKILL_link_checker.md
│   ├── SKILL_brand_intake.md
│   ├── SKILL_data_exporter.md
│   └── SKILL_quality_flagger.md
│
├── specs/                       ← System spec docs
│   ├── SPEC_01_data_layer.md
│   ├── SPEC_02_evidence_layer.md
│   ├── SPEC_03_page_layer.md
│   ├── SPEC_04_affiliate_layer.md
│   ├── SPEC_05_submission_layer.md
│   ├── SPEC_06_automation_layer.md
│   ├── SPEC_07_analytics_layer.md
│   ├── SPEC_08_frontend.md
│   └── SPEC_09_infrastructure.md
│
├── schema/
│   ├── nodes/
│   │   ├── ingredient.surql
│   │   ├── product.surql
│   │   ├── evidence.surql
│   │   ├── faq.surql
│   │   └── brand.surql
│   └── edges/
│       ├── contains.surql
│       ├── supported_by.surql
│       ├── answers_about.surql
│       ├── made_by.surql
│       └── related_to.surql
│
├── src/
│   ├── app/
│   │   ├── page.tsx             ← Search landing
│   │   ├── ingredient/[slug]/page.tsx
│   │   └── product/[slug]/page.tsx
│   ├── components/
│   │   ├── SearchBar.tsx
│   │   ├── IngredientPage.tsx
│   │   ├── ProductCard.tsx
│   │   ├── CardCompare.tsx
│   │   ├── IngredientBuilder.tsx
│   │   ├── SourceBadge.tsx
│   │   ├── EvidenceRating.tsx
│   │   ├── TierStack.tsx
│   │   └── BuyButtons.tsx
│   ├── lib/
│   │   ├── db.ts                ← SurrealDB client
│   │   ├── queries.ts           ← All graph queries
│   │   ├── affiliate.ts         ← Link generation
│   │   └── analytics.ts         ← Behaviour capture
│   └── types/
│       └── index.ts
│
├── scripts/
│   ├── seed_ingredients.ts
│   ├── seed_products.ts
│   ├── validate_schema.ts
│   └── test_queries.ts
│
└── tests/
    ├── unit/
    │   ├── affiliate.test.ts
    │   ├── queries.test.ts
    │   └── components.test.ts
    └── integration/
        ├── search.test.ts
        └── ingredient_builder.test.ts
```
