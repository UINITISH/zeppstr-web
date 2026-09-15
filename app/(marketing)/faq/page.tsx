import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { CTABanner } from "@/components/blocks/CTABanner";

export const metadata: Metadata = buildMetadata({
  title: "Frequently asked questions",
  description:
    "Engagement model, pricing structure, reporting, contracts, data handling and what we decline — answered plainly.",
  path: "/faq",
});

/**
 * ── SOURCING AND CLAIMS RULE FOR THIS PAGE ───────────────────────────────────
 * This page is the one a sceptical buyer reads last, which makes it the worst
 * possible place for a soft claim. Rules applied:
 *
 *  1. No price figures. None have been supplied and a wrong number here poisons
 *     every later conversation. Where money is discussed, the STRUCTURE is
 *     described and the figure is left to the call. Do not "estimate" a range.
 *  2. The only client outcome cited is TRU Aquapolis, published at
 *     /work/tru-aquapolis with the spend attached.
 *  3. Contract terms stated here (12-month term, 6-month review break, paid
 *     diagnostic, capped client list) are repeated from copy already live
 *     elsewhere on this site. If legal changes any of them, they change here too
 *     — search the repo, this is not the only place they appear.
 *  4. The DPDP and NDA answers describe how we behave, not a legal guarantee.
 *     Legal review of /privacy and /terms is still outstanding.
 */

type QA = { q: string; a: string | string[] };

