import { defineType, defineField } from "sanity";

export default defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule: any) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ["http", "https", "mailto"],
                      }),
                  },
                  {
                    name: "blank",
                    type: "boolean",
                    title: "Open in new tab",
                    initialValue: true,
                  },
                ],
              },
            ],
          },
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt text",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
        {
          name: "tweetEmbed",
          type: "object",
          title: "Tweet",
          fields: [
            {
              name: "tweetId",
              type: "string",
              title: "Tweet ID",
              description: "Paste the tweet URL or numeric ID e.g. 1234567890123456789",
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: { title: "tweetId" },
            prepare({ title }: { title: string }) {
              return { title: `Tweet: ${title}` };
            },
          },
        },
        {
          name: "youtubeEmbed",
          type: "object",
          title: "YouTube",
          fields: [
            {
              name: "videoId",
              type: "string",
              title: "Video ID",
              description: "e.g. dQw4w9WgXcQ",
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: { title: "videoId" },
            prepare({ title }: { title: string }) {
              return { title: `YouTube: ${title}` };
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
              title: "Video ID",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "options",
              type: "string",
              title: "Extra options",
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
              title: "SoundCloud URL",
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
      title: "Legacy Content (HTML)",
      type: "text",
      hidden: true,
      description: "Old HTML content - only used for articles not yet converted",
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "News", value: "\u062E\u0628\u0631" },
          { title: "Article", value: "\u0645\u0642\u0627\u0644" },
          { title: "Investigation", value: "\u062A\u062D\u0642\u064A\u0642" },
          { title: "Opinion", value: "\u0631\u0623\u064A" },
          { title: "Report", value: "\u062A\u0642\u0631\u064A\u0631" },
          { title: "Newsletter", value: "\u0646\u0634\u0631\u0629" },
          { title: "Translation", value: "\u062A\u0631\u062C\u0645\u0629" },
        ],
      },
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "cover",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "author",
      title: "Author",
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
      title: "Created (Newest)",
      name: "createdAtDesc",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
  ],
});
