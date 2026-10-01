import type { APIRoute } from "astro";
import { getPostPathKey, getPublishedPosts } from "../lib/blog";
import { locales, type Locale } from "../i18n";
import { localePageUrl } from "../lib/seo";

const pageKeys = ["/", "/about", "/projects", "/blog", "/streams", "/contact"];

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function xhtmlLinks(pathKey: string): string {
  const links = locales
    .map((locale) => {
      const href = localePageUrl(locale, pathKey);
      return `    <xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(href)}" />`;
    })
    .join("\n");

  const defaultHref = localePageUrl("tr", pathKey);
  return `${links}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(defaultHref)}" />`;
}

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();

  const pageEntries = pageKeys.flatMap((pathKey) =>
    locales.map((locale: Locale) => {
      const loc = localePageUrl(locale, pathKey);
      return `  <url>
    <loc>${escapeXml(loc)}</loc>
${xhtmlLinks(pathKey)}
  </url>`;
    }),
  );

  const postEntries = posts.map((post) => {
    const loc = localePageUrl(post.data.locale, getPostPathKey(post));
    const lastmod = (post.data.updatedDate ?? post.data.publishDate)
      .toISOString()
      .slice(0, 10);
    const siblings = post.data.translationKey
      ? posts.filter(
          (other) => other.data.translationKey === post.data.translationKey,
        )
      : [post];
    const alternates = siblings
      .map(
        (other) =>
          `    <xhtml:link rel="alternate" hreflang="${other.data.locale}" href="${escapeXml(localePageUrl(other.data.locale, getPostPathKey(other)))}" />`,
      )
      .join("\n");
    const defaultSibling =
      siblings.find((other) => other.data.locale === "tr") ?? siblings[0];
    const defaultLink = defaultSibling
      ? `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(localePageUrl(defaultSibling.data.locale, getPostPathKey(defaultSibling)))}" />`
      : "";

    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
${alternates}${defaultLink}
  </url>`;
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pageEntries.join("\n")}
${postEntries.join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
