// Define the table
let table = base.getTable("YourTableName");

// Select the records
let query = await table.selectRecordsAsync();

// Initialize an empty array for updates
let updates = [];

// Loop through the records
for (let record of query.records) {
    // Generate a random number between 0 and 99
    let randomNumber = Math.floor(Math.random() * 100);

    // Add the update to the array
    updates.push({
        id: record.id,
        fields: {
            "YourFieldName": randomNumber
        }
    });

    // If the updates array has 50 records, update the records and clear the array
    if (updates.length === 50) {
        await table.updateRecordsAsync(updates);
        updates = [];
    }
}

// If there are any remaining records in the updates array, update them
if (updates.length > 0) {
    await table.updateRecordsAsync(updates);
}