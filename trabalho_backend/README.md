# Minha API - Projeto de API REST com ExpressJS e Mongoose

## 📖 Descrição
Este projeto implementa uma API REST para gerenciamento de tarefas, utilizando **ExpressJS** e **Mongoose** para manipulação do MongoDB.  
A API possui endpoints para criar, listar, atualizar e deletar tarefas, além de autenticação via JWT.  
O projeto também possui documentação interativa usando **Swagger**.

---

## ⚙️ Tecnologias e Dependências
- **Node.js** >= 18
- **Express.js**
- **Mongoose**
- **Cors**
- **dotenv**
- **jsonwebtoken**
- **swagger-ui-express**
- **yamljs**
- **nodemon** (para desenvolvimento)

---

## 🛠️ Configuração

1. Clone o repositório:
```bash
git clone https://github.com/FelipeMeDEv/trabalho_Backend.git
cd trabalho_Backend/trabalho_backend

2. Troque para a branch develop:
git checkout -b develop origin/develop

3. Instale as dependências:

npm install


4.Configure variáveis de ambiente criando um arquivo .env na raiz:

PORT=3000
MONGODB_URI=<sua_string_de_conexao_mongodb>
JWT_SECRET=<sua_chave_jwt>

