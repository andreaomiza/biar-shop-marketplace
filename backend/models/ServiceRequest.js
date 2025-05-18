const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    trim: true, 
    lowercase: true,
    match: [/.+\@.+\..+/, 'Por favor ingresa un email válido']
  },
  tipoServicio: { type: String, required: true, trim: true },
  detalles: { type: String, trim: true },
  archivoNombre: { type: String },           // Nombre original del archivo subido
  archivoRuta: { type: String },             // Ruta o URL donde se guarda el archivo
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  estado: { type: String, default: 'pendiente', enum: ['pendiente', 'en proceso', 'completado', 'cancelado'] },
}, { timestamps: true });

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
