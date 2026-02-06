import { defineType, defineField } from "sanity";

export default defineType({
  name: "introBanner",
  title: "بانر المقدمة",
  type: "document",
  fields: [
    defineField({
      name: "image_light_mode",
      title: "صورة الوضع الفاتح",
      type: "image",
    }),
    defineField({
      name: "image_dark_mode",
      title: "صورة الوضع الداكن",
      type: "image",
    }),
  ],
});
