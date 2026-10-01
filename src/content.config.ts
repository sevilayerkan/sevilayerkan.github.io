import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

function emptyToUndefined(value: unknown): unknown {
  if (value == null || value === "") {
    return undefined;
  }

  return value;
}

const blog = defineCollection({
  loader: glob({
    pattern: "{en,tr}/**/*.{md,mdx}",
    base: "./src/content/blog",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      updatedDate: z.preprocess(emptyToUndefined, z.coerce.date().optional()),
      category: z.preprocess((value) => {
        if (value == null || value === "") {
          return "Notes";
        }

        return value;
      }, z.string()),
      tags: z.preprocess((value) => {
        if (!Array.isArray(value)) {
          return [];
        }

        return value;
      }, z.array(z.string()).default([])),
      locale: z.enum(["en", "tr"]),
      translationKey: z.preprocess(
        emptyToUndefined,
        z.string().min(1).optional(),
      ),
      draft: z.boolean().default(false),
      originalUrl: z.preprocess(emptyToUndefined, z.string().url().optional()),
      canonicalUrl: z.preprocess(emptyToUndefined, z.string().url().optional()),
      readingTime: z.number().int().positive().optional(),
      cover: z.preprocess((value) => {
        if (
          value == null ||
          value === "" ||
          (typeof value === "string" && /^https?:\/\//i.test(value))
        ) {
          return undefined;
        }

        return value;
      }, image().optional()),
    }),
});

export const collections = {
  blog,
};
