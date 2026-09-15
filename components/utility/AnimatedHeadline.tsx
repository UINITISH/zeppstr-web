"use client";

import * as React from "react";

interface AnimatedHeadlineProps {
  /** Plain text headline. Splits into words (which stay whole) then characters (which animate individually). */
  children: string;
  /** Stagger delay between each character in ms (default 35) */
  stagger?: number;
  /** Per-character animation duration in ms (default 700) */
  duration?: number;
  /** className passed to the wrapping element */
  className?: string;
  /** HTML element to render as (default h1) */
  as?: keyof JSX.IntrinsicElements;
  /** Number of leading words to render bold (font-medium) — rest inherit parent weight */
  boldLeadingWords?: number;
  /** Number of leading words to wrap in a yellow brand-block highlight */
  highlightLeadingWords?: number;
}

/**
 * Yellow Slice-style kinetic headline.
 *
 * Each character animates in independently with a stagger — but words stay
 * together as non-breaking units, so lines never split mid-word.
 *
 * Implementation: split text into word-spans (whiteSpace: nowrap), each
 * containing per-character spans (inline-block with stagger). Spaces between
 * words are normal whitespace so the browser wraps cleanly at word boundaries.
 */
export function AnimatedHeadline({
  children,
  stagger = 30,
  duration = 700,
  className,
  as: Tag = "h1",
  boldLeadingWords = 0,
  highlightLeadingWords = 0,
}: AnimatedHeadlineProps) {
  const ref = React.useRef<HTMLElement>(null);

  /**
   * ── FAIL-VISIBLE, NOT FAIL-BLANK ──────────────────────────────────────────
   *
   * This previously initialised to `false`, so every character rendered at
   * opacity 0 until an IntersectionObserver fired at a 0.2 threshold. When that
   * observer did not fire — a headline taller than the viewport, a throttled
   * background tab, reduced-motion settings, a hydration hiccup — the text
   * simply never appeared. On the homepage that produced a large empty yellow
   * block, because the highlight wrapper has its own background and stayed
   * visible while the words inside it did not.
   *
   * Headline copy must not depend on JavaScript to be readable. So:
   *
   *   - Server render and first paint are VISIBLE. Nothing is hidden until we
   *     know we can animate and then reveal.
   *   - The hidden state is only entered on the client, after mount, and only
   *     when the element is genuinely below the fold.
   *   - Three independent paths set it visible again: the observer firing, a
   *     1.2s failsafe timer, and prefers-reduced-motion.
   *
   * Worst case the animation is skipped. The text is always there.
   */
  const [hydrated, setHydrated] = React.useState(false);
  const [revealed, setRevealed] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // Anything already on screen, or a user who has asked for less motion,
    // skips the animation entirely and stays visible.
    const alreadyInView =
      el && el.getBoundingClientRect().top < window.innerHeight;

    if (prefersReducedMotion || alreadyInView || !el) {
      setRevealed(true);
      return;
    }

    // Only now is it safe to hide, because we know it is off screen.
    setHydrated(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        });
      },
      // threshold 0 — any sliver counts. The old 0.2 could never be met by an
      // element taller than five times the viewport.
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);

    // Failsafe: if the observer has not fired within 1.2s, show the text anyway.
    const failsafe = window.setTimeout(() => setRevealed(true), 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  // Visible unless we have deliberately hidden it and not yet revealed it.
  const visible = !hydrated || revealed;

  // Split into words (preserving the words but losing the spaces — we re-insert with whitespace)
  const words = children.split(" ");
  let charIndex = 0;

  // Helper — render a single word's animated character spans (no highlight here;
  // the highlight is applied at the group wrapper level so the gap is covered too)
  const renderWord = (word: string, wi: number) => {
    const isBoldWord = wi < boldLeadingWords;
    return (
      <span
        key={`w-${wi}`}
        aria-hidden="true"
        className={isBoldWord ? "font-medium" : ""}
        style={{ display: "inline-block", whiteSpace: "nowrap" }}
      >
        {Array.from(word).map((ch) => {
          const i = charIndex++;
          return (
            <span
              key={`c-${i}`}
              style={{
                display: "inline-block",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(0.35em)",
                transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${i * stagger}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${i * stagger}ms`,
              }}
            >
              {ch}
            </span>
          );
        })}
      </span>
    );
  };

  const highlightCount = Math.min(highlightLeadingWords, words.length);
  const elements: React.ReactNode[] = [];

  // Group all highlighted leading words inside ONE yellow wrapper —
  // this covers the space(s) between them too, so the highlight reads as a
  // single continuous block instead of per-word boxes.
  if (highlightCount > 0) {
    const inner: React.ReactNode[] = [];
    for (let wi = 0; wi < highlightCount; wi++) {
      if (wi > 0) inner.push(" ");
      inner.push(renderWord(words[wi], wi));
    }
    elements.push(
      <span
        key="highlight-wrap"
        className="bg-brand-yellow px-3"
        style={{ display: "inline-block" }}
      >
        {inner}
      </span>
    );
  }

  // Remaining (un-highlighted) words
  for (let wi = highlightCount; wi < words.length; wi++) {
    if (elements.length > 0) elements.push(" ");
    elements.push(renderWord(words[wi], wi));
  }

  // `Tag` is typed as `keyof JSX.IntrinsicElements`, a union of every HTML tag.
  // Rendering it directly makes TS resolve the union of every element's props,
  // which exceeds its complexity limit (TS2590) and fails the production build.
  // Widening to ElementType collapses that union without losing runtime
  // behaviour — the `as` prop is still constrained at the call site.
  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref as React.Ref<any>}
      className={className}
      aria-label={children}
    >
      {elements}
    </Component>
  );
}
