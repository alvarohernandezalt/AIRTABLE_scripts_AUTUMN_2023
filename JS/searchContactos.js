let clientesTable = base.getTable("CONTACTOS");
let entradasKalamTable = base.getTable("entradasKALAM");

let entradasKalamRecords = await entradasKalamTable.selectRecordsAsync();
let entradasKalamRecordsFilter = entradasKalamRecords.records.filter(record => record.getCellValue("telClean") !== null);

console.log(entradasKalamRecordsFilter);

for (let entradaRecord of entradasKalamRecordsFilter) {
    let telClean = entradaRecord.getCellValue("telClean");
    

    let clientesRecords = await clientesTable.selectRecordsAsync();
    let matchingRecord = clientesRecords.records.find(clientesRecord => 
        clientesRecord.getCellValue("telCleanM") === telClean
    );

    if (matchingRecord) {
        await entradasKalamTable.updateRecordAsync(entradaRecord.id, {"existence": true});
    } else {
        await entradasKalamTable.updateRecordAsync(entradaRecord.id, {"existence": false});
    }
}