// Clean Formations with the name '4' from the FORM_CONVENIO field
// Define the table and get the recordId from the input.config() object

let table = base.getTable("YOUR_TABLE_NAME");
let recordId = input.config().recordId;

let records = await table.selectRecordsAsync();
let record = records.records.find(r => r.id === recordId);
let formConvenio = record.getCellValue('FORM_CONVENIO');

if (formConvenio) {
    let newList = formConvenio.filter(item => !item.name.includes('4'));
    output.set('CHECK_4_FORM', newList);
} else {
    console.log('FORM_CONVENIO is null for recordId: ', recordId);
}