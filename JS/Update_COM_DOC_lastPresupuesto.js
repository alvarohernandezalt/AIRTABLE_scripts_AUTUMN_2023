/* This script updates a record in the "PRESUPUESTOS" table based on the input values. 
It filters the records based on the "idMatriz" field, finds the record with the highest "ID_SECUNDARIA" value, 
and updates the "FECHA_ENTREGA_PREVISTA", "COMENTARIO_ESPECIFICO", and "DOC_ESPECIFICA" fields 
with the corresponding values from the found record.
*/
let table = base.getTable("PRESUPUESTOS");
let query = await table.selectRecordsAsync();

// Get the input values
let inputValues = input.config();
let numero_pre = inputValues.numeroPresupuesto;


// Filter the records based on the input values
let filteredRecords = query.records.filter(record => {
    return record.getCellValue("idMatriz") === numero_pre;
});
console.log(filteredRecords);
// Find the record with the highest ID_PRESUPUESTO value
let maxId = 0;
let maxRecord = null;
filteredRecords.forEach(record => {
    let idPresupuesto = record.getCellValue("ID_SECUNDARIA");
    if (idPresupuesto > maxId && record.id !== inputValues.recordID) {
        maxId = idPresupuesto;
        maxRecord = record;
    }
});
console.log(maxRecord);
let nuevaFechaEntrega = maxRecord !== null ? maxRecord.getCellValue("nuevaFECHA_ENTREGA") : null;
let comentarioSeguimimento = maxRecord !== null ? maxRecord.getCellValue("COMENTARIO_SEGUIMIENTO") : null;
let documentacionAnexa = maxRecord !== null ? maxRecord.getCellValue("DOCUMENTACION_ANEXA") : null;
console.log(nuevaFechaEntrega,comentarioSeguimimento,documentacionAnexa);

// Update the FECHA_ENTREGA_PREVISTA column with the input value
if (maxRecord !== null) {
    const updateFields = {};
    if (nuevaFechaEntrega !== null) {
        updateFields["FECHA_ENTREGA_PREVISTA"] = nuevaFechaEntrega;
    }
    if (comentarioSeguimimento !== null) {
        updateFields["COMENTARIO_ESPECIFICO"] = comentarioSeguimimento;
    }
    if (documentacionAnexa !== null) {
        updateFields["DOC_ESPECIFICA"] = documentacionAnexa;
    }
    await table.updateRecordAsync(inputValues.recordID, updateFields);
}