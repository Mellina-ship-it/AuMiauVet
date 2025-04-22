const jwt = require('jsonwebtoken');
require('dotenv').config({ path: __dirname + '/../.env' });

const autenticarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // formato: "Bearer token"

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ erro: 'Token inválido ou expirado.' });
    }

    req.usuario = usuario; // anexa os dados do usuário à requisição
    next();
  });
};

module.exports = autenticarToken;
