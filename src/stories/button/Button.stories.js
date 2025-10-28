import { fn } from 'storybook/test';
import { createButton } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Components/Buttons',
  component: createButton,
  id: 'Components/Buttons',
  tags: ['component'],
  render: ({ label, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return createButton({ label, ...args });
  },
  argTypes: {
    backgroundColor: { control: 'color' },
    label: { control: 'text' },
    onClick: { action: 'onClick' },
    primary: { control: 'boolean' },
    outline: { control: 'boolean' },
    iconLeft: { control: 'boolean'},
    iconRight: { control: 'boolean'},
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
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
    primary: true,
    outline: false,
    size: 'md',
    label: 'Primary Button',
    iconLeft: false,
    iconRight: false,
  },
};

export const Secondary = {
  args: {
    primary: false,
    outline: false,
    size: 'md',
    label: 'Button',
    iconLeft: false,
    iconRight: false,
  },
};

export const Info = {
  args: {
    primary: false,
    outline: false,
    size: 'md',
    label: 'Info',
    iconLeft: false,
    iconRight: false,
  },
};
export const Danger = {
  args: {
    primary: false,
    outline: false,
    size: 'md',
    label: 'Danger',
    iconLeft: false,
    iconRight: false,
  },
};
export const Success = {
  args: {
    primary: false,
    outline: false,
    size: 'md',
    label: 'Success',
    iconLeft: false,
    iconRight: false,
  },
};
export const Warning = {
  args: {
    primary: false,
    outline: false,
    size: 'md',
    label: 'Warning',
    iconLeft: false,
    iconRight: false,
  },
};
export const Light = {
  args: {
    primary: false,
    outline: false,
    size: 'md',
    label: 'Light',
    iconLeft: false,
    iconRight: false,
  },
};
export const Dark = {
  args: {
    primary: false,
    outline: false,
    size: 'md',
    label: 'Dark',
    iconLeft: false,
    iconRight: false,
  },
};

export const Large = {
  args: {
    primary: false,
    outline: false,
    size: 'lg',
    label: 'Button',
    iconLeft: false,
    iconRight: false,
  },
};

export const Small = {
  args: {
    primary: false,
    outline: false,
    size: 'sm',
    label: 'Button',
    iconLeft: false,
    iconRight: false,
  },
};

export const Outline = {
  args: {
    primary: true,
    outline: true,
    size: 'md',
    label: 'Primary Outline',
    iconLeft: false,
    iconRight: false,
  },
};

export const IconButton = {
  args: {
    primary: false,
    outline: true,
    size: 'md',
    label: 'Icon Button',
    iconLeft: false,
    iconRight: true,
  },
};
