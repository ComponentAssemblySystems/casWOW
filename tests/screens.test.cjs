const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const reviewed = require("../src/_data/reviewed");
const root = path.resolve(__dirname, "..");
const output = (file) => fs.readFileSync(path.join(root, "docs", file), "utf8");

test("every project link resolves to its own identity and available data", () => {
  const xpress = output("costs/xpress/index.html");
  for (const project of reviewed.projects) {
    assert.ok(xpress.includes(`/casWOW/project-info/${project.id}/`));
    const detail = output(`project-info/${project.id}/index.html`);
    assert.ok(detail.includes(`Project ${project.id} · CAS - New York`));
    assert.ok(
      detail.includes(project.name.replaceAll("&", "&amp;")) ||
        detail.includes(project.name),
    );
    assert.equal(
      detail.includes("Financial summary"),
      Boolean(project.financial),
    );
  }
});

test("sample identities, status categories and hours remain consistent", () => {
  assert.equal(
    new Set(reviewed.projects.map((item) => item.id)).size,
    reviewed.projects.length,
  );
  assert.deepEqual(
    [...new Set(reviewed.projects.map((item) => item.status))].sort(),
    ["active", "complete", "inactive"],
  );
  for (const item of reviewed.projects) {
    assert.equal(item.remaining, item.equated - item.actual);
    assert.ok(item.percent >= 0 && item.percent <= 100);
  }
  const [contract, , billed, , unbilled] = reviewed.metrics;
  assert.equal(unbilled.value, contract.value - billed.value);
});

test("all refreshed entry points use bundled library assets and one page title", () => {
  for (const file of [
    "index.html",
    "dashboard/index.html",
    "costs/xpress/index.html",
    "project-info/index.html",
  ]) {
    const html = output(file);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.ok(html.includes("/casWOW/library/caswow.css"));
    assert.ok(!html.includes("/casWOW/library/navigation.css"));
    assert.ok(html.includes("/casWOW/js/bootstrap.bundle.min.js"));
    assert.ok(!html.includes("/css/site.css"));
    assert.ok(!html.includes("cdn.jsdelivr.net"));
  }
  assert.ok(
    fs.existsSync(
      path.join(
        root,
        "docs/library/fonts/ibm-plex-sans-latin-400-normal.woff2",
      ),
    ),
  );
  assert.equal(
    output("library/caswow.css"),
    fs.readFileSync(
      path.join(root, "node_modules/caswow.library/css/caswow.css"),
      "utf8",
    ),
  );
});

test("every chart has an accessible data table with all months and series", () => {
  const html = output("index.html");
  for (const chart of reviewed.charts) {
    assert.ok(html.includes(`aria-labelledby="${chart.id}-title"`));
    assert.ok(html.includes(`${chart.title} · ${chart.unit}`));
    for (const series of chart.series) assert.equal(series.values.length, 6);
  }
  assert.equal((html.match(/<canvas /g) || []).length, 4);
  assert.equal((html.match(/<table /g) || []).length, 4);
});

const samples = require("../src/_data/samples");
test("all application routes have complete library-based layouts and valid local links", () => {
  for (const [, route] of samples.routes) {
    const html = output(
      route === "/" ? "index.html" : `${route.slice(1)}index.html`,
    );
    assert.equal((html.match(/<h1\b/g) || []).length, 1, route);
    assert.ok(html.includes("/casWOW/library/caswow.css"), route);
    
    assert.ok(
      !/custom-placeholder|<sl-|javascript:history|href=""/.test(html),
      route,
    );
    for (const match of html.matchAll(/(?:href|src)="(\/casWOW\/[^"#?]*)/g)) {
      const relative = decodeURIComponent(match[1].slice("/casWOW/".length));
      const target = path.join(root, "docs", relative);
      assert.ok(
        fs.existsSync(target),
        `${route} has missing asset/link ${relative}`,
      );
      if (relative.endsWith("/") || !relative)
        assert.ok(fs.existsSync(path.join(target, "index.html")), relative);
    }
  }
});

test("cost breakdowns reconcile to the shared sample financials", () => {
  assert.equal(samples.totals.actual, reviewed.featured.financial.costs);
  assert.equal(
    samples.totals.budget,
    samples.categories.reduce((sum, item) => sum + item.budget, 0),
  );
  for (const item of samples.categories)
    assert.equal(item.remaining, item.budget - item.actual);
  assert.ok(
    samples.transactions.reduce((sum, item) => sum + item.amount, 0) <
      samples.totals.actual,
  );
  assert.equal(
    samples.workPackages.reduce((sum, item) => sum + item.actual, 0),
    reviewed.featured.actual,
  );
});

test("legacy demo addresses and error page now render completed layouts", () => {
  for (const route of [
    "index-old/index.html",
    "chatbot-desktop/index.html",
    "404.html",
  ]) {
    const html = output(route);
    assert.ok(html.includes('data-screen="'), route);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, route);
    assert.ok(!html.includes("<sl-"), route);
  }
});


