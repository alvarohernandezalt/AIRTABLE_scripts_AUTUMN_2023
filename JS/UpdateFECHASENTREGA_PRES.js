/* When Automation is Triggered connect to TABLE
    Then look the two date values setted in the input variable input.config()
    This script search for the latest NUMERO_PRE and change FechaLIMITE_ENTREGA with the one in ENTREGA_F
*/
let table = base.getTable("PRESUPUESTOS");
let query = await table.selectRecordsAsync();

// Get the input values
let inputValues = input.config();
let entrega_f = inputValues.ENTREGA_F;
let numero_pre = inputValues.NUMERO_PRE;

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

// Update the FechaLIMITE_ENTREGA column with the input value
if (maxRecord !== null) {
    await table.updateRecordAsync(maxRecord.id, {
        "FechaLIMITE_ENTREGA": entrega_f
    });
}