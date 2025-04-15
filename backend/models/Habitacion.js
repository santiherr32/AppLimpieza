// models/Habitacion.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const habitacionSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre de la habitación es obligatorio"],
      trim: true,
    },
    descripcion: {
      type: String,
      trim: true,
    },
    tipoHabitacion: {
      type: String,
      enum: [
        "cocina",
        "baño",
        "dormitorio",
        "sala",
        "comedor",
        "oficina",
        "otro",
      ],
      default: "otro",
    },
    hogar: {
      type: Schema.Types.ObjectId,
      ref: "Hogar",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Habitacion", habitacionSchema);
