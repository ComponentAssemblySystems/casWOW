<!-- AGENT.md for casWOW -->
# Quick agent instructions for casWOW

Purpose: get an AI coding agent instantly productive editing this Eleventy site and making safe, testable changes.

- Project type: Eleventy (11ty) static site. Source in `src/`, built output in `docs/`.
- Library dependency: `@componentassemblysystems/caswow.library` is pinned to a release tag in `package.json` (`github:ComponentAssemblySystems/caswow.library#v<version>`). Eleventy copies its CSS, source map and fonts from `node_modules/@componentassemblysystems/caswow.library` directly into `docs/library/`. There are no local CSS source files.

Key commands (use exactly):

- `pnpm project-config` — install deps (including the pinned library release), copy vendor files, run initial build
- `pnpm link-cas` / `pnpm unlink-cas` — switch to the local `../caswow.library` and back to the pinned release. Never commit while linked: `pnpm-workspace.yaml` then carries a `link:` override
- `pnpm show` — start Eleventy in dev mode with auto-reload (ELEVENTY_ENV=dev)
- `pnpm build` — production build (Eleventy copies the library assets and generates pages)
- `pnpm css` — rebuild the site and copy the canonical library assets
- `pnpm copy-js`, `pnpm copy-chartjs`, `pnpm copy-cas` — copy vendor assets when needed

Important files and places to read first:

- `package.json` — canonical npm scripts and dependency list
- `src/_includes/base.njk` — global layout; where CSS/JS are injected and small DOM scripts live
- `src/_data/` — global site data (`meta.js`, `nav.json`) used by templates
- `src/js/` and `docs/js/` — project JS (renderDashboard.js, renderDataTable.js, app.js)
- `docs/` — built site assets (what will be deployed)

Project-specific patterns / rules to follow:

- Templates use Nunjucks and read frontmatter. When adding a page that requires the left navigation include in frontmatter, set:

  ```text
  page.sidebar: sidebar
  ```

- `base.njk` checks `page.sidebar` and includes either `sidebar.njk` or `cas-sidebar.njk`
- Vendor assets are copied into `dependencies/` and `src/dependencies/` via npm scripts — prefer using those scripts rather than inventing paths
- The library comes from the pinned release by default. If it's missing, run `pnpm install`; avoid removing imports

Gotchas and runtime checks:

- `base.njk` contains a small script that assumes a `.dialog-overview` element and a specific sibling structure — add null checks when modifying dialog markup to avoid runtime errors
- Chart.js may be loaded from CDN in templates; there is also a `copy-chartjs` script for a local copy — be consistent

Change contract (what to do when making edits):

1. Edit in `src/` (templates, css, js)
2. Run `pnpm show` for dev iteration or `pnpm css && pnpm build` for a production check
3. Verify `docs/` contains expected output and that vendor files exist in `dependencies/`
4. If you change global layout or scripts, check browser console for uncaught exceptions (dialog script is a common culprit)

If something is missing or ambiguous, add a short note to the PR explaining the assumption (e.g., "assume caswow.library v0.24.0 is installed").

If you want, I can also add:

- a GitHub Actions workflow to build `docs/` on push
- a small checklist template for PRs that touch layout or vendor assets

End of AGENT.md
