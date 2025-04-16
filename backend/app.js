// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Importar rutas
const usuarioRoutes = require("./routes/usuarioRoutes");
const hogarRoutes = require("./routes/hogarRoutes");
const habitacionRoutes = require("./routes/habitacionRoutes");
const tareaRoutes = require("./routes/tareaRoutes");

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

// Usar rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/hogares", hogarRoutes);
app.use("/api/habitaciones", habitacionRoutes);
app.use("/api/tareas", tareaRoutes);

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
