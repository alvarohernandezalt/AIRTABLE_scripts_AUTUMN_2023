// Get the table
let table = base.getTable('MATRICES_BASE');

// Query the records in the table
let query = await table.selectRecordsAsync();

// Iterate over each record
for (let record of query.records) {
    // Get the 'NOMBRE ADMOR' field value, trim it, and convert it to uppercase
    let nombreAdmor = record.getCellValue('NOMBRE ADMOR');
    if (nombreAdmor) {
        nombreAdmor = nombreAdmor.trim().toUpperCase();

        // Update the 'nombreADMINISTRADOR' field with the new string
        await table.updateRecordAsync(record, {
            'nombreADMINISTRADOR': nombreAdmor
        });
    }
}