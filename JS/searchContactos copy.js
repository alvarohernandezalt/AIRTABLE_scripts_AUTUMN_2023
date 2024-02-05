let clientesTable = base.getTable("CONTACTOS");
let entradasKalamTable = base.getTable("entradasKALAM");

let entradasKalamRecords = await entradasKalamTable.selectRecordsAsync();
entradasKalamRecords = entradasKalamRecords.records.filter(record => record.getCellValue("telClean") !== null);

let searchResults = entradasKalamRecords.map(record => {
    let telCleanM = record.getCellValue("telClean");
    let existence = record.getCellValue("existence");
    let matchingRecords = clientesTable.selectRecords({
        fields: ["telCleanM"],
        filterByFormula: `telCleanM = "${telCleanM}"`
    });
    return matchingRecords.length > 0 && existence;
});
