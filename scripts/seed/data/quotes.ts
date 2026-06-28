interface SeedQuote {
  _id: string;
  quoteText: string;
  attributionName: string;
  attributionTitle?: string;
  attributionCompany?: string;
  relatedCaseStudyId?: string;
}

export const QUOTES: SeedQuote[] = [
  {
    _id: "quote-wise-market-founder",
    quoteText:
      "Zeppstr didn't run more ads. They rebuilt the system underneath the ads. Six months later, we'd grown 67×. Same team, same product, completely different operating model behind the marketing.",
    attributionName: "Founder",
    attributionTitle: "Co-founder",
    attributionCompany: "Wise Market",
    relatedCaseStudyId: "case-study-wise-market",
  },
  {
    _id: "quote-tru-aquapolis-founder",
    quoteText:
      "We had a beautifully designed project that wasn't selling. Zeppstr's diagnosis took two weeks; the rebuilt account architecture took six. Inquiries became qualified site visits, and the launch finally caught traction.",
    attributionName: "Sales Director",
    attributionTitle: "Sales Director",
    attributionCompany: "Tru Aquapolis",
    relatedCaseStudyId: "case-study-tru-aquapolis",
  },
  {
    _id: "quote-mini-leaves-founder",
    quoteText:
      "Mini Leaves had a story; Zeppstr engineered it into a brand and a revenue system. The growth looks effortless from outside; from inside, it's structure — every week, every campaign, every cohort.",
    attributionName: "Founder",
    attributionTitle: "Founder",
    attributionCompany: "Mini Leaves",
    relatedCaseStudyId: "case-study-mini-leaves",
  },
];
