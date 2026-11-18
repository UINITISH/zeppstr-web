import Image from "next/image";
import { cn } from "@/lib/cn";
import type { LogoBoxOptions } from "@/lib/logo-optical";

/**
 * TOOLS WALL — platforms Zeppstr runs campaigns, analytics and builds on.
 * Added to the homepage 18 Nov 2026 (after the client logo wall).
 *
 * COPY RULE: this section says we WORK ON these platforms. It does not say we
 * are a partner of, certified by, or endorsed by any of them. Only add
 * "Google Partner" / "Meta Business Partner" wording, or the official partner
 * badge, once the certification is live and can be linked.
 *
 * Logos were cropped from the old site's "Our Tools" section. AdWords and the
 * blue Facebook wordmark are outdated brand marks (now Google Ads and Meta) —
 * replace the files in /public/tool-logos when current artwork is available.
 *
 * 10 tools in 2 / 5 columns, so neither breakpoint leaves a ragged row.
 */

const TOOLS = [
  { name: "Google Ads", file: "google-ads.png", w: 363, h: 122 },
  { name: "Google Analytics", file: "google-analytics.png", w: 361, h: 126 },
  { name: "Think with Google", file: "think-with-google.png", w: 355, h: 48 },
  { name: "Google Developers", file: "google-developers.png", w: 349, h: 90 },
  { name: "Facebook", file: "facebook.png", w: 359, h: 136 },
  { name: "LinkedIn", file: "linkedin.png", w: 348, h: 85 },
  { name: "YouTube", file: "youtube.png", w: 345, h: 80 },
  { name: "Yahoo", file: "yahoo.png", w: 375, h: 89 },
  { name: "Bing", file: "bing.png", w: 361, h: 127 },
  { name: "X", file: "x.png", w: 219, h: 198 },
];

const TOOL_LOGO: LogoBoxOptions = { area: 5200, maxHeight: 64, maxWidth: 170 };

/* Same optical-area maths as the client wall, with the dimensions inline. */
function box(t: (typeof TOOLS)[number]) {
  const ratio = t.w / t.h;
  let h = Math.sqrt(TOOL_LOGO.area / ratio);
  let w = h * ratio;
  if (h > TOOL_LOGO.maxHeight) {
    h = TOOL_LOGO.maxHeight;
    w = h * ratio;
  }
  if (w > TOOL_LOGO.maxWidth) {
    w = TOOL_LOGO.maxWidth;
    h = w / ratio;
  }
  return { maxHeight: `${Math.round(h)}px`, maxWidth: `${Math.round(w)}px` };
}

export function ToolsWall() {
  return (
    <section
      className="bg-bg-secondary border-t border-ink-headline/10"
      aria-labelledby="tools-heading"
    >
      <div className="container-layout py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-20 items-end">
          <div className="md:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
              Our tools
            </p>
            <h2
              id="tools-heading"
              className="font-bold tracking-[-0.025em] text-display-lg text-ink-headline leading-[1.05] max-w-[24ch] text-balance"
            >
              Built and measured on the platforms where your{" "}
              <span className="highlight-mark">buyers</span> already are.
            </h2>
          </div>
          <p className="md:col-span-4 font-body text-body-lg text-ink-body leading-relaxed">
            Search, social, video and analytics — every campaign, report and build runs on the same
            stack your customers use every day.
          </p>
        </div>

        <ul className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
          {TOOLS.map((t) => (
            <li
              key={t.file}
              className={cn(
                "flex items-center justify-center",
                "h-[104px] md:h-[132px] px-5",
                "bg-white rounded-lg border border-ink-headline/10",
                "shadow-[0_1px_2px_rgba(10,16,47,0.04),0_2px_8px_rgba(10,16,47,0.05)]",
                "transition-all duration-hover",
                "hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(10,16,47,0.06),0_8px_20px_rgba(10,16,47,0.10)]",
              )}
            >
              <Image
                src={`/tool-logos/${t.file}`}
                alt={t.name}
                width={t.w}
                height={t.h}
                style={box(t)}
                className="w-auto h-auto object-contain"
                sizes="(max-width: 1024px) 50vw, 20vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
