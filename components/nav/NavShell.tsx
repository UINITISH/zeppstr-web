"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-reactive shell for the global nav.
 *
 * ── REVISION 2, 11 SEP 2026 ─────────────────────────────────────────────────
 * The first version was transparent at the top and 90% opaque with a blur once
 * scrolled. Two faults:
 *
 *   1. `bg-bg-primary/90` still let page content read through the bar. Combined
 *      with backdrop-blur it produced a smeared overlap rather than a clean
 *      separation — case study thumbnails and headings were visibly tangled
 *      with the nav links.
 *   2. `z-40` was not above everything it needed to be, so some page content
 *      painted over the nav entirely.
 *
 * A sticky nav has one job: stay readable over arbitrary content scrolling
 * underneath it. Once scrolled it is now fully opaque with a hairline rule and
 * a soft shadow. Transparency is kept only at the very top of the page, where
 * there is nothing behind it to conflict with.
 *
 * Why a client component: this is the only part of the nav needing browser
 * state. GlobalNav stays a server component and keeps fetching Solutions and
 * Industries at build time.
 */
/**
 * ── REVISION 3, 16 SEP 2026 — THE BLEED-THROUGH BUG ─────────────────────────
 * Found in pre-launch QA: scrolling off the hero made the heading and logo
 * watermark read through the bar and overlap the nav links for a moment.
 * Revision 2 fixed the *steady* states and left the transition broken. Three
 * causes, all of which had to go:
 *
 *  1. `background-color` was in the transition list with a 200ms duration. A
 *     background fading from transparent to opaque IS a partially transparent
 *     background for 200ms — by definition. Every frame of that fade showed
 *     the hero through the bar. This was the main fault.
 *
 *  2. SCROLL_THRESHOLD was 8px, so the first 8px of scroll moved the hero up
 *     behind a bar that was still deliberately transparent.
 *
 *  3. The rAF-throttled state update can trail the paint by a frame, so even
 *     at threshold 0 there was a window where React had not re-rendered yet.
 *
 * ── THE FIX, AND WHY IT COSTS NOTHING ───────────────────────────────────────
 * The bar is now ALWAYS opaque. Only the border and shadow animate in.
 *
 * That sounds like a design change and is not, because the nav is `sticky`
 * rather than `fixed`: at scrollY 0 it occupies space in normal flow and has
 * nothing behind it. A transparent bar over the page background and an opaque
 * bar painted in that same page background are pixel-identical at rest, on
 * every page, light hero or dark. The transparency was only ever visible
 * during the scroll transition — which is precisely where it was a bug.
 *
 * So all three causes are removed at once and the resting appearance is
 * unchanged. If a future design genuinely needs a transparent nav over a
 * full-bleed hero, that requires `fixed` positioning and a hero with top
 * padding — and then the bar must carry its own contrast treatment rather
 * than relying on a fade.
 */
const SCROLL_THRESHOLD = 0;

export function NavShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const next = window.scrollY > SCROLL_THRESHOLD;
      setScrolled((prev) => (prev === next ? prev : next));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    // Run once on mount so a page restored mid-scroll renders correctly.
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    // Covers anchor jumps and browser scroll restoration, which do not always
    // emit a scroll event before first paint.
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav
      data-scrolled={scrolled}
      className={[
        // z-50: above every page-level layer. Sticky navs must win.
        //
        // bg-bg-primary is OUTSIDE the conditional and background-color is NOT
        // in the transition list. Both are deliberate — see revision 3 above.
        // Putting either back reintroduces the bleed-through.
        "sticky top-0 z-50 bg-bg-primary",
        "transition-[border-color,box-shadow] duration-200 ease-out",
        scrolled
          ? "border-b border-rule shadow-[0_1px_12px_rgba(10,16,47,0.06)]"
          : "border-b border-transparent shadow-none",
      ].join(" ")}
    >
      {children}
    </nav>
  );
}
