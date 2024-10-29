import { z } from "zod";

export const loginSchema=z
    .object({
        usernameOrEmail:z.string().trim().min(1,"El nombre de usuario no puede estar vacío."),
        password:z.string().trim().min(8,"La contraseña debe tener más de 8 caracteres"),
    });