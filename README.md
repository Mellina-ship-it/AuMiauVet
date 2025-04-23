# <img src="https://cdn-icons-png.flaticon.com/512/616/616408.png" width="30"> AuMiau Vet 

O AumiauVet é um sistema web desenvolvido para uma clínica veterinária fictícia que oferece serviços como banhos, consultas e exames. O projeto inclui uma plataforma interativa para agendamentos, gestão de pets, além de um dashboard administrativo para facilitar a organização dos atendimento🐾

## 🎥 Demonstração em Vídeo

[![Assistir Vídeo Demonstrativo](https://img.shields.io/badge/▶_Assistir_Demonstração-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/L8hXTuz295o?feature=shared)

*Clique no botão acima para ver a demonstração do projeto*

---
<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white">
</div>

---

## 🔐 Login de Teste
**Usuário:** João da Silva  
📧 `joao@aumiau.com`  
🔑 `senha124`  
🆔 CPF: `123.456.789-11`

---

## 🛠 Tecnologias Utilizadas

### Back-end
<div>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white" height="25">
  <img src="https://img.shields.io/badge/Express.js-404D59?style=flat-square&logo=express" height="25">
  <img src="https://img.shields.io/badge/MySQL-00000F?style=flat-square&logo=mysql&logoColor=white" height="25">
  <img src="https://img.shields.io/badge/Bcrypt-35495E?style=flat-square" height="25">
  <img src="https://img.shields.io/badge/JWT-black?style=flat-square&logo=JSON%20web%20tokens" height="25">
  <img src="https://img.shields.io/badge/Multer-F46519?style=flat-square" height="25">
</div>

### Front-end
<div>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" height="25">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" height="25">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" height="25">
</div>

### Banco de Dados
<img src="https://img.shields.io/badge/MySQL_Workbench-4479A1?style=flat-square&logo=mysql&logoColor=white" height="25">

---
### 🚀 Como Rodar o Projeto

Para executar o projeto localmente, siga estas etapas:

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/seuusuario/AuMiauVet.git](https://github.com/seuusuario/AuMiauVet.git)
    cd AuMiauVet
    ```

2.  **Instale as dependências do back-end:**

    ```bash
    cd backend
    npm install
    ```

3.  **Configure as variáveis de ambiente:**

    Crie um arquivo `.env` na pasta `backend` e adicione as seguintes variáveis com suas respectivas configurações:

    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=sua_senha
    DB_NAME=petshop
    PORT=3000
    JWT_SECRET=seu_segredo_jwt
    ```

4.  **Configure o banco de dados:**

    * Abra o seu MySQL Workbench.
    * Crie um novo banco de dados com o nome `petshop`.
    * Importe o conteúdo do arquivo `banco_petshop.sql` para este banco de dados. *(Certifique-se de que este arquivo esteja disponível no seu projeto ou forneça o caminho correto)*.

5.  **Inicie o servidor:**

    ```bash
    cd backend
    npm run dev
    ```

    A API do back-end estará rodando e acessível em `http://localhost:3000`.

---

## ✅ Funcionalidades Implementadas

- ✔️ **Login com JWT** (Autenticação segura)
- ✔️ **Cadastro de funcionários** (com senha criptografada)
- ✔️ **Middleware de proteção de rotas**
- ✔️ **CRUD de agendamentos**
- ✔️ **Upload de imagem** (utilizando Multer)
- ✔️ **Dashboard dinâmico** com cards de resumo
- ✔️ **Edição e exclusão de agendamentos**

---

## 📌 Observações

- 🔹 O **front-end** consome a API através de: `http://localhost:3000`
- 🔹 As **imagens dos pets** são salvas na pasta: `/backend/uploads`
- 🔹 O sistema utiliza **localStorage** para armazenar o **token JWT**

