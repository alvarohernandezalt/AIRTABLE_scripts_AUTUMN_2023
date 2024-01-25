let inputValues = input.config();

let fechaFinMontaje = inputValues.fechaCadaDosDias;
let recordID = inputValues.recordID;

// Convert the string to a Date object
let date = new Date(fechaFinMontaje);

// Add 2 days to fechaFinMontaje
    date.setDate(date.getDate() + 2);

// Check if the new date is a Saturday or Sunday
if (date.getDay() === 0) {
   // If it's Sunday, add 1 day to get Monday
    date.setDate(date.getDate() + 1);
} else if (date.getDay() === 6) {
    // If it's Saturday, add 2 days to get Monday
    date.setDate(date.getDate() + 2);
}

// Convert the date to ISO string
let dateStr = date.toISOString();

// Store the date in the output
output.set('fechaSolicitudSiguiente', dateStr);

// Get the 'andamiosRevisionesPeriodicas' table
let table = base.getTable('andamiosRevisionesPeriodicas');

// Get the records from the 'andamiosRevisionesPeriodicas' table
let records = await table.selectRecordsAsync();

// Iterate over the records
for (let record of records.records) {
    // Check if the first element of 'andamioGestionRowId' array is equal to 'recordID'
    if (record.getCellValue('andamioGestionRowId')[0] === recordID) {
        // Check if 'tipoCertificado' is not '01CE'
        if (record.getCellValue('tipoStringREV') !== 'FINAL DE MONTAJE') {
            // Update the 'fechaCadaDosDias' field of the record with 'dateStr'
            await table.updateRecordAsync(record.id, {
                'fechaCadaDosDias': dateStr
            });
        }
    }
}

