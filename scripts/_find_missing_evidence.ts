import { Surreal } from 'surrealdb';

async function main() {
  const db = new Surreal();
  await db.connect('http://localhost:8000');
  await db.signin({ username: 'root', password: 'root' });
  await db.use({ namespace: 'supplifyed', database: 'production' });

  const [rows] = await db.query<{slug:string}[]>(
    'SELECT slug FROM ingredient WHERE array::len(->supported_by->evidence) = 0'
  );
  console.log('Ingredients missing evidence:');
  for (const r of rows) console.log(' -', r.slug);
  await db.close();
}

main().catch(console.error);
