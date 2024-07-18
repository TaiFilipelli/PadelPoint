import { z } from "zod";

export const loginSchema=z
    .object({
        username:z.string().trim(),
        password:z.string().trim().min(8,"La contraseña debe tener más de 8 caracteres"),
    });