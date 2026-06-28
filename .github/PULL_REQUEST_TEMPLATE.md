# PR

## What's changing
<!-- One-line summary. Imperative voice. -->

## Why
<!-- Link the brief, issue, Slack thread, or design. If none, explain the trigger. -->

## Preview URL
<!-- Vercel auto-generates one — paste it here once it's ready. -->
- Preview: https://zeppstr-web-<branch>-<org>.vercel.app
- Routes touched:
  - `/...`

## Lighthouse (mobile)
<!-- Run against the most-touched page. Must be 95+ to merge. -->
- Page: `/...`
- Performance: __ / 100
- Accessibility: __ / 100
- Best Practices: __ / 100
- SEO: __ / 100

## Risk / blast radius
<!-- What could break? What did you regression-test? -->
- Affected pages:
- Affected components:
- Tested in:
  - [ ] Desktop Chrome
  - [ ] Mobile Safari (or DevTools mobile view)
  - [ ] Dark fonts on yellow / green sections

## Checklist (author)
- [ ] Branch up to date with `main`
- [ ] `npm run lint` clean
- [ ] `npm run typecheck` (or `npx tsc --noEmit`) clean
- [ ] Loaded the new page/feature in `localhost:3000` and clicked through
- [ ] No console errors on the touched pages
- [ ] Lighthouse mobile 95+
- [ ] New images compressed (`.webp` or `.jpg`, max 1600px wide)
- [ ] No new colors, fonts, or shadows introduced
- [ ] Copy is in Zeppstr voice (operating-system framing, no agency-speak)

## Checklist (reviewer)
- [ ] Code does what the title claims
- [ ] Design tokens used (no raw hex)
- [ ] Server components by default; `'use client'` only where needed
- [ ] Semantic headings (`<h1>` once, proper hierarchy)
- [ ] `metadata` export present with title + description
- [ ] Internal links use `next/link`
- [ ] Focus states visible on interactive elements
- [ ] No accidental commits of `.env.local`, `node_modules`, build output

## Notes for the next dev
<!-- Anything subtle, intentional, or worth knowing later. -->
