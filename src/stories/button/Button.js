export const createButton = ({
  primary = false,
  outline = false,
  size = 'md',
  label,
  onClick,
  iconLeft = false,
  iconRight = false,
}) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.addEventListener('click', onClick);

  let mode;
  if (outline) {
    if (primary) {
      mode = 'btn-outline-primary';
    } else if (label === 'Info') {
      mode = 'btn-outline-info';
    } else if (label === 'Danger') {
      mode = 'btn-outline-danger';
    } else if (label === 'Success') {
      mode = 'btn-outline-success';
    } else if (label === 'Warning') {
      mode = 'btn-outline-warning';
    } else if (label === 'Light') {
      mode = 'btn-outline-light';
    } else if (label === 'Dark') {
      mode = 'btn-outline-dark';
    } else {
      mode = 'btn-outline-secondary';
    }
  } else {
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
  }

  if (iconLeft) {
    mode = 'icon-left';
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('class', 'bi');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z');
    svg.appendChild(path);
    btn.appendChild(svg);
    const textNode = document.createTextNode(label);
    btn.appendChild(textNode);
  } else if (iconRight) {
    mode = 'icon-right';
    const textNode = document.createTextNode(label);
    btn.appendChild(textNode);
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('class', 'bi');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z');
    svg.appendChild(path);
    btn.appendChild(svg);
  } else {
    btn.innerText = label;
  }

  btn.className = ['btn', `btn-${size}`, mode].join(' ');

  return btn;
};

// Storybook stories for 5 button variations
export const Primary = () =>
  createButton({
    primary: true,
    outline: false,
    size: 'md',
    label: 'Primary',
    iconLeft: false,
    iconRight: false,
    onClick: () => alert('Primary clicked!')
  });
export const Secondary = () =>
  createButton({
    primary: false,
    outline: false,
    size: 'md',
    label: 'Secondary',
    iconLeft: false,
    iconRight: false,
    onClick: () => alert('Secondary clicked!')
  });
export const Info = () =>
  createButton({
    primary: false,
    outline: false,
    size: 'md',
    label: 'Info',
    iconLeft: false,
    iconRight: false,
    onClick: () => alert('Info clicked!')
  });
export const Danger = () =>
  createButton({
    primary: false,
    outline: false,
    size: 'md',
    label: 'Danger',
    iconLeft: false,
    iconRight: false,
    onClick: () => alert('Danger clicked!')
  });
export const Success = () =>
  createButton({
    primary: false,
    outline: false,
    size: 'md',
    label: 'Success',
    iconLeft: false,
    iconRight: false,
    onClick: () => alert('Success clicked!')
  });
export const Light = () =>
  createButton({
    primary: false,
    outline: false,
    size: 'md',
    label: 'Light',
    iconLeft: false,
    iconRight: false,
    onClick: () => alert('Light clicked!')
  });
export const Dark = () =>
  createButton({
    primary: false,
    outline: false,
    size: 'md',
    label: 'Dark',
    iconLeft: false,
    iconRight: false,
    onClick: () => alert('Dark clicked!')
  });
export const Outline = () =>
  createButton({
    label: 'Outline Primary',
    outline: true,
    primary: true,
    size: 'md',
    iconLeft: false,
    iconRight: false,
    onClick: () => alert('Outline Primary clicked!')
  });
export const Warning = () =>
  createButton({
    primary: false,
    outline: false,
    size: 'md',
    label: 'Warning',
    iconLeft: false,
    iconRight: false,
    onClick: () => alert('Warning clicked!')
  });
export const Large = () =>
  createButton({
    primary: false,
    outline: false,
    size: 'lg',
    label: 'Large',
    iconLeft: false,
    iconRight: false,
    onClick: () => alert('Large clicked!')
  });
export const Small = () =>
  createButton({
    primary: false,
    outline: false,
    size: 'sm',
    label: 'Small',
    iconLeft: false,
    iconRight: false,
    onClick: () => alert('Small clicked!')
  });
export const Link = () =>
  createButton({
    primary: false,
    outline: false,
    size: 'md',
    label: 'Link',
    iconLeft: false,
    iconRight: false,
    onClick: () => alert('Link clicked!')
  });
export const IconButton = () =>
  createButton({
    primary: false,
    outline: true,
    size: 'md',
    label: 'IconButton',
    iconLeft: false,
    iconRight: true,
    onClick: () => alert('Icon Button clicked!')
  });
