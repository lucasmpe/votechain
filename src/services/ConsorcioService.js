import Consorcio from "../entities/Consorcio.js";
import Consorcista from "../entities/Consorcista.js";
import StellarService from '../services/StellarService.js'
import Repository from '../repository/Repository.js'

export default class ConsorcioService {

  constructor() {
    this.stellarService = new StellarService();
    this.repository = new Repository();
  }

  // diferencias amount que le pasamos a la cuenta stellar!
  async create(name, consorcistas) {

    try {
      const newConsorcio = new Consorcio(name, name);
      const consorcioSAccount = await this.stellarService.createKeypair(newConsorcio.id);
      newConsorcio.setStellarAccount(consorcioSAccount);
      await this.stellarService.createAccount(newConsorcio.account, '100');

      for (const consorcista of consorcistas) {
        
        const newConsorcista = new Consorcista(name + consorcista.depto, consorcista.depto, consorcista.vt);
        const consorcistaSAccount = await this.stellarService.createKeypair(newConsorcista.id);
        newConsorcista.setStellarAccount(consorcistaSAccount);
        await this.stellarService.createAccount(newConsorcista.account);
        newConsorcio.addConsorcista(newConsorcista);
      };

      this.repository.saveConsorcio(newConsorcio);

    } catch (error) {
      console.log(error);
    }



  }







}

