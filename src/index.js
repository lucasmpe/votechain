import express from 'express';
import consorcioRouter from './routes/consorcioRouter.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.render('home');
});

app.use(consorcioRouter)







// esta va al router consorcio
app.get('/consorcio/:id', (req, res) => {
  res.send(`GET request to consorcio con id: ${req.params.id}`);
});

app.post('/consorcio/:id/active', async (req, res) => {
  /** EN EL REQ LLEGARÁ DATA DEL PAGO QUE SE VA A EVALUAR 
    * UNA VEZ QUE EL PAGO SEA VALIDADO SE FONDEA LA CUENTA CONSORCIO CON ASSET EMITIDO POR NOSOTROS (ISSUER)
    * ATENCIÓN!! PREVIAMENTE SE REQUIERE QUE LAS CUENTAS SEAN FONDEADAS CON XML DE LO CONTRARIO NO PODRÁN HACER OP TRUSTLINE
    * */

});



// aca verdaderamnet va la lógica de la votación
app.post('/votacion', (req, res) => {
  /** A ESTE PUNTO EL CONSORCIO YA TIENE CARACTER DE DISTRIBUIDOR
   * Y LAS CEUNTAS CONSORCISTAS DEBERÍAN ESTAR PREVIAMENTE FONDEADAS CON XML PARA PODER REALIZAR LA OP TRUSTLINE
   */
  res.send('estas en una votación');
});




app.get('/consorcista', (req, res) => {
  res.send('Hola consorcista');
});


app.listen(3000);
console.log(`Escuchando en http://localhost:${3000}`);

