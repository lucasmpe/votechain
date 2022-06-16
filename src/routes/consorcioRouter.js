import Router from 'express';
import ConsorcioController from '../controllers/ConsorcioController.js'

const consorcioRouter = new Router();
const controller = new ConsorcioController();

consorcioRouter.get('/consorcio', controller.view.bind(controller));
// consorcioRouter.get('/consorcio/:id', controller.view.bind(controller));
consorcioRouter.get('/consorcio/add', controller.addField.bind(controller));
consorcioRouter.post('/consorcio/add', controller.viewForm.bind(controller));
consorcioRouter.post('/consorcio/create', controller.create.bind(controller));
consorcioRouter.get('/consorcio/:id/votacion', controller.viewFormVoting.bind(controller));
consorcioRouter.post('/consorcio/:id/votacion/add', controller.addOptions.bind(controller));
consorcioRouter.post('/consorcio/:id/votacion/create', controller.createVoting.bind(controller));
consorcioRouter.get('/consorcio/:id/votacion/:idVotacion', controller.viewVotingResults.bind(controller));

export default consorcioRouter;
