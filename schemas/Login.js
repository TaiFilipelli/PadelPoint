import { z } from "zod";
/**
 * Esquema de validación para el formulario de inicio de sesión.
 * Define las reglas de validación para nombre de usuario, correo electrónico y contraseña.
 * 
 * @type {import("zod").ZodObject<{
*   username?: string | undefined;
*   email?: string | undefined;
*   password: string;
* }, "strip", {
*   username: true;
*   email: true;
* } & {
*   username: string;
*   email: string;
* }, {
*   username: string;
*   email: string;
* } & {
*   username?: string | undefined;
*   email?: string | undefined;
* }>}
*/

//No sabia cómo documentar esto profe, le pedi al GPT que me ayude xd.

export const loginSchema = z
  .object({
    username: z.string().trim(),
    email: z.string().email().trim(),
    password: z.string().min(8, "La contraseña debe tener, al menos, 8 caracteres"),
  })
  .partial({
    username: true,
    email: true,
  })
  .superRefine(({ username, email }, ctx) => {
    if (!username && !email) {
      ctx.addIssue({
        code: "custom",
        message: "Nombre de usuario o correo necesario",
        path: ["username", "email"],
      });
    }
  });
