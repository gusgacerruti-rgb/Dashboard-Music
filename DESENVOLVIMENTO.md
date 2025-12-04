# 📋 Registro de Desenvolvimento - Music Dashboard

**Data:** 04 de Dezembro de 2025  
**Projeto:** Dashboard de Bandas Musicais  
**Desenvolvedor:** Gus Gacerruti

---

## 🎯 Resumo do Dia

Hoje criamos um projeto full-stack completo integrando **React** (frontend) com **Node.js/Express/MongoDB** (backend). O dashboard agora possui um backend funcional que gerencia dados de bandas e shows através de uma API REST.

---

## ✅ Mudanças Implementadas Hoje

### 🗄️ **BACKEND - Criação Completa**

#### 1. **Estrutura de Pastas**
```
backend/
├── src/
│   ├── config/
│   │   └── database.js          ✅ CRIADO
│   ├── models/
│   │   ├── Band.js              ✅ CRIADO
│   │   ├── Concert.js           ✅ CRIADO
│   │   └── Statistics.js        ✅ CRIADO
│   ├── controllers/
│   │   ├── bandController.js    ✅ CRIADO
│   │   └── concertController.js ✅ CRIADO
│   ├── routes/
│   │   ├── bandRoutes.js        ✅ CRIADO
│   │   └── concertRoutes.js     ✅ CRIADO
│   ├── seeders/
│   │   └── seedDatabase.js      ✅ CRIADO
│   └── server.js                ✅ CRIADO
├── .env                         ✅ CRIADO
├── .gitignore                   ✅ CRIADO
├── package.json                 ✅ MODIFICADO
└── README.md                    ✅ CRIADO
```

#### 2. **Configuração do Banco de Dados**
- **Arquivo:** `backend/src/config/database.js`
- **Tecnologia:** MongoDB com Mongoose
- **Funcionalidade:** Conexão automática com MongoDB local
- **Correção aplicada:** Removidas opções deprecated (`useNewUrlParser`, `useUnifiedTopology`)

#### 3. **Models Criados**

**a) Band Model (`Band.js`)**
- Campos: name, genre, subgenre, totalSongs, popularity, listeners, country, formedYear, imageUrl
- Validações: name único, genre obrigatório
- Timestamps automáticos

**b) Concert Model (`Concert.js`)**
- Campos: bandId (referência), title, date, venue, city, country, ticketPrice, status
- Relacionamento: Cada show pertence a uma banda
- Status: scheduled, completed, cancelled

**c) Statistics Model (`Statistics.js`)**
- Campos: bandId, month, year, listeners, plays
- Funcionalidade: Armazenar estatísticas mensais

#### 4. **Controllers Implementados**

**a) bandController.js**
- `getAllBands()` - Listar todas as bandas ordenadas por popularidade
- `getBandById(id)` - Buscar banda específica
- `createBand(data)` - Criar nova banda
- `updateBand(id, data)` - Atualizar banda existente
- `deleteBand(id)` - Remover banda
- `getMostPlayedBands()` - Top 10 bandas por total de músicas

**b) concertController.js**
- `getAllConcerts()` - Listar todos os shows com dados da banda
- `createConcert(data)` - Criar novo show (valida existência da banda)
- `deleteConcert(id)` - Remover show
- `getConcertsForCalendar()` - Retorna shows formatados para FullCalendar

#### 5. **Rotas da API**

**Bandas (`/api/bands`)**
```
GET    /api/bands              → Listar todas
GET    /api/bands/most-played  → Top 10 mais tocadas
GET    /api/bands/:id          → Buscar por ID
POST   /api/bands              → Criar nova
PUT    /api/bands/:id          → Atualizar
DELETE /api/bands/:id          → Deletar
```

**Shows (`/api/concerts`)**
```
GET    /api/concerts           → Listar todos
GET    /api/concerts/calendar  → Formato calendário
POST   /api/concerts           → Criar novo
DELETE /api/concerts/:id       → Deletar
```

