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
 * Animates a number from 0 to `target` when the element enters the viewport.
 * Uses IntersectionObserver — no animation runs while off-screen.
 * Uses easeOutQuart for a smooth deceleration curve.
 *
 * Usage:
 *   <AnimatedNumber target={300} /> → renders "0" → "300"
 *   <AnimatedNumber target={12} format={(v) => `6—${v}`} /> → renders "6—0" → "6—12"
 */
export function AnimatedNumber({
  target,
  duration = 1500,
  format = (v) => v.toLocaleString(),
  once = true,
}: AnimatedNumberProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = React.useState(0);
  const hasAnimated = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (once && hasAnimated.current) return;
            hasAnimated.current = true;

            const startTime = performance.now();
            const startValue = 0;

            const tick = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // easeOutQuart — smooth deceleration
              const eased = 1 - Math.pow(1 - progress, 4);
              const current = Math.round(startValue + (target - startValue) * eased);
              setDisplayValue(current);
              if (progress < 1) requestAnimationFrame(tick);
            };

            requestAnimationFrame(tick);
          } else if (!once) {
            setDisplayValue(0);
            hasAnimated.current = false;
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, once]);

  return (
    <span ref={ref} aria-label={format(target)}>
      {format(displayValue)}
    </span>
  );
}
