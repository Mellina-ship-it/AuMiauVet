const express = require('express');
const router = express.Router();
const { cadastrarFuncionario } = require('../controllers/funcionariosController');

router.post('/funcionarios', cadastrarFuncionario);

module.exports = router;
