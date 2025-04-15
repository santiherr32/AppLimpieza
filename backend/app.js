// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Importar modelos
const Usuario = require("./backend/models/Usuario");
const Hogar = require("./backend/models/Hogar");
const Habitacion = require("./backend/models/Habitacion");
const Tarea = require("./backend/models/Tarea");

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta inicial para verificar funcionamiento
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la API de AppLimpieza" });
});

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conexión a MongoDB establecida"))
  .catch((err) => console.error("Error conectando a MongoDB:", err));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
