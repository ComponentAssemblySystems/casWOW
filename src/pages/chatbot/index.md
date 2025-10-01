---
layout: base.njk
---

<div class="container py-5">
  <div class="row justify-content-center">
    <div class="col-lg-8">
      <div class="card chatbot-header p-4 mb-0">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center gap-3">
            <!-- Hamburger + Logo Placeholder -->
            <span class="navbar-toggler-icon"></span>
            <span class="fw-bold text-primary">CASim-AI</span>
          </div>
          <div class="d-flex align-items-center gap-3">
            <button class="btn btn-light chatbot-btn-circle" title="More options"><i class="bi bi-three-dots-vertical" aria-hidden="true"></i></button>
          </div>
        </div>
      </div>
      <div class="card p-4 chatbot-card border-0 rounded-top-0">
        <div class="mb-4">
          <h2 class="fw-semibold text-primary mb-1 chatbot-h2">Hello, ChatBot User</h2>
          <div class="text-secondary chatbot-subtitle">How may I help you today?</div>
        </div>
        <div class="row g-3 mb-4">
          <div class="col-md-6">
            <div class="card chatbot-card p-3 h-100">
              <h5 class="fw-normal mb-2">Current active jobs</h5>
              <div class="text-body">What are the current active jobs for New York?</div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card chatbot-card p-3 h-100">
              <h5 class="fw-normal mb-2">Budget status by project</h5>
              <div class="text-body">Show me the current projects by their budget status.</div>
            </div>
          </div>
        </div>
        <div class="chatbot-footer p-4 mt-4">
          <div class="border-top mb-3 chatbot-divider"></div>
          <div class="d-flex align-items-center chatbot-message-bar bg-white px-4 py-2 mb-2">
            <div class="flex-grow-1 text-secondary">Send a message...</div>
            <button class="btn btn-link chatbot-btn-circle" title="Attach file"><i class="bi bi-paperclip text-secondary" aria-hidden="true"></i></button>
            <button class="btn btn-link chatbot-btn-circle" title="Send message"><i class="bi bi-send text-primary" aria-hidden="true"></i></button>
          </div>
          <div class="d-flex justify-content-center">
            <small class="text-primary">Bot uses AI. Check for mistakes.</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
