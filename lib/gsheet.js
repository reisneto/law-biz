const { GoogleSpreadsheet } = require('google-spreadsheet');

const credentials = require('../config/credentials.json');

const gsheet = {
  async init({ documentId }) {
    this.documentId = documentId;
    this.document = new GoogleSpreadsheet(documentId);
    await this.document.useServiceAccountAuth(credentials);
    await this.document.loadInfo();
    this.MINROWS = 10;
  },

  async getSheet(index = 0) {
    return this.document.sheetsByIndex[index];
  },

  async addRow(sheet, data) {
    await sheet.addRow(data);
  },

  async getRows(sheet) {
    return await sheet.getRows({ offset: sheet.rowCount - this.MINROWS - 1 });
  }
}

module.exports = gsheet;