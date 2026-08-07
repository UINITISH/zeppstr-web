# Zeppstr Web — Team Guide

The git workflow, branch strategy, PR process, and common tasks for the team working on `zeppstr.com`.

Stack: Next.js 14 App Router · Sanity CMS · Tailwind · Vercel · TypeScript.

---

## 0. One-time setup (lead dev / Nitish only)

### Push the project to GitHub

```bash
cd "/path/to/zeppstr-new-web/deliverables/code/zeppstr-web"

git init
git add .
git commit -m "chore: initial commit — Zeppstr web v1"
git branch -M main

# Create a private repo on github.com/<org>/zeppstr-web first, then:
git remote add origin git@github.com:<org>/zeppstr-web.git
git push -u origin main
```

Then connect the repo to Vercel:
1. Vercel dashboard → New Project → Import `zeppstr-web`
2. Framework preset: Next.js
3. Environment variables (Settings → Environment Variables):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET=production`
   - `SANITY_API_READ_TOKEN`
   - `HUBSPOT_TOKEN`
   - `SENTRY_DSN` (optional)
4. Deploy. Production branch = `main`. Preview branches = every other branch.

### Set branch protection

GitHub repo → Settings → Branches → Add rule for `main`:
- ☑ Require a pull request before merging
- ☑ Require at least 1 approval
- ☑ Require status checks (Vercel preview build) to pass
- ☑ Require branches to be up to date before merging

---

## 1. Daily developer workflow

### Clone + install

```bash
git clone git@github.com:<org>/zeppstr-web.git
cd zeppstr-web
npm install
cp .env.example .env.local   # ask the lead for actual values
npm run dev                  # http://localhost:3000
```

### Branch · code · commit · push · PR

```bash
# Always start from up-to-date main
git checkout main
git pull origin main

# Branch off main using the naming convention below
git checkout -b feat/conversion-optimization-page

# Code · commit using Conventional Commits format
git add app/...
git commit -m "feat(solutions): add conversion-optimization sub-service page"

