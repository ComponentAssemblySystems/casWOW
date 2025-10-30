export const createBadge = ({
  primary = false,
  outline = false,
  count = false,
  label
}) => {
  const badge = document.createElement('span');

  let mode;
  // if (count) {
  //   mode = 'position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger';
  //   // if (primary) {
  //   //   mode = 'position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger';
  //   // } else if (label === 'Secondary Pill') {
  //   //   mode = 'rounded-pill text-bg-secondary';
  //   // } else if (label === 'Success Pill') {
  //   //   mode = 'rounded-pill text-bg-success';
  //   // } else if (label === 'Danger Pill') {
  //   //   mode = 'rounded-pill text-bg-danger';
  //   // } else if (label === 'Warning Pill') {
  //   //   mode = 'rounded-pill text-bg-warning';
  //   // } else if (label === 'Info Pill') {
  //   //   mode = 'rounded-pill text-bg-info';
  //   // } else if (label === 'Light Pill') {
  //   //   mode = 'rounded-pill text-bg-light';
  //   // } else if (label === 'Dark Pill') {
  //   //   mode = 'rounded-pill text-bg-dark';
  //   // }
  // } else {
  if (outline) {
    if (primary) {
      mode = 'text-bg-primary bg-transparent border border-primary text-primary';
    } else if (label === 'Secondary') {
      mode = 'text-bg-secondary bg-transparent border border-secondary text-secondary';
    } else if (label === 'Success') {
      mode = 'text-bg-success bg-transparent border border-success text-success';
    } else if (label === 'Danger') {
      mode = 'text-bg-danger bg-transparent border border-danger text-danger';
    } else if (label === 'Warning') {
      mode = 'text-bg-warning bg-transparent border border-warning text-warning';
    } else if (label === 'Info') {
      mode = 'text-bg-info bg-transparent border border-info text-info';
    } else if (label === 'Light') {
      mode = 'text-bg-light bg-transparent border border-light-subtle text-black-50';
    } else if (label === 'Dark') {
      mode = 'text-bg-dark bg-transparent border border-dark-subtle text-dark';
    } else {
      mode = 'text-bg-secondary bg-transparent border border-secondary text-secondary';
    }
  } else {
    if (primary) {
      mode = 'text-bg-primary';
    } else if (label === 'Secondary') {
      mode = 'text-bg-secondary';
    } else if (label === 'Success') {
      mode = 'text-bg-success';
    } else if (label === 'Danger') {
      mode = 'text-bg-danger';
    } else if (label === 'Warning') {
      mode = 'text-bg-warning';
    } else if (label === 'Info') {
      mode = 'text-bg-info';
    } else if (label === 'Light') {
      mode = 'text-bg-light';
    } else if (label === 'Dark') {
      mode = 'text-bg-dark';
    } else {
      mode = 'text-bg-secondary';
    }
  }

  badge.textContent = label;

  badge.className = ['badge', mode].join(' ');

  return badge;
};

// Storybook stories for 5 button variations
export const Primary = () =>
  createBadge({
    pill: false,
    count: false,
    label: 'Primary'
  });
export const Secondary = () =>
  createBadge({
    pill: false,
    count: false,
    label: 'Secondary'
  });
export const Success = () =>
  createBadge({
    pill: false,
    count: false,
    label: 'Success'
  });
export const Danger = () =>
  createBadge({
    pill: false,
    count: false,
    label: 'Danger'
  });
export const Warning = () =>
  createBadge({
    pill: false,
    count: false,
    label: 'Warning'
  });
export const Info = () =>
  createBadge({
    pill: false,
    count: false,
    label: 'Info'
  });
export const Light = () =>
  createBadge({
    pill: false,
    count: false,
    label: 'Light'
  });
export const Dark = () =>
  createBadge({
    pill: false,
    count: false,
    label: 'Dark'
  });
