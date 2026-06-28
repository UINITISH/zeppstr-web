import Image from "next/image";

interface ClientLogo {
  name: string;
  src: string;
  href?: string;
}

interface LogoStripProps {
  label?: string;
  logos?: ClientLogo[];
}

/**
 * Client logo strip. Logos pulled from Sanity in production
 * (ClientLogo content type). Falls back to sample 10 for dev preview.
 */
export function LogoStrip({ label, logos }: LogoStripProps) {
  const items: ClientLogo[] = logos ?? SAMPLE_LOGOS;

  return (
    <section className="bg-bg-secondary py-16">
      <div className="container-layout">
        {label && (
          <p className="font-body text-eyebrow font-semibold text-ink-muted uppercase text-center mb-8">
            {label}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70">
          {items.map((logo) => (
            <div
              key={logo.name}
              className="bg-bg-primary border border-rule rounded-md px-6 py-3 font-body font-semibold text-body-sm text-ink-muted"
            >
              {logo.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Sample logos for dev preview — production pulls from Sanity
const SAMPLE_LOGOS: ClientLogo[] = [
  { name: "Wise Market", src: "/clients/wise-market.png" },
  { name: "Mini Leaves", src: "/clients/mini-leaves.png" },
  { name: "Prestige Group", src: "/clients/prestige-group.png" },
  { name: "Empuls", src: "/clients/empuls.png" },
  { name: "ProHance", src: "/clients/prohance.png" },
  { name: "Fixstars", src: "/clients/fixstars.png" },
  { name: "Invest in Sharjah", src: "/clients/invest-in-sharjah.png" },
  { name: "Tru Aquapolis", src: "/clients/tru-aquapolis.png" },
  { name: "LearnCab", src: "/clients/learncab.png" },
  { name: "+ 15 more", src: "" },
];
