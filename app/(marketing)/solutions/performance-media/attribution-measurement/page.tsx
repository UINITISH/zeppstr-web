import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { ServicePageLayout } from "@/components/solutions/ServicePageLayout";
import { SERVICE_CONTENT } from "@/lib/service-content";
import { SignalReconciliation } from "@/components/utility/SignalReconciliation";

/**
 * /solutions/performance-media/attribution-measurement
 *
 * A standalone page, like Paid Search and Paid Social. Before this it had no
 * page file at all and fell through to the generic [service] template, which
 * rendered a headline, a one-line tagline and a CTA — nothing a prospect could
 * act on.
 *
 * The eleven-section layout is shared (components/solutions/ServicePageLayout)
 * so a spacing or accessibility fix lands on every service at once rather than
 * in one of five copies. The copy is this service's own and lives in
 * lib/service-content.ts.
 */

export const metadata: Metadata = buildMetadata({
  title: "Attribution & Measurement — Performance Media | Zeppstr",
  description:
    "Measurement is the signal your bidding learns from, not the report you show the board. Conversion tracking rebuilt against your CRM, server-side measurement, offline conversion import.",
  path: "/solutions/performance-media/attribution-measurement",
});

const LOGOS = [
  { name: "Tru Aquapolis", file: "tru-aquapolis.png" },
  { name: "Wise Market", file: "wise-market.png" },
  { name: "Mini Leaves", file: "mini-leaves.png" },
  { name: "VehicleMall", file: "vehiclemall.png" },
  { name: "Sky Phonez", file: "sky-phonez.png" },
  { name: "Homatico", file: "homatico.png" },
];

export default function Page() {
  return (
    <ServicePageLayout
      name="Attribution & Measurement"
      parent={{ name: "Performance Media", slug: "performance-media" }}
      content={SERVICE_CONTENT["attribution-measurement"]}
      graphic={<SignalReconciliation />}
      logos={LOGOS}
      ctaLabel="Apply for a tracking audit"
      headline={
        <>
          Your dashboard looks normal.{" "}
          <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
            That proves nothing
          </span>
          .
        </>
      }
    />
  );
}
