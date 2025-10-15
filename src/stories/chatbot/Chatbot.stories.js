import { createChatbot } from './Chatbot';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Components/Chatbot',
  component: 'ChatbotComponent',
  tags: ['experimental'],
  // tags: ['autodocs'],
  render: ({ ...args }) => {
    return createChatbot({ ...args });
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['startScreen', 'chatThreads', 'chatInput', 'chatHistory', 'chatError']
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/YCk0nGyyEGeCoxxWOm0rya/CASim-AI?node-id=972-49259&m=dev',
    },
  },
};

export const StartScreen = {
  args: {
    state: 'startScreen',
  },
};

export const ChatThreads = {
  args: {
    state: 'chatThreads',
  },
};

export const ChatInput = {
  args: {
    state: 'chatInput',
  },
};

export const ChatHistory = {
  args: {
    state: 'chatHistory',
  },
};

export const ChatError = {
  args: {
    state: 'chatError',
  },
};

