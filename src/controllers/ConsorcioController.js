import ConsorcioService from '../services/ConsorcioService.js'
import VotacionService from '../services/VotacionService.js'
export default class ConsorcioController {

  constructor() {
    //this.consorcioService = new ConsorcioService(); 
  }

  async create(req, res) {
    try {
      
      const {
        name,
        consorcistas
      } = req.body;

      const consorcioService = new ConsorcioService();
      await consorcioService.create(name, consorcistas);

      console.log('Registro exitoso!');
      res.send(`Se creó consorcio ${name}.`);
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

      const votacionService = new VotacionService();
      await votacionService.create(id, ownerId, details, subject, options, minVoters, ending);

      res.send(`Se creó la votacion con id: ${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  async viewVotingResults(req, res) {
    try {

      const {
        idVotacion,
        id: idConsorcio
      } = req.params;

      const votacionService = new VotacionService();
      const results = await votacionService.viewVotingResults(idVotacion, idConsorcio);

      res.send(`estas viendo la votación con id ${JSON.stringify(results)}`);
    } catch (error) {
      console.log(error);
    }
  };

}
