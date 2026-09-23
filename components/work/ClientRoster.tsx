import Image from "next/image";
import Link from "next/link";
import { logoBox, ROSTER_LOGO } from "@/lib/logo-optical";

/**
 * ClientRoster — named clients without a published case study.
 *
 * ── WHY THIS IS NOT THE CASE-STUDY GRID ─────────────────────────────────────
 * These are real, nameable clients, but no outcome data has been assembled for
 * them yet. They therefore render WITHOUT a headline metric and WITHOUT a link,
 * because there is nothing to click through to.
 *
 * Do not promote an entry here into FilterableWorkGrid until it has: a real
 * metric or a documented scope, and a markdown narrative in
 * deliverables/content/case-studies/. A tile that looks like a case study and
 * leads nowhere costs more trust than it buys.
 *
 * When outcome data arrives for one of these, move it to case-studies.ts and
 * delete it from this list.
 */

interface RosterClient {
  name: string;
  sector: string;
  country: string;
  /** Site screenshot in /public/case-screenshots/ — preferred. */
  /**
   * Website screenshot. No longer rendered in this grid — tiles show the logo
   * uniformly — but kept on the data so the paths stay recorded in one place
   * for whoever writes these clients up as case studies, where the screenshot
   * does get used at full width.
   */
  image?: string;
  /** Logo in /public/client-logos/v3/. */
  logo?: string;
  /** Registry key in lib/client-logo.ts — decides the panel tone. Optional:
   *  entries without one fall back to a light panel, which is correct for all
   *  of the original roster. */
  slug?: string;
}

const ROSTER: RosterClient[] = [
  { name: "Prohance", sector: "SaaS / Tech", country: "India", image: "/case-screenshots/prohance.jpg", logo: "/client-logos/v3/prohance.png" },
  { name: "Empuls", sector: "SaaS / Tech", country: "India", image: "/case-screenshots/empuls.jpg", logo: "/client-logos/v3/empuls.png" },
  { name: "Fixstars", sector: "SaaS / Tech", country: "Tokyo, Japan", image: "/case-screenshots/fixstars.jpg", logo: "/client-logos/v3/fixstars.png" },
  { name: "Tristar Online", sector: "E-commerce / D2C", country: "Australia", image: "/case-screenshots/tristar-online.jpg", logo: "/client-logos/v3/tristar-online.png" },
  { name: "Aishwarya Interiors", sector: "Real Estate", country: "India", image: "/case-screenshots/aishwarya-interiors.jpg", logo: "/client-logos/v3/aishwarya-interiors.png" },
  // No site screenshot on file yet — these fall back to the logo lockup.
  { name: "21 Finance", sector: "Fintech", country: "India", logo: "/client-logos/v3/twenty-one-finance.png" },
  // Homatico is NOT listed here — it has a full case study (see case-studies.ts)
  // and appears in the index above once Sanity is seeded. Listing it in both
  // places would show the same client twice on one page.
  { name: "LearnCab", sector: "EdTech", country: "India", logo: "/client-logos/v3/learncab.png" },

  // ── Added 15 Sep 2026, logos supplied directly by Vikas ──
  // These have no case study and no published outcome, so they carry a sector
  // and a country and nothing else. Do not add a metric to a roster tile.
  { name: "Moonwalk", slug: "moonwalk", sector: "Real Estate", country: "India", logo: "/client-logos/v3/moonwalk.png" },
  { name: "Pohewala", slug: "pohewala", sector: "F&B", country: "India", logo: "/client-logos/v3/pohewala-2018.png" },
  { name: "Magtik Lighting", slug: "magtik-lighting", sector: "Manufacturing", country: "India", logo: "/client-logos/v3/magtik-lighting-dark.png" },
  { name: "Scageon", slug: "scageon", sector: "SaaS / Tech", country: "India", logo: "/client-logos/v3/scageon-dark.png" },
  { name: "FWC", slug: "fwc", sector: "Professional Services", country: "India", logo: "/client-logos/v3/fwc-dark.png" },
  { name: "TruGlobal", slug: "truglobal", sector: "SaaS / Tech", country: "India", logo: "/client-logos/v3/truglobal.png" },
  { name: "Leverage Edu", slug: "leverage-edu", sector: "EdTech", country: "India", logo: "/client-logos/v3/leverage-edu.png" },
];

