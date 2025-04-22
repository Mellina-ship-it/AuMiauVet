const db = require('../database');
const bcrypt = require('bcrypt');

const cadastrarFuncionario = async (req, res) => {
  const { nome, cpf, email, senha } = req.body;

  if (!nome || !cpf || !email || !senha) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const sql = `
      INSERT INTO funcionarios (nome, cpf, email, senha)
      VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [nome, cpf, email, senhaCriptografada], (err, result) => {
      if (err) {
        console.error('Erro ao cadastrar funcionário:', err);
        return res.status(500).json({ erro: 'Erro ao cadastrar funcionário.' });
      }

      res.status(201).json({ mensagem: 'Funcionário cadastrado com sucesso!' });
    });
  } catch (err) {
    console.error('Erro interno:', err);
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
};

module.exports = { cadastrarFuncionario };
