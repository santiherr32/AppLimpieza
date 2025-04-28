// controllers/tareaController.js
const Tarea = require("../models/Tarea");
const Habitacion = require("../models/Habitacion");
const Hogar = require("../models/Hogar");

// Crear una nueva tarea
exports.crearTarea = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      habitacionId,
      frecuencia,
      diasSemana,
      horario,
      duracionEstimada,
      prioridad,
    } = req.body;

    // Verificar que la habitación exista y pertenezca al hogar del usuario
    const hogar = await Hogar.findOne({ usuario: req.usuario._id });
    if (!hogar) {
      return res.status(404).json({ mensaje: "Hogar no encontrado" });
    }

    const habitacion = await Habitacion.findOne({
      _id: habitacionId,
      hogar: hogar._id,
    });

    if (!habitacion) {
      return res.status(404).json({ mensaje: "Habitación no encontrada" });
    }

    // Calcular próxima ejecución
    let proximaEjecucion = new Date();
    if (frecuencia === "diaria") {
      proximaEjecucion.setDate(proximaEjecucion.getDate() + 1);
    } else if (frecuencia === "semanal") {
      proximaEjecucion.setDate(proximaEjecucion.getDate() + 7);
    } else if (frecuencia === "quincenal") {
      proximaEjecucion.setDate(proximaEjecucion.getDate() + 15);
    } else if (frecuencia === "mensual") {
      proximaEjecucion.setMonth(proximaEjecucion.getMonth() + 1);
    }

    const tarea = await Tarea.create({
      nombre,
      descripcion,
      habitacion: habitacionId,
      frecuencia,
      diasSemana: diasSemana || [],
      horario,
      duracionEstimada,
      prioridad,
      proximaEjecucion,
    });

    res.status(201).json(tarea);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al crear tarea", error: error.message });
  }
};

// Obtener todas las tareas de una habitación
exports.getTareasPorHabitacion = async (req, res) => {
  try {
    const { habitacionId } = req.params;

    // Verificar que la habitación pertenezca al hogar del usuario
    const hogar = await Hogar.findOne({ usuario: req.usuario._id });
    if (!hogar) {
      return res.status(404).json({ mensaje: "Hogar no encontrado" });
    }

    const habitacion = await Habitacion.findOne({
      _id: habitacionId,
      hogar: hogar._id,
    });

    if (!habitacion) {
      return res.status(404).json({ mensaje: "Habitación no encontrada" });
    }

    const tareas = await Tarea.find({ habitacion: habitacionId });
    res.json(tareas);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener tareas", error: error.message });
  }
};

// Obtener todas las tareas pendientes del usuario
exports.getTareasPendientes = async (req, res) => {
  try {
    // Obtener el hogar del usuario
    const hogar = await Hogar.findOne({ usuario: req.usuario._id });
    if (!hogar) {
      return res.status(404).json({ mensaje: "Hogar no encontrado" });
    }

    // Obtener todas las habitaciones del hogar
    const habitaciones = await Habitacion.find({ hogar: hogar._id });
    const habitacionIds = habitaciones.map((h) => h._id);

    // Obtener tareas pendientes
    const tareas = await Tarea.find({
      habitacion: { $in: habitacionIds },
      completado: false,
    }).populate("habitacion", "nombre tipoHabitacion");

    res.json(tareas);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener tareas pendientes",
      error: error.message,
    });
  }
};

// Marcar tarea como completada
exports.completarTarea = async (req, res) => {
  try {
    const { tareaId } = req.params;

    const hogar = await Hogar.findOne({ usuario: req.usuario._id });
    if (!hogar) {
      return res.status(404).json({ mensaje: "Hogar no encontrado" });
    }

    const habitaciones = await Habitacion.find({ hogar: hogar._id });
    const habitacionIds = habitaciones.map((h) => h._id);

    const tarea = await Tarea.findOne({
      _id: tareaId,
      habitacion: { $in: habitacionIds },
    }).populate("habitacion");

    if (!tarea) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    tarea.completado = true;
    tarea.ultimaEjecucion = new Date();

    // Calcular próxima ejecución
    let proximaEjecucion = new Date();
    if (tarea.frecuencia === "diaria") {
      proximaEjecucion.setDate(proximaEjecucion.getDate() + 1);
    } else if (tarea.frecuencia === "semanal") {
      proximaEjecucion.setDate(proximaEjecucion.getDate() + 7);
    } else if (tarea.frecuencia === "quincenal") {
      proximaEjecucion.setDate(proximaEjecucion.getDate() + 15);
    } else if (tarea.frecuencia === "mensual") {
      proximaEjecucion.setMonth(proximaEjecucion.getMonth() + 1);
    }

    tarea.proximaEjecucion = proximaEjecucion;
    await tarea.save();

    const tareaActualizada = await Tarea.findById(tarea._id).populate(
      "habitacion"
    );
    res.json(tareaActualizada);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al completar tarea",
      error: error.message,
    });
  }
};

// Descompletar tarea
exports.descompletarTarea = async (req, res) => {
  try {
    const { tareaId } = req.params;

    const hogar = await Hogar.findOne({ usuario: req.usuario._id });
    if (!hogar) {
      return res.status(404).json({ mensaje: "Hogar no encontrado" });
    }

    const habitaciones = await Habitacion.find({ hogar: hogar._id });
    const habitacionIds = habitaciones.map((h) => h._id);

    const tarea = await Tarea.findOne({
      _id: tareaId,
      habitacion: { $in: habitacionIds },
    });

    if (!tarea) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    tarea.completado = false;
    tarea.ultimaEjecucion = null;
    await tarea.save();

    res.json(tarea);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al descompletar tarea", error: error.message });
  }
};

// Eliminar tarea
exports.eliminarTarea = async (req, res) => {
  try {
    const { tareaId } = req.params;

    // Verificar que la tarea pertenezca a una habitación del hogar del usuario
    const hogar = await Hogar.findOne({ usuario: req.usuario._id });
    if (!hogar) {
      return res.status(404).json({ mensaje: "Hogar no encontrado" });
    }

    const habitaciones = await Habitacion.find({ hogar: hogar._id });
    const habitacionIds = habitaciones.map((h) => h._id);

    const tarea = await Tarea.findOneAndDelete({
      _id: tareaId,
      habitacion: { $in: habitacionIds },
    });

    if (!tarea) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    res.json({ mensaje: "Tarea eliminada correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar tarea", error: error.message });
  }
};
