let spendingChartInstance = null; // To hold the chart instance for updates/destruction

/**
 * Renders a pie chart summarizing spending by sport.
 * @param {Array<Object>} transactions The list of transaction objects.
 */
function renderSpendingChart(transactions, dimension = 'sport') {
    const ctx = document.getElementById('spending-chart').getContext('2d');
    const chartTitleEl = document.getElementById('chart-title');

    let groupedData;
    let chartTitle;
    let datasetLabel;
    let backgroundColors = [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(199, 199, 199, 0.7)',
    ];

    if (dimension === 'type') {
        chartTitle = 'Totals by Type';
        datasetLabel = 'Total by Type';
        groupedData = transactions.reduce((acc, t) => {
            const type = t.type || 'general';
            if (!acc[type]) {
                acc[type] = 0;
            }
            acc[type] += Math.abs(t.amount);
            return acc;
        }, {});
        // Use specific colors for types for consistency
        backgroundColors = {
            'expense': 'rgba(255, 99, 132, 0.7)',      // Red-ish
            'donation': 'rgba(75, 192, 192, 0.7)',     // Teal-ish
            'registration': 'rgba(54, 162, 235, 0.7)', // Blue-ish
        };
    } else { // Default to 'sport'
        chartTitle = 'Spending by Sport';
        datasetLabel = 'Spending by Sport';
        const spendingData = transactions.filter(t => t.type === 'expense');
        groupedData = spendingData.reduce((acc, t) => {
            const sport = t.sport || 'General';
            if (!acc[sport]) {
                acc[sport] = 0;
            }
            acc[sport] += Math.abs(t.amount);
            return acc;
        }, {});
    }

    chartTitleEl.textContent = chartTitle;
    const labels = Object.keys(groupedData);
    const data = Object.values(groupedData);

    // If there is no spending data, clear the chart and show a message.
    if (labels.length === 0) {
        if (spendingChartInstance) {
            spendingChartInstance.destroy();
            spendingChartInstance = null;
        }
        // Clear the canvas and draw a message
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.font = '16px "Outfit" sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('No spending data to display.', ctx.canvas.width / 2, ctx.canvas.height / 2);
        return;
    }

    // If a chart instance already exists, destroy it before creating a new one
    if (spendingChartInstance) {
        spendingChartInstance.destroy();
    }

    spendingChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: datasetLabel,
                data: data,
                // Dynamically assign colors
                backgroundColor: dimension === 'type' ? labels.map(label => backgroundColors[label]) : backgroundColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' }
            }
        }
    });
}
