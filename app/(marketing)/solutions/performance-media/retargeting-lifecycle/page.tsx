import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { ServicePageLayout } from "@/components/solutions/ServicePageLayout";
import { SERVICE_CONTENT } from "@/lib/service-content";
import { WarmAudiencePool } from "@/components/utility/WarmAudiencePool";

/**
 * /solutions/performance-media/retargeting-lifecycle
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
  title: "Retargeting & Lifecycle Acquisition — Performance Media | Zeppstr",
  description:
    "The warm audience a media programme accumulates is its durable output. Segmented by engagement depth, frequency-capped, and handed to owned channels rather than re-bought every month.",
  path: "/solutions/performance-media/retargeting-lifecycle",
});

const LOGOS = [
  { name: "Mini Leaves", file: "mini-leaves.png" },
  { name: "Wise Market", file: "wise-market.png" },
  { name: "Tristar Online", file: "tristar-online.png" },
  { name: "Sky Phonez", file: "sky-phonez.png" },
  { name: "Tru Aquapolis", file: "tru-aquapolis.png" },
  { name: "Empuls", file: "empuls.png" },
];

export default function Page() {
  return (
    <ServicePageLayout
      name="Retargeting & Lifecycle Acquisition"
      parent={{ name: "Performance Media", slug: "performance-media" }}
      content={SERVICE_CONTENT["retargeting-lifecycle"]}
      graphic={<WarmAudiencePool />}
      logos={LOGOS}
      ctaLabel="Apply for a funnel audit"
      headline={
        <>
          Stop re-buying{" "}
          <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
            the same people
          </span>
          .
        </>
      }
    />
  );
}
