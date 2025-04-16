// controllers/usuarioController.js
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generar JWT
const generarJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Registrar usuario
exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El usuario ya existe" });
    }

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const usuario = await Usuario.create({
      nombre,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      token: generarJWT(usuario._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al crear usuario", error: error.message });
  }
};

// Login de usuario
exports.loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    // Verificar contraseña
    const passwordCorrecto = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecto) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      token: generarJWT(usuario._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error en el login", error: error.message });
  }
};

// Obtener perfil de usuario
exports.getUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario._id).select("-password");
    res.json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener usuario", error: error.message });
  }
};
