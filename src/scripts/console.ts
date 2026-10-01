import { defaultLocale, isLocale, localizeHref, type Locale } from "../i18n";

const READY_ATTR = "data-xp-console-ready";
const DIALOG_ID = "xp-console";

const PAGE_COMMANDS = [
  "projects",
  "blog",
  "about",
  "streams",
  "contact",
] as const;

type PageCommand = (typeof PAGE_COMMANDS)[number];

const history: string[] = [];
let historyIndex = -1;
let draft = "";

function currentLocale(): Locale {
  const lang = document.documentElement.lang;
  return isLocale(lang) ? lang : defaultLocale;
}

function interpolate(template: string, cmd: string): string {
  return template.replace(/\{cmd\}/g, cmd);
}

function pageHref(command: PageCommand): string {
  return localizeHref(currentLocale(), `/${command}`);
}

function consoleRoot(dialog: HTMLDialogElement): HTMLElement | null {
  return dialog.querySelector<HTMLElement>("[data-console]");
}

function appendOutput(log: HTMLElement, text: string): void {
  if (!text) {
    return;
  }

  const block = document.createElement("div");
  block.className = "xp-console__entry";
  block.textContent = text;
  log.append(block);
  log.scrollTop = log.scrollHeight;
}

function ensureBanner(dialog: HTMLDialogElement): void {
  const root = consoleRoot(dialog);
  const log = dialog.querySelector<HTMLElement>("[data-console-log]");
  if (!root || !log || log.childElementCount > 0) {
    return;
  }

  appendOutput(log, root.getAttribute("data-console-banner") ?? "");
}

function clearLog(dialog: HTMLDialogElement): void {
  const log = dialog.querySelector<HTMLElement>("[data-console-log]");
  if (log) {
    log.replaceChildren();
  }
}

function runConsoleCommand(dialog: HTMLDialogElement, raw: string): void {
  const root = consoleRoot(dialog);
  const log = dialog.querySelector<HTMLElement>("[data-console-log]");
  if (!root || !log) {
    return;
  }

  const prompt = root.getAttribute("data-console-prompt") ?? "C:\\>";
  const typed = raw.trim();
  appendOutput(log, `${prompt}${typed ? ` ${typed}` : ""}`);

  if (!typed) {
    return;
  }

  const command = typed.toLowerCase();

  if (command === "help") {
    appendOutput(log, root.getAttribute("data-console-help") ?? "");
    return;
  }

  if (command === "whoami") {
    appendOutput(log, root.getAttribute("data-console-whoami") ?? "");
    return;
  }

  if (command === "penguin") {
    appendOutput(log, root.getAttribute("data-console-penguin") ?? "");
    return;
  }

  if (command === "clear") {
    clearLog(dialog);
    return;
  }

  if (command === "date") {
    const locale = currentLocale() === "tr" ? "tr-TR" : "en-US";
    appendOutput(log, new Date().toLocaleString(locale));
    return;
  }

  if (command === "exit") {
    dialog.close();
    return;
  }

  if ((PAGE_COMMANDS as readonly string[]).includes(command)) {
    window.location.assign(pageHref(command as PageCommand));
    return;
  }

  const notFound = root.getAttribute("data-console-not-found") ?? "";
  appendOutput(log, interpolate(notFound, typed));
}

function bindConsole(): void {
  const dialog = document.getElementById(DIALOG_ID);
  if (!(dialog instanceof HTMLDialogElement)) {
    return;
  }

  if (document.documentElement.hasAttribute(READY_ATTR)) {
    return;
  }

  document.documentElement.setAttribute(READY_ATTR, "");

  const form = dialog.querySelector<HTMLFormElement>("[data-console-form]");
  const input = dialog.querySelector<HTMLInputElement>("[data-console-input]");

  dialog.addEventListener("close", () => {
    if (input) {
      input.value = "";
    }
    draft = "";
    historyIndex = -1;
  });

  const observer = new MutationObserver(() => {
    if (dialog.open) {
      ensureBanner(dialog);
    }
  });
  observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });

  if (dialog.open) {
    ensureBanner(dialog);
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input?.value ?? "";
    const typed = value.trim();
    if (typed) {
      history.push(typed);
    }
    historyIndex = -1;
    draft = "";
    runConsoleCommand(dialog, value);
    if (input) {
      input.value = "";
    }
  });

  input?.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") {
      return;
    }

    if (history.length === 0) {
      return;
    }

    event.preventDefault();

    if (historyIndex === -1) {
      draft = input.value;
    }

    if (event.key === "ArrowUp") {
      historyIndex =
        historyIndex === -1
          ? history.length - 1
          : Math.max(0, historyIndex - 1);
    } else if (historyIndex === -1) {
      return;
    } else if (historyIndex === history.length - 1) {
      historyIndex = -1;
      input.value = draft;
      return;
    } else {
      historyIndex += 1;
    }

    input.value = history[historyIndex] ?? "";
    input.setSelectionRange(input.value.length, input.value.length);
  });
}

bindConsole();
