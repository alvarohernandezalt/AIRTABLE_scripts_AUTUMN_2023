/*
This code deletes a record and its linked records from two tables in a database. 
It first retrieves the record ID from the input configuration. 
Then, it selects the record from the "PRINCIPAL_TABLE" and checks if it has any linked records. 
If there are linked records, it retrieves their IDs and deletes them from the "LINKED_TABLE". 
Finally, it deletes the original record from the "PRINCIPAL_TABLE".
*/
let table = base.getTable("PRINCIPAL_TABLE");
let linkedTable = base.getTable("LINKED_TABLE");
let inputConfig = input.config();
let recordId = inputConfig.recordId;

let record = await table.selectRecordsAsync();
let linkedRecords = record.records.filter(r => r.id === recordId)[0].getCellValue('PRINCIPAL_TABLE_LINKED_FIELD');

if (linkedRecords) {
    let linkedRecordIds = linkedRecords.map(lr => lr.id);
    await linkedTable.deleteRecordsAsync(linkedRecordIds);
}

await table.deleteRecordsAsync([recordId]);