#### 6. **Servidor Express**
- **Arquivo:** `server.js`
- **Porta:** 5000
- **Middlewares:** CORS, express.json, express.urlencoded
- **Status:** ✅ Rodando e conectado ao MongoDB

#### 7. **Seeder Database**
- **Arquivo:** `seedDatabase.js`
- **Dados inseridos:**
  - 8 bandas (Sleep Token, Korn, Linkin Park, Avenged Sevenfold, etc.)
  - 8 shows agendados para 2026
- **Comando:** `npm run seed`
- **Status:** ✅ Executado com sucesso

#### 8. **Configurações**
- **package.json:**
  - Scripts: `start`, `dev`, `seed`
  - Dependências: express, mongoose, cors, dotenv
  - DevDependencies: nodemon

- **.env:**
  ```
  PORT=5000
  MONGODB_URI=mongodb://localhost:27017/music-dashboard
  NODE_ENV=development
  ```

#### 9. **Instalações Realizadas**
- ✅ MongoDB Community Edition instalado no Linux Mint
- ✅ MongoDB iniciado e configurado
- ✅ Dependências npm instaladas

---

### 🎨 **FRONTEND - Integrações**

#### 1. **Arquivo de Serviços API**
- **Arquivo CRIADO:** `frontend/src/services/api.js`
- **Funções implementadas:**
  - `getAllBands()` - Buscar todas as bandas
  - `getMostPlayedBands()` - Top 10 bandas
  - `getBandById(id)` - Buscar banda específica
  - `createBand(data)` - Criar nova banda
  - `getAllConcerts()` - Buscar todos os shows
  - `getConcertsForCalendar()` - Shows para calendário
  - `createConcert(data)` - Criar novo show
  - `deleteConcert(id)` - Deletar show

#### 2. **Calendário Integrado**
- **Arquivo MODIFICADO:** `frontend/src/scenes/calendar/calendar.jsx`
- **Mudanças:**
  - Importado `useEffect` e funções da API
  - `useEffect` para buscar shows do backend ao carregar
  - `handleDateClick` modificado para:
    - Buscar bandas disponíveis
    - Validar se banda existe
    - Criar show no backend via POST
    - Mostrar alertas de sucesso/erro
  - `handleEventClick` modificado para:
    - Deletar show do backend via DELETE
    - Remover do calendário local
  - Removidos eventos hardcoded
  - Shows agora vêm do estado `initialEvents` (populado pela API)

#### 3. **Gráfico de Bandas Integrado**
- **Arquivo MODIFICADO:** `frontend/src/components/MostPlayedBands.jsx`
- **Mudanças:**
  - Importado `useState`, `useEffect` e `getMostPlayedBands`
  - Estado `data` criado para armazenar bandas
  - `useEffect` busca dados do backend
  - Dados transformados para formato do Nivo:
    ```javascript
    {
      band: "Sleep Token",
      songs: 75,
      songsColor: "hsl(229, 70%, 50%)"
    }
    ```
  - Removida dependência de `mockData.js`

#### 4. **Correções de Bugs**
- ✅ Removida duplicação de variáveis em `calendar.jsx`
- ✅ Corrigido erro de sintaxe no arquivo API

---

## 🧪 Testes Realizados

### Backend
- ✅ MongoDB conectado com sucesso
- ✅ Seed executado: 8 bandas + 8 shows inseridos
- ✅ Servidor rodando na porta 5000
- ✅ Endpoints testados via cURL:
  - `GET /api/bands` → 8 bandas retornadas
  - `GET /api/concerts` → 8 shows retornados
  - `GET /api/concerts/calendar` → Shows formatados

### Frontend
- ✅ Compilação sem erros
- ✅ Servidor rodando na porta 3000
- ✅ Calendário carregando shows do backend
- ✅ Gráfico carregando dados reais

---

## 📊 Dados Atualmente no Banco

### Bandas (8 total)
1. Sleep Token - 75 músicas, popularidade 95
2. Linkin Park - 28 músicas, popularidade 92
3. Avenged Sevenfold - 36 músicas, popularidade 90
4. My Chemical Romance - 19 músicas, popularidade 89
5. Korn - 36 músicas, popularidade 88
6. Bring Me The Horizon - 24 músicas, popularidade 87
7. Imagine Dragons - 27 músicas, popularidade 85
8. Bullet For My Valentine - 16 músicas, popularidade 84

