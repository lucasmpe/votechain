import express from 'express';
import consorcioRouter from './routes/consorcioRouter.js';
import consorcistaRouter from './routes/consorcistaRouter.js';
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.send('home');
});

app.use(consorcioRouter);
app.use(consorcistaRouter);


app.listen(3000);
console.log(`Escuchando en http://localhost:${3000}`);

