import { createListItem } from './ListItem';

export default {
  title: 'Components/List',
  tags: ['autodocs'],
};

export const SimpleList = () => {
  const list = document.createElement('ul');
  list.appendChild(createListItem({ text: 'Item 1', selected: true }));
  list.appendChild(createListItem({ text: 'Item 2', selected: false }));
  list.appendChild(createListItem({ text: 'Item 3', selected: false }));
  return list;
};
