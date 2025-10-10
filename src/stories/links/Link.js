export const createLink = ({
  heavy = false,
  external = false,
  label
}) => {
  const link = document.createElement('a');

  let mode;
  if (heavy) {
    mode = external ? 'fw-bold icon-link' : 'fw-bold';
  } else {
    mode = external ? 'icon-link' : '';
  }
  link.className = [mode].join(' ');

  link.textContent = label;

  if (external) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('class', 'bi');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z');
    svg.appendChild(path);
    link.appendChild(svg);
  }

  return link;
};

// Storybook stories for 5 button variations
export const DefaultLink = () =>
  createLink({
    heavy: false,
    external: false,
    label: 'Link'
  });
export const HeavyLink = () =>
  createLink({
    heavy: true,
    external: false,
    label: 'Heavy Link'
  });
export const ExternalHeavyLink = () =>
  createLink({
    heavy: true,
    external: true,
    label: 'External Heavy Link'
  });
export const ExternalLink = () =>
  createLink({
    heavy: false,
    external: true,
    label: 'External Link'
  });
