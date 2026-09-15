"use client";

import * as React from "react";

/**
 * Thin scroll-progress bar pinned under the global nav.
 * Measures the article element itself, not the whole document, so the bar
 * hits 100% at the end of the reading — not at the end of the footer.
 */
export function ReadingProgress({ targetId = "article-body" }: { targetId?: string }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        setProgress(rect.bottom <= window.innerHeight ? 100 : 0);
        return;
      }
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress((scrolled / total) * 100);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [targetId]);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-brand-yellow transition-[width] duration-75 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
