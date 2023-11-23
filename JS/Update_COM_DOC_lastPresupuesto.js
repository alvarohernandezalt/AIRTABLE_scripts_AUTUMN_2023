/**
 * This script updates the records in the "PRESUPUESTOS" table based on the input values.
 * It filters the records based on the provided "numeroPresupuesto" value and finds the record with the highest "ID_PRESUPUESTO" value.
 * Then, it updates the "FECHA_ENTREGA_PREVISTA", "COMENTARIO_ESPECIFICO", and "DOCUMENTACION_ESPACIFICA" columns with the input values.
 */

let table = base.getTable("PRESUPUESTOS");
let query = await table.selectRecordsAsync();

// Get the input values
let inputValues = input.config();
let numero_pre = inputValues.numeroPresupuesto;
let nuevaFechaEntrega = inputValues.nuevaFechaEntrega;
let comentarioSeguimimento = inputValues.comentarioSeguimimento;
let documentacionAnexa = inputValues.documentacionAnexa;

// Filter the records based on the input values
let filteredRecords = query.records.filter(record => {
    return record.getCellValue("idMatriz") === numero_pre;
});

// Find the record with the highest ID_PRESUPUESTO value
let maxId = 0;
let maxRecord = null;
filteredRecords.forEach(record => {
    let idPresupuesto = record.getCellValue("ID_PRESUPUESTO");
    if (idPresupuesto > maxId) {
        maxId = idPresupuesto;
        maxRecord = record;
    }
});

// Update the FECHA_ENTREGA_PREVISTA column with the input value
if (maxRecord !== null) {
    await table.updateRecordAsync(maxRecord.id, {
        "FECHA_ENTREGA_PREVISTA": nuevaFechaEntrega,
        "COMENTARIO_ESPECIFICO": comentarioSeguimimento,
        "DOCUMENTACION_ESPACIFICA": documentacionAnexa
    });
}