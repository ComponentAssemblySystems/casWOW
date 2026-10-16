# CASWOW

[Demo](https://componentassemblysystems.github.io/casWOW/)

## Prerequisites

This project requires the [caswow.library](https://github.com/ComponentAssemblySystems/caswow.library) to function correctly.

See the section on installing the [caswow.library](#caswow-library) as part of the overall local development setup.

### NPM to PNPM Transition

This project has transitioned to using [PNPM](https://pnpm.io/) as the package manager. The goal is to improve performance and efficiency in managing dependencies.

Install PNPM globally if you haven't already:

```sh
npm install -g pnpm
```

Import existing lockfiles from NPM, if they exist:

```sh
pnpm import
```

Install dependencies:

```sh
pnpm install
```

All subsequent commands that previously used `npm` should now use `pnpm` without declaring `run`. For example, to run the development server, instead of `npm run dev` use:

```sh
pnpm dev
```

## Local Development

To run CAS WOW locally, simply clone the repository and install dependencies. Currently, this project requires Node v22, which can be set on a project basis by entering `nvm use` in the terminal.

1. `git clone git@github.com:ComponentAssemblySystems/casWOW.git`
2. `pnpm install`

### caswow library

Run the following to link the caswow.library as a pnpm module:

```bash
cd /path/to/your/stylesheet
pnpm link
```

return to this project:

```sh
pnpm link ../caswow.library // path to your local caswow.library
pnpm install
```

Build the site to copy the library stylesheet and its self-hosted fonts directly into the published output:

```sh
pnpm build
```

The application loads only `docs/library/caswow.css`. Eleventy copies it, its source map, and `docs/library/fonts/` from the linked `caswow.library` package. Do not add local CSS copies or extra stylesheets.

`pnpm copy-cas` and `pnpm css` also rebuild the site. `pnpm watch:cas` watches the linked library and rebuilds when its CSS or fonts change.

## Local Views

The casWOW demo site has two entry points - `/casWOW/` and `/casWOW/index-old/`. The baseline `/casWOW/` page is the dashboard, whereas `/casWOW/index-old/` shows all of the available pages, without having to dive into each according to the standard user workflow.

## Notes

>Architectural drawing found under `/plans`
>Photo by [Amsterdam City Archives](https://unsplash.com/@amsterdamcityarchives?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-drawing-of-a-floor-plan-of-a-building--StEPF2CK2M?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
