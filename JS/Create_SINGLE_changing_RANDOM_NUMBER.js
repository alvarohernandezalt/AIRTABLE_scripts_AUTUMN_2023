// Create a random number that changes with the Airtable Time Automations.
// This is a single number that changes every time the automation runs.
let table = base.getTable("PRESUPUESTOS");
let records = await table.selectRecordsAsync();

let updates = records.records.map(record => {
    // Generate a random number between 0 and 9 for each record
    let randomNum = Math.floor(Math.random() * 10);

    return {
        id: record.id,
        fields: {
            "num_BORRAR": randomNum
        }
    };
});

await table.updateRecordsAsync(updates);

