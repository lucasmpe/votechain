import express from 'express'
import Router from 'express';
import consorcioController from '../controllers/ConsorcioController.js'

const consorcioRouter = new Router();


// consorcioRouter.get('/consorcio', consorcioController);
consorcioRouter.post('/consorcio', consorcioController.create);
consorcioRouter.get('/consorcio/:id', consorcioController);
consorcioRouter.post('/consorcio/:id/votacion', consorcioController);
consorcioRouter.get('/consorcio/:id/votacion/:idVotacion', consorcioController);


export default consorcioRouter;
