import { join } from "node:path";
import { readFileSync } from "node:fs";
import { toPortableText } from "../portable-text";

/**
 * Insights / articles.
 *
 * Body copy is parsed from markdown in deliverables/content/insights/.
 * Metadata (slug, category, SEO) is hand-curated below.
 *
 * ── SOURCING NOTE ───────────────────────────────────────────────────────────
 * These are written from Zeppstr's own engagement data — the Tru Aquapolis
 * account (Mar–May 2026) and the Invest in Sharjah search programme. Every
 * figure quoted appears in the corresponding case study and is traceable to
 * platform reporting.
 *
 * The "Zeppstr Blogs List" sheet was reviewed as a source and rejected: its
 * "Ready Articles" tab holds 29 topic titles with zero published rows
 * (Article Live = TRUE on none, no URLs), no body copy in any column, and
 * the topics are 2023 trend round-ups that would date the site badly.
 * Use that sheet as a production tracker, not a content store.
 */

const CONTENT_ROOT = "deliverables/content/insights";

type Category =
  | "growth-strategy"
  | "seo-search"
  | "performance-paid"
  | "conversion-experience"
  | "email-lifecycle"
  | "social-content"
  | "industry-insights";

interface SeedArticle {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: Category;
  publishedAt: string;
  markdownFile: string;
  relatedSolutionId?: string;
  seoTitle: string;
  seoDescription: string;
}


/**
 * WITHHELD FROM PUBLICATION — pulled offline 19 Aug 2026 at the founder's
 * instruction, pending an editorial review of sourcing.
 *
 * These four essays are the strongest writing on the site, but they were
 * seeded live without a publisher-level read. `revenue-claims-arithmetic` in
 * particular reconstructs an identifiable third-party deck (five named-by-
 * numbers projects, exact crore figures), which is a confidentiality and
 * relationship risk independent of whether the argument is correct.
 *
 * Nothing is deleted: the markdown still sits in
 * deliverables/content/insights/, and moving an entry back into META below
 * republishes it on the next `npm run seed`.
 *
 * To clear them from the live dataset after removing them here:
 *   npm run seed:prune -- --apply
 */
export const WITHHELD: SeedArticle[] = [
  {
    _id: "article-creative-concentration",
    title:
      "Eighty-six percent of your leads come from five ads. The skill is deleting the rest.",
    slug: "creative-concentration",
    excerpt:
      "Thirty-three creatives tested, two survived, and a single static floor-plan image delivered 440 leads at 37% below the blended average. The discipline was never making it — it was retiring the others.",
    author: "Team Zeppstr",
    category: "performance-paid",
    publishedAt: "2026-07-08T09:00:00Z",
    markdownFile: "creative-concentration.md",
    relatedSolutionId: "solution-performance-media",
    seoTitle: "Creative Concentration: Why 5 Ads Carry Your Account",
    seoDescription:
      "86% of leads came from five creatives. Why retiring underperformers matters more than making new ones — and why retainer economics discourage it.",
  },
  {
    _id: "article-revenue-claims-arithmetic",
    title:
      "If your agency's case study claims more revenue than the project was worth, stop reading it",
    slug: "revenue-claims-that-fail-arithmetic",
    excerpt:
      "A one-minute test for any agency deck: divide claimed revenue by the total value of what was being sold. We reviewed one claiming ₹4,555 Cr on a ₹450 Cr project.",
    author: "Team Zeppstr",
    category: "growth-strategy",
    publishedAt: "2026-07-22T09:00:00Z",
    markdownFile: "revenue-claims-that-fail-arithmetic.md",
    relatedSolutionId: "solution-growth-strategy-advisory",
    seoTitle: "The Revenue Claim Test for Agency Case Studies",
    seoDescription:
      "How impossible ROI claims get built from defensible-sounding estimates, what they cost you with a CFO buyer, and what to claim instead.",
  },
  {
    _id: "article-zero-conversions",
    title:
      "Zero conversions on the platform, 147 in the CRM: what a broken account actually looks like",
    slug: "zero-conversions-147-leads",
    excerpt:
      "The most expensive failure in paid media is invisible from the dashboard. Spend looks normal, impressions look normal, and Smart Bidding is optimising against nothing.",
    author: "Team Zeppstr",
    category: "conversion-experience",
    publishedAt: "2026-06-17T09:00:00Z",
    markdownFile: "zero-conversions-147-leads.md",
    relatedSolutionId: "solution-experience-engineering",
    seoTitle: "Broken Conversion Tracking: The Invisible Ad Spend Leak",
    seoDescription:
      "Zero platform conversions against 147 in the CRM. Why adding budget before fixing tracking compounds the waste — and the repair sequence that worked.",
  },
  {
    _id: "article-win-four-searches",
    title: "Win four searches completely, or a hundred partially. Not both.",
    slug: "win-four-searches-completely",
    excerpt:
      "For high-value, low-volume query sets, position four isn't 40% of position one — it's close to nothing. Why owning a handful of terms beats ranking broadly.",
    author: "Team Zeppstr",
    category: "seo-search",
    publishedAt: "2026-08-01T09:00:00Z",
    markdownFile: "win-four-searches-completely.md",
    relatedSolutionId: "solution-organic-growth",
    seoTitle: "Own Four Searches, Not a Hundred | Zeppstr",
    seoDescription:
      "When a single conversion is worth more than a thousand visitors, traffic growth is the wrong target. Three tests to know if this applies to you.",
  },
];

