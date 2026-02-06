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
      <div style={{ padding: 20, fontFamily: "sans-serif", textAlign: "right" }}>
        احفظ المقال أولاً لرؤية المعاينة
      </div>
    );
  }
  return (
    <iframe
      src={`${FRONTEND_URL}/articles/${id}`}
      style={{ width: "100%", height: "100%", border: "none" }}
      title="معاينة المقال"
    />
  );
}

export default defineConfig({
  name: "newsroom-v2",
  title: "غرفة الأخبار",
  projectId: "3pzdmaav",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("المحتوى")
          .items([
            // Articles — list with preview pane
            S.listItem()
              .title("مقالات")
              .schemaType("article")
              .child(
                S.documentTypeList("article")
                  .title("مقالات")
                  .child((documentId) =>
                    S.document()
                      .documentId(documentId)
                      .schemaType("article")
                      .views([
                        S.view.form(),
                        S.view
                          .component(ArticlePreview)
                          .title("معاينة"),
                      ])
                  )
              ),

            S.divider(),

            // Categories — normal list
            S.listItem()
              .title("التصنيفات")
              .schemaType("category")
              .child(
                S.documentTypeList("category").title("التصنيفات")
              ),

            // Authors — normal list
            S.listItem()
              .title("الكتّاب")
              .schemaType("author")
              .child(
                S.documentTypeList("author").title("الكتّاب")
              ),

            S.divider(),

            // Intro Banner — list (user clicks into the single document)
            S.listItem()
              .title("بانر المقدمة")
              .schemaType("introBanner")
              .child(
                S.documentTypeList("introBanner").title("بانر المقدمة")
              ),

            // Reporters Desk — list
            S.listItem()
              .title("مكتب المراسلين")
              .schemaType("reportersDesk")
              .child(
                S.documentTypeList("reportersDesk").title("مكتب المراسلين")
              ),

            // About — list
            S.listItem()
              .title("من نحن")
              .schemaType("about")
              .child(
                S.documentTypeList("about").title("من نحن")
              ),

            // Social Links
            S.listItem()
              .title("روابط التواصل")
              .schemaType("socialLinks")
              .child(
                S.documentTypeList("socialLinks").title("روابط التواصل")
              ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    // Hide singleton types from the "new document" menu
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
