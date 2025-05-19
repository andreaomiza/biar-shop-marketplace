const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orders');
const serviceRoutes = require('./routes/services');
const sellerDashboardRoutes = require('./routes/sellerDashboard');

const app = express();

// ✅ Configuración específica de CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://a398-2800-200-eb20-2a3-585b-a9ff-7d7f-ceab.ngrok-free.app', // Opcional: tu dominio ngrok actual
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

// Verificar y crear carpeta uploads si no existe
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('Carpeta uploads creada automáticamente');
}

// Servir archivos estáticos de la carpeta uploads
app.use('/uploads', express.static('uploads'));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/seller', sellerDashboardRoutes);

// Middleware manejo de errores
app.use((err, req, res, next) => {
  console.error('Error general:', err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Conexión a MongoDB y arranque del servidor
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log('MongoDB conectado');
    app.listen(process.env.PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('Error conectando a MongoDB:', err);
    process.exit(1);
  });
// 