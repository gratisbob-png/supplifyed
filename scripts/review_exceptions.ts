/**
 * Daily exception queue review CLI.
 * Lists unresolved exceptions grouped by severity.
 * Run: npm run review:exceptions
 * Run: npm run review:exceptions -- --resolve <exception-id>
 * Run: npm run review:exceptions -- --all (include resolved)
 */

import { Surreal } from 'surrealdb';

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

interface ExceptionRow {
  id: string;
  type: string;
  severity: string;
  node_id?: string;
  description: string;
  flagged_at: string;
  resolved: boolean;
  context?: string;
}

const SEVERITY_ICON: Record<string, string> = {
  critical: '🔴',
  warning:  '🟡',
  info:     '⚪',
};

async function listExceptions(db: Surreal, includeResolved: boolean) {
  const [exceptions] = await db.query<ExceptionRow[][]>(
    `SELECT * FROM exceptions
     ${includeResolved ? '' : 'WHERE resolved = false'}
     ORDER BY flagged_at ASC`
  );

  const SEVERITY_RANK: Record<string, number> = { critical: 1, warning: 2, info: 3 };
  exceptions?.sort((a, b) =>
    (SEVERITY_RANK[a.severity] ?? 9) - (SEVERITY_RANK[b.severity] ?? 9)
  );

  const rows = exceptions ?? [];

  if (rows.length === 0) {
    console.log(includeResolved ? 'No exceptions on record.' : '✓ No unresolved exceptions.');
    return;
  }

  const criticals = rows.filter((e) => e.severity === 'critical' && !e.resolved);
  const warnings  = rows.filter((e) => e.severity === 'warning'  && !e.resolved);
  const infos     = rows.filter((e) => e.severity === 'info'     && !e.resolved);
  const resolved  = rows.filter((e) => e.resolved);

  console.log(`\nException Queue — ${new Date().toLocaleString('en-GB')}`);
  console.log(`${'─'.repeat(60)}`);
  console.log(`Unresolved: ${criticals.length} critical · ${warnings.length} warning · ${infos.length} info`);
  if (includeResolved) {
    console.log(`Resolved  : ${resolved.length}`);
  }
  console.log(`${'─'.repeat(60)}\n`);

  const groups = [
    { label: 'CRITICAL', items: criticals },
    { label: 'WARNING',  items: warnings  },
    { label: 'INFO',     items: infos     },
    ...(includeResolved ? [{ label: 'RESOLVED', items: resolved }] : []),
  ];

  for (const { label, items } of groups) {
    if (items.length === 0) continue;
    console.log(`── ${label} (${items.length}) ──`);

    for (const ex of items) {
      const icon = SEVERITY_ICON[ex.severity] ?? '⚪';
      const date = new Date(ex.flagged_at).toLocaleString('en-GB', {
        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
      });
      const idShort = String(ex.id).split(':')[1] ?? ex.id;
      console.log(`\n${icon} [${ex.type.toUpperCase()}] ${ex.description}`);
      console.log(`   ID      : ${idShort}`);
      console.log(`   Flagged : ${date}`);
      if (ex.node_id) console.log(`   Node    : ${ex.node_id}`);
      if (ex.context) console.log(`   Context : ${ex.context}`);
      if (ex.resolved) console.log(`   Status  : resolved`);
      else console.log(`   Status  : unresolved`);
    }
    console.log();
  }

  if (criticals.length > 0) {
    console.log(`⚠  ${criticals.length} critical exception(s) must be resolved before next deploy.`);
  }
}

async function resolveException(db: Surreal, exceptionId: string) {
  const fullId = exceptionId.includes(':') ? exceptionId : `exception:${exceptionId}`;

  const [result] = await db.query<ExceptionRow[][]>(
    `SELECT * FROM exceptions WHERE id = type::thing($id)`,
    { id: fullId }
  );

  const ex = result?.[0];
  if (!ex) {
    console.error(`Exception not found: ${exceptionId}`);
    process.exit(1);
  }

  await db.query(
    `UPDATE type::thing($id) SET resolved = true, resolved_at = time::now()`,
    { id: fullId }
  );

  console.log(`✓ Resolved: ${ex.description}`);
}

async function main() {
  const args = process.argv.slice(2);
  const resolveId = args.includes('--resolve') ? args[args.indexOf('--resolve') + 1] : null;
  const includeAll = args.includes('--all');

  const db = await connectDb();

  if (resolveId) {
    await resolveException(db, resolveId);
  } else {
    await listExceptions(db, includeAll);
  }

  await db.close();
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
