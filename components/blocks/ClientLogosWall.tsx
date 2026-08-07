import Image from "next/image";

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
              className="font-bold tracking-[-0.025em] text-[clamp(36px,5vw,72px)] text-ink-headline leading-[1.05] max-w-[28ch] text-balance"
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
        <div className="border-t border-l border-ink-headline/10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {CLIENTS.map((client) => (
            <div
              key={client.file}
              className="group relative flex items-center justify-center h-[110px] md:h-[130px] px-6 md:px-8 border-r border-b border-ink-headline/10 transition-colors duration-hover hover:bg-bg-secondary"
            >
              <Image
                src={`/client-logos/${client.file}`}
                alt={`${client.name} — Zeppstr client`}
                width={160}
                height={70}
                className="max-h-[55%] w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-hover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
              />
              {/* Yellow underline accent on hover */}
              <span
                aria-hidden="true"
                className="absolute left-4 right-4 bottom-0 h-[2px] bg-brand-yellow scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-hover"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
