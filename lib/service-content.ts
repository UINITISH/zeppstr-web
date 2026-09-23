/**
 * service-content.ts — sub-service page copy, held in code.
 *
 * ── WHY THIS EXISTS ─────────────────────────────────────────────────────────
 * The /solutions/[slug]/[service] template renders "What's included",
 * "How we deliver" and the FAQ list from Sanity fields. For the five Performance
 * Media services those fields are thin or empty, so three of the five pages
 * (Attribution & Measurement, Creative Strategy & Production, Retargeting &
 * Lifecycle Acquisition) were a headline, a one-line tagline and a CTA. The
 * other two had bespoke thousand-line page files, which is the same shadowing
 * problem the pillar page had — one design for two services, a different one
 * for the rest.
 *
 * This map gives every service the same rich structure, and it renders
 * immediately because it does not depend on the seed being re-run.
 *
 * ── SOURCING RULE ───────────────────────────────────────────────────────────
 * Every figure below traces to TRU Aquapolis (₹1.4 Cr media, 6,000+ leads, 70%+
 * qualified, 75 units, ₹187.5 Cr closed, Jan–Aug 2026), published in full at
 * /work/tru-aquapolis. Platform behaviour described as fact — ATT's effect on
 * pixel tracking, Smart Bidding needing conversion signal — is industry
 * mechanics, not a claimed result.
 *
 * NO category benchmarks. NO "clients typically see". If a number cannot be
 * traced to a published engagement, it does not go on the page.
 */

export interface ServiceStat {
  figure: string;
  label: string;
  /** Where it came from — always rendered, never optional in practice. */
  source: string;
}

export interface ServiceItem {
  title: string;
  body: string;
}

export interface ServiceStep {
  title: string;
  duration: string;
  body: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceContent {
  /** One-paragraph position, sets up everything below. */
  pov: string;
  /** The failure this service exists to fix. */
  problem: { title: string; body: string };
  /** Proof band. Omitted where we have no defensible figure. */
  stats?: ServiceStat[];
  included: ServiceItem[];
  method: ServiceStep[];
  /** Honest scope boundary — what this service will not do. */
  notThis?: string[];
  faqs: ServiceFAQ[];
}

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  // ───────────────────────────────────────────────────────────────────────────
  // ORGANIC GROWTH
  // ───────────────────────────────────────────────────────────────────────────
  "organic-search-strategy": {
    pov: "Organic search is the only acquisition channel that keeps working after you stop paying for it, and the only one where the asset appreciates. That is also why it is the easiest to do badly: nothing breaks visibly, the damage is invisible for two quarters, and by the time traffic flattens the cause is eighteen months upstream.",
    problem: {
      title: "Content is published against keywords instead of against questions",
      body: "A keyword list is a list of strings people typed. It tells you nothing about what they were trying to decide, which is the only thing that determines whether your page satisfies them or sends them back to the results. Pages built from a volume spreadsheet rank briefly and then lose to whoever answered the question properly — and because the loss is gradual, the strategy that caused it never gets blamed.",
    },
    included: [
      {
        title: "Demand mapped to decisions, not to volume",
        body: "Every target query classified by what the searcher is trying to work out — comparing, diagnosing, pricing, buying. Volume decides priority; intent decides what the page has to do.",
      },
      {
        title: "A site structure search engines can read as authority",
        body: "Topic clusters with a clear hub, internal linking that actually signals hierarchy, and a hard stop on the near-duplicate pages that split their own authority between them.",
      },
      {
        title: "Cannibalisation audit",
        body: "Two pages competing for one query is the most common silent ceiling in an established site. Found, consolidated, redirected.",
      },
      {
        title: "Editorial calendar tied to the funnel",
        body: "Published against the questions that precede a purchase in your category, not against whatever the tool ranked highest this month.",
      },
      {
        title: "Reporting on qualified sessions",
        body: "Rankings and sessions are inputs. We report the organic traffic that reached an enquiry or a cart, because that is the only part the business can spend.",
      },
    ],
    method: [
      {
        title: "Audit what exists",
        duration: "Week 1–3",
        body: "Current rankings, cannibalisation, index bloat, and which existing pages are one improvement away from mattering. Usually the fastest available gains are already on the site.",
      },
      {
        title: "Map demand to intent",
        duration: "Week 3–5",
        body: "The query set classified by decision stage, with a page assigned to each cluster and duplicates consolidated.",
      },
      {
        title: "Fix, then publish",
        duration: "Month 2–4",
        body: "Existing pages improved before new ones are written. New content on a broken structure inherits the same ceiling.",
      },
      {
        title: "Compound",
        duration: "Month 4–12",
        body: "Publishing cadence held, internal linking maintained as the library grows, and authority built deliberately rather than hoped for.",
      },
    ],
    notThis: [
      "A monthly quota of blog posts. Volume without structure is how a site ends up ranking for nothing.",
      "Rankings reporting as the headline. A number one position on a query nobody buys from is a vanity metric with extra steps.",
      "Guaranteed positions. Anyone offering those is either buying links or lying.",
    ],
    faqs: [
      {
        question: "How long before organic search produces anything?",
        answer:
          "Two to four months before movement is visible on existing pages, and closer to three to four quarters before new content compounds into meaningful volume. If that timeline does not fit the business problem, paid search is the honest answer for now and we will say so.",
      },
      {
        question: "Is SEO dead now that AI answers the question directly?",
        answer:
          "It changed shape rather than died. Informational queries that used to earn a click increasingly get answered on the results page, which means thin explainer content has lost most of its value. Queries where someone is comparing, pricing or buying still produce clicks, and that is where the work should concentrate.",
      },
      {
        question: "Do you build links?",
        answer:
          "We earn coverage through digital PR and genuinely useful assets. We do not buy links, run private blog networks, or place paid guest posts — not on principle alone but because the penalty risk sits on your domain and lasts far longer than the ranking did.",
      },
      {
        question: "We publish a lot already and nothing ranks. Why?",
        answer:
          "In most accounts we audit it is one of three things: pages competing with each other for the same query, content written against keyword strings rather than the decision behind them, or a site structure that gives search engines no way to tell which page is the authority. All three are structural, and none are fixed by publishing more.",
      },
    ],
  },

