import type { Config } from "tailwindcss";

/**
 * Tailwind config — locked from /reference/brand-tokens.md
 *
 * Brand DNA pulled from live zeppstr.com inspection.
 * Plus Jakarta Sans 200 for hero is brand-defining — DO NOT bulk to 700+.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sanity/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#3147FF",
          yellow: "#FFD031",
          "yellow-hover": "#F5C012",
        },
        ink: {
          headline: "#0A102F",
          body: "#404040",
          muted: "#69727D",
          soft: "#585450",
        },
        bg: {
          primary: "#FFFFFF",
          secondary: "#F8F8F6",
          // Brand block: green section background (replaces former navy)
          inverse: "#064E3B",
          /**
           * Footer only — a deeper green than bg.inverse.
           *
           * WHY THIS EXISTS: the footer used bg.inverse, which is the same
           * value as the emerald CTA band that precedes it on most pages. The
           * two ran together into one continuous wall of green with no visible
           * seam, so the page appeared to have no end — the CTA and the footer
           * read as a single ~1,400px block.
           *
           * This is the same hue, two steps darker, so the footer still reads
           * as brand but clearly sits *under* whatever section precedes it.
           * Do not reuse it for content sections.
           */
          footer: "#03261C",
        },
        rule: "#E5E7EB",
      },
      fontFamily: {
        // Unified type system — body font used across display, body, and mono surfaces.
        // The mono variant stays uppercase/letter-spaced via CSS, which preserves the
        // semantic "tag" feel even without a true monospace face.
        display: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        /**
         * ── TYPE SCALE — REBUILT 15 SEP 2026 ──────────────────────────────────
         *
         * WHAT WAS WRONG: this scale existed but was barely used. An audit of
         * app/ and components/ found the headline size hardcoded as an arbitrary
         * value 147 times — `text-[clamp(40px,6vw,88px)]` — plus 22 copies of a
         * 128px stat numeral and roughly 25 other one-off clamps. So the site
         * had no type scale in practice, it had ~25 competing ones, and the
         * largest of them rendered at 88px and 128px on a 1512px viewport.
         *
         * At those sizes a headline of ordinary length ("Strategic growth
         * planning for ambitious businesses") breaks to four lines and a stat
         * ("75 units") wraps onto two. That is poster typography applied to
         * sentences, and it is what "some parts have way too big fonts" means.
         *
         * WHAT CHANGED: every tier came down roughly 25%, and the hardcoded
         * clamps at the call sites were replaced with these tokens so there is
         * one place to tune it from now on.
         *
         *     display-xl   88px → 64px    hero headlines
         *     display-stat 128px → 76px   big proof numerals (new tier)
         *     display-lg    56px → 46px   section headings
         *     display-md    38px → 34px   sub-headings, list-row labels
         *     display-sm    26px → 24px   card titles, pull quotes
         *     display-xs    20px → 19px   inline subheads
         *
         * The vw middle terms were reduced in step so the scale holds its
         * proportions between breakpoints rather than only at the maximum.
         *
         * IF YOU ARE ADDING A HEADLINE: use a token. Do not reintroduce
         * `text-[clamp(...)]` — that is how the site ended up with 25 scales.
         */
        "display-xl": ["clamp(34px, 4.6vw, 64px)", { lineHeight: "1.06", letterSpacing: "-0.035em" }],
        /**
         * Proof numerals only — "67×", "₹187.5 Cr", "6—12". These earn more
         * size than a headline because they are two or three glyphs and they
         * are the argument. They do NOT belong on anything with a verb in it.
         */
        "display-stat": ["clamp(40px, 5.5vw, 76px)", { lineHeight: "0.95", letterSpacing: "-0.045em" }],
        "display-lg": ["clamp(28px, 3.6vw, 46px)", { lineHeight: "1.15", letterSpacing: "-0.025em" }],
        // display-md / sm previously sat at fixed px with little or no optical
        // tracking, so section subheads rendered close to browser-default and
        // read as untreated next to the hero. Both are now fluid and tracked in
        // proportion to size — the smaller the type, the looser it should sit.
        "display-md": ["clamp(24px, 2.6vw, 34px)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(19px, 1.7vw, 24px)", { lineHeight: "1.3", letterSpacing: "-0.012em" }],
        // New tier for card titles and inline subheads, which were previously
        // forced to borrow display-sm and came out oversized.
        "display-xs": ["clamp(17px, 1.3vw, 19px)", { lineHeight: "1.4", letterSpacing: "-0.006em" }],
        "body-lg": ["19px", { lineHeight: "1.6" }],
        body: ["16px", { lineHeight: "1.6" }],
        "body-sm": ["14px", { lineHeight: "1.5" }],
        button: ["16px", { lineHeight: "1" }],
        eyebrow: ["13px", { lineHeight: "1.2", letterSpacing: "0.15em" }],
      },
      maxWidth: {
        reading: "720px",
        layout: "1280px",
        full: "1440px",
      },
      borderRadius: {
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        hover: "150ms",
        DEFAULT: "300ms",
        page: "600ms",
      },
      /**
       * Hero USP stat animations.
       *
       * `wipe-in` grows a rule from zero width; `rise-in` lifts the numeral as
       * it fades up. Both are used on the two headline figures in the homepage
       * hero (6—12 partner clients, 300+ businesses), which sit above the fold
       * — so a mount-time CSS animation is equivalent to an on-scroll one and
       * costs no JavaScript.
       *
       * The numerals themselves count up via <AnimatedNumber>, which is
       * IntersectionObserver-driven and snaps to the real figure if it is ever
       * interrupted. See that component — a partially-counted number left on
       * screen understates the claim, which is worse than no animation at all.
       */
      keyframes: {
        "wipe-in": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "wipe-in": "wipe-in 900ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "rise-in": "rise-in 700ms cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
