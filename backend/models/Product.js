const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: 0
  },
  category: {
    type: String,
    enum: [
      'audiolibros',
      'fuentes',
      'plantillas-web',
      'samplers',
      'viremix',
      'otros'
    ],
    required: [true, 'La categoría es obligatoria']
  },
  fileUrl: {
    type: String,
    required: [true, 'Debe proveerse un archivo descargable']
  },
  imageUrl: {
    type: String,
    default: ''
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [String], // opcional: útil para filtros/búsquedas
  downloads: {
    type: Number,
    default: 0
  },
  isPublic: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

