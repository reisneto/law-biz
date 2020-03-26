const gsheet = require('./lib/gsheet');
const { documentId } = require('./config');

exports.addRegister = async (req, res) => {
  const {
    contratante,
    cidade,
    contato,
    servico,
    data_prestacao,
    atuacao,
    local,
    valor,
    canal,
    data_pagamento,
    status,
    envolvidos,
    email
  } = req.body;
  const DATA_SHEET = 0;
  await gsheet.init({ documentId });
  const sheet = await gsheet.getSheet(DATA_SHEET)
  await gsheet.addRow(sheet,
    {
      contratante,
      cidade,
      contato,
      servico,
      data_prestacao,
      atuacao,
      local,
      valor,
      canal,
      data_pagamento,
      status,
      envolvidos,
      email
    });
  res.send(req.body);
};

exports.listLastTen = async (req, res) => {
  await gsheet.init({ documentId });
  const sheet = await gsheet.getSheet();
  const lastRows = await gsheet.getRows(sheet);
  const clients = lastRows.map(row => ({
    contratante: row.contratante,
    cidade: row.cidade,
    contato: row.contato,
    servico: row.servico,
    data_prestacao: row.data_prestacao,
    atuacao: row.atuacao,
    local: row.local,
    valor: row.valor,
    canal: row.canal,
    data_pagamento: row.data_pagamento,
    status: row.status,
    envolvidos: row.envolvidos,
    email: row.email
  }));
  res.send(JSON.stringify(clients));
}