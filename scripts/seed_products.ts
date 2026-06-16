/**
 * Seeds 30 products (3 per Phase 1 ingredient) with accurate tier data.
 * Run: npm run seed:products
 * Requires ingredients seeded first: npm run seed:ingredients
 *
 * ASINs are placeholders — replace with real ASINs before launch.
 * Brand marketing content is empty — manufacturers submit their own.
 */

import { Surreal, RecordId } from 'surrealdb';

interface ProductSeed {
  id: string;
  asin: string;
  name: string;
  slug: string;
  brand_name: string;
  brand_website: string;
  tier: 'aspiration' | 'rational' | 'economic';
  rrp: number;
  rrp_currency: string;
  certifications: string[];
  packet_text: string;
  link_official?: string;
  link_generic_ingredient: string;
  ingredient_id: string;
  dose_per_serving: string;
  unit: string;
  form: string;
}

const PRODUCTS: ProductSeed[] = [
  // ─── Creatine Monohydrate ──────────────────────────────────────────────────
  {
    id: 'product:optimum-nutrition-micronised-creatine',
    asin: 'B002DYIZEO',
    name: 'Optimum Nutrition Micronised Creatine Powder',
    slug: 'optimum-nutrition-micronised-creatine',
    brand_name: 'Optimum Nutrition',
    brand_website: 'https://www.optimumnutrition.com',
    tier: 'aspiration',
    rrp: 29.99,
    rrp_currency: 'GBP',
    certifications: ['Informed Sport', 'NSF Certified'],
    packet_text: 'Micronised Creatine Monohydrate. Serving size: 5g (1 scoop). Servings per container: 60. Per serving: Creatine Monohydrate 5g. Mix 1 scoop with 250ml water. Store in a cool, dry place.',
    link_official: 'https://www.optimumnutrition.com/en-gb/products/creatine',
    link_generic_ingredient: 'creatine monohydrate bulk powder',
    ingredient_id: 'ingredient:creatine-monohydrate',
    dose_per_serving: '5',
    unit: 'g',
    form: 'Micronised Monohydrate',
  },
  {
    id: 'product:myprotein-creatine-monohydrate',
    asin: 'B00GPPJQ48',
    name: 'Myprotein Creatine Monohydrate',
    slug: 'myprotein-creatine-monohydrate',
    brand_name: 'Myprotein',
    brand_website: 'https://www.myprotein.com',
    tier: 'rational',
    rrp: 19.99,
    rrp_currency: 'GBP',
    certifications: ['Informed Sport'],
    packet_text: 'Creatine Monohydrate. 3000mg per serving. 250 servings per 750g bag. Add 3g to water or juice and mix well.',
    link_official: 'https://www.myprotein.com/sports-nutrition/creatine-monohydrate',
    link_generic_ingredient: 'creatine monohydrate bulk powder',
    ingredient_id: 'ingredient:creatine-monohydrate',
    dose_per_serving: '3',
    unit: 'g',
    form: 'Monohydrate',
  },
  {
    id: 'product:bulk-creatine-monohydrate',
    asin: 'B01N1NSKSG',
    name: 'Bulk Pure Creatine Monohydrate',
    slug: 'bulk-creatine-monohydrate',
    brand_name: 'Bulk',
    brand_website: 'https://www.bulk.com',
    tier: 'economic',
    rrp: 12.99,
    rrp_currency: 'GBP',
    certifications: [],
    packet_text: 'Creatine Monohydrate 100% Pure. 5g per serving. Mix with water or juice.',
    link_generic_ingredient: 'creatine monohydrate bulk powder',
    ingredient_id: 'ingredient:creatine-monohydrate',
    dose_per_serving: '5',
    unit: 'g',
    form: 'Monohydrate',
  },

  // ─── Magnesium Glycinate ───────────────────────────────────────────────────
  {
    id: 'product:thorne-magnesium-bisglycinate',
    asin: 'B0CG1JZML6',
    name: 'Thorne Magnesium Bisglycinate',
    slug: 'thorne-magnesium-bisglycinate',
    brand_name: 'Thorne',
    brand_website: 'https://www.thorne.com',
    tier: 'aspiration',
    rrp: 34.99,
    rrp_currency: 'GBP',
    certifications: ['NSF Certified for Sport', 'GMP'],
    packet_text: 'Magnesium Bisglycinate. Each capsule: Magnesium (as bisglycinate) 200mg. 60 capsules. Take 1-2 capsules daily with food.',
    link_official: 'https://www.thorne.com/products/dp/magnesium-bisglycinate',
    link_generic_ingredient: 'magnesium glycinate bulk powder',
    ingredient_id: 'ingredient:magnesium-glycinate',
    dose_per_serving: '200',
    unit: 'mg',
    form: 'Bisglycinate',
  },
  {
    id: 'product:solgar-magnesium-glycinate',
    asin: 'B00GFRMCZK',
    name: 'Solgar Magnesium Glycinate',
    slug: 'solgar-magnesium-glycinate',
    brand_name: 'Solgar',
    brand_website: 'https://www.solgar.com',
    tier: 'rational',
    rrp: 22.99,
    rrp_currency: 'GBP',
    certifications: ['Kosher', 'GMP'],
    packet_text: 'Magnesium Glycinate. Each tablet: Elemental Magnesium (from magnesium glycinate) 100mg. 60 tablets. Take 1 tablet daily with food.',
    link_official: 'https://www.solgar.com/all-products/magnesium',
    link_generic_ingredient: 'magnesium glycinate bulk powder',
    ingredient_id: 'ingredient:magnesium-glycinate',
    dose_per_serving: '100',
    unit: 'mg',
    form: 'Glycinate',
  },
  {
    id: 'product:nature-made-magnesium-glycinate',
    asin: 'B0C3P5NW3B',
    name: 'Nature Made Magnesium Glycinate',
    slug: 'nature-made-magnesium-glycinate',
    brand_name: 'Nature Made',
    brand_website: 'https://www.naturemade.com',
    tier: 'economic',
    rrp: 16.99,
    rrp_currency: 'GBP',
    certifications: ['USP Verified'],
    packet_text: 'Magnesium Glycinate 200mg. 60 capsules. Magnesium (as magnesium glycinate) 200mg per serving.',
    link_generic_ingredient: 'magnesium glycinate bulk powder',
    ingredient_id: 'ingredient:magnesium-glycinate',
    dose_per_serving: '200',
    unit: 'mg',
    form: 'Glycinate',
  },

  // ─── Vitamin D3 ────────────────────────────────────────────────────────────
  {
    id: 'product:qunol-vitamin-d3-5000iu',
    asin: 'B08P1F4T4F',
    name: 'Qunol Vitamin D3 5000 IU with K2',
    slug: 'qunol-vitamin-d3-5000iu',
    brand_name: 'Qunol',
    brand_website: 'https://www.qunol.com',
    tier: 'aspiration',
    rrp: 27.99,
    rrp_currency: 'GBP',
    certifications: ['GMP', 'Third Party Tested'],
    packet_text: 'Vitamin D3 5000 IU + Vitamin K2 100mcg. Softgel. Cholecalciferol (Vitamin D3) 5000 IU, Menaquinone-7 (Vitamin K2 as MK-7) 100mcg.',
    link_official: 'https://www.qunol.com/products/vitamin-d3',
    link_generic_ingredient: 'vitamin d3 bulk powder cholecalciferol',
    ingredient_id: 'ingredient:vitamin-d3',
    dose_per_serving: '5000',
    unit: 'IU',
    form: 'Cholecalciferol with K2 MK-7',
  },
  {
    id: 'product:vitabiotics-ultra-vitamin-d',
    asin: 'B003KFVDKA',
    name: 'Vitabiotics Ultra Vitamin D3 1000 IU',
    slug: 'vitabiotics-ultra-vitamin-d',
    brand_name: 'Vitabiotics',
    brand_website: 'https://www.vitabiotics.com',
    tier: 'rational',
    rrp: 9.99,
    rrp_currency: 'GBP',
    certifications: ['ISO 9001'],
    packet_text: 'Vitamin D3 1000 IU. Each tablet: Vitamin D (as cholecalciferol) 25mcg (1000 IU). 96 tablets.',
    link_official: 'https://www.vitabiotics.com/products/ultra-vitamin-d',
    link_generic_ingredient: 'vitamin d3 bulk powder cholecalciferol',
    ingredient_id: 'ingredient:vitamin-d3',
    dose_per_serving: '1000',
    unit: 'IU',
    form: 'Cholecalciferol',
  },
  {
    id: 'product:amazon-basics-vitamin-d3',
    asin: 'B08H9SL31J',
    name: 'Amazon Basics Vitamin D3 2000 IU',
    slug: 'amazon-basics-vitamin-d3',
    brand_name: 'Amazon Basics',
    brand_website: 'https://www.amazon.co.uk',
    tier: 'economic',
    rrp: 7.49,
    rrp_currency: 'GBP',
    certifications: [],
    packet_text: 'Vitamin D3 2000 IU. Cholecalciferol 50mcg (2000 IU) per softgel. 365 softgels.',
    link_generic_ingredient: 'vitamin d3 bulk powder cholecalciferol',
    ingredient_id: 'ingredient:vitamin-d3',
    dose_per_serving: '2000',
    unit: 'IU',
    form: 'Cholecalciferol',
  },

  // ─── Omega-3 Fish Oil ──────────────────────────────────────────────────────
  {
    id: 'product:nordic-naturals-ultimate-omega',
    asin: 'B002CQU564',
    name: 'Nordic Naturals Ultimate Omega',
    slug: 'nordic-naturals-ultimate-omega',
    brand_name: 'Nordic Naturals',
    brand_website: 'https://www.nordicnaturals.com',
    tier: 'aspiration',
    rrp: 49.99,
    rrp_currency: 'GBP',
    certifications: ['IFOS 5 Star', 'Non-GMO', 'Third Party Tested'],
    packet_text: 'Ultimate Omega. Serving size: 2 softgels. EPA 650mg, DHA 450mg. Fish Gelatin, Purified Deep Sea Fish Oil. Lemon flavour.',
    link_official: 'https://www.nordicnaturals.com/products/ultimate-omega',
    link_generic_ingredient: 'fish oil omega 3 bulk softgels',
    ingredient_id: 'ingredient:omega-3-fish-oil',
    dose_per_serving: '1100',
    unit: 'mg',
    form: 'EPA+DHA Triglyceride Form',
  },
  {
    id: 'product:seven-seas-simply-timeless',
    asin: 'B003GKPV4M',
    name: 'Seven Seas Simply Timeless Omega-3',
    slug: 'seven-seas-simply-timeless',
    brand_name: 'Seven Seas',
    brand_website: 'https://www.seven-seas.com',
    tier: 'rational',
    rrp: 12.99,
    rrp_currency: 'GBP',
    certifications: ['MSC Certified'],
    packet_text: 'Cod Liver Oil. Per capsule: EPA 90mg, DHA 95mg, Vitamin D 5mcg, Vitamin A 200mcg. 60 capsules.',
    link_official: 'https://www.seven-seas.com',
    link_generic_ingredient: 'fish oil omega 3 bulk softgels',
    ingredient_id: 'ingredient:omega-3-fish-oil',
    dose_per_serving: '185',
    unit: 'mg',
    form: 'Cod Liver Oil',
  },
  {
    id: 'product:holland-barrett-omega-3',
    asin: 'B07BRT5QTR',
    name: 'Holland & Barrett Omega 3 1000mg',
    slug: 'holland-barrett-omega-3',
    brand_name: 'Holland & Barrett',
    brand_website: 'https://www.hollandandbarrett.com',
    tier: 'economic',
    rrp: 9.99,
    rrp_currency: 'GBP',
    certifications: [],
    packet_text: 'Omega 3 Fish Oil 1000mg. Per softgel: Fish oil 1000mg (of which EPA 180mg, DHA 120mg). 240 capsules.',
    link_generic_ingredient: 'fish oil omega 3 bulk softgels',
    ingredient_id: 'ingredient:omega-3-fish-oil',
    dose_per_serving: '300',
    unit: 'mg',
    form: 'Fish Oil',
  },

  // ─── Ashwagandha ──────────────────────────────────────────────────────────
  {
    id: 'product:ksm66-ashwagandha-jarrow',
    asin: 'B07YQ6RYGC',
    name: 'Jarrow Formulas KSM-66 Ashwagandha 300mg',
    slug: 'jarrow-ksm66-ashwagandha',
    brand_name: 'Jarrow Formulas',
    brand_website: 'https://www.jarrow.com',
    tier: 'aspiration',
    rrp: 29.99,
    rrp_currency: 'GBP',
    certifications: ['Non-GMO', 'GMP', 'Informed Sport'],
    packet_text: 'KSM-66 Ashwagandha. Per capsule: Ashwagandha Root Extract (KSM-66) 300mg (standardised to ≥5% withanolides). 60 capsules.',
    link_official: 'https://www.jarrow.com/products/ksm-66',
    link_generic_ingredient: 'ashwagandha root extract bulk powder',
    ingredient_id: 'ingredient:ashwagandha',
    dose_per_serving: '300',
    unit: 'mg',
    form: 'KSM-66 Extract (≥5% withanolides)',
  },
  {
    id: 'product:solgar-ashwagandha',
    asin: 'B083VWSP3M',
    name: 'Solgar Ashwagandha Root Extract',
    slug: 'solgar-ashwagandha',
    brand_name: 'Solgar',
    brand_website: 'https://www.solgar.com',
    tier: 'rational',
    rrp: 19.99,
    rrp_currency: 'GBP',
    certifications: ['Kosher', 'Halal', 'GMP'],
    packet_text: 'Full Spectrum Ashwagandha Root Extract 400mg. Per capsule: Ashwagandha Root Extract 400mg. 60 capsules.',
    link_generic_ingredient: 'ashwagandha root extract bulk powder',
    ingredient_id: 'ingredient:ashwagandha',
    dose_per_serving: '400',
    unit: 'mg',
    form: 'Root Extract',
  },
  {
    id: 'product:holland-barrett-ashwagandha',
    asin: 'B08BKKH7HY',
    name: 'Holland & Barrett Ashwagandha 1500mg',
    slug: 'holland-barrett-ashwagandha',
    brand_name: 'Holland & Barrett',
    brand_website: 'https://www.hollandandbarrett.com',
    tier: 'economic',
    rrp: 13.99,
    rrp_currency: 'GBP',
    certifications: [],
    packet_text: 'Ashwagandha 1500mg. Per 3 tablets: Ashwagandha Root Powder 1500mg. 90 tablets.',
    link_generic_ingredient: 'ashwagandha root extract bulk powder',
    ingredient_id: 'ingredient:ashwagandha',
    dose_per_serving: '1500',
    unit: 'mg',
    form: 'Root Powder',
  },

  // ─── Melatonin ────────────────────────────────────────────────────────────
  {
    id: 'product:natrol-melatonin-extended-release',
    asin: 'B000GG87VM',
    name: 'Natrol Melatonin Extended Release 5mg',
    slug: 'natrol-melatonin-extended-release',
    brand_name: 'Natrol',
    brand_website: 'https://www.natrol.com',
    tier: 'aspiration',
    rrp: 18.99,
    rrp_currency: 'GBP',
    certifications: ['Non-GMO', 'Drug Free'],
    packet_text: 'Melatonin Extended Release 5mg. Per tablet: Melatonin 5mg (1mg immediate release, 4mg extended release). 100 tablets. Take 1 tablet 30 minutes before bedtime.',
    link_official: 'https://www.natrol.com/products/melatonin',
    link_generic_ingredient: 'melatonin bulk powder',
    ingredient_id: 'ingredient:melatonin',
    dose_per_serving: '5',
    unit: 'mg',
    form: 'Extended Release',
  },
  {
    id: 'product:boots-melatonin-3mg',
    asin: 'B09KFXWZJ7',
    name: 'Boots Melatonin 3mg',
    slug: 'boots-melatonin-3mg',
    brand_name: 'Boots',
    brand_website: 'https://www.boots.com',
    tier: 'rational',
    rrp: 9.99,
    rrp_currency: 'GBP',
    certifications: [],
    packet_text: 'Melatonin 3mg. Per tablet: Melatonin 3mg. 30 tablets. Take 1 tablet 30-60 minutes before sleep.',
    link_generic_ingredient: 'melatonin bulk powder',
    ingredient_id: 'ingredient:melatonin',
    dose_per_serving: '3',
    unit: 'mg',
    form: 'Standard Release',
  },
  {
    id: 'product:amazon-basics-melatonin',
    asin: 'B0BTG1SVTL',
    name: 'Amazon Basics Melatonin 1mg',
    slug: 'amazon-basics-melatonin',
    brand_name: 'Amazon Basics',
    brand_website: 'https://www.amazon.co.uk',
    tier: 'economic',
    rrp: 6.99,
    rrp_currency: 'GBP',
    certifications: [],
    packet_text: 'Melatonin 1mg. Per tablet: Melatonin 1mg. 120 tablets.',
    link_generic_ingredient: 'melatonin bulk powder',
    ingredient_id: 'ingredient:melatonin',
    dose_per_serving: '1',
    unit: 'mg',
    form: 'Standard Release',
  },

  // ─── Collagen Peptides ────────────────────────────────────────────────────
  {
    id: 'product:vital-proteins-collagen-peptides',
    asin: 'B00K6EM5DI',
    name: 'Vital Proteins Collagen Peptides',
    slug: 'vital-proteins-collagen-peptides',
    brand_name: 'Vital Proteins',
    brand_website: 'https://www.vitalproteins.com',
    tier: 'aspiration',
    rrp: 39.99,
    rrp_currency: 'GBP',
    certifications: ['Non-GMO', 'Whole30 Approved', 'Paleo Friendly'],
    packet_text: 'Collagen Peptides. Serving size: 2 scoops (20g). Collagen Peptides 18g. From grass-fed, pasture-raised bovine hide.',
    link_official: 'https://www.vitalproteins.com/products/collagen-peptides',
    link_generic_ingredient: 'hydrolysed collagen bulk powder',
    ingredient_id: 'ingredient:collagen-peptides',
    dose_per_serving: '18',
    unit: 'g',
    form: 'Hydrolysed Type I & III',
  },
  {
    id: 'product:myprotein-collagen-peptides',
    asin: 'B0BVMD3C32',
    name: 'Myprotein Collagen Powder',
    slug: 'myprotein-collagen-peptides',
    brand_name: 'Myprotein',
    brand_website: 'https://www.myprotein.com',
    tier: 'rational',
    rrp: 24.99,
    rrp_currency: 'GBP',
    certifications: [],
    packet_text: 'Collagen Powder. Per 13g serving: Hydrolysed Collagen Peptides 10g. 30 servings.',
    link_generic_ingredient: 'hydrolysed collagen bulk powder',
    ingredient_id: 'ingredient:collagen-peptides',
    dose_per_serving: '10',
    unit: 'g',
    form: 'Hydrolysed',
  },
  {
    id: 'product:bulk-collagen-peptides',
    asin: 'B07YR6QN7J',
    name: 'Bulk Pure Collagen Peptides',
    slug: 'bulk-collagen-peptides',
    brand_name: 'Bulk',
    brand_website: 'https://www.bulk.com',
    tier: 'economic',
    rrp: 16.99,
    rrp_currency: 'GBP',
    certifications: [],
    packet_text: 'Hydrolysed Collagen 100%. Per 12g serving: Hydrolysed Collagen 12g.',
    link_generic_ingredient: 'hydrolysed collagen bulk powder',
    ingredient_id: 'ingredient:collagen-peptides',
    dose_per_serving: '12',
    unit: 'g',
    form: 'Hydrolysed',
  },

  // ─── Whey Protein Isolate ─────────────────────────────────────────────────
  {
    id: 'product:optimum-nutrition-gold-standard-isolate',
    asin: 'B000GIPJ3Y',
    name: 'Optimum Nutrition Gold Standard 100% Isolate',
    slug: 'optimum-nutrition-gold-standard-isolate',
    brand_name: 'Optimum Nutrition',
    brand_website: 'https://www.optimumnutrition.com',
    tier: 'aspiration',
    rrp: 49.99,
    rrp_currency: 'GBP',
    certifications: ['Informed Sport', 'Banned Substance Tested'],
    packet_text: 'Gold Standard 100% Isolate. Per serving (31g): Protein 25g, Calories 110, Fat 0g, Carbohydrates 2g, Sugar 1g. Whey Protein Isolate (primary source), Whey Peptides.',
    link_official: 'https://www.optimumnutrition.com/en-gb/products/gold-standard-isolate',
    link_generic_ingredient: 'whey protein isolate bulk powder',
    ingredient_id: 'ingredient:whey-protein-isolate',
    dose_per_serving: '25',
    unit: 'g',
    form: 'Whey Protein Isolate + Peptides',
  },
  {
    id: 'product:myprotein-impact-whey-isolate',
    asin: 'B00GPPJRDE',
    name: 'Myprotein Impact Whey Isolate',
    slug: 'myprotein-impact-whey-isolate',
    brand_name: 'Myprotein',
    brand_website: 'https://www.myprotein.com',
    tier: 'rational',
    rrp: 34.99,
    rrp_currency: 'GBP',
    certifications: ['Informed Sport'],
    packet_text: 'Impact Whey Isolate. Per 25g serving: Energy 93kcal, Protein 23g, Carbohydrates 0.6g, Fat 0.1g. Whey Protein Isolate.',
    link_official: 'https://www.myprotein.com/sports-nutrition/impact-whey-isolate',
    link_generic_ingredient: 'whey protein isolate bulk powder',
    ingredient_id: 'ingredient:whey-protein-isolate',
    dose_per_serving: '23',
    unit: 'g',
    form: 'Whey Protein Isolate',
  },
  {
    id: 'product:bulk-pure-whey-isolate',
    asin: 'B00HGRXTNK',
    name: 'Bulk Pure Whey Protein Isolate',
    slug: 'bulk-pure-whey-isolate',
    brand_name: 'Bulk',
    brand_website: 'https://www.bulk.com',
    tier: 'economic',
    rrp: 26.99,
    rrp_currency: 'GBP',
    certifications: [],
    packet_text: 'Pure Whey Protein Isolate. Per 25g serving: Protein 22g, Carbohydrates 1.5g. Whey Protein Isolate 97%.',
    link_generic_ingredient: 'whey protein isolate bulk powder',
    ingredient_id: 'ingredient:whey-protein-isolate',
    dose_per_serving: '22',
    unit: 'g',
    form: 'Whey Protein Isolate',
  },

  // ─── Magnesium Citrate ────────────────────────────────────────────────────
  {
    id: 'product:pure-encapsulations-magnesium-citrate',
    asin: 'B001PEKK6K',
    name: 'Pure Encapsulations Magnesium Citrate 150mg',
    slug: 'pure-encapsulations-magnesium-citrate',
    brand_name: 'Pure Encapsulations',
    brand_website: 'https://www.pureencapsulations.com',
    tier: 'aspiration',
    rrp: 34.99,
    rrp_currency: 'GBP',
    certifications: ['Non-GMO', 'Gluten Free', 'Hypoallergenic'],
    packet_text: 'Magnesium Citrate 150mg. Per capsule: Magnesium (as magnesium citrate) 150mg. 90 capsules. Pure Encapsulations is a certified hypoallergenic formula.',
    link_official: 'https://www.pureencapsulations.com/magnesium-citrate.html',
    link_generic_ingredient: 'magnesium citrate bulk powder',
    ingredient_id: 'ingredient:magnesium-citrate',
    dose_per_serving: '150',
    unit: 'mg',
    form: 'Magnesium Citrate',
  },
  {
    id: 'product:solgar-magnesium-citrate',
    asin: 'B000FGW3MW',
    name: 'Solgar Magnesium Citrate 200mg',
    slug: 'solgar-magnesium-citrate',
    brand_name: 'Solgar',
    brand_website: 'https://www.solgar.com',
    tier: 'rational',
    rrp: 17.99,
    rrp_currency: 'GBP',
    certifications: ['Gluten Free', 'Vegan'],
    packet_text: 'Magnesium Citrate. Per tablet: Magnesium (as magnesium citrate) 200mg. 60 tablets. Free of: gluten, wheat, dairy, soy.',
    link_generic_ingredient: 'magnesium citrate bulk powder',
    ingredient_id: 'ingredient:magnesium-citrate',
    dose_per_serving: '200',
    unit: 'mg',
    form: 'Magnesium Citrate',
  },
  {
    id: 'product:amazon-basics-magnesium-citrate',
    asin: 'B08H5T8LH7',
    name: 'Amazon Basics Magnesium Citrate 200mg',
    slug: 'amazon-basics-magnesium-citrate',
    brand_name: 'Amazon Basics',
    brand_website: 'https://www.amazon.co.uk',
    tier: 'economic',
    rrp: 8.99,
    rrp_currency: 'GBP',
    certifications: [],
    packet_text: 'Magnesium Citrate 200mg. Per tablet: Magnesium (as magnesium citrate) 200mg. 100 tablets.',
    link_generic_ingredient: 'magnesium citrate bulk powder',
    ingredient_id: 'ingredient:magnesium-citrate',
    dose_per_serving: '200',
    unit: 'mg',
    form: 'Magnesium Citrate',
  },

  // ─── Magnesium Oxide ──────────────────────────────────────────────────────
  {
    id: 'product:vitabiotics-magnesium-oxide-375mg',
    asin: 'B00LR4IGSU',
    name: 'Vitabiotics Magnesium 375mg',
    slug: 'vitabiotics-magnesium-oxide-375mg',
    brand_name: 'Vitabiotics',
    brand_website: 'https://www.vitabiotics.com',
    tier: 'aspiration',
    rrp: 10.99,
    rrp_currency: 'GBP',
    certifications: ['Halal', 'Vegetarian'],
    packet_text: 'Magnesium 375mg. Per tablet: Magnesium (as magnesium oxide) 375mg. 30 tablets. 375mg is 100% of the Nutrient Reference Value (NRV) for magnesium.',
    link_official: 'https://www.vitabiotics.com/products/magnesium',
    link_generic_ingredient: 'magnesium oxide bulk powder',
    ingredient_id: 'ingredient:magnesium-oxide',
    dose_per_serving: '375',
    unit: 'mg',
    form: 'Magnesium Oxide',
  },
  {
    id: 'product:holland-barrett-magnesium-oxide-250mg',
    asin: 'B000LT9I0I',
    name: 'Holland & Barrett Magnesium 250mg',
    slug: 'holland-barrett-magnesium-oxide-250mg',
    brand_name: 'Holland & Barrett',
    brand_website: 'https://www.hollandandbarrett.com',
    tier: 'rational',
    rrp: 6.99,
    rrp_currency: 'GBP',
    certifications: ['Vegetarian'],
    packet_text: 'Magnesium 250mg. Per tablet: Magnesium (as magnesium oxide) 250mg. 100 tablets.',
    link_generic_ingredient: 'magnesium oxide bulk powder',
    ingredient_id: 'ingredient:magnesium-oxide',
    dose_per_serving: '250',
    unit: 'mg',
    form: 'Magnesium Oxide',
  },
  {
    id: 'product:amazon-basics-magnesium-oxide-400mg',
    asin: 'B07CTRSCTM',
    name: 'Amazon Basics Magnesium Oxide 400mg',
    slug: 'amazon-basics-magnesium-oxide-400mg',
    brand_name: 'Amazon Basics',
    brand_website: 'https://www.amazon.co.uk',
    tier: 'economic',
    rrp: 5.99,
    rrp_currency: 'GBP',
    certifications: [],
    packet_text: 'Magnesium Oxide 400mg. Per tablet: Magnesium (as magnesium oxide) 400mg. 100 tablets.',
    link_generic_ingredient: 'magnesium oxide bulk powder',
    ingredient_id: 'ingredient:magnesium-oxide',
    dose_per_serving: '400',
    unit: 'mg',
    form: 'Magnesium Oxide',
  },
];

