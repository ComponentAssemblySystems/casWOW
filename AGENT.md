<!-- AGENT.md for casWOW -->
# Quick agent instructions for casWOW

Purpose: get an AI coding agent instantly productive editing this Eleventy site and making safe, testable changes.

- Project type: Eleventy (11ty) static site. Source in `src/`, built output in `docs/`.
- Local dependency: `caswow.library` is used as a linked npm package and its CSS is copied into `src/css/` by `npm run copy-cas`.

Key commands (use exactly):

- `npm run config` — install deps, link `caswow.library`, copy vendor files, run initial build
- `npm run show` — start Eleventy in dev mode with auto-reload (ELEVENTY_ENV=dev)
- `npm run build` — production build (runs css pipeline then eleventy)
- `npm run css` — compile SASS and run autoprefixer
- `npm run copy-css`, `npm run copy-js`, `npm run copy-fa`, `npm run copy-chartjs`, `npm run copy-cas` — copy vendor assets when needed

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
- `caswow.library` is normally linked (npm link). If it's not present, avoid removing imports; instead add a fallback or document the missing dependency

Gotchas and runtime checks:

- `base.njk` contains a small script that assumes a `.dialog-overview` element and a specific sibling structure — add null checks when modifying dialog markup to avoid runtime errors
- Chart.js may be loaded from CDN in templates; there is also a `copy-chartjs` script for a local copy — be consistent

Change contract (what to do when making edits):

1. Edit in `src/` (templates, css, js)
2. Run `npm run show` for dev iteration or `npm run css && npm run build` for a production check
3. Verify `docs/` contains expected output and that vendor files exist in `dependencies/`
4. If you change global layout or scripts, check browser console for uncaught exceptions (dialog script is a common culprit)

If something is missing or ambiguous, add a short note to the PR explaining the assumption (e.g., "assume caswow.library installed via npm link").

If you want, I can also add:

- a GitHub Actions workflow to build `docs/` on push
- a small checklist template for PRs that touch layout or vendor assets

End of AGENT.md
