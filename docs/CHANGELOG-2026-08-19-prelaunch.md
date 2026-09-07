# Pre-launch hardening — 19 August 2026

Second session. Supplements `CHANGELOG-2026-08-05.md`, which covers the content
audit and Work page rebuild. This one is launch readiness.

**Branch:** `add-brand-guidelines`
**Typecheck:** clean (`npx tsc --noEmit`)
**Production build:** NOT verified — must be run on macOS, see §5

---

## 1. Build-breaking type errors — FIXED

`npm run build` would have failed on Vercel. `next.config.js` sets no
`ignoreBuildErrors`, so these were hard blockers, not warnings.

| File | Error | Fix |
| --- | --- | --- |
| `app/(marketing)/page.tsx` | `_type` missing on 12 slug literals | added `_type: "slug"` |
| `app/(marketing)/page.tsx` | `"Fintech"` not in `IndustryName` | remapped 21 Finance to Professional Services |
| `app/(marketing)/page.tsx` | `headlineMetric` required on roster tiles | made outcome fields `Partial` |
| `components/work/FilterableWorkGrid.tsx` | same, at the exported type | same |
| `app/api/revalidate/route.ts` | `Request` not assignable to `NextRequest` | typed the param, `isValidSignature === true` |
| `components/utility/AnimatedHeadline.tsx` | TS2590 union too complex | widened `Tag` to `React.ElementType` |

The `headlineMetric` change is deliberate and load-bearing: roster tiles are
named clients with no published case study and **must not** carry an invented
metric. Requiring the field forced callers to fabricate one.

---

## 2. Rupee sign broken in every generated image — FIXED

All three `ImageResponse` routes declared `fontFamily: "sans-serif"` without
loading a font. Satori ships no system fonts, so `₹34 Cr+` rendered as
`□34 Cr+`.

Affected: `/work-thumb/[slug]`, `/insights-cover/[slug]`, `app/opengraph-image.tsx`
— i.e. every social share card on the site.

New `lib/og-font.ts` fetches Inter as a **TTF** (Satori cannot parse WOFF2, so
the usual Google Fonts CSS recipe 500s) from the **latin-ext** subset, which is
the one that carries U+20B9. Falls back silently and substitutes "Rs " if the
fetch fails — a tofu box is bad, a 500 on a share card is worse.

Verified rendering correctly at `/work-thumb/tru-aquapolis`.

**Optional hardening:** download the same TTF to `/public/fonts/` and read from
disk to remove the render-time network call.

---

## 3. Broken links found in nav, footer and sitemap — FIXED

All would have shipped.

**Missing routes, linked from every page:**

- `/about` — in `MegaMenu`, `MobileDrawer`, `Footer`. Built.
- `/privacy`, `/terms` — in `Footer`. Built. **See §6.**
- `/insights/the-brief` — no such article. Repointed to `/insights`.

**Industry slug mismatch in `Footer.tsx`** — four of six links pointed at slugs
that do not exist in Sanity:

| Was | Now |
| --- | --- |
| `/industries/healthcare` | `/industries/healthcare-wellness` |
| `/industries/saas` | `/industries/saas-tech` |
| `/industries/edtech` | `/industries/edtech-education` |
| `/industries/ecommerce` | `/industries/ecommerce-dtc` |

**Sitemap advertised three 404s to search engines** — `/about/clients`,
`/about/founder`, `/about/firm`. Removed. Added `/privacy` and `/terms`.

---

## 4. Fabricated client names removed — CODE DONE, SANITY PENDING

`scripts/seed/data/client-logos.ts` still contained the 14 invented names
flagged on 5 Aug, and they had seeded live:

GreenDot Health · Northstar Education · Bridge Learning · Axis Legal ·
Meridian Advisory · CloudKey · Flowboard · Vector Tech · Sapphire Realty ·
Bloomwell · Paragon Education · Keystone Legal · Veridia D2C · Trinity Capital

