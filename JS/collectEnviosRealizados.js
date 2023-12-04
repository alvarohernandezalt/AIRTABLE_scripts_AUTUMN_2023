// Connect to input.config() values
let inputValue = input.config();
// Get the input.config() record ID
let configRecordId = inputValue.recordId;
// Get the recogidasID from the RECOGIDAS table using the config record ID
let recogidasID = inputValue.recogidasID;

// Get the envioRealizadoString field value
let envioRealizadoString = inputValue.envioRealizadoString;

// Convert envioRealizadoString to a list (separated by commas)
let envioRealizadoList = envioRealizadoString.split(',');

// Create an empty array to store the email contacts
let emailContactos = [];

// Check if envioRealizadoList contains any of the specified values
if (envioRealizadoList.includes('ADMINISTRADOR')) {
    // Look for @ADMOR in HOJA_RECOGIDA_PRESUPUESTOS
    let emailADMOR = HOJA_RECOGIDA_PRESUPUESTOS['@ADMOR'];
    if (emailADMOR) {
        emailContactos.push(emailADMOR);
    }
}

if (envioRealizadoList.includes('ARQUITECTO')) {
    // Look for @ARQ in HOJA_RECOGIDA_PRESUPUESTOS
    let emailARQ = HOJA_RECOGIDA_PRESUPUESTOS['@ARQ'];
    if (emailARQ) {
        emailContactos.push(emailARQ);
    }
}

if (envioRealizadoList.includes('PROPIEDAD')) {
    // Look for @PPDAD in HOJA_RECOGIDA_PRESUPUESTOS
    let emailPPDAD = HOJA_RECOGIDA_PRESUPUESTOS['@PPDAD'];
    if (emailPPDAD) {
        emailContactos.push(emailPPDAD);
    }
}

if (envioRealizadoList.includes('PROJECT MANAGER')) {
    // Look for @PROJECTM in HOJA_RECOGIDA_PRESUPUESTOS
    let emailPROJECTM = HOJA_RECOGIDA_PRESUPUESTOS['@PROJECTM'];
    if (emailPROJECTM) {
        emailContactos.push(emailPROJECTM);
    }
}

if (envioRealizadoList.includes('REPRESENTANTE')) {
    // Look for @RL in HOJA_RECOGIDA_PRESUPUESTOS
    let emailRL = HOJA_RECOGIDA_PRESUPUESTOS['@RL'];
    if (emailRL) {
        emailContactos.push(emailRL);
    }
}

// Convert the emailContactos array to a string separated by commas
let emailContactosString = emailContactos.join(',');

// Set the value of correosContactos to emailContactosString
output.set('correosContactos', emailContactosString);


