import { createAlert } from './Alert';
import './Alert.css';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Components/Alert',
  component: createAlert,
  id: 'Components/Alert',
  tags: ['component'],
  // tags: ['autodocs'],
  render: ({ label, content, ...args }) => {
    return createAlert({ label, content, ...args });
  },
  argTypes: {
    label: { control: { disable: true } },
    variant: {
      options: [
        'primary',
        'secondary',
        'info',
        'success',
        'danger',
        'warning',
        'light',
        'dark',
      ],
      control: { type: 'select' },
      content: { control: 'text' },
      primary: { control: 'boolean' },
      inline: { control: 'boolean' },
    }
  },
    parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/EM5KcfOyqRBsPTRkbvT5Kn/Component-Assembly-Design-System?node-id=75-1693&m=dev',
    },
  },
};

export const primary = {
  args: {
    variant: 'primary',
    inline: false,
    label: 'Primary',
    content: 'Toggle primary to `false` to see a secondary alert.',
  },
};
export const inline = {
  args: {
    variant: 'primary',
    inline: true,
    label: 'Inline',
    content: 'An inline alert has no padding, background, or border so that it may sit within the flow of the surrounding text.',
  },
};
export const secondary = {
  args: {
    variant: 'secondary',
    inline: false,
    label: 'secondary',
    content: 'Toggle line to `true` to see the inline variant.',
  },
};
export const info = {
  args: {
    variant: 'info',
    inline: false,
    label: 'info',
    content: 'Toggle line to `true` to see the inline variant.',
  },
};
export const success = {
  args: {
    variant: 'success',
    inline: false,
    label: 'success',
    content: 'Toggle line to `true` to see the inline variant.',
  },
};
export const danger = {
  args: {
    variant: 'danger',
    inline: false,
    label: 'danger',
    content: 'Toggle line to `true` to see the inline variant.',
  },
};
export const warning = {
  args: {
    variant: 'warning',
    inline: false,
    label: 'warning',
    content: 'Toggle line to `true` to see the inline variant.',
  },
};
export const light = {
  args: {
    variant: 'light',
    inline: false,
    label: 'light',
    content: 'Toggle line to `true` to see the inline variant.',
  },
};
export const dark = {
  args: {
    variant: 'dark',
    inline: false,
    label: 'dark',
    content: 'Toggle line to `true` to see the inline variant.',
  },
};
