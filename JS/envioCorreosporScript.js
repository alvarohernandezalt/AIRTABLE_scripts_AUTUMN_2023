// Connect to input.config() values
let inputValue = input.config();
// Get the input.config() record ID
let configRecordId = inputValue.recordId;
// Get the recogidasID from the RECOGIDAS table using the config record ID
let recogidasID = inputValue.recogidasID;
console.log(typeof(recogidasID));

let envioRealizadoString = inputValue.envioRealizadoString;

let roleFieldMapping = {
    'ADMINISTRADOR': '@ADMOR',
    'PROPIEDAD': '@PPDAD',
    'ARQUITECTO': '@ARQ',
    'PROJECT MANAGER': '@PROJECTM',
    'REPRESENTANTE': '@RL'
};

let rolesToSearch = envioRealizadoString ? envioRealizadoString.split(',').map(role => role.trim()) : [];

let recogidasTable = base.getTable('HOJA_RECOGIDA_PRESUPUESTOS');
let fieldsToFetch = ['RecordID', ...Object.values(roleFieldMapping)];
let recogidasQueryResult = await recogidasTable.selectRecordsAsync({ fields: fieldsToFetch });
console.log('recogidasID:', recogidasID);
console.log('recogidasQueryResult.records:', recogidasQueryResult.records);
let emailRecord = recogidasQueryResult.records.find(record => record.getCellValue('RecordID') === recogidasID);

let emails = [];

for (let role of rolesToSearch) {
    if (role in roleFieldMapping) {
        let email = emailRecord ? emailRecord.getCellValue(roleFieldMapping[role]) : null;

        if (email) {
            emails.push(email);
        } else {
            console.log(`No email found for the given recogidasID with role ${role}`);
        }
    } else {
        console.log(`Role "${role}" is not in the roleFieldMapping object`);
    }
}

output.set('correosContactos', emails);