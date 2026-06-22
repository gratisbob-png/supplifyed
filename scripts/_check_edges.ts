import { Surreal } from 'surrealdb';

async function main() {
  const db = new Surreal();
  await db.connect('http://localhost:8000');
  await db.signin({ username: 'root', password: 'root' });
  await db.use({ namespace: 'supplifyed', database: 'production' });

  const [edgeCount] = await db.query<{c:number}[]>('SELECT count() AS c FROM supported_by GROUP ALL');
  console.log('supported_by count:', JSON.stringify(edgeCount));

  const [sampleEdges] = await db.query<any[]>('SELECT id, in, out FROM supported_by LIMIT 3');
  console.log('sample edges:', JSON.stringify(sampleEdges, null, 2));

  // Check evidence table directly
  const [evSample] = await db.query<any[]>('SELECT id, ingredient_id FROM evidence LIMIT 3');
  console.log('evidence sample:', JSON.stringify(evSample, null, 2));

  // Check what tables exist as edges
  const [tables] = await db.query<any[]>('INFO FOR DB');
  const tableNames = Object.keys((tables as any)?.tables ?? {});
  console.log('tables:', tableNames.filter(t => t !== 'ingredient' && t !== 'evidence' && t !== 'product' && t !== 'faq'));

  await db.close();
}

main().catch(console.error);
