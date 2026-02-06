import { defineType, defineField } from "sanity";

export default defineType({
  name: "introBanner",
  title: "Intro Banner",
  type: "document",
  fields: [
    defineField({
      name: "image_light_mode",
      title: "Light Mode Image",
      type: "image",
    }),
    defineField({
      name: "image_dark_mode",
      title: "Dark Mode Image",
      type: "image",
    }),
  ],
});
