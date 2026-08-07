# Drive → Insights import manifest

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

All map to category `seo-search` unless noted. Slug = suggested URL.

| # | Drive file ID | Title | Slug | Category |
|---|---|---|---|---|
| 1 | 1sEguI05Si_Qhp9kkgfmkSTN7Cf0f2xb_8uF1WEgrfaI | Master Technical SEO for Peak Website Performance | technical-seo-website-performance | seo-search |
| 2 | 1S-u4Rc5wUUqetXYn5KnEyQyk7qoY6MkJMLP-QxDXsgg | On-Page SEO Checklist for Optimal Site Performance | on-page-seo-checklist | seo-search |
| 3 | 1Zwcxru0jq6hnFWRWLP4wxLimmDKe2NQ6v6eRJNv--7M | Unlock Off-Page SEO: Gain Online Authority | off-page-seo-authority | seo-search |
| 4 | 16-UAE9Wqfr-v4Hhu54xmX4FaG431cz0WntNCXjVkiy0 | Local SEO Services Explained: Boost Your Visibility | local-seo-services | seo-search |
| 5 | 1SSFCfj_rTyBfB08ayTU5Te7UrK7Kszuecpb2A4gWBAQ | E-commerce SEO Tactics: Enhance Your Sales Online | ecommerce-seo-tactics | seo-search |
| 6 | 1gyjkpa0dAvhxt8e10yY2b0s269fOPwRkgIAwVORLVxc | Video SEO: Elevate Your Visual Content Ranking | video-seo | seo-search |
| 7 | 1dicY6ku02qdP22geD5emMUou696QH69eZrun0WHzYa8 | SEO Audit Guide: Conducting an Effective Step-by-Step | seo-audit-guide | growth-strategy |
| 8 | 1hV90zEUJheFaUaxUjX8CADecOw2qJ59Hw8_6D928dXE | Black Hat SEO: Risks and Consequences Explained | black-hat-seo-risks | seo-search |
| 9 | 1p_bagoYLrQZmQ5LIBbmUeg9dSdEwcCEqaZmkp2djtyY | Top Free SEO Tools Every Marketer Should Use | free-seo-tools | seo-search |
| 10 | 1RikbiQYISXKTlLG7IFHIB8nSMrtA4NMrMtSp-0kn2yY | SEO Tools Role in Boosting Your Web Presence | seo-tools-web-presence | seo-search |
| 11 | 18ShIBXIMeEaFaqbzXJG4agsVI3AQ5es4Q0OqtZqyvHs | Optimize with SEO Site Checkup: Boost Web Health | seo-site-checkup | seo-search |
| 12 | 1c30rKrM6qXP0zDfnwhX1moWDRfqbNSNa1XSugljIWcQ | Unveiling the Connection Between SEO and SEM | seo-and-sem | growth-strategy |
| 13 | 1kyZ_XKoVmXFgxabzB_hH7rrARZZNHa_8z_D1VwOyuAU | Organic vs Paid SEO Services: Which Wins | organic-vs-paid-seo | growth-strategy |
| 14 | 1IN1QcKbbLBcK5MBrrtSEfZZfgDk-QZxP27EwCTVKGPs | Ultimate SEO Marketing Guide Mastery | seo-marketing-guide | seo-search |
| 15 | 1N1ebQGef12-LhT8wzSk6Lqunuc6EoKrWnT4BCY17sps | Decoding Google SEO: Best Practices Unveiled | google-seo-best-practices | seo-search |
| 16 | 1MxcmVZ5b4PeQsPX_7MPn3cX3x7VbjHyJM7ExZVADMhI | Demystifying SEO: A Beginner's Guide for Clarity | seo-beginners-guide | seo-search |
| 17 | 1p65LGfjc7mI3C-30CLc2x_SxlTXhqBJbUpJZ0IIBffc | SEO Importance for Business Success Explained | seo-business-importance | growth-strategy |
| 18 | 1e8bNyC5yqXZmia6Bf4XFT5afaB4SYvd_FDVSfZdV738 | Small Business SEO: A Comprehensive Guide to Success | small-business-seo | seo-search |
| 19 | 1zP1nfLasjyLK-NCSgXzVQ4Iep0EEx2xR_TqZsKtBx90 | Advanced SEO Techniques: Dive Deeper for Success | advanced-seo-techniques | seo-search |
| 20 | 1uP7hKYr_wpW8KH43jMuuc1_Z00KDINXrVXEKCZTGcW0 | Unlock Digital Success with SEO Copywriting | seo-copywriting | conversion-experience |
| 21 | 19tHDVz_RdznzAltQ3Mt9i9KwA2CvkGB3T9iRUj77_Ig | Mastering WordPress for SEO Success Tips | wordpress-seo | seo-search |
| 22 | 1MI8caNxskdvNUwRldP-09VGopEj17DF_QIfn0fEBA6k | SEO Agency Selection: Your Comprehensive Checklist | choosing-an-seo-agency | growth-strategy |
| 23 | 1G3_K9hXu6-JsjiFbRhfn_iV155J1K2Z6Ek9NUjNs584 | Guaranteed SEO: Myth or Reality | guaranteed-seo-myth | growth-strategy |
| 24 | 1srac2TaV42zSV2cNdvlcSoqYitPsoX4q_m9h6NtDwVA | SEO Career Guide: Becoming an SEO Specialist | seo-career-guide | industry-insights |
| 25 | 1yiPDzjWif_nenidq8Aj4Hok_lDpvumSzI_k5jKEtmIw | SEO Full Form & Digital Marketing Evolution | seo-full-form | industry-insights |
| 26 | 1QB0WfQfTT3q8NXTdHtkAa5hXQzI2oUFV4zzwi5-qIto | 2024 SEO Tips: Effective Search Engine Optimization | 2024-seo-tips | seo-search |

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
