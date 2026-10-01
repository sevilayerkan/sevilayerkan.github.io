# Sevilay Erkan — personal site

Astro + TypeScript personal engineering site. Windows XP inspired, not a desktop simulator. Static output, no CMS, no React/Vue/Tailwind.

Identity: **QA Engineer who tests, automates and builds things.**

Default language is **Turkish** (`/tr/`). English lives at `/en/`. Root `/` redirects to the saved locale, or Turkish if none is saved.

---

## Features

What is already on the site (so you do not have to remember later):

### Pages

| Route | What it is |
| --- | --- |
| `/` | Redirects to `/tr/` or `/en/` from `localStorage` (`xp-locale`) |
| `/tr/` · `/en/` | Home: system properties, skills, notes, task manager, contact |
| `/tr/projects` · `/en/projects` | Projects explorer; icons can open XP properties before you go further |
| `/tr/blog` · `/en/blog` | Engineering notes index (Content Collections) |
| `/tr/blog/[slug]` · `/en/blog/[slug]` | Post |
| `/tr/about` · `/en/about` | About |
| `/tr/streams` · `/en/streams` | Streams (links come from site config) |
| `/tr/contact` · `/en/contact` | Contact |
| `404` | BSOD-style error page (no taskbar). Copy follows `/en/` or `/tr/` in the URL, otherwise saved `xp-locale`. Home returns to that locale’s home. |

There is no unprefixed `/about` etc. Always `/tr/...` or `/en/...`.

### Theme (XP Light / XP Dark)

- Taskbar tray: **monitor button** → Display Properties
- Choice is stored in `localStorage` as `xp-theme` (`xp-light` or `xp-dark`)
- Until you pick one, the first visit follows `prefers-color-scheme`
- Dark mode still uses the XP tokens, not a generic dark skin

### Language (TR / EN)

- Taskbar tray: **TR** / **EN** button → Regional and Language Options
- Choice is stored in `localStorage` as `xp-locale`
- UI copy lives in `src/i18n/tr.ts` and `src/i18n/en.ts` (no i18n library)
- Blog posts are **not** auto-translated. Each Markdown file has a `locale` field; switching language on a post that has no other-language version falls back to that language’s blog index

### Run / Çalıştır (command palette)

XP Run box on pages that have the taskbar. Theme and language stay as they are. Internal commands use the **current** locale.

**Open**

- Taskbar tray: **Çalıştır** (TR) / **Run** (EN)
- Keyboard: **Ctrl+Alt+R** (Win+R is the OS; Ctrl+R refreshes the browser)

**Use**

- Type a command → **Çalıştır** / **Run** or **Enter**
- **İptal** / **Cancel** or **Escape** closes
- `help` lists commands in the same dialog
- Unknown or empty input: small XP error in the same dialog (it stays open)

**Commands** (case-insensitive)

| Command | What it does |
| --- | --- |
| `home` | Home for the current language |
| `projects` | Projects |
| `blog` | Blog index |
| `about` | About |
| `streams` | Streams |
| `contact` | Contact |
| `github` | GitHub from `src/config/site.ts`, new tab |
| `linkedin` | LinkedIn from `src/config/site.ts`, new tab |
| `help` | Shows this list in the dialog |

If a GitHub or LinkedIn URL is missing from `src/config/site.ts`, the dialog stays open and says the link is missing.

### Hidden console (easter egg)

No nav link. Opens only from:

- Clicking the **penguin** in the taskbar tray
- Typing `penguin.exe` in the Run dialog (not listed in Run’s `help`)

XP command-prompt look: dark body, monospace, one input line. **Enter** runs a command, **Up/Down** recalls this page’s history, **Escape** closes. Theme and language stay as they are. This is not a real shell (no `eval`, no system info).

**Commands** (case-insensitive): `help`, `whoami`, `projects`, `blog`, `about`, `streams`, `contact`, `clear`, `date`, `penguin`, `exit`.

Navigation commands use the current locale. `clear` wipes output, `exit` closes, unknown commands get a cmd-style “not recognized” line.

### Other XP chrome

- **Start** on the taskbar goes home
- Window **minimize / maximize / close** and explorer **menu** open small XP dialogs (they do not actually minimize the browser)
- Project / skill icons can open properties dialogs
- Footer tray penguin opens the hidden console; Online is status text
- Penguin stays a small easter egg (cap: a few appearances, not the brand). 404 recovery copy mentions it too

---

## Local development

```bash
npm install
npm run dev
npm run build
npm run preview
```

- `dev` — `http://localhost:4321`
- `build` — static files in `dist/`
- `preview` — serve the production build

Stack: Astro, TypeScript, custom CSS, Content Collections, a little vanilla JS (`src/scripts/`). No extra UI libraries.
