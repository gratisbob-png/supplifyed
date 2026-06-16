# Supplifyed

**Supplement Intelligence Platform**

A neutral, facts-only supplement research portal. No opinions. No rankings. No recommendations. Every piece of content source-badged so the user always knows who is saying what.

---

## Quick Start

### Prerequisites
- Node.js 18+
- SurrealDB ([install](https://surrealdb.com/install))
- Amazon Associates account
- Amazon PA API access

### Setup

```bash
# 1. Clone and install
git clone https://github.com/your-username/supplifyed
cd supplifyed
npm install

# 2. Configure environment
cp .env.example .env.local
# Fill in all values in .env.local

# 3. Start SurrealDB locally
surreal start --log trace --user root --pass root memory

# 4. Load schema
npm run db:schema

# 5. Seed first 10 ingredients
npm run seed:ingredients

# 6. Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run test             # Run all tests
npm run db:schema        # Load SurrealDB schema
npm run db:validate      # Validate schema integrity
npm run seed:ingredients # Seed first 10 ingredients
npm run seed:products    # Seed first products
npm run quality:check    # Run all quality gates
npm run links:check      # Check all affiliate links
```

---

## Architecture

**Stack:** Next.js 14 + TypeScript + SurrealDB (graph) + Vercel

**Why graph database:** Information exists in multiple contexts simultaneously. Magnesium is a mineral, sleep aid, performance supplement, and electrolyte — all at once. A graph holds all connections naturally.

**Data flow:**
```
Amazon PA API → Automation (Claude Code Skills) → SurrealDB Graph → Next.js → Vercel
```

**Three navigation modes:**
1. **Search** — single query, deep result
2. **Card Compare** — multiple products side by side
3. **Ingredient Builder** — select compounds, find products containing all of them

---

## The Rules (Non-Negotiable)

1. No content without a source badge
2. No opinion language anywhere (no best, recommended, top, winner)
3. Brand marketing cap enforced equally across all brands
4. Generic ingredient link cannot be removed by manufacturer submission
5. RRP only — never live pricing
6. Manufacturers only for submissions — no resellers

---

## Documentation

All context in `docs/`:

| File | Contents |
|------|---------|
| `docs/01_master_plan.md` | Philosophy, product, revenue model |
| `docs/02_ingredient_database.md` | 100 ingredients, evidence ratings |
| `docs/03_architecture.md` | Graph DB, interface, system map |
| `docs/04_build_specification.md` | Complete technical specification |

Skill files in `skills/` — one per automation function.

---

## Supplifyed

Supplied. Simplified. Verified. Amplified.
