import Router from 'express';
import ConsorcistaController from '../controllers/ConsorcistaController.js'

const consorcistaRouter = new Router();
const controller = new ConsorcistaController();

consorcistaRouter.get('/consorcista', controller.view.bind(controller));
// consorcistaRouter.get('/consorcista/:id', controller.view.bind(controller));
consorcistaRouter.get('/consorcista/:id/votacion/:idVotacion', controller.viewVoting.bind(controller));

consorcistaRouter.post('/consorcista/:id/votacion/:idVotacion/vote', controller.vote.bind(controller));

export default consorcistaRouter;
