import { createIcon } from './iconography';

export default {
  title: 'Styleguide/Icons',
  id: 'Styleguide/Icons',
  tags: ['styleguide', 'iconography', 'component'],
  render: ({ name, ...args }) => {
    return createIcon({ name, ...args });
  },
  globals: {
    background: { value: 'light' },
  },
  argTypes: {
    name: { control: 'text' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/EM5KcfOyqRBsPTRkbvT5Kn/Component-Assembly-Design-System?node-id=2104-2817&m=dev',
    },
  },
};

export const Default = {
  args: {
    name: 'star',
  },
};

