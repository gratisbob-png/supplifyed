-- (product) -[CONTAINS]-> (ingredient)
-- Dose per serving, unit, and form are edge properties
-- One edge per ingredient per product

DEFINE TABLE IF NOT EXISTS contains SCHEMAFULL TYPE RELATION FROM product TO ingredient;

DEFINE FIELD IF NOT EXISTS dose_per_serving ON contains TYPE string;
DEFINE FIELD IF NOT EXISTS unit             ON contains TYPE string;
DEFINE FIELD IF NOT EXISTS form             ON contains TYPE string;
