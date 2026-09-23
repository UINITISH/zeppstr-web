import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description:
    "How Zeppstr hires, what the work is actually like, and how to apply — including when there are no roles open.",
  path: "/careers",
});

/**
 * ── WHAT IS AND IS NOT CLAIMED ON THIS PAGE ──────────────────────────────────
 * No invented perks, no headcount figures, no "fast-growing team of X", no
 * salary bands, no office photographs, no Glassdoor-style testimonials. None of
 * that has been supplied and none of it should be guessed at — a careers page
 * that overstates is the fastest way to lose a good hire in week three.
 *
 * OPEN_ROLES is deliberately empty. The page is written to read correctly in
 * that state: it tells people what we look for and invites a speculative
 * application. When a role genuinely opens, add it to the array and the hiring
 * block appears on its own.
 *
 * APPLICATION ADDRESS: nitish@zeppstr.com is used because it is confirmed live.
 * If a dedicated careers@ alias is created, change it here in one place.
 */

const OPEN_ROLES: {
  title: string;
  type: string;
  location: string;
  summary: string;
}[] = [];

const APPLY_EMAIL = "nitish@zeppstr.com";

/** What the work is actually like — written to filter, not to attract. */
const REALITY = [
  {
    title: "You will write, and your writing will be read closely",
    body: "Diagnostics, reports and strategy here are documents, not decks. If the sentence does not say what you mean, someone will say so. This is the single most common reason a technically strong candidate does not work out.",
  },
  {
    title: "You will be asked where a number came from",
    body: "Routinely, and not as an accusation. Every figure that reaches a client or this website has to be traceable to a source. If you are used to reporting platform-attributed revenue without caveat, that habit has to go.",
  },
  {
    title: "You will work on few accounts, deeply",
    body: "Capacity is deliberately capped, which means nobody here is spread across fifteen logos. It also means there is nowhere to hide — your account's numbers are your numbers.",
  },
  {
    title: "You will be in the room, and sometimes on site",
    body: "We produce our own creative and we staff on-ground work. Shoot days, site launches and expos are part of the job for most roles, not a separate department's problem.",
  },
  {
    title: "You will tell clients things they did not want to hear",
    body: "Including that the channel they asked us to run is not their constraint. Comfort with that conversation is the job, not a senior privilege.",
  },
];

/** What we look for, stated as behaviour rather than years of experience. */
const WE_LOOK_FOR = [
  "Evidence you can find the cause of something rather than the correlation — a worked example matters more than a certification.",
  "Writing samples. Any kind: a strategy note, a long email, a post-mortem, a blog nobody read. We will read them.",
  "Comfort with arithmetic. Not modelling; arithmetic. Most bad marketing decisions fail a calculator before they fail a strategy review.",
  "A record of changing your mind in public when the data said so.",
  "Curiosity about the client's business rather than only the channel you run.",
];

const NOT_LOOKING_FOR = [
  "Channel specialists who consider the business context someone else's job.",
  "Anyone whose portfolio is a list of platforms rather than a list of outcomes.",
  "A preference for volume over depth — if shipping forty assets a month is the satisfying part, this will frustrate you.",
  "Certainty. The people who do well here say \"I don't know yet, here is how I'd find out\".",
];

/** How the process runs, so nobody is guessing. */
const PROCESS = [
  {
    step: "01",
    title: "A written application",
    body: "Your CV, and a short note — a few paragraphs is plenty — on a piece of work you got wrong and what you changed afterwards. Candidates who skip the note do not progress, so it is the real first stage.",
  },
  {
    step: "02",
    title: "A conversation, not a screen",
    body: "Thirty to forty-five minutes on your actual work with someone who will understand the detail. You should use it to interrogate us too; we would rather answer the hard question now.",
  },
  {
    step: "03",
    title: "A paid exercise",
    body: "A real problem, scoped to a few hours, and we pay for your time. We do not ask candidates to produce free strategy, and any firm that does is telling you something.",
  },
  {
    step: "04",
    title: "A decision with reasons",
    body: "Yes or no, within a week of the exercise, with the reasoning. Nobody is left on read. If it is a no, you will know what the no was about.",
  },
];

