<!-- Pull Request template for casWOW -->
# Description of changes

Please include a summary of the change and which (if any) issue is fixed. List any dependencies that are required for this change.

## PR checklist

Please check the boxes that apply before requesting review.

- [ ] I ran the site locally (`npm run show`) and verified the changed pages
- [ ] I ran the production build (`npm run css && npm run build`) and checked `docs/` output
- [ ] I updated or copied vendor assets using the package.json copy scripts if required (`npm run copy-css|copy-js|copy-fa|copy-cas`)
- [ ] If this change depends on `caswow.library`, I documented whether it was linked with `npm link` or included in CI
- [ ] I verified there are no uncaught exceptions in the browser console (common: dialog script in `base.njk`)
- [ ] I added notes in this PR about any assumptions made (missing vendor files, local links, env variables)

Optional guidance for reviewers:

- For layout or JS changes, preview the affected page(s) in `docs/` after a prod build.
- If vendor files were updated, confirm `dependencies/` and `docs/` contain the expected updated files.
