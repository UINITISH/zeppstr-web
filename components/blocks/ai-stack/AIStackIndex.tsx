import { AI_STAGES } from "@/lib/ai-stack";

/** Option C — INDEX. Editorial list, one full-width row per stage, the same
 *  language as the case-study pages. Row turns yellow on hover. */
export function AIStackIndex() {
  const toolCount = new Set(AI_STAGES.flatMap((s) => s.tools)).size;
  return (
    <section className="bg-white border-t border-ink-headline/10" aria-labelledby="ai-c-heading">
      <div className="container-layout py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-16 items-end">
          <div className="md:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">Our AI stack</p>
            <h2 id="ai-c-heading" className="font-bold tracking-[-0.025em] text-display-lg text-ink-headline leading-[1.05] max-w-[22ch] text-balance">
              An AI tool at every stage of the work. A person making the{" "}
              <span className="highlight-mark">call.</span>
            </h2>
          </div>
          <dl className="md:col-span-4 grid grid-cols-2 gap-6 md:justify-items-end">
            <div className="md:text-right">
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">Stages</dt>
              <dd className="font-display font-extralight text-[64px] leading-none tracking-[-0.04em] text-ink-headline">{AI_STAGES.length}</dd>
            </div>
            <div className="md:text-right">
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">AI tools</dt>
              <dd className="font-display font-extralight text-[64px] leading-none tracking-[-0.04em] text-ink-headline">{toolCount}</dd>
            </div>
          </dl>
        </div>

        <ol className="border-t-2 border-ink-headline">
          {AI_STAGES.map((s, i) => (
            <li
              key={s.stage}
              className="group grid md:grid-cols-12 gap-3 md:gap-8 items-center py-6 md:py-7 px-2 md:px-4 border-b border-ink-headline/15 transition-colors duration-hover hover:bg-brand-yellow"
            >
              <span className="md:col-span-1 font-display font-extralight text-[32px] leading-none tracking-[-0.03em] text-ink-headline/40 group-hover:text-ink-headline">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="md:col-span-3 font-display font-bold text-[22px] tracking-[-0.02em] text-ink-headline leading-tight">
                {s.stage}
              </h3>
              <p className="md:col-span-4 font-body text-body text-ink-body leading-relaxed">{s.line}</p>
              <ul className="md:col-span-4 flex flex-wrap gap-2 md:justify-end" aria-label={`${s.stage} tools`}>
                {s.tools.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-ink-headline/20 bg-white px-3 py-1.5 font-body text-[13px] font-semibold text-ink-headline"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <p className="mt-8 font-body text-body-sm text-ink-muted">
          AI speeds up the work; every output is reviewed by a person before it ships.
        </p>
      </div>
    </section>
  );
}
