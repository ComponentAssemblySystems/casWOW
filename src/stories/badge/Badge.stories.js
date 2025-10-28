import { fn } from 'storybook/test';

import { createBadge } from './Badge';
import { createCounter } from './Counter';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Components/Badge',
  component: createBadge,
  id: 'Components/Badge',
  tags: ['component'],
  render: ({ label, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return createBadge({ label, ...args });
  },
  argTypes: {
    count: { control: 'boolean' },
    label: { control: 'text' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/EM5KcfOyqRBsPTRkbvT5Kn/Component-Assembly-Design-System?node-id=1099-14336&m=dev',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    count: false,
    label: 'Primary',
  },
};
export const Secondary = {
  args: {
    count: false,
    label: 'Secondary',
  },
};
export const Success = {
  args: {
    count: false,
    label: 'Success',
  },
};
export const Danger = {
  args: {
    count: false,
    label: 'Danger',
  },
};
export const Warning = {
  args: {
    count: false,
    label: 'Warning',
  },
};
export const Info = {
  args: {
    count: false,
    label: 'Info',
  },
};
export const Light = {
  args: {
    count: false,
    label: 'Light',
  },
};
export const Dark = {
  args: {
    count: false,
    label: 'Dark',
  },
};
