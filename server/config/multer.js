import multer from "multer";
import path from "path";
import fs from "fs";
import { nanoid } from "nanoid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./uploads/products";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => cb(null, file.originalname)
  
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Sadece resim dosyaları yüklenebilir"), false);
  }
};

export const upload = multer({ storage, fileFilter });
