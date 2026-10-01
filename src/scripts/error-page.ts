import {
  detectErrorLocale,
  defaultLocale,
  LOCALE_STORAGE_KEY,
  type Locale,
} from "../i18n";

const READY_ATTR = "data-xp-error-ready";

type ErrorPack = {
  skipToHome: string;
  banner: string;
  heading: string;
  message: string;
  technicalHeading: string;
  stop: string;
  technical: string;
  recovery: string;
  home: string;
  homeHref: string;
  penguinOpen: string;
  penguinBody: string;
  ok: string;
};

type ErrorPacks = Record<Locale, ErrorPack>;

function storedLocale(): string | null {
  try {
    return localStorage.getItem(LOCALE_STORAGE_KEY);
  } catch {
    return null;
  }
}

function currentErrorLocale(): Locale {
  return detectErrorLocale(window.location.pathname, storedLocale());
}

function setText(root: ParentNode, selector: string, value: string): void {
  const node = root.querySelector(selector);
  if (node) {
    node.textContent = value;
  }
}

function applyErrorCopy(root: HTMLElement, pack: ErrorPack): void {
  setText(root, "[data-bsod-field='skip']", pack.skipToHome);
  setText(root, "[data-bsod-field='banner']", pack.banner);
  setText(root, "[data-bsod-field='heading']", pack.heading);
  setText(root, "[data-bsod-field='message']", pack.message);
  setText(root, "[data-bsod-field='technicalHeading']", pack.technicalHeading);
  setText(root, "[data-bsod-field='stop']", pack.stop);
  setText(root, "[data-bsod-field='technical']", pack.technical);
  setText(root, "[data-bsod-field='recovery']", pack.recovery);
  setText(root, "[data-bsod-field='home']", pack.home);

  const home = root.querySelector<HTMLAnchorElement>("[data-bsod-home]");
  if (home) {
    home.href = pack.homeHref;
  }
}

function applyPenguinCopy(pack: ErrorPack): void {
  const openLabel = document.querySelector("[data-penguin-open-label]");
  const body = document.querySelector("[data-penguin-body]");
  const close = document.querySelector("[data-penguin-close]");
  const openButton = document.querySelector("[data-penguin-open]");

  if (openLabel) {
    openLabel.textContent = pack.penguinOpen;
  }
  if (openButton instanceof HTMLElement) {
    openButton.setAttribute("aria-label", pack.penguinOpen);
  }
  if (body) {
    body.textContent = pack.penguinBody;
  }
  if (close) {
    close.textContent = pack.ok;
  }
}

function bindPenguinDialog(): void {
  const openButton = document.querySelector("[data-penguin-open]");
  const dialog = document.querySelector("[data-penguin-dialog]");

  if (
    !(openButton instanceof HTMLButtonElement) ||
    !(dialog instanceof HTMLDialogElement)
  ) {
    return;
  }

  openButton.addEventListener("click", () => {
    if (!dialog.open) {
      dialog.showModal();
    }
  });

  dialog.addEventListener("close", () => {
    if (document.contains(openButton)) {
      openButton.focus();
    }
  });
}

function bindErrorPage(): void {
  if (document.documentElement.hasAttribute(READY_ATTR)) {
    return;
  }

  document.documentElement.setAttribute(READY_ATTR, "");
  bindPenguinDialog();

  const root = document.querySelector<HTMLElement>("[data-bsod]");
  const source = document.getElementById("xp-error-copy");
  if (!root || !source?.textContent) {
    return;
  }

  let packs: ErrorPacks;
  try {
    packs = JSON.parse(source.textContent) as ErrorPacks;
  } catch {
    return;
  }

  const locale = currentErrorLocale();
  const pack = packs[locale] ?? packs[defaultLocale];
  document.documentElement.lang = locale;
  applyErrorCopy(root, pack);
  applyPenguinCopy(pack);
  root.setAttribute("data-ready", "");
}

bindErrorPage();
