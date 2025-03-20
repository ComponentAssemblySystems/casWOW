# CASWOW

This project requires the caswow.library to function correctly.

Run the following to link caswow.library as an npm module:

```sh
cd /path/to/your/stylesheet
npm link
```

return to to this project:

```sh
npm link caswow.library
npm run copy-cas
```

or you can import it into `site.css`:

```sh
@import "caswow.library/css/caswow.css";
```

> if the caswow.library is ever published, replace `npm link caswow.library` with `npm install caswow.library` to add it to the package.json dependencies.

## Notes

>Architectural drawing found under `/plans`
>Photo by <a href="https://unsplash.com/@amsterdamcityarchives?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Amsterdam City Archives</a> on <a href="https://unsplash.com/photos/a-drawing-of-a-floor-plan-of-a-building--StEPF2CK2M?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
