import { Surreal } from 'surrealdb';

// Promise-based singleton: concurrent callers await the same in-flight connection
// rather than each racing to create their own unauthenticated instance.
let connectionPromise: Promise<Surreal> | null = null;

async function createConnection(): Promise<Surreal> {
  const url = process.env.SURREALDB_URL;
  const ns = process.env.SURREALDB_NS;
  const database = process.env.SURREALDB_DB;
  const username = process.env.SURREALDB_USER;
  const password = process.env.SURREALDB_PASS ?? '';

  if (!url || !ns || !database || !username) {
    throw new Error(
      'Missing SurrealDB environment variables. Check SURREALDB_URL, SURREALDB_NS, SURREALDB_DB, SURREALDB_USER'
    );
  }

  const instance = new Surreal();
  await instance.connect(url);
  await instance.signin({ username, password });
  await instance.use({ namespace: ns, database });
  return instance;
}

export async function getDb(): Promise<Surreal> {
  if (!connectionPromise) {
    connectionPromise = createConnection().catch((err) => {
      // Reset on failure so the next call retries from scratch.
      connectionPromise = null;
      throw err;
    });
  }
  return connectionPromise;
}

export async function closeDb(): Promise<void> {
  if (connectionPromise) {
    const instance = await connectionPromise.catch(() => null);
    connectionPromise = null;
    if (instance) await instance.close();
  }
}