export default function CareersPage() {
  return (
    <>
      <GlobalNav />
      <main>
        {/* ── Hero ── */}
        <section className="container-layout pt-20 md:pt-32 pb-16 md:pb-20">
          <p className="eyebrow mb-6">Careers</p>
          <h1 className="font-light tracking-[-0.025em] text-display-xl text-ink-headline mb-8 max-w-[22ch] text-balance">
            Small team. Few clients. Nowhere to hide.
          </h1>
          <p className="font-body text-body-lg text-ink-body max-w-[64ch] leading-relaxed">
            This page is written to put people off as much as to attract them.
            The work is senior-weight, the accounts are few and deep, and every
            number that leaves the building has to be defensible. If that reads
            as a constraint rather than a pitch, good — it is both.
          </p>
        </section>

        {/* ── Open roles ── */}
        <section
          className="bg-bg-secondary border-y border-ink-headline/10"
          aria-labelledby="roles-heading"
        >
          <div className="container-layout py-20 md:py-24">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-8">
              Open roles
            </p>

            {OPEN_ROLES.length > 0 ? (
              <ul className="border-t border-ink-headline/15">
                {OPEN_ROLES.map((role) => (
                  <li
                    key={role.title}
                    className="grid md:grid-cols-12 gap-x-8 gap-y-3 border-b border-ink-headline/15 py-8"
                  >
                    <h2 className="md:col-span-4 font-display font-light text-display-sm text-ink-headline tracking-[-0.015em]">
                      {role.title}
                    </h2>
                    <p className="md:col-span-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted md:pt-2">
                      {role.type}
                      <br />
                      {role.location}
                    </p>
                    <p className="md:col-span-6 font-body text-body text-ink-body leading-relaxed">
                      {role.summary}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="border-t border-ink-headline/15 pt-10 grid md:grid-cols-12 gap-8">
                <h2
                  id="roles-heading"
                  className="md:col-span-5 font-display font-light text-display-md text-ink-headline tracking-[-0.02em] max-w-[22ch] text-balance"
                >
                  Nothing is formally open right now.
                </h2>
                <div className="md:col-span-7 space-y-5">
                  <p className="font-body text-body text-ink-body leading-relaxed max-w-[62ch]">
                    We are not going to list invented roles to look like we are
                    hiring. What is true is that the client list is capped and
                    grows a few engagements a year, and when it does we hire
                    ahead of the work rather than after it — almost always
                    from people who wrote to us before there was a vacancy.
                  </p>
                  <p className="font-body text-body text-ink-body leading-relaxed max-w-[62ch]">
                    So a speculative application is not a waste of your time
                    here. It is, in practice, the main route in.
                  </p>
                  <Link
                    href={`mailto:${APPLY_EMAIL}?subject=Speculative%20application`}
                    className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-display-xs px-7 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
                  >
                    <span>Write to {APPLY_EMAIL}</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── The reality of the work ── */}
        <section
          className="container-layout py-24 md:py-32"
          aria-labelledby="reality-heading"
        >
          <div className="mb-14 md:mb-20">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
              Before you apply
            </p>
            <h2
              id="reality-heading"
              className="font-display font-light tracking-[-0.025em] text-display-lg text-ink-headline max-w-[26ch] mb-6 text-balance"
            >
              Five things about this job that are not in a job description.
            </h2>
            <p className="font-body text-body-lg text-ink-body max-w-[62ch] leading-relaxed">
              Each of these has surprised someone. Reading them now is cheaper
              than discovering them in month two.
            </p>
          </div>

          <ol className="border-t border-ink-headline/15">
            {REALITY.map((r, i) => (
              <li
                key={r.title}
                className="grid md:grid-cols-12 gap-x-8 gap-y-3 border-b border-ink-headline/15 py-8 md:py-10"
              >
                <span className="md:col-span-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted md:pt-2">
                  0{i + 1}
                </span>
                <h3 className="md:col-span-5 font-display font-light text-display-sm text-ink-headline tracking-[-0.015em] leading-[1.15]">
                  {r.title}
                </h3>
                <p className="md:col-span-6 font-body text-body text-ink-body leading-relaxed max-w-[60ch]">
                  {r.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Looking for / not looking for ── */}
        <section className="bg-bg-inverse text-white">
          <div className="container-layout py-20 md:py-28">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
                  What we look for
                </p>
                <ul className="space-y-5 border-t border-white/20 pt-7">
                  {WE_LOOK_FOR.map((p) => (
                    <li
                      key={p}
                      className="relative pl-5 font-body text-body text-white/85 leading-relaxed"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[0.65em] block w-2 h-[2px] bg-brand-yellow"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
                  What we are not looking for
                </p>
                <ul className="space-y-5 border-t border-white/20 pt-7">
                  {NOT_LOOKING_FOR.map((p) => (
                    <li
                      key={p}
                      className="relative pl-5 font-body text-body text-white/70 leading-relaxed"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[0.65em] block w-2 h-[2px] bg-white/30"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section
          className="container-layout py-24 md:py-32"
          aria-labelledby="hiring-process-heading"
        >
          <div className="mb-14 md:mb-20">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
              The process
            </p>
            <h2
              id="hiring-process-heading"
              className="font-display font-light tracking-[-0.025em] text-display-lg text-ink-headline max-w-[24ch] mb-6 text-balance"
            >
              Four stages. No unpaid strategy. A real answer at the end.
            </h2>
          </div>

          <ol className="grid md:grid-cols-2 gap-x-12 gap-y-12">
            {PROCESS.map((p) => (
              <li key={p.step} className="border-t border-ink-headline/15 pt-7">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-blue">
                    {p.step}
                  </span>
                  <h3 className="font-display font-light text-display-sm text-ink-headline tracking-[-0.015em]">
                    {p.title}
                  </h3>
                </div>
                <p className="font-body text-body text-ink-body leading-relaxed max-w-[56ch]">
                  {p.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Apply ── */}
        <section className="bg-brand-yellow">
          <div className="container-layout py-20 md:py-24">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-end">
              <div className="md:col-span-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline/70 mb-6">
                  Apply
                </p>
                <h2 className="font-display font-light tracking-[-0.025em] text-display-lg text-ink-headline max-w-[22ch] text-balance">
                  Send the note. Skip the cover letter.
                </h2>
                <p className="mt-6 font-body text-body text-ink-headline/80 leading-relaxed max-w-[56ch]">
                  Your CV, and a few paragraphs on something you got wrong and
                  what you changed afterwards. That second part is what we
                  actually read.
                </p>
              </div>
              <div className="md:col-span-5 md:text-right">
                <Link
                  href={`mailto:${APPLY_EMAIL}?subject=Application`}
                  className="inline-block font-display font-light text-display-sm text-ink-headline border-b-2 border-ink-headline pb-1 hover:border-white transition-colors"
                >
                  {APPLY_EMAIL} &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
