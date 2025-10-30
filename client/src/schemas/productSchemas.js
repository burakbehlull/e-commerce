import { z } from "zod";

const productAddSchema = z.object({
  name: z
    .string()
    .min(1, "Ürün adı zorunludur"),

  description: z
    .string()
    .min(1, "Ürün açıklaması zorunludur"),

  price: z
    .string()
    .min(1, "Fiyat zorunludur")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
      message: "Fiyat 0'dan küçük olamaz",
    }),

  stock: z
    .string()
    .min(1, "Stok zorunludur")
    .refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, {
      message: "Stok 0'dan küçük olamaz",
    }),

  brand: z
    .string()
    .optional(),

  oldPrice: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(parseFloat(val)) && parseFloat(val) >= 0), {
      message: "Eski fiyat 0'dan küçük olamaz",
    }),

  discountBadgeText: z
    .string()
    .optional(),

  thumbnail: z
    .string()
    .url("Geçerli bir URL girin")
    .optional(),

  images: z
    .array(z.string().url("Geçerli bir URL girin"))
    .optional(),

  category: z
    .array(z.string())
    .optional(),

  isActive: z
    .boolean()
    .default(true),
});

export { 
	productAddSchema
}
