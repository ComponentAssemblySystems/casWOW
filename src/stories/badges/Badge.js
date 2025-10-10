export const createBadge = ({
  label
}) => {
  const badge = document.createElement('div');

  badge.textContent = label;

  return badge;
};

// Storybook stories for 5 button variations
export const Default = () =>
  createBadge({
    label: 'Badge'
  });
