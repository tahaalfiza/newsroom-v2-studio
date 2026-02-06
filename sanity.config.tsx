import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

const FRONTEND_URL = "https://newsroom-v2.vercel.app";

function ArticlePreview({ document }: { document: { displayed: any } }) {
  const id = document?.displayed?._id?.replace("drafts.", "");
  if (!id)
    return (
      <div style={{ padding: 20, fontFamily: "sans-serif" }}>
        احفظ المقال أولاً لرؤية المعاينة
      </div>
    );
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
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== "article"
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
