---
name: caswow-page
description: >
  Create or update pages in the casWOW Eleventy prototype. Use this skill whenever adding a new page, section, or route to casWOW — including "add a page for X", "create a new section", "add this to the sidebar nav", "build a dashboard page", "add a report view", or "create a Nunjucks template". Covers the full authoring workflow: frontmatter conventions, nav.json wiring, sidebar/layout selection, page-header breadcrumb levels, partial inclusion, Chart.js usage, and base.njk gotchas. Source files live in src/, output in docs/.
---

# caswow-page

A skill for creating and editing pages in the casWOW Eleventy prototype. The site uses Eleventy 3.x with Nunjucks templating, Bootstrap 5 for layout, and caswow.library for component styles.

---

## How casWOW pages work

- **Source**: `src/pages/<section>/index.md` (or `.njk`)
- **Output**: `docs/<section>/index.html`
- **Layout**: always `base.njk` (set in frontmatter)
- **Sidebar nav**: driven by `src/_data/nav.json`
- **Page header + breadcrumbs**: driven by `eleventyNavigation` frontmatter keys
- **Global layout**: `src/_includes/base.njk` — injects CSS, JS, header, sidebar, and page-header automatically

---

## Frontmatter reference

Every page starts with YAML frontmatter. Here is the full set of supported keys:

```yaml
---
layout: base.njk          # always base.njk — do not change
title: My Page            # displayed in <title> and page-header
description: ""           # optional meta description

# Sidebar
page.sidebar: sidebar     # include sidebar.njk (default app nav)
                          # use "cas-sidebar" for the CAS-branded sidebar
                          # omit entirely for full-width pages

# Page header / breadcrumbs (eleventyNavigation plugin)
eleventyNavigation:
  key: My Page            # unique nav key — also sets the breadcrumb label
  parent: Parent Section  # key of the parent page (level 2+)
  primaryParent: Top      # key of the top-level ancestor (level 3 only)
  order: 5                # sort order within the parent group
  level: 1                # 1 = top-level, 2 = child, 3 = grandchild

# Breadcrumbs
breadcrumbs: true         # show breadcrumb trail in page-header (default false)

# Page header visibility
page.pageHeader: false    # set to false to hide the page-header entirely

# Toolbar (optional — adds action buttons to the page-header)
toolBar: buttons
toolbarIcon: "fa-download"
---
```

**Breadcrumb depth** is controlled by `eleventyNavigation.level`:
- Level 1: `Dashboard > This Page`
- Level 2: `Dashboard > Parent > This Page`
- Level 3: `Dashboard > Top > Parent > This Page`

The `page-header.njk` partial reads these automatically — no additional template work needed.

---

## Sidebar options

`base.njk` checks `page.sidebar` and conditionally includes:

| Value | Includes |
|---|---|
| `sidebar` | `src/_includes/sidebar.njk` (standard app nav) |
| `cas-sidebar` | `src/_includes/cas-sidebar.njk` (CAS-branded) |
| *(omitted)* | No sidebar; full-width layout |

---

## Adding a page to the sidebar nav

Edit `src/_data/nav.json` to add a new entry. Order in this array controls sidebar order:

```json
[
  { "page": "Dashboard",        "link": "/" },
  { "page": "My New Page",      "link": "/my-page" },
  { "page": "Reports",          "link": "/reports" }
]
```

The `link` value must match the Eleventy output path — typically `/section-name/` for a file at `src/pages/section-name/index.md`.

---

## Page file structure

For a new page at `/my-page/`, create:

```
src/pages/my-page/
└── index.md        (or index.njk for complex templates)
```

**Markdown page example** (simple content):

```markdown
---
layout: base.njk
title: My Page
page.sidebar: sidebar
breadcrumbs: true
eleventyNavigation:
  key: My Page
  order: 4
  level: 1
---

<div class="container-fluid px-4">
  <div class="row">
    <div class="col-12">
      <!-- page content here -->
    </div>
  </div>
</div>
```

**Nunjucks page example** (dynamic content, partials, loops):

```njk
---
layout: base.njk
title: Reports
page.sidebar: sidebar
breadcrumbs: true
eleventyNavigation:
  key: Reports
  order: 5
  level: 1
---

<div class="container-fluid px-4">
  {% include "charts.njk" %}
</div>
```

---

## Using partials

Partials live in `src/_partials/` and are included with `{% include %}`. They have access to all frontmatter variables.

Available partials:

| Partial | Purpose |
|---|---|
| `card.njk` | Standard Bootstrap card wrapper |
| `charts.njk` | Chart.js canvas setup |
| `company-summary.njk` | KPI summary row |
| `job-cashflow-widget.njk` | Cashflow data widget |
| `stacked-tables.njk` | Stacked data table layout |
| `about_modal.njk` | Modal dialog |
| `alphabet-nav-pills.njk` | A–Z filter pill nav |

Partials in `src/_partials/nav/` handle navigation sub-components.

---

## Using Chart.js

Chart.js is loaded from CDN in `base.njk` (`https://cdn.jsdelivr.net/npm/chart.js`). A local copy is also available via `pnpm copy-chartjs` if you need an offline build — but be consistent; don't mix CDN and local references.

To add a chart to a page:

```html
<canvas id="myChart"></canvas>

<script>
  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [{
        label: 'Value',
        data: [100, 200, 150],
        backgroundColor: 'rgba(70, 130, 180, 0.6)',
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'top' } },
      scales: { y: { beginAtZero: true } }
    }
  });
</script>
```

Use CSS custom properties from caswow.library for chart colors where possible (`var(--bs-primary)`, `var(--cas-brand-yellow)`) rather than hardcoded hex values.

---

## Layout grid

Bootstrap 5 container/grid is the standard layout system. casWOW uses fluid containers:

```html
<div class="container-fluid px-4">
  <div class="row g-4">
    <div class="col-md-6"><!-- half width --></div>
    <div class="col-md-6"><!-- half width --></div>
  </div>
</div>
```

The `px-4` padding is standard for page content alignment with the sidebar.

---

## Known gotchas in base.njk

**Dialog script assumes `.dialog-overview` exists.** If your page doesn't have this element, the inline script in `base.njk` will throw a runtime error. Add a null check or avoid triggering the dialog script on pages without that element. When in doubt, open the browser console after adding a new page.

**Chart.js CDN vs. local.** `base.njk` loads Chart.js from CDN. The `copy-chartjs` script exists for local builds. If you switch one, switch both — mixed sources cause version conflicts.

**`page.pageHeader: false` must be boolean**, not a string. YAML `false` (no quotes) is correct; `"false"` (quoted) evaluates as truthy.

**Eleventy path prefix.** `eleventy.config.js` sets `pathPrefix: '/casWOW/'`. All asset references in templates use the `| url` filter (`{{ '/css/site.css' | url }}`) to apply this prefix — don't hardcode absolute paths.

---

## After adding a page

1. Run `pnpm show` (dev server with live reload) and navigate to the new route
2. Confirm the page appears in the sidebar nav at the correct position
3. Check the browser console for uncaught JS errors (dialog script is the most common culprit)
4. Verify breadcrumbs render correctly at the right depth
5. Run `pnpm build` for a production build and confirm `docs/<page>/index.html` exists
