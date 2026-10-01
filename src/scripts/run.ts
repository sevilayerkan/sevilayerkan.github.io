import { isConfigured } from "../config/site";
import { defaultLocale, isLocale, localizeHref, type Locale } from "../i18n";
import { openXpDialog } from "./xp-dialog";

const READY_ATTR = "data-xp-run-ready";
const DIALOG_ID = "run-dialog";

const PAGE_COMMANDS = [
  "home",
  "projects",
  "blog",
  "about",
  "streams",
  "contact",
] as const;

type PageCommand = (typeof PAGE_COMMANDS)[number];

function currentLocale(): Locale {
  const lang = document.documentElement.lang;
  return isLocale(lang) ? lang : defaultLocale;
}

function interpolate(template: string, cmd: string): string {
  return template.replace(/\{cmd\}/g, cmd);
}

function pageHref(command: PageCommand): string {
  const locale = currentLocale();
  if (command === "home") {
    return localizeHref(locale, "/");
  }

  return localizeHref(locale, `/${command}`);
}

function setStatus(
  dialog: HTMLDialogElement,
  text: string,
  kind: "help" | "error",
): void {
  const status = dialog.querySelector<HTMLElement>("[data-run-status]");
  const title = dialog.querySelector<HTMLElement>("[data-run-status-title]");
  if (!status) {
    return;
  }

  status.hidden = text.length === 0;
  status.dataset.kind = kind;
  status.textContent = text;

  if (title) {
    title.hidden = kind !== "help" || text.length === 0;
  }
}

function runCommand(dialog: HTMLDialogElement, raw: string): void {
  const source =
    dialog.querySelector<HTMLElement>("[data-run-form]") ?? dialog;
  const command = raw.trim().toLowerCase();
  const unknown = source.getAttribute("data-run-unknown") ?? "";
  const missing = source.getAttribute("data-run-missing") ?? "";
  const empty = source.getAttribute("data-run-empty") ?? "";
  const help = source.getAttribute("data-run-help") ?? "";

  if (!command) {
    setStatus(dialog, empty, "error");
    return;
  }

  if (command === "help") {
    setStatus(dialog, help, "help");
    return;
  }

  if (command === "penguin.exe") {
    const penguin = document.querySelector<HTMLElement>(
      '[data-xp-dialog-open="xp-console"]',
    );
    dialog.close();
    openXpDialog("xp-console", penguin);
    return;
  }

  if ((PAGE_COMMANDS as readonly string[]).includes(command)) {
    window.location.assign(pageHref(command as PageCommand));
    return;
  }

  if (command === "github" || command === "linkedin") {
    const href = source.getAttribute(`data-run-${command}`) ?? "";
    if (!isConfigured(href)) {
      setStatus(dialog, interpolate(missing, command), "error");
      return;
    }

    window.open(href, "_blank", "noopener,noreferrer");
    dialog.close();
    return;
  }

  setStatus(dialog, interpolate(unknown, command), "error");
}

function bindRunDialog(): void {
  if (document.documentElement.hasAttribute(READY_ATTR)) {
    return;
  }

  document.documentElement.setAttribute(READY_ATTR, "");

  const dialog = document.getElementById(DIALOG_ID);
  if (!(dialog instanceof HTMLDialogElement)) {
    return;
  }

  const form = dialog.querySelector<HTMLFormElement>("[data-run-form]");
  const input = dialog.querySelector<HTMLInputElement>("[data-run-input]");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    runCommand(dialog, input?.value ?? "");
  });

  dialog.addEventListener("close", () => {
    if (input) {
      input.value = "";
    }
    setStatus(dialog, "", "error");
  });

  document.addEventListener("keydown", (event) => {
    const isShortcut =
      event.altKey &&
      event.ctrlKey &&
      !event.metaKey &&
      !event.shiftKey &&
      event.key.toLowerCase() === "r";

    if (!isShortcut) {
      return;
    }

    event.preventDefault();
    openXpDialog(DIALOG_ID);
  });
}

bindRunDialog();
