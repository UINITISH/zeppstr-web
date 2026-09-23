import { defineType, defineField } from "sanity";

export const industry = defineType({
  name: "industry",
  title: "Industry",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Industry name",
      type: "string",
      validation: (R) => R.required(),
      options: {
        list: [
          { title: "Healthcare", value: "Healthcare" },
          { title: "SaaS / Tech", value: "SaaS / Tech" },
          { title: "Real Estate", value: "Real Estate" },
          { title: "EdTech / Education", value: "EdTech / Education" },
          { title: "Professional Services", value: "Professional Services" },
          { title: "E-commerce / D2C", value: "E-commerce / D2C" },
        ],
      },
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", validation: (R) => R.required() })],
    }),
    defineField({ name: "heroClaim", title: "Hero claim", type: "string", validation: (R) => R.max(160) }),
    defineField({ name: "whatsBroken", title: "What's broken in this industry", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "ourApproach", title: "Our approach for this industry", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "featuredCaseStudy",
      title: "Featured case study",
      type: "reference",
      to: [{ type: "caseStudy" }],
    }),
    defineField({
      name: "allClientLogos",
      title: "All client logos in this industry",
      type: "array",
      of: [{ type: "reference", to: [{ type: "clientLogo" }] }],
    }),
    defineField({
      name: "solutionsMostUsed",
      title: "Solutions most used in this industry",
      type: "array",
      of: [{ type: "reference", to: [{ type: "solution" }] }],
    }),
    defineField({
      name: "industryFaqs",
      title: "Industry FAQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", type: "string" }),
            defineField({ name: "answer", type: "array", of: [{ type: "block" }] }),
          ],
        },
      ],
    }),
    defineField({ name: "seoTitle", type: "string", validation: (R) => R.max(60) }),
    defineField({ name: "seoDescription", type: "text", rows: 3, validation: (R) => R.max(160) }),
  ],
  preview: { select: { title: "name", media: "heroImage" } },
});
