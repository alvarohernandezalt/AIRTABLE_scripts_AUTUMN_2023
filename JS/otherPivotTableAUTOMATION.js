let inputValues = input.config();

let recordID = inputValues.recordID;
let mesEntrada = inputValues.mesEntrada;

let table = base.getTable('filtradoTodo');
let record = await table.find(recordID);

// Your code here to manipulate the record

await table.updateRecordAsync(record);

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
if (monthMapping.hasOwnProperty(mesEntrada)) {
    let monthName = monthMapping[mesEntrada];
    let monthRecord = monthsQueryResult.records.find(record => record.name === monthName);
    if (monthRecord) {
        output.set('idMensual', monthRecord.id);
    }
}