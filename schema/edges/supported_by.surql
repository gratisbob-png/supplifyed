-- (ingredient) -[SUPPORTED_BY]-> (evidence)
-- relevance: how directly this study applies to this ingredient
-- direction: "supports" | "neutral" | "contradicts"

DEFINE TABLE IF NOT EXISTS supported_by SCHEMAFULL TYPE RELATION FROM ingredient TO evidence;

DEFINE FIELD IF NOT EXISTS relevance ON supported_by TYPE string;
DEFINE FIELD IF NOT EXISTS direction ON supported_by TYPE string
  ASSERT $value IN ["supports", "neutral", "contradicts"];
