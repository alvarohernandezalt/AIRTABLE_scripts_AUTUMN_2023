base_id = 'app3aNxm2q96bPeJF'

let inputConfig = input.config();

let recordId = inputConfig.recordId;
let nombre = inputConfig.name;
let telefono = inputConfig.telefono;

// Import the base
let myBase = input.base(base_id);

// Get the table
let table = myBase.getTable('filtradoTodo');

// Create a new record
await table.createRecordAsync({
    'Nombre': nombre,
    'Teléfono': telefono
});

