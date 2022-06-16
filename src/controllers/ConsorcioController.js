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

  async create(req, res) {
    try {
      const { name } = req.body;

      const deptos = Object.entries(req.body)
        .filter(key => /^name\d/.test(key))
        .map(([name, depto]) => depto);

      const vts = Object.entries(req.body)
        .filter(key => /^votos\d/.test(key))
        .map(([votos, vt]) => vt)
      
      let consorcistas = [];
      deptos.forEach((depto, i) => consorcistas.push({"depto": depto, "vt": vts[i]}));

      const id = await this.consorcioService.create(name, consorcistas);

      res.redirect(`/consorcio/${id}/votacion`);
    } catch (error) {
      console.log(error);
    }
  };

  viewFormVoting(req, res) {
    const { id } = req.params;
    res.render('consorcioFormVotacion', { id, add: true, form: false });
  };

  addOptions(req, res) {
    const { id } = req.params;
    const { options } = req.body;
    
    let countOptions = [];
    for (let i = 0; i < Number(options); i++) {
      countOptions[i] = i + 1;
    }

    res.render('consorcioFormVotacion', { id, add: false, form: true, countOptions });
  };

  async createVoting(req, res) {
    try {
      const { id } = req.params;
      const { subject, details } = req.body;

      const titles = Object.entries(req.body)
        .filter(key => /^titleOption\d/.test(key))
        .map(([name, option]) => option);

      const infos = Object.entries(req.body)
        .filter(key => /^detailOption\d/.test(key))
        .map(([detail, info]) => info);
      
      let options = [];
      titles.forEach((option, i) => options.push({"option": option, "info": infos[i]}));

      const idVotacion = await this.votacionService.create(id, details, subject, options); //falta ending
      
      res.redirect(`/consorcio/${id}/votacion/${idVotacion}`);
    } catch (error) {
      console.log(error);
    }
  };

  async viewVotingResults(req, res) {
    try {
      const { idVotacion, id: idConsorcio } = req.params;
      const results = await this.votacionService.viewResults(idVotacion, idConsorcio);

      const totalVotes = results.map(({option, votes}) => votes).reduce((pv, cv) => pv + cv, 0);

      const percentResults = results.map(({option, votes}) => Object({"option": option, "percent": (votes/totalVotes) * 100}));

      res.render('results', { idVotacion, idConsorcio, percentResults });
    } catch (error) {
      console.log(error);
    }
  };

}
