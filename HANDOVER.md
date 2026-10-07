# Zeppstr Web — Developer Handover

Next.js 14 (App Router) + Sanity CMS. Marketing site for Zeppstr Growth Media.

**Repo:** https://github.com/UINITISH/zeppstr-web
**Working branch:** `add-brand-guidelines` (all current work; `main` is behind)
**Preview:** https://zeppstr-web-git-add-brand-guidelines-uinitishs-projects.vercel.app
**Production domain:** `zeppstr.com` — **not yet pointed here.** Still serving a cPanel "Coming Soon" page.

---

## 1. Access the developer needs

Grant these before they start. None of them should be handed over by email or chat.

| What | How to grant | Role |
|---|---|---|
| GitHub repo | Settings → Collaborators → Add people | Write |
| Vercel project | Project → Settings → Members | Member |
| Sanity Studio | sanity.io/manage → project `03uhyc94` → Members | Editor or Developer |
| Google Drive brand assets | Share the `Brand Assets` folder | Viewer |

**Never paste `SANITY_API_TOKEN` into Slack, email, or a chat window.** Use a password
manager share, or let them generate their own token from sanity.io/manage. A token was
exposed in a terminal dump on 23 Sep — if it has not been rotated yet, rotate it before
granting anyone else access.

---

## 2. Local setup

```bash
git clone https://github.com/UINITISH/zeppstr-web.git
cd zeppstr-web
git checkout add-brand-guidelines
npm install
cp .env.example .env.local     # then fill in the blanks
npm run dev                    # http://localhost:3100
```

Node 18+. `.env.example` is committed and documents every variable; `.env.local` is
gitignored and has never been committed (verified).

Minimum needed to render the site locally: `NEXT_PUBLIC_SANITY_PROJECT_ID`,
`NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`.

```bash
npm run typecheck     # tsc --noEmit — must be clean before any PR
npm run lint
npm run build         # full production build
```

---

## 3. Content lives in Sanity, not in the repo

Pages read from Sanity at build/ISR time. The repo holds *seed data* that pushes into
Sanity — it is the source of truth for structured content, but editing Sanity directly
also works and is not overwritten unless the seed is re-run.

```
scripts/seed/
  seed.ts                  # main seeder — solutions, industries, logos, case studies, articles, quotes
  data/                    # the actual content
    articles.ts            # META = published · WITHHELD = held back · PARKED_FILLER = (empty)
    case-studies.ts
    client-logos.ts
  prune-articles.ts        # deletes Sanity articles no longer in META
  batch.ts                 # batched + retrying writes (see §6)
  report-failure.ts        # credential-safe error printing (see §6)
```

**Publishing content changes:**

```bash
./UPDATE-SITE.command                      # seed + clean build, with guardrails
npm run seed:prune -- --apply              # removes orphans (destructive — run deliberately)
```

Or directly: `npm run seed`. Documents use deterministic `_id`s, so re-running upserts
rather than duplicating. The seed needs network access to `sanity.io`.

---

## 4. Deployment

Vercel is connected to the GitHub repo. Every push to `add-brand-guidelines` triggers a
preview build. The preview URL sits behind Vercel auth — team members see it logged in;
it is not publicly shareable as-is.

**To go live on zeppstr.com:**
1. Merge `add-brand-guidelines` → `main` (PR #1 is open)
2. Add all production env vars in Vercel project settings
3. Point the `zeppstr.com` DNS at Vercel and remove the cPanel parking page

---

## 5. Open items (not bugs — decisions or missing credentials)

| Item | Status |
|---|---|
| `RESEND_API_KEY` not set | Contact/apply forms do not send email. They accept and log only. |
| `HUBSPOT_TOKEN` not set in Vercel | Chat-widget leads land in function logs, not the CRM. |
| Logo PNGs not uploaded to Sanity | Logo wall renders text fallbacks. Records exist; images don't. |
| `revenue-claims-that-fail-arithmetic` withheld | Reconstructs an identifiable client deck with exact figures. Needs a confidentiality decision, not an edit. |
| Two testimonials have no company | Mohammed Asif, Pankaj Singhal — source deck named none. Not invented. |
| `/privacy` and `/terms` | Boilerplate. Need legal review, including a live-chat clause. |
| 49 Insights articles | Bulk-imported, not written in-house, all share a 2024-03-02 import timestamp. Rewriting them in Zeppstr's voice is a content backlog item. |

---

## 6. Gotchas — read this before debugging

Four problems cost a full day each. All are fixed; the fixes are easy to undo by accident.

**`generateStaticParams` must never be cached.**
`app/(marketing)/*/page.tsx` pass `{ next: { revalidate: 0 } }`. Next persists fetch
responses to `.next/cache/fetch-cache` *between builds*, and Vercel keeps that cache
between deploys. With caching on, 12 deleted articles were rebuilt as empty 404 shells
through three consecutive builds, each reporting success. A route-list query decides
which pages exist — if it goes stale, the route list silently disagrees with the content.

**`useCdn: false` in `sanity/lib/client.ts` is deliberate.**
It looks like a missed optimisation. `next build` runs with `NODE_ENV=production`, so
`useCdn: NODE_ENV === 'production'` made every static page build from Sanity's CDN cache
instead of the dataset. Do not "fix" it back.

**Seed writes are batched, with our own retry.**
Setting `maxRetries` on the Sanity client does nothing here — get-it only replays
idempotent methods (GET/HEAD), and every write is a POST. ~350 sequential POSTs on one
keep-alive connection died twice with `ECONNRESET`. `batch.ts` groups writes into
transactions (~20 requests) and retries explicitly. **Safe only because every document
has a fixed `_id`.** Do not route non-idempotent writes through it.

**Seed errors must never print the raw error object.**
Sanity error objects embed the request, `Authorization: Bearer sk...` included. A
`console.error(err)` leaked the production write token into a terminal dump that was then
pasted into a chat. All three seed scripts print via `report-failure.ts`, which emits code
/ status / message / responseBody only. Error output is meant to be shared — it must never
contain a secret.

**`UPDATE-SITE.command` runs `rm -rf .next` on purpose.**
Deleting only part of the build tree produced `Cannot find module './1682.js'` from
webpack-runtime. A clean build costs ~2 minutes and is worth it.

---

## 7. Notable components

| Path | What it does |
|---|---|
| `components/insights/article-scenes.tsx` | 18 hand-drawn scene compositions for article artwork. Title picks the scene; slug seeds the variation. **Subject beats format** — "guide"/"tips" must not choose the picture, or one scene dominates the blog. |
| `components/insights/ArticleDiagram.tsx` | Per-article data diagrams for the 4 in-house essays; falls through to a scene otherwise. |
| `components/hero/FoundationSketch.tsx` | Homepage hero graphic — the three layers named in the headline. |
| `lib/logo-optical.ts` | Optical-area logo sizing. Height-only caps broke across an 11× aspect range. |
| `components/utility/ChatLauncher.tsx` | Guided chat + lead capture. Falls back to this when no Tawk/Crisp env vars are set. |
| `lib/contact-channels.ts` | Single source for phone/WhatsApp/email. Change contact details here only. |

Most non-obvious decisions are explained in comments at the top of the file that
implements them. Those comments are the design record — read them before rewriting.
