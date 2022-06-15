import ConsorcioService from '../services/ConsorcioService.js'
import VotacionService from '../services/VotacionService.js'
export default class ConsorcioController {

  constructor() {
    this.consorcioService = new ConsorcioService();
    this.votacionService = new VotacionService();
  }

  view(req, res) {
    res.render('consorcio');
  };

  addField(req, res) {
    res.render('consorcioAdd');
  };

  viewForm(req, res) {
    const { consorcistas } = req.body;

    let count = [];
    for (let i = 0; i < Number(consorcistas); i++) {
      count[i] = i + 1;
    }
    //validar
    res.render('consorcioForm', { count }) 
  };




/*
  {
    name: 'Consorcio2',
    address: 'Coronel Gonzalez',
    email: 'd@a.com',
    name1: '1A',
    votos1: '100',
    name2: '1B',
    votos2: '120',
    name3: '1C',
    votos3: '140',
    name4: '1D',
    votos4: '140'
  }

*/

  async create(req, res) {
    try {
      const { name } = req.body;

      // let result = {}
      // undefined
      // nombres.forEach((nombre, i) => result[nombre] = votos[i]);
      // undefined
      // result 
      // {1a: '100', 1b: '200'}

      // await this.consorcioService.create(name, consorcistas);
      console.log(req.body)
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
