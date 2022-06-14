import ConsorcioService from '../services/ConsorcioService.js'
import VotacionService from '../services/VotacionService.js'
export default class ConsorcioController {

  constructor() {
    this.consorcioService = new ConsorcioService();
    this.votacionService = new VotacionService();
  }

  async create(req, res) {
    try {
      const { name, consorcistas } = req.body;
      await this.consorcioService.create(name, consorcistas);
      res.send('Registro exitoso!');
    } catch (error) {
      console.log(error);
    }
  };

  async createVoting(req, res) {
    try {
      const {
        id,
        ownerId,
        details,
        subject,
        options,
        minVoters,
        ending,
      } = req.body;

      await this.votacionService.create(id, ownerId, details, subject, options, minVoters, ending);
      res.send('Creacion exitosa!');
    } catch (error) {
      console.log(error);
    }
  };

  async viewVotingResults(req, res) {
    try {
      const { idVotacion, id: idConsorcio } = req.params;
      const results = await this.votacionService.viewVotingResults(idVotacion, idConsorcio);
      res.send(`Resultados de la votación (id: ${idVotacion}): ${JSON.stringify(results)}`);
    } catch (error) {
      console.log(error);
    }
  };

}
