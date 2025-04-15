// models/Tarea.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const tareaSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre de la tarea es obligatorio"],
      trim: true,
    },
    descripcion: {
      type: String,
      trim: true,
    },
    habitacion: {
      type: Schema.Types.ObjectId,
      ref: "Habitacion",
      required: true,
    },
    frecuencia: {
      type: String,
      enum: ["diaria", "semanal", "quincenal", "mensual", "personalizada"],
      required: true,
    },
    diasSemana: {
      type: [String],
      enum: [
        "lunes",
        "martes",
        "miércoles",
        "jueves",
        "viernes",
        "sábado",
        "domingo",
      ],
      default: [],
    },
    horario: {
      type: String,
      trim: true,
    },
    duracionEstimada: {
      type: Number, // en minutos
      default: 15,
    },
    prioridad: {
      type: String,
      enum: ["baja", "media", "alta"],
      default: "media",
    },
    ultimaEjecucion: {
      type: Date,
    },
    proximaEjecucion: {
      type: Date,
    },
    completado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tarea", tareaSchema);
