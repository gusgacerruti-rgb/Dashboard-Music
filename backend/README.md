# Music Dashboard Backend 🎸

Backend API REST para o Dashboard de Bandas Musicais, construído com Node.js, Express e MongoDB.

---

## 📖 O Que é Este Backend?

Este é o **servidor** que gerencia todos os dados do dashboard de bandas. Ele funciona como uma ponte entre o banco de dados MongoDB e o frontend React, fornecendo endpoints (URLs) que o frontend pode chamar para:

- **Buscar** informações sobre bandas
- **Criar** novos shows e bandas
- **Atualizar** dados existentes
- **Deletar** registros

Pense no backend como um **garçom** em um restaurante:
- O frontend (cliente) pede algo
- O backend (garçom) busca no banco de dados (cozinha)
- O backend retorna os dados (traz o pedido)

---

## 🚀 Instalação

```bash
# 1. Entrar na pasta do backend
cd backend

# 2. Instalar dependências
npm install

# 3. As variáveis de ambiente já estão configuradas no arquivo .env
```

---

## 📦 Tecnologias Utilizadas

| Tecnologia | Versão | Função |
|-----------|--------|---------|
| **Node.js** | 18+ | Runtime JavaScript no servidor |
| **Express** | 5.2.1 | Framework para criar rotas HTTP |
| **MongoDB** | - | Banco de dados NoSQL (armazena dados) |
| **Mongoose** | 9.0.0 | ODM - facilita comunicação com MongoDB |
| **CORS** | 2.8.5 | Permite frontend acessar backend |
| **Dotenv** | 17.2.3 | Gerencia variáveis de ambiente |
| **Nodemon** | 3.1.11 | Reinicia servidor automaticamente |

---

## 🏗️ Como Funciona a Arquitetura?

```
┌─────────────┐      HTTP Request       ┌──────────────┐
│             │ ──────────────────────> │              │
│  Frontend   │   GET /api/bands        │   Backend    │
│  (React)    │                         │  (Express)   │
│             │ <────────────────────── │              │
└─────────────┘      JSON Response      └──────────────┘
                                               │
                                               │ Mongoose
                                               ▼
                                        ┌──────────────┐
                                        │   MongoDB    │
                                        │  (Database)  │
                                        └──────────────┘
```

### Fluxo de Dados:

1. **Frontend** faz requisição: `GET http://localhost:5000/api/bands`
2. **Express** recebe e direciona para a rota correta (`bandRoutes.js`)
3. **Controller** (`bandController.js`) executa a lógica
4. **Model** (`Band.js`) busca dados no MongoDB via Mongoose
5. **MongoDB** retorna os dados
6. **Backend** envia resposta JSON para o frontend

---

## 🗄️ Estrutura do Banco de Dados

### 1️⃣ **Model: Band** (Bandas)

Armazena informações sobre cada banda:

```javascript
{
  _id: ObjectId("..."),
  name: "Sleep Token",           // Nome da banda
  genre: "Metal",                 // Gênero musical
  subgenre: "Progressive Metal",  // Subgênero
  totalSongs: 75,                 // Total de músicas
  popularity: 95,                 // Popularidade (0-100)
  listeners: 2500000,             // Número de ouvintes
  country: "UK",                  // País de origem
  formedYear: 2016,              // Ano de formação
  imageUrl: "https://...",       // URL da imagem (opcional)
  createdAt: "2025-12-04T...",   // Data de criação (auto)
  updatedAt: "2025-12-04T..."    // Data de atualização (auto)
}
```

### 2️⃣ **Model: Concert** (Shows)

Armazena informações sobre shows/eventos:

```javascript
{
  _id: ObjectId("..."),
  bandId: ObjectId("..."),        // Referência à banda
  title: "Sleep Token",           // Nome do show
  date: "2026-03-15",            // Data do show
  venue: "Madison Square Garden", // Local (opcional)
  city: "New York",              // Cidade (opcional)
  country: "USA",                // País (opcional)
  ticketPrice: 150,              // Preço do ingresso (opcional)
  status: "scheduled",           // scheduled | completed | cancelled
  createdAt: "2025-12-04T...",
  updatedAt: "2025-12-04T..."
}
```

### 3️⃣ **Model: Statistics** (Estatísticas)

Armazena estatísticas mensais:

```javascript
{
  _id: ObjectId("..."),
  bandId: ObjectId("..."),        // Referência à banda
  month: "January",               // Mês
  year: 2026,                    // Ano
  listeners: 980000,             // Ouvintes no mês
  plays: 5000000,                // Total de plays
  createdAt: "2025-12-04T...",
  updatedAt: "2025-12-04T..."
}
```

---

