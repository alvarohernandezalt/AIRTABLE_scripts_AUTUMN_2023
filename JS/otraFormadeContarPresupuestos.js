let inputConfig = input.config();
let idMatriz = String(inputConfig.idMatriz);
console.log(`idMatriz: ${idMatriz}`); // Debugging step 1

let table = base.getTable('PRESUPUESTOS');
let queryResult = await table.selectRecordsAsync();

let filteredRecords = queryResult.records.filter(record => String(record.getCellValue('idMatriz')) === idMatriz);

console.log(filteredRecords); // Debugging step 2

let count = filteredRecords.length;

output.set('idTOTAL', { count });