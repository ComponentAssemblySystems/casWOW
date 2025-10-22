import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

export default create({
  base: 'light',
  brandTitle: 'CASWOW UI Components',
  brandUrl: '/docs/introduction',
  brandImage: '/img/CAS_logo.svg', // Use leading slash for public root
  brandTarget: '_self',
  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',
  // Colors
  colorPrimary: '#3A10E5',
  colorSecondary: '#758c9b',
  // UI
  appBg: '#ffffff',
  appContentBg: '#f4f6f7',
  appPreviewBg: '#ffffff',
  appBorderColor: '#758c9b',
  appBorderRadius: 12,
  // Text colors
  textColor: '#20252c',
  textInverseColor: '#f4f6f7',

  // Toolbar default and active colors
  barTextColor: '#9E9E9E',
  barSelectedColor: '#325d80',
  barHoverColor: '#5089b8',
  barBg: '#e2e8eb',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '758c9b',
  inputTextColor: '#43505b',
  inputBorderRadius: 12,
});
