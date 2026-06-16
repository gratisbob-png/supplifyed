# SPEC 01 — DATA LAYER
## SurrealDB Graph Database

---

## Purpose

Central truth store for all Supplifyed data. Every ingredient, product, evidence node, FAQ, and brand lives here. The graph holds all connections simultaneously.

## Technology

SurrealDB — graph + relational in one. Runs in-memory for development, persisted for production.

## Schema Files

| File | Node/Edge |
|------|-----------|
| `schema/nodes/ingredient.surql` | Ingredient nodes |
| `schema/nodes/product.surql` | Product nodes |
| `schema/nodes/evidence.surql` | Evidence nodes |
| `schema/nodes/faq.surql` | FAQ nodes |
| `schema/nodes/brand.surql` | Brand nodes |
| `schema/edges/contains.surql` | (product) → (ingredient) |
| `schema/edges/supported_by.surql` | (ingredient) → (evidence) |
| `schema/edges/answers_about.surql` | (faq) → (ingredient) |
| `schema/edges/made_by.surql` | (product) → (brand) |
| `schema/edges/related_to.surql` | (ingredient) → (ingredient) |

## Quality Gates

- Every product has at least one CONTAINS edge
- Every ingredient has at least one SUPPORTED_BY edge
- Every FAQ has at least one ANSWERS_ABOUT edge
- All evidence nodes have funded_by populated
- No null required fields on published nodes
- All enum values valid

## Connection

```typescript
import Surreal from 'surrealdb';
const db = new Surreal();
await db.connect(process.env.SURREALDB_URL);
await db.use({ namespace: 'supplifyed', database: 'production' });
await db.signin({ username, password });
```

## The Superposition Principle

Every piece of information exists in relation to every other relevant piece. Magnesium is a mineral, sleep aid, performance supplement, and electrolyte — all at once. The graph holds all connections. A query observes from one angle; the data is present in all angles simultaneously.
