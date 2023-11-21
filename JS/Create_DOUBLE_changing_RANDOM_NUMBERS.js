let table = base.getTable("PRESUPUESTOS");
let records = await table.selectRecordsAsync();

let updates = records.records.map(record => {
    // Generate two random numbers between 0 and 9 for each record
    let randomNum1 = Math.floor(Math.random() * 10);
    let randomNum2 = Math.floor(Math.random() * 10);

    return {
        id: record.id,
        fields: {
            "num_BORRAR": randomNum1,
            "num_BORRAR_2": randomNum2
        }
    };
});

await table.updateRecordsAsync(updates);
