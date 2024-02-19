// Read from the table
var table = base.getTable("HOJA_RECOGIDA_PRESUPUESTOS");
var query = await table.selectRecordsAsync();

var subcontrata = input.config();
let municipio = subcontrata.municipio;

// Filter records by the same Municipio
let filteredRecords = query.records.filter(record => {
    let municipioRecord = record.getCellValue("Municipio");
    return municipioRecord && municipioRecord.some(m => m.name === municipio);
});

// Create a hash map for faster search
let hashMap = {};

// Populate the hash map
for (let record of filteredRecords) {
    if (record.getCellValue("DIRECCION") !== null) {
        hashMap[record.getCellValue("DIRECCION")] = true;
    }
    if (record.getCellValue("DireccionOK") !== null) {
        hashMap[record.getCellValue("DireccionOK")] = true;
    }
}

// Check for duplicates in the hash map
let IsDuplicate = hashMap[subcontrata.DIRECCION] || hashMap[subcontrata.DireccionOk];

output.set("IsDuplicate", IsDuplicate);