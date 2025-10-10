import { fn } from 'storybook/test';

import { createBadge } from './Badge';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Components/Badge',
  component: 'BadgeComponent',
  // tags: ['autodocs'],
  render: ({ label, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return createBadge({ label, ...args });
  },
  argTypes: {
    label: { control: 'text' },
    heavy: { control: 'boolean' },
    external: { control: 'boolean' }
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
export const Default = {
  args: {
    label: 'Badge',
  },
};
