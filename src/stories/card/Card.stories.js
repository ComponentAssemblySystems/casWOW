import { create } from 'storybook/internal/theming';
import { createCard } from './Card';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Components/Card',
  component: 'CardComponent',
  tags: ['component'],
  // tags: ['autodocs'],
  render: ({ ...args }) => {
    return createCard({ ...args });
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['Default']
    },
    image: {
      control: 'boolean',
      options: [true, false]
    },
  },
  // parameters: {
  //   design: {
  //     type: 'figma',
  //     url: '',
  //   },
  // },
};

export const Default = {
  args: {
    state: 'Default',
    image: false,
  },
};
export const CardImage = {
  args: {
    state: 'Image',
    image: true,
  },
};

export const NoHeader = () => {
  return `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Costs</h5>
        <p class="card-text">
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </p>
      </div>
    </div>
  `;
};

export const CardWithActions = () => {
  return `
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title">Costs</h5>
        <button class="btn btn-sm btn-outline-secondary dropdown-toggle settings-dropdown-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Settings">
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><h6 class="dropdown-header">Configure</h6></li>
          <li><a class="dropdown-item" href="">Make Primary</a></li>
          <li><a class="dropdown-item" href="">Hide</a></li>
        </ul>
      </div>
      <div class="card-body">
        <canvas id="costsChart"></canvas>
      </div>
    </div>
  `;
};
