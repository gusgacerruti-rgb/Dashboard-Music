# Resumo das Mudanças - Dashboard Music

## Data: 05/12/2025

### 🎯 Objetivo Principal
Criar um backend completo para o dashboard de música e integrar com o frontend React existente.

---

## 📦 Backend Criado (Node.js + Express + MongoDB)

### Estrutura de Arquivos Criados:
```
backend/
├── package.json (Express 5.2.1, Mongoose 9.0.0)
├── .env (configuração MongoDB)
├── src/
    ├── server.js (servidor principal na porta 5000)
    ├── config/
    │   └── database.js (conexão MongoDB)
    ├── models/
    │   ├── Band.js (esquema de bandas)
    │   ├── Concert.js (esquema de shows)
    │   └── Statistics.js (esquema de estatísticas)
    ├── controllers/
    │   ├── bandController.js (CRUD de bandas)
    │   └── concertController.js (CRUD de shows)
    ├── routes/
    │   ├── bandRoutes.js (rotas /api/bands)
    │   └── concertRoutes.js (rotas /api/concerts)
    └── seeders/
        └── seedDatabase.js (população inicial do banco)
```

### Endpoints da API:

#### Bandas:
- `GET /api/bands` - Listar todas as bandas
- `GET /api/bands/most-played` - Bandas mais tocadas
- `GET /api/bands/:id` - Buscar banda por ID
- `POST /api/bands` - Criar nova banda
- `PUT /api/bands/:id` - Atualizar banda
- `DELETE /api/bands/:id` - Deletar banda

#### Shows/Concerts:
- `GET /api/concerts` - Listar todos os shows
- `GET /api/concerts/calendar` - Shows formatados para calendário
- `POST /api/concerts` - Criar novo show
- `DELETE /api/concerts/:id` - Deletar show

---

## 🎨 Frontend - Integrações com Backend

### Arquivos Criados/Modificados:

#### 1. **frontend/src/services/api.js** (NOVO)
- Camada de comunicação com a API
- Funções: `getAllBands()`, `getMostPlayedBands()`, `createBand()`, `getAllConcerts()`, `getConcertsForCalendar()`, `createConcert()`, `deleteConcert()`

#### 2. **frontend/src/services/index.js** (NOVO)
- Re-exporta funções do api.js

#### 3. **frontend/src/components/AddBandForm.jsx** (NOVO)
- Formulário para adicionar bandas sem resetar o banco
- Campos: nome, gênero, subgênero, total de músicas, popularidade, ouvintes, país, ano de formação
- Validação de campos obrigatórios

#### 4. **frontend/src/scenes/calendar/calendar.jsx** (MODIFICADO)
- ✅ Integrado com backend via `getConcertsForCalendar()`
- ✅ Criar shows: valida se banda existe antes de criar
- ✅ Deletar shows: remove do banco de dados
- ❌ Removido código duplicado (declarações de variáveis)

#### 5. **frontend/src/components/MostPlayedBands.jsx** (MODIFICADO)
- ✅ Busca dados reais do endpoint `/api/bands/most-played`
- ✅ Transforma dados para formato Nivo Charts

#### 6. **frontend/src/scenes/form/index.jsx** (MODIFICADO)
- ✅ Usa componente `AddBandForm` para adicionar bandas

---

## 🗄️ Banco de Dados

### MongoDB 7.0 Instalado e Configurado
- Instalação via repositório oficial (Linux Mint/Ubuntu)
- Rodando em: `mongodb://localhost:27017`
- Database: `music-dashboard`

### Dados Iniciais (Seeded):
**8 Bandas:**
1. Sleep Token (Progressive Metal)
2. Linkin Park (Nu Metal)
3. Korn (Nu Metal)
4. System of a Down (Alternative Metal)
5. Slipknot (Nu Metal)
6. Bring Me The Horizon (Metalcore)
7. Architects (Metalcore)
8. Spiritbox (Progressive Metalcore)

**8 Shows/Concerts:**
- Datas variadas em 2024
- Locais diversos (Brasil, EUA, UK)

---

## 🛠️ Problemas Resolvidos

### 1. Instalação MongoDB
- **Problema:** Pacote não disponível nos repos padrão do Linux Mint
- **Solução:** Adicionado repositório oficial MongoDB com chave GPG

### 2. Opções Deprecated do Mongoose
- **Problema:** `useNewUrlParser` e `useUnifiedTopology` não suportados no Mongoose 9.0
- **Solução:** Removidas essas opções da conexão

### 3. Conflito de Portas
- **Problema:** Frontend tentando usar porta 5000 (mesma do backend)
- **Solução:** Removido `PORT=5000` do script start em `frontend/package.json`

### 4. Código Duplicado no Calendar
- **Problema:** Variáveis `theme` e `colors` declaradas duas vezes
- **Solução:** Removidas declarações duplicadas

### 5. Performance - TypeScript Servers
- **Problema:** 2 processos TypeScript consumindo 105% CPU cada
- **Solução:** Criado `.vscode/settings.json` com:
  - Limite de memória: 2048MB
  - Exclusão de `node_modules` do watcher
  - Desabilitado indexação de arquivos grandes

### 6. Cache do Webpack
- **Problema:** Módulo `../../services/api` não sendo encontrado
- **Soluções Tentadas:**
  - Limpeza de cache: `rm -rf node_modules/.cache build`
  - Recriação da pasta `services/`
  - Criação de `index.js` para re-exports
  - Alteração do import para `../services/api.js` (com extensão)

---

## ⚙️ Configuração VS Code

### .vscode/settings.json (CRIADO)
```json
{
  "typescript.tsserver.maxTsServerMemory": 2048,
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/build/**": true,
    "**/.git/objects/**": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/build": true
  }
}
```

---

## 📊 Estado Atual

### ✅ Funcionando:
- Backend rodando na porta 5000
- MongoDB conectado e populado
- API REST respondendo corretamente
- Calendar integrado (busca, cria e deleta shows)
- Bar Chart buscando dados reais do backend

### ⚠️ Em Resolução:
- **Erro de módulo:** `Cannot find module '../../services/api'`
  - Arquivo existe no caminho correto
  - Import modificado para `../services/api.js`
  - Cache limpo múltiplas vezes
  - Aguardando reinício completo do servidor frontend

### 🎯 Próximos Passos:
1. Resolver erro de importação do módulo api.js
2. Testar AddBandForm completo
3. Integrar componentes restantes (TopArtists, Popularity)
4. Criar CRUD completo no frontend para bandas
5. Adicionar autenticação (opcional)

---

## 🚀 Como Executar

### Backend:
```bash
cd backend
npm install
npm start  # Roda na porta 5000
```

### Frontend:
```bash
cd frontend
npm install
npm start  # Roda na porta 3000
```

### Popular Banco (primeira vez):
```bash
cd backend
node src/seeders/seedDatabase.js
```

---

## 📝 Notas Técnicas

- **Aviso Mongoose:** Campo `listeners` é reservado mas funcional (pode ser renomeado para `listenerCount` se necessário)
- **CORS:** Habilitado no backend para aceitar requisições do frontend
- **Hot Module Replacement:** Ativo no frontend para desenvolvimento
- **Nodemon:** Backend reinicia automaticamente ao modificar arquivos