const SECTIONS: { id: string; label: string; heading: string; items: QA[] }[] = [
  {
    id: "engagement",
    label: "Working together",
    heading: "How an engagement works",
    items: [
      {
        q: "What happens first?",
        a: "A paid diagnostic, roughly four weeks. It produces a written document: what is constraining growth, what we would change and in what order, what your measurement is currently getting wrong, and what we think the realistic ceiling is. It is yours whether or not you continue, and it occasionally concludes that you do not need an agency.",
      },
      {
        q: "Why is the diagnostic paid?",
        a: "Because a free audit is a sales asset and everybody in the room knows it. Paying for it means we can spend real senior time on it and tell you something you will not enjoy hearing. It is refunded in full if we conclude we are not the right fit for each other.",
      },
      {
        q: "Can we skip the diagnostic and just start on the channel we need?",
        a: "Occasionally, where the constraint is genuinely obvious and narrow — a conversion programme on a site with plenty of traffic, for instance. Usually not. The majority of briefs that arrive as \"we need someone to run our paid search\" turn out to be offer, qualification or measurement problems, and taking that brief at face value would be charging you to make the real problem worse.",
      },
      {
        q: "How long is the typical engagement?",
        a: "Twelve months, with a review break-clause at six. This is not a commercial preference; it is what the work requires. The first two months are usually spent making measurement honest, which produces no reportable wins and is the foundation of everything after it.",
      },
      {
        q: "Do you work month to month?",
        a: "No. A month-to-month retainer forces the side of this work that performs quickly to crowd out the side that compounds, and you would end up paying us to look busy. If you need a short engagement, the diagnostic on its own is a legitimate way to buy a few weeks of senior thinking with no commitment attached.",
      },
      {
        q: "Who actually does the work?",
        a: "The people you meet. Capacity is capped at roughly a dozen clients a year precisely so that senior time is not a pitch device — there is no bench of juniors to hand the account to once the contract is signed.",
      },
      {
        q: "Can you work alongside our in-house team or another agency?",
        a: "Yes, and often that is the right arrangement — we take the constraint and leave the rest where it is working. What does not function is two parties owning the same number with different definitions of it. That gets settled in writing before anybody starts.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Commercials",
    heading: "Fees, scope and media budget",
    items: [
      {
        q: "What does it cost?",
        a: "It depends on the constraint and the scope, so any number published here would be fiction. What we will commit to is structure: the diagnostic is a fixed fee, the retainer is a fixed monthly fee, and we will not bill a percentage of your media spend. You will have both figures before you are asked to decide anything.",
      },
      {
        q: "Why not charge a percentage of ad spend?",
        a: "Because it pays us to increase your spend, which is precisely the behaviour you are hiring us to stop. It is the single most common misalignment in this industry and it is entirely avoidable.",
      },
      {
        q: "Is media budget included in the fee?",
        a: "No. Platform spend is yours, paid by you, on your own accounts and billing. We never take ownership of a client's ad accounts. If a relationship ends, the account history, the audiences and the learning stay with you — which is not the industry norm and is worth checking with anyone else you speak to.",
      },
      {
        q: "How much should we budget for media?",
        a: "The honest answer is that we cannot responsibly tell you before the diagnostic, because the number depends on what a customer is worth to you and how long the cycle is. What we can say is that we have declined engagements where the budget could not buy enough data to learn anything, rather than take the fee and report on noise.",
      },
      {
        q: "What is not included?",
        a: "Platform and tooling subscriptions, paid media, third-party licensing, and talent or location fees on productions. All of it is quoted transparently and passed through at cost — we do not mark up a production.",
      },
    ],
  },
  {
    id: "reporting",
    label: "Measurement",
    heading: "Reporting and accountability",
    items: [
      {
        q: "What does reporting look like?",
        a: "A monthly written report and a monthly call. The report leads with the number that matters to your business rather than the platform's favourite metric, states what we changed and why, and says what we got wrong. Reports that contain no bad months are not reports.",
      },
      {
        q: "Do you guarantee results?",
        a: "No, and be cautious of anyone who does. What we commit to is method: diagnose before spending, fix the measurement before the media, work the constraint rather than everything at once, and tell you promptly when something is not working.",
      },
      {
        q: "Why won't you quote platform-reported ROAS?",
        a: "Because since Apple's App Tracking Transparency changes, platform-attributed revenue and actual revenue routinely disagree, and the platform is not a neutral party in that dispute. We reconcile to your own system of record — your CRM or your order data — and report that number, even when it is the less flattering one.",
      },
      {
        q: "What does a result actually look like?",
        a: "The clearest one we can publish: TRU Aquapolis, January to August 2026. ₹1.4 crore of media generated over 6,000 leads, more than 70% of which were qualified at handover; the client's own sales team closed 75 units from them, totalling ₹187.5 crore. We do not claim the close. We claim the pipeline it came from, and the full working is on the case study page.",
      },
      {
        q: "Can we see the underlying data?",
        a: "For your own engagement, always — all of it, including the parts that make us look bad. For other clients' engagements, no. Several sit under NDAs that permit us to publish agreed figures but not to reproduce CRM records, and we are not going to breach one to win a pitch.",
      },
    ],
  },
  {
    id: "fit",
    label: "Fit",
    heading: "Who this is and isn't for",
    items: [
      {
        q: "What kinds of business do you turn down?",
        a: [
          "Work where nobody can say what a customer is worth. That is a finance project before it is a marketing one, and we will say so.",
          "Briefs that will only be judged on how the reporting looks.",
          "Month-to-month scopes, for the reasons above.",
          "Categories where we would be learning on your budget and a specialist would serve you better. The diagnostic says this out loud when it is true.",
        ],
      },
      {
        q: "Do you only work with large companies?",
        a: "No, but there is a practical floor. Below a certain budget there is not enough signal to test with, and the engagement becomes us guessing expensively on your behalf. That floor depends on your ticket size and cycle length, which is another thing the diagnostic establishes.",
      },
      {
        q: "Do you work outside India?",
        a: "Yes. Current and past engagements include Australia, Japan and the UAE alongside India. Time zones are handled with asynchronous written reporting and a fixed monthly call rather than by pretending to be local.",
      },
      {
        q: "Our industry isn't listed. Does that matter?",
        a: "Less than you would expect. The diagnostic, the measurement work and the conversion work are largely category-blind; creative language, benchmarks and compliance are not. We set out that split honestly on the Industries page, including what does not transfer.",
      },
    ],
  },
  {
    id: "data",
    label: "Data & legal",
    heading: "Data, confidentiality and contracts",
    items: [
      {
        q: "Who owns the work and the accounts?",
        a: "You own the accounts, the data, the creative assets and the documents. Ad accounts, analytics properties, tag containers and domains are set up in your name, not ours, and you keep administrative access throughout.",
      },
      {
        q: "How do you handle our data?",
        a: "Access is limited to the people working on your account and removed when an engagement ends. We do not move customer-identifiable data into advertising platforms where the category prohibits it, and for regulated sectors the constraints get settled in the first fortnight rather than discovered in month three. India's Digital Personal Data Protection Act 2023 obligations are handled as part of the instrumentation work, not bolted on afterwards.",
      },
      {
        q: "Will you sign an NDA?",
        a: "Yes, routinely, before any commercially sensitive conversation. We also observe them after engagements end — which is why some of the strongest work on our roster has no case study on this site.",
      },
      {
        q: "How do we end it?",
        a: "Notice as set out in the agreement, plus a handover: access confirmed as yours, documentation passed over, and a written note on what we would do next if we were staying. An exit that leaves you unable to operate what was built is a failure of the engagement, not a retention tactic.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <GlobalNav />
      <main>
        {/* ── Hero ── */}
        <section className="container-layout pt-20 md:pt-32 pb-14 md:pb-16">
          <p className="eyebrow mb-6">FAQ</p>
          <h1 className="font-light tracking-[-0.025em] text-display-xl text-ink-headline mb-8 max-w-[22ch] text-balance">
            The questions people ask on the second call.
          </h1>
          <p className="font-body text-body-lg text-ink-body max-w-[64ch] leading-relaxed">
            Answered here instead, including the uncomfortable ones about
            pricing structure, guarantees and what we refuse to do. Where we
            cannot give you a number honestly, we say why rather than inventing a
            range.
          </p>

          {/* Jump links */}
          <nav
            aria-label="Jump to a section"
            className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-ink-headline/15 pt-7"
          >
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted hover:text-brand-blue transition-colors"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </section>

        {/* ── Sections ── */}
        {SECTIONS.map((section, si) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-heading`}
            className={
              si % 2 === 0
                ? "bg-bg-primary border-t border-ink-headline/10"
                : "bg-bg-secondary border-t border-ink-headline/10"
            }
          >
            <div className="container-layout py-20 md:py-28">
              <div className="grid md:grid-cols-12 gap-8 md:gap-16">
                <div className="md:col-span-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-5">
                    0{si + 1} &mdash; {section.label}
                  </p>
                  <h2
                    id={`${section.id}-heading`}
                    className="font-display font-light tracking-[-0.025em] text-display-md text-ink-headline max-w-[18ch] text-balance md:sticky md:top-[calc(var(--nav-h)+2rem)]"
                  >
                    {section.heading}
                  </h2>
                </div>

                <dl className="md:col-span-8 border-t border-ink-headline/15">
                  {section.items.map((item) => (
                    <div
                      key={item.q}
                      className="border-b border-ink-headline/15 py-7 md:py-8"
                    >
                      <dt className="font-display font-light text-display-sm text-ink-headline tracking-[-0.015em] mb-3 max-w-[46ch]">
                        {item.q}
                      </dt>
                      <dd className="font-body text-body text-ink-body leading-relaxed max-w-[66ch]">
                        {Array.isArray(item.a) ? (
                          <ul className="space-y-3">
                            {item.a.map((line) => (
                              <li key={line} className="relative pl-5">
                                <span
                                  aria-hidden="true"
                                  className="absolute left-0 top-[0.65em] block w-2 h-[2px] bg-brand-yellow"
                                />
                                {line}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          item.a
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>
        ))}

        {/* ── Still unanswered ── */}
        <section className="bg-bg-inverse text-white">
          <div className="container-layout py-16 md:py-20">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-end">
              <div className="md:col-span-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-5">
                  Not covered here
                </p>
                <h2 className="font-display font-light tracking-[-0.025em] text-display-md text-white max-w-[26ch] text-balance">
                  If your question is specific to your business, it probably
                  belongs on a call.
                </h2>
              </div>
              <div className="md:col-span-4 md:text-right space-y-3">
                <Link
                  href="/contact"
                  className="block font-display font-light text-display-sm text-white border-b border-white/50 pb-1 hover:border-brand-yellow transition-colors"
                >
                  Contact us &rarr;
                </Link>
                <Link
                  href="/work"
                  className="block font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
                >
                  Or read the case studies first
                </Link>
              </div>
            </div>
          </div>
        </section>

        <CTABanner
          eyebrow="Engage"
          heading="Start with the diagnostic."
          subhead="Four weeks, a fixed fee, and a written answer on what is actually constraining growth — yours to keep whatever you decide afterwards."
          primary={{ label: "Apply for a Diagnostic", href: "/book-consultation" }}
          secondary={{ label: "Or just say hi", href: "/contact" }}
        />
      </main>
      <Footer />
    </>
  );
}
