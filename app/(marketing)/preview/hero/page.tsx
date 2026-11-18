import type { Metadata } from "next";
import Link from "next/link";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { HeroFounder } from "@/components/hero/HeroFounder";

/* Internal review page (18 Nov 2026): hero options A–F for
   the brand home page. Not linked, not indexed. Delete once one is chosen. */
export const metadata: Metadata = {
  title: "Hero options — preview",
  robots: { index: false, follow: false },
};

function Label({ name, note }: { name: string; note: string }) {
  return (
    <div className="bg-brand-yellow">
      <div className="container-layout py-4 flex flex-wrap items-baseline gap-x-4">
        <span className="font-display font-bold text-[20px] text-ink-headline">{name}</span>
        <span className="font-body text-body-sm text-ink-headline/80">{note}</span>
      </div>
    </div>
  );
}

function Buttons({ dark = false }: { dark?: boolean }) {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
      <Link
        href="/book-consultation"
        className="inline-flex items-center gap-2 rounded-md bg-brand-yellow px-7 py-4 font-body font-semibold text-body text-ink-headline hover:bg-ink-headline hover:text-white transition-colors duration-hover"
      >
        Apply for a diagnostic <span aria-hidden="true">→</span>
      </Link>
      <Link
        href="/work"
        className={`inline-flex items-center rounded-md border px-7 py-4 font-body text-body transition-colors duration-hover ${
          dark ? "border-white/30 text-white hover:border-white" : "border-ink-headline/25 text-ink-headline hover:border-ink-headline"
        }`}
      >
        See the work
      </Link>
    </div>
  );
}

/* A — White and quiet. Headline only, one supporting line. */
function HeroA() {
  return (
    <section className="bg-white">
      <div className="container-layout min-h-[78vh] flex items-center justify-center py-24">
        <div className="max-w-[960px] text-center">
          <h1 className="font-bold tracking-[-0.04em] text-ink-headline text-[48px] sm:text-[68px] md:text-[92px] leading-[0.98] text-balance">
            Your channels aren&apos;t the problem.
          </h1>
          <p className="mt-6 font-display font-extralight tracking-[-0.03em] text-ink-headline/55 text-[30px] sm:text-[42px] md:text-[56px] leading-[1.05]">
            What&apos;s underneath them is.
          </p>
          <p className="mt-10 mx-auto max-w-[46ch] font-body text-body-lg text-ink-body leading-relaxed">
            We fix the layer beneath your marketing — positioning, measurement, conversion — so every
            channel compounds.
          </p>
          <Buttons />
        </div>
      </div>
    </section>
  );
}

/* B — Dark green, statement-size. One highlighted word, no paragraph. */
function HeroB() {
  return (
    <section className="bg-ink-headline text-white">
      <div className="container-layout min-h-[78vh] flex items-center justify-center py-24">
        <div className="max-w-[1000px] text-center">
          <h1 className="font-bold tracking-[-0.04em] text-[48px] sm:text-[72px] md:text-[96px] leading-[0.98] text-balance">
            Growth is an{" "}
            <span className="highlight-mark text-ink-headline">architecture</span>{" "}
            problem.
          </h1>
          <p className="mt-10 mx-auto max-w-[44ch] font-body text-body-lg text-white/70 leading-relaxed">
            Your channels aren&apos;t the problem. What&apos;s underneath them is. We rebuild that
            layer so every rupee compounds.
          </p>
          <Buttons dark />
        </div>
      </div>
    </section>
  );
}

/* C — Light grey, founder signature. Headline + a one-line note signed by Nitish. */
function HeroC() {
  return (
    <section className="bg-bg-secondary">
      <div className="container-layout min-h-[78vh] flex items-center justify-center py-24">
        <div className="max-w-[900px] text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">
            Zeppstr Growth Media
          </p>
          <h1 className="mt-8 font-bold tracking-[-0.04em] text-ink-headline text-[46px] sm:text-[64px] md:text-[84px] leading-[1.0] text-balance">
            Your channels aren&apos;t the problem. What&apos;s{" "}
            <span className="highlight-mark">underneath</span> them is.
          </h1>
          <p className="mt-10 font-body text-body-lg text-ink-body">
            &ldquo;I read every diagnostic myself.&rdquo;
            <span className="ml-3 font-display font-bold text-ink-headline">— Nitish Kumar, Founder</span>
          </p>
          <Buttons />
        </div>
      </div>
    </section>
  );
}


/* ───────────── Visual options (original drawings, no stock imagery) ───────────── */

const CHANNELS = ["SEO", "Paid search", "Social", "Email"];
const LAYERS = ["Positioning", "Measurement", "Conversion"];

