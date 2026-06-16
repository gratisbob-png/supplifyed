/**
 * Checks all affiliate links are live. Flags dead/redirected links.
 * Run: npm run links:check
 * Runs automatically on a schedule — see LINK_CHECK_INTERVAL_DAYS in .env
 */

import { Surreal, RecordId } from 'surrealdb';

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

async function checkUrl(url: string): Promise<'live' | 'dead' | 'redirected'> {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      redirect: 'manual',
      signal: AbortSignal.timeout(10_000),
      headers: {
        'User-Agent': 'Supplifyed-LinkChecker/1.0',
      },
    });

    if (res.status >= 200 && res.status < 300) return 'live';
    if (res.status >= 300 && res.status < 400) return 'redirected';
    return 'dead';
  } catch {
    return 'dead';
  }
}

async function checkLinks() {
  console.log('Connecting to SurrealDB...');
  const db = await connectDb();

  const [products] = await db.query<{ id: string; name: string; link_amazon: string; link_official?: string }[][]>(
    `SELECT id, name, link_amazon, link_official FROM product WHERE link_status = 'live'`
  );

  if (!products || products.length === 0) {
    console.log('No live products to check.');
    await db.close();
    return;
  }

  console.log(`Checking ${products.length} products...\n`);

  let live = 0;
  let dead = 0;
  let redirected = 0;

  for (const product of products) {
    const amazonStatus = await checkUrl(product.link_amazon);

    // Build a RecordId from the stored id string so UPDATE uses proper escaping
    const [table, ...idParts] = String(product.id).split(':');
    const rid = new RecordId(table, idParts.join(':'));

    if (amazonStatus !== 'live') {
      console.log(`  ✗ [${amazonStatus.toUpperCase()}] ${product.name}`);
      console.log(`    ${product.link_amazon}`);

      await db.query(
        `UPDATE $rid SET link_status = $status, last_verified = time::now()`,
        { rid, status: amazonStatus }
      );

      if (amazonStatus === 'dead') dead++;
      else redirected++;
    } else {
      live++;
      await db.query(
        `UPDATE $rid SET last_verified = time::now()`,
        { rid }
      );
    }
  }

  await db.close();

  console.log(`\n${live} live · ${redirected} redirected · ${dead} dead`);

  if (dead > 0) {
    console.error(`\n${dead} dead link(s) flagged. Review and update before next publish.`);
    process.exit(1);
  }
}

checkLinks().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
