-- (faq) -[ANSWERS_ABOUT]-> (ingredient)
-- search_volume on edge for ingredient-specific FAQ prioritisation

DEFINE TABLE IF NOT EXISTS answers_about SCHEMAFULL TYPE RELATION FROM faq TO ingredient;

DEFINE FIELD IF NOT EXISTS search_volume ON answers_about TYPE option<int>;
