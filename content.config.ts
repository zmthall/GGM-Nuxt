import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: {
        include: "blog/**/*.md",
      },
      schema: z.object({
        id: z.string(),
        title: z.string(),
        description: z.string().optional(),
        date: z.string().optional(),
        author: z.string().optional(),
        draft: z.boolean().optional(),
        tags: z.array(z.string()).max(2).optional(),
        thumbnail: z.string().optional(),
        thumbnailAlt: z.string().optional(),
        thumbnailHeight: z.string().optional(),
        thumbnailWidth: z.string().optional(),
        staffPick: z.boolean().optional(),
        summary: z.string()
      }),
    }),
  },
});