---
layout: base.njk
toolBar: false
eleventyNavigation:
  key: Chat
  order: 0
---

<h1 class="text-center">Welcome, Neo</h1>
<p class="h4 italic text-secondary text-center">What are you looking for today?</p>

<sl-details summary="AI Analysis" open>
  <h3>Ask the AI a Question</h3>
  <sl-input type="text" id="llm-query-input" label="What is your question?" placeholder="e.g., What was my total spending?" pill clearable>
    <sl-icon name="chat" slot="suffix"></sl-icon>
  </sl-input>
  <br />
  <div id="llm-button-container" style="display: flex; gap: var(--sl-spacing-small); margin-bottom: var(--sl-spacing-medium);">
    <sl-button id="analyze-button">
      <sl-icon slot="prefix" name="cpu"></sl-icon>
      Get AI Analysis
    </sl-button>
    <sl-button id="stop-analyze-button" variant="danger" style="display: none;">
      <sl-icon slot="prefix" name="stop-circle"></sl-icon>
      Stop Generating
    </sl-button>
    <sl-button id="new-chat-button" variant="default" style="display: none;">
      <sl-icon slot="prefix" name="plus-circle"></sl-icon>
      New Chat
    </sl-button>
  </div>
  <div id="llm-container" style="display: none;">
    <sl-card class="card-header" style="max-width: 100%; width: 100%;">
      <div slot="header">
        AI Analysis
        <sl-icon name="cpu" label="CPU Icon"></sl-icon>
      </div>
      <samp id="llm-output"></samp>
    </sl-card>
  </div>

  <div style="display: flex; flex-direction: column; gap: var(--sl-spacing-medium);">
    <h3>Chat History</h3>
    <div id="history-actions" style="display: flex; justify-content: flex-end;">
      <sl-button id="clear-history-button" size="small" variant="danger" outline>
        <sl-icon slot="prefix" name="trash"></sl-icon>
        Clear History
      </sl-button>
    </div>
    <div id="llm-history-container"></div>
  </div>
</sl-details>
<sl-details summary="Table">
  <div class="display-flex direction-row gap-1">
    <div class="display-flex direction-row gap-1 flex-end flex-grow-2">
      <sl-select id="filter-column-select" label="Filter By" value="description" style="min-width: 150px;">
          <sl-option value="description">Description</sl-option>
          <sl-option value="season">Season</sl-option>
          <sl-option value="sport">Sport</sl-option>
          <sl-option value="type">Type</sl-option>
      </sl-select>
      <div id="filter-value-container" class="flex-grow-1">
          <!-- Dynamic input will be rendered here by app.js -->
      </div>
    </div>
    <sl-input type="date" id="start-date" label="Start Date"></sl-input>
    <sl-input type="date" id="end-date" label="End Date"></sl-input>
  </div>

  <section id="data-display">
    <sl-tab-group>
      <sl-tab slot="nav" panel="table">Table</sl-tab>
      <sl-tab slot="nav" panel="chart">Chart</sl-tab>
      <sl-tab-panel name="table">
        <div id="table-container"><p>Loading data...</p></div>
        <div id="pagination-controls" class="display-flex justify-content-space-between align-items-center margin-top-1 flex-wrap gap-1">
          <sl-select id="items-per-page-select" label="Items per page" size="small" value="10">
              <sl-option value="10">10</sl-option>
              <sl-option value="25">25</sl-option>
              <sl-option value="50">50</sl-option>
          </sl-select>
          <div id="pagination-buttons"></div>
          <div id="pagination-info"></div>
        </div>
      </sl-tab-panel>
      <sl-tab-panel name="chart">
        <div id="chart-container" style="margin-top: 2em; max-width: 800px; margin-left: auto; margin-right: auto;">
          <h3 id="chart-title" class="text-align-center">Spending Breakdown</h3>
          <div style="text-align: center; margin: 2em 0 1em 0;">
            <sl-radio-group id="chart-view-toggle" help-text="Select a data view" name="chart-view" value="sport">
              <sl-radio-button value="sport">By Sport</sl-radio-button>
              <sl-radio-button value="type">By Type</sl-radio-button>
            </sl-radio-group>
          </div>
          <canvas id="spending-chart"></canvas>
        </div>
      </sl-tab-panel>
    </sl-tab-group>
  </section>
</sl-details>

<div class="container mt-5">
  <form class="row g-1">
    <div class="col-6 offset-3">
      <div class="input-group">
        <input type="text" class="form-control" aria-label="chat prompt" aria-describedby="button-submit-chat"></input>
        <button class="btn btn-outline-secondary" type="button" id="button-submit-chat"><i class="fas fa-paper-plane"></i></button>
      </div>
    </div>
    <div class="col-6 offset-3 g-2 text-center">
      <button type="submit" class="btn btn-outline-secondary">
        <i class="fas fa-lightbulb"></i>Insights
      </button>
      <button type="submit" class="btn btn-outline-secondary">
        <i class="fas fa-dollar"></i>Costs
      </button>
      <button type="submit" class="btn btn-outline-secondary">
        <i class="fas fa-toolbox"></i>Projects
      </button>
      <button type="submit" class="btn btn-outline-secondary">
        <i class="fas fa-hard-hat"></i>Employees
      </button>
    </div>
  </form>
</div>
