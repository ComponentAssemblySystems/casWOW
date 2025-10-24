import './table.css';
// import { createNavigation } from './navigation/Navigation';
// import { createChatbot } from './chatbot/Chatbot';

export const createTable = () => {
  const table = document.createElement('table');
  table.className = 'table-striped table-hover';

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

  return table;
};
