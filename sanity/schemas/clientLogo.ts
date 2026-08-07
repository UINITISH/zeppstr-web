import { defineType, defineField } from "sanity";

export const clientLogo = defineType({
  name: "clientLogo",
  title: "Client Logo",
  type: "document",
  fields: [
    defineField({ name: "clientName", type: "string", validation: (R) => R.required() }),
    defineField({
      name: "logo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", validation: (R) => R.required() })],
      validation: (R) => R.required(),
    }),
    defineField({
      name: "industry",
      type: "reference",
      to: [{ type: "industry" }],
    }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Flagship (full case study)", value: "flagship" },
          { title: "Active client", value: "active" },
          { title: "Past client", value: "past" },
        ],
      },
      initialValue: "active",
      validation: (R) => R.required(),
    }),
    defineField({ name: "website", type: "url" }),
  ],
  preview: {
    select: { title: "clientName", subtitle: "status", media: "logo" },
  },
});
