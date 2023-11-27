let table = base.getTable("HOJA_RECOGIDA_PRESUPUESTOS");
let linkedTable = base.getTable("PRESUPUESTOS");
let inputConfig = input.config();
let recordId = inputConfig.recordId;

let record = await table.selectRecordsAsync();
let linkedRecords = record.records.filter(r => r.id === recordId)[0].getCellValue('PRESUPUESTOS');

if (linkedRecords) {
    let linkedRecordIds = linkedRecords.map(lr => lr.id);
    await linkedTable.deleteRecordsAsync(linkedRecordIds);
}

await table.deleteRecordsAsync([recordId]);