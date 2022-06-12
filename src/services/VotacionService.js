import Votacion from '../entities/Votacion.js';
import StellarService from '../services/StellarService.js';
import Repository from '../repository/Repository.js';
import fetch from 'node-fetch';
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

    try {
      for (const assetCode of optionsCode) {
        await this.stellarService.issueAnAsset(consorcio.account, totalVt, assetCode);
        consorcio.addAsset(assetCode, totalVt);
      }
    } catch (error) {
      console.log(error);
    }

    for (const consorcista of consorcio.consorcistas) {
      consorcista.addVts({ votacion: id, votosEmitidos: [] });
    }

    // falta agregar la votacion al consorcio (analizar necesida de hacerlo en esta ocasio) [] de Votaciones

    this.repository.updateConsorcio(consorcio);
    this.repository.saveVoting(newVotacion);

  }

  viewVoting(idVotacion, idConsorcista) {
    // a futuro validar que el consorcista esté habilitado para votar en la votación
    let dataVotacion = {};

    const votacion = this.repository.getVotingById(idVotacion);

    dataVotacion.votacion = votacion;

    const { vt, vts } = this.repository.getConsorcistaById(votacion.getOwnerId(), idConsorcista);

    // if (vts.length === 0 || vts.votosEmitidos.length === 0) {
    //   dataVotacion.vt = vt;
    // } else {
    //   dataVotacion.vt = 
    //     Number(vt) - vts.votosEmitidos.map(votos => Number(votos.vt)).reduce((pv, cv) => pv + cv, 0);
    // }

    return dataVotacion;
  }

  async vote(idVotacion, idConsorcista, option, amountVt) {

    const { ownerId } = this.repository.getVotingById(idVotacion);

    // 1° set el voto en el array vts --> votosEmitidos del consorcista

    const consorcio = this.repository.getConsorcioById(ownerId);

    const consorcista = consorcio.consorcistas.find(consorcista => consorcista.id === idConsorcista);

    if (consorcista.votar(idVotacion, option, amountVt)) {
      // 2° abrir trusline y pagar al consorcista desde el consorcio
      await this.stellarService.makePayment(consorcio.account, consorcista.account, amountVt, option);
      // descontar asset al consorcio
    } else console.log('no pudiste votar');

    // 3° guardar

    this.repository.updateConsorcio(consorcio);

    return consorcista.getVotosEmitidos(idVotacion);
  }


  async viewVotingResults(idVotacion, idConsorcio) {

    let resultsVotacion = [];
    let countVotes = []; 

    const votacion = this.repository.getVotingById(idVotacion);

    const { consorcistas } = this.repository.getConsorcioById(idConsorcio);
    
    // Mover este fetch a stellarService
    try {

      for (const consorcista of consorcistas) {

        const response = await fetch(
          `https://horizon-testnet.stellar.org/accounts/${consorcista.account.publicKey}/payments?order=desc`,
        );

        const { _embedded } = await response.json();

        for (const record of _embedded.records) {
          const {
            id,
            asset_code: option,
            from: consorcio,
            to: consorcista,
            amount: vt
          } = record;
  
          resultsVotacion.push({ id, option, consorcio, consorcista, vt })
        }
      }

      const listOption = votacion.options.map(elem => elem.option)

      for (const option of listOption) {
        const votes = resultsVotacion.filter(record => record.option === option)
          .map(record => Number(record.vt))
          .reduce((pv, cv) => pv + cv, 0);

          countVotes.push({option, votes});
      }

      console.log("SUCCESS!");
      return countVotes;

    } catch (e) {
      console.error("ERROR!", e);
    }

  }

}
