// models/Hogar.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const hogarSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del hogar es obligatorio"],
      trim: true,
    },
    direccion: {
      type: String,
      trim: true,
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hogar", hogarSchema);
