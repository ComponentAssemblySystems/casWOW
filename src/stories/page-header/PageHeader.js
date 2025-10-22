export const createPageHeader = ({
  state = 'default',
}) => {
  const pageheader = document.createElement('div');

  let mode;
  let content;
  if (state === 'Default') {
    mode = 'page-header';
    content = `
      <div class="page-header">
        <div class="top-page-header">
          <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="#">Dashboard</a>
              </li>
              <li class="breadcrumb-item">
                <a href="#">Page item</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Page item</li>
            </ol>
          </nav>
        </div>
        <div class="page-header-text">
          <div class="logo-text-badge-link">
            <div class="header-subheader">
              <div class="header-label">
                <span class="h2">Page Title</span>
                <span class="badge bg-secondary">Draft</span>
              </div>
              <span class="text-secondary">Subheader text</span>
            </div>
          </div>
          <div class="button-stripe">
          <button type="button" class="btn btn-outline-secondary">Button</button>
            <button type="button" class="btn btn-outline-secondary">Button</button>
            <button type="button" class="btn btn-outline-secondary">Button</button>
            <button type="button" class="btn btn-primary">Primary</button>
          </div>
        </div>
        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Active</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Inactive</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
          </li>
        </ul>
      </div>
    `;
  } else if (state === 'ChatBot') {
    mode = 'page-header chat-bot';
    content = `
      <span>Hello Chatbot</span>
    `;
  }

  pageheader.innerHTML = content;
  pageheader.className = ['pageheader', mode].join(' ');

  return pageheader;
};

// Storybook stories
export const Default = () =>
  createPageHeader({
    state: 'Default',
  });
// Storybook stories
export const ChatBot = () =>
  createPageHeader({
    state: 'ChatBot',
  });
