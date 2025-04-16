// routes/habitacionRoutes.js
const express = require("express");
const router = express.Router();
const habitacionController = require("../controllers/habitacionController");
const auth = require("../middleware/auth");

// Todas las rutas requieren autenticación
router.use(auth);

router.post("/", habitacionController.crearHabitacion);
router.get("/", habitacionController.getHabitaciones);
router.get("/:id", habitacionController.getHabitacion);
router.put("/:id", habitacionController.actualizarHabitacion);
router.delete("/:id", habitacionController.eliminarHabitacion);

module.exports = router;
