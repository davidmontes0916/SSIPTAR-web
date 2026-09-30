const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const riesgoRoutes = require('./routes/riesgo.routes'); // Agregar esta línea
const responsableRoutes = require('./routes/responsable.routes');
const informeRoutes = require('./routes/informe.routes');


const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', riesgoRoutes); // Agregar esta línea
app.use('/api', responsableRoutes);
app.use('/api', informeRoutes);

module.exports = app;
