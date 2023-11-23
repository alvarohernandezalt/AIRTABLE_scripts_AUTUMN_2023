// Get the record ID from the input.config()
let table = base.getTable("CLIENTES");
let inputValues = input.config();
let recordtoErase = inputValues.recordID;

// Generate a random number between 0 and 99
const randomNumber = Math.floor(Math.random() * 100);

// Update the 'numeroRandomizado' field of the record with the generated random number
table.updateRecordAsync(recordtoErase, { numeroRandomizado: randomNumber })
    .then(() => {
        console.log('Random number generated and assigned successfully!');
    })
    .catch((error) => {
        console.error('Error assigning random number:', error);
    });

