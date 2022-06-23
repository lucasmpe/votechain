import VotacionService from '../services/VotacionService.js';
import ConsorcioService from '../services/ConsorcioService.js';
export default class ConsorcistaController {

  constructor() {
    this.votacionService = new VotacionService();
    this.consorcioService = new ConsorcioService();
  };

  view(req, res) {
    const IdsConsorcios = this.consorcioService.getIdsConsorcios();
    res.render('consorcista', IdsConsorcios && { IdsConsorcios });
  };

  viewVotaciones(req, res) {
    const { idConsorcio } = req.params;
    const idsVotaciones = this.consorcioService.getVotaciones(idConsorcio);
    console.log(idConsorcio, idsVotaciones)
    res.render('consorcista', { idConsorcio, votaciones: idsVotaciones });
  };

  viewMembersVotacion(req, res) {
    const { idConsorcio, idVotacion } = req.params;
    const idsConsorcistas = this.consorcioService.getIdsConsorcistas(idConsorcio);
    console.log(idsConsorcistas);
    res.render('consorcista', { idConsorcio, idVotacion, idsConsorcistas });
  };

  async viewVoting(req, res) {
    try {
      const { idVotacion, idConsorcista } = req.params;
      const { depto, ownerId, details, subject, options, active, saldo } = this.votacionService.viewVoting(idVotacion, idConsorcista);

      const consorcistas = await this.votacionService.getDataConsorcistas();
      const account = await this.consorcioService.getConsorcioAccount(ownerId);
      console.log(account)

      res.render('votacion', { depto, ownerId, idVotacion, idConsorcista, details, subject, options, active, saldo, consorcistas, account });
    } catch (error) {
      console.log(error);
    }
  };

  async vote(req, res) {
    try {
      const {idConsorcio, idVotacion, idConsorcista } = req.params;
      const option = Object.entries(req.body)[0][0];
      const amountVt = Object.entries(req.body)[0][1]; 
      
      await this.votacionService.vote(idVotacion, idConsorcista, option, amountVt);

      res.redirect(`/consorcista/${idConsorcio}/votacion/${idVotacion}/${idConsorcista}`);
    } catch (error) {
      console.log(error);
    }
  };

}

