document.addEventListener('DOMContentLoaded', () => {
    // Crear la tabla 10x10
    const table = document.getElementById('spreadsheet');  // Obtener la referencia de la tabla en el HTML
    const rows = 10;  // Número de filas de la tabla
    const cols = 10;  // Número de columnas de la tabla

    // Generar celdas en la tabla
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');  // Crear una fila nueva <tr>
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('td');  // Crear una celda nueva <td>
            cell.contentEditable = true;  // Hacer que la celda sea editable (puede escribirse dentro)
            row.appendChild(cell);  // Añadir la celda a la fila
        }
        table.appendChild(row);  // Añadir la fila a la tabla
    }

    // Guardar los datos cuando se haga clic en el botón de "Guardar"
    document.getElementById('saveButton').addEventListener('click', () => {
        const data = [];  // Crear un array vacío para guardar los datos de la tabla
        // Iterar sobre todas las filas de la tabla
        for (let i = 0; i < table.rows.length; i++) {
            const row = [];  // Array para guardar los datos de cada fila
            // Iterar sobre todas las celdas de la fila
            for (let j = 0; j < table.rows[i].cells.length; j++) {
                row.push(table.rows[i].cells[j].innerText);  // Guardar el contenido de la celda (lo que está escrito)
            }
            data.push(row);  // Añadir la fila completa al array de datos
        }
        // Guardamos los datos en localStorage como un objeto JSON
        localStorage.setItem('spreadsheetData', JSON.stringify(data));
    });

    // Cargar los datos cuando se haga clic en el botón de "Cargar"
    document.getElementById('loadButton').addEventListener('click', () => {
        // Recuperar los datos de localStorage
        const data = JSON.parse(localStorage.getItem('spreadsheetData'));
        if (data) {
            // Si hay datos guardados en localStorage, cargarlos en la tabla
            for (let i = 0; i < table.rows.length; i++) {
                for (let j = 0; j < table.rows[i].cells.length; j++) {
                    table.rows[i].cells[j].innerText = data[i][j];  // Asignar el valor guardado a cada celda
                }
            }
        }
    });

    // Exportar a CSV cuando se haga clic en el botón de "Exportar"
    document.getElementById('exportButton').addEventListener('click', () => {
        let csv = '';  // Variable para almacenar el contenido CSV
        // Iterar sobre todas las filas de la tabla
        for (let i = 0; i < table.rows.length; i++) {
            const row = [];  // Array para almacenar los datos de una fila en formato CSV
            // Iterar sobre todas las celdas de la fila
            for (let j = 0; j < table.rows[i].cells.length; j++) {
                row.push('"' + table.rows[i].cells[j].innerText + '"');  // Añadir el contenido de la celda (con comillas)
            }
            csv += row.join(',') + '\n';  // Unir los valores de la fila con comas y añadir salto de línea
        }
        // Crear un enlace para la descarga del archivo CSV
        const hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);  // Crear una URL de tipo CSV
        hiddenElement.target = '_blank';  // Establecer el enlace para abrirlo en una nueva ventana
        hiddenElement.download = 'spreadsheet.csv';  // Nombre del archivo CSV que se descargará
        hiddenElement.click();  // Simular un clic en el enlace para descargar el archivo
    });
});