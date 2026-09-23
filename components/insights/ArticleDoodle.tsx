import * as React from "react";
import { DOODLES, DOODLE_NAMES, type DoodleName } from "@/components/insights/doodles";

/**
 * ArticleDoodle — a doodle collage built from the article's own title.
 *
 * ── THE BUG THIS FIXES ──────────────────────────────────────────────────────
 * Vikas, 23 Sep: "Now you have used same vector images in all the articles."
 * Correct, and the cause is not subtle. The previous fallback was keyed by
 * CATEGORY, and ten of the twelve live articles sit in "SEO & Search", so ten
 * cards rendered the identical mark. A per-category image on a single-category
 * blog is a constant.
 *
 * ── THE RULE NOW ────────────────────────────────────────────────────────────
 * The image is a function of the SLUG, not the category. Two things vary:
 *
 *   WHICH doodles appear — matched against keywords in the title, so an email
 *   article gets an envelope and a local-SEO article gets a map pin. If the
 *   title yields too few matches, the remainder is filled deterministically
 *   from the library by slug hash, never at random (random breaks SSR: server
 *   and client would draw different pictures and React would scream).
 *
 *   WHERE they sit — position, scale, rotation and which one is yellow all
 *   come from the same hash. Two articles with an identical keyword set still
 *   produce different compositions.
 *
 * Net effect: a collision needs the same slug, which cannot happen.
 *
 * ── ON THE REFERENCE IMAGES ─────────────────────────────────────────────────
 * The style brief was a page of Shutterstock/Vecteezy doodle sets. Style taken,
 * files not — see the note in doodles.tsx. Buying a doodle pack would land us
 * back where the Magnific photographs did: the same licensed art as every other
 * agency using the same search term.
 */

/* Keyword → doodle. Longest match wins, so "email marketing" beats "marketing".
   Order matters here; it is scanned top to bottom. */
const KEYWORDS: Array<[RegExp, DoodleName]> = [
  [/\b(email|newsletter|inbox|subject line)\b/i, "envelope"],
  [/\b(local|near me|gmb|google business|map|city|store)\b/i, "pin"],
  [/\b(video|youtube|reel|shorts|watch)\b/i, "play"],
  [/\b(mobile|app|phone|device|responsive)\b/i, "mobile"],
  [/\b(ecommerce|e-commerce|shop|cart|product page|checkout|d2c)\b/i, "cart"],
  [/\b(budget|spend|cost|cpc|cpa|pricing|roi|roas|revenue|profit)\b/i, "wallet"],
  [/\b(backlink|link building|links?|referring domain)\b/i, "link"],
  [/\b(social|instagram|linkedin|hashtag|community|influencer)\b/i, "hashtag"],
  [/\b(ads?|advertis|ppc|campaign|paid|promot|brand awareness)\b/i, "megaphone"],
  [/\b(review|rating|reputation|testimonial|star)\b/i, "star"],
  [/\b(audit|checklist|process|framework|step|guide|how to)\b/i, "checklist"],
  [/\b(technical|schema|crawl|index|sitemap|core web|speed|tool)\b/i, "gear"],
  [/\b(content|blog|article|copy|writing|word)\b/i, "document"],
  [/\b(funnel|lead|conversion|convert|nurtur|pipeline)\b/i, "funnel"],
  [/\b(analytic|data|metric|report|track|measur|dashboard|traffic)\b/i, "barChart"],
  [/\b(growth|increase|trend|rank(ing)?s?|improve|scale|result)\b/i, "lineChart"],
  [/\b(target|audience|persona|segment|intent|keyword research)\b/i, "target"],
  [/\b(launch|start|begin|new|2026|future|next)\b/i, "rocket"],
  [/\b(time|hour|fast|quick|delay|wait|month|week)\b/i, "clock"],
  [/\b(click|ctr|cta|button|user|behaviour|behavior|ux)\b/i, "cursor"],
  [/\b(strateg|idea|think|why|insight|lesson|mistake)\b/i, "bulb"],
  [/\b(seo|search|serp|query|google|rank)\b/i, "magnifier"],
  [/\b(website|site|page|landing|design|web)\b/i, "laptop"],
  [/\b(trust|engagement|share|like|loyal|retention)\b/i, "thumbsUp"],
  [/\b(alert|notification|update|announce|news)\b/i, "bell"],
  [/\b(calendar|schedule|plan|annual|quarterly|monthly)\b/i, "calendar"],
];

