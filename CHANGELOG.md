# Changelog

## [Unreleased]

### Changed

- Unified financial project layouts, clarified the demo office/data scope, persisted the library theme with a dark dashboard surface, strengthened selected navigation and corrected breadcrumbs, and restored XPress baseline help and visible chart-filter scope
  — `src/_includes/`, `src/pages/`, `src/js/` (design consistency and accessible context using library styles and Bootstrap; regression coverage for theme and chart/table/CSV synchronization)

- Updated Project costs to the supplied N819 reference with a project heading, four financial metrics, and responsive project/contact and billing panels using only library Bootstrap classes
  — `src/pages/project-costs/`, `src/_includes/workspace.njk` (shared illustrative financial data and project export)

- Removed unused CSS copies and obsolete stylesheet maps from source, output and vendor directories; removed scripts that recreated them and updated existing setup instructions
  — `src/css/`, `src/dependencies/css/`, `docs/css/`, `dependencies/css/`, `docs/library/`, `package.json` (retain only the canonical library stylesheet, its source map and fonts)

- Replaced custom navigation, tables, metric grids and page styling with Bootstrap 5 classes from caswow.css; removed extra stylesheet loading and the legacy CSS compilation step
  — `src/_includes/`, `src/pages/`, `.eleventy.js`, `package.json`, `src/js/workspace.js` (preserve the library stylesheet as the sole visual source of truth)

- Replaced remaining legacy pages and placeholders with library-based cost analysis, reports, vendor and employee directories, drawing previews, component examples, scripted chat, and a page directory
  — `src/pages/`, `src/_data/samples.js`, `src/_includes/workspace.njk`, `src/js/workspace.js` (sample layouts with working filters, previews and exports)

- Updated Dashboard, XPress, and Project information with library components, shared illustrative data, meaningful labels, accessible chart data, and project-specific navigation
  — `src/_includes/workspace.njk`, `src/_includes/overview.njk`, `src/_includes/project-details.njk`, `src/pages/`, `src/_data/reviewed.js` (first three screens of the design refresh)

### Fixed

- Restored bundled Font Awesome 7 CSS and webfonts, plus navigation, office, theme, print/export and chart-option icons with accessible labels
  — `.eleventy.js`, `src/_includes/`, `docs/vendor/fontawesome/` (icon-only vendor styles alongside canonical caswow.css)

- Replaced the dashboard timeframe badge with a dropdown that filters all four charts, chart data tables and exported chart rows to six months, three months or October
  — `src/_includes/workspace.njk`, `src/_includes/overview.njk`, `src/js/workspace.js` (use available sample months; preserve overall location totals)

- Apply the requested #F4F6F7 body background only to dashboard screens
  — `src/_includes/workspace.njk` (correct the conditional; retain other page backgrounds)

- Restored the office dropdown on every shared page using the existing company list, accessible Bootstrap controls and a selection remembered across navigation
  — `src/_includes/workspace.njk`, `src/js/workspace.js` (demo selection does not change sample records)

- Bundle caswow.library CSS and fonts together, use local Chart.js, and implement status/search filters, chart hiding/restoring, print and CSV export for the refreshed screens
  — `.eleventy.js`, `src/js/workspace.js`, `src/css/workspace.css` (replace conflicting legacy styles and inert demo controls on these screens)

- Corrected the production build command so it generates Eleventy pages after compiling styles, and added generated-screen integrity checks
  — `package.json`, `tests/screens.test.cjs` (prevent stale page output and mismatched project identities)

- Added working sample-directory and report filters, drawing preview dialogs, local-only chat/form interactions, and complete legacy/error-page layouts
  — `src/js/workspace.js`, `src/404.njk`, `src/index-old.njk`, `src/_includes/sample-chat.njk` (no remote services or live records used)

- Added checks for all application routes, bundled assets, project identity, and reconciled sample cost/hour totals
  — `tests/screens.test.cjs`, `src/_data/samples.js`, `src/_data/reviewed.js` (align N819 sample activity date with its October ledger)
