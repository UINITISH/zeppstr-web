# Zeppstr web — session changelog, 5 August 2026

Handover document for the developer maintaining `zeppstr-web`.

**Branch:** `add-brand-guidelines`
**State:** all work committed locally. **Not pushed** — push returns 403,
`vikasyadav2504-blip` has read but not write on `UINITISH/zeppstr-web`.
**Sanity:** seeded successfully to project `03uhyc94`, dataset `production`.

---

## 1. Why this session happened

The Work page was broken in three independent ways and the CMS had never been
seeded. Investigation surfaced a content-integrity problem serious enough to
halt work until the founder confirmed client permissions.

---

## 2. CRITICAL — content removed for legal reasons

### 2.1 Five named real-estate case studies deleted

`scripts/seed/data/case-studies-realestate.ts` previously contained seed content
for **Brigade Group, Prestige Group, Sobha Realty, Imtiaz Developments, Sobha
Limited**.

**Confirmed with founder:** these were delivered as **third-party /
subcontracted work**. Zeppstr holds **reporting access only, no naming rights**.

Additional integrity failures in the source deck
(`Case Studies & Portfolio/Zeppstr_Case_Studies.md`):

| Claim | Stated project value | Claimed attributed revenue |
| --- | --- | --- |
| Prestige Group | ₹450 Cr | **₹4,555 Cr** (10× project) |
| Sobha Limited | ₹280 Cr | **₹2,051 Cr** (7× project) |

Deck also claimed ₹12,674 Cr total across five clients and "average ROI 1,897%".
These figures are arithmetically impossible — you cannot attribute more revenue
than the total value of the asset being sold.

