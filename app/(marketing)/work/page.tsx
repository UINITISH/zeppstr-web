import type { Metadata } from "next";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { CTABanner } from "@/components/blocks/CTABanner";
import { sanity } from "@/sanity/lib/client";
import { allCaseStudiesQuery } from "@/sanity/lib/queries";
import type { CaseStudy, Industry } from "@/sanity/lib/types";

interface CaseStudyListItem extends Pick<CaseStudy, "_id" | "clientName" | "slug" | "headlineMetric" | "headlineTimeframe" | "heroImage"> {
  industry?: Pick<Industry, "_id" | "name" | "slug">;
}

export const metadata: Metadata = {
  title: "Work · Client Outcomes",
  description:
    "Three flagship case studies and growing portfolio. Real revenue numbers, real client transformations, across e-commerce, real estate, government, and DTC.",
};

export default async function WorkHubPage() {
  const cases = await sanity.fetch<CaseStudyListItem[]>(allCaseStudiesQuery);

  return (
    <>
      <GlobalNav />
      <main>
        <section className="container-layout pt-20 md:pt-32 pb-16 text-center">
          <p className="eyebrow mb-6">Work</p>
          <h1 className="font-extralight tracking-tight text-display-xl text-ink-headline mb-8 max-w-[24ch] mx-auto">
            Three businesses. Three industries. One pattern.
          </h1>
          <p className="font-body text-body-lg text-ink-body max-w-[60ch] mx-auto">
            When marketing structure is built right, the channels start compounding. Each story
            below is the system we built and the numbers it produced — not the campaign that
            happened to land.
          </p>
        </section>

        {/* All case studies */}
        <section className="container-layout pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((cs) => (
              <CaseStudyCard key={cs._id} caseStudy={cs as any} />
            ))}
          </div>
        </section>

        {/* Empty state if no cases yet */}
        {cases.length === 0 && (
          <div className="container-layout py-20 text-center">
            <p className="font-body text-body-lg text-ink-muted">
              First case studies publishing soon.{" "}
              <a href="/insights/the-brief" className="text-brand-blue underline">
                Subscribe to The Brief
              </a>{" "}
              to get them in your inbox.
            </p>
          </div>
        )}

        <CTABanner
          eyebrow="Engage"
          heading="Want a system like this for your business?"
          subhead="Apply for a Strategic Diagnostic. Honest assessment, written deliverable, no agency-pitch dressed up as a report."
          primary={{ label: "Apply for a Diagnostic", href: "/book-consultation" }}
          secondary={{ label: "Or just say hi", href: "/contact" }}
        />
      </main>
      <Footer />
    </>
  );
}