const META: SeedArticle[] = [
  {
    _id: "article-technical-seo-website-performance",
    title: "Master Technical SEO for Peak Website Performance",
    slug: "technical-seo-website-performance",
    excerpt:
      "Unlock your site's potential with our expert guide on unravelling technical SEO: enhancing your website's performance for better rankings.",
    author: "Team Zeppstr",
    category: "seo-search",
    publishedAt: "2024-03-02T10:30:05Z",
    markdownFile: "technical-seo-website-performance.md",
    seoTitle: "Master Technical SEO for Peak Website Performance",
    seoDescription:
      "A practical guide to technical SEO — site speed, structured data, mobile optimisation, site structure and the measurement that tells you it worked.",
  },
  {
    _id: "article-on-page-seo-checklist",
    title: "On-Page SEO Checklist for Optimal Site Performance",
    slug: "on-page-seo-checklist",
    excerpt:
      "Discover the on-page SEO checklist: essential practices for website optimisation, from keyword research through title tags, content and image alt text.",
    author: "Team Zeppstr",
    category: "seo-search",
    publishedAt: "2024-03-02T10:24:07Z",
    markdownFile: "on-page-seo-checklist.md",
    seoTitle: "On-Page SEO Checklist for Optimal Site Performance",
    seoDescription:
      "A step-by-step on-page SEO checklist covering keyword research, title tags, meta descriptions, headings, URL structure, loading speed and mobile responsiveness.",
  },
  {
    _id: "article-off-page-seo-authority",
    title: "Unlock Off-Page SEO: Gain Online Authority",
    slug: "off-page-seo-authority",
    excerpt:
      "Elevate your site's credibility with this guide to off-page SEO — link building, social signals, brand mentions and reputation management.",
    author: "Team Zeppstr",
    category: "seo-search",
    publishedAt: "2024-03-02T10:25:43Z",
    markdownFile: "off-page-seo-authority.md",
    seoTitle: "Unlock Off-Page SEO: Gain Online Authority",
    seoDescription:
      "How off-page SEO builds authority: link building, social signals, brand mentions, guest blogging, reputation management and influencer work.",
  },
  {
    _id: "article-local-seo-services",
    title: "Local SEO Services Explained: Boost Your Visibility",
    slug: "local-seo-services",
    excerpt:
      "Elevate your business's online presence with local SEO. Strategies to outshine competitors and attract customers searching in your area.",
    author: "Team Zeppstr",
    category: "seo-search",
    publishedAt: "2024-03-02T09:48:59Z",
    markdownFile: "local-seo-services.md",
    seoTitle: "Local SEO Services Explained: Boost Your Visibility",
    seoDescription:
      "What local SEO services do, the benefits they deliver, and the optimisation techniques — citations, Google Business Profile, local keywords — behind them.",
  },
  {
    _id: "article-ecommerce-seo-tactics",
    title: "E-commerce SEO Tactics: Enhance Your Sales Online",
    slug: "ecommerce-seo-tactics",
    excerpt:
      "Unlock the potential of your online store with key SEO strategies for e-commerce websites, designed to boost sales and drive traffic.",
    author: "Team Zeppstr",
    category: "seo-search",
    publishedAt: "2024-03-02T11:07:13Z",
    markdownFile: "ecommerce-seo-tactics.md",
    seoTitle: "E-commerce SEO Tactics: Enhance Your Sales Online",
    seoDescription:
      "E-commerce SEO from keyword research to product descriptions, site structure, user-generated content, backlinks and mobile checkout optimisation.",
  },
  {
    _id: "article-video-seo",
    title: "Video SEO: Elevate Your Visual Content Ranking",
    slug: "video-seo",
    excerpt:
      "Unlock the secrets of video SEO — optimising your content for visual platforms to boost search visibility and audience engagement.",
    author: "Team Zeppstr",
    category: "seo-search",
    publishedAt: "2024-03-02T10:05:44Z",
    markdownFile: "video-seo.md",
    seoTitle: "Video SEO: Elevate Your Visual Content Ranking",
    seoDescription:
      "How video SEO works: keyword selection, metadata, thumbnails and descriptions, transcriptions and closed captions, production quality and promotion.",
  },
  {
    _id: "article-seo-audit-guide",
    title: "SEO Audit Guide: Conducting an Effective Step-by-Step",
    slug: "seo-audit-guide",
    excerpt:
      "A step-by-step guide to auditing a website — on-page, off-page, technical, structure, content and analytics — and acting on what you find.",
    author: "Team Zeppstr",
    category: "growth-strategy",
    publishedAt: "2024-03-02T10:15:17Z",
    markdownFile: "seo-audit-guide.md",
    seoTitle: "SEO Audit Guide: An Effective Step-by-Step Process",
    seoDescription:
      "How to run a full SEO audit: preparation and goal-setting, on-page and off-page factors, technical checks, content evaluation and ongoing monitoring.",
  },
  {
    _id: "article-black-hat-seo-risks",
    title: "Black Hat SEO: Risks and Consequences Explained",
    slug: "black-hat-seo-risks",
    excerpt:
      "What black hat SEO entails and the fallout of employing such tactics — penalties, lost credibility and lasting damage to a site's visibility.",
    author: "Team Zeppstr",
    category: "seo-search",
    publishedAt: "2024-03-02T10:59:43Z",
    markdownFile: "black-hat-seo-risks.md",
    seoTitle: "Black Hat SEO: Risks and Consequences Explained",
    seoDescription:
      "Keyword stuffing, cloaking, link schemes and hidden text — what they cost you in penalties and trust, and the white hat alternative that holds up.",
  },
  {
    _id: "article-free-seo-tools",
    title: "Top Free SEO Tools Every Marketer Should Use",
    slug: "free-seo-tools",
    excerpt:
      "Elevate your marketing with the free SEO tools every marketer should be using — audit, keyword research, backlinks, content analysis and rank tracking.",
    author: "Team Zeppstr",
    category: "seo-search",
    publishedAt: "2024-03-02T10:34:16Z",
    markdownFile: "free-seo-tools.md",
    seoTitle: "Top Free SEO Tools Every Marketer Should Use",
    seoDescription:
      "A run-through of free SEO tooling: site audits, on-page checks, keyword research, backlink analysis, content scoring, rank tracking and competitor research.",
  },
  {
    _id: "article-seo-tools-web-presence",
    title: "SEO Tools Role in Boosting Your Web Presence",
    slug: "seo-tools-web-presence",
    excerpt:
      "How SEO tools amplify online visibility — keyword research, backlink analysis, analytics, audits, on-page optimisation and mobile performance.",
    author: "Team Zeppstr",
    category: "seo-search",
    publishedAt: "2024-03-02T09:42:18Z",
    markdownFile: "seo-tools-web-presence.md",
    seoTitle: "SEO Tools Role in Boosting Your Web Presence",
    seoDescription:
      "Where SEO software actually earns its keep: keyword and backlink research, site audits, on-page optimisation, content workflow and performance tracking.",
  },
  {
    _id: "article-seo-site-checkup",
    title: "Optimize with SEO Site Checkup: Boost Web Health",
    slug: "seo-site-checkup",
    excerpt:
      "Assessing and improving your website's health — a nine-point checkup covering structure, on-page, technical, content, backlinks and analytics.",
    author: "Team Zeppstr",
    category: "seo-search",
    publishedAt: "2024-03-02T10:41:10Z",
    markdownFile: "seo-site-checkup.md",
    seoTitle: "SEO Site Checkup: Assess and Improve Web Health",
    seoDescription:
      "A structured website health audit: what to check, in what order, and how to prioritise the fixes that actually move visibility and rankings.",
  },
  {
    _id: "article-seo-and-sem",
    title: "Unveiling the Connection Between SEO and SEM",
    slug: "seo-and-sem",
    excerpt:
      "The synergy of SEO and SEM, and how their strategic integration can elevate online visibility — organic foundations plus paid immediacy.",
    author: "Team Zeppstr",
    category: "growth-strategy",
    publishedAt: "2024-03-02T09:55:53Z",
    markdownFile: "seo-and-sem.md",
    seoTitle: "The Connection Between SEO and SEM",
    seoDescription:
      "SEO and SEM are not a choice. How organic and paid search feed each other's keyword data, and how to integrate and measure them as one programme.",
  },
  {
    _id: "article-organic-vs-paid-seo",
    title: "Organic vs Paid SEO Services: Which Wins",
    slug: "organic-vs-paid-seo",
    excerpt:
      "Comparing organic and paid search optimisation — cost, speed, control and durability — and when a blended approach beats picking a side.",
    author: "Team Zeppstr",
    category: "growth-strategy",
    publishedAt: "2024-03-02T09:25:05Z",
    markdownFile: "organic-vs-paid-seo.md",
    seoTitle: "Organic vs Paid SEO Services: Which Wins?",
    seoDescription:
      "Organic compounds but takes time; paid buys visibility that stops when spend stops. The trade-offs, and how to run both without wasting either.",
  },
  {
    _id: "article-seo-marketing-guide",
    title: "Ultimate SEO Marketing Guide Mastery",
    slug: "seo-marketing-guide",
    excerpt:
      "A full-stack SEO marketing guide — techniques, algorithms, on-page and off-page, local, mobile, analytics, voice and video.",
    author: "Team Zeppstr",
    category: "seo-search",
    publishedAt: "2024-03-02T09:10:26Z",
    markdownFile: "seo-marketing-guide.md",
    seoTitle: "The Ultimate SEO Marketing Guide",
    seoDescription:
      "Everything under one roof: keyword research, technical foundations, link building, local and mobile optimisation, analytics, voice and video SEO.",
  },
  {
    _id: "article-google-seo-best-practices",
    title: "Decoding Google SEO: Best Practices Unveiled",
    slug: "google-seo-best-practices",
    excerpt:
      "How Google's ranking systems actually weigh a page — and the on-page, off-page and content practices that follow from that.",
    author: "Team Zeppstr",
    category: "seo-search",
    publishedAt: "2024-03-02T09:21:08Z",
    markdownFile: "google-seo-best-practices.md",
    seoTitle: "Decoding Google SEO: Best Practices Unveiled",
    seoDescription:
      "Search algorithms, keyword research, meta tags, on-page and off-page technique, and keeping a strategy current as ranking systems change.",
  },
  {
    _id: "article-seo-beginners-guide",
    title: "Demystifying SEO: A Beginner's Guide for Clarity",
    slug: "seo-beginners-guide",
    excerpt:
      "Start here. How search engines crawl, index and rank — then the on-page, off-page and technical work that follows, in plain terms.",
    author: "Team Zeppstr",
    category: "seo-search",
    publishedAt: "2024-03-02T09:38:42Z",
    markdownFile: "seo-beginners-guide.md",
    seoTitle: "Demystifying SEO: A Beginner's Guide",
    seoDescription:
      "SEO from zero: how search engines work, what ranking factors mean, and the on-page, off-page and technical basics worth doing first.",
  },
  {
    _id: "article-seo-business-importance",
    title: "SEO Importance for Business Success Explained",
    slug: "seo-business-importance",
    excerpt:
      "Why search optimisation matters commercially — visibility, traffic, brand credibility and lead flow — and the work that actually moves each.",
    author: "Team Zeppstr",
    category: "growth-strategy",
    publishedAt: "2024-03-02T09:16:29Z",
    markdownFile: "seo-business-importance.md",
    seoTitle: "Why SEO Matters for Business Success",
    seoDescription:
      "The commercial case for SEO: online visibility, organic traffic, brand credibility and lead generation — plus the strategies behind each.",
  },
  {
    _id: "article-small-business-seo",
    title: "Small Business SEO: A Comprehensive Guide to Success",
    slug: "small-business-seo",
    excerpt:
      "SEO scaled to a small business — goals, competitor analysis, local search, site fundamentals, measurement and the advanced work that follows.",
    author: "Team Zeppstr",
    category: "seo-search",
    publishedAt: "2024-03-02T09:46:09Z",
    markdownFile: "small-business-seo.md",
    seoTitle: "Small Business SEO: A Comprehensive Guide",
    seoDescription:
      "Practical SEO for smaller teams: strategy, site optimisation, local search, Google Business Profile, measurement and content marketing.",
  },
  {
    _id: "article-advanced-seo-techniques",
    title: "Advanced SEO Techniques: Dive Deeper for Success",
    slug: "advanced-seo-techniques",
    excerpt:
      "Past the fundamentals — on-page and off-page depth, technical SEO, content, mobile, algorithm updates and performance tracking.",
    author: "Team Zeppstr",
    category: "seo-search",
    publishedAt: "2024-03-02T09:59:20Z",
    markdownFile: "advanced-seo-techniques.md",
    seoTitle: "Advanced SEO Techniques: Dive Deeper",
    seoDescription:
      "Advanced search optimisation: technical foundations, link building, content depth, mobile, algorithm adaptation and measuring what changed.",
  },
  {
    _id: "article-seo-copywriting",
    title: "Unlock Digital Success with SEO Copywriting",
    slug: "seo-copywriting",
    excerpt:
      "Writing that ranks and converts — keyword research, on-page elements, backlinks, mobile formatting, and how to measure the return.",
    author: "Team Zeppstr",
    category: "conversion-experience",
    publishedAt: "2024-03-02T10:11:07Z",
    markdownFile: "seo-copywriting.md",
    seoTitle: "Unlock Digital Success with SEO Copywriting",
    seoDescription:
      "SEO copywriting end to end: keyword research, compelling content, on-page optimisation, backlinks, mobile formatting and measuring ROI.",
  },
  {
    _id: "article-wordpress-seo",
    title: "Mastering WordPress for Search Engine Optimization",
    slug: "wordpress-seo",
    excerpt:
      "Themes, plugins, permalinks, speed and schema — the WordPress-specific decisions that decide whether a site is easy or impossible to rank.",
    author: "Team Zeppstr",
    category: "seo-search",
    publishedAt: "2024-03-02T09:32:57Z",
    markdownFile: "wordpress-seo.md",
    seoTitle: "Mastering WordPress for SEO",
    seoDescription:
      "Elevate your website's visibility by mastering WordPress for Search Engine Optimization with essential tips and strategies for top-tier results.",
  },
  {
    _id: "article-choosing-an-seo-agency",
    title: "Choosing the Right SEO Agency: A Comprehensive Checklist",
    slug: "choosing-an-seo-agency",
    excerpt:
      "What to interrogate before you sign: track record, reporting cadence, pricing model, communication, and the red flags that predict a bad engagement.",
    author: "Team Zeppstr",
    category: "growth-strategy",
    publishedAt: "2024-03-02T10:56:56Z",
    markdownFile: "choosing-an-seo-agency.md",
    seoTitle: "Choosing the Right SEO Agency: A Checklist",
    seoDescription:
      "Ensure success in search rankings with our guide on Choosing the Right SEO Agency: A Comprehensive Checklist to find your perfect match.",
  },
  {
    _id: "article-guaranteed-seo-myth",
    title: "Guaranteed SEO: Myth or Reality?",
    slug: "guaranteed-seo-myth",
    excerpt:
      "What agencies actually mean when they promise guaranteed rankings, what can legitimately be committed to, and how to read the contract.",
    author: "Team Zeppstr",
    category: "growth-strategy",
    publishedAt: "2024-03-02T10:02:59Z",
    markdownFile: "guaranteed-seo-myth.md",
    seoTitle: "Guaranteed SEO: Myth or Reality?",
    seoDescription:
      "Explore the truth behind Guaranteed SEO: Myth or Reality? Delve into the world of SEO guarantees and what they truly offer.",
  },
  {
    _id: "article-seo-career-guide",
    title: "SEO Career Guide: Becoming an SEO Specialist",
    slug: "seo-career-guide",
    excerpt:
      "The path from assistant to director: the skills that matter at each level, which certifications carry weight, and how to build a portfolio.",
    author: "Team Zeppstr",
    category: "industry-insights",
    publishedAt: "2024-03-02T09:52:51Z",
    markdownFile: "seo-career-guide.md",
    seoTitle: "SEO Career Guide: Becoming an SEO Specialist",
    seoDescription:
      "Embark on a rewarding SEO journey with our career guide, leading you through the essentials of becoming a Search Engine Optimization Specialist.",
  },
  {
    _id: "article-seo-full-form",
    title: "SEO Full Form & Digital Marketing Evolution",
    slug: "seo-full-form",
    excerpt:
      "What SEO actually stands for, how the discipline evolved from keyword stuffing to user-centric ranking, and where it sits inside digital marketing today.",
    author: "Team Zeppstr",
    category: "industry-insights",
    publishedAt: "2024-03-02T10:19:25Z",
    markdownFile: "seo-full-form.md",
    seoTitle: "SEO Full Form & Digital Marketing Evolution",
    seoDescription:
      "Uncover the SEO Full Form and Its Evolution in Digital Marketing to enhance your online visibility and stay ahead in the digital space.",
  },
  {
    _id: "article-seo-tips-playbook",
    title: "SEO Tips That Still Work: A Practical Optimization Playbook",
    slug: "seo-tips-playbook",
    excerpt:
      "The optimisation moves that hold up year after year — local, mobile, voice, content and social — and how to read algorithm updates without rebuilding your strategy every quarter.",
    author: "Team Zeppstr",
    category: "seo-search",
    publishedAt: "2024-03-02T09:28:58Z",
    markdownFile: "seo-tips-playbook.md",
    seoTitle: "SEO Tips That Still Work: A Playbook",
    seoDescription:
      "A practical, evergreen playbook of search engine optimisation techniques — local, mobile, voice, content and social — that keep working as algorithms change.",
  },

  // ── EMAIL & LIFECYCLE ─────────────────────────────────────────────────────
  // Imported Sep 2026 from Drive folder 15uW1O8mrcOZVj8YCZOo0keqZCWGbqTVV.
  // Dated to their true createdTime — these were written March 2024 and predate
  // Apple Mail Privacy Protection's effect on open-rate reporting becoming
  // common knowledge. Where the source asserted an open-rate benchmark as
  // current fact, it has been reframed rather than reproduced.
  {
    _id: "article-email-marketing-strategy",
    title: "Master Email Marketing: Strategy & Best Practices",
    slug: "email-marketing-strategy",
    excerpt:
      "What an email strategy actually contains — goals, segments, cadence and measurement — and why the segment definition matters more than the copy.",
    author: "Team Zeppstr",
    category: "email-lifecycle",
    publishedAt: "2024-03-03T17:55:31Z",
    markdownFile: "email-marketing-strategy.md",
    seoTitle: "Email Marketing Strategy & Best Practices",
    seoDescription:
      "A practical guide to building an email marketing strategy — goals, audience segmentation, cadence, automation and the metrics that survived Apple's privacy changes.",
  },
  {
    _id: "article-start-email-marketing",
    title: "Start Email Marketing: A Beginner's Step-by-Step Guide",
    slug: "start-email-marketing",
    excerpt:
      "Email is the only channel you own outright. How to set one up properly from scratch — platform, list, first campaign, and the automation to build before anything else.",
    author: "Team Zeppstr",
    category: "email-lifecycle",
    publishedAt: "2024-03-03T17:53:34Z",
    markdownFile: "start-email-marketing.md",
    seoTitle: "How to Start Email Marketing: Step-by-Step",
    seoDescription:
      "A beginner's guide to email marketing — choosing a platform, building an opt-in list, designing campaigns, automating sequences and measuring what actually matters.",
  },
  {
    _id: "article-email-authentication",
    title: "Email Marketing Authentication: SPF, DKIM and DMARC Explained",
    slug: "email-authentication",
    excerpt:
      "The cheapest deliverability work available, and since February 2024 a condition of delivery to Gmail and Yahoo. What each protocol does, and the sequence to deploy them in without blocking your own mail.",
    author: "Team Zeppstr",
    category: "email-lifecycle",
    publishedAt: "2024-03-03T18:12:56Z",
    markdownFile: "email-authentication.md",
    seoTitle: "SPF, DKIM & DMARC: Email Authentication Guide",
    seoDescription:
      "How SPF, DKIM and DMARC protect your domain and your inbox placement — what each does, the order to deploy them, and the mistakes that block your own email.",
  },
  {
    _id: "article-ab-testing-email",
    title: "A/B Testing in Email Marketing: What Actually Counts as a Result",
    slug: "ab-testing-email",
    excerpt:
      "Most email tests produce a number, not knowledge. Sample size, metric choice and the discipline of accepting null results — the parts that decide whether a test was worth running.",
    author: "Team Zeppstr",
    category: "email-lifecycle",
    publishedAt: "2024-03-03T17:59:07Z",
    markdownFile: "ab-testing-email.md",
    seoTitle: "A/B Testing Email Campaigns: A Practical Guide",
    seoDescription:
      "How to run email A/B tests that mean something — choosing the metric, sizing the sample, testing one variable, and why open rate no longer works as a test measure.",
  },

  // ── PERFORMANCE & PAID ────────────────────────────────────────────────────
  // Imported Sep 2026 from Drive folder 1AgSzF5TBKGBGG7hTsk0MOkgs0o-Q08Mp.
  // Source drafts referenced "Google AdWords" and "Bing Ads" (renamed 2018/2019)
  // and predate the account-structure consequences of App Tracking Transparency.
  // Corrected on import; fabricated case-study figures removed throughout.
  {
    _id: "article-understanding-ppc",
    title: "Understanding PPC: A Step-by-Step Explanation",
    slug: "understanding-ppc",
    excerpt:
      "The most measurable channel available, and the easiest one to run badly with confidence. How the auction actually works, why Quality Score is a discount on your costs, and the four things that decide whether an account performs.",
    author: "Team Zeppstr",
    category: "performance-paid",
    publishedAt: "2024-03-03T17:27:30Z",
    markdownFile: "understanding-ppc.md",
    relatedSolutionId: "solution-performance-media",
    seoTitle: "Understanding PPC: How Pay Per Click Works",
    seoDescription:
      "A step-by-step explanation of pay-per-click advertising — the ad auction, Quality Score, campaign structure, bidding strategies and the metrics that matter.",
  },
  {
    _id: "article-real-estate-ppc",
    title: "Real Estate PPC: A Practical Best-Practice Guide",
    slug: "real-estate-ppc",
    excerpt:
      "Optimising to cost per lead is what breaks most property accounts — it systematically defunds the traffic that produces bookings. Intent tiers, negative keyword discipline, and closing the CRM loop.",
    author: "Team Zeppstr",
    category: "performance-paid",
    publishedAt: "2024-03-03T17:29:27Z",
    markdownFile: "real-estate-ppc.md",
    relatedSolutionId: "solution-performance-media",
    seoTitle: "Real Estate PPC Best Practices Guide",
    seoDescription:
      "How to run paid search for property — structuring by intent, excluding rental traffic, importing qualified-lead data, and why new launches need demand generation first.",
  },
  {
    _id: "article-seo-vs-ppc",
    title: "SEO vs. PPC: How to Actually Decide",
    slug: "seo-vs-ppc",
    excerpt:
      "The choice is determined by your margin, your time horizon and whether search demand exists yet — not by preference. And if nobody is searching for your category, neither channel will save you.",
    author: "Team Zeppstr",
    category: "performance-paid",
    publishedAt: "2024-03-03T17:16:16Z",
    markdownFile: "seo-vs-ppc.md",
    relatedSolutionId: "solution-growth-strategy-advisory",
    seoTitle: "SEO vs PPC: Which Should You Invest In?",
    seoDescription:
      "A practical framework for choosing between SEO and pay-per-click — unit economics, time horizon, competitive position, and why running both makes each cheaper.",
  },
  {
    _id: "article-facebook-ppc",
    title: "Facebook PPC: Effective Strategies for Meta Advertising",
    slug: "facebook-ppc",
    excerpt:
      "App Tracking Transparency changed how Meta ads work, and most published advice still describes the old model. Why the Conversions API comes before everything else, and why creative now outranks targeting.",
    author: "Team Zeppstr",
    category: "performance-paid",
    publishedAt: "2024-03-03T17:37:09Z",
    markdownFile: "facebook-ppc.md",
    relatedSolutionId: "solution-performance-media",
    seoTitle: "Facebook & Meta Ads: A Practical Strategy Guide",
    seoDescription:
      "How Meta advertising works after App Tracking Transparency — the Conversions API, ad set consolidation, creative as the main lever, and reading attribution honestly.",
  },

  // ── SOCIAL & CONTENT ──────────────────────────────────────────────────────
  // Imported Sep 2026 from Drive folders 1Ay3m5G_wGdDx1IA1uo4Zj-g9VfVWVrxJ
  // (social) and 16JJGts7cBePv6xcqI_aJwXla6hMwfah1 (content marketing).
  //
  // These source drafts carried the heaviest fabrication load of the archive:
  // invented named quotes ("Mark Thompson, Social Media Specialist"), invented
  // case studies with specific percentages, one unfilled "[Name], Influencer
  // Marketing Expert" template placeholder, and three influencer platforms that
  // do not exist under the names given. All removed on import. Stale platform
  // user-count tables and references to CrowdTangle (retired 2024) corrected.
  {
    _id: "article-social-media-marketing-101",
    title: "Social Media Marketing 101: A Comprehensive Guide",
    slug: "social-media-marketing-101",
    excerpt:
      "Organic reach on brand pages has collapsed, and most guidance still pretends otherwise. What the channel is actually good for now, and how to resource it honestly.",
    author: "Team Zeppstr",
    category: "social-content",
    publishedAt: "2024-03-02T13:03:22Z",
    markdownFile: "social-media-marketing-101.md",
    seoTitle: "Social Media Marketing 101: A Practical Guide",
    seoDescription:
      "A working guide to social media marketing — platform selection, video-first content, paid distribution, and measuring against business outcomes rather than followers.",
  },
  {
    _id: "article-social-media-marketing-plan",
    title: "Building a Social Media Marketing Plan That Survives Contact With Reality",
    slug: "social-media-marketing-plan",
    excerpt:
      "Most plans fail for a reason nobody writes about: they aren't staffed for the cadence they promise. How to size a calendar to the resource you actually have.",
    author: "Team Zeppstr",
    category: "social-content",
    publishedAt: "2024-03-02T13:31:56Z",
    markdownFile: "social-media-marketing-plan.md",
    seoTitle: "How to Build a Social Media Marketing Plan",
    seoDescription:
      "A practical social media planning framework — goals tied to revenue, platform selection, recurring content formats, realistic cadence and honest measurement.",
  },
  {
    _id: "article-influencer-marketing-strategy",
    title: "Influencer Marketing: Strategy, Selection and the Parts Nobody Discusses",
    slug: "influencer-marketing-strategy",
    excerpt:
      "The channel works. It also has a fraud problem, a measurement problem and a compliance problem. How to vet an audience, and what ASCI and the CCPA require of you.",
    author: "Team Zeppstr",
    category: "social-content",
    publishedAt: "2024-03-02T13:40:39Z",
    markdownFile: "influencer-marketing-strategy.md",
    seoTitle: "Influencer Marketing Strategy & Creator Selection",
    seoDescription:
      "How to choose creators, spot purchased followers, structure contracts including usage rights, meet Indian disclosure requirements, and measure results honestly.",
  },
  {
    _id: "article-social-media-tools",
    title: "Essential Tools for Social Media Marketing",
    slug: "social-media-tools",
    excerpt:
      "Tool selection is the least important decision in social media marketing and the one teams spend most time on. What's worth having, and what you can skip.",
    author: "Team Zeppstr",
    category: "social-content",
    publishedAt: "2024-03-02T13:35:20Z",
    markdownFile: "social-media-tools.md",
    seoTitle: "Social Media Marketing Tools: What You Actually Need",
    seoDescription:
      "Scheduling, analytics, listening and reporting tools for social media — what earns its cost at which scale, and what to automate versus never automate.",
  },
  {
    _id: "article-understanding-content-marketing",
    title: "Understanding Content Marketing: A Practical Guide",
    slug: "understanding-content-marketing",
    excerpt:
      "Doing content marketing adequately is now equivalent to not doing it at all. What still works when every competitor publishes and AI answers the easy questions.",
    author: "Team Zeppstr",
    category: "social-content",
    publishedAt: "2024-03-02T12:00:09Z",
    markdownFile: "understanding-content-marketing.md",
    relatedSolutionId: "solution-organic-growth",
    seoTitle: "What Is Content Marketing? A Practical Guide",
    seoDescription:
      "Content marketing explained — why the bar has risen, what differentiates now, how to plan distribution, and how to measure a channel that compounds slowly.",
  },
  {
    _id: "article-b2b-content-marketing",
    title: "B2B Content Marketing: Strategies That Account for How Buying Actually Works",
    slug: "b2b-content-marketing",
    excerpt:
      "Most B2B content is written for one person. Most B2B purchases are made by a committee of six to ten. That gap explains a great deal of the underperformance.",
    author: "Team Zeppstr",
    category: "social-content",
    publishedAt: "2024-03-02T12:52:31Z",
    markdownFile: "b2b-content-marketing.md",
    relatedSolutionId: "solution-growth-strategy-advisory",
    seoTitle: "B2B Content Marketing Strategy for Growth",
    seoDescription:
      "How to write for the buying committee, build the late-stage content your champion forwards internally, and measure a channel last-click attribution undercounts.",
  },
  {
    _id: "article-content-marketing-social-integration",
    title: "Integrating Content Marketing with Social Media",
    slug: "content-marketing-social-integration",
    excerpt:
      "Run apart, you get a blog nobody reads and a feed with nothing to say. Produce once, atomise into channel-native pieces, and stop posting links that platforms suppress.",
    author: "Team Zeppstr",
    category: "social-content",
    publishedAt: "2024-03-02T12:38:18Z",
    markdownFile: "content-marketing-social-integration.md",
    seoTitle: "Integrating Content Marketing and Social Media",
    seoDescription:
      "How to run content and social as one programme — atomising substantial work, publishing natively, and what social genuinely does and doesn't do for SEO.",
  },
  {
    _id: "article-user-generated-content",
    title: "Leveraging User-Generated Content — Including the Parts That Carry Risk",
    slug: "user-generated-content",
    excerpt:
      "UGC is more persuasive than anything you publish about yourself, and the most common place marketing teams accidentally commit copyright infringement.",
    author: "Team Zeppstr",
    category: "social-content",
    publishedAt: "2024-03-02T12:46:08Z",
    markdownFile: "user-generated-content.md",
    seoTitle: "User-Generated Content: Strategy, Rights and Risk",
    seoDescription:
      "How to generate and use UGC — securing permission for paid media, disclosing incentives under Indian rules, handling criticism, and proving it converts.",
  },

  // ── BATCH 2 ───────────────────────────────────────────────────────────────
  // Imported Sep 2026. Same fabrication pattern as batch 1 — see the editorial
  // warning in deliverables/content/insights/IMPORT-MANIFEST.md.
  //
  // Three sources in this batch were internally self-contradictory:
  // `email-open-rates-benchmarks` carried three different benchmark tables
  // giving different figures for the same industries; `best-time-to-send-email`
  // recommended evening in its tables and 10am-12pm in its FAQ; and the bounce
  // rate source claimed a 20% average while its own table rated anything above
  // 15% as "poor". All rebuilt from first principles.
  {
    _id: "article-email-bounce-rate",
    title: "Bounce Rate in Email Marketing: Causes and Fixes",
    slug: "email-bounce-rate",
    excerpt:
      "A bounce is a signal to the receiving server about your list quality, not just a lost email. Enough of them and your mail stops reaching valid addresses too.",
    author: "Team Zeppstr",
    category: "email-lifecycle",
    publishedAt: "2024-03-03T18:10:40Z",
    markdownFile: "email-bounce-rate.md",
    seoTitle: "Email Bounce Rate: Causes, Benchmarks and Fixes",
    seoDescription:
      "Hard versus soft bounces, what a healthy rate looks like, how to prevent bounces at acquisition, and how to rebuild sender reputation after a bad send.",
  },
  {
    _id: "article-email-open-rates-benchmarks",
    title: "Email Open Rates by Industry: Why the Benchmarks Stopped Working",
    slug: "email-open-rates-benchmarks",
    excerpt:
      "Published benchmarks disagree because the metric broke. Apple's Mail Privacy Protection inflates opens unpredictably, which makes cross-sender comparison meaningless.",
    author: "Team Zeppstr",
    category: "email-lifecycle",
    publishedAt: "2024-03-03T17:51:41Z",
    markdownFile: "email-open-rates-benchmarks.md",
    seoTitle: "Email Open Rate Benchmarks: Why They No Longer Work",
    seoDescription:
      "Why industry open rate benchmarks conflict, what Mail Privacy Protection did to the metric, and which numbers to manage to instead.",
  },
  {
    _id: "article-best-time-to-send-email",
    title: "The Best Time to Send Marketing Emails",
    slug: "best-time-to-send-email",
    excerpt:
      "Every published answer contradicts every other one. Send time is a real effect but a small one — and relevance moves results considerably more.",
    author: "Team Zeppstr",
    category: "email-lifecycle",
    publishedAt: "2024-03-03T18:03:02Z",
    markdownFile: "best-time-to-send-email.md",
    seoTitle: "Best Time to Send Marketing Emails: A Practical Answer",
    seoDescription:
      "Why send-time studies conflict, how to test against your own list using clicks, per-subscriber optimisation, and why frequency matters more than timing.",
  },
  {
    _id: "article-ecommerce-email-software",
    title: "Choosing E-commerce Email Marketing Software",
    slug: "ecommerce-email-software",
    excerpt:
      "Most operators choose a platform first and think about what to send afterwards. Build the four flows that carry the revenue, then pick the tool that supports them.",
    author: "Team Zeppstr",
    category: "email-lifecycle",
    publishedAt: "2024-03-03T18:08:52Z",
    markdownFile: "ecommerce-email-software.md",
    seoTitle: "E-commerce Email Marketing Software: How to Choose",
    seoDescription:
      "Klaviyo, Mailchimp, Brevo and others compared on what actually differentiates them — data integration depth, segmentation and deliverability, not templates.",
  },
  {
    _id: "article-ppc-rates-india",
    title: "PPC Advertising Rates in India: What Actually Determines Your Cost",
    slug: "ppc-rates-india",
    excerpt:
      "Published CPC tables hide variation of more than an order of magnitude. Work backwards from customer value to your own sustainable click cost instead.",
    author: "Team Zeppstr",
    category: "performance-paid",
    publishedAt: "2024-03-03T17:25:42Z",
    markdownFile: "ppc-rates-india.md",
    relatedSolutionId: "solution-performance-media",
    seoTitle: "PPC Advertising Rates in India: A Cost Guide",
    seoDescription:
      "What sets pay-per-click costs in India — competition, geography, intent, language and Quality Score — plus how to derive your own maximum sustainable CPC.",
  },
  {
    _id: "article-amazon-ppc",
    title: "Amazon PPC: A Working Strategy for Sellers",
    slug: "amazon-ppc",
    excerpt:
      "Ad-driven sales lift organic rank, which reduces future ad dependence. That loop is why TACoS is the right management metric and ACoS is not.",
    author: "Team Zeppstr",
    category: "performance-paid",
    publishedAt: "2024-03-03T17:40:57Z",
    markdownFile: "amazon-ppc.md",
    relatedSolutionId: "solution-performance-media",
    seoTitle: "Amazon PPC Strategy for Sellers: ACoS, TACoS & Structure",
    seoDescription:
      "How Amazon advertising actually works — the auto-to-manual harvesting workflow, campaign structure, and why TACoS beats ACoS as a management metric.",
  },
  {
    _id: "article-choosing-a-ppc-agency",
    title: "How to Choose a PPC Agency",
    slug: "choosing-a-ppc-agency",
    excerpt:
      "Written by an agency, and intended to be used on us. Own your ad account, avoid percentage-of-spend fees, and ask what they would stop doing.",
    author: "Team Zeppstr",
    category: "performance-paid",
    publishedAt: "2024-03-03T17:39:02Z",
    markdownFile: "choosing-a-ppc-agency.md",
    relatedSolutionId: "solution-performance-media",
    seoTitle: "How to Choose a PPC Agency: A Buyer's Guide",
    seoDescription:
      "The questions that separate competent PPC agencies from expensive ones — account ownership, fee structures, reference checks and the warning signs.",
  },
];

/** Reads each article's markdown and converts the body to Portable Text. */
export function loadArticles(repoRoot: string) {
  return META.map((m) => {
    const path = join(repoRoot, CONTENT_ROOT, m.markdownFile);
    const raw = readFileSync(path, "utf-8");
    // Drop the H1 — the title lives in the `title` field, not the body.
    const body = raw.replace(/^#\s+.*\n/, "").trim();
    return { ...m, body: toPortableText(body) };
  });
}

export type LoadedArticle = ReturnType<typeof loadArticles>[number];
