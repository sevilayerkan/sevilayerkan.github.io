const READY_ATTR = "data-xp-dialog-ready";

function isXpDialog(node: EventTarget | null): node is HTMLDialogElement {
  return node instanceof HTMLDialogElement && node.hasAttribute("data-xp-dialog");
}

function openDialogs(): HTMLDialogElement[] {
  return [...document.querySelectorAll<HTMLDialogElement>("dialog[data-xp-dialog][open]")];
}

function setScrollLock(locked: boolean): void {
  document.documentElement.classList.toggle("xp-dialog-open", locked);
}

function closeOthers(keep: HTMLDialogElement): void {
  for (const dialog of openDialogs()) {
    if (dialog !== keep) {
      dialog.close();
    }
  }
}

function focusDialog(dialog: HTMLDialogElement): void {
  const preferred = dialog.querySelector<HTMLElement>("[data-xp-initial-focus]");
  if (preferred) {
    preferred.focus();
    if (preferred instanceof HTMLInputElement) {
      preferred.select();
    }
    return;
  }

  const title = dialog.querySelector<HTMLElement>(".xp-dialog__title");
  title?.focus();
}

function restoreFocus(trigger: Element | null): void {
  if (trigger instanceof HTMLElement && document.contains(trigger)) {
    trigger.focus();
  }
}

function openFromTrigger(trigger: HTMLElement): void {
  const id = trigger.getAttribute("data-xp-dialog-open");
  if (!id) {
    return;
  }

  openXpDialog(id, trigger);
}

export function openXpDialog(
  id: string,
  opener: HTMLElement | null = null,
): HTMLDialogElement | null {
  const dialog = document.getElementById(id);

  if (!isXpDialog(dialog)) {
    return null;
  }

  const restoreTarget =
    opener ??
    document.querySelector<HTMLElement>(`[data-xp-dialog-open="${id}"]`);

  document
    .querySelectorAll(`[data-xp-dialog-open="${id}"][data-xp-dialog-opener]`)
    .forEach((node) => node.removeAttribute("data-xp-dialog-opener"));

  restoreTarget?.setAttribute("data-xp-dialog-opener", "true");

  if (!dialog.open) {
    closeOthers(dialog);
    dialog.showModal();
    setScrollLock(true);
  }

  focusDialog(dialog);
  return dialog;
}

function onDialogClosed(dialog: HTMLDialogElement): void {
  if (openDialogs().length === 0) {
    setScrollLock(false);
  }

  const opener = document.querySelector<HTMLElement>(
    `[data-xp-dialog-open="${dialog.id}"][data-xp-dialog-opener]`,
  );
  opener?.removeAttribute("data-xp-dialog-opener");
  restoreFocus(opener);
}

export function bindXpDialogs(): void {
  if (document.documentElement.hasAttribute(READY_ATTR)) {
    return;
  }

  document.documentElement.setAttribute(READY_ATTR, "");

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const opener = target.closest<HTMLElement>("[data-xp-dialog-open]");
    if (opener) {
      event.preventDefault();
      openFromTrigger(opener);
      return;
    }

    if (target.closest("[data-xp-dialog-close]")) {
      const dialog = target.closest("dialog");
      if (isXpDialog(dialog)) {
        dialog.close();
      }
      return;
    }

    if (isXpDialog(target)) {
      target.close();
    }
  });

  document.addEventListener(
    "close",
    (event) => {
      if (isXpDialog(event.target)) {
        onDialogClosed(event.target);
      }
    },
    true,
  );
}

bindXpDialogs();
