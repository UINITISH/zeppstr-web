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
      title: "Industry (grouping only)",
      description:
        "Which industry page this logo is listed on. This is a grouping key, not a statement about what the client does — use 'Actual sector' below when the two differ.",
      type: "reference",
      to: [{ type: "industry" }],
    }),
    /**
     * Zeppstr runs six industry pages. Some clients don't belong to any of
     * them: 21 Finance is fintech, Aishwarya Interiors is an interior design
     * firm. Both were filed under Professional Services because that was the
     * nearest available bucket, which made the stored data say something untrue
     * about two real clients.
     *
     * Adding two more industry pages for one client each is not the answer —
     * a thin page is worse than no page. So the reference above stays a
     * grouping key and the honest label lives here.
     */
    defineField({
      name: "sector",
      title: "Actual sector",
      description:
        "Only fill this in when the client's real sector has no industry page of its own (e.g. Fintech, Interior Design). Leave blank otherwise.",
      type: "string",
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