## 🗂️ Estrutura de Pastas (MVC Pattern)

```
backend/
├── src/
│   ├── config/
│   │   └── database.js         # Configuração de conexão com MongoDB
│   │
│   ├── models/                 # MODELS: Estrutura dos dados
│   │   ├── Band.js             # Schema de bandas
│   │   ├── Concert.js          # Schema de shows
│   │   └── Statistics.js       # Schema de estatísticas
│   │
│   ├── controllers/            # CONTROLLERS: Lógica de negócio
│   │   ├── bandController.js   # Funções CRUD de bandas
│   │   └── concertController.js # Funções CRUD de shows
│   │
│   ├── routes/                 # ROUTES: Definição de endpoints
│   │   ├── bandRoutes.js       # Rotas /api/bands
│   │   └── concertRoutes.js    # Rotas /api/concerts
│   │
│   ├── seeders/                # SEEDERS: Popular banco
│   │   └── seedDatabase.js     # Script para inserir dados iniciais
│   │
│   └── server.js               # Arquivo principal (inicia servidor)
│
├── .env                        # Variáveis de ambiente
├── .gitignore                  # Arquivos ignorados pelo Git
├── package.json                # Dependências e scripts
└── README.md                   # Você está aqui! 📍
```

### 📚 Explicando Cada Pasta:

#### **Models** (O quê armazenar)
Define a estrutura dos dados no banco. É como criar um "formulário" dizendo quais campos cada tipo de dado deve ter.

#### **Controllers** (O que fazer)
Contém a lógica: buscar, criar, atualizar, deletar. São as funções que realmente fazem o trabalho.

#### **Routes** (Onde acessar)
Define as URLs (endpoints) que o frontend pode chamar. Liga a URL à função correta do controller.

---

---

## 🛣️ Rotas da API (Endpoints)

### 📊 **Bandas** (`/api/bands`)

| Método | Endpoint | Descrição | Body Exemplo |
|--------|----------|-----------|--------------|
| **GET** | `/api/bands` | Lista todas as bandas | - |
| **GET** | `/api/bands/most-played` | Top 10 bandas mais tocadas | - |
| **GET** | `/api/bands/:id` | Busca banda específica por ID | - |
| **POST** | `/api/bands` | Cria nova banda | Ver abaixo ⬇️ |
| **PUT** | `/api/bands/:id` | Atualiza banda existente | Ver abaixo ⬇️ |
| **DELETE** | `/api/bands/:id` | Remove banda | - |

#### Exemplo POST/PUT - Criar/Atualizar Banda:
```json
{
  "name": "Metallica",
  "genre": "Metal",
  "subgenre": "Thrash Metal",
  "totalSongs": 120,
  "popularity": 98,
  "listeners": 20000000,
  "country": "USA",
  "formedYear": 1981
}
```

### 🎫 **Shows** (`/api/concerts`)

| Método | Endpoint | Descrição | Body Exemplo |
|--------|----------|-----------|--------------|
| **GET** | `/api/concerts` | Lista todos os shows | - |
| **GET** | `/api/concerts/calendar` | Shows formatados para FullCalendar | - |
| **POST** | `/api/concerts` | Cria novo show | Ver abaixo ⬇️ |
| **DELETE** | `/api/concerts/:id` | Remove show | - |

#### Exemplo POST - Criar Show:
```json
{
  "bandId": "674f8a1b2c3d4e5f6a7b8c9d",
  "title": "Sleep Token World Tour",
  "date": "2026-03-15",
  "venue": "Madison Square Garden",
  "city": "New York",
  "country": "USA",
  "ticketPrice": 150
}
```

---

## 🏃 Como Executar

### **1️⃣ Iniciar MongoDB** (certifique-se que está rodando)

```bash
# Linux/Mac
sudo systemctl start mongodb
# ou
mongod

# Windows
net start MongoDB
```

### **2️⃣ Popular o Banco de Dados** (primeira vez)

```bash
npm run seed
```

**O que isso faz:**
- Limpa dados antigos
- Insere 8 bandas (Sleep Token, Korn, Linkin Park, etc.)
- Insere 8 shows agendados para 2026

**Output esperado:**
```
🔄 Limpando banco de dados...
🌱 Inserindo bandas...
🌱 Inserindo shows...
✅ Banco de dados populado com sucesso!
📊 8 bandas inseridas
🎫 8 shows inseridos
```

### **3️⃣ Iniciar Servidor**

```bash
# Modo desenvolvimento (reinicia automaticamente ao salvar)
npm run dev

# Modo produção
npm start
```

**Output esperado:**
```
🚀 Server running on port 5000
📊 API available at http://localhost:5000
✅ MongoDB Connected Successfully
```

---

