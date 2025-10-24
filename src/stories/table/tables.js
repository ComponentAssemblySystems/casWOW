import './tables.css';
// import { createNavigation } from './navigation/Navigation';
// import { createChatbot } from './chatbot/Chatbot';

export const createTables = ({
  striped = false,
  label,
}) => {
  const tables = document.createElement('table');
  tables.className = 'table';

  let mode;
  if (striped) {
    mode = 'table-striped table-hover';
  } else if (label === 'table-bordered') {
    mode = 'table-bordered table-hover';
  } else {
    mode = 'table-hover';
  }

  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th scope="col">Plans</th>
      <th scope="col">Project</th>
      <th scope="col">Budget hours</th>
      <th scope="col">Equated hours</th>
      <th scope="col">Actual hours</th>
      <th scope="col">Delta hours</th>
      <th scope="col"># Days</th>
      <th scope="col">% Complete</th>
      <th scope="col">% Update</th>
      <th scope="col">Times updated</th>
      <th scope="col">Budget updated</th>
    </tr>
  `;
  tables.appendChild(thead);

  const tbody = document.createElement('tbody');
  tbody.innerHTML = `
    <tr>
      <th scope="row">
        <a href="https://componentassemblysystems.github.io/casWOW/plans">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-easel" viewBox="0 0 16 16">
            <path d="M8 0a.5.5 0 0 1 .473.337L9.046 2H14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1.85l1.323 3.837a.5.5 0 1 1-.946.326L11.092 11H8.5v3a.5.5 0 0 1-1 0v-3H4.908l-1.435 4.163a.5.5 0 1 1-.946-.326L3.85 11H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4.954L7.527.337A.5.5 0 0 1 8 0M2 3v7h12V3z"/>
          </svg>
        </a>
      </th>
      <td>
        <span class="badge rounded-pill text-bg-info">717</span> <a href="">Mandalore Palace</a>
      </td>
      <td>186,455</td>
      <td>186,455</td>
      <td>179,252</td>
      <td>
        <span class="text-neutral">7,203</span>
      </td>
      <td>856</td>
      <td>
        <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar bg-primary" style="width: 85%">85</div>
        </div>
      </td>
      <td>03/08/2024</td>
      <td>21</td>
      <td>08/24/2024</td>
    </tr>
  `;
  tables.appendChild(tbody);

  // const article = document.createElement('article');
  // article.className = 'chat-article';

  // const section = document.createElement('section');
  // section.className = 'chat-wrapper';
  // article.appendChild(section);

  // const navigation = createNavigation({
  //   title: 'Chat',
  //   user: {
  //     name: 'Adam Jolicoeur',
  //   },
  //   onLogout: () => console.log('Logout clicked'),
  //   onLogin: () => console.log('Login clicked'),
  //   onCreateAccount: () => console.log('Create account clicked'),
  // });
  // article.prepend(navigation);

  // const startScreen = createChatbot({ state: 'startScreen' });
  // section.appendChild(startScreen);

  // const chatThreads = createChatbot({ state: 'chatThreads' });
  // section.appendChild(chatThreads);

  // const chatConfiguration = createChatbot({ state: 'chatConfiguration' });
  // section.appendChild(chatConfiguration);

  // const chatHistory = createChatbot({ state: 'chatHistory' });
  // section.appendChild(chatHistory);

  // const chatInput = createChatbot({ state: 'chatInput' });
  // section.appendChild(chatInput);

  tables.className = ['table', mode].join(' ');

  return tables;
};

export const Default = () =>
  createTables({
    label: 'Default',
    striped: true,
  });
export const Striped = () =>
  createTables({
    striped: true,
    label: 'table-striped',
  });
export const Bordered = () =>
  createTables({
    label: 'table-bordered',
  });
