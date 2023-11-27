// Define the table
let table = base.getTable("YourTableName");

// Select the records
let query = await table.selectRecordsAsync();

// Filter out the records that have already been updated
let recordsToUpdate = query.records.filter(record => !record.getCellValue("Updated"));

// Shuffle the records array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(recordsToUpdate);

// Initialize an empty array for updates
let updates = [];

// Define a limit for the number of records to process at a time
let limit = 900;

// Loop through the records
for (let i = 0; i < Math.min(recordsToUpdate.length, limit); i++) {
    let record = recordsToUpdate[i];

    // Generate a random number between 0 and 99
    let randomNumber = Math.floor(Math.random() * 100);

    // Add the update to the array
    updates.push({
        id: record.id,
        fields: {
            "YourFieldName": randomNumber,
            "Updated": true  // Mark the record as updated
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