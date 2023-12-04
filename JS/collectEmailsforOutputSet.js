// Connect to input.config() values
let inputValue = input.config();
// Get the input.config() record ID
let configRecordId = inputValue.recordId;
// Get the recogidasID from the RECOGIDAS table using the config record ID
let recogidasID = inputValue.recogidasID;

let table = base.getTable('PRESUPUESTOS');
let queryResult = await table.selectRecordsAsync({
    filterByFormula: `{ID} = '${configRecordId}'`,
    fields: ['envioRealizadoString'] // Replace with your actual field name
});
let record = queryResult.records[0];
let envioRealizadoA = record ? record.getCellValue('envioRealizadoString') : null;

if (envioRealizadoA && envioRealizadoA.includes('ADMINISTRADOR')) {
    let recogidasTable = base.getTable('HOJA_RECOGIDA_PRESUPUESTOS');
    let recogidasQueryResult = await recogidasTable.selectRecordsAsync({
        filterByFormula: `{ID} = '${recogidasID}'`,
        fields: ['@ADMOR'] // Replace with your actual field name
    });
    let emailRecord = recogidasQueryResult.records[0];
    let email = emailRecord ? emailRecord.getCellValue('@ADMOR') : null;

    if (email) {
        output.set('correosContactos', email);
    } else {
        console.log('No email found for the given recogidasID');
    }
} else {
    console.log('ENVIO_REALIZADO_A does not contain "ADMINISTRADOR" or the record does not exist');
}