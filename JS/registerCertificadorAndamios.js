let inputValues = input.config();

let recordID = inputValues.recordID;
let certificadorRowId = inputValues.certificadorRowid;
let obraRowId = inputValues.obraRowId;

let table = base.getTable('OBRAS_ACTIVAS');


// Search for the record with matching obraRowId
let query = await table.selectRecordsAsync({
    filterByFormula: `ROWID() = '${obraRowId}'`
});

if (query.records.length > 0) {
    let record = query.records[0];
    let certificadorAndamioField = record.getCellValue('CERTIFICADOR_ANDAMIO');

    // Append the certificadorRowId to the existing values in CERTIFICADOR_ANDAMIO field
    if (certificadorAndamioField) {
        certificadorAndamioField += `, ${certificadorRowId}`;
    } else {
        certificadorAndamioField = certificadorRowId;
    }

    // Update the record with the new value in CERTIFICADOR_ANDAMIO field
    await table.updateRecordAsync(record, {
        'CERTIFICADOR_ANDAMIO': certificadorAndamioField
    });
}


