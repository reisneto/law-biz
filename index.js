const { GoogleSpreadsheet } = require('google-spreadsheet');

const credentials = require('./config/credentials.json');
const { documentId } = require('./config');


async function getDocument() {
  const document = new GoogleSpreadsheet(documentId);

  await document.useServiceAccountAuth(credentials);

  await document.loadInfo();

  return document;
}

async function getSheet(document, index) {
  return document.sheetsByIndex[index];
}

async function addRow(sheet, data) {
  await sheet.addRow(data);
}

async function main() {
  const DATA_SHEET = 0;
  const document = await getDocument();
  const sheet = await getSheet(document, DATA_SHEET)
  console.log(sheet.rowCount);
  await addRow(sheet,
    {
      contratante: 'Álvaro Reis Neto',
      cidade: 'Manaus',
      contato: '14/03/2020',
      servico: 'Audiência'
    });
  console.log(sheet.rowCount);
}

main();