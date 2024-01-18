let inputValues = input.config();

let recordID = inputValues.recordID;
let certificadorRowId = inputValues.certificadorRowid;
let obraRowId = inputValues.obraRowId;

let table = base.getTable('OBRAS_ACTIVAS');

let query = {
    filterByFormula: `{ROWID} = '${obraRowId}'`
};

table.selectRecordsAsync(query).then(result => {
    let matchingRecords = result.records.filter(record => record.getCellValue('ROWID').includes(obraRowId));
    console.log(matchingRecords[0].id)});

// Convert certificadorRowId to a string with comma separation
let certificadorRowIdString = certificadorRowId.join(',');

output.set('certificadorRowIdString', certificadorRowIdString);
output.set('newObraId', matchingRecords[0].id )

