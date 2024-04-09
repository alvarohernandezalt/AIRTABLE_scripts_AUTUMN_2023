let inputConfig = input.config();
let idMatriz = String(inputConfig.idMatriz);

let table = base.getTable('PRESUPUESTOS');
let queryResult = await table.selectRecordsAsync({
  filterByFormula: `{idMatriz} = '${idMatriz}'`,
  view: "00_SCRIPT"
});

let count = queryResult.records.length;

output.set('idTOTAL', { count });