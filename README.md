# CASWOW

![Storybook](https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)

[Demo](https://componentassemblysystems.github.io/casWOW/) | [Storybook](https://www.chromatic.com/library?appId=68dffe7bbaf9cb288a3faf2f)

## Prerequisites

This project requires the [caswow.library](https://github.com/ComponentAssemblySystems/caswow.library) to function correctly.

See the section on installing the [caswow.library](#caswow-library) as part of the overall local development setup.

## Storybook

This site utilizes Storybook to see code snippets and monitor changes when components are updated. To run Storybook locally, enter `npm run storybook` into your terminal.

In the current configuration, the demo site and Storybook instance can be run simultaneously, simply by running each startup command within individual terminals.

```sh
$npm run dev // run local demo site - port 8080
$npm run storybook // run local storybook instance - port 6006
```

## Local Development

To run CAS WOW locally, simply clone the repository and install dependencies. Currently, this project requires Node v22, which can be set on a project basis by entering `nvm use` in the terminal.

1. `git clone git@github.com:ComponentAssemblySystems/casWOW.git`
2. `npm install`

### caswow library

Run the following to link the caswow.library as an npm module:

```sh
cd /path/to/your/stylesheet
npm link
```

return to this project:

```sh
npm link caswow.library
npm run copy-cas
```

or you can import it into `site.css`:

```sh
@import "caswow.library/css/caswow.css";
```

> if the caswow.library is ever published, replace `npm link caswow.library` with `npm install caswow.library` to add it to the package.json dependencies.

## Font Awesome

CASWOW uses [Font Awesome](https://fontawesome.com/) for icons, with the current version set at `v7.0.1`.

### Updates / Upgrades

To upgrade the version of Font Awesome, the following steps must be taken:

1. Update the version in `package.json`
1. Run `npm install`
1. Run `copy-fa` to copy the latest Font Awesome webfonts and CSS files to their respective CASWOW directories
1. Run `npm run build` to rebuild the CASWOW project with the new dependencies
1. Verify the build has picked up the latest changes by checking the version under `docs/css/fontawesome.css`

You should now be able to run `npm run dev` to view the icons with the newest version. If any icons are missing that are specific to the latest version, be sure to check `dependencies/` and `src/css/fontawesome.css` to verify that the correct version has been copied over.

## Notes

>Architectural drawing found under `/plans`
>Photo by <a href="https://unsplash.com/@amsterdamcityarchives?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Amsterdam City Archives</a> on <a href="https://unsplash.com/photos/a-drawing-of-a-floor-plan-of-a-building--StEPF2CK2M?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
