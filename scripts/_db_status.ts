import { Surreal } from 'surrealdb';

async function main() {
  const db = new Surreal();
  await db.connect('http://localhost:8000');
  await db.signin({ username: 'root', password: 'root' });
  await db.use({ namespace: 'supplifyed', database: 'production' });

  const [[ingCount]]   = await db.query<{c:number}[][]>('SELECT count() AS c FROM ingredient GROUP ALL');
  const [[prodCount]]  = await db.query<{c:number}[][]>('SELECT count() AS c FROM product GROUP ALL');
  const [[evCount]]    = await db.query<{c:number}[][]>('SELECT count() AS c FROM evidence GROUP ALL');
  const [[faqCount]]   = await db.query<{c:number}[][]>('SELECT count() AS c FROM faq GROUP ALL');
  const [[noContains]] = await db.query<{c:number}[][]>(
    'SELECT count() AS c FROM product WHERE array::len(->contains->ingredient) = 0 GROUP ALL'
  );
  const [[noEvidence]] = await db.query<{c:number}[][]>(
    'SELECT count() AS c FROM ingredient WHERE array::len(->supported_by->evidence) = 0 GROUP ALL'
  );
  const [[noFaq]] = await db.query<{c:number}[][]>(
    'SELECT count() AS c FROM faq WHERE array::len(->answers_about->ingredient) = 0 GROUP ALL'
  );
  const [[noFundedBy]] = await db.query<{c:number}[][]>(
    'SELECT count() AS c FROM evidence WHERE funded_by = NONE OR funded_by = "" GROUP ALL'
  );

  console.log('=== DATABASE STATE ===');
  console.log('ingredients              :', ingCount?.c ?? 0);
  console.log('products                 :', prodCount?.c ?? 0);
  console.log('evidence nodes           :', evCount?.c ?? 0);
  console.log('faqs                     :', faqCount?.c ?? 0);
  console.log('products_missing_contains:', noContains?.c ?? 0);
  console.log('ingreds_missing_evidence :', noEvidence?.c ?? 0);
  console.log('faqs_missing_connection  :', noFaq?.c ?? 0);
  console.log('evidence_missing_funded  :', noFundedBy?.c ?? 0);

  const [ingNoProducts] = await db.query<{slug:string}[][]>(
    'SELECT slug FROM ingredient WHERE array::len(<-contains<-product) = 0 LIMIT 15'
  );
  if (ingNoProducts && ingNoProducts.length > 0) {
    console.log('\nIngredients with NO products (first 15):');
    for (const i of ingNoProducts) console.log(' -', i.slug);
  }

  await db.close();
}

main().catch((err) => { console.error(err); process.exit(1); });
