// Get the table
let table = base.getTable('MATRICES_BASE');

// Ask the user to pick the source and destination fields
let sourceField = await input.fieldAsync("Campo Fuente", table);
let destinationField = await input.fieldAsync("Campo Destino", table);

// Query the records in the table
let query = await table.selectRecordsAsync();

// Iterate over each record
for (let record of query.records) {
    // Get the source field value, trim it, and convert it to uppercase
    let fieldValue = record.getCellValue(sourceField.name);
    if (fieldValue) {
        fieldValue = fieldValue.trim().toUpperCase();

        // Update the destination field with the new string
        await table.updateRecordAsync(record, {
            [destinationField.name]: fieldValue
        });
    }
}