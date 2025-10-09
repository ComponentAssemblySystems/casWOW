import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

export default create({
  base: 'light',
  brandTitle: 'CASWOW UI Components',
  brandUrl: '',
  brandImage: '/img/CAS_logo.svg', // Use leading slash for public root
  brandTarget: '_self',
  //
  colorPrimary: '#3A10E5',
  colorSecondary: '#758c9b',
  // UI
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#758c9b',
  appBorderRadius: 12,
  // Text colors
  textColor: '#20252c',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#9E9E9E',
  barSelectedColor: '#585C6D',
  barHoverColor: '#585C6D',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '758c9b',
  inputTextColor: '#43505b',
  inputBorderRadius: 12,
});
