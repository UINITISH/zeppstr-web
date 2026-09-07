import { ImageResponse } from "next/og";
import { sanity } from "@/sanity/lib/client";
import { CATEGORY_ACCENT, CATEGORY_LABELS } from "@/lib/insights/article";
import { loadOgFont } from "@/lib/og-font";

/**
 * Generated article cover, keyed by slug.
 *
 * GET /insights-cover/technical-seo-website-performance → 1200×750 branded PNG.
 * Mirrors /work-thumb: path-based (Next's image optimizer strips query strings
 * from local images) and fetched from Sanity by slug.
 *
 * Non-destructive: only used when an article has no uploaded heroImage, so
 * adding a real image in Sanity Studio overrides this with no code change.
 */

export const runtime = "nodejs";
export const revalidate = 3600;

const coverQuery = `*[_type == "article" && slug.current == $slug][0]{
  title,
  category
}`;

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  // Satori ships no system fonts; without this the rupee sign renders as tofu.
  const font = await loadOgFont();
  const hasFont = Boolean(font);

  const data = await sanity
    .fetch<{ title?: string; category?: string } | null>(coverQuery, {
      slug: params.slug,
    })
    .catch(() => null);

  const title = (data?.title || "Zeppstr Insights").slice(0, 90);
  const category = data?.category ?? "growth-strategy";
  const accent = CATEGORY_ACCENT[category] ?? CATEGORY_ACCENT["growth-strategy"];
  const label = CATEGORY_LABELS[category] ?? "Insights";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: accent.bg,
          padding: "72px",
          fontFamily: hasFont ? "Inter" : "sans-serif",
          position: "relative",
        }}
      >
        {/* Faint rule grid — echoes the site's structural language */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: "22px",
            letterSpacing: "5px",
            textTransform: "uppercase",
            color: accent.fg,
            fontWeight: 600,
          }}
        >
          {label}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              width: "84px",
              height: "6px",
              backgroundColor: accent.fg,
              marginBottom: "32px",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: title.length > 55 ? "52px" : "64px",
              lineHeight: 1.1,
              letterSpacing: "-2px",
              color: "#FFFFFF",
              fontWeight: 300,
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "20px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            fontWeight: 500,
          }}
        >
          Zeppstr Growth Media
        </div>
      </div>
    ),
    { width: 1200, height: 750, fonts: font ? [{ name: "Inter", data: font, style: "normal" as const, weight: 400 as const }] : undefined }
  );
}
