import express from 'express';
import { create } from 'express-handlebars';
import consorcioRouter from './routes/consorcioRouter.js';
import consorcistaRouter from './routes/consorcistaRouter.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const hbs = create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.use(consorcioRouter);
app.use(consorcistaRouter);

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(port);
console.log(`Escuchando en http://localhost:${port}`);
