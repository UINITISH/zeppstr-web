import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { ServicePageLayout } from "@/components/solutions/ServicePageLayout";
import { SERVICE_CONTENT } from "@/lib/service-content";
import { CreativeTestGrid } from "@/components/utility/CreativeTestGrid";

/**
 * /solutions/performance-media/creative-strategy
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
  title: "Creative Strategy & Production — Performance Media | Zeppstr",
  description:
    "Concepts, not colour variants. In-house production, vertical-first framing, static treated as a first-class format, and a retirement rule that most retainers never enforce.",
  path: "/solutions/performance-media/creative-strategy",
});

const LOGOS = [
  { name: "Tru Aquapolis", file: "tru-aquapolis.png" },
  { name: "Mini Leaves", file: "mini-leaves.png" },
  { name: "Pohewala", file: "pohewala-2018.png" },
  { name: "Moonwalk", file: "moonwalk.png" },
  { name: "Sky Phonez", file: "sky-phonez.png" },
  { name: "Wise Market", file: "wise-market.png" },
];

export default function Page() {
  return (
    <ServicePageLayout
      name="Creative Strategy & Production"
      parent={{ name: "Performance Media", slug: "performance-media" }}
      content={SERVICE_CONTENT["creative-strategy"]}
      graphic={<CreativeTestGrid />}
      logos={LOGOS}
      ctaLabel="Apply for a creative audit"
      headline={
        <>
          Test concepts.{" "}
          <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
            Retire the rest
          </span>
          .
        </>
      }
    />
  );
}
