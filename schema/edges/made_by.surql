-- (product) -[MADE_BY]-> (brand)
-- Simple relation — no edge properties needed

DEFINE TABLE IF NOT EXISTS made_by SCHEMAFULL TYPE RELATION FROM product TO brand;
