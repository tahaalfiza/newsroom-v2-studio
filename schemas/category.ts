import { defineType, defineField } from "sanity";

export default defineType({
  name: "category",
  title: "تصنيف",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "الاسم",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "الرابط",
      type: "slug",
      options: { source: "name" },
    }),
    defineField({
      name: "description",
      title: "الوصف",
      type: "text",
    }),
  ],
});
