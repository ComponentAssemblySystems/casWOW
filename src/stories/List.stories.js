import { createListItem } from './ListItem';

export default {
  title: 'Components/List',
  subcomponents: { createListItem },
  component: 'ListComponent',
  // tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/EM5KcfOyqRBsPTRkbvT5Kn/Component-Assembly-Design-System?node-id=1099-14336&m=dev',
    },
  },
};

export const List = () => {
  const list = document.createElement('ul');

  return list;
}

export const ListItem = () => {
  const list = document.createElement('ul');
  list.appendChild(createListItem({ text: 'Item 1' }));
  return list;
};

export const DescriptionList = () => {
  const list = document.createElement('ul');
  list.appendChild(createListItem({ text: 'Item 1', selected: false }));
  list.appendChild(createListItem({ text: 'Item 2', selected: false }));
  list.appendChild(createListItem({ text: 'Item 3', selected: false }));
  return list;
};
