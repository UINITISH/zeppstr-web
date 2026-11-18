import type { Metadata } from "next";
import Link from "next/link";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { MethodologyFlow } from "@/components/blocks/MethodologyFlow";
import { ToolsWall } from "@/components/blocks/ToolsWall";
import { AIStack } from "@/components/blocks/AIStack";

/* PREVIEW 18 Nov 2026 — "How we work" page: the method, the platforms and the
   AI stack, moved off the home page so the home page stays a brand page.
   Becomes /how-we-work once approved. Not linked, not indexed. */
export const metadata: Metadata = {
  title: "How we work — preview",
  robots: { index: false, follow: false },
};

export default function HowWeWorkPreview() {
  return (
    <>
      <GlobalNav />
      <main>
        <section className="bg-ink-headline text-white">
          <div className="container-layout pt-16 pb-24 md:pt-20 md:pb-32">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">How we work</p>
            <h1 className="font-bold tracking-[-0.03em] text-display-xl leading-[1.02] max-w-[18ch] text-balance">
              One method. The right platforms. AI at{" "}
              <span className="highlight-mark text-ink-headline">every</span> stage.
            </h1>
            <p className="mt-8 font-body text-body-lg text-white/75 max-w-[58ch] leading-relaxed">
              How an engagement runs, from the first diagnostic to the system we operate with you, and
              the platforms and AI tools behind each step.
            </p>
          </div>
        </section>

        <MethodologyFlow />
        <ToolsWall />
        <AIStack />

        <section className="bg-bg-secondary border-t border-ink-headline/10">
          <div className="container-layout py-20 flex flex-wrap items-center justify-between gap-6">
            <p className="font-display font-bold text-display-md text-ink-headline tracking-[-0.02em]">
              See it applied.
            </p>
            <div className="flex gap-4">
              <Link href="/work" className="px-6 py-3 border border-ink-headline rounded-md font-body text-body text-ink-headline hover:bg-ink-headline hover:text-white transition-colors">
                Selected work
              </Link>
              <Link href="/book-consultation" className="px-6 py-3 bg-brand-yellow rounded-md font-body font-semibold text-body text-ink-headline hover:bg-white transition-colors">
                Apply for a diagnostic →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
