import './chat.css';
import { createNavigation } from './navigation/Navigation';
import { createChatbot } from './chatbot/Chatbot';

export const createChat = () => {
  const article = document.createElement('article');
  article.className = 'chat-article';

  const section = document.createElement('section');
  section.className = 'chat-wrapper';
  article.appendChild(section);

  const navigation = createNavigation({
    title: 'Chat',
    user: {
      name: 'Adam Jolicoeur',
    },
    onLogout: () => console.log('Logout clicked'),
    onLogin: () => console.log('Login clicked'),
    onCreateAccount: () => console.log('Create account clicked'),
  });
  article.prepend(navigation);

  const startScreen = createChatbot({ state: 'startScreen' });
  section.appendChild(startScreen);

  const chatThreads = createChatbot({ state: 'chatThreads' });
  section.appendChild(chatThreads);

  const chatInput = createChatbot({ state: 'chatInput' });
  section.appendChild(chatInput);

  return article;
};
