import type { CaseStudyMetrics } from "@/lib/case-study-metrics";

/**
 * "By the numbers" — dependency-free case-study visualizations.
 * Server component: pure CSS/flex bars, no chart library, no client JS.
 * Colors are inline hex (brand tokens) so rendering is independent of
 * Tailwind class availability.
 */

const GREEN = "#064E3B";
const YELLOW = "#FFD031";
const TRACK = "#ECEAE3";

function isImprovement(d: { delta: string; goodWhenLower?: boolean }): boolean | null {
  if (/^\+/.test(d.delta)) return !d.goodWhenLower; // an increase — good unless lower-is-better
  if (/^−|^-/.test(d.delta)) return !!d.goodWhenLower; // a decrease — good only when lower-is-better
  return null; // neutral (e.g. "in 3 months")
}

export function CaseStudyMetrics({ data }: { data: CaseStudyMetrics }) {
  const { stats, channelMix, leadProgression } = data;
  const maxCol = leadProgression
    ? Math.max(...leadProgression.points.map((p) => p.value))
    : 0;

  return (
    <section className="container-layout py-16 border-t border-rule">
      <p className="eyebrow mb-8">By the numbers</p>

      {/* Stat band */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-rule border border-rule mb-16">
        {stats.map((s) => {
          const good = isImprovement(s);
          const accent = good === false ? "#B23B3B" : GREEN;
          return (
            <div key={s.label} className="bg-bg-primary p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted mb-4">
                {s.label}
              </p>
              <p className="font-display font-extralight text-display-md leading-none text-ink-headline">
                {s.after}
              </p>
              <p className="font-body text-body-sm text-ink-muted mt-2">
                from {s.before}
              </p>
              <span
                className="inline-block mt-3 font-mono text-[12px] font-medium"
                style={{ color: accent }}
              >
                {good === true ? "▲ " : good === false ? "▼ " : ""}
                {s.delta}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Lead progression columns */}
        {leadProgression && (
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-headline mb-6">
              {leadProgression.unit}
            </p>
            <div className="flex items-end gap-2 h-48" role="img" aria-label={leadProgression.unit}>
              {leadProgression.points.map((p, i) => {
                const h = maxCol > 0 ? Math.max(6, Math.round((p.value / maxCol) * 100)) : 0;
                const last = i === leadProgression.points.length - 1;
                return (
                  <div key={p.label} className="flex-1 flex flex-col items-center justify-end h-full">
                    <span className="font-mono text-[10px] text-ink-muted mb-1">{p.value}</span>
                    <div
                      className="w-full"
                      style={{ height: `${h}%`, backgroundColor: last ? GREEN : YELLOW }}
                    />
                    <span className="font-mono text-[10px] text-ink-muted mt-2">{p.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Channel mix horizontal bars */}
        {channelMix && (
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-headline mb-6">
              Lead source mix
            </p>
            <div className="space-y-3">
              {channelMix.map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <span className="w-40 shrink-0 font-body text-body-sm text-ink-body text-right">
                    {c.label}
                  </span>
                  <div className="flex-1 h-5" style={{ backgroundColor: TRACK }}>
                    <div
                      className="h-full"
                      style={{ width: `${c.value}%`, backgroundColor: GREEN }}
                    />
                  </div>
                  <span className="w-10 shrink-0 font-mono text-[12px] text-ink-headline">
                    {c.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
