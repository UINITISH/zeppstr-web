import { paragraphsToPt } from "../portable-text";

/**
 * Industry pages.
 *
 * ── EXPANDED 11 SEP 2026 ────────────────────────────────────────────────────
 * Previously two short paragraphs and one or two FAQs per industry — thin
 * enough that the pages read as placeholders. Each now carries a fuller
 * diagnosis, a stated approach, and four to five FAQs written from real
 * objections rather than invented ones.
 *
 * ── SOURCING RULE ───────────────────────────────────────────────────────────
 * Named results appear only where there is a published case study behind them:
 *
 *   Real Estate        → TRU Aquapolis (Jan–Aug 2026)
 *   E-commerce / D2C   → Wise Market, Mini Leaves
 *
 * The other four verticals describe method, not outcomes. Zeppstr has clients
 * in each, but no published, client-agreed figures — so none are claimed. Add
 * them here as case studies are signed off, not before.
 */

interface SeedIndustry {
  _id: string;
  name: string;
  slug: string;
  heroClaim: string;
  whatsBroken: ReturnType<typeof paragraphsToPt>;
  ourApproach: ReturnType<typeof paragraphsToPt>;
  solutionsMostUsedIds: string[];
  industryFaqs: Array<{
    question: string;
    answer: ReturnType<typeof paragraphsToPt>;
  }>;
  seoTitle: string;
  seoDescription: string;
}

