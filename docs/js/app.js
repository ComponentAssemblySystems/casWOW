document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    const SELECT_OPTIONS = {
        type: [
            { value: 'expense', text: 'Expense' },
            { value: 'donation', text: 'Donation' },
            { value: 'registration', text: 'Registration' },
        ],
        account: [
            { value: 'revolving', text: 'Revolving' },
            { value: 'annual', text: 'Annual' },
            { value: 'baa', text: 'BAA' },
        ],
        sport: [
            { value: 'soccer', text: 'Soccer' },
            { value: 'baseball-softball', text: 'Baseball-Softball' },
            { value: 'basketball', text: 'Basketball' },
            { value: 'maintenance', text: 'Maintenance' },
            { value: 'general', text: 'General' },
        ],
        season: [
            { value: 'fall', text: 'Fall' },
            { value: 'winter', text: 'Winter' },
            { value: 'spring', text: 'Spring' },
            { value: 'summer', text: 'Summer' },
            { value: 'seasonal', text: 'Seasonal' },
        ],
    };

    // --- STATE ---
    const TABLE_NAME = 'transactions';
    let transactionsData = []; // Master list of data from server
    let currentSort = { column: 'id', direction: 'asc' };
    let currentPage = 1;
    let itemsPerPage = 10;
    let chartDimension = 'sport'; // 'sport' or 'type'
    let dateRangeFilter = { start: '', end: '' };
    let currentFilter = { column: 'description', value: '' };

    let currentConversation = []; // New state for the current chat session
    const AI_HISTORY_STORAGE_KEY = 'financialAppAiHistory';
    let llmAbortController = null; // To manage stopping the AI analysis stream

    let llmAnalysisText = ''; // To hold the full markdown text of a conversation
    // Load history from local storage on startup
    let aiHistory = JSON.parse(localStorage.getItem(AI_HISTORY_STORAGE_KEY)) || [];

    // --- DOM ELEMENTS ---
    const form = document.getElementById('add-transaction-form');
    const analyzeButton = document.getElementById('analyze-button');
    const tableContainer = document.getElementById('table-container');
    const exportCsvButton = document.getElementById('export-csv-button');
    const llmContainer = document.getElementById('llm-container');
    const llmOutput = document.getElementById('llm-output');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const filterColumnSelect = document.getElementById('filter-column-select');
    const filterValueContainer = document.getElementById('filter-value-container');
    const itemsPerPageSelect = document.getElementById('items-per-page-select');
    const paginationButtons = document.getElementById('pagination-buttons');
    const paginationInfo = document.getElementById('pagination-info');
    const chartViewToggle = document.getElementById('chart-view-toggle');
    const llmQueryInput = document.getElementById('llm-query-input');
    const stopAnalyzeButton = document.getElementById('stop-analyze-button');
    const spinnerOverlay = document.getElementById('spinner-overlay');
    const llmHistoryContainer = document.getElementById('llm-history-container');
    const clearHistoryButton = document.getElementById('clear-history-button');
    const newChatButton = document.getElementById('new-chat-button');

    // --- HELPER FUNCTIONS ---
    const showSpinner = () => { spinnerOverlay.style.display = 'flex'; };
    const hideSpinner = () => { spinnerOverlay.style.display = 'none'; };

    /**
     * Populates the <sl-select> elements in the 'Add New Transaction' form
     * using the central SELECT_OPTIONS configuration and sets default values.
     */
    function populateAddFormSelects() {
        const formDrawer = document.getElementById('input-form');
        if (!formDrawer) return;

        const selects = {
            type: formDrawer.querySelector('#type'),
            account: formDrawer.querySelector('#account'),
            sport: formDrawer.querySelector('#sport'),
            season: formDrawer.querySelector('#season'),
        };

        for (const key in selects) {
            if (selects[key]) {
                selects[key].innerHTML = createOptionsHtml(SELECT_OPTIONS[key]);
            }
        }

        // Set default values to match the original hardcoded form
        if (selects.type) selects.type.value = 'expense';
        if (selects.account) selects.account.value = 'revolving';
        if (selects.sport) selects.sport.value = 'general';
        if (selects.season) selects.season.value = 'seasonal';
    }

    /**
     * Creates a string of <sl-option> tags from a configuration array.
     * @param {Array<Object>} options - Array of {value, text} objects.
     * @returns {string} The generated HTML for the options.
     */
    function createOptionsHtml(options) {
        return options.map(opt => `<sl-option value="${opt.value}">${opt.text}</sl-option>`).join('');
    }

    /**
     * Returns a filtered and sorted version of the master data list.
     * @returns {Array<Object>} The processed data ready for display or export.
     */
    function getProcessedData() {
        let processedData = [...transactionsData];

        // Apply dynamic filter
        if (currentFilter.column && currentFilter.value) {
            const filterValue = String(currentFilter.value).toLowerCase();
            processedData = processedData.filter(transaction => {
                const transactionValue = String(transaction[currentFilter.column] || '').toLowerCase();
                if (currentFilter.column === 'description') {
                    // Use 'includes' for partial matching on description
                    return transactionValue.includes(filterValue);
                }
                // Use exact match for 'sport' and 'type'
                return transactionValue === filterValue;
            });
        }

        // Apply date range filter
        if (dateRangeFilter.start) {
            // The substring ensures we only compare the date part (YYYY-MM-DD)
            processedData = processedData.filter(t => t.date.substring(0, 10) >= dateRangeFilter.start);
        }
        if (dateRangeFilter.end) {
            processedData = processedData.filter(t => t.date.substring(0, 10) <= dateRangeFilter.end);
        }

        // Apply sort
        if (currentSort.column) {
            processedData.sort((a, b) => {
                const valA = a[currentSort.column];
                const valB = b[currentSort.column];
                return (valA < valB ? -1 : valA > valB ? 1 : 0) * (currentSort.direction === 'asc' ? 1 : -1);
            });
        }

        return processedData;
    }

    /**
     * Renders the table with the current data, filter, and sort state.
     */
    function updateTable() {
        const processedData = getProcessedData();
        const totalItems = processedData.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        // Ensure currentPage is valid, especially after filtering
        if (currentPage > totalPages) {
            currentPage = totalPages || 1;
        }

        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedData = processedData.slice(startIndex, startIndex + itemsPerPage);

        renderDataTable(paginatedData, currentSort);
        renderPaginationControls(totalItems, totalPages);
        renderSpendingChart(transactionsData, chartDimension); // Render the chart with the complete, unfiltered data
    }

    /**
     * Saves the current AI history to local storage.
     */
    function saveAiHistory() {
        localStorage.setItem(AI_HISTORY_STORAGE_KEY, JSON.stringify(aiHistory));
    }

    /**
     * Renders the list of past AI analysis questions.
     */
    function renderAiHistory() {
        if (!llmHistoryContainer) return;

        // Show/hide the clear button container based on history existence
        document.getElementById('history-actions').style.display = aiHistory.length > 0 ? 'flex' : 'none';

        if (aiHistory.length === 0) {
            llmHistoryContainer.innerHTML = '<p>No history yet. Ask a question above to start.</p>';
            return;
        }

        llmHistoryContainer.innerHTML = ''; // Clear previous content
        const historyMenu = document.createElement('sl-menu');
        historyMenu.style.maxWidth = '100%'; // Ensure it fits the container

        // Create menu items for each history entry, newest first
        [...aiHistory].reverse().forEach(item => {
            const menuItem = document.createElement('sl-menu-item');
            // Truncate long questions for display in the menu
            menuItem.textContent = item.question.length > 80 ? item.question.substring(0, 80) + '...' : item.question;

            const tooltip = document.createElement('sl-tooltip');
            tooltip.content = item.question; // Full question in tooltip
            tooltip.appendChild(menuItem);

            menuItem.addEventListener('click', () => {
                llmContainer.style.display = 'block';
                llmOutput.innerHTML = marked.parse(item.answer);
                llmContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });

            historyMenu.appendChild(tooltip);
        });

        llmHistoryContainer.appendChild(historyMenu);
    }

    /**
     * Renders the pagination controls (buttons, page info).
     * @param {number} totalItems - The total number of items after filtering.
     * @param {number} totalPages - The total number of pages.
     */
    function renderPaginationControls(totalItems, totalPages) {
        paginationButtons.innerHTML = '';
        paginationInfo.innerHTML = '';

        if (totalItems === 0) {
            paginationInfo.textContent = 'No items to display.';
            return;
        }

        const startIndex = (currentPage - 1) * itemsPerPage + 1;
        const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems);
        paginationInfo.textContent = `Showing ${startIndex}-${endIndex} of ${totalItems}`;

        if (totalPages <= 1) return;

        const createButton = (page, text, isDisabled = false, isCurrent = false) => {
            const button = document.createElement('sl-button');
            button.size = 'small';
            button.textContent = text;
            button.variant = isCurrent ? 'primary' : 'default';
            button.disabled = isDisabled;
            if (!isDisabled) {
                button.addEventListener('click', () => {
                    currentPage = page;
                    updateTable();
                });
            }
            return button;
        };

        paginationButtons.appendChild(createButton(currentPage - 1, 'Prev', currentPage === 1));

        // Add page number buttons (simplified for clarity)
        for (let i = 1; i <= totalPages; i++) {
            paginationButtons.appendChild(createButton(i, i, false, i === currentPage));
        }

        paginationButtons.appendChild(createButton(currentPage + 1, 'Next', currentPage === totalPages));
    }

    /**Fetches the latest data from the server, then updates the table.
     */
    async function fetchAndUpdateTable() {
        showSpinner();
        try {
            const response = await fetch(`/api/data/${TABLE_NAME}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            transactionsData = await response.json();
            updateTable();
        } catch (error) {
            console.error('Failed to fetch data:', error);
            tableContainer.innerHTML = `<p style="color: red;">Error loading data. Please check the console.</p>`;
        } finally {
            hideSpinner();
        }
    }

    /**
     * Renders the appropriate filter input control based on the selected column.
     */
    function renderFilterValueControl() {
        filterValueContainer.innerHTML = ''; // Clear previous control
        const column = currentFilter.column;

        let control;
        if (column === 'description') {
            control = document.createElement('sl-input');
            control.type = 'text';
            control.placeholder = 'Enter description...';
            control.value = currentFilter.value;
            control.label = 'Begin typing to filter';
            control.addEventListener('sl-input', (e) => {
                currentFilter.value = e.target.value;
                currentPage = 1;
                updateTable();
            });
        } else if (column === 'sport') {
            control = document.createElement('sl-select');
            control.innerHTML = `
                <sl-option value="">All Sports</sl-option>
                ${createOptionsHtml(SELECT_OPTIONS.sport)}
            `;
            control.value = currentFilter.value || '';
            control.label = 'Select one';
            control.addEventListener('sl-change', (e) => {
                currentFilter.value = e.target.value;
                currentPage = 1;
                updateTable();
            });
        } else if (['type', 'season'].includes(column)) {
            control = document.createElement('sl-select');
            control.innerHTML = `
                <sl-option value="">All ${column.charAt(0).toUpperCase() + column.slice(1)}s</sl-option>
                ${createOptionsHtml(SELECT_OPTIONS[column])}
            `;
            control.value = currentFilter.value; // Set current value
            control.label = 'Select one';
            control.addEventListener('sl-change', (e) => {
                currentFilter.value = e.target.value;
                currentPage = 1;
                updateTable();
            });
        }

        if (control) {
            filterValueContainer.appendChild(control);
        }
    }

    // --- EVENT LISTENERS ---

    // Initial data load
    fetchAndUpdateTable();
    renderAiHistory(); // Initial render for history section
    populateAddFormSelects(); // Populate the 'Add' form dropdowns

    // Listen for the custom event from csvUploader.js to refresh the table
    document.addEventListener('transactions-updated', () => {
        fetchAndUpdateTable();
    });

    // Add new transaction
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = {
            description: formData.get('description'),
            amount: parseFloat(formData.get('amount')),
            type: formData.get('type'),
            account: formData.get('account'),
            sport: formData.get('sport'),
            season: formData.get('season'),
            date: formData.get('date'),
        };

        showSpinner();
        try {
            const response = await fetch(`/api/data/${TABLE_NAME}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                form.reset();
                await fetchAndUpdateTable(); // Refetch all data to get the new item
            } else {
                alert('Failed to add transaction.');
                hideSpinner();
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again.');
            hideSpinner();
        }
    });

    // Analyze with AI
    analyzeButton.addEventListener('click', async () => {
        const userQuery = llmQueryInput.value.trim();
        if (!userQuery) {
            alert('Please enter a question for the AI.');
            return;
        }

        // If it's a new conversation, clear the display and saved text.
        if (currentConversation.length === 0) {
            llmAnalysisText = '';
            llmOutput.innerHTML = '';
        }

        llmContainer.style.display = 'block';
        showSpinner();

        // Append user's query to the display as markdown
        llmAnalysisText += `\n\n**You:**\n\n${userQuery}\n\n`;
        llmOutput.innerHTML = marked.parse(llmAnalysisText);
        llmQueryInput.value = ''; // Clear input for next question

        // Add user message to conversation history
        currentConversation.push({ role: 'user', content: userQuery });

        // Toggle buttons and create a new AbortController for this request
        analyzeButton.style.display = 'none';
        stopAnalyzeButton.style.display = 'inline-block';
        llmAbortController = new AbortController();
        let currentLlmResponseText = ''; // For the incoming response chunk

        try {
            // Use the currently filtered and sorted data for context
            const dataForAnalysis = getProcessedData();

            const response = await fetch('/api/llm/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: dataForAnalysis, conversation: currentConversation }),
                signal: llmAbortController.signal, // Pass the signal to the fetch request
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = ''; // Buffer for incomplete lines

            // Read the stream from the server
            while (true) {
                const { done, value } = await reader.read();
                // Append the new chunk to the buffer
                buffer += decoder.decode(value, { stream: true });

                // Process complete lines from the buffer
                const lines = buffer.split('\n');
                // The last element might be an incomplete line, keep it in the buffer
                buffer = lines.pop(); // Keep the last (potentially incomplete) line in the buffer

                for (const line of lines) {
                    if (line.trim() === '') continue; // Skip empty lines

                    try {
                        const json = JSON.parse(line);
                        if (json.message && json.message.content) {
                            // Append the token from the stream to our full text
                            currentLlmResponseText += json.message.content;
                            // Re-render the markdown on each chunk for a live preview
                            llmOutput.innerHTML = marked.parse(llmAnalysisText + '**Assistant:**\n\n' + currentLlmResponseText);
                        }
                    } catch (parseError) {
                        console.error('Error parsing JSON line from LLM stream:', parseError);
                        console.error('Problematic line:', line);
                        llmAnalysisText += `\n\n[Error: Failed to parse LLM response chunk. See console for details.]`;
                        llmOutput.innerHTML = marked.parse(llmAnalysisText);
                        // Continue processing other lines, but log the error for this one.
                    }
                }

                if (done) {
                    // After the stream is done, process any remaining content in the buffer
                    if (buffer.trim() !== '') {
                        try {
                            const json = JSON.parse(buffer);
                            if (json.message && json.message.content) {
                                currentLlmResponseText += json.message.content;
                            }
                        } catch (parseError) {
                            console.error('Error parsing final JSON line from LLM stream:', parseError);
                            console.error('Problematic final buffer:', buffer);
                            currentLlmResponseText += `\n\n[Error: Failed to parse final LLM response chunk. See console for details.]`;
                        }
                    }
                    // Add assistant's full response to conversation history
                    currentConversation.push({ role: 'assistant', content: currentLlmResponseText });

                    // Update the final display text
                    llmAnalysisText += `**Assistant:**\n\n${currentLlmResponseText}`;
                    llmOutput.innerHTML = marked.parse(llmAnalysisText);

                    // Show the "New Chat" button
                    newChatButton.style.display = 'inline-block';
                    break; // Stream finished
                }
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Fetch aborted by user.');
                llmAnalysisText += '\n\n[Analysis stopped by user.]';
                llmOutput.innerHTML = marked.parse(llmAnalysisText);
            } else {
                console.error('Error getting analysis:', error);
                llmOutput.textContent = 'Failed to get analysis. See console for details.';
            }
        } finally {
            hideSpinner();
            // Reset button visibility and the controller
            analyzeButton.style.display = 'inline-block';
            stopAnalyzeButton.style.display = 'none';
            llmAbortController = null;
        }
    });

    // Handle New Chat button click
    newChatButton.addEventListener('click', () => {
        // Save the completed conversation to history before clearing it
        if (currentConversation.length > 0) {
            // Use the first user message as the "question" for the history list
            const firstUserMessage = currentConversation.find(m => m.role === 'user');
            if (firstUserMessage) {
                // The 'answer' is the entire markdown conversation log
                aiHistory.push({ question: firstUserMessage.content, answer: llmAnalysisText });
                saveAiHistory();
                renderAiHistory();
            }
        }

        // Reset for a new chat
        currentConversation = [];
        llmAnalysisText = '';
        llmOutput.innerHTML = '';
        llmContainer.style.display = 'none';
        newChatButton.style.display = 'none';
    });

    // Handle clear history button click
    clearHistoryButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear the entire analysis history? This cannot be undone.')) {
            aiHistory = [];
            saveAiHistory();
            renderAiHistory();
        }
    });

    // Handle stop button click
    stopAnalyzeButton.addEventListener('click', () => {
        if (llmAbortController) {
            llmAbortController.abort();
        }
    });

    function exportToCSV(data, filename = 'transactions.csv') {
        if (!data || data.length === 0) {
            alert('No data to export.');
            return;
        }

        const headers = Object.keys(data[0]);

        // Function to handle escaping of commas, quotes, and newlines
        const escapeCSV = (value) => {
            if (value == null) return '';
            const strValue = String(value);
            if (strValue.includes(',') || strValue.includes('"') || strValue.includes('\n')) {
                // Enclose in double quotes and escape existing double quotes
                return `"${strValue.replace(/"/g, '""')}"`;
            }
            return strValue;
        };

        const csvRows = [
            headers.join(','), // Header row
            ...data.map(row => headers.map(header => escapeCSV(row[header])).join(','))
        ];

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Handle CSV export button click
    exportCsvButton.addEventListener('click', () => {
        // We use the currently filtered and sorted data for the export
        const dataToExport = getProcessedData();
        exportToCSV(dataToExport, 'transactions_report.csv');
    });

    // Handle primary filter column change
    filterColumnSelect.addEventListener('sl-change', (e) => {
        currentFilter.column = e.target.value;
        currentFilter.value = ''; // Reset value when column changes
        currentPage = 1;
        renderFilterValueControl(); // Re-render the secondary control
        updateTable(); // Update table with reset filter
    });
    renderFilterValueControl(); // Initial render of the filter control

    // Handle date range filter changes
    function handleDateChange() {
        dateRangeFilter.start = startDateInput.value;
        dateRangeFilter.end = endDateInput.value;
        currentPage = 1; // Reset to first page on new filter
        updateTable();
    }
    startDateInput.addEventListener('change', handleDateChange);
    endDateInput.addEventListener('change', handleDateChange);

    // Handle items per page change
    itemsPerPageSelect.addEventListener('sl-change', (event) => {
        itemsPerPage = parseInt(event.target.value, 10);
        currentPage = 1; // Reset to first page
        updateTable();
    });

    // Handle chart view toggle
    chartViewToggle.addEventListener('sl-change', (event) => {
        chartDimension = event.target.value;
        renderSpendingChart(transactionsData, chartDimension);
    });

    // --- Event Delegation for Table Actions (Sort, Edit, Delete, etc.) ---
    tableContainer.addEventListener('click', async (event) => {
        const target = event.target;

        // --- Handle Sorting ---
        if (target.tagName === 'TH' && target.dataset.column) {
            const column = target.dataset.column;
            if (currentSort.column === column) {
                // If same column, toggle direction
                currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
            } else {
                // If new column, sort ascending
                currentSort.column = column;
                currentSort.direction = 'asc';
            }
            // No need to call sortData() directly here, fetchAndRenderTable will handle it.
            updateTable(); // Client-side operation, no spinner needed
            return; // Stop further processing for this click
        }

        const row = target.closest('tr');

        // The target can be a Shoelace component (e.g., sl-menu-item) or a native button.
        // We check for the presence of our action classes, which is more robust.
        const isAction = target.classList.contains('edit-btn') ||
                         target.classList.contains('delete-btn') ||
                         target.classList.contains('save-btn') ||
                         target.classList.contains('cancel-btn');

        // Ignore clicks that are not on an actionable element within a row.
        if (!row || !isAction) {
            return;
        }

        // Get the ID from the row's data-id attribute. This is the most reliable source.
        const id = row.dataset.id;

        // --- Handle Delete ---
        if (target.classList.contains('delete-btn')) {
            if (id && confirm(`Are you sure you want to delete transaction #${id}?`)) {
                try {
                    const response = await fetch(`/api/data/${TABLE_NAME}/${id}`, {
                        method: 'DELETE',
                    });
                    if (response.ok) {
                        await fetchAndUpdateTable();
                    } else {
                        alert('Failed to delete transaction.');
                    }
                } catch (error) {
                    console.error('Error deleting transaction:', error);
                    alert('An error occurred while deleting.');
                }
            }
        }

        // --- Handle Edit ---
        if (target.classList.contains('edit-btn')) {
            if (!id) return; // Safety check
            const table = row.closest('table');
            const headers = Array.from(table.querySelectorAll('th[data-column]')).map(th => th.dataset.column);
            const cells = Array.from(row.querySelectorAll('td'));

            // Find the index for each required column to make this robust against column reordering
            const columnIndices = {
                description: headers.indexOf('description'),
                amount: headers.indexOf('amount'),
                type: headers.indexOf('type'),
                account: headers.indexOf('account'),
                sport: headers.indexOf('sport'),
                season: headers.indexOf('season'),
                date: headers.indexOf('date'),
            };

            // Get values using the found indices
            const dateCell = cells[columnIndices.date];
            const dateValue = dateCell.dataset.isoDate || dateCell.textContent; // Prioritize data-iso-date for YYYY-MM-DD format
            const descriptionValue = cells[columnIndices.description].textContent;
            const typeValue = cells[columnIndices.type].textContent;
            const accountValue = cells[columnIndices.account].textContent;
            const sportValue = cells[columnIndices.sport].textContent;
            const seasonValue = cells[columnIndices.season].textContent;
            // A more robust way to parse the currency string, extracting only digits and the decimal point.
            const amountValue = parseFloat(cells[columnIndices.amount].textContent.replace(/[^\d.]/g, ''));

            // Make cells editable (skip the ID cell at index 0)
            cells[columnIndices.date].innerHTML = `<sl-input type="date" name="date" value="${dateValue}"></sl-input>`; // No change here, it's an input
            cells[columnIndices.description].innerHTML = `<sl-input type="text" name="description" value="${descriptionValue}"></sl-input>`; // No change here, it's an input
            cells[columnIndices.type].innerHTML = `
                <sl-select name="type" value="${typeValue.toLowerCase()}">
                    ${createOptionsHtml(SELECT_OPTIONS.type)}
                </sl-select>
            `;
            cells[columnIndices.account].innerHTML = `
                <sl-select name="account" value="${accountValue.toLowerCase()}">
                    ${createOptionsHtml(SELECT_OPTIONS.account)}
                </sl-select>
            `;
            cells[columnIndices.sport].innerHTML = `
                <sl-select name="sport" value="${sportValue.toLowerCase()}">
                    ${createOptionsHtml(SELECT_OPTIONS.sport)}
                </sl-select>
            `;
            cells[columnIndices.season].innerHTML = `
                <sl-select name="season" value="${seasonValue.toLowerCase()}">
                    ${createOptionsHtml(SELECT_OPTIONS.season)}
                </sl-select>
            `;
            cells[columnIndices.amount].innerHTML = `<sl-input type="number" name="amount" step="0.01" min="0" value="${amountValue}"></sl-input>`; // No change here, it's an input

            // Change buttons to Save/Cancel
            const actionsCell = row.querySelector('td:last-child');
            actionsCell.innerHTML = `
                <sl-button class="save-btn" variant="primary" size="small" data-id="${id}">Save</sl-button>
                <sl-button class="cancel-btn" size="small" data-id="${id}">Cancel</sl-button>
            `;
        }

        // --- Handle Save ---
        if (target.classList.contains('save-btn')) {
            if (!id) return; // Safety check
            const inputs = row.querySelectorAll('[name]'); // Get all elements with a 'name' attribute
            const updatedData = {};
            inputs.forEach(input => {
                updatedData[input.name] = input.value;
            });
            // Ensure amount is a number
            updatedData.amount = parseFloat(updatedData.amount);

            try {
                const response = await fetch(`/api/data/${TABLE_NAME}/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedData),
                });
                if (response.ok) {
                    await fetchAndUpdateTable();
                } else {
                    alert('Failed to update transaction.');
                }
            } catch (error) {
                console.error('Error updating transaction:', error);
                alert('An error occurred while updating.');
            }
        }

        // --- Handle Cancel ---
        if (target.classList.contains('cancel-btn')) {
            // Simply re-render the table to discard changes
            updateTable();
        }
    });
});
