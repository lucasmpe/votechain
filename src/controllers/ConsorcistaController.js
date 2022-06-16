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
      const { options, active, saldo } = this.votacionService.viewVoting(idVotacion, idConsorcista);

      res.render('votacion', { idVotacion, idConsorcista, options, active, saldo });
    } catch (error) {
      console.log(error);
    }
  };

  async vote(req, res) {
    try {
      const { idVotacion, id: idConsorcista } = req.params;
      // const { option, amountVt } = req.body;

      // req.body.

      console.log(req.body)

      const saldo = await this.votacionService.vote(idVotacion, idConsorcista, option, amountVt);

      res.send(`Tu voto fue registrado correctamente. Te quedan de saldo:  valores de voto`);
    } catch (error) {
      console.log(error);
    }
  };

}
