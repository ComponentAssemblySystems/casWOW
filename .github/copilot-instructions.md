<!-- .github/copilot-instructions.md -->
# Local AI coding instructions for casWOW

These notes are meant to get an AI coding agent immediately productive in this repository. They focus on the actual structure, build/developer commands, and patterns an agent will need to follow when making edits.

1) Big picture
- This is an Eleventy (11ty) static site project. Source content lives under `src/` and Eleventy outputs into `docs/` (the site-ready assets). Key areas:
  - `src/` — source templates, data, assets. (Nunjucks templates under `src/_includes`, data under `src/_data`)
  - `docs/` — generated site and copied/compiled assets (CSS, JS, webfonts). The repo serves `docs/` as the built site.
  - `dependencies/` and `src/dependencies/` — vendor files copied here from node_modules by npm scripts.

2) Important scripts & developer workflow (use these exact commands)
- Bootstrap / first-setup (links the local `caswow.library` and copies vendor assets):
  - pnpm project-config — installs, `pnpm link caswow.library`, copies cas css and other vendor assets, and runs the Eleventy build.
  - If you prefer manual linking: in the `caswow.library` repo run `pnpm link`, then in this repo run `pnpm link caswow.library` and `pnpm copy-cas`.

- Local dev server / iterate templates:
  - pnpm show — starts Eleventy in dev mode (sets ELEVENTY_ENV=dev) and serves with auto-reload.
  - pnpm watch:eleventy — equivalent eleventy serve command.

- Build for production:
  - pnpm css — compiles SASS and runs postcss/autoprefixer (produces `docs/css/` files).
  - pnpm build — sets ELEVENTY_ENV=prod, runs CSS pipeline then Eleventy.

- Useful asset-copy helpers (run when vendor files change or after npm install):
  - pnpm copy-css, pnpm copy-js, pnpm copy-fa, pnpm copy-chartjs, pnpm copy-cas

3) Project-specific conventions & patterns
- Template engine: Nunjucks. Shared layout at `src/_includes/base.njk` — note it reads `meta` data (from `src/_data/meta.*`) and sets `pageTitle` and `pageDescription` using frontmatter variables `title`/`description`.
  - Example dynamic behavior: `base.njk` checks `page.sidebar`. If `page.sidebar == "sidebar"` it includes `sidebar.njk`; otherwise it falls back to `cas-sidebar.njk`. When adding a page that needs the left navigation, set `page.sidebar: "sidebar"` in frontmatter.

- Local library dependency: `caswow.library` is consumed via a local link by default (`package.json` shows `"caswow.library": "file:../caswow.library"`). The canonical setup uses `npm link caswow.library` + `pnpm copy-cas` which copies `node_modules/caswow.library/css/caswow.css` -> `src/css/caswow.css`.

- Asset locations
  - Vendor CSS/JS used for the built site are copied into `dependencies/css`, `dependencies/js`, `dependencies/webfonts` (scripts under `package.json` perform these copies). The `docs/` folder contains compiled site assets used for hosting.
  - `src/js/` contains the project javascript sources (e.g. `renderDataTable.js`, `renderDashboard.js`, `app.js`). The templates include them near the bottom of `base.njk`.

4) Integration & runtime gotchas (things that cause common runtime errors)
- `base.njk` contains a small script assuming the presence of an element `.dialog-overview` and that the next sibling is the open button; editing dialog markup should preserve this relationship or update the script to safely null-check elements to avoid uncaught exceptions.
- Chart.js is sometimes loaded from CDN in `base.njk` and there is also a `copy-chartjs` script that places a local copy under `dependencies/js/`; be consistent when switching between local and CDN versions.

5) How to add a page or change layout (example)
- To add a new page:
  - create `src/pages/my-page.md` (or .njk) with frontmatter:
    ---
    title: My Page
    description: Short description
    page.sidebar: sidebar   # or omit for cas-sidebar
    ---
  - Edit templates in `src/_includes/` when you need new shared UI (header/footer/sidebar).
  - Run `pnpm show` and verify `http://localhost:8080` (or console output port).

6) Files to look at when debugging
- `package.json` — build/dev scripts and vendor copy helpers.
- `src/_includes/base.njk` — global layout and where JS/CSS are injected.
- `src/_data/` — global site metadata (`meta.js`, `nav.json`) used by layouts.
- `src/js/*` and `docs/js/*` — JS behavior for dashboards/tables; when broken, check console and then these files.

7) Quick engineering contract for changes
- Inputs: change to templates, styles, or JS under `src/`.
- Outputs: deterministic Eleventy build under `docs/` and copied vendor assets in `dependencies/`.
- Error modes to watch for: missing vendor assets (run copy-* scripts), unhandled DOM queries added to `base.njk` (add null checks), broken frontmatter (11ty will skip rendering as expected).

8) Edge cases / common tasks
- If updating Font Awesome or bootstrap, run `pnpm copy-fa`, `pnpm copy-css`, `pnpm copy-js` and then rebuild.
- If caswow.library changes, either `npm link` again from the library repo, or run `pnpm config` to re-link and copy its CSS.

If anything here is out-of-date or you want deeper coverage (example tests, CI steps, or specific coding style rules), tell me which area to expand and I'll iterate.

9) Storybook usage in this repo
- Storybook stories should be written in standard JavaScript, not React. Use the default Storybook JS format (exported functions, not JSX or React components).
- Example: For a button, export stories as functions that return DOM elements or use helper functions (e.g., `createButton`).
- Do not use JSX or React syntax in stories unless explicitly requested.
