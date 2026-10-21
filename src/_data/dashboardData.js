module.exports = {
  regionCosts: [
    { label: 'Total Budget', value: '$12,456,789', delta: '+10%' },
    { label: 'Total Actual', value: '$7,234,567', delta: '+15%' },
    { label: 'Total Commitments', value: '$5,123,456', delta: '+2%' },
    { label: 'Forecast', value: '$8,456,789', delta: '-5%' },
    { label: 'Remaining', value: '$4,000,000', delta: '0%' }
  ],
  regionChart: [
    { region: 'NY', projects: 3, workers: 83 },
    { region: 'BOS', projects: 2, workers: 5 },
    { region: 'DC', projects: 5, workers: 12 },
    { region: 'NJ', projects: 5, workers: 10 },
    { region: 'PA', projects: 2, workers: 7 },
    { region: 'West Cal', projects: 4, workers: 15 },
    { region: 'West LLC', projects: 6, workers: 20 },
    { region: 'Commonwealth', projects: 1, workers: 3 }
  ],
  activeJobsImages: [
    {
      name: 'New York State Life Sciences Public Health Laboratory',
      location: 'Albany, NY',
      progressLabel: '',
      progressPercent: 0,
      badge: 792
    },
    {
      name: 'Plaza Athena Renovation',
      location: 'New York, New York',
      progressLabel: 'Millwork',
      progressPercent: 30,
      badge: 806
    },
    {
      name: '343 Madison Avenue Core & Shell',
      location: 'East 44th and 45th Streets, New York, New York',
      progressLabel: 'Framing',
      progressPercent: 70,
      badge: 824
    },
    {
      name: 'Arthur Ashe Stadium at the USTA National Tennis Center',
      location: '122-02 Roosevelt Ave, South Corona, NY',
      progressLabel: 'Millwork',
      progressPercent: 20,
      badge: 829
    }
  ],
  activeProjects: [
    { name: 'New York State Life Sciences Public Health Laboratory', badge: 792, progressLabel: '', progressPercent: 0 },
    { name: 'Plaza Athena Renovation', badge: 806, progressLabel: 'Millwork', progressPercent: 30 },
    { name: '343 Madison Avenue Core & Shell', badge: 824, progressLabel: 'Framing', progressPercent: 70 },
    { name: 'Arthur Ashe Stadium at the USTA National Tennis Center', badge: 829, progressLabel: 'Millwork', progressPercent: 20 },
    { name: 'Penn Station', badge: 808, progressLabel: 'Acoustic Panels', progressPercent: 50 }
  ]
};
