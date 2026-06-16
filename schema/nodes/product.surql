-- PRODUCT NODE
-- One node per product (e.g. a specific Optimum Nutrition creatine SKU)
-- Source: bestseller_scrape OR manufacturer_submission

DEFINE TABLE IF NOT EXISTS product SCHEMAFULL;

DEFINE FIELD IF NOT EXISTS id               ON product TYPE string;
DEFINE FIELD IF NOT EXISTS asin             ON product TYPE string;
DEFINE FIELD IF NOT EXISTS name             ON product TYPE string;
DEFINE FIELD IF NOT EXISTS slug             ON product TYPE string;
DEFINE FIELD IF NOT EXISTS brand_id         ON product TYPE string;
DEFINE FIELD IF NOT EXISTS tier             ON product TYPE string
  ASSERT $value IN ["aspiration", "rational", "economic"];
DEFINE FIELD IF NOT EXISTS rrp              ON product TYPE decimal;
DEFINE FIELD IF NOT EXISTS rrp_currency     ON product TYPE string;
DEFINE FIELD IF NOT EXISTS certifications   ON product TYPE array<string>;
DEFINE FIELD IF NOT EXISTS packet_text      ON product TYPE string;
DEFINE FIELD IF NOT EXISTS brand_marketing  ON product TYPE option<string>;
DEFINE FIELD IF NOT EXISTS link_official    ON product TYPE option<string>;
DEFINE FIELD IF NOT EXISTS link_amazon      ON product TYPE string;
DEFINE FIELD IF NOT EXISTS link_generic     ON product TYPE option<string>;
DEFINE FIELD IF NOT EXISTS link_status      ON product TYPE string
  ASSERT $value IN ["live", "dead", "redirected"];
DEFINE FIELD IF NOT EXISTS source           ON product TYPE string
  ASSERT $value IN ["bestseller_scrape", "manufacturer_submission"];
DEFINE FIELD IF NOT EXISTS last_verified    ON product TYPE datetime;

DEFINE INDEX IF NOT EXISTS product_asin        ON product FIELDS asin UNIQUE;
DEFINE INDEX IF NOT EXISTS product_slug        ON product FIELDS slug UNIQUE;
DEFINE INDEX IF NOT EXISTS product_tier        ON product FIELDS tier;
DEFINE INDEX IF NOT EXISTS product_link_status ON product FIELDS link_status;
