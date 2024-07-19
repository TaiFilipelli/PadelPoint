import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Se necesita un nombre"),
  username: z.string().trim().min(1, "Se necesita un nombre de usuario"),
  email: z.string().email("Debe ser un correo electrónico válido").trim(),
  password: z
    .string()
    .trim()
    .min(8, "La contraseña debe tener, al menos, 8 caracteres"),
  confirmPassword: z.string().trim(),
})
.superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "Sus contraseñas no coinciden. Intentelo de nuevo",
      path: ["confirmPassword"],
    });
  }
});
