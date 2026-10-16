const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const packageVersion = require('./package.json').version;
const fs = require('fs');
const inclusiveLangPlugin = require('@11ty/eleventy-plugin-inclusive-language');

// const formatDate = date => DateTime.fromJSDate(new Date(date)).toISO({includeOffset: true, suppressMilliseconds: true})
// const formatDateYear = date => DateTime.fromJSDate(new Date(date)).get('year')

module.exports = function (eleventyConfig) {
  eleventyConfig.setServerOptions({
    liveReload: true,
    showVersion: true
  });

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(inclusiveLangPlugin, {
    templateFormats: ['md, html'], // default, add more file extensions here

    // accepts an array or a comma-delimited string
    words:
      'simply,obviously,basically,of course,clearly,just,everyone knows,however,easy'
  });

  eleventyConfig.addPassthroughCopy('dependencies/js/bootstrap.min.js');
  eleventyConfig.addPassthroughCopy('dependencies/js/chart.js');
  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/js/**');
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy('src/favicon.png');

  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
  eleventyConfig.addFilter('starDate', function (datestring) {
    return ` ${new Date(datestring).toDateString()}`;
  });
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

  eleventyConfig.addPassthroughCopy({ 'node_modules/caswow.library/css/caswow.css': 'library/caswow.css' });
  eleventyConfig.addPassthroughCopy({ 'node_modules/caswow.library/css/fonts': 'library/fonts' });
  eleventyConfig.addPassthroughCopy({ 'node_modules/caswow.library/css/caswow.css.map': 'library/caswow.css.map' });
  eleventyConfig.addPassthroughCopy({ 'node_modules/@fortawesome/fontawesome-free/css/all.min.css': 'vendor/fontawesome/css/all.min.css' });
  eleventyConfig.addPassthroughCopy({ 'node_modules/@fortawesome/fontawesome-free/webfonts': 'vendor/fontawesome/webfonts' });
  eleventyConfig.addPassthroughCopy({ 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js': 'js/bootstrap.bundle.min.js' });
  eleventyConfig.addPassthroughCopy({ 'node_modules/chart.js/dist/chart.umd.js': 'js/chart.umd.js' });
  eleventyConfig.addFilter('money', value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value));
  eleventyConfig.addFilter('number', value => new Intl.NumberFormat('en-US').format(value));
  eleventyConfig.addFilter('jsonAttribute', value => JSON.stringify(value));

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
