import express from 'express';

import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path'
import 'dotenv/config';
import { Product } from '#models'

import { apiRouter } from '#routers'
import { db } from "#config"

const app = express();

db()

app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: "1mb"}));
// app.use(express.json());

app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
app.use(helmet());

app.disable('x-powered-by');

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
			// scriptSrc: ["'self'", "http://localhost:3000"]
			// connectSrc: ["'self'", "ws://localhost:3000"] // (socket connecter)
        },
    })
);


app.use("/uploads", express.static("uploads"));

app.get('/', (req, res) => {
  res.send('hello e-commerce');
});

app.get('/p/:productId', async (req,res)=> {
  const { productId, index } = req.params;

  // Mongoose _id ile bul
  const product = await Product.findOne({id: productId});
  if (!product) return res.status(404).send("Product not found");

  const imagePath = product.images[index];
  console.log("Image path from DB:", imagePath)
  if (!imagePath) return res.status(404).send("Image not found");

  // uploads klasörünü ekle
  const absolutePath = path.resolve("uploads", imagePath);
  console.log("Absolute path:", absolutePath)

  res.sendFile(absolutePath, (err) => {
    if (err) {
      console.error("Send file error:", err);
      res.status(500).send("Error sending file");
    }
  });
});

app.use('/api', apiRouter);

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});

