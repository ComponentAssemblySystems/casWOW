# casWOW Design System Integration Rules

## 1. Token Definitions

- **Location:**

  - Design tokens (colors, typography, spacing) are defined in CSS files under `src/css/` and compiled/copied to `docs/css/`.
  - Example: `src/css/caswow.css`, `docs/css/variables.css`, `docs/css/colors.css`.

- **Format/Structure:**

  - Tokens are defined as CSS custom properties (variables).
  - Example:

    ```css
    :root {
      --color-primary: #0057b8;
      --font-size-base: 16px;
      --spacing-md: 1rem;
    }
    ```

- **Transformation System:**
  - SASS is used for preprocessing and token management (`npm run css` compiles SASS and runs postcss/autoprefixer).
  - Output is deterministic and placed in `docs/css/`.

---

## 2. Component Library

- **Location:**

  - UI components are defined as Nunjucks templates in `src/_includes/` and partials in `src/_partials/`.
  - Example: `src/_includes/base.njk`, `src/_partials/card/`.

- **Architecture:**

  - Components are template-based (Nunjucks), not JS frameworks.
  - Shared layouts and partials are used for composition.

- **Documentation/Storybook:**
  - No Storybook or automated component documentation detected.
  - Component usage is documented via template structure and frontmatter in markdown files.

---

## 3. Frameworks & Libraries

- **UI Frameworks:**

  - No React, Vue, or similar JS frameworks.
  - Uses Nunjucks for templating.

- **Styling Libraries:**

  - SASS for CSS preprocessing.
  - Bootstrap and Font Awesome as vendor CSS/JS (see `dependencies/css/`, `dependencies/js/`).

- **Build System/Bundler:**
  - Eleventy (11ty) static site generator.
  - Build scripts in `package.json` (`npm run build`, `npm run css`, etc.).

---

## 4. Asset Management

- **Storage/Reference:**

  - Images and webfonts in `src/img/`, `src/webfonts/`, copied to `docs/img/`, `docs/webfonts/`.
  - Vendor assets in `dependencies/` and `src/dependencies/`.

- **Optimization:**

  - No explicit image optimization pipeline detected.
  - CSS/JS are minified and mapped (see `.css.map` files).

- **CDN:**
  - Chart.js may be loaded from CDN in templates.
  - No global CDN configuration detected.

---

## 5. Icon System

- **Storage:**

  - Font Awesome webfonts in `dependencies/webfonts/` and `docs/webfonts/`.
  - CSS for icons in `dependencies/css/fa.min.css`, `docs/css/fontawesome.css`.

- **Usage:**

  - Icons are referenced via Font Awesome classes in templates.
  - Example:

    ```html
    <i class="fa fa-user"></i>
    ```

- **Naming Convention:**
  - Follows Font Awesome's class naming (`fa-` prefix).

---

## 6. Styling Approach

- **Methodology:**

  - Global CSS with SASS preprocessing.
  - No CSS Modules or CSS-in-JS.

- **Global Styles:**

  - Defined in `src/css/`, compiled to `docs/css/`.
  - Example: `caswow.css`, `site.css`, `variables.css`.

- **Responsive Design:**
  - Bootstrap is used for responsive grid/layout.
  - Custom media queries may be present in SASS/CSS.

---

## 7. Project Structure

- **Organization:**

  - Source files in `src/` (templates, data, assets).
  - Built site in `docs/`.
  - Vendor assets in `dependencies/`.
  - JS behavior in `src/js/` and `docs/js/`.

- **Feature Patterns:**
  - Pages in `src/pages/` (markdown or Nunjucks).
  - Shared layouts in `src/_includes/`.
  - Data in `src/_data/` (JS/JSON).

---

## Example Patterns

### Design Token Usage

```css
/* src/css/variables.css */
:root {
  --color-accent: #e63946;
  --font-size-lg: 1.25rem;
}
```

### Component Inclusion

```njk
{# src/_includes/base.njk #}
{% include "sidebar.njk" %}
```

### Asset Reference

```html
<img src="/img/CAS_logo.svg" alt="CAS Logo" />
```

### Icon Usage

```html
<i class="fa fa-check"></i>
```

### Responsive Layout

```html
<div class="container">
  <div class="row">
    <div class="col-md-6">...</div>
    <div class="col-md-6">...</div>
  </div>
</div>
```

---

## Integration Guidance

- **Figma tokens** should be mapped to CSS custom properties in `src/css/variables.css` or similar.
- **Figma components** should be translated to Nunjucks partials/templates in `src/_includes/` or `src/_partials/`.
- **Icons** from Figma should use Font Awesome classes if available, or add new SVGs to `src/img/` and reference accordingly.
- **Assets** should be placed in `src/img/` or `src/webfonts/` and referenced with relative paths.
- **Global styles** and responsive rules should be added to SASS files in `src/css/`.

---

For further details, see:

- `.github/copilot-instructions.md` (project conventions)
- `package.json` (build scripts)
- `src/_includes/base.njk` (layout and asset injection)
- `src/_data/` (site metadata)

---

This rules doc can be saved as `CLAUDE.md` or `.cursor/rules/design_system_rules.mdc` for future reference.
