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

const registerSchema = z.object({
	username: z
		.string()
		.min(3, "Kullanıcı adı en az 3 karakter olmalı"),
	email: z
		.string()
		.min(1, "E-posta zorunludur")
		.email("Geçerli bir e-posta adresi girin"),
	password: z
		.string()
		.min(6, "Şifre en az 6 karakter olmalı"),
})

export {
	loginSchema,
	registerSchema
}