# zeppstr-web

Production rebuild of zeppstr.com on **Next.js 14 (App Router) + Sanity CMS + Tailwind + Vercel**.
Built on Architecture v3.1. See `../../../reference/` for the canonical specs.

---

## Quick start (developer)

```bash
# 1. Install dependencies
pnpm install     # or npm install / yarn

# 2. Copy env template and fill in values
cp .env.example .env.local

# 3. Run dev server
pnpm dev         # → http://localhost:3000

# 4. Run Sanity Studio (separate terminal)
pnpm sanity:dev  # → http://localhost:3333
```

You'll need a Sanity project set up first. See [Sanity setup](#sanity-setup) below.

---

## Tech stack

| Layer | Tech | Why |
|---|---|---|
| Framework | **Next.js 14** (App Router) | SSR + ISR for SEO, RSC for performance, scales to 200+ pages |
| CMS | **Sanity.io** | Founder-editable content, structured schemas, real-time preview |
| Styling | **Tailwind CSS** | Token-driven, scales without CSS bloat |
| UI primitives | **Radix UI** | Accessibility built-in, headless = full design control |
| Forms | **React Hook Form + Zod** | Type-safe, scalable conditional logic |
| Hosting | **Vercel** | Edge functions, ISR, image optimization, CDN |
| Newsletter | **Beehiiv** | Newsletter as a product, native subscriber pages |
| Booking | **Cal.com** | Embed on Thank You page |
| Analytics | **Plausible + Microsoft Clarity + GA4** | Privacy + behavior + ad attribution |
| Forms backend | **Resend** for transactional · CRM webhook | Simple, reliable, observable |
| Spam protection | **Cloudflare Turnstile** | Privacy-first replacement for reCAPTCHA |
| Error monitoring | **Sentry** | Production observability |

---

## Folder structure

```
zeppstr-web/
├── app/                          Next.js App Router
│   ├── (marketing)/              Public marketing pages
│   │   ├── page.tsx              Home (T1)
│   │   ├── solutions/...         Solution hubs + sub-services
│   │   ├── industries/...        6 industry pages
│   │   ├── work/...              Case studies
│   │   ├── insights/...          Articles
│   │   ├── about/...             About hub
│   │   └── apply/page.tsx        Apply form
│   ├── api/                      API routes
│   │   ├── forms/apply/          Apply form submission
│   │   ├── forms/audit/          Audit request
│   │   ├── newsletter/           Beehiiv subscribe
│   │   └── sanity/revalidate/    CMS webhook → ISR
│   ├── layout.tsx                Root layout (fonts + metadata)
│   ├── sitemap.ts                Dynamic sitemap
│   └── robots.ts                 robots.txt
├── components/                   UI components
│   ├── ui/                       Primitives (Button, Input, Card)
│   ├── nav/                      GlobalNav, Footer, MobileDrawer
│   ├── hero/                     Hero variants
│   ├── cards/                    Card variants
│   ├── blocks/                   Layout blocks
│   ├── forms/                    Form components
│   └── article/                  Reading components
├── lib/                          Utilities
│   ├── sanity/                   Sanity client + queries
│   ├── seo/                      schema.org generators
│   └── analytics/                Plausible / Clarity / GA4
├── sanity/                       Sanity Studio
│   ├── schemas/                  7 content types
│   └── lib/                      Sanity helpers
├── styles/
│   └── globals.css               Brand tokens + Tailwind
├── public/                       Static assets
└── docs/                         Internal documentation
```

---

## Brand tokens (locked)

All colors, fonts, spacing live in `tailwind.config.ts` and `styles/globals.css`. **Pulled from live zeppstr.com** — do not invent new tokens.

| Token | Value | Use |
|---|---|---|
| `--color-brand-blue` | `#3147FF` | Nav links, accents, eyebrows |
| `--color-brand-yellow` | `#FFD031` | Primary CTA backgrounds |
| `--color-cta-text` | `#000000` | CTA text on yellow |
| `--color-ink-headline` | `#0A102F` | h1, h2, h3, dark sections |
| `--color-ink-body` | `#404040` | Body text |
| `--color-ink-muted` | `#69727D` | Captions, eyebrows, meta |
| `--color-bg-primary` | `#FFFFFF` | Page background |
| `--color-bg-secondary` | `#F8F8F6` | Cards, alt sections |
| `--color-bg-inverse` | `#0A102F` | Footer, dark sections |

**Typography:**
- Display: **Plus Jakarta Sans** — Hero H1 uses **weight 200** (extra-light). This is brand-defining. **Do NOT bulk to 700+.**
- Body: **Inter** (400 / 500 / 600)
- Mono: **JetBrains Mono** (data callouts only)

---

## Sanity setup