test("application pages load caswow.css with only the Font Awesome icon stylesheet", () => {
  for (const [, route] of samples.routes) {
    const html = output(route === "/" ? "index.html" : `${route.slice(1)}index.html`);
    const sheets = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map(match => match[1]);
    assert.deepEqual(sheets, ["/casWOW/library/caswow.css", "/casWOW/vendor/fontawesome/css/all.min.css"], route);
    assert.ok(!/<style\b/.test(html), route);
    for (const [, classes] of html.matchAll(/class="([^"]*)"/g)) {
      assert.ok(!/workspace-|sample-|cas-nav|cas-table|page-header/.test(classes), `${route}: ${classes}`);
    }
  }
});

test("repository CSS inventory contains only the library and icon stylesheets", () => {
  const stylesheets = [];
  const collect = directory => {
    if (!fs.existsSync(directory)) return;
    for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
      const location = path.join(directory, item.name);
      if (item.isDirectory()) collect(location);
      else if (item.isFile() && item.name.endsWith('.css')) stylesheets.push(path.relative(root, location));
    }
  };
  for (const directory of ['src', 'docs', 'dependencies']) collect(path.join(root, directory));
  assert.deepEqual(stylesheets, ['docs/library/caswow.css', 'docs/vendor/fontawesome/css/all.min.css']);
  assert.ok(fs.existsSync(path.join(root, 'docs/library/caswow.css.map')));
  const scripts = require('../package.json').scripts;
  assert.ok(!Object.values(scripts).some(command => /src\/css|docs\/css|dependencies\/css/.test(command)));
});

test("project costs renders the reference financial detail layout from shared data", () => {
  const html = output('costs/project-costs/index.html');
  assert.ok(html.includes(reviewed.featured.name));
  assert.ok(html.includes('Project N819 · CAS - New York'));
  for (const heading of ['Financial summary', 'Project details', 'Contractor and contact', 'Cost and billing details']) assert.ok(html.includes(heading));
  assert.ok(html.includes('$5,638,679'));
  assert.ok(html.includes('data-project-export='));
  assert.ok(html.includes('col-12 col-lg-7'));
  assert.ok(!html.includes('NaN'));
});


test("all application pages include the office switcher and existing office choices", () => {
  const offices = require('../src/_data/companyList.json');
  for (const [, route] of samples.routes) {
    const html = output(route === '/' ? 'index.html' : `${route.slice(1)}index.html`);
    assert.ok(html.includes('id="office-switcher"'), route);
    assert.ok(html.includes('aria-label="Switch office"'), route);
    for (const office of offices) assert.ok(html.includes(`data-office="${office.text}"`), route);
  }
});

test('project financial sections are identical across both detail entry points', () => {
  const section = html => html.match(/<div data-project-export=[\s\S]*?<p class="small text-body-secondary mt-4 mb-0">[\s\S]*?<\/p>/)[0];
  assert.equal(section(output('costs/project-costs/index.html')), section(output('project-info/N819/index.html')));
  for (const file of ['costs/project-costs/index.html', 'project-info/N819/index.html']) {
    const html = output(file);
    assert.ok(html.includes('All sample records shown belong to CAS - New York.'));
    assert.ok(html.includes('nav nav-pills'));
    const breadcrumb = html.match(/<nav aria-label="Breadcrumb">[\s\S]*?<\/nav>/)[0];
    assert.ok(!breadcrumb.includes('href="/casWOW/costs/project-costs/"'));
  }
  assert.ok(output('costs/xpress/index.html').includes('id="hours-help"'));
  assert.ok(output('index.html').includes('Overall totals. The chart timeframe only filters'));
});


test('Font Awesome styles have bundled webfonts and icon controls have accessible labels', () => {
  const css = output('vendor/fontawesome/css/all.min.css');
  for (const match of css.matchAll(/url\((?:["'])?(\.\.\/webfonts\/[^)"']+)/g)) {
    assert.ok(fs.existsSync(path.resolve(root, 'docs/vendor/fontawesome/css', match[1])), match[1]);
  }
  const html = output('index.html');
  for (const icon of ['fa-bars', 'fa-building', 'fa-print', 'fa-download', 'fa-sliders']) assert.ok(html.includes(icon));
  assert.ok(html.includes('aria-label="Open navigation"'));
});
