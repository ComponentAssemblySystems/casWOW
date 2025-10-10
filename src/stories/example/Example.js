export const createExample = ({
  label,
  onClick,
}) => {
  const example = document.createElement('p');
  example.type = 'p';
  example.addEventListener('click', onClick);
  example.textContent = label;

  example.className = ['p'].join(' ');

  return example;
};

// Storybook stories for variations
export const Primary = () =>
  createExample({
    label: 'Primary',
    onClick: () => alert('Primary clicked!')
  });
export const Second = () =>
  createExample({
    label: 'Second',
    onClick: () => alert('Second clicked!')
  });
