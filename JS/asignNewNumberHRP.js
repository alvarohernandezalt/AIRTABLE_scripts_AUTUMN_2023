let table = base.getTable("HOJA_RECOGIDA_PRESUPUESTOS");
let query = await table.selectRecordsAsync();
let highestValue = 0;

for (let record of query.records) {
  let currentValue = parseInt(record.getCellValueAsString("id_REAL"));
  if (currentValue > highestValue) {
    highestValue = currentValue;
  }
}

let outputValue = highestValue + 1;
output.set("id", outputValue);