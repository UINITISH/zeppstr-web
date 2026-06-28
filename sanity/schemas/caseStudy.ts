import { defineType, defineField } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  groups: [
    { name: "core", title: "Core" },
    { name: "narrative", title: "Narrative" },
    { name: "media", title: "Media" },
    { name: "relations", title: "Relations" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "clientName", group: "core", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", group: "core", type: "slug", options: { source: "clientName" }, validation: (R) => R.required() }),
    defineField({
      name: "industry",
      group: "core",
      type: "reference",
      to: [{ type: "industry" }],
      validation: (R) => R.required(),
    }),
    defineField({
      name: "solutionsUsed",
      group: "relations",
      type: "array",
      of: [{ type: "reference", to: [{ type: "solution" }] }],
    }),
    defineField({
      name: "headlineMetric",
      group: "core",
      type: "string",
      description: "e.g. AUD 40K → 2.7M",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "headlineTimeframe",
      group: "core",
      type: "string",
      description: "e.g. 6 months",
    }),
    defineField({
      name: "heroImage",
      group: "media",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", validation: (R) => R.required() })],
    }),
    defineField({ name: "situation", group: "narrative", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "diagnosis", group: "narrative", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "whatWeDid", group: "narrative", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "results", group: "narrative", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "whatThisProves", group: "narrative", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "founderQuote",
      group: "relations",
      type: "reference",
      to: [{ type: "quote" }],
    }),
    defineField({
      name: "beforeAfterMedia",
      group: "media",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "before", type: "image", options: { hotspot: true } }),
            defineField({ name: "after", type: "image", options: { hotspot: true } }),
            defineField({ name: "caption", type: "string" }),
          ],
        },
      ],
    }),
    defineField({ name: "publishedAt", group: "core", type: "datetime" }),
    defineField({ name: "seoTitle", group: "seo", type: "string", validation: (R) => R.max(60) }),
    defineField({ name: "seoDescription", group: "seo", type: "text", rows: 3, validation: (R) => R.max(160) }),
  ],
  preview: {
    select: { title: "clientName", subtitle: "headlineMetric", media: "heroImage" },
  },
});