1. Create project at [sanity.io/manage](https://sanity.io/manage)
2. Copy project ID to `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
3. Generate an API token at sanity.io → Settings → API:
   ```
   SANITY_API_TOKEN=skXXXXX...
   ```
4. Run Studio: `pnpm sanity:dev` → opens at `localhost:3333`
5. Create one of each content type to verify schemas validate
6. Set up Sanity webhook: sanity.io → API → Webhooks → New
   - URL: `https://zeppstr.com/api/sanity/revalidate?secret=YOUR_SECRET`
   - Trigger on: Create / Update / Delete

### 7 content types

| Type | Purpose | Count expected |
|---|---|---|
| `solution` | The 5 Solutions (parent practice areas) | 5 |
| `subService` | The 23 elevated services | 23 |
| `industry` | The 6 industry pages | 6 |
| `caseStudy` | Case study story pages | 3+ flagship, more over time |
| `article` | Insights / blog posts | grows over time |
| `quote` | Reusable testimonials | grows |
| `clientLogo` | Client logo entries | 24 (current portfolio) |

---

## Component philosophy

- **Components are token-driven.** Never hardcode colors, fonts, or spacing — always use Tailwind utilities tied to `tailwind.config.ts`.
- **Server Components by default.** Add `"use client"` only when needed (forms, interactive UI).
- **Accessibility is non-negotiable.** Every interactive element must be keyboard-accessible with visible focus states. WCAG 2.1 AA minimum.
- **Mobile-first.** Build for 320px, then scale up.

---

## SEO

- Schema.org JSON-LD — generators in `lib/seo/`
- Sitemap auto-generated from Sanity content (see `app/sitemap.ts`)
- Meta titles ≤ 60 chars · Meta descriptions ≤ 160 chars
- Legacy URL redirects locked in `next.config.js` (16 mappings — DO NOT REMOVE)
- **SEO body-copy rule:** H1 uses elevated naming ("Organic Search Strategy"), H2 + body keeps legacy keywords ("SEO services") for ranking. See `/reference/elevated-naming.md`.

---

## Performance budget (locked)

| Metric | Target |
|---|---|
| LCP | < 1.5s on 4G mobile |
| CLS | < 0.05 |
| INP | < 200ms |
| Total page weight (Home) | < 500KB |
| JS bundle gzipped | < 200KB |
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO | 100 |

Run `pnpm build` then check the bundle analyzer output.

---

## Deployment

Production deploys automatically from `main` branch via Vercel.
Preview deploys auto-generated for every PR.

### Required Vercel env vars

See `.env.example` for the full list. All secrets must be set in Vercel project settings (never committed).

### DNS / domain

Production: `zeppstr.com` → Vercel
Staging: `staging.zeppstr.com` → Vercel preview

Lower DNS TTL to 300s 12 hours before cutover. See [DevOps runbook](../../../agents/08-devops.md) for full migration plan.

---

## What's built so far (this scaffold)

✅ Next.js 14 + TypeScript + Tailwind + ESLint + Prettier configured
✅ Brand tokens locked in CSS + Tailwind config
✅ Plus Jakarta Sans + Inter + JetBrains Mono loaded via `next/font`
✅ All 7 Sanity schemas built
✅ Sanity Studio configured with Desk structure
✅ Foundational components: Button, GlobalNav, Footer, HeroPrimary, TrustStrip, LogoStrip, ThesisBlock
✅ Home page shell using these components
✅ Sitemap + robots.txt
✅ 16 legacy URL redirects in `next.config.js`
✅ Security headers (HSTS, X-Frame-Options, etc.)
✅ Root layout with metadata + OG defaults

## What's NOT built yet (for the dev to do)

- [ ] Mega-menu component (Solutions + Industries dropdowns)
- [ ] Mobile drawer
- [ ] Solution hub page template (`app/(marketing)/solutions/[solution]/page.tsx`)
- [ ] Sub-service page template
- [ ] Industry page template
- [ ] Case study page template
- [ ] Article page template
- [ ] Apply form (multi-step, with Zod validation)
- [ ] Newsletter inline component
- [ ] schema.org JSON-LD generators per template
- [ ] Sanity GROQ queries (`lib/sanity/queries.ts`)
- [ ] Form API routes (`app/api/forms/apply/route.ts` etc.)
- [ ] Sanity webhook handler (`app/api/sanity/revalidate/route.ts`)
- [ ] Cal.com embed on Thank You page
- [ ] Plausible + Clarity + GA4 wiring
- [ ] Storybook setup
- [ ] Test setup (Vitest or Jest)

## Where to find specs

| Need | File |
|---|---|
| Full architecture | `../../../reference/architecture-v3.1.md` |
| Locked service naming | `../../../reference/elevated-naming.md` |
| Brand tokens detail | `../../../reference/brand-tokens.md` |
| Strategic POV / voice | `../../../reference/pov-and-thesis.md` |
| ICP / personas | `../../../reference/personas-and-icp.md` |
| Company facts | `../../../reference/company-facts.md` |
| Per-page copy | `../../../deliverables/content/` |
| Case study source data | `../../../brand-assets/case-studies/*/source-data.md` |
| Per-agent role + scope | `../../../agents/` |
| 10-week build sequence | `../../../project-flow.md` |
| Live tracker | `../../../tracker/project-tracker.md` |

---

## Contact

**Founder:** Nitish Kumar — nitish@zeppstr.com
**Project lead (Orchestrator):** see `agents/00-orchestrator.md`

---

## License

Proprietary. © Zeppstr Growth Media.
