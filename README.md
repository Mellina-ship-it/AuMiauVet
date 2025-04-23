# AuMiau Vet 

Sistema de Agendamento de Banhos e Serviços para Pet Shop.

Este projeto foi desenvolvido como atividade individual da disciplina, com foco em práticas de autenticação, manipulação de arquivos, upload de imagem e integração entre front-end e back-end.

---

login de teste:
João da Silva

cpf: 12345678911
joao@aumiau.com 

senha: senha124

---

## Tecnologias Utilizadas

- *Back-end:* Node.js, Express, MySQL, Bcrypt, JWT, Multer
- *Front-end:* HTML, CSS e JavaScript puro
- *Banco de Dados:* MySQL Workbench


---

## Como rodar o projeto

### 1. Clonar o projeto
bash
git clone https://github.com/seuusuario/AuMiauVet.git
cd AuMiauVet


### 2. Instalar dependências do back-end
bash
cd backend
npm install


### 3. Configurar o arquivo .env
Crie um arquivo .env na raiz do backend com o seguinte conteúdo:


DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=petshop
PORT=3000
JWT_SECRET=seu_segredo_jwt


### 4. Importar o banco de dados
Abra o *MySQL Workbench*:

1. Crie um banco chamado petshop
2. Importe o arquivo banco_petshop.sql

---

### 5. Rodar o servidor
bash
npm run dev


O back-end estará disponível em: http://localhost:3000

---

## Funcionalidades Implementadas

- [x] Login com JWT
- [x] Cadastro de funcionários com senha criptografada
- [x] Middleware de proteção de rotas
- [x] CRUD de agendamentos
- [x] Upload de imagem com multer
- [x] Dashboard com cards dinâmicos
- [x] Editar e excluir agendamentos

---

## Observações
- O front-end acessa a API via localhost:3000
- Imagens dos pets são salvas localmente em /backend/uploads
- O sistema utiliza localStorage para armazenar o token JWT

---
