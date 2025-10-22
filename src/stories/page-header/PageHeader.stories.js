import { createPageHeader } from './PageHeader';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Components/Page Header',
  component: 'PageHeaderComponent',
  tags: ['page element'],
  // tags: ['autodocs'],
  render: ({ ...args }) => {
    return createPageHeader({ ...args });
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['Default', 'ChatBot']
    },
  },
  // parameters: {
  //   design: {
  //     type: 'figma',
  //     url: '',
  //   },
  // },
};

export const Default = {
  args: {
    state: 'Default',
  },
};
export const ChatBot = {
  args: {
    state: 'ChatBot',
  },
};
