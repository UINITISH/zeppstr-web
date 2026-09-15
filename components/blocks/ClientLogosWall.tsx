import Image from "next/image";
import { cn } from "@/lib/cn";
import { logoBox, WALL_LOGO } from "@/lib/logo-optical";

/**
 * ClientLogosWall — editorial 6-column logo grid.
 *
 * Renders 24 client logos in a uniform monochrome grid. Each cell shares a
 * fixed height; logos are centered with object-contain. Default state is
 * desaturated + low-opacity for visual unity; on hover the cell brightens
 * back to full color and a yellow underline appears (brand-block accent).
 *
 * Layout: 2 cols (mobile) → 3 cols (sm) → 4 cols (md) → 6 cols (lg).
 * Hairline dividers between rows/columns mirror the rest of the page system.
 */

/**
 * ONE TREATMENT FOR EVERY LOGO — no per-client background.
 *
 * An earlier version gave the five reversed logos an emerald cell (and then an
 * emerald chip) so they would not disappear on white. Both versions put a green
 * patch behind five of thirty-two brands, which is worse than the problem it
 * solved: the wall stopped reading as one wall.
 *
 * The fix went into the artwork instead. FWC, Scageon, Magtik and Pohewala were
 * supplied as white/reversed files; their near-white pixels have been recoloured
 * to ink so they are dark artwork like everything else. Brand colours were left
 * untouched — Magtik keeps its orange bolt, Pohewala its yellow, Sharjah its
 * gold. Originals: deliverables/logo-originals/ and the uploads folder.
 *
 * So there is no `tone` here any more, and there should not be one again. If a
 * new logo arrives white, recolour the file; do not special-case the cell.
 */
/**
 * PATH VERSION: /client-logos/v3/
 *
 * Next caches optimised images by URL, so editing a PNG in place leaves the dev
 * server and any CDN serving the previous version indefinitely — which during
 * this work looked exactly like the logos had disappeared. The artwork was
 * reprocessed (white plates removed, reversed logos recoloured to ink, edge
 * halos cleared), so the whole set moved to a versioned folder. The v1 files are
 * still at /client-logos/ and can be deleted once this is deployed and verified.
 *
 * If the artwork is ever reprocessed again, bump to v3 rather than overwriting.
 */
type Client = { name: string; file: string };

const CLIENTS: Client[] = [
  { name: "Ace Online", file: "ace-online.png" },
  { name: "Aishwarya Interiors", file: "aishwarya-interiors.png" },
  { name: "BSG", file: "bsg.png" },
  { name: "EagleDrift", file: "eagledrift.png" },
  { name: "Empuls", file: "empuls.png" },
  { name: "Fixstars", file: "fixstars.png" },
  { name: "Homatico", file: "homatico.png" },
  { name: "Ignite", file: "ignite.png" },
  { name: "iVehicleValue", file: "ivehiclevalue.png" },
  { name: "JP Parking Yard", file: "jp-parking-yard.png" },
  { name: "LearnCab", file: "learncab.png" },
  { name: "Lucky White Goods", file: "lucky-white-goods.png" },
  { name: "Mini Leaves", file: "mini-leaves.png" },
  { name: "My Keto Co", file: "my-keto-co.png" },
  { name: "Nakshatech", file: "nakshatech.png" },
  { name: "Pacer", file: "pacer.png" },
  { name: "Prohance", file: "prohance.png" },
  { name: "Sky Phonez", file: "sky-phonez.png" },
  { name: "Tansi Fintech", file: "tansi-fintech.png" },
  { name: "Tristar Online", file: "tristar-online.png" },
  { name: "Twenty One Finance", file: "twenty-one-finance.png" },
  { name: "VehicleMall", file: "vehiclemall.png" },
  { name: "Wise Market", file: "wise-market.png" },

  // ── Added 15 Sep 2026, logos supplied directly by Vikas ──
  { name: "Moonwalk", file: "moonwalk.png" },
  { name: "Tru Aquapolis", file: "tru-aquapolis.png" },
  { name: "TruGlobal", file: "truglobal.png" },
  { name: "Leverage Edu", file: "leverage-edu.png" },
  { name: "Invest in Sharjah", file: "invest-in-sharjah.png" },
  { name: "FWC", file: "fwc-dark.png" },
  { name: "Magtik Lighting", file: "magtik-lighting-dark.png" },
  { name: "Scageon", file: "scageon-dark.png" },
  { name: "Pohewala", file: "pohewala-2018.png" },
];

export function ClientLogosWall() {
  return (
    <section
      className="bg-bg-primary border-t border-ink-headline/10"
      aria-labelledby="client-logos-heading"
    >
      <div className="container-layout py-24 md:py-32">
        {/* Editorial header */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-20 items-end">
          <div className="md:col-span-9">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
              Brands
            </p>
            <h2
              id="client-logos-heading"
              className="font-bold tracking-[-0.025em] text-display-lg text-ink-headline leading-[1.05] max-w-[28ch] text-balance"
            >
              Different industries, different scales. Same{" "}
              <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">compounding</span>{" "}
              result.
            </h2>
          </div>
          <div className="md:col-span-3 md:text-right">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
              <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
              300+ businesses
              <br />
              10+ countries · 6 industries
            </p>
          </div>
        </div>

        {/* Logo grid — hairline cells, monochrome default, color on hover */}
        {/* 2 / 4 / 8 columns. There are 32 logos, and 32 divides evenly by all
            three — so no breakpoint leaves a ragged half-empty final row. The
            previous 2/3/4/6 ladder left two orphans hanging under a full grid
            at desktop, which is the kind of detail that makes a considered page
            look unfinished. Adding or removing a client means re-checking this:
            the count wants to stay a multiple of 8. */}
        {/* Cells are now cards rather than bare grid squares. The hairline
            grid alone gave the logos nothing to sit against — transparent PNGs
            of very different weights floating in white space read as unfinished
            regardless of how clean the artwork is. A card with a hairline and a
            soft shadow gives every logo the same footprint and a defined edge,
            which is what makes a logo wall look deliberate. */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
          {CLIENTS.map((client) => (
            <div
              key={client.file}
              /* Every cell is white. Reversed logos get a small contained
                 emerald plate INSIDE the cell rather than a coloured cell,
                 because colouring whole cells produced a staircase of green
                 patches wherever those five clients happened to fall in the
                 6-column flow — it read as a rendering fault rather than a
                 decision. A contained plate keeps the grid uniform. */
              className={cn(
                "group relative flex items-center justify-center",
                "h-[104px] md:h-[122px] px-4 md:px-5",
                "bg-white rounded-md border border-ink-headline/10",
                "shadow-[0_1px_2px_rgba(10,16,47,0.04),0_2px_8px_rgba(10,16,47,0.05)]",
                "transition-all duration-hover",
                "hover:-translate-y-0.5 hover:border-ink-headline/20",
                "hover:shadow-[0_2px_4px_rgba(10,16,47,0.06),0_8px_20px_rgba(10,16,47,0.10)]",
              )}
            >
              <Image
                src={`/client-logos/v3/${client.file}`}
                alt={`${client.name} — Zeppstr client`}
                width={160}
                height={70}
                /* Optical area sizing — see lib/logo-optical.ts. Shares the
                   same target area as the Work-page roster, so a mark is the
                   same size on the homepage as it is on /work. */
                style={logoBox(client.file, WALL_LOGO)}
                className="w-auto h-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-hover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
              />
              {/* Yellow underline accent on hover */}
              <span
                aria-hidden="true"
                className="absolute left-4 right-4 bottom-0 h-[2px] rounded-full bg-brand-yellow scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-hover"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
