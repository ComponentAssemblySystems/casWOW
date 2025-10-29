export const createIcon = ({
  name = 'star',
}) => {
  const icon = document.createElement('i');

  icon.className = ['fa-solid', `fa-${name}`].join(' ');

  return icon;
};

export const Star = () =>
  createIcon({
    name: 'star',
  });
