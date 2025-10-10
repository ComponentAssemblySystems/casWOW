export const createCounter = ({
  label
}) => {
  const button = document.createElement('button');
  button.className = 'btn btn-primary position-relative';

  counter.innerHTML = `
    Inbox
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
      99+
      <span class="visually-hidden">unread messages</span>
    </span>
  `;

  counter.textContent = label;

  return counter;
};

