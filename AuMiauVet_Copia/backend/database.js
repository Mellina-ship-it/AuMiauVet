const mysql = require('mysql2');
require('dotenv').config({ path: __dirname + '/.env' });

require('dotenv').config();
console.log('Variáveis carregadas:', {
  user: process.env.DB_USER,
  senha: process.env.DB_PASSWORD,
  banco: process.env.DB_NAME,
  host: process.env.DB_HOST
});

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco:', err);
  } else {
    console.log('Conexão com o MySQL realizada com sucesso!');
  }
});

module.exports = db;
