document.addEventListener('DOMContentLoaded', () => {
    const csvUploaderEl = document.getElementById('csv-uploader');
    if (!csvUploaderEl) return;

    const fileInput = document.getElementById('csv-file-input');
    if (!fileInput) return;

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            const csvText = e.target.result;
            const rows = csvText.split('\n').map(row => row.split(','));
            
            const tableData = rows.slice(1).map(row => ({
                id: row[0],
                description: row[1],
                amount: parseFloat(row[2]) || 0,
                date: row[3]
            }));

            const event = new CustomEvent('csv-uploaded', {
                detail: { data: tableData, originalRows: rows }
            });
            document.dispatchEvent(event);
        };
        reader.readAsText(file);
    });
});
