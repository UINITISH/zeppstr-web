import type { Metadata } from "next";
import Link from "next/link";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { HeroFounder } from "@/components/hero/HeroFounder";

/* Internal review page (18 Nov 2026): three plain, centred hero options for
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
        <Label name="Current (you said it's not working)" note="For comparison." />
        <HeroFounder />
      </main>
    </>
  );
}
