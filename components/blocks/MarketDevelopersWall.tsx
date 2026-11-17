import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * MarketDevelopersWall — leading real-estate developers in the market we work in.
 *
 * THIS IS NOT A CLIENT OR PARTNER WALL, and must not be labelled as one.
 * These developers are not Zeppstr clients. Showing a developer's logo under
 * "Clients" or "Partners" would be a false claim. The eyebrow, heading and
 * footnote say "market" and disclaim affiliation. Real clients live in
 * ClientLogosWall (TRU Dwellings is a real client and is shown there, not here).
 *
 * ARTWORK: public/market-logos/. Every file is dark artwork on transparent or
 * white — Raheja and Origen were supplied reversed (light on dark) and were
 * recoloured to ink, per the same rule as ClientLogosWall. Do not add a white
 * logo; recolour the file.
 *
 * SIZING: logos have wildly different aspect ratios, so a fixed box makes
 * square marks huge and wordmarks tiny. Each logo is sized to the same target
 * AREA (capped on width and height) so they carry equal visual weight.
 *
 * COUNT: 10 = 2 rows of 5 at md+, 5 rows of 2 on mobile. Add logos in
 * multiples of 5 to keep the grid even.
 */
type Dev = { name: string; file: string; w: number; h: number };

const DEVELOPERS: Dev[] = [
  { name: "Prestige", file: "prestige.png", w: 249, h: 300 },
  { name: "Sobha", file: "sobha.png", w: 261, h: 72 },
  { name: "Lodha", file: "lodha.png", w: 412, h: 84 },
  { name: "Puravankara", file: "puravankara.webp", w: 640, h: 141 },
  { name: "Shapoorji Pallonji", file: "shapoorji-pallonji.png", w: 378, h: 198 },
  { name: "Raheja", file: "raheja.png", w: 367, h: 65 },
  { name: "Signature Global", file: "signature-global.png", w: 640, h: 229 },
  { name: "Anantraj", file: "anantraj.png", w: 446, h: 300 },
  { name: "DS-Max Properties", file: "ds-max.png", w: 356, h: 300 },
  { name: "Origen Realty", file: "origen-realty.png", w: 183, h: 56 },
];

const AREA = 6200; // target px² per logo, at 1x
const MAX_W = 150;
const MAX_H = 62;

function box(w: number, h: number) {
  const ar = w / h;
  let dw = Math.sqrt(AREA * ar);
  let dh = dw / ar;
  if (dw > MAX_W) { dw = MAX_W; dh = dw / ar; }
  if (dh > MAX_H) { dh = MAX_H; dw = dh * ar; }
  return { width: Math.round(dw), height: Math.round(dh) };
}

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

        <ul className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {DEVELOPERS.map((d) => {
            const { width, height } = box(d.w, d.h);
            return (
              <li
                key={d.file}
                className={cn(
                  "group relative flex items-center justify-center",
                  "h-[112px] md:h-[132px] px-5",
                  "bg-white rounded-md border border-ink-headline/10",
                  "shadow-[0_1px_2px_rgba(15,61,46,0.04),0_2px_8px_rgba(15,61,46,0.05)]",
                  "transition-all duration-hover",
                  "hover:-translate-y-0.5 hover:border-ink-headline/20",
                  "hover:shadow-[0_2px_4px_rgba(15,61,46,0.06),0_10px_24px_rgba(15,61,46,0.10)]",
                )}
              >
                <Image
                  src={`/market-logos/${d.file}`}
                  alt={d.name}
                  width={width}
                  height={height}
                  sizes="150px"
                  className="object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-hover"
                  style={{ width, height }}
                />
                <span
                  aria-hidden="true"
                  className="absolute left-4 right-4 bottom-0 h-[2px] rounded-full bg-brand-yellow scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-hover"
                />
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <p className="font-body text-[12px] leading-relaxed text-ink-muted max-w-[70ch]">
            Names and logos are trademarks of their respective owners, shown for
            market context only. No endorsement, partnership or client
            relationship is implied.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted whitespace-nowrap">
            &amp; many more across Karnataka
          </p>
        </div>
      </div>
    </section>
  );
}
