import { createContainer } from './Container';
import './Container.css';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Layout/Container',
  component: createContainer,
  tags: ['page element'],
  // tags: ['autodocs'],
  render: ({ ...args }) => {
    return createContainer({ ...args });
  },
};

export const ContainerFluid = {
  args: {
    option: 'ContainerFluid',
  },
};
export const ContainerSmall = () => {
  return `
    <div class="container-sm">
      <div class="col">
        <p>100% wide until small breakpoint</p>
      </div>
    </div>
  `;
};
export const ContainerMedium = () => {
  return `
    <div class="container-md">
      <div class="col">
        <p>100% wide until medium breakpoint</p>
      </div>
    </div>
  `;
};
export const ContainerLarge = () => {
  return `
    <div class="container-lg">
      <div class="col">
        <p>100% wide until large breakpoint</p>
      </div>
    </div>
  `;
};
export const ContainerExtraLarge = () => {
  return `
    <div class="container-xl">
      <div class="col">
        <p>100% wide until extra large breakpoint</p>
      </div>
    </div>
  `;
};
export const ContainerExtraExtraLarge = () => {
  return `
    <div class="container-xxl">
      <div class="col">
        <p>100% wide until extra extra large breakpoint</p>
      </div>
    </div>
  `;
};
