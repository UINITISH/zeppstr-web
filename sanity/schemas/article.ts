import { defineType, defineField } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article (Insight)",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (R) => R.required() }),
    defineField({ name: "excerpt", type: "text", rows: 3, validation: (R) => R.max(200) }),
    defineField({
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", validation: (R) => R.required() })],
    }),
    defineField({ name: "author", type: "string", initialValue: "Nitish Kumar" }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Growth Strategy", value: "growth-strategy" },
          { title: "SEO & Search", value: "seo-search" },
          { title: "Performance & Paid", value: "performance-paid" },
          { title: "Conversion & Experience", value: "conversion-experience" },
          { title: "Industry Insights", value: "industry-insights" },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string" })] },
      ],
    }),
    defineField({ name: "publishedAt", type: "datetime", validation: (R) => R.required() }),
    defineField({ name: "relatedSolution", type: "reference", to: [{ type: "solution" }] }),
    defineField({ name: "relatedIndustry", type: "reference", to: [{ type: "industry" }] }),
    defineField({ name: "seoTitle", type: "string", validation: (R) => R.max(60) }),
    defineField({ name: "seoDescription", type: "text", rows: 3, validation: (R) => R.max(160) }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "heroImage" } },
});
