const mysql = require('mysql2/promise');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }
  const { nome, login, senha } = req.body;
  try {
    const conexao = await mysql.createConnection({
      host: 'y4cyfw.h.filess.io',
      port: 3307,
      user: 'sistema_licencas_norhungry',
      password: 'd5844738c1ec7e694177c266cc66f8d07b6aaf05',
      database: 'sistema_licencas_norhungry'
    });
    await conexao.execute(
      'INSERT INTO tbUsuarios (nome, login, senha) VALUES (?, ?, ?)',
      [nome, login, senha]
    );
    await conexao.end();
    return res.status(200).json({ sucesso: true });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ sucesso: false, erro: 'Login já cadastrado!' });
    }
    return res.status(500).json({ sucesso: false, erro: err.message });
  }
};
