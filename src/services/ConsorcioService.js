import Consorcio from "../entities/Consorcio.js";
import Consorcista from "../entities/Consorcista.js";
import StellarService from '../services/StellarService.js';
import Repository from '../repository/Repository.js';
export default class ConsorcioService {

  constructor() {
    this.stellarService = new StellarService();
    this.repository = new Repository();
  }

  async create(name, consorcistas) {
    try {
      const id = name.replace(/\s/g, '').split('').map((c, i) => name.charCodeAt(i)).reduce((pv, cv) => pv + cv, 0);
      console.log(id)
      const newConsorcio = new Consorcio(id, name);
      const consorcioSAccount = await this.stellarService.createKeypair(newConsorcio.id);
      newConsorcio.setStellarAccount(consorcioSAccount);
      await this.stellarService.createAccount(newConsorcio.account, '100');

      for (const consorcista of consorcistas) {
        const newConsorcista = new Consorcista(id.toString() + consorcista.depto, consorcista.depto, consorcista.vt);
        const consorcistaSAccount = await this.stellarService.createKeypair(newConsorcista.id);//getId
        newConsorcista.setStellarAccount(consorcistaSAccount);
        await this.stellarService.createAccount(newConsorcista.account);
        newConsorcio.addConsorcista(newConsorcista);
      };

      this.repository.saveConsorcio(newConsorcio);

      return newConsorcio.getId();

    } catch (error) {
      console.log(error);
    }
  }

  getVotaciones(idConsorcio) {
    return this.repository.getVotaciones(idConsorcio);
  }

  getIdsConsorcios() {
    return this.repository.getAllIdsConsorcios();
  }

  getIdsConsorcistas(idConsorcio) {
    const consorcio = this.repository.getConsorcioById(idConsorcio);
    return consorcio.getConsorcistas().map(consorcista => consorcista.getId());
  }

}
