const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Importar rotas
const bandRoutes = require('./routes/bandRoutes');
const concertRoutes = require('./routes/concertRoutes');

// Configurações
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Conectar ao banco de dados
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/bands', bandRoutes);
app.use('/api/concerts', concertRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({
    message: '🎸 Music Dashboard API',
    version: '1.0.0',
    endpoints: {
      bands: '/api/bands',
      concerts: '/api/concerts'
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}`);
});