### Shows (8 total)
1. Bullet For My Valentine - 18/02/2026
2. Sleep Token - 15/03/2026
3. Korn - 08/05/2026
4. Avenged Sevenfold - 22/06/2026
5. Linkin Park - 30/07/2026
6. Imagine Dragons - 12/09/2026
7. Bring Me The Horizon - 14/10/2026
8. My Chemical Romance - 05/11/2026

---

## 🐛 Problemas Encontrados e Soluções

### Problema 1: MongoDB não instalava
- **Erro:** `Package 'mongodb' has no installation candidate`
- **Causa:** MongoDB não está nos repositórios padrão do Linux Mint
- **Solução:** Instalado via repositório oficial do MongoDB

### Problema 2: Opções deprecated do Mongoose
- **Erro:** `options usenewurlparser, useunifiedtopology are not supported`
- **Causa:** Mongoose 9.0 não aceita mais essas opções
- **Solução:** Removidas as opções do `mongoose.connect()`

### Problema 3: Variáveis duplicadas
- **Erro:** `Identifier 'theme' has already been declared`
- **Causa:** Código duplicado acidentalmente em `calendar.jsx`
- **Solução:** Removidas linhas duplicadas

---

## 🚀 PLANEJAMENTO PARA AMANHÃ

### **Objetivo:** Completar a Integração Frontend ↔ Backend

---

### 📋 **TAREFAS PRIORITÁRIAS**

#### 1. **Dashboard Principal - Dados Reais** ⭐⭐⭐
**Arquivo:** `frontend/src/scenes/dashboard/index.jsx`

**Tarefas:**
- [ ] Buscar estatísticas do backend (total de bandas, shows, etc.)
- [ ] Criar endpoint no backend: `GET /api/stats/overview`
  - Retornar: total de bandas, total de shows, próximo show, banda mais popular
- [ ] Substituir dados mockados por dados reais nos cards do dashboard
- [ ] Adicionar indicadores de carregamento (Loading spinner)
- [ ] Adicionar tratamento de erros

**Código estimado:**
```javascript
// Backend: statsController.js
exports.getOverview = async (req, res) => {
  const totalBands = await Band.countDocuments();
  const totalConcerts = await Concert.countDocuments();
  const nextConcert = await Concert.findOne({ date: { $gte: new Date() } })
    .sort({ date: 1 })
    .populate('bandId');
  const topBand = await Band.findOne().sort({ popularity: -1 });
  
  res.json({
    success: true,
    data: { totalBands, totalConcerts, nextConcert, topBand }
  });
};
```

---

#### 2. **Gráfico de Linha (Top Artists) - Dados Reais** ⭐⭐⭐
**Arquivo:** `frontend/src/components/TopArtists.jsx`

**Tarefas:**
- [ ] Criar Statistics seeder para popular dados mensais
- [ ] Criar endpoint: `GET /api/stats/timeline`
  - Retornar estatísticas mensais das top 5 bandas
- [ ] Modificar `TopArtists.jsx` para usar dados reais
- [ ] Implementar filtro por período (2024, 2025, 2026)

**Estrutura de dados:**
```javascript
// Retorno da API
{
  success: true,
  data: [
    {
      id: "Sleep Token",
      data: [
        { x: "Jan", y: 980000 },
        { x: "Feb", y: 950000 },
        // ...
      ]
    }
  ]
}
```

---

#### 3. **Mapa de Popularidade - Dados Reais** ⭐⭐
**Arquivo:** `frontend/src/components/Popularity.jsx`

**Tarefas:**
- [ ] Adicionar campo `popularCountries` no Band model:
  ```javascript
  popularCountries: [{
    countryCode: String,
    listeners: Number
  }]
  ```
- [ ] Criar endpoint: `GET /api/stats/geography`
- [ ] Modificar `Popularity.jsx` para usar dados do backend
- [ ] Atualizar seeder com dados de países

