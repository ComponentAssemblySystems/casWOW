import { fn } from 'storybook/test';

import { createBadge } from './Badge';
import { createCounter } from './Counter';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Components/Badge',
  component: createBadge,
  id: 'Components/Badge',
  tags: ['component'],
  render: ({ label, primary, outline, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return createBadge({ label, primary, outline, ...args });
  },
  argTypes: {
    count: { control: 'boolean' },
    label: { control: 'text' },
    primary: { control: 'boolean' },
    outline: { control: 'boolean' },
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
    outline: false,
    primary:  true,
  },
};
export const Secondary = {
  args: {
    count: false,
    label: 'Secondary',
    outline: false,
    primary:  false,
  },
};
export const Success = {
  args: {
    count: false,
    label: 'Success',
    outline: false,
    primary:  false,
  },
};
export const Danger = {
  args: {
    count: false,
    label: 'Danger',
    outline: false,
    primary:  false,
  },
};
export const Warning = {
  args: {
    count: false,
    label: 'Warning',
    outline: false,
    primary:  false,
  },
};
export const Info = {
  args: {
    count: false,
    label: 'Info',
    outline: false,
    primary:  false,
  },
};
export const Light = {
  args: {
    count: false,
    label: 'Light',
    outline: false,
    primary:  false,
  },
};
export const Dark = {
  args: {
    count: false,
    label: 'Dark',
    outline: false,
    primary:  false,
  },
};
export const BadgeInsideButton = () => {
  return `
    <button type="button" class="btn btn-primary">
      Notifications <span class="badge text-bg-light">4</span>
    </button>
  `;
};
export const BadgeAsCounter = () => {
  return `
    <button type="button" class="btn btn-outline-primary position-relative">
      Inbox
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        99+
        <span class="visually-hidden">unread messages</span>
      </span>
    </button>
  `;
};
