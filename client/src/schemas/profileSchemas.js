import { z } from "zod";

const profileSchema = z.object({
  globalName: z
    .string()
    .min(3, "Ad en az 3 karakter olmalı")
    .max(30, "Ad en fazla 50 karakter olabilir")
    .default(""),
    
  username: z
    .string()
    .min(4, "Kullanıcı adı en az 4 karakter olmalı")
    .max(20, "Kullanıcı adı en fazla 20 karakter olabilir")
    .default(""),
    
  email: z
    .string()
    .email("Geçerli bir e-posta adresi girin")
    .default(""),
    
  phone: z
    .string()
    .regex(/^[0-9+\s-]*$/, "Geçerli bir telefon numarası girin")
    .optional()
    .default(""),

  currentPassword: z
    .string()
    .optional()
    .default(""),

  password: z
    .string()
    .optional()
    .default(""),

  confirmNewPassword: z
    .string()
    .optional()
    .default(""),
})
.superRefine((data, ctx) => {
  if (data.newPassword && data.newPassword !== data.confirmNewPassword) {
    ctx.addIssue({
      path: ["confirmNewPassword"],
      message: "Yeni şifreler eşleşmiyor",
    });
  }
});

export {
	profileSchema
}