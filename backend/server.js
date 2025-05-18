const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orders');
const serviceRoutes = require('./routes/services');
const sellerDashboardRoutes = require('./routes/sellerDashboard');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

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

// Middleware manejo de errores (opcional)
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



