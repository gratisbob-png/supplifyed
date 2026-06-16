-- EVIDENCE NODE
-- One node per peer-reviewed study or evidence source
-- Connected to ingredients via SUPPORTED_BY edges
-- funded_by is mandatory — every evidence node must declare its funding source

DEFINE TABLE IF NOT EXISTS evidence SCHEMAFULL;

DEFINE FIELD IF NOT EXISTS id           ON evidence TYPE string;
DEFINE FIELD IF NOT EXISTS title        ON evidence TYPE string;
DEFINE FIELD IF NOT EXISTS authors      ON evidence TYPE string;
DEFINE FIELD IF NOT EXISTS year         ON evidence TYPE int;
DEFINE FIELD IF NOT EXISTS journal      ON evidence TYPE string;
DEFINE FIELD IF NOT EXISTS doi          ON evidence TYPE option<string>;
DEFINE FIELD IF NOT EXISTS link         ON evidence TYPE string;
DEFINE FIELD IF NOT EXISTS funded_by    ON evidence TYPE string
  ASSERT $value IN ["independent", "manufacturer", "government", "unknown"];
DEFINE FIELD IF NOT EXISTS finding      ON evidence TYPE string;
DEFINE FIELD IF NOT EXISTS dose_studied ON evidence TYPE string;
DEFINE FIELD IF NOT EXISTS outcome      ON evidence TYPE string;

DEFINE INDEX IF NOT EXISTS evidence_doi  ON evidence FIELDS doi;
DEFINE INDEX IF NOT EXISTS evidence_year ON evidence FIELDS year;
