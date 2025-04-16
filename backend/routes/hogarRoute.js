// routes/hogarRoutes.js
const express = require("express");
const router = express.Router();
const hogarController = require("../controllers/hogarController");
const auth = require("../middleware/auth");

// Todas las rutas requieren autenticación
router.use(auth);

router.post("/", hogarController.crearHogar);
router.get("/", hogarController.getHogar);
router.put("/", hogarController.actualizarHogar);

module.exports = router;
