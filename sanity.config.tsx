import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

const FRONTEND_URL = "https://newsroom-v2.vercel.app";

// Singleton types — should only ever have one document each
const SINGLETON_TYPES = new Set(["introBanner", "reportersDesk", "about", "socialLinks"]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ArticlePreview(props: any) {
  const doc = props?.document?.displayed;
  const id = doc?._id?.replace("drafts.", "");
  if (!id) {
    return (
      <div style={{ padding: 20, fontFamily: "sans-serif" }}>
        Save the article first to see preview
      </div>
    );
  }
  return (
    <iframe
      src={`${FRONTEND_URL}/articles/${id}`}
      style={{ width: "100%", height: "100%", border: "none" }}
      title="Article Preview"
    />
  );
}

export default defineConfig({
  name: "newsroom-v2",
  title: "Newsroom",
  projectId: "3pzdmaav",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .id("root")
          .title("Content")
          .items([
            S.listItem()
              .id("articles")
              .title("Articles")
              .schemaType("article")
              .child(
                S.documentTypeList("article")
                  .id("article-list")
                  .title("Articles")
                  .child((documentId) =>
                    S.document()
                      .id(`article-${documentId.replace(/[^a-zA-Z0-9_-]/g, "_")}`)
                      .documentId(documentId)
                      .schemaType("article")
                      .views([
                        S.view.form().id("editor"),
                        S.view
                          .component(ArticlePreview)
                          .id("preview")
                          .title("Preview"),
                      ])
                  )
              ),

            S.divider(),

            S.listItem()
              .id("categories")
              .title("Categories")
              .schemaType("category")
              .child(
                S.documentTypeList("category").id("category-list").title("Categories")
              ),

            S.listItem()
              .id("authors")
              .title("Authors")
              .schemaType("author")
              .child(
                S.documentTypeList("author").id("author-list").title("Authors")
              ),

            S.divider(),

            S.listItem()
              .id("intro-banner")
              .title("Intro Banner")
              .schemaType("introBanner")
              .child(
                S.documentTypeList("introBanner").id("introBanner-list").title("Intro Banner")
              ),

            S.listItem()
              .id("reporters-desk")
              .title("Reporters Desk")
              .schemaType("reportersDesk")
              .child(
                S.documentTypeList("reportersDesk").id("reportersDesk-list").title("Reporters Desk")
              ),

            S.listItem()
              .id("about")
              .title("About")
              .schemaType("about")
              .child(
                S.documentTypeList("about").id("about-list").title("About")
              ),

            S.listItem()
              .id("social-links")
              .title("Social Links")
              .schemaType("socialLinks")
              .child(
                S.documentTypeList("socialLinks").id("socialLinks-list").title("Social Links")
              ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter(
          (option) => !SINGLETON_TYPES.has(option.templateId)
        );
      }
      return prev;
    },
  },
});
