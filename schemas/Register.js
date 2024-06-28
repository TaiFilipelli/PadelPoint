import {z} from "zod";
/**
 * Esquema de validación para el formulario de registro de usuarios.
 * Define las reglas de validación para nombre, nombre de usuario, correo electrónico, contraseña y confirmación de contraseña.
 * 
 * @type {import("zod").ZodObject<{
*   name: string;
*   userName: string;
*   email: string;
*   password: string;
*   confirmPassword: string;
* }, "strip", {}, {
*   name: string;
*   userName: string;
*   email: string;
*   password: string;
*   confirmPassword: string;
* }>}
*/
export const registerSchema = z
  .object({
    name: z.string().trim().min(1, "Se necesita un nombre"),
    userName: z.string().trim().min(1, "Se necesita un nombre de usuario"),
    email: z.string().email().trim(),
    password: z
      .string()
      .trim()
      .min(8, "La contraseña debe tener, al menos, 8 caracteres"),
    confirmPassword: z.string().trim(),
  })
  .required()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Sus contraseñas no coinciden. Intentelo de nuevo",
        path: ["confirmPassword"],
      });
    }
  });