  "technical-seo": {
    pov: "Technical SEO is infrastructure work. Done well, nobody notices it — which is precisely why it gets deferred until an organic decline forces an investigation, by which point the cause is months old and the recovery takes longer than the damage did.",
    problem: {
      title: "The site is spending its crawl budget on pages that do not matter",
      body: "Faceted navigation generating thousands of parameter URLs, paginated archives indexed in full, staging subdomains left crawlable, soft 404s returning 200. Search engines allocate finite attention to a site; when most of it is consumed by pages with no commercial purpose, the pages that do matter get crawled less often and updated more slowly in the index. Nothing looks broken from the front end.",
    },
    included: [
      {
        title: "Crawl and index audit",
        body: "What is indexed versus what should be, parameter handling, pagination, canonical correctness, and where the crawl budget is actually going.",
      },
      {
        title: "Core Web Vitals work",
        body: "Largest Contentful Paint, Interaction to Next Paint and Cumulative Layout Shift diagnosed at the source rather than papered over with a caching plugin. Usually images, render-blocking scripts and layout that shifts as fonts load.",
      },
      {
        title: "Structured data",
        body: "Schema implemented where it earns a richer result and validated rather than assumed. Organisation, breadcrumb, product, FAQ and article as the category warrants.",
      },
      {
        title: "Redirect and migration hygiene",
        body: "Chains collapsed, redirect loops removed, and any migration mapped URL by URL before it ships. A botched migration is the single fastest way to lose a decade of accumulated authority.",
      },
      {
        title: "International and regional handling",
        body: "Hreflang, regional targeting and duplicate-content control for businesses serving more than one market — the fault that most often wastes work already done.",
      },
    ],
    method: [
      {
        title: "Crawl",
        duration: "Week 1–2",
        body: "Full crawl against server logs where available, so we see what search engines actually fetch rather than what we assume they do.",
      },
      {
        title: "Prioritise by revenue exposure",
        duration: "Week 2–3",
        body: "Faults ranked by the traffic and revenue they sit in front of, not by severity score. A critical fault on a page nobody visits can wait.",
      },
      {
        title: "Fix with engineering",
        duration: "Month 1–3",
        body: "Implemented with your developers or ours, staged and verified. Nothing marked done on the basis of a tool turning green.",
      },
      {
        title: "Monitor",
        duration: "Ongoing",
        body: "Technical health degrades every time the site changes, so it is monitored rather than delivered once and filed.",
      },
    ],
    notThis: [
      "A PDF audit with 300 findings and no prioritisation. That is a document, not work.",
      "A caching plugin presented as a performance strategy.",
      "Technical fixes sold as a substitute for content. A perfectly crawlable site with nothing worth ranking still ranks for nothing.",
    ],
    faqs: [
      {
        question: "Our Core Web Vitals are already green. Is this needed?",
        answer:
          "Possibly not, and we will tell you if so. Field data being green is genuine good news — but it is one of several areas, and crawl waste, index bloat and canonical errors are all invisible in that report while quietly capping what the rest of the programme can achieve.",
      },
      {
        question: "Can you work with our developers rather than replacing them?",
        answer:
          "Usually the better arrangement. We specify, prioritise by revenue exposure, and verify; your team ships. Where there is no engineering capacity, ours implements.",
      },
      {
        question: "We are replatforming. When should you be involved?",
        answer:
          "Before the URL structure is decided, not after launch. A migration mapped URL by URL in advance is routine; one diagnosed afterwards is a recovery project, and recoveries take longer than the damage did.",
      },
      {
        question: "How much traffic will this add?",
        answer:
          "Technical work usually removes a ceiling rather than adding traffic on its own — it makes the content and authority work capable of paying off. Any agency quoting you a percentage uplift for a crawl fix is guessing.",
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // GROWTH STRATEGY & ADVISORY
  // ───────────────────────────────────────────────────────────────────────────
  "growth-strategy-operating-model": {
    pov: "Most growth problems presented as strategy problems are operating problems. The plan is fine; nobody owns the number, the reporting does not settle arguments, and the decision about what to stop doing never gets made. An operating model is the machinery that turns a strategy into weekly decisions — and without it a strategy document is an expensive opinion.",
    problem: {
      title: "Everyone is busy and nobody can say what moved",
      body: "Channels are running, reports are circulating, the team is fully occupied. Ask which activity produced the last meaningful change in revenue and the room goes quiet — not because people are careless, but because no one metric is owned, the reporting cannot separate causes, and there is no forum where something gets stopped. Adding another channel to that system adds noise, not growth.",
    },
    included: [
      {
        title: "One north-star metric, with an owner",
        body: "A single number the programme is judged on, defined in writing, with one named person accountable for it. Most reporting disputes are definition disputes discovered too late.",
      },
      {
        title: "A decision cadence",
        body: "Weekly operating review, monthly board-style review. Agendas that force a decision rather than a status update, and a standing slot for what gets stopped.",
      },
      {
        title: "Channel roles, stated",
        body: "What each channel is for, what it is judged on, and what it is explicitly not responsible for. Half of all channel disappointment is a channel being blamed for a job it was never given.",
      },
      {
        title: "A reporting pack that settles arguments",
        body: "One page that shows the north-star, the inputs beneath it, and what changed — not a forty-tab dashboard nobody opens between meetings.",
      },
      {
        title: "A stop list",
        body: "Written down and reviewed. Organisations are structurally good at starting and structurally terrible at stopping, and the budget released by stopping is what funds the next thing.",
      },
    ],
    method: [
      {
        title: "Diagnose the operating system",
        duration: "Week 1–4",
        body: "Who decides what, on what evidence, how often. Usually the fault is not the plan but the absence of a forum where it can be changed.",
      },
      {
        title: "Define the number",
        duration: "Week 3–5",
        body: "North-star agreed and written down, inputs mapped beneath it, ownership assigned by name rather than by team.",
      },
      {
        title: "Install the cadence",
        duration: "Month 2",
        body: "Reviews stood up and chaired by us until the agenda holds without us in the room.",
      },
      {
        title: "Hand over",
        duration: "Month 3–6",
        body: "Chairing passes to your team with the pack, the agenda and the stop list documented. An operating model that only works while we attend is not an operating model.",
      },
    ],
    notThis: [
      "A strategy deck. Documents do not change decisions; forums with owners do.",
      "A new dashboard. If the current reporting cannot settle an argument, more charts will not help.",
      "An org redesign. This is about how decisions get made, not who reports to whom.",
    ],
    faqs: [
      {
        question: "We already have a strategy. Why would we need this?",
        answer:
          "Most clients do, and it is usually a reasonable strategy. The question this answers is different: when the plan meets a bad month, who decides what changes, on what evidence, and in which meeting? If the honest answer is unclear, the strategy will not survive contact regardless of its quality.",
      },
      {
        question: "Is this the same as fractional marketing leadership?",
        answer:
          "Related but not the same. Fractional leadership puts a senior operator in the seat. This installs the machinery so the seat can be filled by your own team — and the two are often sequenced, leadership first while the model is built.",
      },
      {
        question: "How is it different from the diagnostic?",
        answer:
          "The diagnostic identifies what is constraining growth. This makes the organisation capable of acting on that finding every week rather than reading it once. Many engagements need only the diagnostic; this is for the ones where the finding was correct and nothing changed afterwards.",
      },
      {
        question: "Can you do this if we have no in-house marketing team?",
        answer:
          "Yes, and the cadence looks different — fewer people, faster decisions, more of the work sitting with us. What does not change is that one named person on your side owns the number. Without that, nothing here survives our departure.",
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "attribution-measurement": {
    pov: "Measurement is not reporting. Reporting is what you show the board at the end of the month; measurement is the signal the bidding algorithms learn from every hour of every day. When it is wrong, the platform does not tell you — it confidently optimises toward the wrong thing and the dashboard looks entirely normal while it does it.",
    problem: {
      title: "The account is optimising against nothing",
      body: "Broken or partial conversion tracking is the most expensive fault in paid media and the hardest to see. We have opened accounts with 147 leads sitting in the CRM and zero conversions recorded on the platform — Smart Bidding had been training on an empty signal for months, and every budget increase multiplied the waste rather than the return. Nothing else in a media programme is worth doing until this is fixed, which is why it is always the first four weeks.",
    },
    stats: [
      {
        figure: "70%+",
        label: "Leads cleared qualification",
        source: "TRU Aquapolis — measured against the client's CRM, not the ad platform",
      },
      {
        figure: "₹2,333",
        label: "Cost per lead",
        source: "6,000+ leads across eight months, Jan–Aug 2026",
      },
      {
        figure: "₹187.5 Cr",
        label: "Closed sales traced back to source",
        source: "75 units on ₹1.4 Cr of media — closed by the client's own sales team",
      },
    ],
    included: [
      {
        title: "Conversion tracking audit against your CRM",
        body: "Every conversion event tested end to end and reconciled against what actually landed in your system of record. Not a tag audit — a count. If the platform says 400 and the CRM says 147, we find out why before anything else happens.",
      },
      {
        title: "Server-side measurement",
        body: "Since App Tracking Transparency, browser-pixel tracking undercounts conversions by a margin nobody can quantify from inside the platform. Server-side is deployed as standard on Meta, and on Google where the conversion happens off-site.",
      },
      {
        title: "Offline conversion import",
        body: "Qualified-lead and closed-won status pushed back from your CRM into the ad platforms, so bidding optimises toward outcomes rather than form fills. This is the single change that most often moves cost per qualified lead.",
      },
      {
        title: "One agreed north-star metric",
        body: "Written down, with a definition everyone signs off, before any spend changes. Most reporting disputes are definition disputes discovered three months too late.",
      },
      {
        title: "A reconciliation view",
        body: "Platform-reported numbers and CRM numbers side by side, with the gap stated rather than hidden. The gap never goes to zero. Knowing its size is what makes the platform figures usable.",
      },
    ],
    method: [
      {
        title: "Audit",
        duration: "Week 1–2",
        body: "Every event traced from click to CRM record. We produce a written list of what is broken, what is double-counting, and what is silently discarding data.",
      },
      {
        title: "Rebuild",
        duration: "Week 2–4",
        body: "Tracking reimplemented, server-side deployed, offline import wired up. Measured against a holdout where the account volume allows it.",
      },
      {
        title: "Agree the number",
        duration: "Week 4",
        body: "One north-star metric, defined in writing, with the reconciliation gap documented alongside it.",
      },
      {
        title: "Report against it",
        duration: "Monthly, ongoing",
        body: "Against your own prior periods. Platform-reported conversions are used to compare ads with each other, never as the number of record.",
      },
    ],
    notThis: [
      "A dashboard build. A prettier view of a wrong number is a more expensive wrong number.",
      "A one-off tag audit. Tracking degrades every time the site changes, so this is maintained, not delivered.",
      "Multi-touch attribution modelling sold as certainty. We report what we can evidence and state the margin we cannot.",
    ],
    faqs: [
      {
        question: "Our tracking is probably fine. Can we skip this?",
        answer:
          "Almost every account says that, and it is exactly why the fault survives — the dashboard looks normal whether or not the data behind it is real. The audit is two weeks. If it comes back clean, you have lost two weeks and gained a documented baseline. If it does not, you have avoided months of budget training an algorithm on nothing.",
      },
      {
        question: "Why does the platform number never match the CRM?",
        answer:
          "Several reasons at once: attribution windows differ, ad platforms claim credit for conversions they only assisted, ATT removed a chunk of the signal, and de-duplication between pixel and server events is imperfect. The gap is normal. Pretending it does not exist is not. We state its size and report against your CRM.",
      },
      {
        question: "Can you do this without touching our CRM?",
        answer:
          "Partially, and it will be worth materially less. The point of the work is to teach the bidding algorithm what a good outcome looks like, and only your CRM knows that. Read access and the ability to push a status field back is usually all it takes.",
      },
      {
        question: "How long until we see the difference?",
        answer:
          "The rebuild itself produces no reportable improvement — that is the honest answer and it is why this phase is hard to sell. The improvement shows up in the two months after, once bidding has had enough qualified-outcome signal to retrain on.",
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "creative-strategy": {
    pov: "In a mature ad account, creative is the last remaining lever with real headroom. Bidding is automated, targeting is increasingly automated, and structure can only be fixed once. What changes the result after that is what the ad actually says — and the discipline of retiring the ones that do not work, which retainer economics rarely reward.",
    problem: {
      title: "Variants are being tested instead of concepts",
      body: "Most creative testing changes a button colour, a headline word, a stock photo. Those are variants of one idea, and they produce variance rather than learning. A concept test changes the argument: a different objection answered, a different proof offered, a different buyer addressed. On the Aquapolis account, 86% of Meta leads came from five creatives out of thirty-three tested — and the single best performer was a static floor plan, not a film. That result is unreachable if every test is a colour swap.",
    },
    stats: [
      {
        figure: "33",
        label: "Creatives tested",
        source: "TRU Aquapolis, Meta — Jan–Aug 2026",
      },
      {
        figure: "86%",
        label: "Of leads from five of them",
        source: "The other twenty-eight were retired",
      },
      {
        figure: "Static",
        label: "Best performer was a floor plan",
        source: "Not the film, and not the one anyone predicted",
      },
    ],
    included: [
      {
        title: "Concept development, not variant generation",
        body: "Each concept is a distinct argument — a different objection, proof point or buyer. Written as a one-line hypothesis before anything is produced, so a losing test still teaches something.",
      },
      {
        title: "In-house production",
        body: "Scripting, direction, crew, location and edit. Because the team buying the media is the team that shot the creative, a failing ad gets recut this week rather than re-briefed in a fortnight.",
      },
      {
        title: "Vertical-first framing",
        body: "Shot for vertical at the shoot rather than cropped afterwards. Reels, Shorts and in-feed are where the volume is, and a letterboxed landscape cut reads as repurposed because it is.",
      },
      {
        title: "Static as a first-class format",
        body: "Floor plans, price cards, comparison tables, plain text on brand colour. Static is cheaper to make, faster to iterate, and on at least one of our accounts it beat everything we filmed.",
      },
      {
        title: "A retirement rule",
        body: "Creatives are pulled on a stated threshold, not left running because they were expensive to make. This is the part clients dislike and the part that produces the return.",
      },
    ],
    method: [
      {
        title: "Hypothesis",
        duration: "Per test cycle",
        body: "Each concept written as a claim about why someone buys. Anything that cannot be stated that way is decoration.",
      },
      {
        title: "Produce in sets",
        duration: "Batched",
        body: "Shot in batches so one production day feeds a quarter of testing, with behind-the-scenes capture running alongside for organic use.",
      },
      {
        title: "Test with enough volume to read",
        duration: "2–4 weeks per set",
        body: "Ad sets consolidated rather than fragmented — the algorithm needs volume per set to distinguish anything at all.",
      },
      {
        title: "Retire, then reinvest",
        duration: "Continuous",
        body: "Losers pulled, budget consolidated behind the survivors, next hypothesis set written from what the winners had in common.",
      },
    ],
    notThis: [
      "A brand film with no distribution plan attached.",
      "Endless variants of a winning ad. That is optimisation, and it plateaus quickly.",
      "Creative produced to a volume quota. Forty assets a month is an output metric, not a result.",
    ],
    faqs: [
      {
        question: "We already have brand assets. Can you just run those?",
        answer:
          "We can, and it is usually the right first test — your existing creative is the baseline everything else has to beat. What we will not do is keep running it once the data says it has stopped working, which is the most common way a good asset turns into an expensive one.",
      },
      {
        question: "Do you charge a production markup?",
        answer:
          "No. Talent, location and licensing costs are passed through at cost. We are not incentivised to make an expensive film when a static floor plan would outperform it — which, on one account, it did.",
      },
      {
        question: "How many creatives do we need?",
        answer:
          "Fewer than most agencies sell and more than most clients expect. The Aquapolis number was thirty-three over eight months, and the value came from being willing to kill twenty-eight of them.",
      },
      {
        question: "Who owns the footage?",
        answer:
          "You do — including the raw files and the behind-the-scenes capture, not just the delivered cuts. If we part ways, the library stays with you.",
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "retargeting-lifecycle": {
    pov: "The durable output of a media programme is not the leads it generated last month. It is the warm audience it accumulated — people who have already engaged and cost a fraction of cold acquisition to reach again. Treated as an afterthought, that asset never compounds. Built into the funnel architecture from the start, it becomes the cheapest revenue in the account.",
    problem: {
      title: "Retargeting is one audience, shown one ad, forever",
      body: "The common setup is a single all-site-visitors audience seeing the same creative at an uncapped frequency until it fatigues. It works briefly, then quietly becomes a tax: spend against people who were going to convert anyway, plus irritation for everyone who was not. Meanwhile the segments that would actually respond to a different message — someone who priced but did not enquire, someone who enquired but went cold — are never separated out.",
    },
    included: [
      {
        title: "Segmentation by engagement depth",
        body: "Viewed, engaged, enquired, went cold — each a separate audience with its own message, budget and frequency cap. A page-view and an abandoned enquiry are not the same person.",
      },
      {
        title: "Frequency discipline",
        body: "Caps set against fatigue rather than left to the platform, and creative rotated on a schedule so the same person is not served the same ad for six weeks.",
      },
      {
        title: "Exclusions that actually run",
        body: "Converted customers removed, existing pipeline removed where the CRM can tell us. Paying to retarget someone your sales team is already in conversation with is pure waste and it is extremely common.",
      },
      {
        title: "Handoff to owned channels",
        body: "Retargeting is rented attention. Wherever the funnel allows, the goal is to move that person onto email, SMS or WhatsApp — channels you own and do not pay per impression for.",
      },
      {
        title: "Warm-pool reporting",
        body: "Audience size and cost-to-rebuild reported as a standing asset, so the value accumulating in the account is visible rather than invisible.",
      },
    ],
    method: [
      {
        title: "Map the funnel",
        duration: "Week 1–2",
        body: "Every meaningful engagement state identified and made addressable. Most accounts have three or four they have never used.",
      },
      {
        title: "Build the segments",
        duration: "Week 2–4",
        body: "Audiences constructed with exclusions wired in from the start, not bolted on after someone notices the waste.",
      },
      {
        title: "Message per state",
        duration: "Week 4–8",
        body: "Different creative per segment, because the reason someone stalled at pricing is not the reason someone stalled at enquiry.",
      },
      {
        title: "Move them to owned",
        duration: "Ongoing",
        body: "Lifecycle email, SMS and WhatsApp sequences take over where they can, so the same person is not re-bought every month.",
      },
    ],
    notThis: [
      "A single all-visitors audience with no cap. That is the default, and the default is the problem.",
      "Retargeting used to rescue a funnel that does not convert. It amplifies whatever the page already does.",
      "Reporting that counts retargeting conversions as incremental without saying so. Much of it is credit for a decision already made.",
    ],
    faqs: [
      {
        question: "Isn't retargeting just claiming credit for people who would have converted anyway?",
        answer:
          "A meaningful share of it is, and any agency telling you otherwise is selling. That is precisely why we separate segments by engagement depth and cap frequency — so the spend concentrates on states where a nudge plausibly changes the outcome, and so the reporting says which part is incremental and which is not.",
      },
      {
        question: "How small can an audience be and still work?",
        answer:
          "Below a few thousand, platform delivery becomes unreliable and costs rise sharply. Small audiences are usually better served by email or a direct call than by buying impressions against them.",
      },
      {
        question: "Does this replace our email marketing?",
        answer:
          "The opposite — it feeds it. The whole point of the handoff is to stop paying per impression for someone you could reach for free. Lifecycle sequences sit in Brand, Engagement & Lifecycle and the two practices are designed to hand over to each other.",
      },
      {
        question: "What about privacy rules?",
        answer:
          "Audience matching and exclusions are built inside each platform's terms and India's DPDP Act obligations. In regulated categories — healthcare in particular — some matching is simply not available, and that constraint is settled in the first fortnight rather than discovered in month three.",
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "paid-search": {
    pov: "Search is the only channel where the customer states their intent before you spend anything. Most accounts throw that away by structuring campaigns around products rather than around what the searcher is actually trying to do — and then average branded and non-branded performance into one number that flatters everything it touches.",
    problem: {
      title: "Branded traffic is hiding the real result",
      body: "When branded, non-branded and competitor terms share a reporting line, the branded performance — which you would largely have got for free — lifts the blended average and conceals whether the acquisition campaigns work at all. Separate them and the picture usually changes sharply. That separation is also what lets each tier carry a budget and a target appropriate to it, rather than one blended CPA that is wrong for all three.",
    },
    stats: [
      {
        figure: "₹2,333",
        label: "Cost per lead",
        source: "TRU Aquapolis, Google + Meta — 6,000+ leads, eight months",
      },
      {
        figure: "70%+",
        label: "Cleared qualification before handover",
        source: "Screened against budget band, fit and intent",
      },
      {
        figure: "75",
        label: "Units closed from the pipeline",
        source: "₹2.5 Cr average ticket, closed by the client's sales team",
      },
    ],
    included: [
      {
        title: "Intent-tiered account structure",
        body: "Branded, non-branded and competitor traffic separated so each is funded and judged on its own terms, and branded never flatters the rest.",
      },
      {
        title: "Negative keyword discipline",
        body: "Treated as core work rather than housekeeping. On most accounts it protects more budget than bid management does, and it is the first thing that lapses when an account is run at volume.",
      },
      {
        title: "Landing pages matched to tier",
        body: "One page taking all traffic is the most common conversion-rate ceiling in paid search. High-intent and research-stage searchers need different pages.",
      },
      {
        title: "Offline conversion import",
        body: "Qualified status pushed back from the CRM so Smart Bidding optimises toward outcomes rather than submissions. Without this, the algorithm cannot tell a serious buyer from a form filler.",
      },
      {
        title: "Query mining as routine",
        body: "Search terms reviewed on a schedule, with additions and exclusions made from what people actually typed rather than what the planner predicted.",
      },
    ],
    method: [
      {
        title: "Instrument first",
        duration: "Week 1–4",
        body: "Tracking verified against the CRM before any structural change. Restructuring an account you cannot measure just moves the problem.",
      },
      {
        title: "Restructure by intent",
        duration: "Week 3–6",
        body: "Campaigns split by tier, budgets separated, targets set per tier rather than blended.",
      },
      {
        title: "Fix the destination",
        duration: "Week 4–10",
        body: "Landing pages matched to intent. Frequently the cheapest available improvement in the whole programme.",
      },
      {
        title: "Qualify, then scale",
        duration: "Month 3+",
        body: "Screening before handover, then budget increases only against a funnel that converts and a sales desk that can absorb the volume.",
      },
    ],
    notThis: [
      "A bid-management retainer. Bidding is largely automated; the work is structure, signal and creative.",
      "Chasing a low cost per lead. Cheap leads are easy to buy and usually worthless.",
      "Scaling spend into a page that does not convert or a sales desk that does not follow up quickly.",
    ],
    faqs: [
      {
        question: "Should we bid on our own brand name?",
        answer:
          "Usually yes, but report it separately and expect to justify it. It is cheap, it defends against competitors bidding on you, and it converts well — which is exactly why blending it into the account average makes the rest of the account look better than it is.",
      },
      {
        question: "Google or Meta for lead generation?",
        answer:
          "Depends entirely on whether the demand already exists. Search captures intent that is already there; if the category or project is new, there is nothing to capture yet and demand generation has to come first. On Aquapolis both ran, and the qualification layer sat between them and the sales team.",
      },
      {
        question: "Why won't you commit to a cost per lead before starting?",
        answer:
          "Because any number quoted before the diagnostic is a guess dressed as a commitment, and it depends on your ticket size, cycle length and how the funnel behind the click performs. The published Aquapolis figure is ₹2,333 in Indian premium real estate — a different category will be different, and saying otherwise would be dishonest.",
      },
      {
        question: "Do you take a percentage of ad spend?",
        answer:
          "No. It pays us to increase your spend, which is the behaviour you are hiring us to stop. Fixed fee, media bought on your own accounts with your own billing.",
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "paid-social": {
    pov: "Paid social stopped being a targeting game after App Tracking Transparency. The platforms lost signal, the algorithms compensated by needing more volume per ad set, and the accounts that still fragment audiences into dozens of narrow segments are actively preventing the optimisation they are paying for. What matters now is measurement quality and creative volume — in that order.",
    problem: {
      title: "The pixel is undercounting and nobody knows by how much",
      body: "Since ATT, browser-pixel tracking misses conversions by a margin that cannot be measured from inside the platform. Accounts respond by either trusting a number that is too low and cutting a channel that was working, or trusting platform-reported revenue that double-counts and scaling something that was not. Server-side measurement does not eliminate the gap, but it narrows it and makes it knowable — which is the difference between a decision and a guess.",
    },
    stats: [
      {
        figure: "86%",
        label: "Of Meta leads from five creatives",
        source: "TRU Aquapolis — thirty-three tested, twenty-eight retired",
      },
      {
        figure: "6,000+",
        label: "Leads generated across the programme",
        source: "Meta and Google combined, Jan–Aug 2026",
      },
      {
        figure: "70%+",
        label: "Cleared qualification",
        source: "Before reaching the client's sales desk",
      },
    ],
    included: [
      {
        title: "Server-side measurement as standard",
        body: "Conversions API deployed and de-duplicated against the pixel, so the platform learns from a signal that survives browser restrictions.",
      },
      {
        title: "Consolidated ad sets",
        body: "Fewer, larger sets rather than fragmented micro-audiences. The algorithm needs volume per set to distinguish anything; splitting a small budget across twenty segments guarantees none of them exit the learning phase.",
      },
      {
        title: "Creative produced in-house",
        body: "Concepts shot, cut and tested by the same team that buys the media — so a failing ad is recut this week rather than re-briefed next fortnight.",
      },
      {
        title: "Audience architecture that accumulates",
        body: "Warm pools built deliberately rather than as a by-product, then handed to retargeting and lifecycle instead of being re-bought cold every month.",
      },
      {
        title: "Qualification before handover",
        body: "Social produces volume easily and quality inconsistently. Screening sits between the lead form and the sales team, on budget band, fit and genuine intent.",
      },
    ],
    method: [
      {
        title: "Fix the signal",
        duration: "Week 1–4",
        body: "Server-side measurement, event de-duplication, offline conversion import. Everything downstream depends on this being right.",
      },
      {
        title: "Consolidate",
        duration: "Week 3–6",
        body: "Ad sets merged to give the algorithm enough volume to optimise, budgets concentrated rather than sprinkled.",
      },
      {
        title: "Test concepts in sets",
        duration: "Ongoing",
        body: "Distinct arguments, not colour variants, with a stated retirement threshold.",
      },
      {
        title: "Screen, then scale",
        duration: "Month 3+",
        body: "Qualification layer live before volume increases, so the sales desk gets screened leads rather than raw submissions.",
      },
    ],
    notThis: [
      "Micro-segmented audiences on a small budget. It feels sophisticated and it starves the algorithm.",
      "Reporting platform-attributed revenue as though it were actual revenue.",
      "Boosting posts. That is a different activity with a different purpose, and it is not this.",
    ],
    faqs: [
      {
        question: "Does Meta still work for lead generation in India?",
        answer:
          "On TRU Aquapolis it produced a large share of 6,000+ leads at ₹2,333 blended cost per lead, and 86% of the Meta leads came from five creatives. So yes — but the result came from measurement and creative discipline, not from targeting cleverness.",
      },
      {
        question: "Why consolidate ad sets? Isn't narrower targeting better?",
        answer:
          "It was, before the platforms lost signal. Now the algorithm needs enough conversions per ad set to exit the learning phase and optimise at all. Splitting a modest budget across many narrow sets means none of them ever gets there.",
      },
      {
        question: "Is LinkedIn worth it?",
        answer:
          "For a genuine B2B buying committee, often yes, and it will cost several times what Meta does per lead. Whether that is acceptable depends entirely on what a customer is worth to you — which is why the diagnostic establishes that number before any channel recommendation.",
      },
      {
        question: "The leads from social are poor quality. Can you fix that?",
        answer:
          "Usually, and the fix is rarely in the ad account. It is a qualification definition problem: a volume target was set without anyone defining what a real lead is. Once that definition exists and can be fed back from the CRM, the bidding starts buying for it.",
      },
    ],
  },
};

export function getServiceContent(service: string): ServiceContent | null {
  return SERVICE_CONTENT[service] ?? null;
}
