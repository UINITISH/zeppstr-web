# Drive → Insights import manifest

> **UPDATE — 5 Sep 2026.** The SEO folder was one of five. Four more article
> folders were found in Drive, holding 54 further finished drafts. Sixteen have
> been imported (four per category, at the founder's instruction). Details and
> the remaining backlog are in **§ Non-SEO folders** at the foot of this file.
>
> **Read the editorial warning in that section before importing any more.**

26 finished articles live in Google Drive folder `1wIQ2L0hN67wQCUPGx3pT-aUPn7kbx4Vf`
(owner vikas@zeppstr.com). They are full drafts, 12–24KB each, with H2/H3
structure, tables, key-takeaway blocks and FAQ sections. Verified by reading
"Master Technical SEO for Peak Website Performance" end to end.

## The pipeline is already built

Nothing more needs writing. For each article:

1. `read_file_content(fileId)` via the Google Drive connector.
2. Save the body to `deliverables/content/insights/<slug>.md`.
   Strip the leading duplicate title line and the meta-description line above
   the first `#` heading — Drive docs carry both.
3. Add a `META` entry to `scripts/seed/data/articles.ts` using the slug,
   category and date below.
4. `npm run seed`.

`loadArticles()` already converts markdown → Portable Text and strips the H1.

## Batching

Read 3–4 documents per session. Each is ~5,000 words, so a full 26-document
import will exhaust a context window several times over. Work down the list and
tick off what is done.

## Dates — important

All were written March 2024 and never revised. Seed them with their true
`createdTime`, NOT today's date. They predate AI Overviews and LLM citation
behaviour entirely; presenting them as current thinking is the same credibility
problem as an unsourced revenue claim. Dated honestly they are a legitimate SEO
archive.

Keep the four 2026 pieces (creative-concentration, revenue-claims-that-fail-
arithmetic, zero-conversions-147-leads, win-four-searches-completely) as the
featured set. This archive sits underneath them.

## The 26

**Imported so far: 1–26 (all)** (files written, META entries added, seeded).

**Editorial changes after import:** #26 was retitled and de-dated (`2024-seo-tips` → `seo-tips-playbook`); its fabricated voice-search projection table and invented local-SEO percentage table were removed. The old Sanity document is cleared by `npm run seed:prune -- --apply`.

All map to category `seo-search` unless noted. Slug = suggested URL.

| # | Drive file ID | Title | Slug | Category |
|---|---|---|---|---|
| 1 ✅ | 1sEguI05Si_Qhp9kkgfmkSTN7Cf0f2xb_8uF1WEgrfaI | Master Technical SEO for Peak Website Performance | technical-seo-website-performance | seo-search |
| 2 ✅ | 1S-u4Rc5wUUqetXYn5KnEyQyk7qoY6MkJMLP-QxDXsgg | On-Page SEO Checklist for Optimal Site Performance | on-page-seo-checklist | seo-search |
| 3 ✅ | 1Zwcxru0jq6hnFWRWLP4wxLimmDKe2NQ6v6eRJNv--7M | Unlock Off-Page SEO: Gain Online Authority | off-page-seo-authority | seo-search |
| 4 ✅ | 16-UAE9Wqfr-v4Hhu54xmX4FaG431cz0WntNCXjVkiy0 | Local SEO Services Explained: Boost Your Visibility | local-seo-services | seo-search |
| 5 ✅ | 1SSFCfj_rTyBfB08ayTU5Te7UrK7Kszuecpb2A4gWBAQ | E-commerce SEO Tactics: Enhance Your Sales Online | ecommerce-seo-tactics | seo-search |
| 6 ✅ | 1gyjkpa0dAvhxt8e10yY2b0s269fOPwRkgIAwVORLVxc | Video SEO: Elevate Your Visual Content Ranking | video-seo | seo-search |
| 7 ✅ | 1dicY6ku02qdP22geD5emMUou696QH69eZrun0WHzYa8 | SEO Audit Guide: Conducting an Effective Step-by-Step | seo-audit-guide | growth-strategy |
| 8 ✅ | 1hV90zEUJheFaUaxUjX8CADecOw2qJ59Hw8_6D928dXE | Black Hat SEO: Risks and Consequences Explained | black-hat-seo-risks | seo-search |
| 9 ✅ | 1p_bagoYLrQZmQ5LIBbmUeg9dSdEwcCEqaZmkp2djtyY | Top Free SEO Tools Every Marketer Should Use | free-seo-tools | seo-search |
| 10 ✅ | 1RikbiQYISXKTlLG7IFHIB8nSMrtA4NMrMtSp-0kn2yY | SEO Tools Role in Boosting Your Web Presence | seo-tools-web-presence | seo-search |
| 11 ✅ | 18ShIBXIMeEaFaqbzXJG4agsVI3AQ5es4Q0OqtZqyvHs | Optimize with SEO Site Checkup: Boost Web Health | seo-site-checkup | seo-search |
| 12 ✅ | 1c30rKrM6qXP0zDfnwhX1moWDRfqbNSNa1XSugljIWcQ | Unveiling the Connection Between SEO and SEM | seo-and-sem | growth-strategy |
| 13 ✅ | 1kyZ_XKoVmXFgxabzB_hH7rrARZZNHa_8z_D1VwOyuAU | Organic vs Paid SEO Services: Which Wins | organic-vs-paid-seo | growth-strategy |
| 14 ✅ | 1IN1QcKbbLBcK5MBrrtSEfZZfgDk-QZxP27EwCTVKGPs | Ultimate SEO Marketing Guide Mastery | seo-marketing-guide | seo-search |
| 15 ✅ | 1N1ebQGef12-LhT8wzSk6Lqunuc6EoKrWnT4BCY17sps | Decoding Google SEO: Best Practices Unveiled | google-seo-best-practices | seo-search |
| 16 ✅ | 1MxcmVZ5b4PeQsPX_7MPn3cX3x7VbjHyJM7ExZVADMhI | Demystifying SEO: A Beginner's Guide for Clarity | seo-beginners-guide | seo-search |
| 17 ✅ | 1p65LGfjc7mI3C-30CLc2x_SxlTXhqBJbUpJZ0IIBffc | SEO Importance for Business Success Explained | seo-business-importance | growth-strategy |
| 18 ✅ | 1e8bNyC5yqXZmia6Bf4XFT5afaB4SYvd_FDVSfZdV738 | Small Business SEO: A Comprehensive Guide to Success | small-business-seo | seo-search |
| 19 ✅ | 1zP1nfLasjyLK-NCSgXzVQ4Iep0EEx2xR_TqZsKtBx90 | Advanced SEO Techniques: Dive Deeper for Success | advanced-seo-techniques | seo-search |
| 20 ✅ | 1uP7hKYr_wpW8KH43jMuuc1_Z00KDINXrVXEKCZTGcW0 | Unlock Digital Success with SEO Copywriting | seo-copywriting | conversion-experience |
| 21 ✅ | 19tHDVz_RdznzAltQ3Mt9i9KwA2CvkGB3T9iRUj77_Ig | Mastering WordPress for SEO Success Tips | wordpress-seo | seo-search |
| 22 ✅ | 1MI8caNxskdvNUwRldP-09VGopEj17DF_QIfn0fEBA6k | SEO Agency Selection: Your Comprehensive Checklist | choosing-an-seo-agency | growth-strategy |
| 23 ✅ | 1G3_K9hXu6-JsjiFbRhfn_iV155J1K2Z6Ek9NUjNs584 | Guaranteed SEO: Myth or Reality | guaranteed-seo-myth | growth-strategy |
| 24 ✅ | 1srac2TaV42zSV2cNdvlcSoqYitPsoX4q_m9h6NtDwVA | SEO Career Guide: Becoming an SEO Specialist | seo-career-guide | industry-insights |
| 25 ✅ | 1yiPDzjWif_nenidq8Aj4Hok_lDpvumSzI_k5jKEtmIw | SEO Full Form & Digital Marketing Evolution | seo-full-form | industry-insights |
| 26 ✅ | 1QB0WfQfTT3q8NXTdHtkAa5hXQzI2oUFV4zzwi5-qIto | 2024 SEO Tips → retitled evergreen: *SEO Tips That Still Work* | seo-tips-playbook | seo-search |

## Editorial note

These are competent but generic in voice — "Ultimate Guide", "Demystifying",
"Unveiling". They read differently from the Tru Aquapolis case study and the
2026 insight pieces. That is acceptable for an archive whose job is search
coverage; it is not the work to feature on the homepage.

## Also in Drive, not yet reviewed

- `1EJn_-zWvxJQnsqIQydRbWUUHolWGrb4Y` — TRU Aquapolis SEO strategy docs
  (Keywords & Research 213KB, Plan of Action, Execution Roadmap). Client
  deliverables, not blog posts, but likely useful source material.
- `1AJqkSyF6rsMx9GDykIfPZmlG4p8rU_ty` — "SEO Agency in Bangalore" (59KB) and a
  copy. Looks like landing-page copy rather than an article.
- `1AgSzF5TBKGBGG7hTsk0MOkgs0o-Q08Mp` — "Pay Per Click and SEO: Essential Insights".
- `1fktKiL-bg9t88N4o9Q4IdJ44pQj_8Lt9` — "Introduction to SEO".

Search wider before assuming 26 is the full set — that folder was found via a
`fullText contains 'SEO'` query, so articles on other topics will live elsewhere.

---

# Non-SEO folders

Four further article folders, same March 2024 batch, same house style. **54
articles total.**

| Folder ID | Category | Count | Imported | Site category |
| --- | --- | --- | --- | --- |
| `15uW1O8mrcOZVj8YCZOo0keqZCWGbqTVV` | Email Marketing | 15 | 4 | `email-lifecycle` |
| `1AgSzF5TBKGBGG7hTsk0MOkgs0o-Q08Mp` | Pay Per Click | 17 | 4 | `performance-paid` |
| `1Ay3m5G_wGdDx1IA1uo4Zj-g9VfVWVrxJ` | Social Media | 13 | 4 | `social-content` |
| `16JJGts7cBePv6xcqI_aJwXla6hMwfah1` | Content Marketing | 9 | 4 | `social-content` |

Two new categories were added to the Sanity schema, `lib/insights/article.ts`,
the `/insights` filter rail and `CategoryMotif` to hold these: **Email &
Lifecycle** and **Social & Content**.

## ⚠️ EDITORIAL WARNING — read before importing more

**Every one of the sixteen source documents contained fabricated material.**
This is systemic to the batch, not incidental. Found and removed on import:

- **Invented named sources.** "Mark Thompson, Social Media Specialist."
  "Sarah Johnson, CEO of ABC Corporation." "Stephanie Collins, digital
  marketing expert." "Sally Thompson, Marketing Manager at ABC Company."
  Real-sounding people, quoted as authorities, who do not exist.
- **Invented case studies with specific figures.** "Company XYZ" reporting a
  25% open-rate lift. "XYZ Fitness" reporting 500,000 reach and a 20% sign-up
  increase. "XYZ Clothing" reporting 40% traffic growth. All fabricated.
- **Invented data tables.** `email-authentication` carried a table claiming
  97% vs 82% delivery rates for authenticated vs unauthenticated mail, and a
  second "Case Study A / Case Study B" table. Both invented.
- **Invented products.** `social-media-tools` listed "Instagram Influencer
  Hub", "TikTok Influence Marketplace" and "YouTube Partnership Hub" with
  pricing. None exist.
- **Unfilled template placeholders.** `[Name], Influencer Marketing Expert`
  and three rows of `[Tool Name]` shipped in the drafts — direct evidence the
  batch was generated from a template and never edited.
- **Stale facts presented as current.** 2024 SaaS pricing to the cent;
  "Google AdWords" and "Bing Ads" (renamed 2018/2019); platform user counts;
  CrowdTangle (retired by Meta, 2024); Socialbakers (now Emplifi).

**Do not import any remaining article by copy-paste.** Each needs a read for
invented sources, invented figures and stale claims before publication.

This matters more for Zeppstr than for most publishers: the homepage argues
against unsourced agency claims. Publishing invented statistics under that
positioning is the specific credibility failure the site is built to avoid.

## Editorial changes made on import

Beyond removing the above, each piece was rewritten rather than reproduced.
Substantive corrections worth knowing about:

- **Open rate** — all email pieces now note Apple Mail Privacy Protection makes
  open rate unreliable, and recommend optimising to clicks and conversions.
- **Email authentication** — rewritten around the February 2024 Google/Yahoo
  bulk sender requirements, which the source omitted entirely despite being the
  single most important fact on the topic.
- **Meta advertising** — rewritten around App Tracking Transparency and the
  Conversions API, with ad set consolidation replacing the source's
  interest-stacking advice.
- **Real estate PPC** — localised from Zillow/Realtor.com/Trulia to
  MagicBricks/99acres/Housing.com and Property Finder/Bayut. Links to the
  Tru Aquapolis case study.
- **Influencer marketing and UGC** — added ASCI and CCPA disclosure
  requirements, and the copyright position on repurposing customer content for
  paid media. Neither source mentioned either.
- **A/B testing** — rebuilt around statistical significance and sample size,
  which the source ignored while recommending tests on small lists.

## Remaining backlog — 38 articles

**Email & Lifecycle (11 remaining)** — Email Marketing Essentials in Digital
Strategy · Email Marketing 101 · Bounce Rate in Email Marketing · Top
E-commerce Email Marketing Software · Video Marketing Best Practices in Email &
Social · Email Marketing CTR · Best Time to Send Marketing Emails · Decoding
Email Marketing's Key Metric · Best Email Marketing Tools in India · Email Open
Rates by Industry · Pros and Cons of Email Marketing

**Performance & Paid (13 remaining)** — Mastering Pay Per Click · Cracking the
Code: PPC Marketing Essentials · Best PPC Advertising Company · Advantages of
PPC for Business · Amazon Display Advertising PPC · Amazon PPC for Sellers ·
Beginner's Guide to PPC Earnings · Pay Per Click Also Known As · Pay Per Click
and SEO · PPC Advertising Rates in India · Demystifying PPC Campaigns · Making
Money Online with PPC · Exploring PPC's Impact on Digital Marketing

**Social & Content (14 remaining)** — Social Media Marketing Campaigns: Types ·
Pro Tips: Elevate Your Social Media Strategy · Best Social Media Marketing
Company · Social Media for Content Marketing Success · Pros and Cons of Social
Media Marketing · Digital Marketing vs Social Media Marketing · Unlock Business
Growth with Social Media · Social Media Marketing Step-by-Step · Leveraging
Social Media in Digital Marketing Plans · Demystifying Social Media Marketing ·
Unveiling Content Marketing's Role · Content Marketing Strategies for Affiliate
Success · Content Marketing as a Service · Content Marketing and SEO ·
Effective Content Marketing Strategies · Content Marketing's Impact on Digital
Strategy

Several of these overlap heavily with each other and with what is already
published. Recommend deduplicating before importing rather than publishing near
-identical pieces, which will compete with each other in search.

## Not yet reviewed

`1zPKB-wCwWG31-7-8tNLZbUU_mdA9MXmt` — a mixed folder of shorter pieces
(2–3KB): "Niche content marketing", "Social media marketing vs digital
marketing", "Best Content Marketing Tools", a LinkedIn post draft. Too short to
publish as articles; possibly useful as social content.
