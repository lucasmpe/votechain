import VotacionService from '../services/VotacionService.js'
export default class ConsorcistaController {

  constructor() {
    this.votacionService = new VotacionService();
  };

  viewVoting(req, res) {
    try {
      const { idVotacion, id: idConsorcista } = req.params;
      const dataVotacion = this.votacionService.viewVoting(idVotacion, idConsorcista);
      res.send(`Estás viendo la votación con id ${dataVotacion.votacion.getId()}`);
    } catch (error) {
      console.log(error);
    }
  };

  async vote(req, res) {
    try {
      const { idVotacion, id: idConsorcista } = req.params;
      const { option, amountVt } = req.body;

      const saldo = await this.votacionService.vote(idVotacion, idConsorcista, option, amountVt);

      res.send(`Tu voto fue registrado correctamente. Te quedan de saldo: ${saldo} valores de voto`);
    } catch (error) {
      console.log(error);
    }
  };

}
