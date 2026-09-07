import Image from "next/image";
import Link from "next/link";

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
  image?: string;
  /** Logo in /public/client-logos/ — fallback when no screenshot exists. */
  logo?: string;
}

const ROSTER: RosterClient[] = [
  { name: "Prohance", sector: "SaaS / Tech", country: "India", image: "/case-screenshots/prohance.jpg", logo: "/client-logos/prohance.png" },
  { name: "Empuls", sector: "SaaS / Tech", country: "India", image: "/case-screenshots/empuls.jpg", logo: "/client-logos/empuls.png" },
  { name: "Fixstars", sector: "SaaS / Tech", country: "Tokyo, Japan", image: "/case-screenshots/fixstars.jpg", logo: "/client-logos/fixstars.png" },
  { name: "Tristar Online", sector: "E-commerce / D2C", country: "Australia", image: "/case-screenshots/tristar-online.jpg", logo: "/client-logos/tristar-online.png" },
  { name: "Aishwarya Interiors", sector: "Real Estate", country: "India", image: "/case-screenshots/aishwarya-interiors.jpg", logo: "/client-logos/aishwarya-interiors.png" },
  // No site screenshot on file yet — these fall back to the logo lockup.
  { name: "21 Finance", sector: "Fintech", country: "India", logo: "/client-logos/twenty-one-finance.png" },
  // Homatico is NOT listed here — it has a full case study (see case-studies.ts)
  // and appears in the index above once Sanity is seeded. Listing it in both
  // places would show the same client twice on one page.
  { name: "LearnCab", sector: "EdTech", country: "India", logo: "/client-logos/learncab.png" },
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
            className="md:col-span-7 font-display font-extralight tracking-[-0.025em] text-[clamp(28px,3.6vw,46px)] leading-[1.08] text-ink-headline max-w-[20ch] text-balance"
          >
            Clients whose stories we haven&rsquo;t written up yet.
          </h2>
          <p className="md:col-span-5 font-body text-body text-ink-muted leading-relaxed">
            We publish a case study when we can show the numbers behind it. These
            engagements are real; the write-ups are still in the queue. Ask us
            about any of them on a call &mdash; we&rsquo;ll walk you through the
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
            {/* Emerald in both states: every logo in /public/client-logos is
                white/light artwork built for dark backgrounds — on a light
                panel they render invisible. */}
            <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-emerald-900">
              {c.image ? (
                <Image
                  src={c.image}
                  alt={`${c.name} — client work`}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover object-center grayscale opacity-80 transition-all duration-page ease-smooth group-hover:grayscale-0 group-hover:opacity-100"
                />
              ) : c.logo ? (
                /* No screenshot on file — centre the logo on a light panel
                   rather than showing an empty coloured block. */
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <Image
                    src={c.logo}
                    alt={`${c.name} logo`}
                    width={220}
                    height={110}
                    className="max-h-[55%] w-auto object-contain grayscale opacity-70 transition-all duration-page ease-smooth group-hover:grayscale-0 group-hover:opacity-100"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-end p-5">
                  <span
                    aria-hidden="true"
                    className="block w-8 h-[3px] bg-brand-yellow"
                  />
                </div>
              )}
            </div>
            <p className="font-display font-light text-[clamp(18px,1.4vw,22px)] text-ink-headline leading-[1.15] tracking-[-0.01em]">
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
              <span className="font-display font-light text-[clamp(20px,1.7vw,26px)] leading-[1.1] tracking-[-0.01em] text-ink-headline">
                Talk to us about
                <br />
                your growth.
              </span>
            </div>
            <p className="font-display font-light text-[clamp(18px,1.4vw,22px)] text-ink-headline leading-[1.15] tracking-[-0.01em] group-hover:text-brand-blue transition-colors duration-hover">
              Start a conversation&nbsp;&rarr;
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
