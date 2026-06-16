-- EXCEPTION NODE
-- Quality flagger exception queue. Created by automated checks and pipeline.
-- Resolved by daily human review. Never auto-deleted — archived for audit trail.

DEFINE TABLE IF NOT EXISTS exceptions SCHEMAFULL;

DEFINE FIELD IF NOT EXISTS type        ON exceptions TYPE string
  ASSERT $value IN ["content","data","tier","submission","link","pipeline"];
DEFINE FIELD IF NOT EXISTS severity    ON exceptions TYPE string
  ASSERT $value IN ["critical","warning","info"];
DEFINE FIELD IF NOT EXISTS node_id     ON exceptions TYPE option<string>;
DEFINE FIELD IF NOT EXISTS description ON exceptions TYPE string;
DEFINE FIELD IF NOT EXISTS flagged_at  ON exceptions TYPE datetime;
DEFINE FIELD IF NOT EXISTS resolved    ON exceptions TYPE bool DEFAULT false;
DEFINE FIELD IF NOT EXISTS resolved_at ON exceptions TYPE option<datetime>;
DEFINE FIELD IF NOT EXISTS context     ON exceptions TYPE option<string>;

DEFINE INDEX IF NOT EXISTS exceptions_resolved  ON exceptions FIELDS resolved;
DEFINE INDEX IF NOT EXISTS exceptions_severity  ON exceptions FIELDS severity;