# Push and open a PR
git push -u origin feat/conversion-optimization-page
```

Then on GitHub: open the PR, fill the template, request review.

---

## 2. Branch strategy

| Branch | What it's for | Who pushes to it |
|---|---|---|
| `main` | Production. Deploys to `zeppstr.com` automatically. | Nobody directly — only via merged PRs. |
| `feat/*` | New features (new pages, components, services) | Any dev |
| `fix/*` | Bug fixes | Any dev |
| `chore/*` | Tooling, config, deps, refactors | Any dev |
| `content/*` | Sanity content updates that need code support | Content team |
| `docs/*` | Documentation only | Any dev |

**Naming examples:**
- `feat/paid-search-page`
- `feat/footer-newsletter-form`
- `fix/lighthouse-cls-on-mobile`
- `chore/upgrade-next-to-14.2`
- `content/mini-leaves-case-study-refresh`

No long-lived `dev` branch. We trunk-based develop off `main` with short-lived feature branches.

---

## 3. Commit conventions

Use Conventional Commits — `<type>(<scope>): <subject>` — so the changelog can be auto-generated later.

**Types we use:**
- `feat` — new feature or page
- `fix` — bug fix
- `chore` — tooling, deps, refactors that aren't user-facing
- `style` — formatting, whitespace, CSS-only (no logic change)
- `content` — copy, content, or Sanity-schema updates
- `docs` — documentation only
- `perf` — performance improvement
- `test` — adding or fixing tests

**Scope = the part of the app touched.** Pick the most specific one:
- `(home)` `(solutions)` `(work)` `(industries)` `(insights)` `(forms)` `(nav)` `(footer)` `(cms)` `(sanity)` `(deps)`

**Examples:**
```
feat(solutions): add paid-social sub-service page
feat(forms): add HubSpot CRM sync to diagnostic intake
fix(nav): mobile drawer not closing on route change
fix(seo): missing canonical tags on case study pages
chore(deps): upgrade Next.js to 14.2.5
style(home): tighten hero stats strip spacing
content(work): refresh Mini Leaves case copy
perf(home): defer floating icons until after LCP
docs(team): add deploy runbook
```

**Subject rules:**
- Lowercase, present tense, no period
- Under 72 characters
- Should complete the sentence: "This commit will ___"

For larger work, write the body in the commit too:

```
feat(solutions): add demand-generation sub-service page

- DemandIceberg hero graphic (5% above / 95% below waterline)
- Two Different Jobs green comparison table
- First 30 Days week-by-week deliverables
- 4-stat practice numbers grid

Closes #42
```

---

## 4. Pull Request process

### Before opening a PR

- [ ] Branch is up to date with `main` (`git pull --rebase origin main`)
- [ ] `npm run lint` is clean
- [ ] `npm run typecheck` is clean (or `npx tsc --noEmit`)
- [ ] You've actually loaded the new page/feature in `localhost:3000` and clicked through it
- [ ] Lighthouse score on the touched page is **95+** mobile (Performance + SEO + a11y + best-practices)
- [ ] No console errors or warnings on the touched pages
- [ ] All new images are the right format + size (`.webp` or compressed `.jpg`, max 1600px wide)

### Opening the PR

Use the PR template (`.github/PULL_REQUEST_TEMPLATE.md`). Required fields:
- **What's changing** — one-line summary
- **Why** — link the brief / issue / Slack thread
- **Preview URL** — Vercel auto-generates it; paste it
- **Lighthouse** — paste mobile score for the most-touched page
- **Risk / blast radius** — what could break? what regression-tested?

Request review from at least one other dev. Tag Nitish on visual/design changes.

### Reviewer checklist

The reviewer is reading the diff *and* clicking through the preview URL. They check:

**Correctness**
- [ ] Code does what the PR title claims
- [ ] No TypeScript errors, no `any` without a comment justifying it
- [ ] No console errors on the preview URL
- [ ] Routes resolve; back/forward navigation works

**Design system fidelity**
- [ ] Uses `bg-bg-primary`, `bg-emerald-900`, `bg-brand-yellow`, `text-ink-headline`, `text-ink-body` — not raw hex
- [ ] H1/H2 use `font-bold tracking-[-0.025em] text-[clamp(...)] text-balance` pattern
- [ ] Yellow highlights use `bg-brand-yellow px-3 py-0.5 box-decoration-clone`
- [ ] No new colors, no new fonts, no new shadows introduced
- [ ] CTAs follow the brand block (green bg + white text + yellow button) rule

**Performance**
- [ ] Images use `next/image` with proper `width`, `height`, `sizes`
- [ ] No `'use client'` on pages that don't need interactivity
- [ ] No layout shift on the touched components (check CLS)
- [ ] Lighthouse mobile score 95+ on the touched page

**SEO**
- [ ] Page has `metadata` export with `title` and `description`
- [ ] Internal links use `next/link`, not raw `<a>`
- [ ] Headings are semantic (one `<h1>`, proper `<h2>`/`<h3>` hierarchy)

**Accessibility**
- [ ] All `aria-labelledby` references resolve
- [ ] Buttons have accessible labels (not just icons)
- [ ] Focus states visible (yellow focus ring)
- [ ] Color contrast passes WCAG AA on green sections

**Content & voice**
- [ ] Copy is in Zeppstr voice (operating-system framing, no agency-speak)
- [ ] Stats are real (no fabricated case-study numbers)
- [ ] Brand block discipline: green = serious claims, yellow = highlights, white = body

### Merging

- Squash-merge from the GitHub UI (keeps history clean — one commit per feature)
- The squash commit subject = PR title (Conventional Commit format)
- Delete the branch after merge
- Vercel auto-deploys to production on merge

---

## 5. Deploy & rollback

### Deploy
Automatic. Every merge to `main` triggers a production deploy on Vercel. Preview deploys for every other branch.

### Rollback
1. Vercel dashboard → Deployments
2. Find the last good deploy → click `⋯` → **Promote to Production**
3. Then in code: revert the bad commit on `main`

```bash
git checkout main
git pull
git revert <bad-commit-sha>
git push origin main
```

### Sanity content rollback
Sanity has its own document history. Studio → document → History panel → restore a previous version. No code involved.

---

## 6. Common tasks

### Add a new sub-service page

The pattern is locked. Every sub-service page follows the same 11-section structure.

1. Branch:
   ```bash
   git checkout -b feat/<slug>-page
   ```
2. Create the route folder:
   ```bash
   mkdir -p "app/(marketing)/solutions/<parent-slug>/<service-slug>"
   ```
3. Create the page:
   ```bash
   cp "app/(marketing)/solutions/performance-media/paid-search/page.tsx" \
      "app/(marketing)/solutions/<parent-slug>/<service-slug>/page.tsx"
   ```
4. Build the unique hero graphic in `components/utility/<GraphicName>.tsx`. **Every sub-service has a different graphic shape** — see existing ones for the drafting aesthetic (corner ticks, mono labels, hairline rules, yellow accent).
5. Customize the 11 sections in the new page. Don't copy content between pages — each page has a distinct POV, hero stats, principles, catalog, and CTA.
6. Update content, principles, FAQ, numbers. Voice = Zeppstr POV (see `docs/zeppstr-voice.md`).
7. Run `npm run typecheck` until clean.
8. Test the route locally.
9. Open a PR.

### Update existing copy on a page

1. Branch: `content/<page>-<what>`
2. Find the page file — copy lives in TypeScript arrays at the top of the page file (`PRINCIPLES`, `FAQS`, `HERO_STATS`, etc.) — not in JSX.
3. Edit the arrays, not the JSX.
4. Commit with `content(<scope>): refresh <what>`.

### Add a new case study

Case studies are in Sanity, not code.

1. Sanity Studio → Case Study → Create
2. Fill: client name, slug, hero image (1600px wide), headline metric, body sections
3. Publish
4. The case appears at `/work/<slug>` automatically (ISR will refresh within 60s in production)
5. To feature on the home page: add the slug to `STATIC_FEATURED_CASES` in `app/(marketing)/page.tsx` and add a screenshot to `public/case-screenshots/<slug>.jpg`

### Fix a Lighthouse regression

1. Branch: `perf/<what>`
2. Reproduce locally:
   ```bash
   npm run build
   npm run start
   # then run Lighthouse mobile against http://localhost:3000/<route>
   ```
3. Common causes:
   - Image not using `next/image` → fix
   - Heavy client-side JS → check for unnecessary `'use client'`
   - Web font not preloaded → check `app/layout.tsx`
   - Layout shift → add explicit width/height to images
4. Lighthouse mobile score must be 95+ before merging.

### Update environment variables

Never commit `.env.local`. Always update via:
1. Update in Vercel dashboard → Project → Settings → Environment Variables
2. Redeploy (Vercel will offer to)
3. Add the variable name (not value) to `.env.example` for future devs
4. Document the variable in this file under section 9

---

## 7. Code style

- TypeScript strict mode is on. Don't disable it per-file.
- Prefer `function` declarations for components, not arrow functions assigned to `const`.
- Components stay under 400 lines. If longer, split into sub-components.
- Tailwind class order: `display layout typography color state` — let Prettier sort it.
- No `console.log` in committed code (use Sentry breadcrumbs if you need to track something).
- Don't use `any`. If you must, comment why.
- Server components by default. Add `'use client'` only when you actually use state or browser APIs.

---

## 8. Project structure (orientation)

```
app/
├── (marketing)/          ← public site
│   ├── page.tsx          ← home
│   ├── solutions/
│   │   ├── [slug]/page.tsx              ← parent solution (Sanity-driven)
│   │   ├── [slug]/[service]/page.tsx    ← sub-service (Sanity-driven, fallback)
│   │   ├── brand-engagement-lifecycle/  ← hard-coded sub-services
│   │   ├── experience-engineering/
│   │   ├── growth-strategy-advisory/
│   │   ├── organic-growth/
│   │   └── performance-media/
│   ├── work/             ← case studies
│   ├── insights/         ← The Brief (blog)
│   ├── industries/
│   ├── contact/
│   ├── book-consultation/← Diagnostic intake form
│   └── thank-you/
├── api/                  ← API routes (forms, revalidate)
└── layout.tsx

components/
├── blocks/               ← Page sections (Manifesto, Methodology, etc.)
├── cards/                ← Card components (case study, insight)
├── forms/                ← Form components (DiagnosticIntake)
├── nav/                  ← GlobalNav, Footer, MegaMenu, MobileDrawer
├── ui/                   ← Button, Input — primitives
└── utility/              ← Hero graphics, AnimatedHeadline, etc.

sanity/
├── lib/                  ← Sanity client, queries, types
└── schemas/              ← Document schemas

lib/
├── practice-content.ts   ← Hard-coded sub-service content map
└── cn.ts                 ← Tailwind class merger

public/
├── case-screenshots/     ← 1600px JPGs for case tiles
├── client-logos/         ← PNG logos
└── ...
```

---

## 9. Environment variables

Copy `.env.example` to `.env.local` and fill in values. Ask Nitish or the lead dev for the actual secrets.

| Variable | Purpose | Required |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | Yes |
| `NEXT_PUBLIC_SANITY_DATASET` | Defaults to `production` | Yes |
| `SANITY_API_READ_TOKEN` | Server-side Sanity reads | Yes |
| `SANITY_API_WRITE_TOKEN` | Only for seed scripts | Local only |
| `HUBSPOT_TOKEN` | CRM sync from diagnostic form | Yes |
| `NEXT_PUBLIC_VERCEL_URL` | Auto-set by Vercel | Auto |
| `SENTRY_DSN` | Error tracking | Recommended |

---

## 10. Who to ask

| Question | Person |
|---|---|
| Design / content / voice / POV | Nitish |
| Sanity schemas / CMS | Lead dev |
| Vercel / deploy / DNS | Lead dev |
| HubSpot / form integrations | Lead dev |
| Specific page POV or hero graphic | Nitish |

---

## 11. Pre-launch checklist (one-off)

Before pointing DNS at the new site:

- [ ] All sub-service pages built (see `docs/page-inventory.md` for the full list)
- [ ] Lighthouse mobile 95+ on every page in the sitemap
- [ ] 301 redirect map built from old WordPress URLs (see Architecture v3.1)
- [ ] Sanity production dataset seeded with all case studies, solutions, insights
- [ ] HubSpot integration tested end-to-end with a real submission
- [ ] Sitemap.xml and robots.txt published
- [ ] Google Search Console verified for the new property
- [ ] GA4 + GTM tags installed and tested
- [ ] Sentry catching errors in production
- [ ] DNS cutover scheduled with rollback plan documented
- [ ] Post-launch monitoring dashboard live

---

*Last updated: May 2026*
