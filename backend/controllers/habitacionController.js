// controllers/habitacionController.js
const Habitacion = require("../models/Habitacion");
const Hogar = require("../models/Hogar");

// Crear una nueva habitación
exports.crearHabitacion = async (req, res) => {
  try {
    const { nombre, descripcion, tipoHabitacion } = req.body;

    // Obtener el hogar del usuario
    const hogar = await Hogar.findOne({ usuario: req.usuario._id });
    if (!hogar) {
      return res.status(404).json({ mensaje: "Primero debes crear un hogar" });
    }

    const habitacion = await Habitacion.create({
      nombre,
      descripcion,
      tipoHabitacion,
      hogar: hogar._id,
    });

    res.status(201).json(habitacion);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al crear habitación", error: error.message });
  }
};

// Obtener todas las habitaciones del hogar
exports.getHabitaciones = async (req, res) => {
  try {
    // Obtener el hogar del usuario
    const hogar = await Hogar.findOne({ usuario: req.usuario._id });
    if (!hogar) {
      return res.status(404).json({ mensaje: "Hogar no encontrado" });
    }

    const habitaciones = await Habitacion.find({ hogar: hogar._id });
    res.json(habitaciones);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener habitaciones", error: error.message });
  }
};

// Obtener una habitación específica
exports.getHabitacion = async (req, res) => {
  try {
    const hogar = await Hogar.findOne({ usuario: req.usuario._id });
    if (!hogar) {
      return res.status(404).json({ mensaje: "Hogar no encontrado" });
    }

    const habitacion = await Habitacion.findOne({
      _id: req.params.id,
      hogar: hogar._id,
    });

    if (!habitacion) {
      return res.status(404).json({ mensaje: "Habitación no encontrada" });
    }

    res.json(habitacion);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener habitación", error: error.message });
  }
};

// Actualizar habitación
exports.actualizarHabitacion = async (req, res) => {
  try {
    const { nombre, descripcion, tipoHabitacion } = req.body;

    const hogar = await Hogar.findOne({ usuario: req.usuario._id });
    if (!hogar) {
      return res.status(404).json({ mensaje: "Hogar no encontrado" });
    }

    const habitacion = await Habitacion.findOneAndUpdate(
      { _id: req.params.id, hogar: hogar._id },
      { nombre, descripcion, tipoHabitacion },
      { new: true, runValidators: true }
    );

    if (!habitacion) {
      return res.status(404).json({ mensaje: "Habitación no encontrada" });
    }

    res.json(habitacion);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar habitación",
      error: error.message,
    });
  }
};

// Eliminar habitación
exports.eliminarHabitacion = async (req, res) => {
  try {
    const hogar = await Hogar.findOne({ usuario: req.usuario._id });
    if (!hogar) {
      return res.status(404).json({ mensaje: "Hogar no encontrado" });
    }

    const habitacion = await Habitacion.findOneAndDelete({
      _id: req.params.id,
      hogar: hogar._id,
    });

    if (!habitacion) {
      return res.status(404).json({ mensaje: "Habitación no encontrada" });
    }

    res.json({ mensaje: "Habitación eliminada correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar habitación", error: error.message });
  }
};
