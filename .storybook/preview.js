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

const preview = {
  parameters: {
    layout: 'centered',
    options: {
      storySort: {
        order: ['Introduction', 'Pages', ['Login', 'Dashboard', 'Tables'], 'Components', '*', 'WIP'],
      },
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
