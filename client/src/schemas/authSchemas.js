import { z } from "zod"

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-posta zorunludur")
    .email("Geçerli bir e-posta adresi girin"),
  password: z
    .string()
    .min(6, "Şifre en az 6 karakter olmalı"),
})

export {
	loginSchema
}