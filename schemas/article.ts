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
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "عادي", value: "normal" },
            { title: "عنوان 1", value: "h1" },
            { title: "عنوان 2", value: "h2" },
            { title: "عنوان 3", value: "h3" },
            { title: "اقتباس", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "غامق", value: "strong" },
              { title: "مائل", value: "em" },
              { title: "تحته خط", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "رابط",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "الرابط",
                    validation: (Rule: any) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ["http", "https", "mailto"],
                      }),
                  },
                  {
                    name: "blank",
                    type: "boolean",
                    title: "فتح في نافذة جديدة",
                    initialValue: true,
                  },
                ],
              },
            ],
          },
          lists: [
            { title: "قائمة نقطية", value: "bullet" },
            { title: "قائمة رقمية", value: "number" },
          ],
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "نص بديل",
            },
            {
              name: "caption",
              type: "string",
              title: "تعليق",
            },
          ],
        },
        {
          name: "tweetEmbed",
          type: "object",
          title: "تغريدة",
          fields: [
            {
              name: "tweetId",
              type: "string",
              title: "معرف التغريدة",
              description:
                "الصق رابط التغريدة أو المعرف الرقمي مثال: 1234567890123456789",
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: { title: "tweetId" },
            prepare({ title }: { title: string }) {
              return { title: `تغريدة: ${title}` };
            },
          },
        },
        {
          name: "youtubeEmbed",
          type: "object",
          title: "يوتيوب",
          fields: [
            {
              name: "videoId",
              type: "string",
              title: "معرف الفيديو",
              description: "مثال: dQw4w9WgXcQ",
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: { title: "videoId" },
            prepare({ title }: { title: string }) {
              return { title: `يوتيوب: ${title}` };
            },
          },
        },
        {
          name: "videoPressEmbed",
          type: "object",
          title: "VideoPress",
          fields: [
            {
              name: "videoId",
              type: "string",
              title: "معرف الفيديو",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "options",
              type: "string",
              title: "خيارات إضافية",
            },
          ],
          preview: {
            select: { title: "videoId" },
            prepare({ title }: { title: string }) {
              return { title: `VideoPress: ${title}` };
            },
          },
        },
        {
          name: "soundCloudEmbed",
          type: "object",
          title: "SoundCloud",
          fields: [
            {
              name: "url",
              type: "url",
              title: "رابط SoundCloud",
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: { title: "url" },
            prepare({ title }: { title: string }) {
              return { title: `SoundCloud: ${title}` };
            },
          },
        },
      ],
    }),
    defineField({
      name: "legacyContent",
      title: "المحتوى القديم (HTML)",
      type: "text",
      hidden: true,
      description: "محتوى HTML القديم - يستخدم فقط للمقالات التي لم تُحوَّل بعد",
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
          { title: "نشرة", value: "نشرة" },
          { title: "ترجمة", value: "ترجمة" },
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
