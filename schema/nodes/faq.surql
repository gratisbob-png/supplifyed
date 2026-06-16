-- FAQ NODE
-- One node per frequently-asked question
-- Connected to ingredients via ANSWERS_ABOUT edges
-- evidence_refs are IDs of evidence nodes that support the answer

DEFINE TABLE IF NOT EXISTS faq SCHEMAFULL;

DEFINE FIELD IF NOT EXISTS id            ON faq TYPE string;
DEFINE FIELD IF NOT EXISTS question      ON faq TYPE string;
DEFINE FIELD IF NOT EXISTS answer        ON faq TYPE string;
DEFINE FIELD IF NOT EXISTS evidence_refs ON faq TYPE array<string>;
DEFINE FIELD IF NOT EXISTS search_volume ON faq TYPE option<int>;
DEFINE FIELD IF NOT EXISTS last_updated  ON faq TYPE datetime;

DEFINE INDEX IF NOT EXISTS faq_question      ON faq FIELDS question;
DEFINE INDEX IF NOT EXISTS faq_search_volume ON faq FIELDS search_volume;
