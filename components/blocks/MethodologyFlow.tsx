/**
 * MethodologyFlow — 4-step engagement model rendered as a horizontal flow.
 *
 * Diagnose → Architect → Deploy → Operate. Each step has a yellow accent
 * square, an oversized extralight numeral, the title, a duration tag in
 * monospace caps, and one body line.
 *
 * Brand-blue arrows connect each step on desktop. On mobile, the steps stack
 * vertically with no arrows (the order is implicit).
 *
 * Uses only locked tokens — no new colors, no decoration.
 */

const STEPS = [
  {
    n: "01",
    title: "Diagnose",
    duration: "4–6 weeks",
    body: "Strategic audit. Written diagnostic. Identified leak points. 90-day plan.",
  },
  {
    n: "02",
    title: "Architect",
    duration: "2–4 weeks",
    body: "Revenue system designed. Positioning, journey, measurement framework.",
  },
  {
    n: "03",
    title: "Deploy",
    duration: "Ongoing",
    body: "Run via 5 Solutions or handed to your team. Channels operated as one system.",
  },
  {
    n: "04",
    title: "Operate",
    duration: "12+ months",
    body: "Monthly board-style reviews. One north-star revenue metric, accountable.",
  },
];

export function MethodologyFlow() {
  return (
    <section
      className="bg-bg-primary border-t border-ink-headline/10"
      aria-labelledby="methodology-heading"
    >
      <div className="container-layout py-24 md:py-32">
        {/* Header */}
        <div className="mb-16 md:mb-20 max-w-[1100px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
            Methodology
          </p>
          <h2
            id="methodology-heading"
            className="font-bold tracking-[-0.025em] text-[clamp(44px,7vw,104px)] text-ink-headline leading-[1.02] max-w-[18ch] mb-8 text-balance"
          >
            Diagnose.{" "}
            <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">Architect</span>
            . Deploy. Operate.
          </h2>
          <p className="font-body text-body-lg text-ink-body max-w-[60ch] leading-[1.55]">
            Four phases. Twelve months minimum. The operating model behind every multi-X
            outcome on this page — closer to a strategy engagement than an agency retainer.
          </p>
        </div>

        {/* 4-step flow */}
        <ol className="grid md:grid-cols-4 gap-y-12 md:gap-x-8 border-t border-ink-headline/15 pt-12">
          {STEPS.map((step, i) => (
            <li key={step.n} className="relative">
              {/* Yellow accent */}
              <span
                aria-hidden="true"
                className="block w-3 h-3 bg-brand-yellow mb-7"
              />

              {/* Big numeral */}
              <p className="font-display font-extralight text-[clamp(56px,5.5vw,80px)] text-ink-headline leading-none tracking-[-0.03em] mb-6">
                {step.n}
              </p>

              {/* Title */}
              <h3 className="font-display font-light text-[clamp(24px,2.2vw,32px)] text-ink-headline tracking-[-0.01em] leading-[1.15] mb-3">
                {step.title}
              </h3>

              {/* Duration */}
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                {step.duration}
              </p>

              {/* Body */}
              <p className="font-body text-body text-ink-body leading-relaxed max-w-[32ch]">
                {step.body}
              </p>

              {/* Yellow arrow on desktop, between cells */}
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden md:block absolute top-[6px] -right-4 text-ink-headline text-[20px]"
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}
