// Illustrative data shared by the three refreshed demo screens.
const rows = [
  ['N819', 'Waldorf Astoria Hotel Millwork', 78379, 75738, 48585, 658, 96, 'May 28, 2025'],
  ['N822', 'JFK New T1 Redevelopment', 330941, 308900, 306590, 755, 92, 'Oct 16, 2026'],
  ['N824', '80 Clarkson', 239714, 201703, 215926, 572, 83, 'Oct 15, 2026'],
  ['N825', 'TSRC Hotel Evolution', 86512, 70963, 66276, 441, 81, 'Mar 6, 2026'],
  ['N826', 'One Pace East Renovation', 49997, 49552, 55774, 492, 100, 'Jul 16, 2026'],
  ['N827', 'Sofitel NY Renovation', 18483, 12620, 10229, 205, 63, 'May 27, 2025'],
  ['N828', 'Mary Cali Dalton Center', 18149, 9095, 10872, 230, 50, 'Apr 7, 2026'],
  ['N830', 'NYPA HQ Building Core & Shell', 20390, 14220, 14173, 233, 69, 'Sep 11, 2026'],
  ['N831', '383 Madison Temp Protection', 104645, 45118, 31785, 292, 43, 'Sep 25, 2026'],
  ['N832', 'USTA Player Performance CP-02', 52985, 6880, 6451, 162, 12, 'Sep 24, 2026']
];
const projects = rows.map(([id, name, budget, equated, actual, days, percent, updated]) => ({
  id, name, budget, equated, actual, days, percent, updated,
  remaining: equated - actual,
  // Demo portfolio status is explicit, independent of completion percentage.
  status: id === 'N827' ? 'inactive' : id === 'N826' ? 'complete' : 'active'
}));
const financial = {
  adjusted: 8751689, costs: 5638679, billed: 8751689, paid: 8751689,
  original: 8100000, subcontract: 0, purchaseOrders: 0, pending: 0,
  extra: 606053, proposals: 99766, overhead: 875172
};
Object.assign(projects[0], {
  financial, manager: 'Alex Saharig', date: 'Dec 15, 2022', contractor: 'Suffolk Construction',
  contact: 'Kevin Mangan', phone: '(646) 879-5682',
  address: 'One Pennsylvania Ave, New York, NY 10119', lastEntry: 'Oct 16, 2026'
});
module.exports = {
  projects, featured: projects[0],
  metrics: [
    { label: 'Contract total', value: 423370447, basis: '100% of contract' },
    { label: 'Costs to date', value: 175195352, basis: '41.4% of contract' },
    { label: 'Billed to date', value: 389648029, basis: '92.0% of contract' },
    { label: 'Payments received', value: 361012775, basis: '92.7% of billed' },
    { label: 'Unbilled contract', value: 33722418, basis: '8.0% of contract' }
  ],
  charts: [
    { id: 'revenue', title: 'Costs vs revenue', unit: '$ millions', series: [
      { label: 'Actual costs', values: [12, 11.5, 14, 11, 9, 7], role: 'neutral' },
      { label: 'Revenue', values: [9, 10, 17.5, 12, 10, 9], role: 'brand' }] },
    { id: 'receivables', title: 'Receivables', unit: '$ millions', series: [
      { label: 'Amount invoiced', values: [15.8, 12, 15, 10, 10, 8], role: 'brand' },
      { label: 'Payments received', values: [13.2, 10.6, 13.7, 9.6, 8.9, 7.4], role: 'neutral' },
      { label: 'Retainage', values: [1.1, .8, .9, .7, .6, .5], role: 'muted' }] },
    { id: 'hours', title: 'Hours', unit: 'Hours (thousands)', series: [
      { label: 'Actual hours', values: [54, 49, 44, 54, 60, 66], role: 'neutral' },
      { label: 'Budget hours', values: [60, 54, 50, 58, 65, 70], role: 'brand' }] },
    { id: 'costs', title: 'Costs', unit: '$ millions', series: [
      { label: 'Actual costs', values: [9, 10, 11, 12, 14, 16], role: 'neutral' },
      { label: 'Budget costs', values: [10, 11, 13, 13, 15, 17], role: 'brand' }] }
  ]
};
