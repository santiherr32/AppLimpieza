// routes/tareaRoutes.js
const express = require("express");
const router = express.Router();
const tareaController = require("../controllers/tareaController");
const auth = require("../middleware/auth");

// Todas las rutas requieren autenticación
router.use(auth);

router.post("/", tareaController.crearTarea);
router.get("/habitacion/:habitacionId", tareaController.getTareasPorHabitacion);
router.get("/pendientes", tareaController.getTareasPendientes);
router.put("/completar/:tareaId", tareaController.completarTarea);
router.put("/descompletar/:tareaId", tareaController.descompletarTarea); // Agregar esta ruta
router.delete("/:tareaId", tareaController.eliminarTarea);

module.exports = router;
