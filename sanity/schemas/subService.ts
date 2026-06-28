import { defineType, defineField } from "sanity";

export const subService = defineType({
  name: "subService",
  title: "Sub-Service",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Elevated name",
      type: "string",
      validation: (R) => R.required().max(60),
      description: "e.g. Organic Search Strategy",
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: { source: "name", maxLength: 80 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "parentSolution",
      title: "Parent Solution",
      type: "reference",
      to: [{ type: "solution" }],
      validation: (R) => R.required(),
    }),
    defineField({
      name: "legacyName",
      title: "Legacy name (for SEO body copy reference)",
      type: "string",
      description: "e.g. Off-Page SEO — used to keep keywords in body copy",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (R) => R.max(120),
    }),
    defineField({
      name: "whatsIncluded",
      title: "What's included",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "methodology",
      title: "Methodology",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", type: "string", validation: (R) => R.required() }),
            defineField({ name: "answer", type: "array", of: [{ type: "block" }] }),
          ],
        },
      ],
    }),
    defineField({
      name: "relatedCaseStudy",
      title: "Related case study (proof)",
      type: "reference",
      to: [{ type: "caseStudy" }],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      validation: (R) => R.max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
      validation: (R) => R.max(160),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "parentSolution.name" },
  },
});
