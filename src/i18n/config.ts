export const locales = ["en", "tr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";

export const LOCALE_STORAGE_KEY = "xp-locale";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  tr: "Türkçe",
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "tr";
}
