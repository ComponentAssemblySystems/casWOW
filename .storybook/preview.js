/** @type { import('@storybook/html-vite').Preview } */
import { themes } from 'storybook/theming';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import '../docs/css/caswow.css';
import '../docs/css/tokens.css';
import '../docs/css/site.css';
import '../docs/css/fontawesome.css';
import '../docs/css/solid.css';
import '../docs/css/brands.css';
import DocumentationTemplate from './DocumentationTemplate.mdx';

const customViewports = {
  widescreen: {
    name: 'Widescreen 2160x1440',
    styles: {
      width: '2160px',
      height: '1440px',
    },
    type: 'desktop',
  },
  defaultScreen: {
    name: '1080p 1920x1080',
    styles: {
      width: '1920px',
      height: '1080px',
    },
    type: 'desktop',
  },
  smallScreen: {
    name: '1440x720',
    styles: {
      width: '1440px',
      height: '720px',
    },
    type: 'desktop',
  },
  ipad129: {
    name: 'iPad 12.9',
    styles: {
      width: '1024px',
      height: '1366px',
    },
    type: 'tablet',
  },
  iphoneProMax: {
    name: 'iPhone Pro Max',
    styles: {
      width: '430px',
      height: '932px',
    },
    type: 'mobile',
  },
};

const preview = {
  parameters: {
    layout: 'padded',
    options: {
      storySort: {
        order: ['Introduction', 'Getting Started', 'Colors', 'Typography', 'Icons', 'Variables', 'Pages', ['Login', 'Dashboard', 'Tables'], 'Components', '*', 'WIP'],
      },
    },
    viewport: {
      options: {
        ...customViewports,
      }
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      expanded: true,
      hideNoControlsWarning: true,
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    docs: {
      theme: themes.yourTheme,
      page: DocumentationTemplate,
      toc: true, // 👈 Enables the table of contents
    },
  }
};

export default preview;
