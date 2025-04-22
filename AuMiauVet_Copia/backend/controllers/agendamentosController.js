const db = require('../database');

const criarAgendamento = (req, res) => {
  const { nome_pet, raca, data_hora, observacoes, tipo } = req.body;
  const imagem = req.file ? req.file.filename : null;
  const funcionario_id = req.usuario.id;

  if (!nome_pet || !raca || !data_hora || !imagem || !observacoes || !tipo) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios, incluindo imagem e observações.' });
  }
  

  const sql = `
  INSERT INTO agendamentos
  (nome_pet, raca, data_hora, observacoes, tipo, imagem, funcionario_id)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`;

db.query(sql, [nome_pet, raca, data_hora, observacoes, tipo, imagem, funcionario_id], (err, result) => {
  if (err) {
    console.error('Erro ao salvar agendamento:', err);
    // IMPORTANTE: Não tente enviar outra resposta se esta falhar!
    try {
      if (!res.headersSent) { // Verifica se os headers já foram enviados
         return res.status(500).json({ erro: 'Erro ao salvar agendamento.' });
      } else {
         console.error("DB Error occurred, but headers already sent.");
      }
    } catch (sendError) {
        console.error("Error trying to send 500 response:", sendError);
    }
    return; // Encerra a execução aqui em caso de erro no DB
  }

  console.log('Dados salvos com sucesso. ID:', result.insertId); 

    try {
      if (!res.headersSent) {
          console.log(`Enviando resposta JSON 201 para agendamento ID ${result.insertId}`);
          res.status(201).json({ mensagem: 'Agendamento criado com sucesso!', id: result.insertId });
          console.log(`Resposta JSON 201 enviada para agendamento ID ${result.insertId}.`);
      } else {
          console.warn("DB Success, but headers already sent before trying to send 201 JSON.");
      }
  } catch (sendError) {
      console.error(`Erro síncrono ao tentar enviar resposta 201 JSON para agendamento ID ${result.insertId}:`, sendError);
  } finally {
      console.log(`Bloco finally da resposta para agendamento ID ${result.insertId} executado.`);
  }
});
};

const listarAgendamentos = (req, res) => {
  const sql = 'SELECT * FROM agendamentos';

  db.query(sql, (err, resultados) => {
    if (err) {
      console.error('Erro ao buscar agendamentos:', err);
      return res.status(500).json({ erro: 'Erro ao buscar agendamentos.' });
    }

    // monta URL completa da imagem
    const agendamentosComImagem = resultados.map((agendamento) => ({
      ...agendamento,
      imagem_url: `${req.protocol}://${req.get('host')}/uploads/${agendamento.imagem}`
    }));

    res.json(agendamentosComImagem);
  });
};

const deletarAgendamento = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM agendamentos WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar agendamento:', err);
      return res.status(500).json({ erro: 'Erro ao deletar agendamento.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Agendamento não encontrado.' });
    }

    res.json({ mensagem: 'Agendamento deletado com sucesso!' });
  });
};

const editarAgendamento = (req, res) => {
  const { id } = req.params;
  const { nome_pet, raca, data_hora, observacoes, tipo } = req.body;
  const novaImagem = req.file ? req.file.filename : null;

  // Monta SQL dinamicamente com ou sem imagem
  let sql = 'UPDATE agendamentos SET nome_pet = ?, raca = ?, data_hora = ?, observacoes = ?, tipo = ?';
  const params = [nome_pet, raca, data_hora, observacoes, tipo];

  if (novaImagem) {
    sql += ', imagem = ?';
    params.push(novaImagem);
    console.log(`Atualizando agendamento ${id} com nova imagem: ${novaImagem}`);
  } else {
    console.log(`Atualizando agendamento ${id} sem alterar imagem.`);
  }

  sql += ' WHERE id = ?';
  params.push(id);

  console.log('Executando SQL:', sql);
  console.log('Com parâmetros:', params);

  db.query(sql, params, (err, result) => {
    // --- Tratamento de Erro do Banco ---
    if (err) {
      console.error(`Erro ao editar agendamento ID ${id}:`, err);
      try {
        if (!res.headersSent) { // <--- VERIFICAÇÃO IMPORTANTE
          console.log(`Enviando resposta 500 para agendamento ID ${id}`);
          return res.status(500).json({ erro: 'Erro interno ao editar agendamento no banco de dados.' });
        } else {
          console.error(`Erro no DB ao editar agendamento ID ${id}, mas headers já foram enviados.`);
        }
      } catch (sendError) {
        console.error(`Erro ao tentar enviar resposta 500 para agendamento ID ${id}:`, sendError);
      }
      return; // Garante que não continua se houve erro no DB
    }

    console.log(`Resultado da query para agendamento ID ${id}:`, result);

    // --- Tratamento de Agendamento Não Encontrado ---
    if (result.affectedRows === 0) {
      console.warn(`Nenhum agendamento encontrado com ID ${id} para editar.`);
      try {
        if (!res.headersSent) { // <--- VERIFICAÇÃO IMPORTANTE
          console.log(`Enviando resposta 404 para agendamento ID ${id}`);
          return res.status(404).json({ erro: 'Agendamento não encontrado.' });
        } else {
          console.warn(`Agendamento ID ${id} não encontrado, mas headers já foram enviados.`);
        }
      } catch (sendError) {
        console.error(`Erro ao tentar enviar resposta 404 para agendamento ID ${id}:`, sendError);
      }
      return; // Garante que não continua se não encontrou
    }

    // --- Tratamento de Sucesso ---
    console.log(`Agendamento ID ${id} atualizado com sucesso (${result.affectedRows} linha(s) afetada(s)).`);
    try {
      if (!res.headersSent) { // <--- VERIFICAÇÃO IMPORTANTE
        console.log(`Enviando resposta 200 para agendamento ID ${id}`);
        res.status(200).json({ mensagem: 'Agendamento atualizado com sucesso!' });
        console.log(`Resposta 200 enviada para agendamento ID ${id}.`);
      } else {
        console.warn(`Agendamento ID ${id} atualizado com sucesso, mas headers já foram enviados antes da resposta 200.`);
      }
    } catch (sendError) {
      console.error(`Erro síncrono ao tentar enviar resposta 200 para agendamento ID ${id}:`, sendError);
    } finally {
        console.log(`Bloco finally da resposta para agendamento ID ${id} executado.`);
    }
  });
};

module.exports = {
  criarAgendamento,
  listarAgendamentos,
  deletarAgendamento,
  editarAgendamento
};