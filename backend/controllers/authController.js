const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 💡 Verifica que la clave JWT esté correctamente cargada
console.log("✅ JWT_SECRET desde authController:", process.env.JWT_SECRET);

exports.register = async (req, res) => {
  const { email, password, username, role } = req.body;
  console.log("📩 Datos recibidos en register:", req.body);

  try {
    // Verificar existencia previa por email o username
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ message: 'El email ya está registrado' });

    const existingUsername = await User.findOne({ username });
    if (existingUsername) return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      role
    });

    console.log("📝 Usuario a guardar:", newUser);

    await newUser.save();

    // Generar token JWT
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Respuesta al frontend
    res.status(201).json({
      message: "Usuario registrado exitosamente",
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('❌ Error en register:', error.message, error.stack);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("🔐 Intento de login con:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error("❌ Error en login:", error.message, error.stack);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};