Also removed: Prestige Group (no naming rights), and four entries with no
supporting asset anywhere in the archive — Crafthives, Truspace, Altius Realty,
Himalayan Wellness, plus "Aishwarya Foods" (the real client is Aishwarya
Interiors).

The file is now rebuilt from evidence: every entry corresponds to a logo asset
in `/public/client-logos/` or a published case study. Industry mappings marked
`(?)` are inferred and should be corrected in Studio.

Deleted `public/client-logos/prestige-group.png`.

**⚠️ The seed only upserts — removing names from the file does NOT delete the
documents from Sanity.** New script:

```bash
npm run seed:prune:logos              # dry run, lists orphans
npm run seed:prune:logos -- --apply   # deletes them
```

**This has not been run yet. Run it before launch.**

---

## 5. Production build — NOT VERIFIED

Could not be run in this environment (Linux sandbox, no network, wrong SWC
binary). Typecheck passing is a good signal but not equivalent.

```bash
npm run build
```

Must pass before deploy. Watch for failures in the generated image routes,
which now make a network call at build/render time.

---

## 6. Legal pages need a lawyer

`/privacy` and `/terms` were written from what the code actually does — the real
form fields in `app/api/`, the real processors in `.env.example`, the analytics
in `app/layout.tsx`. They are factually accurate descriptions of the system.

**They are not legal advice and have not been reviewed.** Zeppstr is subject to
India's DPDP Act 2023 and serves clients in the EU, UK, UAE and Australia, so
GDPR is likely in scope.

Two `TODO` markers in `/privacy` need real answers before launch:
- actual data retention period
- whether a grievance officer must be named under DPDP

---

## 7. Imagery — stock deliberately NOT added

`lib/case-study-images.ts` previously mapped case studies to generic Unsplash
photos — a laptop and credit card above "AUD 40K → AUD 2.7M", a stock apartment
block above the Tru Aquapolis pipeline figure.

Freepik was searched for replacements. Every result was wrong: skyline photos
for a specific Bengaluru tower, showroom handshakes for what is actually
auction and valuation software. Generic stock is the visual language of the
commodity-agency positioning the site's copy argues against, and it sat directly
above the strongest numbers.

**Resolution order is now:** Sanity `heroImage` → local screenshot → generated
branded card at `/work-thumb/[slug]`.

The generated card pulls client name, metric and industry live from Sanity in
brand green and yellow. It is consistent, on-brand, matches the Atelier Index
system used in client deliverables, and carries no licensing question.

Thumbnails are now suppressed in the Work index unless a **real** image exists —
the branded card is legible at 1200px and an illegible green square at the
180px the index column allows.

**Real assets that should replace the fallback:**

- **TRU Aquapolis** — Drive folder `1Zoya529HQAFPiXzshsk3Kza8LwddTUnd`
  ("Aquapolis assets"): 3D Renders, Drone1/2/3, Demo Flats, brand book,
  floor plans, `Teaser_Aquapolis.mp4`
- Everything else: screenshot the client's own site at 1600px into
  `/public/case-screenshots/<slug>.jpg` and add the slug to
  `CASE_STUDY_IMAGES`.

---

## 8. Conflicting Tru Aquapolis claim — FIXED

`ResultsStrip.tsx` on the homepage claimed **"22M+ demand reach / Into 3
premium flats sold direct from generated leads"** while the case study two
sections below reported 1,690 qualified enquiries and ₹34 Cr+ of pipeline.

Two different claims about one client on one page, with the weaker appearing
first. "3 premium flats sold" is not traceable to any source document, and
booking counts depend on the client's sales team and inventory — not ours to
claim.

Now: **85× / Media to pipeline / ₹39.7L of media → ₹34 Cr+ qualified pipeline in
90 days.** Same correction applied to `DiagnosticIntake.tsx`.

---

## 9. EDITORIAL DECISION NEEDED — Insights is currently weak

The four original 2026 essays are in `WITHHELD` in `articles.ts`, pulled at the
founder's instruction pending a sourcing review. That leaves `/insights`
publishing **only** the 26 imported archive pieces — all written March 2024,
generic in voice ("Ultimate Guide", "Demystifying", "Unveiling").

