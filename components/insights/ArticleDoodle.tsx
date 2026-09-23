import * as React from "react";
import { SCENES, SCENE_NAMES, pickScene } from "@/components/insights/article-scenes";

/**
 * ArticleDoodle — draws the shape of the article's argument.
 *
 * ── TWO FAILED VERSIONS PRECEDED THIS ───────────────────────────────────────
 * v1 keyed the image by CATEGORY. Ten of twelve live posts are SEO & Search,
 * so ten cards drew one identical mark. Vikas: "you have used same vector
 * images in all the articles."
 *
 * v2 keyed it by slug and scattered five to seven doodles picked from title
 * keywords. It passed a collision test — 53 distinct icon sets — and still
 * looked the same, because every image was the same composition with different
 * contents: outline icons scattered on a dark grid. Vikas again: "Why are you
 * making all the images look similar when the articles are different... I want
 * the image to give a gist of the article."
 *
 * He was right both times, and the second miss is the instructive one. A
 * uniqueness test is not a distinctiveness test. Fifty-three provably distinct
 * images can all look identical to a reader, because readers see layout and
 * silhouette before they see which small symbols are in it.
 *
 * ── v3 ──────────────────────────────────────────────────────────────────────
 * The title now chooses a SCENE — a purpose-built drawing of the argument's
 * shape. A comparison piece gets a split screen. A benchmark piece gets a bar
 * chart with an average line. A "best time to send" piece gets a clock ringed
 * with send slots. A "black hat risks" piece gets a struck-through warning.
 * These differ in silhouette, so they are distinguishable at card size, which
 * is the actual requirement.
 *
 * The slug still seeds variation WITHIN a scene — bar heights, which pin is
 * hot, how many boxes are ticked — so two comparison pieces are not the same
 * picture either. But the scene carries the meaning; the jitter only prevents
 * twinning. See components/insights/article-scenes.tsx.
 */

/** FNV-1a. Deterministic, dependency-free, identical on server and client —
 *  Math.random() here would desync SSR and hydration and React would blow up. */
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Small LCG so one slug yields a stable stream of pseudo-random values. */
function rng(seed: number) {
  let s = seed || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
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
  const sceneName = pickScene(title, seed);
  const Scene = SCENES[sceneName] ?? SCENES[SCENE_NAMES[seed % SCENE_NAMES.length]];

  return (
    <div
      className={`relative overflow-hidden bg-bg-inverse ${className}`}
      aria-hidden="true"
      data-scene={sceneName}
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
        {Scene(next)}
      </svg>

      {label ? (
        <span className="absolute bottom-3 left-4 font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
          {label}
        </span>
      ) : null}
    </div>
  );
}
