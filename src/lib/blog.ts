import { getCollection, type CollectionEntry } from "astro:content";
import { locales, type Locale } from "../i18n";

export type BlogPost = CollectionEntry<"blog">;

export function postLocale(post: BlogPost): Locale {
  return post.data.locale;
}

export function isPublished(post: BlogPost): boolean {
  return import.meta.env.PROD ? !post.data.draft : true;
}

export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );
}

export async function getPublishedPosts(locale?: Locale): Promise<BlogPost[]> {
  const posts = await getCollection("blog", (post) => {
    if (!isPublished(post)) {
      return false;
    }

    if (locale && postLocale(post) !== locale) {
      return false;
    }

    return true;
  });

  return sortPostsByDate(posts);
}

export async function getLatestPosts(
  count = 3,
  locale?: Locale,
): Promise<BlogPost[]> {
  const posts = await getPublishedPosts(locale);
  return posts.slice(0, count);
}

export function getPostSlug(post: BlogPost): string {
  const id = post.id.replace(/\.(md|mdx)$/i, "");
  const parts = id.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? id;
}

export function getPostHref(post: BlogPost): string {
  return `/${postLocale(post)}/blog/${getPostSlug(post)}`;
}

export function getPostPathKey(post: BlogPost): string {
  return `/blog/${getPostSlug(post)}`;
}

export function getReadingTime(post: BlogPost): number {
  if (post.data.readingTime) {
    return post.data.readingTime;
  }

  const words = (post.body ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / 200));
}

export function translationLocales(posts: BlogPost[]): Locale[] {
  const found = new Set(posts.map(postLocale));
  return locales.filter((locale) => found.has(locale));
}

export async function getPostsByTranslationKey(
  key: string | undefined,
): Promise<BlogPost[]> {
  if (!key) {
    return [];
  }

  const posts = await getCollection(
    "blog",
    (post) => isPublished(post) && post.data.translationKey === key,
  );
  return sortPostsByDate(posts);
}

export function hrefsByLocale(posts: BlogPost[]): Partial<Record<Locale, string>> {
  const hrefs: Partial<Record<Locale, string>> = {};
  for (const post of posts) {
    hrefs[postLocale(post)] = getPostHref(post);
  }
  return hrefs;
}
