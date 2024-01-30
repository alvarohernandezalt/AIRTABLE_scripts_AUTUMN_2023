let inputValues = input.config();
let formMessage = inputValues.formMessage;
let recordID = inputValues.recordID;

let nombre = formMessage.match(/Nombre:(.*?)(\n|$)/)[1].trim();
output.set('Nombre', nombre);

let email = formMessage.match(/Email:.*<(.*)>/)[1].trim();
output.set('email', email);

let telefono = formMessage.match(/Telf:(.*?)(\n|$)/)[1].trim();
output.set('telefono', telefono)

let direccion = formMessage.match(/Dirección:(.*?)(\n|$)/)[1].trim();
output.set('direccion', direccion)

let cuerpo = formMessage.match(/Contenido:(.*?)--/s)[1].trim();
output.set('cuerpo', cuerpo);