Testimonials in that deck were attributed to job titles ("Project Director,
Brigade Group") with no named individuals. Not verifiable, not usable.

**Files changed:**

- `scripts/seed/data/case-studies-realestate.ts` — emptied, exports
  `REALESTATE_CASE_STUDIES: never[] = []`, header documents the reason
- `scripts/seed/seed.ts` — removed `seedRealEstateCaseStudies()` and its import
- `components/blocks/LogoStrip.tsx` — removed Prestige Group
- `components/blocks/ClientLogosWall.tsx` — removed Prestige Group
- `components/forms/DiagnosticIntake.tsx` — removed prestige-group.png
- `app/(marketing)/page.tsx` — removed `static-prestige` tile object
- `app/(marketing)/solutions/brand-engagement-lifecycle/video-production/page.tsx`
- `app/(marketing)/solutions/organic-growth/local-search/page.tsx`
- `scripts/seed/data/client-logos.ts` — removed `logo-prestige`
- `lib/case-study-images.ts` — removed 5 slug entries
- `lib/case-study-metrics.ts` — removed 5 metric blocks
- `docs/brand-guidelines.md` — added an explicit **"Never name"** list
- `public/case-screenshots/prestige-group.jpg` — deleted

**DO NOT REINTRODUCE** these names without written publication consent from the
contracting party. Anonymised aggregate reporting is permitted and implemented —
see §4.3.

### 2.2 Unverifiable testimonials removed

`scripts/seed/data/quotes.ts` held three quotes attributed to `"Founder"` /
`"Sales Director"` with no names. Removed Wise Market and Tru Aquapolis quotes.
Retained the one verifiable testimonial: **Pankaj Singhal, Founder, Mini Leaves**
(source: `Portfolio Zeppstr.pdf`).

`founderQuoteId` removed from the Wise Market and Tru Aquapolis META entries.

Two further verified testimonials exist in that PDF (Homatico founder, Mohammed
Asif) — noted in the file header, pending permission to publish.

---

## 3. Bugs fixed

### 3.1 Seed pipeline was completely non-functional

Two independent breakages meant `npm run seed` had **never run successfully**:

1. `scripts/seed/seed.ts` imported `./data/articles` — a file that did not
   exist. Module resolution failed before anything executed.
2. `REPO_ROOT` was `resolve(__dirname, "..", "..", "..", "..", "..")` — five
   levels up, resolving to `~/Documents`. `loadCaseStudies()` therefore looked
   for markdown in a non-existent `deliverables/` directory.

**Fix:** `REPO_ROOT` now `resolve(__dirname, "..", "..")` (repo root). Canonical
case-study markdown moved inside the repo at
`deliverables/content/case-studies/`. `data/articles.ts` created (§4.2).

### 3.2 Work grid silently discarded every headline metric

`components/work/FilterableWorkGrid.tsx` rendered `headlineMetric` **only inside
the type-only placeholder branch** — the fallback used when a tile has no image.
But `app/(marketing)/work/page.tsx` assigns `screenshotSrc` to every case study
without a `heroImage`, so that branch never executed.

Result: the outcome number was fetched from Sanity, passed into the component,
and thrown away on every card. `AUD 40K → AUD 2.7M` was invisible.

**Fix:** metric now renders unconditionally in the row.

### 3.3 Broken logo paths

`components/blocks/LogoStrip.tsx` referenced `/clients/*.png`. That directory
does not exist — logos live in `/public/client-logos/`. Every logo path in the
component was dead. Corrected.

Two referenced files are still missing and will render blank:
`/client-logos/invest-in-sharjah.png`, `/client-logos/tru-aquapolis.png`.

### 3.4 Hardcoded case-study count

`app/(marketing)/work/page.tsx` hardcoded "Three businesses. Three industries."
Now derived from `cases.length` and the distinct industry count via a
`NUMBER_WORDS` lookup. Currently renders "Seven businesses. Four industries."

### 3.5 Typography — 28 straight apostrophes

28 instances of `'` in user-facing copy across 14 files, while the rest of the
site used `’`. Replaced with the **Unicode character**, not `&rsquo;` —
several strings sit in `metadata` objects which are plain JS, not JSX, where an
HTML entity would render literally in meta descriptions.

Files: contact, thank-you, industries, solutions hub, 6 solution detail pages,
`ApplyForm.tsx`, `ContactForm.tsx`.

### 3.6 Contrast bug

`SectorRecord.tsx` heading inherited a dark ink colour from a global heading
rule, rendering near-invisible on the emerald panel. `text-white` set explicitly.

---

## 4. Content added

### 4.1 Seven case studies

Markdown in `deliverables/content/case-studies/`, metadata in
`scripts/seed/data/case-studies.ts`. Section headings map to Sanity fields via
`parseSections()` — **The situation / The diagnosis / What we did / What changed
/ What this proves**.

| Slug | Client | Headline metric | Source document |
| --- | --- | --- | --- |
| `tru-aquapolis` | Tru Aquapolis | ₹34 Cr+ qualified pipeline on ₹39.7L media | `TRU_Aquapolis_Case_Study_Zeppstr.pdf` |
| `wise-market` | Wise Market | AUD 40K → AUD 2.7M | `Case Study by Zeppstr.pdf` |
| `mini-leaves` | Mini Leaves | 0.5% → 3%+ conversion · ₹60L+/mo | same + `Portfolio Zeppstr.pdf` |
| `invest-in-sharjah` | Invest in Sharjah | #1 for "invest in sharjah" | `Case Study by Zeppstr.pdf` |
| `homatico` | Homatico | Website rebuilt, then inquiries grew | `Portfolio Zeppstr.pdf` testimonial |
| `vehiclemall` | VehicleMall | 3 production apps · valuation, auction, custody | `Portfolio Zeppstr.pdf` |
| `sky-phonez` | Sky Phonez | Custom storefront built for SKU depth | `Portfolio Zeppstr.pdf` |

**Metric changes worth noting:**

- Tru Aquapolis was `"31-campaign account architecture"` — an activity
  description, not an outcome. Now the ₹34 Cr pipeline figure, with
  `publishedAt` corrected from 2024 to `2026-06-05`.
- Mini Leaves was `"Brand-led DTC growth"` — no number. Now the conversion and
  run-rate figures from `docs/brand-guidelines.md`.

**⚠️ Data loss warning:** the seed uses `createOrReplace`. The pre-existing
Sanity entry for `tru-aquapolis` was **richer** than the new markdown — it
contained April 2026 detail (31 Google + 8 Meta campaigns, "3 spending, 28
paused", placement-level CPMs, ₹11.75L spend / 377 leads / ₹3,117 CPL, 22.2M
Instagram views). **That content has been overwritten.** The founder was advised
to copy it out beforehand; confirm whether they did. Merging the April detail
back into `tru-aquapolis.md` is recommended — the PDF covers Mar–May in
aggregate, the old Sanity entry covered April in depth.

### 4.2 Four articles

`deliverables/content/insights/`, wired via new `scripts/seed/data/articles.ts`
with a `loadArticles()` function mirroring `loadCaseStudies()`.

| Slug | Category | Sourced from |
| --- | --- | --- |
| `creative-concentration` | performance-paid | Meta data: 33 creatives → 2 survived, ₹1,378 CPL hero |
| `revenue-claims-that-fail-arithmetic` | growth-strategy | The ₹4,555 Cr / ₹450 Cr finding |
| `zero-conversions-147-leads` | conversion-experience | Inherited-account failure state |
| `win-four-searches-completely` | seo-search | Invest in Sharjah rankings |

`industry-insights` category is empty — deliberately left for a market-level
piece.

### 4.3 Anonymised sector record

New `components/blocks/SectorRecord.tsx`. Aggregate proof for the subcontracted
real-estate work — four accounts pooled, Bengaluru and Dubai, 8–12 months each.

Aggregation (not per-project anonymisation) is the deliberate choice: a single
project described by value, corridor and duration is trivially re-identifiable
in that sector.

Publishes lead volume (2,625 → 10,148/mo), CPL (−34% to −42%), ROAS (2.0–2.4×
→ 3.5–4.1×), funnel conversion (12–22% → 28–35%). **All revenue and ROI figures
deliberately excluded** — see §2.1.

### 4.4 Four draft case studies — blocked by a guard

`prohance.md`, `empuls.md`, `fixstars.md`, `tristar-online.md` in
`deliverables/content/case-studies/`.

Situation, diagnosis and thesis are written from each client's **public
positioning** (their own websites — verifiable). `What we did` and `What changed`
carry a `RESULTS PENDING` marker because no engagement data was available.

**`loadCaseStudies()` now throws** if any markdown it loads contains
`RESULTS PENDING` or `OUTCOME DATA PENDING`. A half-finished case study cannot
reach the site even if someone adds a META entry carelessly.

To publish one: fill both sections, delete the markers, add a META entry, remove
from `DRAFT_CASE_STUDIES`.

---

## 5. Work page redesign

`app/(marketing)/work/page.tsx`, `components/work/FilterableWorkGrid.tsx`,
new `components/work/ClientRoster.tsx`.

**Structure, top to bottom:** hero + outcome strip → filter row → numbered case
study index → client roster + contact tile → sector record → CTA banner.

- **Hero** left-aligned (was centred). Added a four-stat outcome strip —
  ₹34 Cr+, 67×, #1, 85×. **These are hardcoded**; consider deriving from Sanity.
- **Index layout** replaced the card grid. Numbered plates, mono labels, outcome
  column, thumbnail, arrow. Deliberately mirrors the "Atelier Index" system used
  in the TRU Aquapolis client deliverable.
- **Imagery** grayscale by default, colour on hover, `duration-page` easing.
  Applied consistently across index thumbnails, roster screenshots and logos.
- **Client roster** — 7 named clients with no published case study. No metric,
  no link, by design. 8th grid cell is a yellow contact tile linking `/contact`.

**Roster promotion rule** (documented in `ClientRoster.tsx`): do not move an
entry into `FilterableWorkGrid` until it has a real metric or documented scope
**and** a markdown narrative. Homatico was promoted this session; it must not
appear in both lists.

---

## 6. Known issues — action required

### 6.1 HIGH — fake client names now live in Sanity

`scripts/seed/data/client-logos.ts` contains placeholder company names that were
seeded to production as `clientLogo` documents:

GreenDot Health · Northstar Education · Bridge Learning · Axis Legal ·
Meridian Advisory · CloudKey · Flowboard · Vector Tech · Sapphire Realty ·
Bloomwell · Paragon Education · Keystone Legal · Veridia D2C · Trinity Capital

**These are not real clients.** Delete from the seed file and from Sanity Studio
before anything ships to production.

### 6.2 HIGH — transactional email likely broken in production

`.env.local` was byte-identical to `.env.example` — never configured. Empty:

| Variable | Consequence |
| --- | --- |
| `RESEND_API_KEY` | **Contact and diagnostic forms send nothing. Silent failure.** |
| `BEEHIIV_API_KEY` / `_PUBLICATION_ID` | Newsletter signups not recorded |
| `CRM_API_KEY` / `CRM_API_URL` | Leads never reach CRM |
| `TURNSTILE_*` | No spam protection |
| `SANITY_REVALIDATE_SECRET` | Published CMS changes may not refresh the site |

**Verify `RESEND_API_KEY` in Vercel immediately.** If unset in production, every
"Apply for a Diagnostic" submission since launch has been discarded. Forms are
configured to deliver to `nitish@zeppstr.com`.

### 6.3 MEDIUM — Sanity token exposed

The Editor token `zeppstr-seed` created this session appeared in a screenshot in
a chat transcript. Revoke and reissue.

### 6.4 MEDIUM — imagery is stock

`lib/case-study-images.ts` maps case-study slugs to **Unsplash placeholders**.
Real assets exist and should replace them:

- **TRU Aquapolis** — Drive folder `1Zoya529HQAFPiXzshsk3Kza8LwddTUnd`
  ("Aquapolis assets"): 3D Renders, Drone1/2/3, Demo Flats, brand book,
  floor plans, `Teaser_Aquapolis.mp4`
- Drop real screenshots into `public/case-screenshots/<slug>.jpg` — that path
  takes precedence over `CASE_STUDY_IMAGES` automatically

Missing screenshots: `homatico`, `invest-in-sharjah`, `vehiclemall`,
`sky-phonez`, `21-finance`, `learncab`.

### 6.5 LOW — Figma workspace ID published

`app/(marketing)/solutions/experience-engineering/experience-design/page.tsx:262`
exposes the live Figma file ID `hKLYShm3thswPaSuYw4g8F` in a public FAQ answer.
Recommend removing.

### 6.6 LOW — file mode noise

Large numbers of `100644 => 100755` mode changes in the diff. Cosmetic.
`git config core.fileMode false` suppresses.

---

## 7. Outstanding work

### 7.1 Import 26 articles from Google Drive

Full manifest at **`deliverables/content/insights/IMPORT-MANIFEST.md`** — 26
Drive file IDs, assigned slugs, categories, and a 4-step procedure.

Source folder: `1wIQ2L0hN67wQCUPGx3pT-aUPn7kbx4Vf`. Articles are complete
drafts, 12–24KB each, with H2/H3, tables and FAQ sections.

**Use their true 2024 `createdTime`, not today's date.** They predate AI
Overviews and LLM citation behaviour; presenting them as current thinking is a
credibility problem. Dated honestly they are a legitimate SEO archive.

Note: the "Zeppstr Blogs List" spreadsheet contains **no article text** — it is a
production tracker. All 12 tabs checked; longest cell is 363 characters, zero
URLs (CSV export strips hyperlinks, which is why the Drive docs were initially
missed). Do not treat it as a content store.

### 7.2 Case study detail page redesign — requested, not started

`app/(marketing)/work/[slug]/page.tsx` currently renders a single centred
column. Requested: content left, sticky right sidebar with lead magnets and
CTAs, supporting graphics between narrative sections, interlinking to related
case studies and solutions. Applies to all seven.

### 7.3 Six sub-services have no static page

These fall through to the dynamic `solutions/[slug]/[service]` route and depend
on seeded `subService` documents (23 were seeded, so they should resolve —
verify): Growth Strategy & Operating Model, Organic Search Strategy, Technical
SEO & Crawl Engineering, Attribution & Measurement, Creative Strategy &
Production, Retargeting & Lifecycle Acquisition.

### 7.4 Access still outstanding

See `docs/ACCESS-REQUEST-UINITISH.md`. Sanity granted. **GitHub write access
still 403** for `vikasyadav2504-blip`. Vercel, repo ownership and DNS unresolved.

---

## 8. Commands

```bash
# dev server
npm run dev -- -p 3100

# Sanity Studio (local — no hosted studio is deployed)
npm run sanity:dev          # localhost:3333

# seed CMS — requires SANITY_API_TOKEN with Editor permission in .env.local
npm run seed

# push (blocked until write access granted)
git push origin add-brand-guidelines
```

**Seed behaviour:** idempotent via deterministic `_id`s, but uses
`createOrReplace` — it **overwrites** existing Sanity documents with the same
`_id`. Anything edited directly in Studio will be lost on the next seed. Treat
the seed files as the source of truth, or stop running the seed.

---

## 9. Editorial standards established

These were agreed with the founder during the session and are enforced in code
where possible.

1. **No client name without publication rights.** Subcontracted work is
   anonymised in aggregate, never as an individually-described project.
2. **No testimonial without a named individual.** Job-title attribution is not a
   testimonial.
3. **No attributed revenue or ROI** unless the number is traceable to platform
   data and cannot exceed the value of the asset sold. Prefer pipeline stated
   with an explicit close-rate assumption.
4. **No case study without an outcome.** Enforced by the `RESULTS PENDING`
   guard in `loadCaseStudies()`.
5. **Headline metrics state client outcomes, not agency activity.**
