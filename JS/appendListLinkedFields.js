let inputValues = input.config();
let recordID = inputValues.recordID;

// Assuming SUB_PRIMER_NIVEL is a field in the record
let subPrimerNivelId = inputValues.SUB_PRIMER_NIVEL;

// Get a reference to the table
let table = base.getTable('SUBCONTRATAS');

// Query the table
let query = await table.selectRecordsAsync();

// Find the record where the id matches SUB_PRIMER_NIVEL
let record = query.records.find(record => record.id === subPrimerNivelId);

let toAppend;
if (record) {
    toAppend = record.id;
}
