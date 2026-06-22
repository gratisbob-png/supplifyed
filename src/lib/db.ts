import { Surreal } from 'surrealdb';

let instance: Surreal | null = null;
let connectionPromise: Promise<Surreal> | null = null;

async function createConnection(): Promise<Surreal> {
  const db = new Surreal();
  await db.connect(process.env.SURREALDB_URL ?? 'http://localhost:8000');
  await db.signin({
    username: process.env.SURREALDB_USER ?? 'root',
    password: process.env.SURREALDB_PASS ?? 'root',
  });
  await db.use({
    namespace: process.env.SURREALDB_NS ?? 'supplifyed',
    database: process.env.SURREALDB_DB ?? 'production',
  });
  instance = db;
  return db;
}

export async function getDb(): Promise<Surreal> {
  if (instance) return instance;
  if (!connectionPromise) {
    connectionPromise = createConnection().catch((err) => {
      connectionPromise = null;
      instance = null;
      throw err;
    });
  }
  return connectionPromise;
}

export async function closeDb(): Promise<void> {
  if (instance) {
    const db = instance;
    instance = null;
    connectionPromise = null;
    await db.close();
  }
}
