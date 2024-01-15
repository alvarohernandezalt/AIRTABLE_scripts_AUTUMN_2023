let table = base.getTable("HOJA_RECOGIDA_PRESUPUESTOS");

let currentYear = new Date().getFullYear();
let lastTwoDigitsOfYear = String(currentYear).slice(-2);

// Assuming the database supports a function like this
let query = await table.selectRecordsAsync({
  filterByFormula: `{id_REAL} BEGINS_WITH '${lastTwoDigitsOfYear}'`
});

let highestValue = 0;

for (let record of query.records) {
  let currentValue = parseInt(record.getCellValueAsString("id_REAL"));
  if (currentValue > highestValue) {
    highestValue = currentValue;
  }
}

let outputValue = highestValue + 1;
output.set("id", outputValue);
