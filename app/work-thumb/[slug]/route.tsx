import { ImageResponse } from "next/og";
import { sanity } from "@/sanity/lib/client";

/**
 * Generated case-study tile thumbnail, keyed by slug.
 *
 * GET /work-thumb/wise-market → 1200×900 (4:3) branded PNG for the Work grid tile.
 * Path-based (not query params) because Next's image optimizer strips query
 * strings from local images. Data is fetched from Sanity by slug.
 *
 * Non-destructive: the Work grid only points here when a case study has no real
 * heroImage, so uploading images later overrides these automatically.
 */

export const runtime = "nodejs";

const GREEN = "#064E3B";
const YELLOW = "#FFD031";

const thumbQuery = `*[_type == "caseStudy" && slug.current == $slug][0]{
  clientName,
  headlineMetric,
  "industry": industry->name
}`;

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const data = await sanity
    .fetch<{ clientName?: string; headlineMetric?: string; industry?: string } | null>(
      thumbQuery,
      { slug: params.slug }
    )
    .catch(() => null);

  const title = (data?.clientName || "Zeppstr").slice(0, 40);
  const metric = (data?.headlineMetric || "").slice(0, 60);
  const industry = (data?.industry || "Case Study").slice(0, 40);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: GREEN,
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "24px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: YELLOW,
            fontWeight: 600,
          }}
        >
          {industry}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              width: "72px",
              height: "6px",
              backgroundColor: YELLOW,
              marginBottom: "28px",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: "84px",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.0,
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
          {metric && (
            <div
              style={{
                display: "flex",
                marginTop: "28px",
                fontSize: "34px",
                color: "rgba(255,255,255,0.78)",
              }}
            >
              {metric}
            </div>
          )}
        </div>
      </div>
    ),
    { width: 1200, height: 900 }
  );
}
