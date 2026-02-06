import { defineType, defineField } from "sanity";

export default defineType({
  name: "article",
  title: "مقال",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "العنوان",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "المحتوى",
      type: "text",
      description: "محتوى HTML من المحرر",
    }),
    defineField({
      name: "type",
      title: "النوع",
      type: "string",
      options: {
        list: [
          { title: "خبر", value: "خبر" },
          { title: "مقال", value: "مقال" },
          { title: "تحقيق", value: "تحقيق" },
          { title: "رأي", value: "رأي" },
          { title: "تقرير", value: "تقرير" },
        ],
      },
    }),
    defineField({
      name: "isFeatured",
      title: "مميز",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "cover",
      title: "صورة الغلاف",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "categories",
      title: "التصنيفات",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "author",
      title: "الكاتب",
      type: "reference",
      to: [{ type: "author" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "cover",
      type: "type",
    },
    prepare({ title, media, type }) {
      return {
        title,
        subtitle: type,
        media,
      };
    },
  },
  orderings: [
    {
      title: "تاريخ الإنشاء (الأحدث)",
      name: "createdAtDesc",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
  ],
});
