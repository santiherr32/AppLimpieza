// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Importar rutas
const usuarioRoutes = require("./routes/usuarioRoute");
const hogarRoutes = require("./routes/hogarRoute");
const habitacionRoutes = require("./routes/habitacionRoute");
const tareaRoutes = require("./routes/tareaRoute");

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:4200", "https://santiherr32.github.io"],
    credentials: true,
  })
);
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
