// Core domain types for Supplifyed
// Every type maps 1:1 to a SurrealDB node or edge

export type EvidenceRating = 'strong' | 'moderate' | 'mixed' | 'limited';
export type ProductTier = 'aspiration' | 'rational' | 'economic';
export type LinkStatus = 'live' | 'dead' | 'redirected';
export type FundedBy = 'independent' | 'manufacturer' | 'government' | 'unknown';
export type AffiliateNetwork = 'amazon' | 'awin' | 'cj' | 'shareasale' | 'direct';
export type ProductSource = 'bestseller_scrape' | 'manufacturer_submission';
export type SourceBadge =
  | 'LABEL'
  | 'MANUFACTURER'
  | 'BRAND_MARKETING'
  | 'PEER_REVIEWED'
  | 'PRESS'
  | 'INSTRUCTIONAL';
export type EvidenceDirection = 'supports' | 'neutral' | 'contradicts';

// ─── Wiki depth types ──────────────────────────────────────────────────────────

export interface IngredientForm {
  name: string;
  bioavailability: 'high' | 'moderate' | 'low';
  notes: string;
  source_badge: SourceBadge;
}

export interface Interaction {
  name: string;
  type: 'drug' | 'supplement';
  mechanism: string;
  severity: 'caution' | 'avoid' | 'monitor';
  source_badge: SourceBadge;
}

// ─── Node types ────────────────────────────────────────────────────────────────

export interface Ingredient {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  primary_use: string[];
  evidence_rating: EvidenceRating;
  dose_context: string;
  legal_notes?: string;
  last_verified: Date;
  // Wiki depth fields — optional, populated as data is seeded
  smiles?: string;
  molecular_formula?: string;
  molecular_weight?: number;
  iupac_name?: string;
  common_name?: string;
  synonyms?: string[];
  mechanism_of_action?: string;
  history_of_use?: string;
  forms?: IngredientForm[];
  interactions?: Interaction[];
}

export interface Product {
  id: string;
  asin: string;
  name: string;
  slug: string;
  brand_id: string;
  tier: ProductTier;
  rrp: number;
  rrp_currency: string;
  certifications: string[];
  packet_text: string;
  brand_marketing?: string;
  link_official?: string;
  link_amazon: string;
  link_generic?: string;
  link_status: LinkStatus;
  source: ProductSource;
  last_verified: Date;
}

export interface Evidence {
  id: string;
  title: string;
  authors: string;
  year: number;
  journal: string;
  doi?: string;
  link: string;
  funded_by: FundedBy;
  finding: string;
  dose_studied: string;
  outcome: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  evidence_refs: string[];
  search_volume?: number;
  last_updated: Date;
}

export interface Brand {
  id: string;
  name: string;
  website: string;
  affiliate_network: AffiliateNetwork;
  affiliate_link: string;
  commission_rate?: number;
  submission_date?: Date;
}

// ─── Edge types ────────────────────────────────────────────────────────────────

export interface ContainsEdge {
  in: string;  // product id
  out: string; // ingredient id
  dose_per_serving: string;
  unit: string;
  form: string;
}

export interface SupportedByEdge {
  in: string;  // ingredient id
  out: string; // evidence id
  relevance: string;
  direction: EvidenceDirection;
}

// ─── Graph traversal result types ─────────────────────────────────────────────

export interface IngredientContains {
  ingredient: Ingredient;
  dose_per_serving: string;
  unit: string;
  form: string;
}

export interface ProductWithBrand extends Product {
  brand: Brand;
  ingredients: IngredientContains[];
}

export interface IngredientWithEvidence extends Ingredient {
  evidence: Evidence[];
  faqs: FAQ[];
  products: ProductWithBrand[];
  related_compounds?: Ingredient[];
}

export interface TierStack {
  aspiration: ProductWithBrand[];
  rational: ProductWithBrand[];
  economic: ProductWithBrand[];
}

export interface CardData {
  product: ProductWithBrand;
  primary_ingredient: Ingredient;
}

export interface IngredientBuilderResult {
  selected_ingredients: Ingredient[];
  matching_products: ProductWithBrand[];
}

export interface SearchResults {
  ingredients: IngredientWithEvidence[];
  faqs: FAQ[];
  products: ProductWithBrand[];
}

// ─── Affiliate types ───────────────────────────────────────────────────────────

export interface AffiliateLinks {
  official?: string;
  amazon: string;
  generic?: string;
}

// ─── Analytics types ──────────────────────────────────────────────────────────

export type BehaviourEventType =
  | 'page_view'
  | 'tier_view'
  | 'link_click'
  | 'compare_add'
  | 'builder_select'
  | 'section_expand';

export interface BehaviourEvent {
  type: BehaviourEventType;
  ingredient_id?: string;
  product_id?: string;
  tier?: ProductTier;
  section?: SourceBadge;
  link_type?: 'official' | 'amazon' | 'generic';
  timestamp: number;
  session_id: string;
}
