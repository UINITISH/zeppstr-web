import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { ServicePageLayout } from "@/components/solutions/ServicePageLayout";
import { SERVICE_CONTENT } from "@/lib/service-content";
import { DecisionCadenceLoop } from "@/components/utility/DecisionCadenceLoop";

/**
 * /solutions/growth-strategy-advisory/growth-strategy-operating-model
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
  title: "Growth Strategy & Operating Model — Growth Strategy & Advisory | Zeppstr",
  description:
    "One north-star metric with an owner, a decision cadence that forces a choice, channel roles stated, and a stop list. The machinery that turns a strategy into weekly decisions.",
  path: "/solutions/growth-strategy-advisory/growth-strategy-operating-model",
});

const LOGOS = [
  { name: "Tru Aquapolis", file: "tru-aquapolis.png" },
  { name: "Moonwalk", file: "moonwalk.png" },
  { name: "Empuls", file: "empuls.png" },
  { name: "Prohance", file: "prohance.png" },
  { name: "TruGlobal", file: "truglobal.png" },
  { name: "Leverage Edu", file: "leverage-edu.png" },
];

export default function Page() {
  return (
    <ServicePageLayout
      name="Growth Strategy & Operating Model"
      parent={{ name: "Growth Strategy & Advisory", slug: "growth-strategy-advisory" }}
      content={SERVICE_CONTENT["growth-strategy-operating-model"]}
      graphic={<DecisionCadenceLoop />}
      logos={LOGOS}
      ctaLabel="Apply for a diagnostic"
      headline={
        <>
          Everyone is busy.{" "}
          <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
            Nothing moved
          </span>
          .
        </>
      }
    />
  );
}