/* D — Blueprint. A tower drawn as an architect's elevation: the channels are the
   floors, and the three layers we rebuild sit below the ground line. */
function HeroD() {
  const floors = CHANNELS.slice().reverse();
  return (
    <section className="relative bg-ink-headline text-white overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative container-layout pt-20 pb-10 md:pt-24">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/55">Drawing 01 · Growth architecture</p>
          <h1 className="mt-6 font-bold tracking-[-0.04em] text-[44px] sm:text-[60px] md:text-[78px] leading-[1.0] text-balance">
            Your channels aren&apos;t the problem.{" "}
            <span className="text-brand-yellow">What&apos;s underneath them is.</span>
          </h1>
          <Buttons dark />
        </div>

        <svg viewBox="0 0 1000 420" className="mt-14 w-full max-w-[1000px] mx-auto block" role="img" aria-label="Elevation drawing: marketing channels as the floors of a building, sitting on three foundation layers — positioning, measurement and conversion">
          {/* tower */}
          <g stroke="#fff" strokeOpacity="0.85" fill="none" strokeWidth="1.5">
            <rect x="380" y="20" width="240" height="200" />
            {floors.map((_, i) => (
              <line key={i} x1="380" x2="620" y1={20 + (i + 1) * 50} y2={20 + (i + 1) * 50} />
            ))}
            {floors.map((_, i) =>
              [0, 1, 2, 3, 4].map((w) => (
                <rect key={`${i}-${w}`} x={398 + w * 44} y={34 + i * 50} width="26" height="22" strokeOpacity="0.35" />
              )),
            )}
          </g>
          {floors.map((f, i) => (
            <g key={f}>
              <line x1="620" x2="700" y1={45 + i * 50} y2={45 + i * 50} stroke="#fff" strokeOpacity="0.35" strokeDasharray="3 4" />
              <text x="708" y={49 + i * 50} fill="#fff" fillOpacity="0.8" fontSize="13" fontFamily="ui-monospace, monospace" letterSpacing="2">
                {f.toUpperCase()}
              </text>
            </g>
          ))}
          <text x="292" y="125" fill="#fff" fillOpacity="0.45" fontSize="11" fontFamily="ui-monospace, monospace" letterSpacing="2" textAnchor="end">CHANNELS</text>
          <line x1="300" x2="370" y1="121" y2="121" stroke="#fff" strokeOpacity="0.3" />

          {/* ground line */}
          <line x1="40" x2="960" y1="220" y2="220" stroke="#FFD031" strokeWidth="2" />
          {Array.from({ length: 46 }).map((_, i) => (
            <line key={i} x1={40 + i * 20} x2={30 + i * 20} y1="220" y2="232" stroke="#FFD031" strokeOpacity="0.6" />
          ))}
          <text x="40" y="210" fill="#FFD031" fontSize="11" fontFamily="ui-monospace, monospace" letterSpacing="2">GROUND LINE</text>

          {/* foundations */}
          {LAYERS.map((l, i) => (
            <g key={l}>
              <rect x={300 - i * 40} y={248 + i * 56} width={400 + i * 80} height="42" fill="#FFD031" fillOpacity={0.9 - i * 0.2} />
              <text x="500" y={274 + i * 56} textAnchor="middle" fill="#0F3D2E" fontSize="14" fontWeight="700" fontFamily="ui-monospace, monospace" letterSpacing="3">
                {l.toUpperCase()}
              </text>
            </g>
          ))}
          <text x="960" y="300" fill="#fff" fillOpacity="0.55" fontSize="11" fontFamily="ui-monospace, monospace" letterSpacing="2" textAnchor="end">WHAT WE REBUILD</text>
        </svg>
      </div>
    </section>
  );
}

/* E — Ground split. Above the line: the channels everyone sees, on white.
   Below it: the layers that decide whether they work, on brand green. */
function HeroE() {
  return (
    <section>
      <div className="bg-white">
        <div className="container-layout pt-20 md:pt-28 text-center">
          <h1 className="font-bold tracking-[-0.04em] text-ink-headline text-[44px] sm:text-[60px] md:text-[80px] leading-[1.0] text-balance">
            Your channels aren&apos;t the problem.
          </h1>
          <ul className="mt-12 flex flex-wrap justify-center gap-3" aria-label="Channels">
            {CHANNELS.map((c) => (
              <li key={c} className="rounded-full border border-ink-headline/20 px-5 py-2.5 font-body text-body text-ink-headline">
                {c}
              </li>
            ))}
          </ul>
          <div className="h-12" />
        </div>
      </div>
      <div className="relative bg-ink-headline text-white">
        <span aria-hidden="true" className="absolute top-0 inset-x-0 h-[3px] bg-brand-yellow" />
        <div className="container-layout pt-14 pb-20 md:pb-24 text-center">
          <p className="font-display font-bold tracking-[-0.04em] text-brand-yellow text-[40px] sm:text-[54px] md:text-[72px] leading-[1.0]">
            What&apos;s underneath them is.
          </p>
          <ol className="mt-12 mx-auto max-w-[760px] space-y-2" aria-label="What we rebuild">
            {LAYERS.map((l, i) => (
              <li
                key={l}
                className="flex items-center justify-between rounded-md px-6 py-4 font-mono text-[12px] uppercase tracking-[0.22em]"
                style={{ background: `rgba(255,255,255,${0.1 - i * 0.025})` }}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span className="font-semibold">{l}</span>
                <span className="text-white/40">Layer</span>
              </li>
            ))}
          </ol>
          <Buttons dark />
        </div>
      </div>
    </section>
  );
}

