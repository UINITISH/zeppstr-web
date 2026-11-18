import { AI_STAGES } from "@/lib/ai-stack";

/** Option A — PIPELINE. One horizontal rail, stage to stage, the way the work
 *  actually flows. Scrolls sideways (snap) on smaller screens. */
export function AIStackPipeline() {
  return (
    <section className="bg-bg-secondary border-t border-ink-headline/10" aria-labelledby="ai-a-heading">
      <div className="container-layout pt-24 md:pt-32">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-end">
          <div className="md:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">Our AI stack</p>
            <h2 id="ai-a-heading" className="font-bold tracking-[-0.025em] text-display-lg text-ink-headline leading-[1.05] max-w-[22ch] text-balance">
              An AI tool at every stage of the work. A person making the{" "}
              <span className="highlight-mark">call.</span>
            </h2>
          </div>
          <p className="md:col-span-4 font-body text-body-lg text-ink-body leading-relaxed">
            Nine stages, research to reporting. Each runs on purpose-built AI tools and is reviewed
            by our team before anything reaches you.
          </p>
        </div>
      </div>

      <div className="mt-16 md:mt-20 pb-24 md:pb-32 overflow-x-auto snap-x snap-mandatory [scrollbar-width:thin]">
        <ol className="relative flex w-max px-6 md:px-[max(3rem,calc((100vw_-_1280px)/2_+_3rem))]">
          {/* the rail */}
          <span aria-hidden="true" className="absolute top-[11px] left-0 right-0 h-[2px] bg-ink-headline/15" />
          {AI_STAGES.map((s, i) => (
            <li key={s.stage} className="relative snap-start w-[260px] md:w-[280px] shrink-0 pr-8 group">
              <span
                aria-hidden="true"
                className="relative z-10 grid place-items-center w-6 h-6 rounded-full bg-ink-headline ring-4 ring-bg-secondary group-hover:bg-brand-yellow transition-colors duration-hover"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow group-hover:bg-ink-headline transition-colors duration-hover" />
              </span>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                Stage {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display font-bold text-[22px] tracking-[-0.02em] text-ink-headline leading-tight">
                {s.stage}
              </h3>
              <p className="mt-3 font-body text-body-sm text-ink-body leading-relaxed min-h-[66px]">{s.line}</p>
              <ul className="mt-5 space-y-2 border-t border-ink-headline/15 pt-5" aria-label={`${s.stage} tools`}>
                {s.tools.map((t) => (
                  <li key={t} className="flex items-center gap-2.5 font-body text-body-sm font-semibold text-ink-headline">
                    <span aria-hidden="true" className="w-1.5 h-1.5 bg-brand-yellow shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
