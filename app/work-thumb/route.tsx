import { ImageResponse } from "next/og";

/**
 * Generated case-study tile thumbnail (stopgap until real photography exists).
 *
 * GET /work-thumb?title=Wise%20Market&metric=AUD%2040K%20%E2%86%92%20AUD%202.7M&industry=E-commerce
 * Returns a 1200×900 (4:3) branded PNG matching the Work grid tile aspect.
 *
 * Non-destructive: the Work grid only uses this when a case study has no real
 * heroImage, so uploading images later overrides these automatically.
 */

export const runtime = "nodejs";

const GREEN = "#064E3B";
const YELLOW = "#FFD031";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") || "Zeppstr").slice(0, 40);
  const metric = (searchParams.get("metric") || "").slice(0, 60);
  const industry = (searchParams.get("industry") || "").slice(0, 40);

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
          {industry || "Case Study"}
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
