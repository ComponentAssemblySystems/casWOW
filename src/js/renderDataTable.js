// Inside your app.js or a dedicated table component
function renderDataTable(data, sortState = { column: null, direction: 'asc' }) {
    const tableContainer = document.getElementById('table-container');
    if (!tableContainer) {
        console.error('Table container element not found!');
        return;
    }
    try {
        if (!Array.isArray(data) || data.length === 0) {
            tableContainer.innerHTML = '<p>No data available.</p>';
            return;
        }

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tfoot = document.createElement('tfoot');
        const tbody = document.createElement('tbody');
        const headers = Object.keys(data[0]);

        // Assume the first column is the primary key. This is a common convention.
        const pkColumnName = headers[0];

        // Create table headers
        const headerRow = document.createElement('tr');
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText.charAt(0).toUpperCase() + headerText.slice(1);
            th.dataset.column = headerText; // For identifying the column
            th.style.cursor = 'pointer'; // Visual cue for clickability

            // Add sort indicator to the currently sorted column
            if (sortState.column === headerText) {
                th.textContent += sortState.direction === 'asc' ? ' ▲' : ' ▼';
            }

            headerRow.appendChild(th);
        });
        // Add an extra header for actions
        const thActions = document.createElement('th');
        thActions.textContent = 'Actions';
        headerRow.appendChild(thActions);

        thead.appendChild(headerRow);

        // Create table rows
        data.forEach(rowData => {
            const row = document.createElement('tr');
            headers.forEach(header => {
                const td = document.createElement('td');
                let cellValue = rowData[header];

                // Apply special formatting based on the column header
                if (header === 'amount' && typeof rowData.amount === 'number') {
                    const displayAmount = rowData.type === 'expense' ? -Math.abs(rowData.amount) : Math.abs(rowData.amount);
                    // Format as USD currency, ensuring two decimal places and sign handling.
                    cellValue = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    }).format(displayAmount);
                } else if (header === 'date' && cellValue && typeof cellValue === 'string') {
                    const datePart = cellValue.substring(0, 10); // "YYYY-MM-DD"
                    td.dataset.isoDate = datePart; // Store YYYY-MM-DD for editing

                    const [year, month, day] = datePart.split('-');
                    cellValue = `${month}-${day}-${year}`; // Display MM-DD-YYYY
                }

                td.textContent = cellValue;
                row.appendChild(td);
            });

            // Add a cell for the action buttons
            const pkValue = rowData[pkColumnName];
            const actionsCell = document.createElement('td');
            actionsCell.innerHTML = `
                <sl-dropdown placement="bottom-end">
                    <sl-button slot="trigger" caret size="small"></sl-button>
                    <sl-menu>
                        <sl-menu-item class="edit-btn" data-id="${pkValue}"><sl-icon slot="prefix" name="pencil-square"></sl-icon>Edit</sl-menu-item>
                        <sl-menu-item class="delete-btn" data-id="${pkValue}"><sl-icon slot="prefix" name="trash"></sl-icon>Delete</sl-menu-item>
                    </sl-menu>
                </sl-dropdown>
            `;
            row.appendChild(actionsCell);
            // Add a data-id attribute to the row for easy selection
            row.dataset.id = pkValue;
            tbody.appendChild(row);
        });

        // --- Create Table Footer with Summary ---
        const totalAmount = data.reduce((sum, row) => {
            const amount = row.amount || 0;
            return sum + (row.type === 'expense' ? -Math.abs(amount) : Math.abs(amount));
        }, 0);
        const footerRow = document.createElement('tr');
        const amountColumnIndex = headers.indexOf('amount');

        if (amountColumnIndex > -1) {
            // Cell for label, spanning columns before 'amount'
            const labelCell = document.createElement('td');
            labelCell.colSpan = amountColumnIndex;
            labelCell.textContent = 'Total';
            labelCell.style.fontWeight = 'bold';
            labelCell.style.textAlign = 'right';
            footerRow.appendChild(labelCell);

            // Cell for the total amount
            const totalCell = document.createElement('td');
            totalCell.textContent = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(totalAmount);
            totalCell.style.fontWeight = 'bold';
            footerRow.appendChild(totalCell);

            // Cell for the remaining columns (like 'Actions')
            const emptyCell = document.createElement('td');
            emptyCell.colSpan = headers.length - amountColumnIndex;
            footerRow.appendChild(emptyCell);
        }
        tfoot.appendChild(footerRow);

        table.appendChild(thead);
        table.appendChild(tbody);
        table.appendChild(tfoot);
        tableContainer.innerHTML = ''; // Clear previous content
        tableContainer.appendChild(table);
    } catch (error) {
        console.error('Failed to render data table:', error);
        tableContainer.innerHTML = `<p style="color: red;">Error loading data. Please check the console.</p>`;
    }
}
