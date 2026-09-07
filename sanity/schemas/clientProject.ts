import { defineType, defineField } from "sanity";

const PHASES = ["Diagnose", "Architect", "Deploy", "Operate"] as const;
const HEALTH = ["On Track", "At Risk", "Blocked", "Completed"] as const;

export const clientProject = defineType({
  name: "clientProject",
  title: "Client Project",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (R) => R.required() }),
    defineField({
      name: "phase",
      type: "string",
      options: { list: PHASES.map((p) => ({ title: p, value: p })) },
      initialValue: "Diagnose",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "health",
      type: "string",
      options: { list: HEALTH.map((h) => ({ title: h, value: h })) },
      initialValue: "On Track",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "percentComplete",
      type: "number",
      validation: (R) => R.min(0).max(100),
    }),
    defineField({ name: "owner", type: "string", description: "Internal lead running this account" }),
    defineField({ name: "startDate", type: "date" }),
    defineField({ name: "nextMilestone", type: "string" }),
    defineField({ name: "nextMilestoneDate", type: "date" }),
    defineField({
      name: "kpis",
      title: "KPIs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (R) => R.required() }),
            defineField({ name: "value", type: "string", description: "e.g. AUD 40K → 2.7M", validation: (R) => R.required() }),
            defineField({
              name: "trend",
              type: "string",
              options: { list: ["up", "down", "flat"] },
              initialValue: "flat",
            }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
    }),
    defineField({ name: "notes", title: "Latest update / blockers", type: "text", rows: 4 }),
  ],
  preview: {
    select: { title: "name", subtitle: "phase", health: "health" },
    prepare: ({ title, subtitle, health }) => ({
      title,
      subtitle: `${subtitle} · ${health}`,
    }),
  },
});
