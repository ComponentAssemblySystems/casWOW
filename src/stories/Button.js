export const createButton = ({
  primary = false,
  size = 'md',
  label,
  onClick
}) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.innerText = label;
  btn.addEventListener('click', onClick);

  let mode;
  if (primary) {
    mode = 'btn-primary';
  } else if (label === 'Info') {
    mode = 'btn-info';
  } else if (label === 'Danger') {
    mode = 'btn-danger';
  } else if (label === 'Success') {
    mode = 'btn-success';
  } else if (label === 'Warning') {
    mode = 'btn-warning';
  } else if (label === 'Light') {
    mode = 'btn-light';
  } else if (label === 'Dark') {
    mode = 'btn-dark';
  } else {
    mode = 'btn-secondary';
  }
  btn.className = ['btn', `btn-${size}`, mode].join(' ');

  return btn;
};

// Storybook stories for 5 button variations
export const Primary = () =>
  createButton({
    primary: true,
    size: 'md',
    label: 'Primary',
    onClick: () => alert('Primary clicked!')
  });
export const Secondary = () =>
  createButton({
    primary: false,
    size: 'md',
    label: 'Secondary',
    onClick: () => alert('Secondary clicked!')
  });
export const Info = () =>
  createButton({
    primary: false,
    size: 'md',
    label: 'Info',
    onClick: () => alert('Info clicked!')
  });
export const Danger = () =>
  createButton({
    primary: false,
    size: 'md',
    label: 'Danger',
    onClick: () => alert('Danger clicked!')
  });
export const Success = () =>
  createButton({
    primary: false,
    size: 'md',
    label: 'Success',
    onClick: () => alert('Success clicked!')
  });
export const Light = () =>
  createButton({
    primary: false,
    size: 'md',
    label: 'Light',
    onClick: () => alert('Light clicked!')
  });
export const Dark = () =>
  createButton({
    primary: false,
    size: 'md',
    label: 'Dark',
    onClick: () => alert('Dark clicked!')
  });
