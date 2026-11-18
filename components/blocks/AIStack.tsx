"use client";

import { useState } from "react";
import Image from "next/image";
import { AI_STAGES } from "@/lib/ai-stack";

/** AI STACK — homepage section (chosen 18 Nov 2026: "Option B — Explorer").
 *  Stage list on the left, the chosen stage in a large dark panel on the right
 *  with each tool's logo. Hover or tap to switch. Data: lib/ai-stack.ts. */
export function AIStack() {
  const [active, setActive] = useState(0);
  const s = AI_STAGES[active];
  return (
    <section className="bg-white border-t border-ink-headline/10" aria-labelledby="ai-stack-heading">
      <div className="container-layout py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-16 items-end">
          <div className="md:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">Our AI stack</p>
            <h2 id="ai-stack-heading" className="font-bold tracking-[-0.025em] text-display-lg text-ink-headline leading-[1.05] max-w-[22ch] text-balance">
              An AI tool at every stage of the work. A person making the{" "}
              <span className="highlight-mark">call.</span>
            </h2>
          </div>
          <p className="md:col-span-4 font-body text-body-lg text-ink-body leading-relaxed">
            Pick a stage to see what AI does there, and which tools we use.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
          <div className="lg:col-span-5" role="tablist" aria-label="Stages of the work" aria-orientation="vertical">
            {AI_STAGES.map((st, i) => {
              const on = i === active;
              return (
                <button
                  key={st.stage}
                  role="tab"
                  id={`ai-tab-${i}`}
                  aria-selected={on}
                  aria-controls="ai-panel"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`w-full flex items-center gap-5 text-left py-4 border-b border-ink-headline/10 transition-colors duration-hover ${
                    on ? "text-ink-headline" : "text-ink-muted hover:text-ink-headline"
                  }`}
                >
                  <span className={`w-1 self-stretch rounded-full transition-colors ${on ? "bg-brand-yellow" : "bg-transparent"}`} />
                  <span className="font-mono text-[11px] tracking-[0.2em] w-7">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`font-display text-[20px] md:text-[22px] tracking-[-0.02em] ${on ? "font-bold" : "font-medium"}`}>
                    {st.stage}
                  </span>
                  <span aria-hidden="true" className="ml-auto hidden sm:flex items-center gap-1.5">
                    {st.tools
                      .filter((t) => t.logo)
                      .slice(0, 4)
                      .map((t) => (
                        <Image
                          key={t.name}
                          src={`/ai-tool-logos/${t.logo}.svg`}
                          alt=""
                          width={18}
                          height={18}
                          className={`w-[18px] h-[18px] transition-all duration-hover ${
                            on ? "opacity-100" : "grayscale opacity-40"
                          }`}
                        />
                      ))}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="ai-panel"
            role="tabpanel"
            aria-labelledby={`ai-tab-${active}`}
            className="lg:col-span-7 rounded-xl bg-ink-headline text-white p-8 md:p-12 flex flex-col min-h-[420px] lg:sticky lg:top-[calc(var(--nav-h)+24px)] self-start"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-yellow">
              Stage {String(active + 1).padStart(2, "0")} of {AI_STAGES.length}
            </p>
            <h3 className="mt-5 font-display font-bold text-[34px] md:text-[44px] tracking-[-0.03em] leading-[1.05]">
              {s.stage}
            </h3>
            <p className="mt-5 font-body text-body-lg text-white/75 leading-relaxed max-w-[44ch]">{s.line}</p>
            <ul className="mt-auto pt-10 grid grid-cols-2 gap-3" aria-label={`${s.stage} tools`}>
              {s.tools.map((t) => (
                <li
                  key={t.name}
                  className="flex items-center gap-4 rounded-lg bg-white px-5 py-4 text-ink-headline shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                >
                  {t.logo ? (
                    <Image
                      src={`/ai-tool-logos/${t.logo}.svg`}
                      alt={`${t.name} logo`}
                      width={36}
                      height={36}
                      className="w-9 h-9 shrink-0"
                    />
                  ) : (
                    /* Logo file not supplied yet — see lib/ai-stack.ts. */
                    <span aria-hidden="true" className="w-9 h-9 shrink-0 rounded-md border border-dashed border-ink-headline/25" />
                  )}
                  <span className="font-display font-bold text-[16px] md:text-[17px] tracking-[-0.01em] leading-tight">
                    {t.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 font-body text-body-sm text-ink-muted">
          AI speeds up the work; every output is reviewed by a person before it ships.
        </p>
      </div>
    </section>
  );
}
