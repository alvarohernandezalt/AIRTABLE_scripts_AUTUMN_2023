// Define the table and view names
const tableName = 'HOJA_RECOGIDA_PRESUPUESTOS';
const viewName = 'BB_SYNC_TipologiaSeguimiento';

// Get the table object
const table = base.getTable(tableName);

// Fetch records from the specified table and view
let query = await table.selectRecordsAsync({
    view: viewName,
});

// Create a map to store the sum of listaImportesPresupuestos for each unique value in TIPOLOGIA
let pivotTable = new Map();

// Iterate over the records and calculate the sum for each unique value in TIPOLOGIA
for (let record of query.records) {
    let tipoLogia = record.getCellValue('tiposPivotantes');
    let listaImportesPresupuestos = record.getCellValue('listaImportesPresupuestos');

    // Check if listaImportesPresupuestos is not null or undefined
    if (listaImportesPresupuestos) {
        // Get the highest value from the listaImportesPresupuestos array
        let highestValue = Math.max(...listaImportesPresupuestos);

        if (pivotTable.has(tipoLogia)) {
            pivotTable.set(tipoLogia, pivotTable.get(tipoLogia) + highestValue);
        } else {
            pivotTable.set(tipoLogia, highestValue);
        }
    }
}

// Log the pivot table results
pivotTable.forEach((sum, tipoLogia) => {
    console.log(`TIPOLOGIA: ${tipoLogia}, Sum of listaImportesPresupuestos: ${sum}`);
});