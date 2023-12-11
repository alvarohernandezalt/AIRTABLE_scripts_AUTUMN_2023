/*
NOT WORKING!!!!!!!! YET.....
*/



// Import necessary modules
let table = base.getTable('InformesKALAM');
let recordId = input.config().recordID;

// Get the record
let record = await table.selectRecordsAsync().then(records => records.getRecord(recordId));

// Get the 'archivo' field
let archivo = record.getCellValue('archivo');

// Pass the 'archivo' to the next action
output.set('archivo', archivo);