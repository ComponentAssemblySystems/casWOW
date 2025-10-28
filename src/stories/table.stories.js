import { createTableExample } from './table';

export default {
  title: 'Example/Table',
  id: 'Example/Table',
  tags: ['example'],
  render: () => createTableExample(),
  globals: {
    background: { value: 'light' },
  },
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const Fullscreen = {};
