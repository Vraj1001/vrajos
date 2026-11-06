# VrajOS

A retro desktop portfolio for **Vraj Bhatt**, a third-year B.Tech Artificial
Intelligence & Data Science student at NMIMS MPSTME, Navi Mumbai. It behaves
like a small Windows 98/2000-era operating system: boot sequence, desktop icons,
draggable and resizable windows, a Start menu, a taskbar with a live clock, and
applications that actually work.

> **Deployment status:** not deployed yet. The project is production-buildable and
> includes an `amplify.yml` build spec, but no live URL exists. The steps below
> take it from a clean checkout to an AWS Amplify Hosting deployment.

---

## Highlights

- **Authentic visual system** — muted teal desktop, warm silver chrome, navy
  gradient title bars, 3D bevels, pixel display type, and a real system clock.
- **Working window manager** — open, close, minimise, maximise, restore, drag,
  resize, focus/z-index ordering, taskbar switching, and multiple simultaneous
  windows. Windows are keyboard-accessible and clamped to the viewport.
- **Eight applications**
  - **My Computer** — places sidebar, folder grid, system information.
  - **About Me** — short story, education, timeline, current focus.
  - **Projects** — eight real projects with search, category filters, preview
    pane, and full project sheets.
  - **Skills** — grouped skill tabs with arrow-key navigation.
  - **Beyond Technology** — photography, edits, games, football, films, fragrance.
  - **Resume** — paper-styled resume view with print support.
  - **Contact** — editable contact cards (see [Content editing](#content-editing)).
  - **Recycle Bin** — the signature easter egg: six fictional "deleted" files,
    each with its own dialog, plus restore, delete, empty and undo flows.
- **Desktop extras**
  - Three wallpapers via **Display Properties**: Classic Teal, Deep Dusk, Blueprint.
  - Right-click desktop context menu.
  - **Terminal** with working commands (`help`, `neofetch`, `projects`,
    `open skills`, `wallpaper dusk`, `clear`, and more).
  - **Notes** scratchpad that persists in `localStorage`.
  - Sticky note pointing at the Recycle Bin.
- **Start menu** with search, keyboard navigation, and a Shortcuts list.
- **Boot and Shut Down flows** — a 1–2 second boot screen with a skip button,
  and a Shut Down / Restart sequence that can always be recovered from.
- **Mobile support** — below 760 px the desktop becomes a launcher with
  full-screen app windows and touch-friendly controls.
- **Respectful motion** — small CSS transitions only, disabled under
  `prefers-reduced-motion`.

---

## Tech stack

| Layer      | Choice                                             |
| ---------- | -------------------------------------------------- |
| Framework  | React 19.3 + TypeScript 5.9                         |
| Build tool | Vite 8                                             |
| Styling    | Hand-written CSS (custom properties, no framework)  |
| Icons      | Lucide React + a small set of custom OS SVGs        |
| Fonts      | Silkscreen (display), Tahoma stack (UI), Georgia (resume) |

No UI component library and no animation library: the retro chrome depends on
precise bevels and gradients, which are easier to control directly in CSS.

### Dependencies

```json
"dependencies": {
  "lucide-react": "^1.70.0",
  "react": "^19.3.1",
  "react-dom": "^19.3.1"
}
```

Dev dependencies: `@types/react`, `@types/react-dom`, `@vitejs/plugin-react`,
`typescript`, `vite`.

---

## Getting started

Requirements: **Node.js 20+** and npm.

```bash
npm install       # install dependencies
npm run dev       # start Vite at http://localhost:5173
npm run dev:lan   # expose Vite to other devices on the same Wi-Fi
npm run typecheck # tsc, no emit
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
```

To open VrajOS on a phone or another computer on the same network, run
`npm run dev:lan` and use the **Network** URL printed by Vite (for example
`http://192.168.31.150:5173`). Both devices must be on the same Wi-Fi and the
firewall must allow Node.js on private/public networks. For access from outside
the network, deploy the build (see [AWS Amplify](#deployment-on-aws-amplify-hosting))
or use a temporary tunnel such as `npx localtunnel --port 5173`.

The production build is a static site. `dist/` can be hosted anywhere that
serves static files.

---

## Project structure

```text
.
├── amplify.yml                 # AWS Amplify Hosting build spec
├── index.html
├── public/
│   └── favicon.svg
├── screenshots/                # Playwright captures at five viewport sizes
└── src/
    ├── main.tsx                # createRoot entry
    ├── App.tsx                 # boot gate + desktop shell
    ├── apps/                   # one component per application
    │   ├── AboutApp.tsx
    │   ├── BeyondApp.tsx
    │   ├── ContactApp.tsx
    │   ├── DisplayApp.tsx
    │   ├── MyComputerApp.tsx
    │   ├── NotesApp.tsx
    │   ├── ProjectDetailApp.tsx
    │   ├── ProjectsApp.tsx
    │   ├── RecycleBinApp.tsx
    │   ├── ResumeApp.tsx
    │   ├── SkillsApp.tsx
    │   └── TerminalApp.tsx
    ├── content/                # all editable copy and data
    │   ├── interests.ts
    │   ├── profile.ts
    │   ├── projects.ts
    │   ├── recycleBin.ts
    │   └── skills.ts
    ├── os/                     # desktop shell and window manager
    │   ├── DesktopContext.tsx  # reducer: windows, wallpaper, bin, toasts
    │   ├── Window.tsx          # drag, resize, maximise, focus
    │   ├── WindowDialog.tsx    # portaled, focus-trapped modal
    │   ├── DesktopShell.tsx
    │   ├── Desktop.tsx
    │   ├── Taskbar.tsx
    │   ├── StartMenu.tsx
    │   ├── BootScreen.tsx
    │   ├── Shutdown.tsx
    │   ├── DesktopContextMenu.tsx
    │   ├── AppChrome.tsx       # shared menu/address/status bars
    │   ├── appRegistry.ts      # app metadata (kept separate from components)
    │   └── ...
    └── styles/
        ├── base.css            # reset, tokens, typography
        ├── os.css              # wallpapers, windows, taskbar, menus, dialogs
        ├── apps.css            # per-app layouts
        └── beyond.css          # Beyond Technology styling
```

The window manager is a single `useReducer` store in
`src/os/DesktopContext.tsx`. App metadata lives in `src/os/appRegistry.ts` and
is intentionally separate from the app components to avoid circular imports.

---

## Content editing

Everything personal lives in `src/content/`. No contact details, repositories,
demo URLs, awards or internships were invented.

### Contact details (currently placeholders)

Edit `src/content/profile.ts`:

```ts
contact: {
  email:    { value: "", placeholder: "your.email@example.com", ... },
  github:   { value: "", placeholder: "github.com/your-handle", ... },
  linkedin: { value: "", placeholder: "linkedin.com/in/your-handle", ... },
}
```

While a `value` is empty, the Contact app shows a clearly labelled placeholder
card and **no link**. Once a value is filled in, the card becomes a working
`mailto:` or external link automatically.

### Resume PDF

`profile.resume.available` is `false` and no PDF ships with the project. The
Resume app renders the full resume as an on-screen document and supports
printing. To attach a file:

1. Drop the PDF into `public/` (for example `public/Vraj_Bhatt_Resume.pdf`).
2. Set `resume.available` to `true`, keep `fileName` in sync with the file, and
   update `resume.note`.
3. Add a download link to `public/<file>` in `ResumeApp.tsx` if you want a
   one-click download. The current UI deliberately shows no download button while
   `available` is `false`, so there is no dead control.

### Projects

`src/content/projects.ts` holds the eight projects. `repoUrl` and `demoUrl` are
`null` for every entry, so the UI honestly shows **Coming soon** / **Not
available** instead of dead links. Fill them in when public URLs exist.

### Other copy

- `src/content/skills.ts` — skill groups and levels.
- `src/content/interests.ts` — Beyond Technology sections.
- `src/content/recycleBin.ts` — the six fictional deleted files and their
  dialog copy.
- `src/content/profile.ts` — bio, education, current focus.

---

## Deployment on AWS Amplify Hosting

`amplify.yml` is committed and ready:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - "**/*"
  cache:
    paths:
      - node_modules/**/*
```

### Option A — Amplify console (Git provider)

1. Push this repository to GitHub, GitLab, or Bitbucket. This project is already
   initialised as a git repository on `main` with an `origin` remote on GitHub.
2. Open the [AWS Amplify console](https://console.aws.amazon.com/amplify/) and
   choose **Host your web app** → **GitHub** (or your provider).
3. Authorise Amplify and select the repository and branch.
4. Amplify should detect the build spec automatically. If not, choose
   **Use a build specification file** and keep the default path `amplify.yml`.
5. Confirm the app name, then **Save and deploy**. The first build installs with
   `npm ci`, runs `npm run build`, and publishes `dist/`.
6. When the build finishes, open the generated `https://<branch>.<app-id>.amplifyapp.com`
   URL. Add a custom domain under **Domain management** if needed.

No SPA rewrite rule is required: VrajOS has no client-side router and only
serves `/`.

### Option B — Amplify CLI

```bash
npm install -g @aws-amplify/cli
amplify configure
amplify init
amplify add hosting
# choose "Amazon CloudFront and S3" (static hosting)
amplify publish
```

### Option C — any static host

```bash
npm run build
# upload the contents of dist/
```

Because the site uses relative asset paths generated by Vite, it also works from
an S3 bucket or a subdirectory.

---

## Testing

The build was tested interactively with **Playwright MCP** against the Vite dev
server. Verified flows:

- Boot screen: skip with `Esc`, automatic boot completes in about 2 seconds.
- Window manager: open, focus, minimise/restore, maximise/restore, drag, resize,
  taskbar switching, minimise all, close all.
- Start menu: open, search, `Enter` to launch, `Esc` to close.
- Projects: search, "no results" state with a Clear search action, category
  filters, preview pane, project sheets; mobile single-tap opens the detail.
- My Computer: toolbar **Open** is disabled until a folder is selected.
- Recycle Bin: all six files open, restore replies, Confirm File Delete
  (cancel and empty), undo of an empty bin, `Esc` to close, focus trap, and the
  dialog is portaled above the taskbar.
- Terminal: `neofetch`, `projects`, `open skills`, `clear`.
- Contact: placeholder cards render zero anchors; copy-to-clipboard toast.
- Resume: navigation from resume to a project and to Contact.
- Skills: tab selection and arrow-key navigation.
- Display Properties: wallpaper preview, switching, and persistence across
  reload (`vrajos:wallpaper`).
- Notes: autosave and restore from `localStorage` (`vrajos:scratchpad`).
- Shut Down → saving screen → powered off → restart, including window reset.
- Responsive layout at **1920×1080, 1366×768, 1024×768, 768×1024 and 390×844**.
- Console clean: 0 errors, 0 warnings.

Latest results:

```text
npm run typecheck  ✓ (tsc --noEmit)
npm run build      ✓ 2095 modules transformed
                   dist/index.html                1.17 kB │ gzip:  0.59 kB
                   dist/assets/index-*.css        78.28 kB │ gzip: 16.29 kB
                   dist/assets/index-*.js        343.81 kB │ gzip: 103.32 kB
```

### Screenshots

Captured during testing and stored in `screenshots/`:

| What                     | File                                          |
| ------------------------ | --------------------------------------------- |
| Desktop at 1920×1080     | `screenshots/01-desktop-1920.png`             |
| Desktop at 1366×768      | `screenshots/desktop-1366x768.png`            |
| Desktop at 1024×768      | `screenshots/desktop-1024x768.png`            |
| Projects app             | `screenshots/1366x768-projects.png`           |
| Recycle Bin              | `screenshots/app-recycle.png`                 |
| Mobile Start menu        | `screenshots/390x844-start.png`               |
| Mobile project detail    | `screenshots/mobile-project-detail-tap.png`   |

Per-app captures at 1920×1080, 1366×768, 1024×768, 768×1024 and 390×844 are also
included. To regenerate them, run the dev server and use Playwright with the
listed viewport sizes.

---

## Accessibility notes

- Windows are labelled dialogs; title-bar controls and menus are real buttons.
- `WindowDialog` traps focus, closes on `Esc`, and is portaled to `document.body`
  so it sits above the taskbar.
- Desktop icons are buttons and support `Enter` to open; a skip link jumps to
  the app area.
- Focus-visible outlines are preserved; icon-only controls have `aria-label`s.
- Animations are disabled under `prefers-reduced-motion: reduce`.

---

## Known limitations / remaining tasks

- **Not deployed.** No live URL; see the Amplify steps above.
- **Contact details are intentionally empty.** Fill in `src/content/profile.ts`.
- **No resume PDF attached.** Add one to `public/` if you want a downloadable file.
- **All repository and demo URLs are `null`.** Add real links in
  `src/content/projects.ts` when available.
- The app is a portfolio piece, not a real OS: the Terminal is a themed
  command palette, not a shell, and all Recycle Bin files are fictional.
