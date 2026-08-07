# Sanity Content Seed

Programmatic content loader for zeppstr.com. Pushes the locked Solutions, Industries, Sub-services, Client Logos, Quotes, and Case Studies into Sanity in one command.

## Run

```bash
npm install            # install tsx + dotenv (one-time)
npm run seed:check     # see what's already in Sanity
npm run seed           # push all content
npm run seed:check     # verify
```

## Prerequisites

`.env.local` must have:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` — already set
- `NEXT_PUBLIC_SANITY_DATASET` — already set (`production`)
- `SANITY_API_TOKEN` — **must be a write token**. Generate in [Sanity Manage](https://www.sanity.io/manage) → API → Tokens. Copy once, paste into `.env.local`, never commit.

## What gets seeded

| Type | Count | Source |
|------|-------|--------|
| Solutions | 5 | `data/solutions.ts` (curated) |
| Sub-services | 23 | `data/sub-services.ts` (curated) |
| Industries | 6 | `data/industries.ts` (curated) |
| Client Logos | 24 | `data/client-logos.ts` (curated, **without image assets**) |
| Quotes | 3 | `data/quotes.ts` (founder quotes for case studies) |
| Case Studies | 3 | `data/case-studies.ts` + markdown files in `deliverables/content/case-studies/` |

## Idempotency

Every document uses a deterministic `_id` (e.g. `solution-organic-growth`). Running the seed twice **updates** existing documents in place — it does not duplicate. Safe to re-run while iterating on copy.

## What this script does NOT do

- Upload image assets (logo PNGs, hero photography, founder photos). After seeding, open Sanity Studio (`npm run sanity:dev`) and upload images per record.
- Seed Articles for `/insights`. The Brief launch articles are drafted separately.
- Seed Home page or About pages. These are built from React components, not CMS records.

## Adding content later

To add a new sub-service or case study after the initial seed:

1. Add a record to the relevant `data/*.ts` file with a unique `_id`.
2. Re-run `npm run seed`.

Or edit directly in Sanity Studio — both work, but the seed file is the source of truth that survives Studio migrations.

## File map

```
scripts/seed/
  client.ts              — Sanity write client
  portable-text.ts       — Markdown → Portable Text converter
  markdown-sections.ts   — H2-section parser for case studies
  seed.ts                — Main orchestrator (runs in dependency order)
  check.ts               — Pre-flight audit (counts existing docs)
  data/
    solutions.ts         — 5 Solutions
    sub-services.ts      — 23 Sub-services
    industries.ts        — 6 Industries with FAQs
    client-logos.ts      — 24 client logo records (no images)
    quotes.ts            — 3 founder quotes
    case-studies.ts      — 3 case studies (loads narrative from markdown)
```
