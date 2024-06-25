import { z } from "zod";

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
