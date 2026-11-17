import { ImageResponse } from "next/og";
import { sanity } from "@/sanity/lib/client";
import { loadOgFont, safeGlyphs } from "@/lib/og-font";

/**
 * Per-case-study share image (Open Graph / Twitter), keyed by slug.
 *
 * GET /case-og/tru-aquapolis → 1200×630 branded PNG with the headline number.
 * Added 17 Nov 2026 per the case-study benchmark (page-specific share image).
 * Built from /work-thumb/[slug]; same font handling.
 * Path-based (not query params) because Next's image optimizer strips query
 * strings from local images. Data is fetched from Sanity by slug.
 *
 * Non-destructive: the Work grid only points here when a case study has no real
 * heroImage, so uploading images later overrides these automatically.
 */

export const runtime = "nodejs";

const GREEN = "#0F3D2E";
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

  // Satori ships no system fonts. Without this the rupee sign renders as tofu.
  const font = await loadOgFont();
  const hasFont = Boolean(font);

  const title = (data?.clientName || "Zeppstr").slice(0, 40);
  const metric = safeGlyphs((data?.headlineMetric || "").slice(0, 60), hasFont);
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
          fontFamily: hasFont ? "Inter" : "sans-serif",
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
          {`Zeppstr case study · ${industry}`}
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
              fontSize: "72px",
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
                fontSize: "40px",
                color: YELLOW, fontWeight: 700,
              }}
            >
              {metric}
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: font
        ? [{ name: "Inter", data: font, style: "normal" as const, weight: 400 as const }]
        : undefined,
    }
  );
}
