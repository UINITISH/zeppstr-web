import { defineType, defineField } from "sanity";

export const quote = defineType({
  name: "quote",
  title: "Quote",
  type: "document",
  fields: [
    defineField({ name: "quoteText", type: "text", rows: 4, validation: (R) => R.required() }),
    defineField({ name: "attributionName", type: "string", validation: (R) => R.required() }),
    defineField({ name: "attributionTitle", type: "string" }),
    defineField({ name: "attributionCompany", type: "string" }),
    defineField({
      name: "attributionPhoto",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({ name: "relatedCaseStudy", type: "reference", to: [{ type: "caseStudy" }] }),
  ],
  preview: {
    select: { title: "attributionName", subtitle: "attributionCompany", media: "attributionPhoto" },
  },
});
