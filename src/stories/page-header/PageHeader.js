import { createBreadcrumbs } from '../breadcrumbs/Breadcrumbs';

export const createPageHeader = ({}) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'page-header';

  // Top page header with breadcrumbs inside
  const topPageHeader = document.createElement('div');
  topPageHeader.className = 'top-page-header';
  topPageHeader.appendChild(createBreadcrumbs({}));
  wrapper.appendChild(topPageHeader);

  // Page header text (adjacent to topPageHeader)
  const pageHeaderText = document.createElement('div');
  pageHeaderText.className = 'page-header-text';

  // logo-text-badge-link
  const logoTextBadgeLink = document.createElement('div');
  logoTextBadgeLink.className = 'logo-text-badge-link';
  logoTextBadgeLink.innerHTML = `
    <div class="header-subheader">
      <div class="header-label">
        <span class="h2">Page Title</span>
        <span class="badge bg-secondary">Draft</span>
      </div>
      <span class="text-secondary">Subheader text</span>
    </div>
  `;
  pageHeaderText.appendChild(logoTextBadgeLink);

  // buttonStripe after logo-text-badge-link
  const buttonStripe = document.createElement('div');
  buttonStripe.className = 'button-stripe';
  buttonStripe.innerHTML = `
    <button type="button" class="btn btn-outline-secondary">Button</button>
    <button type="button" class="btn btn-outline-secondary">Button</button>
    <button type="button" class="btn btn-outline-secondary">Button</button>
    <button type="button" class="btn btn-primary">Primary</button>
  `;
  pageHeaderText.appendChild(buttonStripe);

  wrapper.appendChild(pageHeaderText);

  return wrapper;
};

// Storybook stories
export const Default = () => createPageHeader({});
