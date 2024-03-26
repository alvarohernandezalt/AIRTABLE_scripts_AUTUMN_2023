let table = base.getTable("PRESUPUESTOS");
let records = await table.selectRecordsAsync();
let emptyRecords = records.filter(record => !record.getCellValue("PM"));
await table.deleteRecordsAsync(emptyRecords);