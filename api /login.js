module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }
  const { login, senha } = req.body;
  if (login === 'admin' && senha === '123456') {
    return res.status(200).json({ sucesso: true });
  }
  return res.status(401).json({ sucesso: false });
};
