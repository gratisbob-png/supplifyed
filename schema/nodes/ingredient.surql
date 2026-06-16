-- INGREDIENT NODE
-- One node per ingredient (e.g. creatine-monohydrate, magnesium-glycinate)
-- Connected to products via CONTAINS edges, evidence via SUPPORTED_BY, FAQs via ANSWERS_ABOUT

DEFINE TABLE IF NOT EXISTS ingredient SCHEMAFULL;

-- ─── Core fields ──────────────────────────────────────────────────────────────

DEFINE FIELD IF NOT EXISTS id              ON ingredient TYPE string;
DEFINE FIELD IF NOT EXISTS name            ON ingredient TYPE string;
DEFINE FIELD IF NOT EXISTS slug            ON ingredient TYPE string;
DEFINE FIELD IF NOT EXISTS category        ON ingredient TYPE string;
DEFINE FIELD IF NOT EXISTS description     ON ingredient TYPE string;
DEFINE FIELD IF NOT EXISTS primary_use     ON ingredient TYPE array<string>;
DEFINE FIELD IF NOT EXISTS evidence_rating ON ingredient TYPE string
  ASSERT $value IN ["strong", "moderate", "mixed", "limited"];
DEFINE FIELD IF NOT EXISTS dose_context    ON ingredient TYPE string;
DEFINE FIELD IF NOT EXISTS legal_notes     ON ingredient TYPE option<string>;
DEFINE FIELD IF NOT EXISTS last_verified   ON ingredient TYPE datetime;

-- ─── Wiki depth fields ────────────────────────────────────────────────────────

DEFINE FIELD IF NOT EXISTS synonyms            ON ingredient TYPE option<array<string>>;
DEFINE FIELD IF NOT EXISTS mechanism_of_action ON ingredient TYPE option<string>;
DEFINE FIELD IF NOT EXISTS history_of_use      ON ingredient TYPE option<string>;
DEFINE FIELD IF NOT EXISTS smiles              ON ingredient TYPE option<string>;
DEFINE FIELD IF NOT EXISTS molecular_formula   ON ingredient TYPE option<string>;
DEFINE FIELD IF NOT EXISTS molecular_weight    ON ingredient TYPE option<number>;
DEFINE FIELD IF NOT EXISTS iupac_name          ON ingredient TYPE option<string>;
DEFINE FIELD IF NOT EXISTS common_name         ON ingredient TYPE option<string>;

-- ─── Forms / bioavailability comparison table ─────────────────────────────────

DEFINE FIELD IF NOT EXISTS forms       ON ingredient TYPE option<array>;
DEFINE FIELD IF NOT EXISTS forms[*]    ON ingredient TYPE object;

DEFINE FIELD IF NOT EXISTS forms[*].name            ON ingredient TYPE string;
DEFINE FIELD IF NOT EXISTS forms[*].bioavailability ON ingredient TYPE string
  ASSERT $value IN ["high", "moderate", "low"];
DEFINE FIELD IF NOT EXISTS forms[*].notes           ON ingredient TYPE string;
DEFINE FIELD IF NOT EXISTS forms[*].source_badge    ON ingredient TYPE string
  ASSERT $value IN ["LABEL", "MANUFACTURER", "BRAND_MARKETING", "PEER_REVIEWED", "PRESS", "INSTRUCTIONAL"];

-- ─── Drug / supplement interactions table ─────────────────────────────────────

DEFINE FIELD IF NOT EXISTS interactions       ON ingredient TYPE option<array>;
DEFINE FIELD IF NOT EXISTS interactions[*]    ON ingredient TYPE object;

DEFINE FIELD IF NOT EXISTS interactions[*].name         ON ingredient TYPE string;
DEFINE FIELD IF NOT EXISTS interactions[*].type         ON ingredient TYPE string
  ASSERT $value IN ["drug", "supplement"];
DEFINE FIELD IF NOT EXISTS interactions[*].mechanism    ON ingredient TYPE string;
DEFINE FIELD IF NOT EXISTS interactions[*].severity     ON ingredient TYPE string
  ASSERT $value IN ["caution", "avoid", "monitor"];
DEFINE FIELD IF NOT EXISTS interactions[*].source_badge ON ingredient TYPE string
  ASSERT $value IN ["LABEL", "MANUFACTURER", "BRAND_MARKETING", "PEER_REVIEWED", "PRESS", "INSTRUCTIONAL"];

-- ─── Indexes ─────────────────────────────────────────────────────────────────

DEFINE INDEX IF NOT EXISTS ingredient_slug ON ingredient FIELDS slug UNIQUE;
DEFINE INDEX IF NOT EXISTS ingredient_name ON ingredient FIELDS name;
