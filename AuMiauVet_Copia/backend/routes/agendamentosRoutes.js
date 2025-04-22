const express = require('express');
const router = express.Router();
const { criarAgendamento, listarAgendamentos, deletarAgendamento, editarAgendamento } = require('../controllers/agendamentosController');
const autenticarToken = require('../middlewares/authMiddleware');
const upload = require('../config/multer');

router.post('/agendamentos', autenticarToken, upload.single('imagem'), criarAgendamento);
router.get('/agendamentos', autenticarToken, listarAgendamentos);
router.delete('/agendamentos/:id', autenticarToken, deletarAgendamento);
router.put('/agendamentos/:id', autenticarToken, upload.single('imagem'), editarAgendamento);



module.exports = router;
