/**
 * AI STACK — the AI tools Zeppstr uses at each stage of the work.
 * Added to the homepage 18 Nov 2026, directly after the tools wall.
 *
 * Tool list approved by Nitish 18 Nov 2026. RULE: only list a tool the team
 * actually uses on client work — clients ask. Tools are text chips for now;
 * swap in logos (public/ai-tool-logos/) when files are supplied.
 *
 * 9 stages in a 1 / 2 / 3 column grid. 9 divides by 3; at 2 columns the last
 * card spans both columns so no row is left ragged.
 */

const STAGES = [
  {
    stage: "Research & strategy",
    line: "Market, competitor, keyword and audience research, done in days.",
    tools: ["Claude", "ChatGPT", "Perplexity", "Gemini"],
  },
  {
    stage: "Content & copy",
    line: "First drafts of web, ad, email and social copy, then edited by our writers.",
    tools: ["Claude", "ChatGPT", "Grammarly"],
  },
  {
    stage: "Design & creative",
    line: "Concepts, layouts, ad variations and imagery.",
    tools: ["Figma", "Midjourney", "Adobe Firefly", "Canva"],
  },
  {
    stage: "Video & voice",
    line: "Short-form video, motion and voiceovers.",
    tools: ["Higgsfield", "Runway", "ElevenLabs", "HeyGen"],
  },
  {
    stage: "Build & development",
    line: "Design to working code, faster builds, cleaner launches.",
    tools: ["Claude Code", "Vercel", "Cursor", "GitHub Copilot"],
  },
  {
    stage: "Prospecting & CRM",
    line: "Finding decision-makers, enriching leads and scoring them before handover.",
    tools: ["Apollo", "Clay", "HubSpot"],
  },
  {
    stage: "Ads & optimisation",
    line: "Bidding, audience targeting and budget moved to what converts.",
    tools: ["Google Ads (Performance Max)", "Meta Advantage+"],
  },
  {
    stage: "Analytics & reporting",
    line: "Daily data pulls, problem alerts, client reports.",
    tools: ["Supermetrics", "Google Analytics 4", "Looker Studio"],
  },
  {
    stage: "Automation",
    line: "Connecting every tool so leads and data move without manual work.",
    tools: ["Zapier", "Make", "n8n"],
  },
];

export function AIStack() {
  return (
    <section className="bg-ink-headline text-white" aria-labelledby="ai-stack-heading">
      <div className="container-layout py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-20 items-end">
          <div className="md:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
              Our AI stack
            </p>
            <h2
              id="ai-stack-heading"
              className="font-bold tracking-[-0.025em] text-display-lg leading-[1.05] max-w-[22ch] text-balance"
            >
              An AI tool at every stage of the work. A person making the{" "}
              <span className="highlight-mark text-ink-headline">call.</span>
            </h2>
          </div>
          <p className="md:col-span-4 font-body text-body-lg text-white/75 leading-relaxed">
            From research to reporting, each step runs on purpose-built AI tools, chosen for the job
            and reviewed by our team before anything reaches you.
          </p>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden">
          {STAGES.map((s, i) => (
            <li
              key={s.stage}
              className={`group bg-ink-headline p-8 md:p-9 flex flex-col transition-colors duration-hover hover:bg-white/[0.04] ${
                i === STAGES.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-yellow">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className="h-px flex-1 bg-white/15 group-hover:bg-brand-yellow/60 transition-colors duration-hover" />
              </div>
              <h3 className="mt-6 font-display font-bold text-[22px] md:text-[24px] tracking-[-0.02em] leading-tight">
                {s.stage}
              </h3>
              <p className="mt-3 font-body text-body text-white/70 leading-relaxed">{s.line}</p>
              <ul className="mt-auto pt-7 flex flex-wrap gap-2" aria-label={`${s.stage} tools`}>
                {s.tools.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-white/20 bg-white/[0.06] px-3 py-1.5 font-body text-[13px] text-white/90"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <p className="mt-8 flex items-center gap-3 font-body text-body-sm text-white/60">
          <span aria-hidden="true" className="inline-block w-1.5 h-1.5 bg-brand-yellow" />
          AI speeds up the work; every output is reviewed by a person before it ships.
        </p>
      </div>
    </section>
  );
}