export const INDUSTRIES: SeedIndustry[] = [
  // ───────────────────────────────────────────────────────────── REAL ESTATE
  {
    _id: "industry-real-estate",
    name: "Real Estate",
    slug: "real-estate",
    heroClaim:
      "Property marketing fails on attribution, not on creative. We fix the measurement first.",
    whatsBroken: paragraphsToPt([
      "Real estate has the longest consideration cycle and the highest ticket size of any category we work in, and almost every account we inherit is optimised as though neither were true. Cost per lead is managed down, the cheap traffic floods in, and the sales team spends its week on people who were never going to buy.",
      "The structural problem is that the money is made weeks after the click, in a CRM the ad platform cannot see. Unless qualified-lead status is fed back into bidding, the algorithm optimises toward whatever is cheap and plentiful — which in property means rental enquiries, job seekers and students researching the area.",
      "The second failure is speed. A property enquiry contacted within minutes converts at a materially different rate from one contacted the next day. Plenty of accounts we have reviewed were not short of leads at all. They were short of a sales desk that could answer them.",
    ]),
    ourApproach: paragraphsToPt([
      "We start with instrumentation, not media. Conversion tracking verified against the CRM, offline conversion import so bidding learns from qualified enquiries rather than form fills, and a negative keyword discipline that excludes rental, jobs and out-of-area traffic before the first rupee is spent.",
      "Campaigns are then structured by intent tier. Project-name and configuration searches — the ones that convert — are funded and judged separately from locality research, which needs a longer nurture path. Blending the two makes both unreadable.",
      "We also qualify before handover. On TRU Aquapolis roughly 30% of leads never reached the client's sales desk. Handing over raw volume buries a sales team; handing over screened volume lets it sell. Over eight months that produced 75 closed units — ₹187.5 Cr in sales — from ₹1.4 Cr of media.",
      "For a launch with no established search volume, demand generation runs first. Paid search captures existing intent; it cannot create it. Accounts that skip this step blame the search campaign for a problem it was never able to solve.",
    ]),
    solutionsMostUsedIds: [
      "solution-performance-media",
      "solution-experience-engineering",
      "solution-organic-growth",
    ],
    industryFaqs: [
      {
        question: "Do you work with developers, brokerages, or both?",
        answer: paragraphsToPt([
          "Both. Developers running individual project launches, and brokerages running portfolios. The work shape differs — a launch needs demand generation before search has anything to capture, a brokerage needs lead flow across many inventories — but the sequence is the same: measurement, structure, qualification, then scale.",
        ]),
      },
      {
        question: "How do you measure success in real estate?",
        answer: paragraphsToPt([
          "Cost per qualified enquiry, site visits booked, and units closed. Never cost per lead in isolation — it is the metric that quietly defunds the traffic that actually produces bookings.",
          "We report against your own prior periods rather than published benchmarks, because category averages in property blend markets and price bands that have nothing to do with each other.",
        ]),
      },
      {
        question: "Can you attribute bookings to marketing?",
        answer: paragraphsToPt([
          "Partially and honestly, which is the only defensible position. We can attribute the enquiry, because we generated it. We cannot attribute the close, because your sales team did that.",
          "On Aquapolis we tracked leads from Meta and Google through qualification and into the client's CRM, so closed units were traceable to leads we generated. We still describe the result as sales closed from our leads, not revenue we generated. Any agency claiming the whole chain in this category is overstating.",
        ]),
      },
      {
        question: "What does a typical media budget look like?",
        answer: paragraphsToPt([
          "It is set by what a unit is worth, not by a percentage of anything. Work backwards: ticket size, an achievable close rate on qualified leads, and what you can afford to pay to acquire one buyer. That produces a maximum sustainable cost per lead, and the budget follows from the volume you need.",
          "If the auction in your micro-market clears above that ceiling, paid search is not viable at your current conversion rate — and the fix is the landing page or the offer, not the bidding. We would rather tell you that before you sign.",
        ]),
      },
      {
        question: "How long before we see bookings?",
        answer: paragraphsToPt([
          "Enquiries within days. Site visits within weeks. Bookings on whatever your sales cycle actually is — typically two to four months for premium residential, longer for under-construction inventory.",
          "Judging a property account at week six produces the wrong conclusion almost every time. Aquapolis was eight months.",
        ]),
      },
    ],
    seoTitle: "Real Estate Marketing | Lead Generation for Developers & Brokerages",
    seoDescription:
      "Property marketing built on attribution, not creative. Intent-tier campaign structure, CRM-verified qualification, and demand generation for launches. 75 units closed from ₹1.4 Cr of media.",
  },

  // ─────────────────────────────────────────────────────── E-COMMERCE / D2C
  {
    _id: "industry-ecommerce-dtc",
    name: "E-commerce / D2C",
    slug: "ecommerce-dtc",
    heroClaim:
      "E-commerce growth compounds when acquisition, retention and the site work as one system.",
    whatsBroken: paragraphsToPt([
      "Most e-commerce marketing is single-channel optimisation in isolation. SEO does its thing, paid does its thing, the site does its thing, and email is a newsletter nobody has looked at in a year. Each has a ceiling, and the brand hits it.",
      "The ceiling usually arrives as rising acquisition costs. Paid social gets more expensive, the blended CAC creeps up, and the response is to spend more on the channel that is already the constraint — rather than on the retention economics that would make the spend affordable.",
      "Wise Market hit that ceiling at AUD 40K a month. The fix was not more ads. It was rebuilding the system underneath them.",
    ]),
    ourApproach: paragraphsToPt([
      "We operate organic, paid, lifecycle and conversion as one connected system. Organic captures commercial intent at near-zero marginal cost. Paid fills the gaps and creates awareness. Email and SMS carry the repeat purchase that makes acquisition economics work. The site converts all of it.",
      "Lifecycle is usually the fastest win and the most neglected. In most accounts we open, the welcome and abandoned-cart flows are either missing or a single untouched email. Those two sequences typically carry a disproportionate share of email revenue once built properly.",
      "On the measurement side, browser-pixel tracking has undercounted conversions since App Tracking Transparency, which distorts both reporting and the platform's own optimisation. Server-side measurement is standard on our accounts rather than an upgrade.",
      "Wise Market went from AUD 40K to AUD 2.7M in six months. Mini Leaves moved from 0.5% conversion to over 3% — which changed what they could afford to pay for traffic, and therefore what was possible.",
    ]),
    solutionsMostUsedIds: [
      "solution-organic-growth",
      "solution-performance-media",
      "solution-experience-engineering",
    ],
    industryFaqs: [
      {
        question: "Do you work with Shopify, WooCommerce, custom platforms?",
        answer: paragraphsToPt([
          "All three. Platform matters less than the depth of the data integration — whether your email and ad platforms receive product-level behaviour, or only an email address and an order total. Shallow integration limits segmentation to a first name, which is not personalisation.",
        ]),
      },
      {
        question: "What revenue range do you typically work with?",
        answer: paragraphsToPt([
          "Brands doing meaningful volume where the constraint is systemic rather than one broken channel. Below a certain scale the honest answer is that a specialist retainer costs more than the improvement it produces, and we will say so.",
        ]),
      },
      {
        question: "How do you handle attribution when platforms disagree?",
        answer: paragraphsToPt([
          "We pick one source as the decision-making number — usually backend revenue — and use platform data for relative comparison between ads rather than as an absolute count.",
          "Meta, Google and your analytics will never agree, because they use different attribution models and windows. Expecting them to match wastes a great deal of time. Choosing which one governs decisions, and staying consistent, does not.",
        ]),
      },
      {
        question: "Is SEO worth it for e-commerce, or should we just run ads?",
        answer: paragraphsToPt([
          "It depends on your margin and your time horizon. If contribution margin cannot absorb the click cost in your category, paid is not viable at any level of optimisation and organic is the only route. If you need revenue this quarter, paid is the only route.",
          "Most brands need both, sequenced: paid first to learn which products and messages convert, then content built around what was proved rather than assumed.",
        ]),
      },
      {
        question: "What do you fix first?",
        answer: paragraphsToPt([
          "Usually conversion rate and lifecycle email, in that order — both improve the economics of every channel at once. Sending more traffic to a page that does not convert is a more expensive version of the same result.",
        ]),
      },
    ],
    seoTitle: "E-commerce & D2C Marketing | Acquisition, Retention, Conversion",
    seoDescription:
      "E-commerce growth as one system — organic, paid, lifecycle email and conversion. Wise Market scaled AUD 40K to AUD 2.7M in six months. Server-side measurement as standard.",
  },

  // ────────────────────────────────────────────────────────────── SAAS / TECH
  {
    _id: "industry-saas-tech",
    name: "SaaS / Tech",
    slug: "saas-tech",
    heroClaim:
      "You are selling to a committee of six. Most SaaS marketing is written for one of them.",
    whatsBroken: paragraphsToPt([
      "A meaningful B2B software purchase involves the person who will use it, the person who will manage it, someone in finance, someone in security or legal, and an executive sponsor. Marketing that speaks only to the practitioner reaches the person who starts the process and none of the people who can stop it.",
      "The second problem is timescale. With cycles running six to eighteen months, content published this quarter influences revenue several quarters out. Programmes get cut at month four for not producing pipeline — which is roughly like abandoning a crop before harvest.",
      "The third is attribution. Buyers complete most of their research privately, in communities, group chats and forwarded documents that analytics never records. Last-click attribution systematically undercounts the work that generated the demand, and is then used as the argument for cutting it.",
    ]),
    ourApproach: paragraphsToPt([
      "We map the buying committee before writing anything, then audit what exists against it. Most companies find they have five assets for the practitioner and nothing for finance, security or the executive sponsor.",
      "The material closest to revenue is usually the thinnest: the business case, the cost comparison, the security summary — the things an internal champion forwards to make your argument when you are not in the room. We build that first.",
      "Measurement is set to the real sales cycle. Pipeline influenced and content-assisted revenue over a matched window, plus self-reported attribution on enquiry forms, because the gap between what buyers say and what analytics records is usually the most informative number available.",
    ]),
    solutionsMostUsedIds: [
      "solution-growth-strategy-advisory",
      "solution-organic-growth",
      "solution-performance-media",
    ],
    industryFaqs: [
      {
        question: "Do you work with product-led and sales-led companies?",
        answer: paragraphsToPt([
          "Both, and the difference matters. Product-led motions need the activation and onboarding path treated as marketing surface. Sales-led motions need the late-stage material that lets a champion justify the purchase internally. Applying one playbook to the other is a common and expensive mistake.",
        ]),
      },
      {
        question: "How long before this produces pipeline?",
        answer: paragraphsToPt([
          "Match your expectations to your sales cycle. If deals take nine months, work starting now affects closed revenue in roughly nine months, with pipeline signal earlier than that.",
          "If the business cannot commit for a year, the budget is better spent on demand capture than demand creation. We would rather say that at the start than at month four.",
        ]),
      },
      {
        question: "Can you work alongside our in-house team?",
        answer: paragraphsToPt([
          "That is the usual arrangement. We tend to own the parts that need specialist depth or an outside perspective, while the in-house team owns product knowledge and customer relationships. Duplicating what you already do well is a poor use of the budget.",
        ]),
      },
      {
        question: "Should we use AI to produce content faster?",
        answer: paragraphsToPt([
          "For research and drafting, usefully. As the source of what you publish, no.",
          "In a category where every competitor can now generate competent content instantly, competent is the baseline rather than the differentiator. What still works is proprietary data, genuine expertise and a defensible position — precisely the things a model cannot synthesise from what is already published.",
        ]),
      },
    ],
    seoTitle: "SaaS & Tech Marketing | B2B Demand Generation That Fits the Cycle",
    seoDescription:
      "B2B software marketing built for the buying committee, not one persona. Late-stage enablement, attribution matched to real sales cycles, and content that survives an AI-saturated category.",
  },

  // ────────────────────────────────────────────────── HEALTHCARE / WELLNESS
  {
    _id: "industry-healthcare-wellness",
    name: "Healthcare & Wellness",
    slug: "healthcare-wellness",
    heroClaim:
      "Regulated categories reward restraint. The constraint is the strategy.",
    whatsBroken: paragraphsToPt([
      "Healthcare marketing fails in one of two directions. Either it is so cautious that it says nothing a patient could act on, or it makes claims that will not survive scrutiny — from a regulator, a platform reviewer, or a prospective patient who checks.",
      "Both come from treating compliance as an obstacle placed in front of the marketing rather than as a constraint that shapes it. Advertising platforms also apply their own restrictions on health claims and targeting, independent of local law, and these are enforced by automated review with little appetite for appeal.",
      "The practical result is accounts that get repeatedly disapproved, rebuilt, and disapproved again, with nobody establishing what the actual boundary is.",
    ]),
    ourApproach: paragraphsToPt([
      "We establish what can be said before building anything — what the applicable regulations permit, what each platform's policy allows, and what your clinical team will actually sign off. That boundary becomes the brief rather than an obstruction discovered later.",
      "Within it, the work is trust-building rather than claim-making. Practitioner credentials, the process a patient will go through, honest treatment of what results depend on, and answers to the questions people are too embarrassed to ask their doctor. That material converts in this category precisely because so little of it exists.",
      "Patient data handling is designed in from the start — consent, retention and access, under India's DPDP Act and any other regime that applies to where your patients are.",
    ]),
    solutionsMostUsedIds: [
      "solution-organic-growth",
      "solution-experience-engineering",
      "solution-brand-engagement-lifecycle",
    ],
    industryFaqs: [
      {
        question: "Do you handle regulated medical claims?",
        answer: paragraphsToPt([
          "We work within them; we do not advise on them. Your clinical and legal people determine what is defensible, and we build the marketing inside that boundary. We will push to establish it precisely at the start, because vagueness there produces rework later.",
        ]),
      },
      {
        question: "Our ads keep getting disapproved. Can you fix that?",
        answer: paragraphsToPt([
          "Usually. Most disapprovals in this category trace to landing page content or claim language rather than the ad itself, and platform reviewers assess the whole path. Fixing the ad while leaving the page unchanged produces another disapproval.",
        ]),
      },
      {
        question: "How do you handle patient data?",
        answer: paragraphsToPt([
          "Minimally and deliberately. We design enquiry flows to collect only what is needed to respond, with explicit consent, a stated retention period, and no health information passed to advertising platforms — which is both a legal exposure and a platform policy breach.",
        ]),
      },
      {
        question: "Can we use patient testimonials?",
        answer: paragraphsToPt([
          "Sometimes, with care, and the rules vary by jurisdiction and treatment type. Where testimonials are restricted, process transparency and practitioner credibility do the same work — often better, because they answer the question a patient is actually asking.",
        ]),
      },
    ],
    seoTitle: "Healthcare & Wellness Marketing | Growth Within the Rules",
    seoDescription:
      "Healthcare marketing that treats compliance as the brief rather than an obstacle. Platform policy, claim boundaries, DPDP-compliant patient data handling, and trust-led acquisition.",
  },

  // ───────────────────────────────────────────────────── EDTECH / EDUCATION
  {
    _id: "industry-edtech-education",
    name: "EdTech & Education",
    slug: "edtech-education",
    heroClaim:
      "Admissions are seasonal. The marketing that wins is not.",
    whatsBroken: paragraphsToPt([
      "Education marketing concentrates spend into admission windows and goes quiet in between. Costs spike when every competitor bids simultaneously, and the institution arrives at the auction as a stranger to everybody in it.",
      "The decision is also rarely made by one person. A student chooses, a parent funds, and in professional education an employer may approve. Material written for only one of them leaves the others unconvinced, and the unconvinced one usually decides.",
      "Enrolment is a considered, emotional, high-stakes decision that most education marketing treats like a transaction.",
    ]),
    ourApproach: paragraphsToPt([
      "We run the off-season deliberately. Content and organic visibility built through quiet months mean that when the admission window opens, you are a name people already recognise rather than another ad. That is what makes peak-season cost per enrolment survivable.",
      "We build separately for each decision-maker. Outcomes and experience for the student; cost, safety and employability for the parent; capability and return for the employer. The same programme, argued three ways.",
      "Attribution is matched to the real decision path — a long one, involving conversations we cannot see. Self-reported attribution on enquiry forms consistently surfaces influences that analytics never recorded, and in this category the gap is large.",
    ]),
    solutionsMostUsedIds: [
      "solution-organic-growth",
      "solution-performance-media",
      "solution-brand-engagement-lifecycle",
    ],
    industryFaqs: [
      {
        question: "Do you work with K-12, higher education, or professional courses?",
        answer: paragraphsToPt([
          "All three, though they behave differently. K-12 is local and parent-decided. Higher education is national or international with a long research phase. Professional education is often employer-funded and closest to a B2B motion. The audience research changes even where the channels do not.",
        ]),
      },
      {
        question: "How do we compete with institutions that outspend us?",
        answer: paragraphsToPt([
          "By not meeting them in the same auction on the same terms. Specific programme searches, regional-language keywords and long-tail intent are consistently cheaper and convert better than broad category terms, which is where large budgets are usually concentrated.",
        ]),
      },
      {
        question: "Should we market year-round or only during admissions?",
        answer: paragraphsToPt([
          "Year-round, at a lower level. The off-season is when awareness is cheap to build. Concentrating everything into the window means paying peak prices to introduce yourself to people who have never heard of you.",
        ]),
      },
      {
        question: "How do you measure success?",
        answer: paragraphsToPt([
          "Cost per qualified application and cost per enrolment, not cost per enquiry. Enquiry volume in education is easy to buy and frequently uncorrelated with admissions.",
        ]),
      },
    ],
    seoTitle: "EdTech & Education Marketing | Admissions and Enrolment Growth",
    seoDescription:
      "Education marketing built around real decision paths — student, parent and employer. Off-season awareness that makes peak-season admissions affordable, measured on enrolments.",
  },

  // ───────────────────────────────────────────────── PROFESSIONAL SERVICES
  {
    _id: "industry-professional-services",
    name: "Professional Services",
    slug: "professional-services",
    heroClaim:
      "People hire the person, not the firm. Most firm marketing hides the people.",
    whatsBroken: paragraphsToPt([
      "Professional services marketing is remarkably uniform. Every firm is experienced, client-focused and results-driven; every website says so; and a prospect comparing three of them finds nothing to choose between.",
      "This matters more here than elsewhere, because the purchase is a judgement about competence made largely on signals. Clients cannot evaluate legal or financial work in advance. They evaluate whether they trust the person who will do it — and most firm websites make that impossible by keeping the people anonymous.",
      "Referral dependence compounds it. Referrals are excellent business and a poor growth plan, because the volume is outside your control and nobody in the firm is responsible for it.",
    ]),
    ourApproach: paragraphsToPt([
      "We build visibility around individuals rather than the firm. Named practitioners with a stated point of view, answering the questions clients actually arrive with. This is the fastest route to differentiation in a category where everybody claims the same attributes.",
      "Search demand here is specific and high-intent — people look for a problem, in a place, at a moment. Structuring around those queries rather than broad category terms produces better economics and better-qualified enquiries.",
      "Where the category is regulated, advertising rules and professional conduct requirements shape the brief from the start. We establish the boundary before building, not after a complaint.",
    ]),
    solutionsMostUsedIds: [
      "solution-organic-growth",
      "solution-brand-engagement-lifecycle",
      "solution-experience-engineering",
    ],
    industryFaqs: [
      {
        question: "Do you work with law firms specifically?",
        answer: paragraphsToPt([
          "Yes, alongside accountancy, consulting and advisory practices. Legal advertising in India is subject to Bar Council restrictions on solicitation, so the work centres on informational visibility and credibility rather than promotion. We establish what is permitted with your compliance people before building.",
        ]),
      },
      {
        question: "Our partners do not want to be visible. Can this still work?",
        answer: paragraphsToPt([
          "Less well, and it is worth being honest about that. Firm-level content can build search visibility, but the differentiation that wins considered professional engagements comes from identifiable expertise.",
          "A workable middle path is one or two partners who are willing, rather than the whole firm. That is usually enough.",
        ]),
      },
      {
        question: "How do we reduce dependence on referrals?",
        answer: paragraphsToPt([
          "By building a second channel deliberately, while the referrals are still healthy. Search visibility on the specific problems you solve is the most durable option, because it compounds and does not reset.",
          "The wrong time to start is when referral volume has already dropped.",
        ]),
      },
      {
        question: "How long does this take?",
        answer: paragraphsToPt([
          "Organic visibility in professional services typically takes months to establish and then holds well, because competitors rarely sustain the effort. Enquiry volume tends to be lower and higher-value than in consumer categories — a handful of the right enquiries a month can be a very good outcome.",
        ]),
      },
    ],
    seoTitle: "Professional Services Marketing | Visibility for Firms and Practitioners",
    seoDescription:
      "Marketing for law, accountancy, consulting and advisory firms. Practitioner-led visibility, high-intent search structure, and compliance-aware growth that reduces referral dependence.",
  },
];
