---
name: caswow-release
description: >
  Bump the caswow.library version and propagate the update to casWOW. Use this skill whenever releasing a new version of the library, asked to "bump the version", "cut a release", "release a new version", "tag a release", "update caswow.library in casWOW", or "publish a new build". Covers the full release workflow in both repos: version bump, token + CSS build, git tag, and casWOW dependency update via pnpm. Works for patch, minor, and major version bumps.
---

# caswow-release

A skill for cutting releases of `caswow.library` and propagating them to the `casWOW` prototype. The library is consumed by casWOW via a GitHub URL reference (not a registry), so the update path is manual — this skill walks through every step.

---

## Release types

Use semantic versioning (`MAJOR.MINOR.PATCH`):

| Type | When to use | Example |
|---|---|---|
| **patch** | Bug fixes, token tweaks, CSS corrections | `0.7.3` → `0.7.4` |
| **minor** | New components, new token categories, additive changes | `0.7.3` → `0.8.0` |
| **major** | Breaking changes to token names, component API, or SCSS variable names | `0.7.3` → `1.0.0` |

Current version: `0.7.3` (as of last recorded state — verify with `cat package.json | grep version` before bumping).

---

## Step 1: Prepare caswow.library

Work in the `caswow.library` directory.

### 1a. Confirm the working tree is clean

```bash
git status
git pull origin main
```

Resolve any uncommitted changes before proceeding.

### 1b. Run the full build

```bash
pnpm tokens:build   # regenerate _tokens-generated.scss and _css-variables-generated.scss
pnpm css            # compile SCSS → css/caswow.css
```

Verify both commands complete without errors. Check that `css/caswow.css` has been updated.

### 1c. Run tests

```bash
pnpm vitest run
```

All tests must pass before tagging. If any fail, fix them before continuing.

### 1d. Verify Storybook builds

```bash
pnpm build-storybook
```

A Storybook build failure means stories have broken imports or component errors — fix before releasing.

---

## Step 2: Bump the version

Edit `package.json` — update the `"version"` field:

```json
{
  "version": "0.7.4"
}
```

Or use pnpm (preferred — also updates the lockfile):

```bash
pnpm version patch    # 0.7.3 → 0.7.4
pnpm version minor    # 0.7.3 → 0.8.0
pnpm version major    # 0.7.3 → 1.0.0
```

`pnpm version` automatically creates a git commit and tag. If you prefer to tag manually (Step 3), use `--no-git-tag-version`:

```bash
pnpm version patch --no-git-tag-version
```

---

## Step 3: Commit and tag

If `pnpm version` already committed and tagged, skip to Step 4. Otherwise:

```bash
git add package.json pnpm-lock.yaml css/caswow.css scss/_tokens-generated.scss scss/_css-variables-generated.scss
git commit -m "chore: release v0.7.4"
git tag v0.7.4
git push origin main --tags
```

Tag format: `v{MAJOR}.{MINOR}.{PATCH}` — the `v` prefix is required for consistency with existing tags.

**Commit message conventions** used in this repo:
- `chore:` — maintenance, version bumps, lockfile updates
- `feat:` — new components or token additions
- `fix:` — bug fixes
- `patch:` — minor corrections (also used historically for version bumps)

---

## Step 4: Update casWOW

Work in the `casWOW` directory.

### 4a. Update the dependency reference

casWOW references caswow.library via a GitHub URL in `package.json`:

```json
"@componentassemblysystems/caswow.library": "https://github.com/ComponentAssemblySystems/caswow.library"
```

This always pulls from the default branch (`main`). Since casWOW uses `pnpm link ../caswow.library` during local development, the actual update path depends on your setup:

**If using local `pnpm link` (development workflow):**
```bash
# In casWOW — pick up the rebuilt CSS from the linked library
pnpm copy-cas
pnpm build:eleventy
```

**If reinstalling from GitHub (CI / clean install):**
```bash
pnpm install          # pulls latest from the GitHub URL
pnpm copy-cas         # copies caswow.css from node_modules into src/css/
pnpm build:eleventy   # rebuilds the Eleventy site
```

### 4b. Verify the update

```bash
# Confirm the CSS file was updated
head -5 src/css/caswow.css   # should show the new build timestamp or token values

# Check the built site
pnpm show   # dev server — open browser and spot-check affected components
```

### 4c. Bump casWOW version (optional)

casWOW has its own version in `src/_data/meta.js` (format: `6.0.4.24` — a four-part build version, not semver). Update it to record that the library was bumped:

```js
module.exports = {
  version: "6.0.5.24"  // increment the third segment for a library update
}
```

This version appears in the Storybook footer and build metadata — it's cosmetic but useful for tracing builds.

---

## Step 5: Commit casWOW changes

```bash
git add src/css/caswow.css src/_data/meta.js
git commit -m "chore: update caswow.library to v0.7.4"
git push origin main
```

---

## Release checklist

- [ ] `caswow.library` working tree is clean and up to date with `main`
- [ ] `pnpm tokens:build` completes without errors
- [ ] `pnpm css` completes without errors
- [ ] `pnpm vitest run` — all tests pass
- [ ] `pnpm build-storybook` completes (no broken story imports)
- [ ] `package.json` version bumped correctly
- [ ] Git commit and tag created (`v{VERSION}`)
- [ ] Tag pushed to origin (`git push origin main --tags`)
- [ ] `casWOW`: `pnpm copy-cas` run and `src/css/caswow.css` updated
- [ ] `casWOW`: Eleventy build passes (`pnpm build`)
- [ ] `casWOW`: visual spot-check in dev server (`pnpm show`)
- [ ] `casWOW`: changes committed and pushed

---

## Troubleshooting

**`pnpm tokens:build` fails with "alias not found"** — a token in `semantic.json` or `component/*.json` references a path that doesn't exist in `global.json`. Check for typos in curly-brace aliases like `{color.blue.bse}` (note the typo).

**`pnpm css` fails with SCSS compilation error** — a variable used in `scss/caswow.scss` or its imports is missing from `_tokens-generated.scss`. Run `pnpm tokens:build` first, or check that the token path mapping in `sd.config.mjs` is correct.

**casWOW still shows old styles after `pnpm copy-cas`** — Eleventy may have cached the old file. Run `pnpm build:eleventy` explicitly, or delete `docs/css/caswow.css` and rebuild.

**`pnpm vitest run` fails on a Storybook story test** — the component factory function likely has a breaking change. Fix the component or update the test to match the new API before tagging.
