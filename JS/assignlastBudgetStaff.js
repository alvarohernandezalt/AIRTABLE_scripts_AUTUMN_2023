/* This script updates a record in the "PRESUPUESTOS" table based on the input values. 
It filters the records based on the "idMatriz" field, finds the record with the highest "ID_SECUNDARIA" value, 
and updates the "FECHA_ENTREGA_PREVISTA", "COMENTARIO_ESPECIFICO", and "DOC_ESPECIFICA" fields 
with the corresponding values from the found record.
*/

let table = base.getTable("PRESUPUESTOS");
let view = table.getView("00_SCRIPT");
let query = await view.selectRecordsAsync();

// Get the input values
let inputValues = input.config();
let numero_pre = inputValues.numeroPresupuesto;

// Find the record with the highest ID_SECUNDARIA value
let maxRecord = query.records.reduce((max, record) => {
    if (record.getCellValue("idMatriz") === numero_pre && record.id !== inputValues.recordID) {
        let idPresupuesto = record.getCellValue("ID_SECUNDARIA");
        if (!max || idPresupuesto > max.getCellValue("ID_SECUNDARIA")) {
            return record;
        }
    }
    return max;
}, null);

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