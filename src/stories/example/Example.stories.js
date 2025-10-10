import { fn } from 'storybook/test';
import { createExample } from './Example';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Components/Example',
  component: createExample,
  id: 'Components/Example',
  // tags: ['autodocs'],
  render: ({ label, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return createExample({ label, ...args });
  },
  argTypes: {
    label: { control: 'text' },
    onClick: { action: 'onClick' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    label: 'Primary Example',
  },
};

export const Second = {
  args: {
    label: 'Second Example',
  },
};
