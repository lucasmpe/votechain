import Votacion from '../entities/Votacion.js';
import StellarService from '../services/StellarService.js'
import Repository from '../repository/Repository.js'

export default class VotacionService {

  constructor() {
    this.stellarService = new StellarService();
    this.repository = new Repository();
  }

  async create(id, ownerId, details, subject, options, minVoters, ending) {
    
    const consorcio = this.repository.getConsorcioById(ownerId);
    const totalVt = consorcio.getTotalVts();

    const newVotacion = new Votacion(id, ownerId, details, subject, options, minVoters, ending);
    const optionsCode = newVotacion.getOptions();

    // PAGO AL CONSORCIO
    try {
        for (const assetCode of optionsCode) {
            await this.stellarService.issueAnAsset(consorcio.account, totalVt, assetCode);
        }    
    } catch (error) {
      console.log(error);
    }

    // falta setear la votacion al consorcio (analizar necesida de hacerlo en esta ocasio)
    
    // this.repository.saveVotacion(newVotacion);

  }







}
