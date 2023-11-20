// This code is for the AIRTABLE SCRIPT BLOCK

let table = base.getTable("YOUR_TABLE_NAME");
let view = table.getView("YOUR_VIEW_NAME");

let query = await view.selectRecordsAsync();

for (let record of query.records) {
    let formConvenio = record.getCellValue('FORM_CONVENIO');
    if (formConvenio) {
        let newList = formConvenio.filter(item => !item.name.includes('4'));
        await table.updateRecordAsync(record, {
            'CHECK_4_FORM': newList
        });
    } else {
        output.text('FORM_CONVENIO is null for recordId: ' + record.id);
    }
}