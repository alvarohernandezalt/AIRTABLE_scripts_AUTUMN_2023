
// This script updates the DIRECCION column in the Airtable table 'YourTableName' by inserting the value of the MUNICIPIO column after the first "-" character in the DIRECCION value.

// Get the table from Airtable
let table = base.getTable('YourTableName');

// Fetch all records from the table
let records = await table.selectRecordsAsync();

// Iterate over each record
for (let record of records.records) {
  // Get the value of the MUNICIPIO column
  let municipio = record.getCellValue('MUNICIPIO');

  // Get the value of the DIRECCION column
  let direccion = record.getCellValue('DIRECCION');

  // Find the index of the first "-" character in the direccion value
  let index = direccion.indexOf('-');

  // Insert the municipio value after the first "-" character with a space between them
  let newDireccion = direccion.substring(0, index + 1) + ' ' + municipio + direccion.substring(index + 1);

  // Update the DIRECCION column with the new value
  table.updateRecordAsync(record, {
    'DIRECCION': newDireccion
  });
}
