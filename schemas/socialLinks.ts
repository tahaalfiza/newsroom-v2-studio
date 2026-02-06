import { defineType, defineField } from "sanity";

export default defineType({
  name: "socialLinks",
  title: "روابط التواصل",
  type: "document",
  fields: [
    defineField({
      name: "links",
      title: "الروابط",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "المنصة",
              type: "string",
              options: {
                list: [
                  { title: "X (تويتر)", value: "twitter" },
                  { title: "Instagram", value: "instagram" },
                  { title: "Facebook", value: "facebook" },
                  { title: "Telegram", value: "telegram" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "YouTube", value: "youtube" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "أخرى", value: "other" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "الرابط",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "التسمية",
              type: "string",
              description: "اختياري — يظهر كنص بديل",
            }),
          ],
          preview: {
            select: {
              title: "platform",
              subtitle: "url",
            },
          },
        },
      ],
    }),
  ],
});