For a launch, that inverts the site's quality signal: the Insights page becomes
the weakest surface on a site whose entire argument is rigour.

**Recommendation.** Only one of the four has the sourcing problem that triggered
the hold:

| Article | Risk | Recommendation |
| --- | --- | --- |
| `revenue-claims-that-fail-arithmetic` | Reconstructs an identifiable third-party deck with exact crore figures | **Keep withheld** |
| `creative-concentration` | Zeppstr's own Meta account data, no third party named | Republish |
| `zero-conversions-147-leads` | Zeppstr's own inherited account | Republish |
| `win-four-searches-completely` | Invest in Sharjah, a Zeppstr client with public rankings | Republish |

To republish: move the entry from `WITHHELD` back into `META` and run
`npm run seed`. Nothing was deleted.

**Not actioned — this reverses an explicit editorial hold and is the founder's
call.**

---

## 10. Launch checklist

Ordered by cost of getting it wrong.

- [ ] **Verify `RESEND_API_KEY` in Vercel.** Still empty in `.env.local`. If
      also unset in production, every diagnostic application since launch has
      been silently discarded. Submit a live form and confirm delivery to
      `nitish@zeppstr.com`. **Do this first — it does not depend on anything
      else.**
- [ ] `npm run seed:prune:logos -- --apply` — delete the 14 fabricated client
      records from Sanity
- [ ] `npm run build` — must pass
- [ ] Revoke the Sanity token `zeppstr-seed`; it was exposed in a screenshot.
      Issue a replacement.
- [ ] Legal review of `/privacy` and `/terms`; resolve the two TODOs
- [ ] Decide §9 — republish three withheld articles or launch with the archive
- [ ] Set remaining env vars in Vercel: `BEEHIIV_*`, `TURNSTILE_*`,
      `SANITY_REVALIDATE_SECRET`, Sentry
- [ ] GitHub write access for `vikasyadav2504-blip` — push currently 403s
- [ ] Crawl every route for 404s after the build (the dev server was in a
      broken HMR state at the end of this session and could not be restarted
      remotely)
- [ ] Replace generated thumbnails with real imagery, TRU Aquapolis first

---

## 11. Files changed this session

```
app/(marketing)/about/page.tsx              NEW
app/(marketing)/privacy/page.tsx            NEW
app/(marketing)/terms/page.tsx              NEW
lib/og-font.ts                              NEW
scripts/seed/prune-client-logos.ts          NEW
docs/CHANGELOG-2026-08-19-prelaunch.md      NEW

app/(marketing)/page.tsx                    type fixes
app/(marketing)/work/page.tsx               the-brief link
app/api/revalidate/route.ts                 NextRequest
app/opengraph-image.tsx                     font
app/insights-cover/[slug]/route.tsx         font
app/work-thumb/[slug]/route.tsx             font
app/sitemap.ts                              removed 404s, added legal pages
components/nav/Footer.tsx                   industry slugs
components/blocks/ResultsStrip.tsx          Tru Aquapolis claim
components/forms/DiagnosticIntake.tsx       Tru Aquapolis claim
components/utility/AnimatedHeadline.tsx     TS2590
components/work/FilterableWorkGrid.tsx      optional metric, thumbnail rule
lib/case-study-images.ts                    stock removed
scripts/seed/data/client-logos.ts           rebuilt from evidence
package.json                                seed:prune:logos

public/client-logos/prestige-group.png      DELETED
```

---

# Addendum — crawl results and fixes (same session)

Dev server restarted; full sitemap crawl run. **67 URLs, 66 returned 200.**
The one exception exposed two further problems.

## 12. `/contact` was unreachable — FIXED

`next.config.js` contained:

```js
{ source: "/contact", destination: "/book-consultation", permanent: false }
```

`app/(marketing)/contact/page.tsx` exists and is complete — press enquiries,
partnership enquiries, general questions, office address, social links, contact
form. The redirect made all of it unreachable.

