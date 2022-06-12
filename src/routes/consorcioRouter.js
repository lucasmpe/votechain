import Router from 'express';
import ConsorcioController from '../controllers/ConsorcioController.js'

const consorcioRouter = new Router();



// consorcioRouter.get('/consorcio', (new ConsorcioController()).view);
consorcioRouter.post('/consorcio', (new ConsorcioController()).create);
// consorcioRouter.get('/consorcio/:id', (new ConsorcioController()).view);
consorcioRouter.post('/consorcio/:id/votacion', (new ConsorcioController()).createVoting);
consorcioRouter.get('/consorcio/:id/votacion/:idVotacion', (new ConsorcioController()).viewVotingResults);


export default consorcioRouter;
