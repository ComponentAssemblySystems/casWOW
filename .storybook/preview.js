/** @type { import('@storybook/html-vite').Preview } */
import { themes } from 'storybook/theming';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import '../docs/css/caswow.css';
import '../docs/css/tokens.css';
import '../docs/css/site.css';
import '../docs/css/fontawesome.css';
import '../docs/css/solid.css';
import '../docs/css/brands.css';
import DocumentationTemplate from './DocumentationTemplate.mdx';

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
    attributeName: 'data-bs-theme',
  }),
];

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
  // globalTypes: {
  //   theme: {
  //     description: 'Global theme for components',
  //     toolbar: {
  //       title: 'Theme',
  //       icon: 'paintbrush',
  //       items: [
  //         { value: 'light', title: 'Light Theme', left: '☀️' },
  //         { value: 'dark', title: 'Dark Theme', left: '🌑' },
  //       ],
  //       dynamicTitle: true,
  //     }
  //   }
  // },
  parameters: {
    layout: 'padded',
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: '#20252c' },
        light: { name: 'Light', value: '#ffffff' },
        cas: { name: 'CAS Blue', value: '#003366' },
      }
    },
    options: {
      storySort: {
        order: ['Styleguide', 'Introduction', 'Getting Started', 'Components', '*', 'WIP'],
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
      // toc: true, // 👈 Enables the table of contents
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2, h3',
        ignoreSelector: '#primary',
        title: 'Table of Contents',
        disable: false,
        unsafeTocbotOptions: {
          orderedList: false,
        },
      },
    },
  },
  initialGlobals: {
    theme: 'light',
    backgrounds: { value: 'light' },
  },
};

export default preview;
