-- (ingredient) -[RELATED_TO]-> (ingredient)
-- relationship_type examples: "synergistic", "competing", "same_family", "cofactor"
-- Allows graph traversal to surface related ingredients without editorial opinion

DEFINE TABLE IF NOT EXISTS related_to SCHEMAFULL TYPE RELATION FROM ingredient TO ingredient;

DEFINE FIELD IF NOT EXISTS relationship_type ON related_to TYPE string;
