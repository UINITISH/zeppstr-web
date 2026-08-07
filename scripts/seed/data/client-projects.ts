/**
 * Ongoing client projects seeded as placeholders — phase, health, and notes
 * are neutral defaults. Update the real status, KPIs, and dates in Sanity
 * Studio under "Client Projects (Dashboard)" once seeded.
 */

interface SeedClientProject {
  _id: string;
  name: string;
}

export const CLIENT_PROJECTS: SeedClientProject[] = [
  { _id: "project-moonwalk-infra", name: "Moonwalk Infra" },
  { _id: "project-pohewala", name: "Pohewala" },
  { _id: "project-magtik-lighting", name: "Magtik Lighting" },
  { _id: "project-the-curtain-story", name: "The Curtain Story" },
  { _id: "project-tru-aquapolis", name: "Tru Aquapolis" },
];
