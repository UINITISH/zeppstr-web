# Zeppstr — Brand Guidelines

**Version 1.0 · Compiled 2026-06-28**
Source of truth: live `zeppstr.com` + `zeppstr-web` codebase (Next.js / Tailwind brand tokens, site copy, Sanity content).
Purpose: a single reference so every off-site channel — social, ads, email, decks, PR, partner pages — sounds and looks like Zeppstr.

---

## 1. Brand at a glance

| | |
|---|---|
| **Name** | Zeppstr |
| **Category** | Strategic growth / digital marketing & SEO consultancy |
| **One-liner** | The strategic growth partner for ambitious businesses. |
| **HQ / market** | India-based, global clients (India, Australia, Japan, and more) |
| **Primary contact** | nitish@zeppstr.com · zeppstr.com |
| **Core idea** | Don't add channels — build the architecture beneath them. |

---

## 2. Positioning & messaging

### The thesis (memorize this)
> **"Growth stalls. The reflex is to add — another agency, another platform, another channel. The constraint was never the channels. It was the architecture beneath them."**

Zeppstr does not sell channels or tactics. It sells the **structural layer underneath marketing** — positioning, journey, measurement, conversion — that makes every channel compound instead of leak.

### Hero / lead message
- **Headline:** *Strategic growth planning for ambitious businesses.*
- **Subhead:** *Zeppstr is the strategic growth partner for ambitious businesses. We build the system underneath your marketing — so every channel, every campaign, every rupee compounds.*

### Manifesto line
> **"We don't add channels. We build the layer above them."**
> Positioning. Journey. Measurement. Conversion. The structural layer beneath every channel — the difference between growth that compounds and spend that disappears.

### Messaging pillars (use these as content buckets)
1. **Architecture over channels** — the system beneath marketing is the real lever.
2. **Compounding, not spending** — growth that builds on itself vs. spend that disappears.
3. **One system, operated** — every channel run as a single coordinated system, not silos.
4. **Proof over promises** — outcomes, revenue, and named client results lead the story.
5. **Accountable to one number** — a single north-star revenue metric, reviewed board-style.

### Tagline / repeatable phrases
- "Same playbook. **Outsized** results."
- "Five practices. Built to **compound** revenue."
- "Notes from **inside** the work." (content/insights)
- "Diagnose. **Architect.** Deploy. Operate." (methodology)
- "The architecture beneath them."

---

## 3. Voice & tone

**Personality:** Senior strategist. Confident, contrarian, calm. The expert in the room who says less and means more. Editorial, not advertise-y. Never hypey, never emoji-stuffed, never "growth-hacker" slang.

**Voice principles**
- **Declarative & short.** Fragments are allowed and on-brand. "The constraint was never the channels." Let sentences land.
- **Contrarian framing.** Name the common reflex, then reframe it. ("The reflex is to add… The constraint was never the channels.")
- **Systems language.** Architecture, layer, system, compound, leak points, north-star metric, operating model.
- **Proof-forward.** Lead with outcomes and real numbers, attributed to named clients.
- **Quiet confidence.** No exclamation marks, no "game-changing," no "revolutionary." The biggest statements are set in the quietest type.
- **Plain, precise nouns.** Diagnose, architect, deploy, operate. Avoid jargon soup and acronym spam.

**Do**
- "We rebuild the layer until the channels work because of it, not despite it."
- "One north-star revenue metric, accountable."
- "Strategic audit. Written diagnostic. Identified leak points. 90-day plan."

**Don't**
- ❌ "🚀 Unlock explosive growth with our game-changing strategies!!!"
- ❌ "We're a passionate, results-driven team of digital ninjas."
- ❌ Overusing "synergy," "leverage" (as filler), "best-in-class."

**Tone by channel**
- **LinkedIn / thought leadership:** essayistic, POV-driven, contrarian hooks. ("Field Notes" / "Notes from inside the work.")
- **Paid ads:** one idea, oversized. Outcome + proof number + single CTA.
- **Email:** direct, diagnostic, a single clear next step (audit / diagnostic / consultation).
- **Decks / proposals:** editorial typographic restraint; let one statement own each slide.

---

## 4. Color system

Pulled directly from the locked brand tokens (`tailwind.config.ts` / `globals.css`).

### Core brand
| Token | Hex | Use |
|---|---|---|
| **Brand Blue** | `#3147FF` | Primary brand accent, links, focus, interactive emphasis |
| **Brand Yellow** | `#FFD031` | Signature highlight — key-word marker, accent squares, CTAs |
| Brand Yellow (hover) | `#F5C012` | Hover state for yellow CTAs |

### Ink (text)
| Token | Hex | Use |
|---|---|---|
| Ink Headline | `#0A102F` | Headlines, dark UI, near-black navy |
| Ink Body | `#404040` | Body copy |
| Ink Muted | `#69727D` | Secondary / supporting text, eyebrows |
| Ink Soft | `#585450` | Soft warm-grey accents |

### Backgrounds
| Token | Hex | Use |
|---|---|---|
| BG Primary | `#FFFFFF` | Default canvas |
| BG Secondary | `#F8F8F6` | Warm off-white section breaks |
| BG Inverse | `#0A102F` / `#064E3B` | Dark navy or deep emerald-green brand blocks |
| Rule / border | `#E5E7EB` | Hairline dividers |
| CTA text | `#000000` | Text on yellow CTAs |

**The signature move:** key words highlighted with a **yellow box** (`bg-brand-yellow`, small padding) inside an otherwise black headline — e.g. "Same playbook. <mark>Outsized</mark> results." Use sparingly: one or two highlighted words per headline, max.

