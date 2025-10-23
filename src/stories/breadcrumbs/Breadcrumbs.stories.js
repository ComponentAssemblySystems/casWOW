import { createBreadcrumbs } from './Breadcrumbs';
import './Breadcrumbs.css';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Components/Breadcrumbs',
  component: createBreadcrumbs,
  tags: ['component'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/EM5KcfOyqRBsPTRkbvT5Kn/Component-Assembly-Design-System?node-id=17-348&m=dev',
    },
  },
  render: (args) => createBreadcrumbs(args),
};

export const Simple = {};
