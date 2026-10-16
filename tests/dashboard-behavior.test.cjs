const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const reviewed = require('../src/_data/reviewed');

test('timeframe keeps all chart series, table rows and CSV export synchronized', async () => {
  const events = {};
  const control = key => ({ addEventListener: (event, callback) => { events[`${key}:${event}`] = callback; }, setAttribute() {} });
  const timeframe = control('timeframe');
  const announcement = {};
  const charts = [];
  const panels = reviewed.charts.map(source => {
    const canvas = { dataset: { chart: JSON.stringify(source) }, setAttribute() {} };
    const rows = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((month, index) => ({ dataset: { chartMonth: String(index) }, cells: [{ textContent: month }], classList: { toggle() {} } }));
    const period = {};
    return { canvas, rows, period, querySelector: selector => selector === '[data-chart]' ? canvas : period, querySelectorAll: () => rows };
  });
  let exported;
  class FakeChart {
    static defaults = { font: {} };
    constructor(canvas, config) { Object.assign(this, { canvas, data: config.data }); charts.push(this); }
    update() {}
  }
  const document = {
    body: { dataset: { screen: 'dashboard' } },
    documentElement: { dataset: { bsTheme: 'light' } },
    fonts: { ready: Promise.resolve() },
    querySelector: selector => ({ '[data-theme-toggle]': control('theme'), '[data-chart-timeframe]': timeframe, '[data-export]': control('export'), '[data-announcement]': announcement, '[data-chart]': panels[0].canvas })[selector] || null,
    querySelectorAll: selector => ({ '[data-chart-panel]': panels, '[data-chart]': panels.map(panel => panel.canvas), 'details table': panels.map(panel => ({ caption: { textContent: 'Chart' }, rows: panel.rows })) })[selector] || [],
    createElement: () => ({ click() {} })
  };
  vm.runInNewContext(fs.readFileSync('src/js/workspace.js', 'utf8'), {
    document, Chart: FakeChart, getComputedStyle: () => ({ getPropertyValue: () => 'color' }),
    Blob, URL: { createObjectURL: blob => { exported = blob; return 'blob:test'; }, revokeObjectURL() {} }, setTimeout() {}
  });
  await Promise.resolve();
  for (const months of [3, 1, 6]) {
    timeframe.value = String(months);
    timeframe.selectedOptions = [{ textContent: `${months} months` }];
    events['timeframe:change']();
    for (let index = 0; index < charts.length; index++) {
      assert.equal(charts[index].data.labels.length, months);
      charts[index].data.datasets.forEach((series, seriesIndex) => assert.deepEqual([...series.data], reviewed.charts[index].series[seriesIndex].values.slice(6 - months)));
      assert.equal(panels[index].rows.filter(row => !row.hidden).length, months);
    }
    events['export:click']();
    const csv = await exported.text();
    assert.equal(csv.includes('"May"'), months === 6);
    assert.equal(csv.includes('"Aug"'), months >= 3);
    assert.ok(csv.includes('"Oct"'));
  }
});

test('theme initialization honors saved choices and library dark background', () => {
  for (const [saved, systemDark, expected] of [['dark', false, 'dark'], ['light', true, 'light'], [null, true, 'dark'], [null, false, 'light']]) {
    const properties = {};
    const documentElement = { dataset: {}, style: { setProperty: (key, value) => { properties[key] = value; } } };
    vm.runInNewContext(fs.readFileSync('src/js/theme.js', 'utf8'), {
      document: { documentElement }, localStorage: { getItem: () => saved }, matchMedia: () => ({ matches: systemDark })
    });
    assert.equal(documentElement.dataset.bsTheme, expected);
    assert.equal(properties['--dashboard-background'], expected === 'dark' ? 'var(--cas-bgColor-muted)' : '#F4F6F7');
  }
});
