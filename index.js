const gsheet = require('./lib/gsheet');
const { documentId } = require('./config');

async function main() {
  const DATA_SHEET = 0;
  await gsheet.init({ documentId });
  const sheet = await gsheet.getSheet(DATA_SHEET)
  console.log(sheet.rowCount);
  await gsheet.addRow(sheet,
    {
      contratante: 'Álvaro Reis Neto',
      cidade: 'Manaus',
      contato: '14/03/2020',
      servico: 'Audiência'
    });
  const lastRows = await gsheet.getRows(sheet);
  lastRows.forEach((row) => console.log(row.contratante, row.contato))
}

main();