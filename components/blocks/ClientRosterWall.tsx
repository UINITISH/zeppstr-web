interface RosterClient {
  name: string;
  industry: string;
}

interface ClientRosterWallProps {
  clients: RosterClient[];
}

/**
 * Client roster wall — numbered editorial list.
 *
 * Replaces the comma-prose approach. Each client gets a row with mono numeral,
 * display-bold name, mono-caps industry tag, and a yellow-accent arrow that
 * appears on hover. Hairline dividers — same system as the Solutions list and
 * Methodology flow.
 *
 * The visual purpose: dignify the names. The Logos wall below it does the
 * visual proof; this section does the editorial pause.
 */
export function ClientRosterWall({ clients }: ClientRosterWallProps) {
  return (
    <section
      className="bg-bg-primary border-t border-ink-headline/10"
      aria-labelledby="roster-heading"
    >
      <div className="container-layout py-24 md:py-32">
        {/* Editorial header */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-20 items-end">
          <div className="md:col-span-9">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
              Roster
            </p>
            <h2
              id="roster-heading"
              className="font-bold tracking-[-0.025em] text-[clamp(44px,7vw,104px)] text-ink-headline leading-[1.02] max-w-[18ch] text-balance"
            >
              Names we&rsquo;re proud to publish.
            </h2>
          </div>
          <div className="md:col-span-3 md:text-right">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
              <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
              Curated list
              <br />
              Others under NDA
            </p>
          </div>
        </div>

        {/* Numbered editorial list */}
        <ol className="border-t border-ink-headline/15">
          {clients.map((client, i) => (
            <li
              key={client.name}
              className="group border-b border-ink-headline/15"
            >
              <div className="grid md:grid-cols-12 gap-4 md:gap-6 py-5 md:py-7 items-baseline relative transition-colors duration-hover hover:bg-bg-secondary/60 -mx-4 px-4 md:-mx-6 md:px-6">
                {/* Index */}
                <div className="md:col-span-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Client name — big editorial */}
                <div className="md:col-span-7">
                  <h3 className="font-display font-bold text-[clamp(28px,3.4vw,52px)] tracking-[-0.02em] leading-[1.05] text-ink-headline">
                    {client.name}
                  </h3>
                </div>

                {/* Industry tag */}
                <div className="md:col-span-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                    {client.industry}
                  </p>
                </div>

                {/* Arrow accent — appears on hover */}
                <div
                  aria-hidden="true"
                  className="md:col-span-1 md:text-right font-display text-[24px] text-ink-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-ink-headline transition-all duration-hover"
                >
                  →
                </div>

                {/* Yellow underline accent — animates in on hover */}
                <span
                  aria-hidden="true"
                  className="absolute left-4 right-4 md:left-6 md:right-6 -bottom-[1px] h-[2px] bg-brand-yellow scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-hover"
                />
              </div>
            </li>
          ))}
        </ol>

        {/* Footer rule */}
        <div className="mt-10 md:mt-14 pt-6 border-t border-ink-headline/15 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            {clients.length} of 300+ — across 10+ countries, 6 industries
          </p>
          <a
            href="/work"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline border-b border-ink-headline pb-0.5 hover:text-ink-headline/60 hover:border-brand-yellow transition-colors"
          >
            See selected work →
          </a>
        </div>
      </div>
    </section>
  );
}
