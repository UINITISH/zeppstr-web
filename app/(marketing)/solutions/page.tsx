import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { SolutionCard } from "@/components/cards/SolutionCard";
import { CTABanner } from "@/components/blocks/CTABanner";
import { sanity } from "@/sanity/lib/client";
import { allSolutionsQuery } from "@/sanity/lib/queries";
import type { Solution } from "@/sanity/lib/types";

export const metadata: Metadata = buildMetadata({
  title: "Solutions",
  description:
    "Five practices. Built to drive measurable, compounding growth. Growth Strategy & Advisory · Organic Growth Practice · Performance Media · Experience & Engineering · Brand, Engagement & Lifecycle.",
  path: "/solutions",
})

export default async function SolutionsHubPage() {
  const solutions = await sanity.fetch<Solution[]>(allSolutionsQuery);

  return (
    <>
      <GlobalNav />
      <main>
        <section className="container-layout pt-20 md:pt-32 pb-16 text-center">
          <p className="eyebrow mb-6">Solutions</p>
          <h1 className="font-extralight tracking-tight text-display-xl text-ink-headline mb-8 max-w-[22ch] mx-auto">
            Five practices. Built to drive measurable, compounding growth.
          </h1>
          <p className="font-body text-body-lg text-ink-body max-w-[60ch] mx-auto">
            Growth Strategy & Advisory · Organic Growth Practice · Performance Media · Experience &
            Engineering · Brand, Engagement & Lifecycle. Each one its own deep practice. All five run as
            one connected revenue system when you engage on more than one.
          </p>
        </section>

        <section className="container-layout pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, idx) => (
              <SolutionCard
                key={solution._id}
                solution={solution}
                number={`Solution 0${idx + 1}`}
              />
            ))}
          </div>
        </section>

        <CTABanner
          eyebrow="Engage"
          heading="Want to see which Solutions fit your business?"
          subhead="Apply for a Strategic Diagnostic. We’ll diagnose what’s actually broken and recommend the practices that fix it."
          primary={{ label: "Apply for a Diagnostic", href: "/book-consultation" }}
          secondary={{ label: "Or just say hi", href: "/contact" }}
        />
      </main>
      <Footer />
    </>
  );
}
