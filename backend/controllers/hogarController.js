const Hogar = require("../models/Hogar");

// Crear un nuevo hogar
exports.crearHogar = async (req, res) => {
  try {
    const { nombre, direccion } = req.body;

    // Verificar si el usuario ya tiene un hogar
    const hogarExistente = await Hogar.findOne({ usuario: req.usuario._id });
    if (hogarExistente) {
      return res
        .status(400)
        .json({ mensaje: "El usuario ya tiene un hogar registrado" });
    }

    const hogar = await Hogar.create({
      nombre,
      direccion,
      usuario: req.usuario._id,
    });

    res.status(201).json(hogar);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al crear hogar", error: error.message });
  }
};

// Obtener hogar del usuario
exports.getHogar = async (req, res) => {
  try {
    const hogar = await Hogar.findOne({ usuario: req.usuario._id });
    if (!hogar) {
      return res.status(404).json({ mensaje: "Hogar no encontrado" });
    }
    res.json(hogar);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener hogar", error: error.message });
  }
};

// Actualizar hogar
exports.actualizarHogar = async (req, res) => {
  try {
    const { nombre, direccion } = req.body;
    const hogar = await Hogar.findOneAndUpdate(
      { usuario: req.usuario._id },
      { nombre, direccion },
      { new: true, runValidators: true }
    );

    if (!hogar) {
      return res.status(404).json({ mensaje: "Hogar no encontrado" });
    }

    res.json(hogar);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al actualizar hogar", error: error.message });
  }
};