---

#### 4. **Página de Bandas (Team) - CRUD Completo** ⭐⭐⭐
**Arquivo:** `frontend/src/scenes/team/index.jsx`

**Tarefas:**
- [ ] Buscar bandas do backend ao carregar página
- [ ] Implementar botão "Adicionar Banda"
- [ ] Criar modal/formulário para adicionar banda
- [ ] Implementar botão de editar banda
- [ ] Implementar botão de deletar banda
- [ ] Adicionar confirmação antes de deletar
- [ ] Atualizar lista após cada operação

**Funcionalidades:**
```javascript
// Adicionar banda
const handleAddBand = async (bandData) => {
  await createBand(bandData);
  // Atualizar lista
};

// Deletar banda
const handleDeleteBand = async (id) => {
  if (confirm("Deletar banda?")) {
    await deleteBand(id);
    // Atualizar lista
  }
};
```

---

#### 5. **Gráfico de Subgêneros (Pie Chart) - Dados Reais** ⭐⭐
**Arquivo:** `frontend/src/components/Subgenres.jsx`

**Tarefas:**
- [ ] Criar endpoint: `GET /api/stats/genres`
  - Agrupar bandas por gênero/subgênero
  - Retornar contagem de cada
- [ ] Modificar componente para usar dados reais
- [ ] Adicionar cores dinâmicas

**Query no backend:**
```javascript
const genres = await Band.aggregate([
  {
    $group: {
      _id: "$genre",
      count: { $sum: 1 },
      subgenres: { $push: "$subgenre" }
    }
  }
]);
```

---

#### 6. **Sistema de Notificações/Feedback** ⭐
**Componente novo:** `frontend/src/components/Notification.jsx`

**Tarefas:**
- [ ] Criar componente de notificação (toast/snackbar)
- [ ] Integrar com Material-UI Snackbar
- [ ] Mostrar feedback em todas as operações:
  - ✅ Banda criada com sucesso
  - ✅ Show deletado
  - ❌ Erro ao conectar com servidor
- [ ] Adicionar em todos os componentes que fazem requisições

---

#### 7. **Loading States e Error Handling** ⭐⭐
**Todos os componentes com fetch**

**Tarefas:**
- [ ] Criar componente `Loading.jsx` (spinner reutilizável)
- [ ] Adicionar estado de loading em todos os componentes
- [ ] Adicionar tratamento de erro em todos os componentes
- [ ] Mostrar mensagem amigável quando backend estiver offline
- [ ] Adicionar retry automático em caso de falha

**Exemplo:**
```javascript
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getAllBands();
      setData(response.data);
      setError(null);
    } catch (err) {
      setError("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);

if (loading) return <Loading />;
if (error) return <Error message={error} />;
```

---

#### 8. **Página de Shows (Invoices) - Lista Completa** ⭐⭐
**Arquivo:** `frontend/src/scenes/invoices/index.jsx`

**Tarefas:**
- [ ] Transformar em lista de shows ao invés de "invoices"
- [ ] Buscar shows do backend
- [ ] Mostrar: Nome da banda, Data, Local, Status
- [ ] Adicionar filtros (shows futuros/passados)
- [ ] Implementar busca por banda
- [ ] Adicionar botão de criar show

---

#### 9. **Melhorias no Backend** ⭐⭐

**a) Validações**
- [ ] Adicionar validação com Joi ou Yup
- [ ] Validar dados antes de salvar no banco
- [ ] Retornar mensagens de erro descritivas

**b) Endpoints Adicionais**
- [ ] `GET /api/stats/overview` - Estatísticas gerais
- [ ] `GET /api/stats/timeline` - Dados temporais
- [ ] `GET /api/stats/geography` - Dados geográficos
- [ ] `GET /api/stats/genres` - Distribuição de gêneros
- [ ] `PUT /api/concerts/:id` - Atualizar show
- [ ] `PATCH /api/concerts/:id/status` - Mudar status do show

