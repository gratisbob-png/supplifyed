import { Surreal } from 'surrealdb';

let db: Surreal | null = null;

export async function getDb(): Promise<Surreal> {
  if (db) {
    try {
      // Test the connection is still alive and authenticated
      await db.query('RETURN 1');
      return db;
    } catch {
      // Connection dead — reset and reconnect
      db = null;
    }
  }

  const instance = new Surreal();

  await instance.connect(
    process.env.SURREALDB_URL ?? 'http://localhost:8000'
  );

  await instance.signin({
    username: process.env.SURREALDB_USER ?? 'root',
    password: process.env.SURREALDB_PASS ?? 'root',
  });

  await instance.use({
    namespace: process.env.SURREALDB_NS ?? 'supplifyed',
    database: process.env.SURREALDB_DB ?? 'production',
  });

  db = instance;
  return db;
}

export async function tryGetDb(): Promise<Surreal | null> {
  try {
    return await getDb();
  } catch (err) {
    console.error('[db] connection failed:', err);
    return null;
  }
}
