import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { ServicePageLayout } from "@/components/solutions/ServicePageLayout";
import { SERVICE_CONTENT } from "@/lib/service-content";
import { CrawlBudgetAllocation } from "@/components/utility/CrawlBudgetAllocation";

/**
 * /solutions/organic-growth/technical-seo
 *
 * A standalone page, matching the other services in this practice. Before this
 * it was seeded as a sub-service — so it appeared in the mega-menu and the
 * practice page's service list — but had no page file, and fell through to the
 * generic [service] template: a headline, a one-line tagline, a CTA. A menu
 * item that led nowhere useful.
 *
 * Layout is shared (components/solutions/ServicePageLayout) so a fix lands on
 * every service at once. The copy is this service's own and lives in
 * lib/service-content.ts.
 *
 * NOTE ON NUMBERS: this page carries no stats band. The only outcome figures we
 * can defend belong to TRU Aquapolis, which is a paid-media engagement — using
 * them here would imply a result this service did not produce. An empty proof
 * slot is the honest state until there is a published result for it.
 */

export const metadata: Metadata = buildMetadata({
  title: "Technical SEO & Crawl Engineering — Organic Growth | Zeppstr",
  description:
    "Crawl and index audit, Core Web Vitals diagnosed at source, structured data, redirect and migration hygiene. Infrastructure work that removes a ceiling rather than adding traffic.",
  path: "/solutions/organic-growth/technical-seo",
});

const LOGOS = [
  { name: "Prohance", file: "prohance.png" },
  { name: "Fixstars", file: "fixstars.png" },
  { name: "Empuls", file: "empuls.png" },
  { name: "VehicleMall", file: "vehiclemall.png" },
  { name: "Tristar Online", file: "tristar-online.png" },
  { name: "Sky Phonez", file: "sky-phonez.png" },
];

export default function Page() {
  return (
    <ServicePageLayout
      name="Technical SEO & Crawl Engineering"
      parent={{ name: "Organic Growth Practice", slug: "organic-growth" }}
      content={SERVICE_CONTENT["technical-seo"]}
      graphic={<CrawlBudgetAllocation />}
      logos={LOGOS}
      ctaLabel="Apply for a technical audit"
      headline={
        <>
          Nothing looks broken.{" "}
          <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
            That is the problem
          </span>
          .
        </>
      }
    />
  );
}
