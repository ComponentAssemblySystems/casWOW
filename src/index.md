---
layout: base.njk
toolBar: false
eleventyNavigation:
  key: Chat
  order: 0
---

<h1 class="text-center">Welcome, Neo</h1>
<p class="h4 italic text-secondary text-center">What are you looking for today?</p>

<wa-details summary="Table">
  <div class="display-flex direction-row gap-1">
    <div class="display-flex direction-row gap-1 flex-end flex-grow-2">
      <wa-select id="filter-column-select" label="Filter By" value="description" style="min-width: 150px;">
          <wa-option value="description">Description</wa-option>
          <wa-option value="season">Season</wa-option>
          <wa-option value="sport">Sport</wa-option>
          <wa-option value="type">Type</wa-option>
      </wa-select>
      <div id="filter-value-container" class="flex-grow-1">
          <!-- Dynamic input will be rendered here by app.js -->
      </div>
    </div>
    <wa-input type="date" id="start-date" label="Start Date"></wa-input>
    <wa-input type="date" id="end-date" label="End Date"></wa-input>
  </div>

  <section id="data-display">
    <wa-tab-group>
      <wa-tab slot="nav" panel="table">Table</wa-tab>
      <wa-tab slot="nav" panel="chart">Chart</wa-tab>
      <wa-tab-panel name="table">
        <div id="table-container"><p>Loading data...</p></div>
        <div id="pagination-controls" class="display-flex justify-content-space-between align-items-center margin-top-1 flex-wrap gap-1">
          <wa-select id="items-per-page-select" label="Items per page" size="small" value="10">
              <wa-option value="10">10</wa-option>
              <wa-option value="25">25</wa-option>
              <wa-option value="50">50</wa-option>
          </wa-select>
          <div id="pagination-buttons"></div>
          <div id="pagination-info"></div>
        </div>
      </wa-tab-panel>
      <wa-tab-panel name="chart">
        <div id="chart-container" style="margin-top: 2em; max-width: 800px; margin-left: auto; margin-right: auto;">
          <h3 id="chart-title" class="text-align-center">Spending Breakdown</h3>
          <div style="text-align: center; margin: 2em 0 1em 0;">
            <wa-radio-group id="chart-view-toggle" help-text="Select a data view" name="chart-view" value="sport">
              <wa-radio-button value="sport">By Sport</wa-radio-button>
              <wa-radio-button value="type">By Type</wa-radio-button>
            </wa-radio-group>
          </div>
          <canvas id="spending-chart"></canvas>
        </div>
      </wa-tab-panel>
    </wa-tab-group>
  </section>
</wa-details>
<wa-details summary="AI Analysis" open>
  <h3>Ask the AI a Question</h3>
  <wa-input type="text" id="llm-query-input" label="What is your question?" placeholder="e.g., What was my total spending?" pill clearable>
    <wa-icon name="chat" slot="suffix"></wa-icon>
  </wa-input>
  <br />
  <div id="llm-button-container" style="display: flex; gap: var(--wa-spacing-small); margin-bottom: var(--wa-spacing-medium);">
    <wa-button id="analyze-button">
      <wa-icon slot="prefix" name="cpu"></wa-icon>
      Get AI Analysis
    </wa-button>
    <wa-button id="stop-analyze-button" variant="danger" style="display: none;">
      <wa-icon slot="prefix" name="stop-circle"></wa-icon>
      Stop Generating
    </wa-button>
    <wa-button id="new-chat-button" variant="default" style="display: none;">
      <wa-icon slot="prefix" name="plus-circle"></wa-icon>
      New Chat
    </wa-button>
  </div>
  <div id="llm-container" style="display: none;">
    <wa-card class="card-header" style="max-width: 100%; width: 100%;">
      <div slot="header">
        AI Analysis
        <wa-icon name="cpu" label="CPU Icon"></wa-icon>
      </div>
      <samp id="llm-output"></samp>
    </wa-card>
  </div>

  <div style="display: flex; flex-direction: column; gap: var(--wa-spacing-medium);">
    <h3>Chat History</h3>
    <div id="history-actions" style="display: flex; justify-content: flex-end;">
      <wa-button id="clear-history-button" size="small" variant="danger" outline>
        <wa-icon slot="prefix" name="trash"></wa-icon>
        Clear History
      </wa-button>
    </div>
    <div id="llm-history-container"></div>
  </div>
</wa-details>

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
