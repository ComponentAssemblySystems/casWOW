// import { createButton } from '../button/Button';
import './chatbot.css';
import constructionAvatar from '../../../docs/img/construction.png';
import chatbotAvatar from '../../../docs/img/chatbot.png';

export const createChatbot = ({
  state = 'startScreen',
}) => {
  const chatbot = document.createElement('div');

  let mode;
  let content;

  if (state === 'startScreen') {
    mode = 'chatbot-start-screen';
    content = `
      <div class="welcome-message">
        <div class="text-block">
          <h2>Welcome!</h2>
          <h3>How may I help you today?</h3>
        </div>
        <div class="shortcut-cards">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Current active jobs</h5>
              What are the current active jobs in New York?
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Budget status by project</h5>
              Show me the current projects by their budget status.
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (state === 'chatInput') {
    mode = 'chatbot-chat-input';
    content =`
      <div class="input-group">
        <input type="text" class="form-control message-bar" placeholder="Send a message" aria-label="Send a message to the chatbot">
        <button type="button" class="btn btn-outline-primary" type="button">
          <i class="fa-solid fa-paperclip"></i>
          <span class="visually-hidden">Attach a file</span>
        </button>
        <button type="button" class="btn btn-outline-primary" type="button">
          <i class="fa-solid fa-microphone"></i>
          <span class="visually-hidden">Record audio</span>
        </button>
        <button type="button" class="btn btn-primary" type="button">
          <i class="fa-solid fa-paper-plane"></i>
          <span class="visually-hidden">Send a message</span>
        </button>
      </div>
    `;
  } else if (state === 'chatError') {
    mode = 'chatbot-error';
    content = `
      <div class="chatbot-message-group message-bot">
        <div class="chat-avatar">
          <img src="${chatbotAvatar}" alt="User Avatar" style="width: 32px; height: 32px; border-radius: 50%;">
        </div>
        <div class="chat-message-contents">
          <div class="chat-message-metadata">
            <div class="chat-metadata__name">ASK CASim</div>
            <div class="badge text-bg-secondary">AI</div>
            <div class="small text-secondary">1:31 PM</div>
          </div>
          <div class="chat-message">
            <div class="alert alert-light border-0 bg-transparent" role="alert">
              <div>
                <i class="fa-solid fa-exclamation-circle pe-1"></i>
                The response could not be loaded from the server. Please try again.
              </div>
              <button type="button" class="btn btn-sm btn-outline-danger">Try again</button>
            </div>
          </div>
        </div>
        <div class="chatbot-response-actions">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-outline-secondary btn-sm px-2">
              <i class="fa-solid fa-thumbs-up"></i>
              <span class="visually-hidden">Thumbs up</span>
            </button>
            <button type="button" class="btn btn-outline-secondary btn-sm px-2">
              <i class="fa-solid fa-thumbs-down"></i>
              <span class="visually-hidden">Thumbs down</span>
            </button>
            <button type="button" class="btn btn-outline-secondary btn-sm px-2">
              <i class="fa-solid fa-copy"></i>
              <span class="visually-hidden">Copy response</span>
            </button>
            <button type="button" class="btn btn-outline-secondary btn-sm px-2">
              <i class="fa-solid fa-share"></i>
              <span class="visually-hidden">Share response</span>
            </button>
            <button type="button" class="btn btn-outline-secondary btn-sm px-2">
              <i class="fa-solid fa-refresh"></i>
              <span class="visually-hidden">Refresh response and try again</span>
            </button>
          </div>
        </div>
      </div>
    `;
  } else if (state === 'chatThreads') {
    mode = 'chatbot-chat-threads';
    content = `
      <div class="chatbot-message-group">
        <div class="chat-avatar">
          <img src="${constructionAvatar}" alt="User Avatar" style="width: 32px; height: 32px; border-radius: 50%;">
        </div>
        <div class="chat-message-contents">
          <div class="chat-message-metadata">
            <div class="chat-metadata__name">Adam</div>
            <div class="badge text-bg-secondary">User</div>
            <div class="small text-secondary">1:30 PM</div>
          </div>
          <div class="chat-message">
            <p>Show the extra work orders for N823.</p>
          </div>
        </div>
      </div>
      <div class="chatbot-message-group message-bot">
        <div class="chat-avatar">
          <img src="${chatbotAvatar}" alt="User Avatar" style="width: 32px; height: 32px; border-radius: 50%;">
        </div>
        <div class="chat-message-contents">
          <div class="chat-message-metadata">
            <div class="chat-metadata__name">ASK CASim</div>
            <div class="badge text-bg-secondary">AI</div>
            <div class="small text-secondary">1:31 PM</div>
          </div>
          <div class="chat-message">
            <p>N823 has $139,713.00 of extra work orders.</p>
          </div>
        </div>
        <div class="chatbot-response-actions">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-outline-secondary btn-sm px-2">
              <i class="fa-solid fa-thumbs-up"></i>
              <span class="visually-hidden">Thumbs up</span>
            </button>
            <button type="button" class="btn btn-outline-secondary btn-sm px-2">
              <i class="fa-solid fa-thumbs-down"></i>
              <span class="visually-hidden">Thumbs down</span>
            </button>
            <button type="button" class="btn btn-outline-secondary btn-sm px-2">
              <i class="fa-solid fa-copy"></i>
              <span class="visually-hidden">Copy response</span>
            </button>
            <button type="button" class="btn btn-outline-secondary btn-sm px-2">
              <i class="fa-solid fa-share"></i>
              <span class="visually-hidden">Share response</span>
            </button>
            <button type="button" class="btn btn-outline-secondary btn-sm px-2">
              <i class="fa-solid fa-refresh"></i>
              <span class="visually-hidden">Refresh response and try again</span>
            </button>
          </div>
        </div>
      </div>
    `;
  } else if (state === 'chatHistory') {
    mode = 'chatbot-chat-history';
    content = `
      <div class="chatbot-history">
        <div class="history-header">
          <h3>Chat History</h3>
          <button type="button" class="btn btn-sm btn-outline-primary">Back to Chat</button>
        </div>
        <div class="history-list">
          <div class="history-item">
            <div class="history-title">Project Setup Questions</div>
            <div class="history-date">October 14, 2025 - 2:30 PM</div>
            <div class="history-preview">How do I create a new project?</div>
          </div>
          <div class="history-item">
            <div class="history-title">Report Generation Help</div>
            <div class="history-date">October 13, 2025 - 10:15 AM</div>
            <div class="history-preview">Can you help me generate a cost report?</div>
          </div>
          <div class="history-item">
            <div class="history-title">Vendor Information Query</div>
            <div class="history-date">October 12, 2025 - 4:45 PM</div>
            <div class="history-preview">How do I update vendor contact information?</div>
          </div>
        </div>
      </div>
    `;
  }

  chatbot.innerHTML = content;
  chatbot.className = ['chatbot', mode].join(' ');

  return chatbot;
};

// Storybook stories
export const StartScreen = () =>
  createChatbot({
    state: 'startScreen',
  });

export const ChatThreads = () =>
  createChatbot({
    state: 'chatThreads',
  });

  export const ChatInput = () =>
  createChatbot({
    state: 'chatInput',
  });

export const ChatHistory = () =>
  createChatbot({
    state: 'chatHistory',
  });

  export const ChatError = () =>
  createChatbot({
    state: 'chatError',
  });
