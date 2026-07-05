// ----------------------------
// LOGIN
// ----------------------------
async function fazerLogin(email, senha) {
    const resposta = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    return await resposta.json();
  }
  
  // ----------------------------
  // CADASTRAR FUNCIONÁRIO
  // ----------------------------
  async function cadastrarFuncionario(nome, cpf, email, senha) {
    const resposta = await fetch('http://localhost:3000/api/funcionarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, cpf, email, senha })
    });
    return await resposta.json();
  }
  
  // ----------------------------
  // CRIAR AGENDAMENTO (com imagem)
  // ----------------------------
  async function criarAgendamento(dadosFormData) {
    const token = localStorage.getItem('token');
    const resposta = await fetch('http://localhost:3000/api/agendamentos', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: dadosFormData // já precisa estar em FormData!
    });
    return await resposta.json();
  }
  
  // ----------------------------
  // LISTAR AGENDAMENTOS
  // ----------------------------
  async function listarAgendamentos() {
    const token = localStorage.getItem('token');
    const resposta = await fetch('http://localhost:3000/api/agendamentos', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return await resposta.json();
  }
  
  // ----------------------------
  // EDITAR AGENDAMENTO
  // ----------------------------
  async function editarAgendamento(id, dadosFormData) {
    const token = localStorage.getItem('token');
    const resposta = await fetch(`http://localhost:3000/api/agendamentos/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: dadosFormData
    });
    return await resposta.json();
  }
  
  // ----------------------------
  // DELETAR AGENDAMENTO
  // ----------------------------
  async function deletarAgendamento(id) {
    const token = localStorage.getItem('token');
    const resposta = await fetch(`http://localhost:3000/api/agendamentos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return await resposta.json();
  }
  