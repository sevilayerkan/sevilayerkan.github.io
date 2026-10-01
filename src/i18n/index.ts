import { defaultLocale, isLocale, locales, type Locale } from "./config";
import { en, type Messages } from "./en";
import { tr } from "./tr";

export type { Locale, Messages };
export {
  defaultLocale,
  isLocale,
  localeLabels,
  locales,
  LOCALE_STORAGE_KEY,
} from "./config";

const dictionaries: Record<Locale, Messages> = {
  en,
  tr,
};

export function ui(locale: Locale): Messages {
  return dictionaries[locale];
}

export function getLocaleFromPath(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  return isLocale(segment) ? segment : defaultLocale;
}

export function detectErrorLocale(pathname: string, stored?: string | null): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  if (isLocale(segment)) {
    return segment;
  }

  if (isLocale(stored)) {
    return stored;
  }

  return defaultLocale;
}

export function stripLocale(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);

  if (isLocale(parts[0])) {
    parts.shift();
  }

  return parts.length === 0 ? "/" : `/${parts.join("/")}`;
}

export function localizeHref(locale: Locale, path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (normalized === "/") {
    return `/${locale}/`;
  }

  return `/${locale}${normalized}`;
}

export function switchLocalePath(
  pathname: string,
  nextLocale: Locale,
  options?: { fallbackPath?: string; availableLocales?: Locale[] },
): string {
  const available = options?.availableLocales ?? [...locales];
  const stripped = stripLocale(pathname);
  const isPost =
    stripped.startsWith("/blog/") && stripped !== "/blog";

  if (isPost && !available.includes(nextLocale)) {
    return localizeHref(nextLocale, options?.fallbackPath ?? "/blog");
  }

  return localizeHref(nextLocale, stripped);
}

export function interpolate(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(vars[key] ?? ""),
  );
}

export function localeStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}

export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatReadingTime(minutes: number, locale: Locale): string {
  return interpolate(ui(locale).notes.minutes, { n: minutes });
}
