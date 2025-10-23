export const createAlert = ({
  inline = false,
  label,
  content,
  variant = 'primary',
}) => {
  const alert = document.createElement('div');
  alert.className = `alert alert-${variant}${inline ? ' inline' : ''}`;
  alert.setAttribute('role', 'alert');
  alert.innerText = content || label;
  return alert;
};

// Storybook stories
export const AlertPrimary = () =>
  createAlert({
    primary: true,
    inline: false,
    label: 'Primary',
    content: 'A simple primary alert.',
  });
export const AlertInfo = () =>
  createAlert({
    primary: false,
    inline: false,
    label: 'Info',
    content: 'A simple info alert.',
  });
