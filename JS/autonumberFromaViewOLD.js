let inputConfig = input.config();
let idMatriz = String(inputConfig.idMatriz);

let table = base.getTable('PRESUPUESTOS');
let queryResult = await table.selectRecordsAsync();

let count = 0;
for (let record of queryResult.records) {
  let fieldValue = record.getCellValueAsString('idMatriz');
  if (String(fieldValue) === idMatriz) {
    count++;
  }
}

output.set('idTOTAL', { count });
