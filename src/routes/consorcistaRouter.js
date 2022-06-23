import Router from 'express';
import ConsorcistaController from '../controllers/ConsorcistaController.js'

const consorcistaRouter = new Router();
const controller = new ConsorcistaController();

consorcistaRouter.get('/consorcista', controller.view.bind(controller));
// consorcistaRouter.get('/consorcista/:id', controller.view.bind(controller));
consorcistaRouter.get('/consorcista/:idConsorcio/votacion', controller.viewVotaciones.bind(controller));
consorcistaRouter.get('/consorcista/:idConsorcio/votacion/:idVotacion', controller.viewMembersVotacion.bind(controller));
consorcistaRouter.get('/consorcista/:idConsorcio/votacion/:idVotacion/:idConsorcista', controller.viewVoting.bind(controller));

consorcistaRouter.post('/consorcista/:idConsorcio/votacion/:idVotacion/:idConsorcista/vote', controller.vote.bind(controller));

export default consorcistaRouter;