export function ClientRoster() {
  return (
    <section
      className="container-layout pb-24 md:pb-32"
      aria-labelledby="client-roster-heading"
    >
      <div className="border-t border-ink-headline/15 pt-14 mb-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
          Also on the roster
        </p>
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-end">
          <h2
            id="client-roster-heading"
            className="md:col-span-7 font-display font-extralight tracking-[-0.025em] text-display-lg leading-[1.08] text-ink-headline max-w-[20ch] text-balance"
          >
            Clients whose stories we haven’t written up yet.
          </h2>
          <p className="md:col-span-5 font-body text-body text-ink-muted leading-relaxed">
            We publish a case study when we can show the numbers behind it. These
            engagements are real; the write-ups are still in the queue. Ask us
            about any of them on a call — we’ll walk you through the
            work directly.
          </p>
        </div>
      </div>

      {/* Three-up, smaller than the case-study index above.
          These tiles were previously two-up and full-bleed, which made the
          unwritten roster visually louder than the published work — inverting
          the hierarchy the page is trying to establish. Secondary content
          should read as secondary. */}
      {/* Four-up: 7 clients + 1 CTA tile = 8 cells, two complete rows.
          A 3-column grid orphaned the 7th item in a row of its own. Rather than
          padding with a filler client, the empty cell becomes the contact CTA —
          it lands exactly where attention already is, at the end of the roster. */}
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {ROSTER.map((c) => (
          <li key={c.name} className="group">
            {/* White panel. The previous emerald was based on a wrong reading
                of the artwork: every logo was dark artwork on an opaque white
                card, so on green each tile showed a white sticker rather than a
                logo. The files have since been reprocessed to transparent PNGs
                and the panel suits them. See the longer note in
                FilterableWorkGrid.tsx. */}
<div className="relative aspect-[4/3] overflow-hidden mb-4 bg-white border border-ink-headline/12">
              {/* Logo first, always.
                  This tile previously preferred a website screenshot and fell
                  back to the logo, which meant five clients showed photographs
                  of webpages and one showed a logo — visibly inconsistent down
                  a grid where every tile is the same size. The case study index
                  above has been made uniform for the same reason, so the two
                  grids now read as one system.

                  Screenshots still appear full-width on each case study's own
                  page, where they are large enough to be legible. */}
              {c.logo ? (
                /* Sized by optical AREA — see lib/logo-optical.ts.
                 Absolute pixel caps fixed the first problem (percentages made
                 the same mark bigger here than on the wall, because roster
                 tiles are ~2× a wall cell) but not the second: a flat height
                 cap still rendered a 6.6-ratio wordmark and a 0.7-ratio crest
                 at wildly different ink weight. Area normalisation fixes both,
                 and the ROSTER_LOGO / WALL_LOGO presets share a target area so
                 one logo really is one size across every grid. */
                <div className="absolute inset-0 flex items-center justify-center p-5">
                  <Image
                    src={c.logo}
                    alt={`${c.name} logo`}
                    width={220}
                    height={110}
                    style={logoBox(c.logo, ROSTER_LOGO)}
                    className="w-auto h-auto object-contain opacity-90 transition-opacity duration-page ease-smooth group-hover:opacity-100"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center p-4 text-center bg-bg-secondary">
                  <span className="font-display font-light text-[13px] leading-[1.25] tracking-[-0.01em] text-ink-muted">
                    {c.name}
                  </span>
                </div>
              )}
            </div>
            <p className="font-display font-light text-display-xs text-ink-headline leading-[1.15] tracking-[-0.01em]">
              {c.name}
            </p>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
              {c.sector} &middot; {c.country}
            </p>
          </li>
        ))}

        {/* Contact tile — fills the grid and gives the section somewhere to go. */}
        <li className="group">
          <Link
            href="/contact"
            className="block focus-visible:outline-2 focus-visible:outline-brand-blue focus-visible:outline-offset-4"
          >
            <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-brand-yellow flex flex-col justify-between p-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-headline/70">
                Your company here
              </span>
              <span className="font-display font-light text-display-sm leading-[1.1] tracking-[-0.01em] text-ink-headline">
                Talk to us about
                <br />
                your growth.
              </span>
            </div>
            <p className="font-display font-light text-display-xs text-ink-headline leading-[1.15] tracking-[-0.01em] group-hover:text-brand-blue transition-colors duration-hover">
              Start a conversation &rarr;
            </p>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
              No pitch &middot; 20 minutes
            </p>
          </Link>
        </li>
      </ul>
    </section>
  );
}
