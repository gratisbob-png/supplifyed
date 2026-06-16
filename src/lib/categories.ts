export interface CategoryConfig {
  slug: string;
  name: string;
  description: string;
  dbCategories: string[];
  primaryUseKeywords?: string[];
}

export const CATEGORIES: CategoryConfig[] = [
  {
    slug: 'performance',
    name: 'Performance',
    description: 'Compounds with evidence in physical performance, strength, endurance, and muscle physiology.',
    dbCategories: ['Performance', 'Amino Acids', 'Protein'],
  },
  {
    slug: 'sleep',
    name: 'Sleep',
    description: 'Compounds studied in the context of sleep quality, sleep onset, and circadian regulation.',
    dbCategories: ['Sleep'],
  },
  {
    slug: 'inflammation',
    name: 'Inflammation',
    description: 'Compounds with research into inflammatory markers, anti-inflammatory mechanisms, and related pathways.',
    dbCategories: ['Omega Oils'],
    primaryUseKeywords: ['anti-inflammatory', 'inflammation'],
  },
  {
    slug: 'gut-health',
    name: 'Gut Health',
    description: 'Probiotics, prebiotics, and compounds with evidence in gastrointestinal function and the microbiome.',
    dbCategories: ['Gut Health'],
  },
  {
    slug: 'longevity',
    name: 'Longevity',
    description: 'Compounds with research into cellular ageing, NAD+ pathways, mitochondrial function, and lifespan-related mechanisms.',
    dbCategories: ['Longevity'],
  },
  {
    slug: 'recovery',
    name: 'Recovery',
    description: 'Compounds studied in the context of muscle recovery, joint health, and post-exercise tissue repair.',
    dbCategories: ['Recovery'],
  },
  {
    slug: 'vitamins',
    name: 'Vitamins',
    description: 'Essential organic micronutrients with established roles in physiological function and deficiency-related conditions.',
    dbCategories: ['Vitamins'],
  },
  {
    slug: 'minerals',
    name: 'Minerals',
    description: 'Inorganic micronutrients with established roles in enzyme function, bone structure, and electrolyte balance.',
    dbCategories: ['Minerals'],
  },
  {
    slug: 'herbals',
    name: 'Herbals',
    description: 'Plant-derived compounds, standardised extracts, functional mushrooms, and adaptogens with peer-reviewed research.',
    dbCategories: ['Herbal'],
  },
];

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
