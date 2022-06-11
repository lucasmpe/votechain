import express from 'express'
import Router from 'express';
import consorcistaController from '../controllers/ConsorcistaController.js'

const consorcistaRouter = new Router();


consorcistaRouter.get('/consorcista/:id', consorcistaController);
consorcistaRouter.get('/consorcista/:id/votacion/:idVotacion', consorcistaController);
consorcistaRouter.post('/consorcista/:id/votacion/:idVotacion', consorcistaController);

export default consorcistaRouter;
