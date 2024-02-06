let inputValues = input.config();

let recordID = inputValues.recordID;
let mesEntrada = inputValues.mesEntrada;

let table = base.getTable('filtradoTodo');
let queryResult = await table.selectRecordsAsync();
let record = queryResult.records.find(record => record.id === recordID);

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

let monthTable = base.getTable('PivotCount2024'); // replace 'Month Table' with the name of your month table
let monthsQueryResult = await monthTable.selectRecordsAsync();

let mesCambiar = record.getCellValue('mesEntrada');
let monthName = monthMapping[mesEntrada];

console.log('monthName:', monthName); // Log the monthName to check its value

let monthRecord = monthsQueryResult.records.find(record => {
    console.log('record.name:', record.name); // Log each record's name during the search
    return record.name === monthName;
});

if (monthRecord) {
    console.log('monthRecord:', monthRecord); // Log the found monthRecord
    output.set('idMensual', monthRecord.id);
} else {
    console.log('Month record not found.'); // Log a message if no record was found
}