const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./database');

const app = express();

process.on('uncaughtException', (error) => {
  console.error('!!! Uncaught Exception:', error);
  // É recomendado encerrar o processo após uma exceção não capturada
  // process.exit(1); // Descomente se quiser que o servidor pare nesses casos
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('!!! Unhandled Rejection at:', promise, 'reason:', reason);
  // process.exit(1); // Opcional: parar o servidor
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('backend/uploads')); // servir imagens dos pets

const funcionariosRoutes = require('./routes/funcionariosRoutes');
app.use('/api', funcionariosRoutes);

const loginRoutes = require('./routes/loginRoutes');
app.use('/api', loginRoutes);

const agendamentosRoutes = require('./routes/agendamentosRoutes');
app.use('/api', agendamentosRoutes);


// Teste de rota inicial
app.get('/', (req, res) => {
  res.send('API AuMiau Vet está no ar!');
});

const autenticarToken = require('./middlewares/authMiddleware');

app.get('/api/teste-protegido', autenticarToken, (req, res) => {
  res.json({
    mensagem: 'Você acessou uma rota protegida!',
    usuario: req.usuario
  });
});

// Middleware de tratamento de erros global (DEVE SER O ÚLTIMO app.use ANTES do listen)
app.use((err, req, res, next) => {
  console.error("!!! ERRO GLOBAL CAPTURADO PELO HANDLER:", err); // Log detalhado

  // Verifica se o erro veio do Multer
  if (err instanceof multer.MulterError) {
    console.error("Erro específico do Multer:", err.code, err.message);
    // Não envie outra resposta se já foi enviada
    if (!res.headersSent) {
       return res.status(400).json({ erro: `Erro no upload: ${err.message}` });
    } else {
       console.error("Erro Multer, mas headers já enviados.");
       return;
    }
  }

  // Verifica outros erros que podem ter sido passados
  if (err) {
    console.error("Outro erro capturado:", err.message, err.stack);
     // Não envie outra resposta se já foi enviada
     if (!res.headersSent) {
        // Cuidado para não vazar detalhes do erro em produção
        return res.status(500).json({ erro: 'Erro interno no servidor.' });
     } else {
        console.error("Erro genérico, mas headers já enviados.");
        return;
     }
  }

  // Se chegou aqui sem erro, mas não houve resposta ainda (improvável, mas seguro)
  if (!res.headersSent) {
     next(); // Deixa o Express lidar com isso (provavelmente um 404 Not Found)
  }
});

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
