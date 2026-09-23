import * as React from "react";
import { CategoryMotif } from "@/components/insights/CategoryMotif";
import { ArticleDoodle } from "@/components/insights/ArticleDoodle";

/**
 * ArticleDiagram — a drawing of what the article actually argues.
 *
 * ── WHY THIS REPLACED PHOTOGRAPHY ───────────────────────────────────────────
 * Vikas, 23 Sep: "read the article, see what the article is explaining, and use
 * doodles to show the relevancy of the article, or put some graphs or charts.
 * The image should match the article, the H1 of the article, or the blog. There
 * should not be any generic image taken from Splash or Magnific."
 *
 * Two attempts preceded this and both failed for the same reason. First came
 * generated covers — title text on a gradient. Then Magnific stock, which was
 * twenty-eight variations of a person at a laptop. Then architecture and
 * shadow photography, which was better-looking and still decorative: a picture
 * of a concrete wall tells a reader nothing about crawl budget.
 *
 * The problem was never which photographs. It was that a photograph of
 * something unrelated is a placeholder however good it looks. An article about
 * thirty-three creatives and five winners should show thirty-three creatives
 * and five winners.
 *
 * ── HOW IT WORKS ────────────────────────────────────────────────────────────
 * Keyed by slug. Each entry is drawn from the figures in that specific piece,
 * so the image is an illustration of the argument rather than an accompaniment
 * to it. No two are alike, because no two articles are.
 *
 * A slug with no entry falls back to a neutral mark rather than to a stock
 * photo — see FALLBACK at the foot of this file. An honest blank beats a
 * borrowed picture.
 *
 * ── ADDING ONE ──────────────────────────────────────────────────────────────
 * Read the piece. Find the one comparison or count the argument turns on. Draw
 * that, with its real numbers, and nothing else. If an article has no such
 * figure, it probably has no argument yet.
 */

const INK = "#0A102F";
const EMERALD = "#064E3B";
const YELLOW = "#FFD031";
const MONO = "var(--font-mono), ui-monospace, monospace";

type Props = { className?: string };

