// Read from the table
var table = base.getTable("HOJA_RECOGIDA_PRESUPUESTOS");
var query = await table.selectRecordsAsync();

var subcontrata = input.config();

// Check for duplicates in the table
let duplicate = query.records.find(record => {
    if (record.getCellValue("DIRECCION") !== null && record.getCellValue("DireccionOK") !== null) {
        return ((record.getCellValue("DIRECCION") === subcontrata.DIRECCION || record.getCellValue("DireccionOK") === subcontrata.DireccionOk) && record.id !== subcontrata.recordID);
    }
})

let IsDuplicate = false;
if(duplicate) {
    IsDuplicate = true;
}

output.set("IsDuplicate",IsDuplicate);
