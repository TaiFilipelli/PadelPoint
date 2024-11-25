import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Se necesita un nombre"),
  surname : z.string().trim().min(4, "Se necesita un apellido  (>= 4 caracteres)"),
  username: z.string().trim().min(5, "Se necesita un nombre de usuario (> 5 caracteres)"),
  email: z.string().email("Debe ser un correo electrónico válido").trim(),
  postalCode: z.string().trim().min(1, "Se necesita un código postal"),
  password: z
    .string()
    .trim()
    .min(8, "La contraseña debe tener, al menos, 8 caracteres"),
  confirmPassword: z.string().trim(),
  phone: z.string().trim().min(1, "Se necesita un número de teléfono"),
  idNumber:z.string().trim().min(1, "Se necesita un número de ID"),
  addressStreet: z.string().trim(),
  addressNumber: z.string().trim(),
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