function Frame({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  /**
   * "meet", not "slice", and a wrapper that carries the background.
   *
   * With slice the SVG is cropped to fill its box. The cards on /insights are
   * roughly square while this viewBox is 1.6:1, so slice cut about 120px off
   * each side — taking the left-hand labels and half the motif with it. A
   * diagram that loses its labels is not a diagram.
   *
   * meet fits the whole drawing inside the box. The letterboxing that leaves
   * is filled by the wrapper in the same paper colour, so it is invisible.
   */
  return (
    <div className={`w-full h-full bg-[#F8F8F6] ${className}`}>
      <svg
        viewBox="0 0 640 400"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        role="img"
        aria-label={title}
      >
        <rect width="640" height="400" fill="#F8F8F6" />
      {/* Hairline drafting grid — the same paper the site's diagrams sit on. */}
      <g stroke={INK} strokeOpacity="0.05" strokeWidth="1">
        {Array.from({ length: 16 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="400" />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="640" y2={i * 40} />
        ))}
      </g>
        {children}
      </svg>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * "Eighty-six percent of your leads come from five ads.
 *  The skill is deleting the rest."
 *
 * Thirty-three tiles. Five filled. The picture IS the sentence.
 * ──────────────────────────────────────────────────────────────────────────── */
function CreativeConcentration() {
  const COLS = 11;
  const W = 40;
  const H = 26;
  const GAP = 8;
  const X0 = 60;
  const Y0 = 132;
  // The five winners, scattered rather than adjacent — that is how they arrive.
  const WINNERS = new Set([2, 9, 14, 21, 28]);

  return (
    <Frame title="Thirty-three creatives tested; five of them carried 86% of the leads.">
      <text x="60" y="58" fontFamily={MONO} fontSize="13" letterSpacing="1.8" fill={INK} fillOpacity="0.5">
        33 CREATIVES TESTED
      </text>
      <text x="60" y="92" fontFamily="var(--font-display), sans-serif" fontSize="34" fontWeight="300" fill={INK} letterSpacing="-1">
        5 carried <tspan fill={EMERALD} fontWeight="500">86%</tspan> of the leads
      </text>

      {Array.from({ length: 33 }).map((_, i) => {
        const x = X0 + (i % COLS) * (W + GAP);
        const y = Y0 + Math.floor(i / COLS) * (H + GAP);
        const win = WINNERS.has(i);
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={W}
            height={H}
            fill={win ? YELLOW : "none"}
            stroke={win ? YELLOW : INK}
            strokeOpacity={win ? 1 : 0.22}
            strokeWidth="1"
          />
        );
      })}

      <text x="60" y="292" fontFamily={MONO} fontSize="11" letterSpacing="1.3" fill={INK} fillOpacity="0.42">
        THE OTHER 28 ARE THE WORK — RETIRING THEM IS WHAT THE BUDGET BUYS
      </text>
      <line x1="60" y1="312" x2="580" y2="312" stroke={INK} strokeOpacity="0.15" />
      <text x="60" y="336" fontFamily={MONO} fontSize="10" letterSpacing="1.2" fill={INK} fillOpacity="0.35">
        TRU AQUAPOLIS · META · PUBLISHED IN FULL
      </text>
    </Frame>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * "Zero conversions on the platform, 147 in the CRM"
 *
 * The same month, two scoreboards. A bar of height zero makes the point
 * faster than any sentence can.
 * ──────────────────────────────────────────────────────────────────────────── */
function AttributionGapArticle() {
  const base = 300;
  const h = 150;
  return (
    <Frame title="The ad platform reported zero conversions in a month the CRM held 147.">
      <text x="60" y="58" fontFamily={MONO} fontSize="13" letterSpacing="1.8" fill={INK} fillOpacity="0.5">
        ONE MONTH · TWO SCOREBOARDS
      </text>

      <line x1="60" y1={base} x2="580" y2={base} stroke={INK} strokeOpacity="0.2" />

      {/* Platform: nothing. Ghost outline so an absent bar cannot be mistaken
          for a rendering fault. */}
      <rect x="110" y={base - h} width="140" height={h} fill="none" stroke={INK} strokeOpacity="0.16" strokeDasharray="4 4" />
      <rect x="110" y={base - 3} width="140" height="3" fill={INK} fillOpacity="0.5" />
      <text x="180" y={base - 22} textAnchor="middle" fontFamily={MONO} fontSize="46" fill={INK} fillOpacity="0.7" letterSpacing="-2">
        0
      </text>
      <text x="180" y={base + 26} textAnchor="middle" fontFamily={MONO} fontSize="10.5" letterSpacing="1.3" fill={INK} fillOpacity="0.5">
        THE AD PLATFORM
      </text>

      {/* CRM: 147 */}
      <rect x="390" y={base - h} width="140" height={h} fill={EMERALD} />
      <text x="460" y={base - h - 16} textAnchor="middle" fontFamily={MONO} fontSize="46" fill={EMERALD} letterSpacing="-2">
        147
      </text>
      <text x="460" y={base + 26} textAnchor="middle" fontFamily={MONO} fontSize="10.5" letterSpacing="1.3" fill={INK} fillOpacity="0.5">
        THE CRM
      </text>

      <line x1="262" y1={base - 82} x2="378" y2={base - 82} stroke={YELLOW} strokeWidth="2" strokeDasharray="6 5" />
      <rect x="276" y={base - 100} width="88" height="30" fill={YELLOW} />
      <text x="320" y={base - 80} textAnchor="middle" fontFamily={MONO} fontSize="10.5" letterSpacing="1.2" fill={INK}>
        THE GAP
      </text>

      <text x="60" y="352" fontFamily={MONO} fontSize="10.5" letterSpacing="1.2" fill={INK} fillOpacity="0.4">
        SMART BIDDING WAS OPTIMISING AGAINST NOTHING
      </text>
    </Frame>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * "Win four searches completely, or a hundred partially. Not both."
 *
 * Four solid bars against a hundred hairlines. The whole argument.
 * ──────────────────────────────────────────────────────────────────────────── */
function ConcentrationVsSpread() {
  const base = 292;
  return (
    <Frame title="Four search terms owned completely, against a hundred held partially.">
      <text x="60" y="58" fontFamily={MONO} fontSize="13" letterSpacing="1.8" fill={INK} fillOpacity="0.5">
        THE SAME BUDGET, TWO SHAPES
      </text>

      <line x1="60" y1={base} x2="580" y2={base} stroke={INK} strokeOpacity="0.2" />

      {/* Four, owned. */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={72 + i * 44} y={base - 148} width={30} height={148} fill={EMERALD} />
      ))}
      <text x="72" y={base - 162} fontFamily="var(--font-display), sans-serif" fontSize="30" fontWeight="300" fill={EMERALD} letterSpacing="-1">
        4 owned
      </text>
      <text x="72" y={base + 24} fontFamily={MONO} fontSize="10.5" letterSpacing="1.3" fill={INK} fillOpacity="0.5">
        POSITION ONE · EVERY TIME
      </text>

      {/* A hundred, present. */}
      {Array.from({ length: 100 }).map((_, i) => (
        <rect key={i} x={320 + i * 2.6} y={base - 22} width={1.3} height={22} fill={INK} fillOpacity="0.3" />
      ))}
      <text x="320" y={base - 162} fontFamily="var(--font-display), sans-serif" fontSize="30" fontWeight="300" fill={INK} fillOpacity="0.45" letterSpacing="-1">
        100 present
      </text>
      <text x="320" y={base - 40} fontFamily={MONO} fontSize="10.5" letterSpacing="1.3" fill={INK} fillOpacity="0.35">
        PAGE TWO · MOSTLY
      </text>
      <text x="320" y={base + 24} fontFamily={MONO} fontSize="10.5" letterSpacing="1.3" fill={INK} fillOpacity="0.5">
        RANKED, NOT CHOSEN
      </text>

      <line x1="60" y1="330" x2="580" y2="330" stroke={INK} strokeOpacity="0.15" />
      <text x="60" y="354" fontFamily={MONO} fontSize="10.5" letterSpacing="1.2" fill={EMERALD}>
        POSITION FOUR IS NOT 40% OF POSITION ONE
      </text>
    </Frame>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * "If your agency's case study claims more revenue than the project was
 *  worth, stop reading it"
 *
 * A claim bar overshooting the ceiling it is supposedly inside.
 * ──────────────────────────────────────────────────────────────────────────── */
function ArithmeticCeiling() {
  const base = 300;
  const ceilingY = 150;
  return (
    <Frame title="A revenue claim drawn taller than the total value of the project it came from.">
      <text x="60" y="58" fontFamily={MONO} fontSize="13" letterSpacing="1.8" fill={INK} fillOpacity="0.5">
        CHECK THE ARITHMETIC FIRST
      </text>

      <line x1="60" y1={base} x2="580" y2={base} stroke={INK} strokeOpacity="0.2" />

      {/* The ceiling: everything the project could possibly be worth. */}
      <line x1="90" y1={ceilingY} x2="560" y2={ceilingY} stroke={EMERALD} strokeWidth="2" strokeDasharray="7 5" />
      <text x="560" y={ceilingY - 12} textAnchor="end" fontFamily={MONO} fontSize="11" letterSpacing="1.3" fill={EMERALD}>
        TOTAL VALUE OF THE PROJECT
      </text>

      {/* What the project actually was. */}
      <rect x="130" y={ceilingY} width="130" height={base - ceilingY} fill={INK} fillOpacity="0.12" stroke={INK} strokeOpacity="0.25" />
      <text x="195" y={base + 26} textAnchor="middle" fontFamily={MONO} fontSize="10.5" letterSpacing="1.3" fill={INK} fillOpacity="0.5">
        WHAT EXISTED TO SELL
      </text>

      {/* The claim, drawn straight through the ceiling. */}
      <rect x="380" y={70} width="130" height={base - 70} fill={YELLOW} />
      <text x="445" y={base + 26} textAnchor="middle" fontFamily={MONO} fontSize="10.5" letterSpacing="1.3" fill={INK} fillOpacity="0.5">
        WHAT THE CASE STUDY CLAIMS
      </text>
      <text x="445" y={56} textAnchor="middle" fontFamily={MONO} fontSize="11" letterSpacing="1.2" fill={INK}>
        IMPOSSIBLE
      </text>

      <text x="60" y="352" fontFamily={MONO} fontSize="10.5" letterSpacing="1.2" fill={INK} fillOpacity="0.42">
        NO CAMPAIGN SELLS MORE INVENTORY THAN THE PROJECT CONTAINS
      </text>
    </Frame>
  );
}

const CATEGORY_TITLES: Record<string, string> = {
  "seo-search": "Search & authority",
  "performance-paid": "Paid media",
  "conversion-experience": "Conversion & experience",
  "growth-strategy": "Growth strategy",
  "email-lifecycle": "Lifecycle & email",
  "social-content": "Social & content",
  "industry-insights": "Industry",
};

/**
 * FALLBACK — an article with no diagram of its own yet.
 *
 * Reuses CategoryMotif, the per-category line drawings already in this repo:
 * an authority graph for search, spend columns for paid, a funnel for
 * conversion, and so on. Seven categories, seven different drawings.
 *
 * ── WHY NOT ONE NEUTRAL MARK ────────────────────────────────────────────────
 * The first version of this fallback WAS one neutral mark, and on /insights it
 * rendered twelve identical tiles down the page — visually worse than the
 * stock photography it replaced, even though it was more honest. Honest and
 * useless is not the goal.
 *
 * A category motif is less specific than a per-article diagram and far more
 * specific than a photograph of a wall. It is the right rung: it says what
 * KIND of thing the article is about, which is true, without pretending to
 * illustrate an argument nobody has read.
 *
 * The per-article diagrams above remain the standard. When an article earns
 * one, add it to BY_SLUG and it stops using this.
 */
function Fallback({ category }: { category?: string | null }) {
  const label = (category && CATEGORY_TITLES[category]) || "Field note";
  /**
   * Built as a positioned div rather than through Frame.
   *
   * CategoryMotif returns its own <svg viewBox="0 0 200 200"> with no width or
   * height. Nested inside another SVG that resolves to 100% x 100% of the
   * PARENT viewport — 640x400, not 200x200 — so the motif rendered several
   * times its intended size and ran off the edge of every card.
   *
   * Rendering it as a sibling in the wrapper, sized in CSS, avoids the nested
   * -SVG sizing rules entirely.
   */
  return (
    <div className="relative w-full h-full bg-[#F8F8F6] overflow-hidden">
      {/* Paper grid, matching the per-article diagrams. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            `linear-gradient(to right, ${INK}0D 1px, transparent 1px), linear-gradient(to bottom, ${INK}0D 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute right-[6%] top-1/2 -translate-y-1/2 w-[38%] max-w-[190px] aspect-square opacity-90">
        <CategoryMotif category={category ?? ""} color={EMERALD} className="w-full h-full" />
      </div>
      <div className="absolute left-[7%] top-1/2 -translate-y-1/2 max-w-[58%]">
        <p className="font-display font-light text-[clamp(18px,2.4vw,30px)] leading-tight tracking-[-0.02em] text-ink-headline/70">
          {label}
        </p>
        <span aria-hidden="true" className="block mt-3 h-[4px] w-14 bg-brand-yellow" />
        <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-headline/35">
          Zeppstr · written from inside the work
        </p>
      </div>
    </div>
  );
}

const BY_SLUG: Record<string, (p: Props) => React.ReactElement> = {
  "creative-concentration": CreativeConcentration,
  "zero-conversions-147-leads": AttributionGapArticle,
  "win-four-searches-completely": ConcentrationVsSpread,
  "revenue-claims-that-fail-arithmetic": ArithmeticCeiling,
};

export function hasArticleDiagram(slug?: string | null): boolean {
  return !!slug && slug in BY_SLUG;
}

export function ArticleDiagram({
  slug,
  title,
  category,
  className,
}: {
  slug?: string | null;
  title?: string | null;
  category?: string | null;
  className?: string;
}) {
  const Specific = slug ? BY_SLUG[slug] : undefined;
  if (Specific) return <Specific className={className} />;

  /* Everything without a bespoke diagram gets a doodle collage keyed to its
     own slug and title. This replaced the per-CATEGORY Fallback below, which
     was the source of "you have used same vector images in all the articles":
     ten of twelve live pieces are SEO & Search, so ten cards drew one mark.

     Fallback is kept, unrendered, only because it is the last thing that
     still uses CategoryMotif. If CategoryMotif goes, both go. */
  if (slug) {
    return (
      <ArticleDoodle
        slug={slug}
        title={title ?? ""}
        label={category ? (CATEGORY_TITLES[category] ?? undefined) : undefined}
        className={className ?? "h-full w-full"}
      />
    );
  }
  return <Fallback category={category} />;
}
