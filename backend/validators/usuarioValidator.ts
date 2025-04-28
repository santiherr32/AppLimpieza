const z = require("zod");

const actualizarPerfilSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    correo: z.string().email("Correo inválido"),
    contraseña: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").optional(),
});

module.exports = { actualizarPerfilSchema };