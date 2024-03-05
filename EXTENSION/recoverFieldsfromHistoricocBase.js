// Get the table from Airtable
let table = base.getTable('HISTORICO');
let table2 = base.getTable('MATRICES_BASE');

// Fetch all records from both tables
let historicoRecords = await table.selectRecordsAsync();
let matricesBaseRecords = await table2.selectRecordsAsync();

// Iterate over each record in the 'HISTORICO' table
for (let historicoRecord of historicoRecords.records) {
    // For each 'HISTORICO' record, iterate over each record in the 'MATRICES_BASE' table
    for (let matricesBaseRecord of matricesBaseRecords.records) {
        // If the 'CODIGO_EST' field in the 'HISTORICO' record matches the 'id_REAL' field in the 'MATRICES_BASE' record
        if (historicoRecord.getCellValue('CODIGO_EST') === matricesBaseRecord.getCellValue('id_REAL')) {
            // Copy the value from the 'recogidoPorAntiguoHistorico' field in the 'HISTORICO' record to the 'antiguoRecogedor' field in the 'MATRICES_BASE' record
            let newValue = historicoRecord.getCellValue('recogidoPorAntiguoHistorico');
            // Update the 'MATRICES_BASE' record with the new 'antiguoRecogedor' value
            await table2.updateRecordAsync(matricesBaseRecord, {
                'antiguoRecogedor': newValue
            });
        }
    }
}