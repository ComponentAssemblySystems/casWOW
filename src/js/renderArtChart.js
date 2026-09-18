document.addEventListener('DOMContentLoaded', () => {
    const artChartEl = document.getElementById('art-chart');
    if (!artChartEl) return;

    const ctx = artChartEl.getContext('2d');

    const artChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Art Piece 1', 'Art Piece 2', 'Art Piece 3', 'Art Piece 4', 'Art Piece 5'],
            datasets: [{
                label: 'Art Values ($)',
                data: [12000, 19000, 3000, 5000, 20000],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
});
