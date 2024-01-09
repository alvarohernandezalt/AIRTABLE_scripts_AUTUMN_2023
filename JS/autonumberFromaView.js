let inputConfig = input.config();
let idMatriz = String(inputConfig.idMatriz);

let table = base.getTable('PRESUPUESTOS');
let queryResult = await table.selectRecordsAsync({
    fields: ['idMatriz'],
    filterByFormula: `{idMatriz} = '${idMatriz}'`
});

let count = queryResult.records.length;

output.set('idTOTAL', { count });