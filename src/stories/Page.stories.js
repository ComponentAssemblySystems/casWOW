import { createPage } from './Page';

export default {
  title: 'Examples/Page',
  render: () => createPage(),
  tags: ['example'],
  globals: {
    background: { value: 'light' },
  },
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const LoggedOut = {};
