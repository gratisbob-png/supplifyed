-- BRAND NODE
-- One node per brand/manufacturer
-- affiliate_network determines how commission links are generated
-- commission_rate is decimal 0-1 (e.g. 0.15 = 15%)

DEFINE TABLE IF NOT EXISTS brand SCHEMAFULL;

DEFINE FIELD IF NOT EXISTS id                ON brand TYPE string;
DEFINE FIELD IF NOT EXISTS name              ON brand TYPE string;
DEFINE FIELD IF NOT EXISTS website           ON brand TYPE string;
DEFINE FIELD IF NOT EXISTS affiliate_network ON brand TYPE string
  ASSERT $value IN ["amazon", "awin", "cj", "shareasale", "direct"];
DEFINE FIELD IF NOT EXISTS affiliate_link    ON brand TYPE string;
DEFINE FIELD IF NOT EXISTS commission_rate   ON brand TYPE option<decimal>;
DEFINE FIELD IF NOT EXISTS submission_date   ON brand TYPE option<datetime>;

DEFINE INDEX IF NOT EXISTS brand_name ON brand FIELDS name UNIQUE;
