import express from 'express';

import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import 'dotenv/config';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
app.use(helmet());


app.get('/', (req, res) => {
  res.send('hello e-commerce');
});

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});

