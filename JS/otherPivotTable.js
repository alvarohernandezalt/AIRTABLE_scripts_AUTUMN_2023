let table = base.getTable('filtradoTodo');
let view = table.getView('2023');
let queryResult = await view.selectRecordsAsync();

// Assuming 'pivotLookUp' is linked to a table called 'Months'
let monthsTable = base.getTable('Months');
let monthsQueryResult = await monthsTable.selectRecordsAsync();

// Create a mapping from month abbreviations to full names
let monthMapping = {
    'DIC': 'DICIEMBRE',
    'NOV': 'NOVIEMBRE',
    'OCT': 'OCTUBRE',
    'SEP': 'SEPTIEMBRE',
    'AUG': 'AGOSTO',
    'JUL': 'JULIO',
    'JUN': 'JUNIO',
    'MAY': 'MAYO',
    'APR': 'ABRIL',
    'MAR': 'MARZO',
    'FEB': 'FEBRERO',
    'JAN': 'ENERO'
};

for (let record of queryResult.records) {
    let mesEntrada = record.getCellValue('mesEntrada');
    if (monthMapping.hasOwnProperty(mesEntrada)) {
        let monthName = monthMapping[mesEntrada];
        let monthRecord = monthsQueryResult.records.find(record => record.name === monthName);
        if (monthRecord) {
            await table.updateRecordAsync(record, {
                'PivotLookUp2023': [{id: monthRecord.id}]
            });
        }
    }
}