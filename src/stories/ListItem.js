export const createListItem = ({ text = '', selected = false }) => {
  const item = document.createElement('li');
  item.innerText = text;
  if (selected) {
    item.className = 'selected';
  }
  return item;
};
