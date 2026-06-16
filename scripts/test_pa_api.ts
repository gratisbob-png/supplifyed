/**
 * Tests the Amazon PA API v5 connection.
 * Looks up three real ASINs from the seeded product set and prints returned data.
 * Run: npm run test:pa-api
 *
 * PREREQUISITES — all must be set in .env.local:
 *   AMAZON_ACCESS_KEY   — from Amazon PA API application
 *   AMAZON_SECRET_KEY   — from Amazon PA API application
 *   AMAZON_PARTNER_TAG  — from Amazon Associates (e.g. supplifyed-21)
 *
 * Amazon PA API access requires an approved Amazon Associates account
 * with at least 3 qualifying sales in the past 180 days, or a live
 * site accepted during application review.
 * Apply at: https://affiliate-program.amazon.co.uk → Product Advertising API
 */

import { loadConfig, getItems } from '../src/lib/pa_api';

// One ASIN per product tier from the creatine stack — real, known ASINs
const TEST_ASINS = [
  'B002DYIZEO', // Optimum Nutrition Micronised Creatine (aspiration)
  'B00GPPJQ48', // Myprotein Creatine Monohydrate (rational)
  'B01N1NSKSG', // Bulk Pure Creatine Monohydrate (economic)
];

async function testPaApi() {
  console.log('Amazon PA API v5 — Connection Test\n');

  const config = loadConfig();

  if (!config) {
    console.log('⚠  PA API credentials not configured.\n');
    console.log('To activate PA API access, add the following to .env.local:\n');
    console.log('  AMAZON_ACCESS_KEY=<your access key>');
    console.log('  AMAZON_SECRET_KEY=<your secret key>');
    console.log('  AMAZON_PARTNER_TAG=<your partner tag>\n');
    console.log('Steps to obtain credentials:');
    console.log('  1. Sign in to Amazon Associates: https://affiliate-program.amazon.co.uk');
    console.log('  2. Apply for PA API access (requires approved Associates account)');
    console.log('  3. Access keys are available in the PA API console once approved');
    console.log('  4. Partner tag is your Associates tracking ID (e.g. supplifyed-21)\n');
    console.log('PA API access is blocked on Amazon Associates approval.');
    console.log('This is a prerequisite — the rest of Phase 3 can proceed without it.');
    process.exit(0);
  }

  console.log(`Partner tag : ${config.partnerTag}`);
  console.log(`Marketplace : ${config.host.replace('webservices.', 'www.')}`);
  console.log(`Region      : ${config.region}`);
  console.log(`ASINs tested: ${TEST_ASINS.join(', ')}\n`);

  console.log('Calling GetItems...\n');

  const { items, errors } = await getItems(TEST_ASINS, config);

  if (errors.length > 0) {
    console.error('API returned errors:');
    for (const e of errors) {
      console.error(`  [${e.code}] ${e.message}`);
    }
    if (items.length === 0) {
      process.exit(1);
    }
  }

  let passed = 0;
  let failed = 0;

  for (const asin of TEST_ASINS) {
    const item = items.find((i) => i.asin === asin);

    if (!item) {
      console.log(`  ✗ ${asin} — not returned`);
      failed++;
      continue;
    }

    const priceStr = item.price != null
      ? `${item.currency ?? '?'} ${item.price.toFixed(2)}`
      : 'no price';

    console.log(`  ✓ ${item.asin}`);
    console.log(`    Title     : ${item.title}`);
    console.log(`    Price     : ${priceStr}`);
    console.log(`    Available : ${item.availability ?? 'unknown'}`);
    console.log(`    Image     : ${item.imageUrl ? '✓ present' : '✗ missing'}`);
    console.log(`    URL       : ${item.detailPageUrl.slice(0, 60)}...`);
    console.log();
    passed++;
  }

  console.log(`${passed}/${TEST_ASINS.length} ASINs returned successfully`);

  if (failed > 0) {
    console.error(`\n${failed} ASIN(s) missing from response.`);
    process.exit(1);
  }

  console.log('\nPA API connection verified. Ready for automated product enrichment (Phase 5).');
}

testPaApi().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