Every "Contact" link in `GlobalNav`, `MobileDrawer` and `Footer` landed on a
multi-step diagnostic qualification form instead. A journalist or prospective
partner had nowhere to go, and `/contact` was listed in `sitemap.ts` while
immediately bouncing.

Redirect removed.

## 13. 12 of 15 legacy SEO redirects pointed at 404s — FIXED

The `LEGACY_REDIRECTS` map sends old ranking URLs to new ones with
`permanent: true` (301). Twelve destinations did not exist. Tested live against
the running server:

| Legacy source | Was (404) | Now |
| --- | --- | --- |
| `/on-page-seo-services` | `content-on-page-authority` | `content-architecture` |
| `/off-page-seo-services` | `authority-link-architecture` | `authority-building` |
| `/local-seo-services` | `local-discovery-reputation` | `local-search` |
| `/technical-seo-services` | `technical-search-engineering` | `technical-seo` |
| `/page-speed-optimization-services` | `site-performance-engineering` | `experience-engineering/web-development` |
| `/e-commerce-seo-services` | `commerce-search-discovery` | `organic-search-strategy` |
| `/d2c-seo-services` | `d2c-discovery` | `organic-search-strategy` |
| `/ppc-services` | `paid-search-acquisition` | `paid-search` |
| `/lead-generation` | `demand-generation-programs` | `demand-generation` |
| `/social-media-marketing-services` | `brand-social-engagement` | `organic-social` |
| `/email-marketing-services` | `lifecycle-marketing-automation` | `lifecycle-email` |
| `/web-development-services` | `digital-engineering` | `web-development` |
| `/app-store-optimization` | `site-performance-engineering` | `experience-engineering/web-development` |

A 301 into a 404 is worse than no redirect: it discards the link equity
permanently and tells Google the old URL is gone with no successor. These are
the URLs most likely to hold existing backlinks.

**Two mappings are judgement calls, not exact matches** — `/e-commerce-seo-services`
and `/d2c-seo-services` both now point at Organic Search Strategy because no
commerce-specific sub-service exists. If dedicated pages are built later, repoint.

**⚠️ `next.config.js` changes require a dev server restart to take effect.**
Neither §12 nor §13 is live until then.

## 14. CTA buttons — contrast improved

On the yellow `CTABanner` the primary action used `variant="outline"` — a thin
dark border on yellow, reading as secondary next to the plain-text link beside
it. It is the page's main conversion point.

- Primary is now **solid** in both banner variants: emerald-on-yellow, or
  yellow-on-dark. Hard bottom edge (`shadow-[0_2px_0_0]`) rather than a blur,
  to suit the flat editorial system.
- Secondary link underlined so it has an affordance without competing.
- New `onYellow` button variant added for CTAs placed on yellow panels —
  yellow-on-yellow has no contrast.
- `outline` border raised to 1.5px with a solid hover fill.

## 15. Blog cover images — no change needed

`/insights-cover/[slug]` already generates per-article branded covers with
category-specific colour and motif (green, blue, rust, navy). Verified rendering
on `/insights`.

These are more distinctive than stock and carry no licensing question. Same
reasoning as §7: adding Freepik photography would be a downgrade.

## 16. Article count discrepancy — NEEDS CHECKING

`/insights` reports **16** articles (Growth Strategy 3, SEO & Search 11,
Performance & Paid 1, Conversion & Experience 1). `articles.ts` defines 26 in
`META` plus 4 in `WITHHELD`.

Also, three of the four `WITHHELD` essays are currently **rendering live** on
`/insights` — the withheld list removes them from the seed, but the documents
remain in Sanity until pruned.

Two things to reconcile before launch:

```bash
npm run seed                    # push all 26 archive articles
npm run seed:prune -- --apply   # remove anything not in META, incl. withheld
```

Then re-check the count. If it is still short of 26, some markdown files or
META entries are missing.

Note this interacts with §9: if the withheld essays are being republished
anyway, move them back into `META` **before** running the prune, or they will be
deleted from Sanity and need re-seeding.
