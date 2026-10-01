import {
  defaultLocale,
  isLocale,
  LOCALE_STORAGE_KEY,
  switchLocalePath,
  type Locale,
} from "../i18n";

const READY_ATTR = "data-xp-locale-ready";

function currentLocale(): Locale {
  const lang = document.documentElement.lang;
  return isLocale(lang) ? lang : defaultLocale;
}

function selectedLocale(dialog: HTMLElement): Locale {
  const checked = dialog.querySelector<HTMLInputElement>(
    'input[name="xp-locale"]:checked',
  );

  if (checked && isLocale(checked.value)) {
    return checked.value;
  }

  return currentLocale();
}

function availableLocales(): Locale[] {
  const raw = document.documentElement.getAttribute("data-available-locales");
  if (!raw) {
    return ["en", "tr"];
  }

  return raw
    .split(",")
    .map((part) => part.trim())
    .filter(isLocale);
}

function persistLocale(locale: Locale): void {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Ignore private-mode / blocked storage.
  }
}

function localePathMap(): Partial<Record<Locale, string>> | null {
  const raw = document.documentElement.getAttribute("data-locale-paths");
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Record<string, string>;
    const map: Partial<Record<Locale, string>> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (isLocale(key) && typeof value === "string") {
        map[key] = value;
      }
    }
    return map;
  } catch {
    return null;
  }
}

function syncLocaleUi(dialog: HTMLElement, locale: Locale): void {
  for (const input of dialog.querySelectorAll<HTMLInputElement>(
    'input[name="xp-locale"]',
  )) {
    input.checked = input.value === locale;
  }

  for (const preview of dialog.querySelectorAll("[data-locale-preview]")) {
    preview.classList.toggle(
      "is-selected",
      preview.getAttribute("data-locale-preview") === locale,
    );
  }
}

function goToLocale(dialog: HTMLDialogElement, locale: Locale): void {
  persistLocale(locale);

  const mapped = localePathMap()?.[locale];
  const fallback = document.documentElement.getAttribute("data-locale-fallback");
  const next =
    mapped ??
    switchLocalePath(window.location.pathname, locale, {
      availableLocales: availableLocales(),
      fallbackPath: fallback || "/blog",
    });

  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const destination = `${next}${window.location.search}${window.location.hash}`;

  if (destination !== current) {
    window.location.assign(destination);
    return;
  }

  dialog.close();
}

export function bindRegionalOptions(): void {
  if (document.documentElement.hasAttribute(READY_ATTR)) {
    return;
  }

  document.documentElement.setAttribute(READY_ATTR, "");

  const dialog = document.getElementById("regional-options");
  if (!(dialog instanceof HTMLDialogElement)) {
    return;
  }

  let snapshot = currentLocale();

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    if (target.closest('[data-xp-dialog-open="regional-options"]')) {
      snapshot = currentLocale();
      syncLocaleUi(dialog, snapshot);
    }
  });

  dialog.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    if (target.closest("[data-locale-apply]") || target.closest("[data-locale-ok]")) {
      goToLocale(dialog, selectedLocale(dialog));
      return;
    }

    if (target.closest("[data-locale-cancel]")) {
      syncLocaleUi(dialog, snapshot);
      dialog.close();
    }
  });
}

bindRegionalOptions();
