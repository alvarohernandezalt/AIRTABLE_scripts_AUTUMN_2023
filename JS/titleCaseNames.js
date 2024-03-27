// Get the record from the trigger
let record = input.config();

// Get the field value
let recordID = record.recordID;
let fieldValue = record.YourFieldName;

// Function to capitalize the first letter of each word
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// Convert the field value to title case
let titleCaseValue = toTitleCase(fieldValue);

// Update the record with the new value
let table = base.getTable("Your Table Name");
await table.updateRecordAsync(recordID, {
    "YourFieldName": titleCaseValue
});