/** FNV-1a. Deterministic, dependency-free, and identical on server and client. */
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Small LCG so one slug yields a whole stream of stable pseudo-random values. */
function rng(seed: number) {
  let s = seed || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function gcd(a: number, b: number): number {
  while (b) [a, b] = [b, a % b];
  return a;
}

function pickDoodles(title: string, slug: string, want: number): DoodleName[] {
  const chosen: DoodleName[] = [];
  for (const [re, name] of KEYWORDS) {
    if (chosen.length >= want) break;
    if (re.test(title) && !chosen.includes(name)) chosen.push(name);
  }
  /* Top up deterministically from the library, walking by a slug-derived
     stride so different slugs top up with different symbols.

     THE STRIDE MUST BE COPRIME WITH THE LIBRARY SIZE. Stepping by k through n
     slots only visits n / gcd(n, k) of them. With 26 doodles, a stride of 13
     reaches two slots and the top-up starves — "zero-conversions-147-leads"
     and "seo-beginners-guide" both drew 3 icons where 5 were asked for, and
     it looked like a design choice rather than a bug. Nudging the stride up
     until gcd is 1 guarantees the walk covers the whole library, whatever
     size it grows to. */
  const n = DOODLE_NAMES.length;
  const h = hash(slug);
  let stride = 1 + (h % (n - 1));
  while (gcd(stride, n) !== 1) stride = (stride % (n - 1)) + 1;

  let i = h % n;
  for (let step = 0; step < n && chosen.length < want; step++) {
    const cand = DOODLE_NAMES[i % n];
    if (!chosen.includes(cand)) chosen.push(cand);
    i += stride;
  }
  return chosen;
}

/**
 * Scatter positions on a jittered grid rather than pure random placement.
 * Pure random overlaps and clumps; a grid with jitter looks casually arranged,
 * which is the point of a doodle collage.
 */
function layout(count: number, next: () => number) {
  const cols = count > 5 ? 3 : 2;
  const rows = Math.ceil(count / cols);
  const cellW = 300 / cols;
  const cellH = 190 / rows;
  return Array.from({ length: count }, (_, i) => {
    const cx = (i % cols) * cellW + cellW / 2;
    const cy = Math.floor(i / cols) * cellH + cellH / 2;
    const size = 40 + next() * 26;
    return {
      x: 18 + cx + (next() - 0.5) * cellW * 0.38 - size / 2,
      y: 14 + cy + (next() - 0.5) * cellH * 0.38 - size / 2,
      size,
      rot: (next() - 0.5) * 26,
    };
  });
}

export function ArticleDoodle({
  title,
  slug,
  label,
  className = "",
}: {
  title: string;
  slug: string;
  label?: string;
  className?: string;
}) {
  const seed = hash(slug);
  const next = rng(seed);

  const count = 5 + (seed % 3); // 5, 6 or 7
  const names = pickDoodles(title, slug, count);
  const spots = layout(count, next);
  const accent = seed % count; // which one is yellow

  return (
    <div
      className={`relative overflow-hidden bg-bg-inverse ${className}`}
      aria-hidden="true"
    >
      {/* Same hairline drafting grid as the hero, so article artwork and the
          homepage read as one system. */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#FFF 1px,transparent 1px),linear-gradient(to bottom,#FFF 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <svg
        viewBox="0 0 336 218"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        className="relative h-full w-full"
        role="presentation"
      >
        {names.map((name, i) => {
          const Doodle = DOODLES[name];
          const p = spots[i];
          const isAccent = i === accent;
          return (
            <g
              key={`${name}-${i}`}
              transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.rot.toFixed(
                1,
              )} ${(p.size / 2).toFixed(1)} ${(p.size / 2).toFixed(1)}) scale(${(
                p.size / 100
              ).toFixed(3)})`}
              stroke={isAccent ? "#FFD031" : "rgba(255,255,255,0.5)"}
              strokeWidth={isAccent ? 6 : 5}
            >
              <Doodle />
            </g>
          );
        })}
      </svg>

      {label ? (
        <span className="absolute bottom-3 left-4 font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
          {label}
        </span>
      ) : null}
    </div>
  );
}
