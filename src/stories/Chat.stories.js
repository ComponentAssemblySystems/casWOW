import { createChat } from './Chat';

export default {
  title: 'Example/Chat',
  render: () => createChat(),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  },
};

export const ChatScreen = {
  tags: ['experimental'],
};
