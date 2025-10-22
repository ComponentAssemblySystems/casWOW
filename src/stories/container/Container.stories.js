import { createContainer } from './Container';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Layout/Container',
  component: createContainer,
  tags: ['page element'],
  // tags: ['autodocs'],
  render: ({ ...args }) => {
    return createContainer({ ...args });
  },
  argTypes: {
    state: {
      options: ['Default', 'FixedContainerWidths', 'FixedColumnWidths']
    },
  },
};

export const Default = {
  args: {
    state: 'Default',
  },
};
export const FixedContainerWidths = {
  args: {
    state: 'FixedContainerWidths',
  },
};
export const FixedColumnWidths = {
  args: {
    state: 'FixedColumnWidths',
  },
};
