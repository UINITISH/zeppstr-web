"use client";

import * as React from "react";

interface AnimatedNumberProps {
  /** The final value to count up to */
  target: number;
  /** Animation duration in milliseconds (default 1500) */
  duration?: number;
  /** Format the number for display (default: toLocaleString) */
  format?: (value: number) => string;
  /** Trigger animation only once even if revisited */
  once?: boolean;
}

/**
 * Counts a number up to `target` when it scrolls into view.
 *
 * ── FAIL TO THE ANSWER, NOT TO ZERO ─────────────────────────────────────────
 *
 * This previously initialised `displayValue` to 0 and only moved when an
 * IntersectionObserver fired at a 0.4 threshold. Any failure of that observer —
 * a background tab where requestAnimationFrame is throttled, a hydration
 * hiccup, reduced-motion settings, an inline span that never reaches 40%
 * visibility — left the figure reading "0" permanently.
 *
 * On the homepage that rendered "0+ businesses across 10+ countries", which is
 * considerably worse than showing no number at all.
 *
 * Now the component renders the FINAL value on the server and at first paint,
 * and only rewinds to zero once the client has confirmed it is off screen and
 * able to animate. Three paths restore the real number: the observer firing, a
 * 1.2s failsafe, and prefers-reduced-motion.
 *
 * Usage:
 *   <AnimatedNumber target={300} /> → "300", counting up if it animates
 *   <AnimatedNumber target={12} format={(v) => `6—${v}`} /> → "6—12"
 */
export function AnimatedNumber({
  target,
  duration = 1500,
  format = (v) => v.toLocaleString(),
  once = true,
}: AnimatedNumberProps) {
  const ref = React.useRef<HTMLSpanElement>(null);

  // Start AT the target. We only ever count up from zero if we have positively
  // established that we can complete the animation.
  const [displayValue, setDisplayValue] = React.useState(target);
  const hasAnimated = React.useRef(false);
  const frame = React.useRef<number | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setDisplayValue(target);
      return;
    }

    const runAnimation = () => {
      if (once && hasAnimated.current) return;
      hasAnimated.current = true;

      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuart — smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 4);
        setDisplayValue(Math.round(target * eased));
        if (progress < 1) {
          frame.current = requestAnimationFrame(tick);
        } else {
          /* Land exactly on target and release the frame handle. Without
             clearing it, cleanup would see a stale id, treat a COMPLETED
             animation as interrupted, and redundantly re-set state. */
          frame.current = null;
          setDisplayValue(target);
        }
      };

      // Rewind to zero and count, in the same frame, so there is no flash of
      // the final value mid-animation.
      setDisplayValue(0);
      frame.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runAnimation();
            if (once) observer.disconnect();
          } else if (!once) {
            hasAnimated.current = false;
          }
        });
      },
      // threshold 0 — any sliver counts. The old 0.4 was unreachable for an
      // inline span inside a clipped or oversized container.
      { threshold: 0 }
    );

    observer.observe(el);

    /**
     * ── BACKGROUND-TAB THROTTLING ──────────────────────────────────────────
     * Browsers throttle requestAnimationFrame to roughly 1fps (or stop it
     * entirely) in a tab that is not visible. An easeOutQuart count that gets
     * throttled part-way through sits at whatever frame it reached — so a
     * visitor who opens the page in a background tab, then switches to it
     * twenty seconds later, sees "212+ businesses" or "6—8 partner clients".
     *
     * A plausible-but-wrong number is far worse than an obviously-missing one:
     * nobody reports it as a bug, they just believe it. Understating the firm's
     * own track record is the specific failure here.
     *
     * So: if the document is hidden at any point, abandon the animation and
     * show the real figure. The animation is a flourish; the number is the
     * claim. When they conflict, the claim wins.
     */
    const onVisibilityChange = () => {
      if (document.hidden) {
        if (frame.current !== null) {
          cancelAnimationFrame(frame.current);
          frame.current = null;
        }
        hasAnimated.current = true; // do not restart on return
        setDisplayValue(target);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Also cover the case where the page was ALREADY hidden at mount.
    if (document.hidden) {
      hasAnimated.current = true;
      setDisplayValue(target);
    }

    // Failsafe: if nothing has animated within 1.2s, make sure the real number
    // is on screen regardless.
    const failsafe = window.setTimeout(() => {
      if (!hasAnimated.current) setDisplayValue(target);
    }, 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      /**
       * ── THE FROZEN-COUNTER BUG — FIXED 15 SEP 2026 ─────────────────────────
       *
       * SYMPTOM: the homepage hero read "6—3 partner clients per year" and
       * "75+ businesses across 10+ countries". Not zero, not the real figure —
       * frozen at whatever frame the count happened to reach. The site was
       * understating its own track record by four times, on the first thing
       * anyone sees.
       *
       * CAUSE: React StrictMode invokes effects twice on mount (dev, and any
       * effect re-run in production). Sequence was:
       *   1. effect runs → observer fires → runAnimation() sets
       *      hasAnimated.current = true and starts the rAF loop
       *   2. cleanup runs → cancelAnimationFrame kills the loop mid-count
       *   3. effect runs again → observer fires → runAnimation() hits
       *      `if (once && hasAnimated.current) return` and bails, because the
       *      ref survived the cleanup
       * Nothing ever restored the final value, so displayValue stayed at the
       * last frame rendered before the cancel.
       *
       * The previous comment block on this component is all about failing to
       * the answer rather than to zero — and it was right about the principle
       * and incomplete about the cases. It guarded against the animation never
       * STARTING. It did not guard against the animation starting and then
       * being interrupted, which is the more likely failure and the one that
       * produces a plausible-looking wrong number rather than an obvious zero.
       *
       * FIX, both halves:
       *  - snap to the target if we tear down mid-flight, so an interrupted
       *    count can never leave a partial figure on screen
       *  - clear hasAnimated so the remounted effect is allowed to run again
       */
      if (frame.current !== null) {
        cancelAnimationFrame(frame.current);
        frame.current = null;
        setDisplayValue(target);
      }
      hasAnimated.current = false;
    };
  }, [target, duration, once]);

  return (
    <span ref={ref} aria-label={format(target)}>
      {format(displayValue)}
    </span>
  );
}
