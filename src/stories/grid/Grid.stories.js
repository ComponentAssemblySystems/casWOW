import { createGrid } from './Grid';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Layout/Grid',
  component: createGrid,
  tags: ['page element'],
  // tags: ['autodocs'],
  render: ({ ...args }) => {
    return createGrid({ ...args });
  },
  argTypes: {
    state: {
      options: ['Default', 'FixedGridWidths', 'AdaptiveColumnWidths']
    },
  },
};

export const Default = {
  args: {
    state: 'Default',
  },
};
export const FixedGridWidths = {
  args: {
    state: 'FixedGridWidths',
  },
};
export const AdaptiveColumnWidths = {
  args: {
    state: 'AdaptiveColumnWidths',
  },
};