**Usage ratio:** ~70% white / off-white space, ~20% near-black navy ink, ~10% accent (yellow primary, blue secondary, emerald for the occasional full-bleed block). Yellow is a spotlight, not a background — protect its impact by using it rarely.

---

## 5. Typography

**Type family (web):** Plus Jakarta Sans (display/brand), Inter (body), JetBrains Mono (mono tags). The live token system unifies most surfaces onto the body sans; mono is used for uppercase, letter-spaced "tag" labels.

> **Brand-defining rule:** the hero uses an **ultra-light (200 / extralight)** weight at large display sizes. Do NOT bulk the big display type up to bold/700+ — the airy thin headline IS the brand. Bold is reserved for mid-size section headers.

**Type roles**
- **Display / hero:** extralight, very large `clamp(40–84px)`, tight tracking (`-0.04em`), line-height ~1.05.
- **Section headers:** bold, `clamp(44–104px)`, tracking `-0.025em`.
- **Eyebrow / tag (the "mono" feel):** ~11–13px, UPPERCASE, wide letter-spacing (`0.15–0.2em`), muted grey. Examples used on site: `POV`, `Selected Work`, `Practice`, `Field Notes`, `Approach`.
- **Body:** 16px, line-height 1.6; large body 19px.

**Type scale (locked):** display-xl, display-lg, display-md, display-sm, body-lg, body, body-sm, button, eyebrow. Reading width capped at **720px**; layout max **1280px**.

**Off-platform fallbacks:** if Plus Jakarta Sans isn't available, use a clean geometric/grotesk sans (e.g. system UI sans). Keep the thin-hero + uppercase-mono-eyebrow contrast intact.

---

## 6. Visual & layout language

- **Editorial, not "agency-flashy."** Generous whitespace, hairline rules, large type, restraint. The homepage's "quietest-loudest moment" is pure type with nothing to click — emulate that confidence.
- **Drafting / blueprint motif.** Corner ticks, coordinate marks, mono labels ("BRAND OPERATING SYSTEM — v1.0", "04 / LAYERS"), subtle grid overlays — a sense of a system being *engineered*.
- **Lists over card grids.** Services shown as a numbered editorial list (01–05) rather than a card wall.
- **Yellow accent square** (`2.5×2.5` solid yellow block) as a recurring small marker.
- **Geometry:** border radii 6 / 8 / 12 / 16px. Hairline borders at low opacity over navy.
- **Motion:** smooth easing `cubic-bezier(0.16, 1, 0.3, 1)`; hover 150ms, default 300ms, page 600ms. Calm, not bouncy.
- **Imagery:** real client website screenshots and outcome metrics over stock photography.

---

## 7. The methodology (use as a content/sales framework)

**Diagnose → Architect → Deploy → Operate**

1. **Diagnose** — Strategic audit. Written diagnostic. Identified leak points. 90-day plan.
2. **Architect** — Revenue system designed: positioning, journey, measurement framework.
3. **Deploy** — Run via the 5 Solutions or handed to your team. Channels operated as one system.
4. **Operate** — Monthly board-style reviews. One north-star revenue metric, accountable.

---

## 8. The five practices

(Top-level solutions — "Five practices. Built to compound revenue.")
1. **Growth Strategy & Advisory** — strategy, operating model, diagnostics, fractional leadership.
2. **Organic Growth Practice** — organic search, content architecture, technical SEO, authority/digital PR, local search.
3. **Performance Media** — paid search & social, programmatic, attribution & measurement, creative, retargeting/lifecycle.
4. **Experience & Engineering** — web dev, conversion optimization (CRO), UX research, analytics instrumentation.
5. **Brand, Engagement & Lifecycle** — brand identity & expression, lifecycle email & SMS, video/multi-format content.

**Industries served:** SaaS / Tech · Fintech · Real Estate · E-commerce / D2C · Healthcare & Wellness · EdTech / Education · Professional Services.

---

## 9. Proof points (lead with these)

| Metric | Result | Client |
|---|---|---|
| Revenue lift | **AUD 40K → AUD 2.7M in 6 months** | Wise Market — Australian e-commerce |
| Conversion rate | **0.5% → 3%+, ₹60L+/month run rate** | Mini Leaves — Indian DTC consumer brand |
| Demand reach | 3 premium flats sold direct from generated leads | Tru Aquapolis — Indian premium real estate |

**Named clients to reference:** Prohance, 21 Finance, Empuls, Prestige Group, Aishwarya Interiors, Fixstars (Tokyo), Tristar Online (Australia), Wise Market, Mini Leaves, Tru Aquapolis.

> When in doubt on any channel: **lead with the outcome, attribute it to the named client, then connect it back to the architecture thesis.**

---

## 10. Calls to action

Primary CTAs used on site (reuse verbatim for consistency):
- **View Selected Work** → `/work`
- **Apply for a diagnostic** → `/book-consultation`
- **Read the full POV** → `/about/our-pov`

CTA styling: yellow button, black text, single clear action per view. Keep CTA copy outcome- or diagnostic-oriented ("Apply for a diagnostic"), never generic ("Learn more / Click here").

---

## 11. Quick checklist before publishing anywhere

- [ ] Does it lead with the **architecture-over-channels** idea or a **named proof point**?
- [ ] Is the headline confident and short, no hype words / exclamation marks?
- [ ] Colors: white space dominant, navy ink, yellow used as a *single* spotlight?
- [ ] Display type thin/airy (not bulked to bold) where it's the hero?
- [ ] Uppercase, letter-spaced **mono eyebrow** label present?
- [ ] One clear, outcome-oriented CTA?
- [ ] Tone = senior strategist, not excited salesperson?
