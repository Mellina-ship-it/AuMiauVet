const db = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: __dirname + '/../.env' });

const login = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
  }

  const sql = 'SELECT * FROM funcionarios WHERE email = ?';

  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('Erro ao buscar funcionário:', err);
      return res.status(500).json({ erro: 'Erro no servidor.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ erro: 'Funcionário não encontrado.' });
    }

    const funcionario = results[0];
    const senhaCorreta = await bcrypt.compare(senha, funcionario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Senha incorreta.' });
    }

    // cria token
    const token = jwt.sign(
      { id: funcionario.id, nome: funcionario.nome, email: funcionario.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // envia o token para o terminal do vscode
    console.log('Token gerado:', token);

    res.json({ mensagem: 'Login bem-sucedido!', token });
  });
};

module.exports = { login };
