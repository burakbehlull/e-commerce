import express from 'express';

import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path'

import 'dotenv/config';

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

app.use('/api', apiRouter);

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});

