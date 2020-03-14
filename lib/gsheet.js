const { GoogleSpreadsheet } = require('google-spreadsheet');

const credentials = require('../config/credentials.json');

const gsheet = {
  async init({ documentId }) {
    this.documentId = documentId;
    this.document = new GoogleSpreadsheet(documentId);
    await this.document.useServiceAccountAuth(credentials);
    await this.document.loadInfo();
  },

  async getSheet(index) {
    return this.document.sheetsByIndex[index];
  },

  async addRow(sheet, data) {
    await sheet.addRow(data);
  }
}

module.exports = gsheet;