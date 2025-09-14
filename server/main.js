import express from 'express';

import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import 'dotenv/config';

import { apiRouter } from '#routers'
import { db } from "#config"

const app = express();

db()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
app.use(helmet());


app.get('/', (req, res) => {
  res.send('hello e-commerce');
});

app.use('/api', apiRouter);

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});

