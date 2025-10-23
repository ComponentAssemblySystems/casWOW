export const createBreadcrumbs = ({ items } = {}) => {
  const defaultItems = [
    { label: 'Home', href: '#' },
    { label: 'Project Costs', href: '#' },
    { label: '815 - Building Name', href: null }
  ];
  items = items || defaultItems;
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'breadcrumb');
  const ol = document.createElement('ol');
  ol.className = 'breadcrumb';
  items.forEach((item, idx) => {
    const li = document.createElement('li');
    li.className = 'breadcrumb-item' + (idx === items.length - 1 ? ' active' : '');
    if (item.href && idx !== items.length - 1) {
      const a = document.createElement('a');
      a.href = item.href;
      a.innerText = item.label;
      li.appendChild(a);
    } else {
      li.innerText = item.label;
      if (idx === items.length - 1) {
        li.setAttribute('aria-current', 'page');
      }
    }
    ol.appendChild(li);
  });
  nav.appendChild(ol);
  return nav;
};

// Storybook stories
export const Simple = () => createBreadcrumbs({});
