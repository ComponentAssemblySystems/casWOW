/** @type { import('@storybook/html-vite').Preview } */

import 'bootstrap/dist/css/bootstrap.min.css';
import '../docs/css/caswow.css';
import '../docs/css/tokens.css';
import '../docs/css/site.css';
import '../docs/css/fontawesome.css';
import '../docs/css/solid.css';
import '../docs/css/brands.css';

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      expanded: true,
      hideNoControlsWarning: true,
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    }
  },
};

export default preview;
