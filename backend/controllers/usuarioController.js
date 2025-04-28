const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { actualizarPerfilSchema } = require("../validators/usuarioValidator.js");

// Generar JWT
const generarJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Registrar usuario
exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El usuario ya existe" });
    }

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);

    // Crear usuario
    const usuario = await Usuario.create({
      nombre,
      correo,
      contraseña: hashedPassword,
    });

    res.status(201).json({
      _id: usuario._id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
      token: generarJWT(usuario._id),
    });
  } catch (error) {
    console.error("Error al crear usuario:", error.message); // Agregar log detallado
    res
      .status(500)
      .json({ mensaje: "Error al crear usuario", error: error.message });
  }
};

// Login de usuario
exports.loginUsuario = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    // Verificar contraseña
    const passwordCorrecto = await bcrypt.compare(
      contraseña,
      usuario.contraseña
    );
    if (!passwordCorrecto) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
      token: generarJWT(usuario._id),
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    res
      .status(500)
      .json({ mensaje: "Error al iniciar sesión", error: error.message });
  }
};

// Obtener perfil de usuario
exports.getUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario._id).select(
      "-contraseña"
    );
    res.json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener usuario", error: error.message });
  }
};

// Actualizar perfil de usuario
exports.actualizarPerfil = async (req, res) => {
  try {
    // Validar los datos del cliente
    const datosValidados = actualizarPerfilSchema.parse(req.body);

    const { nombre, correo, contraseña } = datosValidados;

    const datosActualizados = { nombre, correo };
    if (contraseña) {
      const salt = await bcrypt.genSalt(10);
      datosActualizados.contraseña = await bcrypt.hash(contraseña, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(
      req.usuario._id,
      datosActualizados,
      {
        new: true,
        runValidators: true,
      }
    ).select("-contraseña");

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Manejar errores de validación
      return res
        .status(400)
        .json({ mensaje: "Datos inválidos", errores: error.errors });
    }

    console.error("Error al actualizar el perfil:", error.message);
    res
      .status(500)
      .json({ mensaje: "Error al actualizar el perfil", error: error.message });
  }
};
