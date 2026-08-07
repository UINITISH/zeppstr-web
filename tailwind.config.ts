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
        // Locked type scale (matches live site hero)
        "display-xl": ["clamp(40px, 6vw, 84px)", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(32px, 5vw, 56px)", { lineHeight: "1.15", letterSpacing: "-0.025em" }],
        "display-md": ["36px", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "display-sm": ["28px", { lineHeight: "1.25" }],
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
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
