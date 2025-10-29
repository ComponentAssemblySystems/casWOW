import { createChat } from './Chat';

export default {
  title: 'Examples/Chat',
  tags: ['example', 'experimental'],
  globals: {
    background: { value: 'light' },
  },
  render: () => createChat(),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  },
};

export const Fullscreen = {
  tags: ['experimental', '!test'],
};
