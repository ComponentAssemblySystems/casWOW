const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const packageVersion = require('./package.json').version;
const fs = require('fs');
const inclusiveLangPlugin = require('@11ty/eleventy-plugin-inclusive-language');

// const formatDate = date => DateTime.fromJSDate(new Date(date)).toISO({includeOffset: true, suppressMilliseconds: true})
// const formatDateYear = date => DateTime.fromJSDate(new Date(date)).get('year')

module.exports = function (eleventyConfig) {
  eleventyConfig.setServerOptions({
    liveReload: true,
    showVersion: true,
  });

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(inclusiveLangPlugin, {
    templateFormats: ['md, html'], // default, add more file extensions here

    // accepts an array or a comma-delimited string
    words:
      'simply,obviously,basically,of course,clearly,just,everyone knows,however,easy'
  });
  // eleventyConfig.addWatchTarget('src/css/*.css');

  eleventyConfig.addPassthroughCopy('dependencies/js/bootstrap.min.js');
  eleventyConfig.addPassthroughCopy('dependencies/js/chart.js');
  eleventyConfig.addPassthroughCopy('src/css/caswow.css');
  eleventyConfig.addPassthroughCopy('src/css/variables.css');
  eleventyConfig.addPassthroughCopy('src/css/tokens.css');
  eleventyConfig.addPassthroughCopy('src/css/site.css');
  eleventyConfig.addPassthroughCopy('src/css/colors.css');
  eleventyConfig.addPassthroughCopy('src/css/fontawesome.css');
  eleventyConfig.addPassthroughCopy('src/css/brands.css');
  eleventyConfig.addPassthroughCopy('src/css/solid.css');
  eleventyConfig.addPassthroughCopy('src/css/print.css');
  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/webfonts');
  eleventyConfig.addPassthroughCopy('src/js/**');
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy('src/favicon.png');

  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode('packageVersion', () => `v${packageVersion}`);

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware('*', (req, res) => {
          const content_404 = fs.readFileSync('./docs/404.html');
          // Add 404 http status code in request header.
          res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  // Markdown
  eleventyConfig.setLibrary('md');

  return {
    passthroughFileCopy: true,
    pathPrefix: '/casWOW/',
    dir: {
      input: 'src',
      output: 'docs'
    }
  };
};
