import { defineType, defineField } from "sanity";

/**
 * Reader comment on an article.
 *
 * Comments arrive from the public site via /api/comments and are created with
 * `approved: false`. Nothing renders publicly until an editor flips that flag
 * in the Studio — an unmoderated comment box on a marketing site is a spam
 * surface, not an engagement channel.
 */
export const comment = defineType({
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    defineField({
      name: "article",
      type: "reference",
      to: [{ type: "article" }],
      validation: (R) => R.required(),
    }),
    defineField({ name: "name", type: "string", validation: (R) => R.required().max(80) }),
    defineField({
      name: "email",
      type: "string",
      description: "Never displayed publicly. Used only to reply.",
      validation: (R) => R.required().email(),
    }),
    defineField({
      name: "body",
      type: "text",
      rows: 5,
      validation: (R) => R.required().min(2).max(2000),
    }),
    defineField({
      name: "approved",
      title: "Approved for publication",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "createdAt", type: "datetime", readOnly: true }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "body", approved: "approved" },
    prepare({ title, subtitle, approved }) {
      return {
        title: `${approved ? "✅" : "⏳"} ${title}`,
        subtitle: (subtitle ?? "").slice(0, 80),
      };
    },
  },
});