**c) Melhorias de Performance**
- [ ] Adicionar índices no MongoDB (name, popularity, date)
- [ ] Implementar paginação em listagens
- [ ] Cache de queries frequentes

---

#### 10. **Documentação e Testes** ⭐

**Tarefas:**
- [ ] Criar arquivo `INTEGRATION.md` documentando integrações
- [ ] Testar todos os endpoints com Postman/Thunder Client
- [ ] Criar collection do Postman para compartilhar
- [ ] Documentar formato de requisições/respostas
- [ ] Testar edge cases (banda inexistente, data inválida, etc.)

---

### 📅 **CRONOGRAMA SUGERIDO**

#### **Manhã (3-4 horas)**
1. Dashboard Principal com dados reais (1h)
2. CRUD completo de Bandas na página Team (1.5h)
3. Loading states e error handling global (1h)

#### **Tarde (3-4 horas)**
4. Gráfico de linha com dados reais (1h)
5. Sistema de notificações (0.5h)
6. Endpoints de estatísticas no backend (1h)
7. Página de Shows (1h)

#### **Noite (2 horas - opcional)**
8. Mapa de popularidade (1h)
9. Gráfico de subgêneros (0.5h)
10. Testes e documentação (0.5h)

---

### 🎯 **OBJETIVOS DE CONCLUSÃO**

Ao final de amanhã, o projeto deve ter:

✅ **Frontend 100% integrado com backend**
✅ **CRUD completo funcionando (Create, Read, Update, Delete)**
✅ **Todos os gráficos usando dados reais**
✅ **Sistema de feedback para o usuário**
✅ **Tratamento de erros em todas as páginas**
✅ **Loading states em todas as requisições**
✅ **Dashboard totalmente funcional e responsivo**

---

### 🔧 **COMANDOS ÚTEIS PARA AMANHÃ**

```bash
# Iniciar MongoDB
sudo systemctl start mongodb

# Backend
cd backend
npm run dev

# Frontend (outro terminal)
cd frontend
npm start

# Repopular banco (se necessário)
cd backend
npm run seed

# Ver logs do MongoDB
sudo tail -f /var/log/mongodb/mongod.log

# Testar endpoints
curl http://localhost:5000/api/bands
curl http://localhost:5000/api/concerts
```

---

### 📝 **NOTAS IMPORTANTES**

1. **Sempre testar no backend primeiro** antes de integrar no frontend
2. **Commitar código frequentemente** após cada feature funcionar
3. **Documentar mudanças** conforme são feitas
4. **Testar em diferentes cenários** (sucesso, erro, dados vazios)
5. **Manter console do navegador aberto** para debugar erros

---

### 🚨 **POSSÍVEIS DESAFIOS**

1. **CORS:** Se aparecer erro de CORS, verificar se backend está com `cors()` habilitado
2. **Estados assíncronos:** Cuidado com race conditions ao atualizar dados
3. **Formatação de datas:** Garantir que datas estão no formato correto (ISO 8601)
4. **Performance:** Monitorar tempo de resposta das queries no MongoDB
5. **Cache do navegador:** Limpar cache se mudanças não aparecerem

---

## 📚 **RECURSOS PARA CONSULTA**

- **Mongoose Docs:** https://mongoosejs.com/docs/
- **Express Docs:** https://expressjs.com/
- **React Query (para cache):** https://tanstack.com/query/latest
- **Material-UI:** https://mui.com/
- **Nivo Charts:** https://nivo.rocks/

---

## 🎉 **CONQUISTAS DE HOJE**

✅ Backend completo criado do zero  
✅ MongoDB instalado e configurado  
✅ 8 bandas e 8 shows no banco de dados  
✅ API REST funcionando com 10 endpoints  
✅ Calendário 100% integrado (criar/deletar shows)  
✅ Gráfico de bandas usando dados reais  
✅ Arquitetura MVC implementada  
✅ Documentação completa no README  

---

**Status do Projeto:** 🟢 Backend funcional | 🟡 Frontend parcialmente integrado

**Próxima sessão:** Completar integração de todos os componentes do frontend com backend.

---

*Última atualização: 04/12/2025 - 22:00*
