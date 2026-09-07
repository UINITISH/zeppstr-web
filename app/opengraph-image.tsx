import { ImageResponse } from "next/og";
import { loadOgFont } from "@/lib/og-font";
import { markDataUri } from "@/lib/og-mark";

/**
 * Site-wide default Open Graph / Twitter share image.
 *
 * Next.js applies this to every route that doesn't define its own
 * opengraph-image, fixing the missing og:image across all pages at once.
 * Replace with a designed asset later if desired — the metadata wiring
 * stays the same.
 */

export const alt =
  "Zeppstr — Your Growth Partner in Digital Marketing & SEO";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand tokens (from tailwind.config.ts)
const GREEN = "#064E3B";
const YELLOW = "#FFD031";

export default async function OpengraphImage() {
  // Satori ships no system fonts; without this the rupee sign renders as tofu.
  const font = await loadOgFont();
  const hasFont = Boolean(font);
  const mark = markDataUri("white");

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
          padding: "72px",
          fontFamily: hasFont ? "Inter" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {mark ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={mark} width={56} height={56} alt="" />
          ) : (
            <div
              style={{
                display: "flex",
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                backgroundColor: YELLOW,
              }}
            />
          )}
          <div style={{ color: "#ffffff", fontSize: "40px", fontWeight: 700 }}>
            Zeppstr
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: "68px",
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: "900px",
            }}
          >
            Strategic growth planning for ambitious businesses.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "8px",
              padding: "8px 20px",
              backgroundColor: YELLOW,
              color: GREEN,
              fontSize: "26px",
              fontWeight: 600,
              borderRadius: "8px",
              alignSelf: "flex-start",
            }}
          >
            Organic Growth · Performance Media · Brand Consulting
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "Inter", data: font, style: "normal" as const, weight: 400 as const }] : undefined }
  );
}