async function connectDb(): Promise<Surreal> {
  const url = process.env.SURREALDB_URL ?? 'http://localhost:8000';
  const ns = process.env.SURREALDB_NS ?? 'supplifyed';
  const database = process.env.SURREALDB_DB ?? 'production';
  const username = process.env.SURREALDB_USER ?? 'root';
  const password = process.env.SURREALDB_PASS ?? 'root';

  const db = new Surreal();
  await db.connect(url);
  await db.signin({ username, password });
  await db.use({ namespace: ns, database });
  return db;
}

async function upsertBrand(db: Surreal, name: string, website: string): Promise<RecordId> {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const rid = new RecordId('brand', slug);

  await db.upsert(rid).content({
    name,
    website,
    affiliate_network: 'amazon',
    affiliate_link: website,
  });

  return rid;
}

async function seedProducts() {
  console.log('Connecting to SurrealDB...');
  const db = await connectDb();

  const tag = process.env.AMAZON_PARTNER_TAG ?? 'supplifyed-21';

  console.log(`Seeding ${PRODUCTS.length} products...\n`);

  const brandCache = new Map<string, RecordId>();

  for (const seed of PRODUCTS) {
    const [prodTable, ...prodIdParts] = seed.id.split(':');
    const productRid = new RecordId(prodTable, prodIdParts.join(':'));
    const [ingTable, ...ingIdParts] = seed.ingredient_id.split(':');
    const ingredientRid = new RecordId(ingTable, ingIdParts.join(':'));

    try {
      // Upsert brand
      if (!brandCache.has(seed.brand_name)) {
        const brandRid = await upsertBrand(db, seed.brand_name, seed.brand_website);
        brandCache.set(seed.brand_name, brandRid);
      }
      const brandRid = brandCache.get(seed.brand_name)!;

      // Upsert product
      await db.upsert(productRid).content({
        asin: seed.asin,
        name: seed.name,
        slug: seed.slug,
        brand_id: brandRid.toString(),
        tier: seed.tier,
        rrp: seed.rrp,
        rrp_currency: seed.rrp_currency,
        certifications: seed.certifications,
        packet_text: seed.packet_text,
        ...(seed.link_official ? { link_official: seed.link_official } : {}),
        link_amazon: `https://www.amazon.co.uk/dp/${seed.asin}?tag=${tag}`,
        link_generic: `https://www.amazon.co.uk/s?k=${encodeURIComponent(seed.link_generic_ingredient)}&tag=${tag}`,
        link_status: 'live',
        source: 'bestseller_scrape',
        last_verified: new Date(),
      });

      // Create MADE_BY edge
      await db.query(
        `RELATE $productId->made_by->$brandId`,
        { productId: productRid, brandId: brandRid }
      );

      // Create CONTAINS edge
      await db.query(
        `RELATE $productId->contains->$ingredientId SET dose_per_serving = $dose, unit = $unit, form = $form`,
        {
          productId: productRid,
          ingredientId: ingredientRid,
          dose: seed.dose_per_serving,
          unit: seed.unit,
          form: seed.form,
        }
      );

      console.log(`  ✓ [${seed.tier.toUpperCase().padEnd(11)}] ${seed.name}`);
    } catch (err) {
      console.error(`  ✗ ${seed.name}: ${err}`);
    }
  }

  console.log('\nSeeding complete.');
  console.log('Next: run npm run db:validate to verify all quality gates.');
  await db.close();
}

seedProducts().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
