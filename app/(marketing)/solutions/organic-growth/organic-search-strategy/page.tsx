import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { ServicePageLayout } from "@/components/solutions/ServicePageLayout";
import { SERVICE_CONTENT } from "@/lib/service-content";
import { IntentLadder } from "@/components/utility/IntentLadder";

/**
 * /solutions/organic-growth/organic-search-strategy
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
  title: "Organic Search Strategy — Organic Growth | Zeppstr",
  description:
    "Demand mapped to decisions rather than to keyword volume. Topic architecture, cannibalisation audit, and reporting on qualified sessions instead of rankings.",
  path: "/solutions/organic-growth/organic-search-strategy",
});

const LOGOS = [
  { name: "Mini Leaves", file: "mini-leaves.png" },
  { name: "Wise Market", file: "wise-market.png" },
  { name: "Invest in Sharjah", file: "invest-in-sharjah.png" },
  { name: "Homatico", file: "homatico.png" },
  { name: "Prohance", file: "prohance.png" },
  { name: "LearnCab", file: "learncab.png" },
];

export default function Page() {
  return (
    <ServicePageLayout
      name="Organic Search Strategy"
      parent={{ name: "Organic Growth Practice", slug: "organic-growth" }}
      content={SERVICE_CONTENT["organic-search-strategy"]}
      graphic={<IntentLadder />}
      logos={LOGOS}
      ctaLabel="Apply for an organic audit"
      headline={
        <>
          Rank for the{" "}
          <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
            decision
          </span>
          , not the keyword.
        </>
      }
    />
  );
}
