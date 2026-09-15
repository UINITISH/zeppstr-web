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
const SCROLL_THRESHOLD = 8;

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
        "sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-200 ease-out",
        scrolled
          ? // Fully opaque. Not 90%, not blurred — solid, so nothing reads through.
            "bg-bg-primary border-b border-rule shadow-[0_1px_12px_rgba(10,16,47,0.06)]"
          : "bg-transparent border-b border-transparent shadow-none",
      ].join(" ")}
    >
      {children}
    </nav>
  );
}
