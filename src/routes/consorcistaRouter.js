import express from 'express'
import Router from 'express';
import ConsorcistaController from '../controllers/ConsorcistaController.js'

const consorcistaRouter = new Router();

// consorcistaRouter.get('/consorcista/:id', consorcistaController);
consorcistaRouter.get('/consorcista/:id/votacion/:idVotacion', (new ConsorcistaController).viewVoting);
consorcistaRouter.post('/consorcista/:id/votacion/:idVotacion', (new ConsorcistaController).vote);

export default consorcistaRouter;
