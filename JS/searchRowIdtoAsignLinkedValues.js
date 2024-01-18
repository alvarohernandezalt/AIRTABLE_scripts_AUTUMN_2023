let inputValues = input.config();

let recordId = inputValues.recordId;
let certificadoresList = inputValues.certificadoresList;

let certificadores = certificadoresList.split(",");

let table = base.getTable("CertificadoresAndamios");

let records = await Promise.all(certificadores.map(async certificador => {
    let cleanedCertificador = certificador.trim().replace(/"/g, '');
    let queryResult = await table.selectRecordsAsync();
    return queryResult.records.filter(record => record.getCellValue('registroBusquedaRowId') === cleanedCertificador);
}));

let recordIds = records.flat()
    .map(record => record.id);

output.set('certificadorID',recordIds);