const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middleware/auth");

// Rutas públicas
router.post("/register", usuarioController.registrarUsuario);
router.post("/login", usuarioController.loginUsuario);

// Rutas protegidas
router.get("/perfil", auth, usuarioController.getUsuario);

module.exports = router;
