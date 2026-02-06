import { defineType, defineField } from "sanity";

export default defineType({
  name: "about",
  title: "من نحن",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "العنوان",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "الوصف",
      type: "text",
    }),
    defineField({
      name: "manifesto_content",
      title: "محتوى البيان",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "العنوان", type: "string" },
            { name: "description", title: "الوصف", type: "text" },
          ],
        },
      ],
    }),
  ],
});
