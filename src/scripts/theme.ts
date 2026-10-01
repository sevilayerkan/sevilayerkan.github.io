export const THEME_STORAGE_KEY = "xp-theme";

export const THEMES = ["xp-light", "xp-dark"] as const;

export type XpTheme = (typeof THEMES)[number];

const READY_ATTR = "data-xp-theme-ready";

export function isXpTheme(value: string | null | undefined): value is XpTheme {
  return value === "xp-light" || value === "xp-dark";
}

export function themeFromPrefers(): XpTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "xp-dark"
    : "xp-light";
}

export function readStoredTheme(): XpTheme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isXpTheme(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function currentTheme(): XpTheme {
  const attr = document.documentElement.getAttribute("data-theme");
  if (isXpTheme(attr)) {
    return attr;
  }

  return readStoredTheme() ?? themeFromPrefers();
}

function syncThemeColor(): void {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!(meta instanceof HTMLMetaElement) || meta.hasAttribute("data-theme-lock")) {
    return;
  }

  const color = getComputedStyle(document.documentElement)
    .getPropertyValue("--xp-theme-color")
    .trim();

  if (color) {
    meta.content = color;
  }
}

export function applyTheme(theme: XpTheme, persist = true): void {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme =
    theme === "xp-dark" ? "dark" : "light";
  syncThemeColor();

  if (!persist) {
    return;
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode / blocked storage should not break theme switching.
  }
}

function selectedTheme(dialog: HTMLElement): XpTheme {
  const checked = dialog.querySelector<HTMLInputElement>(
    'input[name="xp-appearance"]:checked',
  );

  if (checked && isXpTheme(checked.value)) {
    return checked.value;
  }

  return currentTheme();
}

function syncAppearanceUi(dialog: HTMLElement, theme: XpTheme): void {
  for (const input of dialog.querySelectorAll<HTMLInputElement>(
    'input[name="xp-appearance"]',
  )) {
    input.checked = input.value === theme;
  }

  for (const preview of dialog.querySelectorAll("[data-theme-preview]")) {
    preview.classList.toggle(
      "is-selected",
      preview.getAttribute("data-theme-preview") === theme,
    );
  }
}

export function bindDisplayProperties(): void {
  if (document.documentElement.hasAttribute(READY_ATTR)) {
    return;
  }

  document.documentElement.setAttribute(READY_ATTR, "");

  const dialog = document.getElementById("display-properties");
  if (!(dialog instanceof HTMLDialogElement)) {
    return;
  }

  let committed = currentTheme();

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    if (target.closest('[data-xp-dialog-open="display-properties"]')) {
      committed = currentTheme();
      syncAppearanceUi(dialog, committed);
    }
  });

  dialog.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || target.name !== "xp-appearance") {
      return;
    }

    const theme = selectedTheme(dialog);
    applyTheme(theme, false);
    syncAppearanceUi(dialog, theme);
  });

  dialog.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    if (target.closest("[data-theme-apply]")) {
      committed = selectedTheme(dialog);
      applyTheme(committed, true);
      return;
    }

    if (target.closest("[data-theme-ok]")) {
      committed = selectedTheme(dialog);
      applyTheme(committed, true);
      dialog.close();
      return;
    }

    if (target.closest("[data-theme-cancel]")) {
      applyTheme(committed, true);
      dialog.close();
    }
  });

  dialog.addEventListener("close", () => {
    applyTheme(committed, true);
    syncAppearanceUi(dialog, committed);
  });
}

bindDisplayProperties();
