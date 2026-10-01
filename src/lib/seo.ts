import { siteConfig } from "../config/site";
import { defaultLocale, localizeHref, type Locale } from "../i18n";

export function siteOrigin(): string {
  return siteConfig.siteUrl.replace(/\/$/, "");
}

export function withTrailingSlash(pathname: string): string {
  const path = pathname.split("?")[0]?.split("#")[0] || "/";

  if (path === "/") {
    return "/";
  }

  return path.endsWith("/") ? path : `${path}/`;
}

export function toAbsoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(withTrailingSlash(normalized), `${siteOrigin()}/`).href;
}

export function canonicalFromPathname(pathname: string): string {
  return toAbsoluteUrl(withTrailingSlash(pathname));
}

export function localePageUrl(locale: Locale, pathKey: string): string {
  return toAbsoluteUrl(localizeHref(locale, pathKey));
}

export function ogLocale(locale: Locale): string {
  return locale === "tr" ? "tr_TR" : "en_US";
}

export function pageDocumentTitle(
  title: string,
  options?: { asIs?: boolean },
): string {
  if (options?.asIs) {
    return title;
  }

  if (title === siteConfig.title || title === siteConfig.name) {
    return siteConfig.name;
  }

  if (title.includes(siteConfig.name)) {
    return title;
  }

  return `${title} | ${siteConfig.name}`;
}

export function resolveOgImage(
  custom?: string | null,
): string | undefined {
  if (custom && custom !== siteConfig.defaultOgImage) {
    if (/^https?:\/\//i.test(custom)) {
      return custom;
    }

    const origin = siteOrigin();
    const path = custom.startsWith("/") ? custom : `/${custom}`;
    return `${origin}${path}`;
  }

  if (siteConfig.defaultOgImageReady) {
    const origin = siteOrigin();
    return `${origin}${siteConfig.defaultOgImage}`;
  }

  return undefined;
}

export function defaultHreflangUrl(
  availableLocales: Locale[],
  pathKey: string,
  currentLocale: Locale,
): string {
  const target = availableLocales.includes(defaultLocale)
    ? defaultLocale
    : currentLocale;

  return localePageUrl(target, pathKey);
}
