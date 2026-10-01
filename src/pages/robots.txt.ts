import type { APIRoute } from "astro";
import { siteOrigin } from "../lib/seo";

export const GET: APIRoute = () => {
  const sitemap = `${siteOrigin()}/sitemap.xml`;
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${sitemap}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
