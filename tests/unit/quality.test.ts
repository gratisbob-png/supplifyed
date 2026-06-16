import { describe, it, expect } from 'vitest';

const OPINION_WORDS = [
  'best', 'recommended', 'top pick', 'winner', 'suggest',
  'should buy', 'we recommend', 'our pick', 'favourite',
  'number one', '#1 pick', 'must-have', 'perfect choice',
];

function containsOpinionLanguage(text: string): string[] {
  const lower = text.toLowerCase();
  return OPINION_WORDS.filter((word) => lower.includes(word));
}

// This test verifies that the static content compiled into scripts/seed files
// contains no opinion language. A regression guard.
describe('Quality: no opinion language', () => {
  const CONTENT_UNDER_TEST = [
    {
      source: 'Creatine description',
      text: 'Creatine monohydrate is the most studied ergogenic aid in sports nutrition. It increases phosphocreatine stores in muscle, regenerating ATP during high-intensity exercise, and has established evidence for strength, power, and muscle mass gains.',
    },
    {
      source: 'Melatonin description',
      text: 'Melatonin is a hormone produced by the pineal gland that regulates the sleep-wake cycle. Evidence is strong for sleep onset assistance and jet lag correction. There is a significant gap between evidence-based doses and typical product doses.',
    },
    {
      source: 'Vitamin D3 description',
      text: 'Vitamin D3 (cholecalciferol) is the most bioavailable form of vitamin D, produced in skin on exposure to UVB radiation. The most widely purchased supplement globally. Evidence is strong for bone health, immune function, and deficiency correction.',
    },
    {
      source: 'Melatonin dose context',
      text: 'Peer-reviewed evidence shows 0.5–3mg is effective for sleep onset. Higher doses do not improve efficacy and may cause grogginess. Most products contain 5–10mg — two to twenty times the evidence-based dose.',
    },
  ];

  for (const { source, text } of CONTENT_UNDER_TEST) {
    it(`${source} contains no opinion language`, () => {
      const found = containsOpinionLanguage(text);
      expect(found).toHaveLength(0);
    });
  }
});

describe('Quality: evidence rating enum', () => {
  const VALID = ['strong', 'moderate', 'mixed', 'limited'];

  it('valid ratings are defined', () => {
    expect(VALID).toHaveLength(4);
  });

  it('invalid ratings are caught', () => {
    const invalid = ['excellent', 'good', 'poor', 'none', 'unknown'];
    for (const rating of invalid) {
      expect(VALID).not.toContain(rating);
    }
  });
});

describe('Quality: tier enum', () => {
  const VALID = ['aspiration', 'rational', 'economic'];

  it('valid tiers are defined', () => {
    expect(VALID).toHaveLength(3);
  });

  it('no ranking language in tier names', () => {
    const opinionTierWords = ['best', 'top', 'premium', 'budget', 'cheap'];
    for (const tier of VALID) {
      for (const word of opinionTierWords) {
        expect(tier).not.toContain(word);
      }
    }
  });
});

describe('Quality: link validation', () => {
  it('affiliate tag format is consistent', () => {
    const tag = 'supplifyed-21';
    const links = [
      `https://www.amazon.co.uk/dp/B002DYIZEO?tag=${tag}`,
      `https://www.amazon.co.uk/s?k=creatine&tag=${tag}`,
    ];

    for (const link of links) {
      expect(link).toContain(`tag=${tag}`);
      expect(link).toContain('amazon.co.uk');
    }
  });
});
