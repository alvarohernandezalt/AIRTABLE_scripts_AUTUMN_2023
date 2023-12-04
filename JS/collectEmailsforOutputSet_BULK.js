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
let envioRealizadoString = record ? record.getCellValue('envioRealizadoString') : null;

let roleFieldMapping = {
    'ADMINISTRADOR': '@ADMOR',
    'PROPIEDAD': '@PPDAD',
    'ARQUITECTO': '@ARQ',
    'PROJECT MANAGER': '@PROJECTM',
    'REPRESENTANTE': '@RL'
};

let rolesToSearch = envioRealizadoString ? envioRealizadoString.split(',').map(role => role.trim()) : [];

for (let role of rolesToSearch) {
    if (role in roleFieldMapping) {
        let recogidasTable = base.getTable('HOJA_RECOGIDA_PRESUPUESTOS');
        let recogidasQueryResult = await recogidasTable.selectRecordsAsync({
            filterByFormula: `{ID} = '${recogidasID}'`,
            fields: [roleFieldMapping[role]] // Replace with your actual field name
        });
        let emailRecord = recogidasQueryResult.records[0];
        let email = emailRecord ? emailRecord.getCellValue(roleFieldMapping[role]) : null;

        if (email) {
            output.set('correosContactos', email);
        } else {
            console.log(`No email found for the given recogidasID with role ${role}`);
        }
    } else {
        console.log(`Role "${role}" is not in the roleFieldMapping object`);
    }
}