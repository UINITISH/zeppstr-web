import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { IndustryCard } from "@/components/cards/IndustryCard";
import { CTABanner } from "@/components/blocks/CTABanner";
import { sanity } from "@/sanity/lib/client";
import { allIndustriesQuery } from "@/sanity/lib/queries";
import type { Industry } from "@/sanity/lib/types";

export const metadata: Metadata = buildMetadata({
  title: "Industries",
  description:
    "The categories where Zeppstr runs growth systems — Real Estate, E-commerce / D2C, SaaS / Tech, Healthcare & Wellness, EdTech / Education, Professional Services.",
  path: "/industries",
})

export default async function IndustriesHubPage() {
  const industries = await sanity.fetch<Industry[]>(allIndustriesQuery);

  return (
    <>
      <GlobalNav />
      <main>
        <section className="container-layout pt-20 md:pt-32 pb-16 text-center">
          <p className="eyebrow mb-6">Industries</p>
          <h1 className="font-extralight tracking-tight text-display-xl text-ink-headline mb-8 max-w-[22ch] mx-auto">
            The categories where we run growth systems.
          </h1>
          <p className="font-body text-body-lg text-ink-body max-w-[60ch] mx-auto">
            Six industries. 300+ businesses served across 10+ countries. Each industry page lays out
            what&rsquo;s broken in that category and the playbook we run to fix it.
          </p>
        </section>

        <section className="container-layout pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <IndustryCard key={industry._id} industry={industry} />
            ))}
          </div>
        </section>

        <CTABanner
          eyebrow="Engage"
          heading="Don’t see your industry?"
          subhead="Apply for a Strategic Diagnostic anyway. The methodology travels — we diagnose first, recommend industries fit second."
          primary={{ label: "Apply for a Diagnostic", href: "/book-consultation" }}
          secondary={{ label: "Or just say hi", href: "/contact" }}
        />
      </main>
      <Footer />
    </>
  );
}
