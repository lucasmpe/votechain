import VotacionService from '../services/VotacionService.js'
export default class ConsorcistaController {

  constructor() {
    this.votacionService = new VotacionService();
  };

  view(req, res) {
    res.render('consorcista');
  };

  viewVoting(req, res) {
    try {
      const { idVotacion, id: idConsorcista } = req.params;
      const { depto, ownerId, details, subject, options, active, saldo } = this.votacionService.viewVoting(idVotacion, idConsorcista);

      console.log(options)

      res.render('votacion', { depto, ownerId, idVotacion, idConsorcista, details, subject, options, active, saldo });
    } catch (error) {
      console.log(error);
    }
  };

  async vote(req, res) {
    try {
      const { idVotacion, id: idConsorcista } = req.params;
      const option = Object.entries(req.body)[0][0];
      const amountVt = Object.entries(req.body)[0][1]; 
      
      await this.votacionService.vote(idVotacion, idConsorcista, option, amountVt);

      res.redirect(`/consorcista/${idConsorcista}/votacion/${idVotacion}`);
    } catch (error) {
      console.log(error);
    }
  };

}
