import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * MarketDevelopersWall — the real-estate developers that make up the market we
 * work in.
 *
 * THIS IS NOT A CLIENT OR PARTNER WALL, and must not be labelled as one.
 * Most of these developers have no relationship with Zeppstr. Showing a
 * developer's logo under "Clients" or "Partners" would be a false claim. The
 * heading, eyebrow and footnote are written to say "market", and the footnote
 * disclaims affiliation. Real clients live in ClientLogosWall.
 *
 * LOGOS: drop files into public/market-logos/ named `<slug>.svg|png|webp`.
 * A developer without a file renders as a name tile, so a missing logo never
 * breaks the page. Files are checked once at build/render time on the server.
 *
 * COUNT: 29 developers + 1 "& more" tile = 30, which divides evenly into the
 * 2/3/6 columns used below, matching ClientLogosWall (no ragged last row).
 */
type Dev = { name: string; slug: string };

const DEVELOPERS: Dev[] = [
  { name: "Prestige", slug: "prestige" },
  { name: "Sobha", slug: "sobha" },
  { name: "Lodha", slug: "lodha" },
  { name: "Puravankara", slug: "puravankara" },
  { name: "Shapoorji Pallonji", slug: "shapoorji-pallonji" },
  { name: "Raheja", slug: "raheja" },
  { name: "Signature Global", slug: "signature-global" },
  { name: "Eldeco", slug: "eldeco" },
  { name: "Anantraj", slug: "anantraj" },
  { name: "Premier", slug: "premier" },
  { name: "Key Mansions", slug: "key-mansions" },
  { name: "Aditya", slug: "aditya" },
  { name: "Arqis", slug: "arqis" },
  { name: "Tribeca", slug: "tribeca" },
  { name: "Trump Organization", slug: "trump-org" },
  { name: "Raghava", slug: "raghava" },
  { name: "NPS Developers", slug: "nps-developers" },
  { name: "ATZ Properties", slug: "atz-properties" },
  { name: "Vayu Infra", slug: "vayu-infra" },
  { name: "TRU Dwellings", slug: "tru-dwellings" },
  { name: "DS-Max Properties", slug: "ds-max" },
  { name: "Origen Realty", slug: "origen-realty" },
  { name: "Shri Vrinda", slug: "shri-vrinda" },
  { name: "Surya", slug: "surya" },
  { name: "K Sons", slug: "k-sons" },
  { name: "GYGY Group", slug: "gygy" },
  { name: "Veena Developers", slug: "veena" },
  { name: "Northwind", slug: "northwind" },
  { name: "EIPL", slug: "eipl" },
];

function logoFor(slug: string): string | null {
  for (const ext of ["svg", "png", "webp"]) {
    const file = `${slug}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", "market-logos", file))) {
      return `/market-logos/${file}`;
    }
  }
  return null;
}

const CELL = cn(
  "group relative flex items-center justify-center text-center",
  "h-[96px] md:h-[110px] px-4",
  "bg-white rounded-md border border-ink-headline/10",
  "shadow-[0_1px_2px_rgba(15,61,46,0.04),0_2px_8px_rgba(15,61,46,0.05)]",
  "transition-all duration-hover hover:-translate-y-0.5 hover:border-ink-headline/20",
);

export function MarketDevelopersWall() {
  return (
    <section
      className="bg-bg-secondary border-t border-ink-headline/10"
      aria-labelledby="market-developers-heading"
    >
      <div className="container-layout py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-16 items-end">
          <div className="md:col-span-9">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
              The market we work in
            </p>
            <h2
              id="market-developers-heading"
              className="font-bold tracking-[-0.025em] text-display-lg text-ink-headline leading-[1.05] max-w-[28ch] text-balance"
            >
              The developers shaping Bengaluru&apos;s{" "}
              <span className="highlight-mark">skyline</span>.
            </h2>
          </div>
          <div className="md:col-span-3 md:text-right">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
              <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
              Real estate
              <br />
              Residential · commercial
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {DEVELOPERS.map((d) => {
            const src = logoFor(d.slug);
            return (
              <li key={d.slug} className={CELL}>
                {src ? (
                  <Image
                    src={src}
                    alt={d.name}
                    width={160}
                    height={64}
                    unoptimized={src.endsWith(".svg")}
                    className="w-auto h-auto max-w-[140px] max-h-[56px] object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-hover"
                  />
                ) : (
                  <span className="font-body font-semibold text-body-sm text-ink-headline/70 group-hover:text-ink-headline transition-colors">
                    {d.name}
                  </span>
                )}
              </li>
            );
          })}
          <li className={cn(CELL, "bg-transparent shadow-none border-dashed")}>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
              &amp; many more
            </span>
          </li>
        </ul>

        <p className="mt-8 font-body text-[12px] leading-relaxed text-ink-muted max-w-[70ch]">
          Names and logos are trademarks of their respective owners, shown for
          market context only. No endorsement, partnership or client
          relationship is implied.
        </p>
      </div>
    </section>
  );
}
