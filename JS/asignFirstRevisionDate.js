let inputValues = input.config();

let fechaFinMontaje = inputValues.finMontaje;
let recordID = inputValues.recordID;

// Connect to table 'ANDAMIOS_GESTIÓN'
let table = base.getTable('ANDAMIOS_GESTION');

// Get all records
let records = await table.selectRecordsAsync();

// Find the record with the given recordID
let record = records.records.find(r => r.id === recordID);

// Get the value of 'REVISION_ANDAMIO' field
let revisionAndamio = record.getCellValue('REVISION_ANDAMIO');

// Check if the value is 15
if (revisionAndamio === 15) {
    // Convert the string to a Date object
    let date = new Date(fechaFinMontaje);

    // Add 15 days to fechaFinMontaje
    date.setDate(date.getDate() + 15);

    // Check if the new date is a Saturday or Sunday
    if (date.getDay() === 0) {
        // If it's Sunday, add 1 day to get Monday
        date.setDate(date.getDate() + 1);
    } else if (date.getDay() === 6) {
        // If it's Saturday, add 2 days to get Monday
        date.setDate(date.getDate() + 2);
    }

    // Write the new date in 'fechaRevisionSiguiente' field
    await table.updateRecordAsync(record.id, {
        'fechaRevisionSiguiente': date.toISOString()
    });
}