## 🧪 Testando a API

### **1. Pelo Navegador** (apenas GET)

Abra no navegador:
- http://localhost:5000 → Informações da API
- http://localhost:5000/api/bands → Ver todas as bandas
- http://localhost:5000/api/concerts → Ver todos os shows

### **2. Com cURL** (terminal)

```bash
# Listar todas as bandas
curl http://localhost:5000/api/bands

# Buscar banda específica (substitua o ID)
curl http://localhost:5000/api/bands/674f8a1b2c3d4e5f6a7b8c9d

# Criar nova banda
curl -X POST http://localhost:5000/api/bands \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Iron Maiden",
    "genre": "Metal",
    "totalSongs": 150,
    "popularity": 95
  }'

# Deletar banda
curl -X DELETE http://localhost:5000/api/bands/674f8a1b2c3d4e5f6a7b8c9d
```

### **3. Com Thunder Client / Postman / Insomnia**

Extensões do VS Code para testar APIs visualmente.

---

## 🔧 Variáveis de Ambiente (.env)

```bash
# Porta do servidor
PORT=5000

# URL de conexão do MongoDB
MONGODB_URI=mongodb://localhost:27017/music-dashboard

# Ambiente (development ou production)
NODE_ENV=development
```

---

## 📝 Como o Backend Funciona na Prática?

### **Exemplo: Buscar Todas as Bandas**

**1. Frontend faz requisição:**
```javascript
fetch('http://localhost:5000/api/bands')
```

**2. Express recebe e roteia:**
```javascript
// Em bandRoutes.js
router.get('/', bandController.getAllBands);
```

**3. Controller executa lógica:**
```javascript
// Em bandController.js
exports.getAllBands = async (req, res) => {
  const bands = await Band.find().sort({ popularity: -1 });
  res.json({ success: true, data: bands });
};
```

**4. Model busca no MongoDB:**
```javascript
// Band.js (Mongoose)
Band.find() // Busca todos os documentos da coleção "bands"
```

**5. Backend retorna JSON:**
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "_id": "674f...",
      "name": "Sleep Token",
      "genre": "Metal",
      "totalSongs": 75,
      "popularity": 95
    },
    // ... mais bandas
  ]
}
```

---

## 🔗 Integração com Frontend

Para conectar o frontend React com este backend:

### **1. No Frontend, criar arquivo de API:**

```javascript
// frontend/src/api/api.js
const API_URL = 'http://localhost:5000/api';

export const getAllBands = async () => {
  const response = await fetch(`${API_URL}/bands`);
  return response.json();
};

export const createConcert = async (concertData) => {
  const response = await fetch(`${API_URL}/concerts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(concertData)
  });
  return response.json();
};
```

### **2. Usar no Componente React:**

```javascript
import { getAllBands } from './api/api';
import { useState, useEffect } from 'react';

function BandsList() {
  const [bands, setBands] = useState([]);

  useEffect(() => {
    const fetchBands = async () => {
      const data = await getAllBands();
      setBands(data.data);
    };
    fetchBands();
  }, []);

  return (
    <ul>
      {bands.map(band => (
        <li key={band._id}>{band.name}</li>
      ))}
    </ul>
  );
}
```

---

## 🐛 Troubleshooting (Resolução de Problemas)

### ❌ Erro: "MongoDB connection error"

**Solução:**
```bash
# Verifique se o MongoDB está rodando
sudo systemctl status mongodb

# Ou instale o MongoDB
sudo apt-get install mongodb  # Linux
brew install mongodb-community  # Mac
```

### ❌ Erro: "Port 5000 already in use"

**Solução:**
```bash
# Matar processo na porta 5000
lsof -ti:5000 | xargs kill -9

# Ou mudar a porta no arquivo .env
PORT=5001
```

### ❌ Erro: "Cannot find module 'express'"

**Solução:**
```bash
npm install
```

---

## 📚 Scripts Disponíveis

```bash
npm start      # Inicia servidor em modo produção
npm run dev    # Inicia servidor em modo desenvolvimento (com nodemon)
npm run seed   # Popula banco de dados com dados iniciais
```

---

## 🎯 Próximos Passos (Melhorias Futuras)

- [ ] Adicionar autenticação JWT
- [ ] Implementar paginação nas listagens
- [ ] Criar endpoint de estatísticas agregadas
- [ ] Adicionar validação de dados com Joi
- [ ] Implementar upload de imagens
- [ ] Criar testes automatizados (Jest)
- [ ] Adicionar rate limiting
- [ ] Documentação com Swagger

---

## 👨‍💻 Autor

**Gus Gacerruti**

---

## 📄 Licença

MIT

---

**🎸 Happy Coding!**
