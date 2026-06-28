import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { sanityConfig } from "./sanity/lib/client";

export default defineConfig({
  name: "zeppstr",
  title: "Zeppstr CMS",
  basePath: "/studio",
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title("Zeppstr Content")
          .items([
            S.listItem()
              .title("Solutions")
              .child(S.documentTypeList("solution").title("5 Solutions")),
            S.listItem()
              .title("Sub-Services")
              .child(S.documentTypeList("subService").title("23 Sub-Services")),
            S.divider(),
            S.listItem()
              .title("Industries")
              .child(S.documentTypeList("industry").title("6 Industries")),
            S.listItem()
              .title("Case Studies")
              .child(S.documentTypeList("caseStudy").title("Case Studies / Work")),
            S.listItem()
              .title("Client Logos")
              .child(S.documentTypeList("clientLogo").title("All Client Logos")),
            S.divider(),
            S.listItem()
              .title("Articles (Insights)")
              .child(S.documentTypeList("article").title("Articles")),
            S.listItem()
              .title("Quotes")
              .child(S.documentTypeList("quote").title("Reusable Quotes")),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
