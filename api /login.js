import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const { login, senha } = req.body;

  const conexao = await mysql.createConnection({
    host: 'y4cyfw.h.filess.io',
    port: 3307,
    user: 'sistema_licencas_norhungry',
    password: 'SUA_SENHA_AQUI',
    database: 'sistema_licencas_norhungry'
  });

  const [rows] = await conexao.execute(
    'SELECT * FROM tbUsuarios WHERE login = ? AND senha = ?',
    [login, senha]
  );

  await conexao.end();

  if (rows.length > 0) {
    return res.status(200).json({ sucesso: true });
  } else {
    return res.status(401).json({ sucesso: false });
  }
}