/* F — The stack. Split layout: claim on the left, an isometric stack on the
   right — thin channel slabs on top, heavy foundation slabs below. */
function Slab({ y, w, h, fill, side, top, label, dark }: { y: number; w: number; h: number; fill: string; side: string; top: string; label: string; dark?: boolean }) {
  const cx = 260, d = w / 2, k = d * 0.5;
  const topPts = `${cx},${y - k} ${cx + d},${y} ${cx},${y + k} ${cx - d},${y}`;
  const left = `${cx - d},${y} ${cx},${y + k} ${cx},${y + k + h} ${cx - d},${y + h}`;
  const right = `${cx + d},${y} ${cx},${y + k} ${cx},${y + k + h} ${cx + d},${y + h}`;
  return (
    <g>
      <polygon points={left} fill={fill} />
      <polygon points={right} fill={side} />
      <polygon points={topPts} fill={top} />
      <text x={cx} y={y + 5} textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="ui-monospace, monospace" letterSpacing="2" fill={dark ? "#0F3D2E" : "#ffffff"}>
        {label.toUpperCase()}
      </text>
    </g>
  );
}

function HeroF() {
  return (
    <section className="bg-bg-secondary">
      <div className="container-layout py-20 md:py-28 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">Zeppstr Growth Media</p>
          <h1 className="mt-6 font-bold tracking-[-0.04em] text-ink-headline text-[44px] sm:text-[58px] md:text-[72px] leading-[1.0] text-balance">
            Your channels aren&apos;t the problem. What&apos;s <span className="highlight-mark">underneath</span> them is.
          </h1>
          <p className="mt-8 max-w-[44ch] font-body text-body-lg text-ink-body leading-relaxed">
            We build the three layers every channel stands on, so each one compounds instead of competing.
          </p>
          <div className="[&>div]:justify-start">
            <Buttons />
          </div>
        </div>
        <div className="lg:col-span-6">
          <svg viewBox="0 0 520 470" className="w-full max-w-[520px] mx-auto block" role="img" aria-label="Isometric stack: four thin channel slabs resting on three thick foundation slabs labelled positioning, measurement and conversion">
            {/* foundations, bottom up */}
            <Slab y={360} w={440} h={46} fill="#0F3D2E" side="#0B2E22" top="#14523D" label="Positioning" />
            <Slab y={300} w={440} h={46} fill="#0F3D2E" side="#0B2E22" top="#1A6049" label="Measurement" />
            <Slab y={240} w={440} h={46} fill="#E6B800" side="#CCA300" top="#FFD031" label="Conversion" dark />
            {/* channels */}
            {CHANNELS.map((c, i) => (
              <Slab key={c} y={190 - i * 40} w={360 - i * 30} h={14} fill="#D8DDD9" side="#C5CBC7" top="#FFFFFF" label={c} dark />
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}

export default function HeroOptions() {
  return (
    <>
      <GlobalNav />
      <main>
        <Label name="Option A — White and quiet" note="Headline only, lighter second line, one sentence. Most minimal." />
        <HeroA />
        <Label name="Option B — Statement" note="Dark green, one big claim, one highlighted word, short line under it." />
        <HeroB />
        <Label name="Option C — Founder signature" note="Light grey, headline with one highlighted word, a one-line signed note." />
        <HeroC />
        <Label name="Option D — Blueprint" note="An architect's drawing: channels are the floors, the three layers sit below the ground line." />
        <HeroD />
        <Label name="Option E — Ground split" note="Channels on white above the line, the layers underneath on green below it." />
        <HeroE />
        <Label name="Option F — The stack" note="Claim on the left, an isometric stack on the right: thin channels on heavy foundations." />
        <HeroF />
        <Label name="Current (you said it's not working)" note="For comparison." />
        <HeroFounder />
      </main>
    </>
  );
}
