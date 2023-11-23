/* This script retrieves records from a table called 'SOLICITUD_ACCESOS_CHECKIN' in the 'PRL_SUBCONTRATAS' base,
based on a search code provided as input. If any records are found, their 'ACTA_ACTUALIZADA' field is updated to 'SI'.
*/

let inputConfig = input.config();
let recordId = inputConfig.RecordID;
let searchCode = inputConfig.SEARCH_CODE;

let table = base.getTable('CC_Fixing');
let query = await table.selectRecordsAsync();

let filteredRecords = query.records.filter(record => {
    return record.getCellValue("SEARCH_CODE") === searchCode;
});

filteredRecords.forEach(async (record) => {
    await table.updateRecordAsync(record.id, {
        ACTA_SCRIPT: 'SI'
    });
});


