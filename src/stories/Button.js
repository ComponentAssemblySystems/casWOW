export const createButton = ({
  primary = false,
  size = 'md',
  backgroundColor,
  label,
  onClick,
}) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.innerText = label;
  btn.addEventListener('click', onClick);

  const mode = primary ? 'btn btn-primary' : 'btn btn-secondary';
  btn.className = ['btn', `btn btn-${size}`, mode].join(' ');

  btn.style.backgroundColor = backgroundColor;

  return btn;
};
