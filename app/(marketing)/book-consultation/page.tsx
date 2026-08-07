import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { DiagnosticIntake } from "@/components/forms/DiagnosticIntake";

export const metadata: Metadata = buildMetadata({
  title: "Apply for a Diagnostic — Zeppstr",
  description:
    "A 5-step intake. We read your inputs and return a preliminary diagnosis before any conversation. The 45-minute paid diagnostic comes after — refunded in full if we’re not the right fit.",
  path: "/book-consultation",
})

export default function BookConsultationPage() {
  return (
    <>
      <GlobalNav />
      <main className="bg-bg-primary">
        {/* Page header */}
        <section className="border-b border-ink-headline/10">
          <div className="container-layout pt-20 md:pt-28 pb-12 md:pb-16">
            <div className="flex items-center gap-4 mb-8">
              <span aria-hidden="true" className="block w-2.5 h-2.5 bg-brand-yellow flex-shrink-0" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                Engage — Diagnostic intake
              </p>
            </div>
            <h1 className="font-bold tracking-[-0.025em] text-[clamp(40px,6vw,88px)] text-ink-headline leading-[1.05] max-w-[20ch] text-balance mb-8">
              Tell us where it&rsquo;s leaking. We&rsquo;ll send a{" "}
              <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                preliminary read
              </span>{" "}
              within 24 hours.
            </h1>
            <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[58ch]">
              Five short steps, about three minutes. We map your situation against the patterns
              we&rsquo;ve seen across 300+ businesses and return a written diagnosis to your inbox
              within 24 hours. It&rsquo;s yours to keep, even if we never speak again. The
              45-minute paid diagnostic comes after — refunded in full if we&rsquo;re not the
              right fit for each other.
            </p>
          </div>
        </section>

        {/* The form itself (client component) */}
        <DiagnosticIntake />
      </main>
      <Footer />
    </>
  );
}
