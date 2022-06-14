import Router from 'express';
import ConsorcioController from '../controllers/ConsorcioController.js'

const consorcioRouter = new Router();
const controller = new ConsorcioController();

// consorcioRouter.get('/consorcio', controller.view.bind(controller));
consorcioRouter.post('/consorcio', controller.create.bind(controller));
// consorcioRouter.get('/consorcio/:id', controller.view.bind(controller));
consorcioRouter.post('/consorcio/:id/votacion', controller.createVoting.bind(controller));
consorcioRouter.get('/consorcio/:id/votacion/:idVotacion', controller.viewVotingResults.bind(controller));

export default consorcioRouter;
