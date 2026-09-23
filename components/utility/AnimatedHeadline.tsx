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
  /**
   * ── THE "St" BUG — FIXED 15 SEP 2026 ──────────────────────────────────────
   *
   * SYMPTOM, observed live on the Vercel preview: the homepage H1 rendered as
   * a giant empty yellow block containing the two letters "St". Two characters
   * revealed, forty-nine invisible, permanently.
   *
   * CAUSE: the reveal is a per-character CSS transition with a staggered
   * transition-delay of `i * stagger`. At 28ms across a 51-character headline
   * the last character does not begin until 1,428ms, and finishes at ~2,230ms.
   * A CSS transition only runs if the element is actually being rendered and
   * composited — so if the tab is backgrounded, the compositor throttles, or
   * the browser is busy during that 2.2-second window, characters whose delay
   * elapsed while hidden simply never transition. There was no state that
   * unconditionally asserted the finished appearance; `revealed` only STARTS
   * the chain, it does not guarantee it completes.
   *
   * The existing guards were all about the animation never STARTING (observer
   * never fires, reduced motion). None of them covered it starting and then
   * not finishing — which produces a headline that is worse than no animation
   * and worse than no headline, because it looks like the site is broken.
   *
   * FIX: `settled` drops the transitions entirely and pins every character to
   * its final state. It is set by whichever comes first — the full animation
   * window elapsing, or the document being hidden at any point. Once settled,
   * the headline cannot be left partially rendered by anything.
   *
   * Same principle as the AnimatedNumber fix: the animation is a flourish, the
   * text is the content, and when they conflict the content wins.
   */
  const [settled, setSettled] = React.useState(false);

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
      // Reduced motion should not leave transitions armed at all.
      if (prefersReducedMotion) setSettled(true);
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

  /**
   * Settle guard. Runs independently of the reveal logic above so it cannot be
   * skipped by any path through it.
   *
   * The timeout is the full animation window plus a second of slack: the last
   * character's delay (chars × stagger) plus its duration. After that the
   * animation is over by definition, so pinning the final state can only fix a
   * stall, never interrupt a legitimate reveal.
   */
  const charCount = children.replace(/\s/g, "").length;

  React.useEffect(() => {
    const total = charCount * stagger + duration + 1000;
    const done = window.setTimeout(() => {
      setRevealed(true);
      setSettled(true);
    }, total);

    // A hidden document cannot composite transitions. Anything mid-chain when
    // the tab goes away will not resume correctly, so finish it immediately.
    const onHide = () => {
      if (document.hidden) {
        setRevealed(true);
        setSettled(true);
      }
    };
    document.addEventListener("visibilitychange", onHide);
    if (document.hidden) onHide();

    return () => {
      window.clearTimeout(done);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [charCount, stagger, duration]);

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
                // Once settled, the final state is asserted unconditionally and
                // the transition is removed — a stalled character cannot stay
                // stalled. See the `settled` note at the top of this component.
                opacity: settled || visible ? 1 : 0,
                transform:
                  settled || visible ? "translateY(0)" : "translateY(0.35em)",
                transition: settled
                  ? "none"
                  : `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${i * stagger}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${i * stagger}ms`,
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
