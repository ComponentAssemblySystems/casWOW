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
              <p class="card-text">What are the current active jobs in New York?</p>
              <a href="#" class="btn btn-sm btn-outline-primary stretched-link">Ask CASim</a>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Budget status by project</h5>
              <p class="card-text">Show me the current projects by their budget status.</p>
              <a href="#" class="btn btn-sm btn-outline-primary stretched-link">Ask CASim</a>
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
      <div class="chatbot-message-group">
        <div class="alert alert-danger bg-transparent" role="alert">
          <div>
            <i class="fa-solid fa-exclamation-circle pe-1"></i>
            The response could not be loaded from the server.
          </div>
          <button type="button" class="btn btn-sm btn-outline-danger">Ask again</button>
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
  } else if (state === 'chatConfiguration') {
    mode = 'chatbot-configuration';
    content = `
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-outline-secondary position-absolute top-0 start-0 mt-2 ms-2" data-bs-toggle="modal" data-bs-target="#configurationModal">
        <i class="fa-solid fa-gears"></i>
        <span class="visually-hidden">Open configuration modal</span>
      </button>

      <!-- Modal -->
      <div class="modal fade" id="configurationModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="configurationModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">ASK CASim Configuration</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style="min-height: 200px;">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-link" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (state === 'chatHistory') {
    mode = 'chatbot-chat-history';
    content = `
      <button class="btn btn-outline-secondary position-absolute top-0 end-0 mt-2 me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
        <i class="fa-solid fa-clock"></i>
        <span class="visually-hidden">Show History Panel</span>
      </button>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasRightLabel">CASim AI History</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <h6 class="py-2">Recent conversations</h6>
          <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action text-truncate" aria-current="true">
              <i class="fa-solid fa-comment-dots me-1"></i> Can you tell me the average time that a construction project takes to complete in Boston, MA?
            </a>
            <a href="#" class="list-group-item list-group-item-action text-truncate">
              <i class="fa-solid fa-comment-dots me-1"></i> What are the average completion times for Job 308?</a>
            <a href="#" class="list-group-item list-group-item-action text-truncate">
              <i class="fa-solid fa-comment-dots me-1"></i> What is the most recent cost of drywall in the NY area?
            </a>
            <a href="#" class="list-group-item list-group-item-action text-truncate">
              <i class="fa-solid fa-comment-dots me-1"></i> Create a chart comparing the last 2 years of material costs in Boston.
            </a>
            <a href="#" class="list-group-item list-group-item-action text-truncate disabled" aria-disabled="true">
              <i class="fa-solid fa-comment-dots me-1"></i> Show me the last two jobs that had the highest labor costs.
            </a>
          </div>
          <div class="border-bottom border-light-subtle my-4"></div>
          <div class="d-grid">
            <button class="btn btn-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
              Last 7 days
              <i class="fa-solid fa-caret-down ms-1"></i>
            </button>
          </div>
          <div class="collapse" id="collapseExample">
            <div class="list-group mt-3">
              <a href="#" class="list-group-item list-group-item-action text-truncate" aria-current="true">
                <i class="fa-solid fa-comment-dots me-1"></i> What are the average completion times for Job 308?
              </a>
              <a href="#" class="list-group-item list-group-item-action text-truncate">
                <i class="fa-solid fa-comment-dots me-1"></i> What is the most recent cost of drywall in the NY area?</a>
              <a href="#" class="list-group-item list-group-item-action text-truncate">
                <i class="fa-solid fa-comment-dots me-1"></i> Create a chart comparing the last 2 years of material costs in Boston.
              </a>
              <a href="#" class="list-group-item list-group-item-action text-truncate">
                <i class="fa-solid fa-comment-dots me-1"></i> Show me the last two jobs that had the highest labor costs.
              </a>
            </div>
          </div>
          <div class="border-bottom border-light-subtle my-4"></div>
          <div class="d-grid">
            <button class="btn btn-light" type="button">
              Last 30 days
              <i class="fa-solid fa-caret-down ms-1"></i>
            </button>
          </div>
          <div class="border-bottom border-light-subtle my-4"></div>
          <div class="d-grid">
            <button class="btn btn-light" type="button">
              Templates
              <i class="fa-solid fa-caret-down ms-1"></i>
            </button>
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
