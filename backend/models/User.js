const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true
  },
  username: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio'],
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['cliente', 'vendedor'],
    default: 'cliente'
  },
  avatar: {
    type: String, // URL a imagen
    default: ''
  },
  bio: {
    type: String,
    maxlength: 500,
    default: ''
  },
  socialLinks: {
    website: { type: String, default: '' },
    instagram: { type: String, default: '' },
    soundcloud: { type: String, default: '' },
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

