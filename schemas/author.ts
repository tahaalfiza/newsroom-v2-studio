import { defineType, defineField } from "sanity";

export default defineType({
  name: "author",
  title: "كاتب",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "الاسم",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bio",
      title: "نبذة",
      type: "text",
    }),
  ],
});
