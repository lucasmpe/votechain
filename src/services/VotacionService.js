import Votacion from '../entities/Votacion.js';
import StellarService from '../services/StellarService.js';
import Repository from '../repository/Repository.js';
export default class VotacionService {

  constructor() {
    this.stellarService = new StellarService();
    this.repository = new Repository();
  }

  async create(id, ownerId, details, subject, options, minVoters, ending) {
    const consorcio = this.repository.getConsorcioById(ownerId);
    const newVotacion = new Votacion(id, ownerId, details, subject, options, minVoters, ending);

    try {
      const totalVt = consorcio.getTotalVts();
      for (const assetCode of newVotacion.getOptions()) {
        await this.stellarService.issueAnAsset(consorcio.account, totalVt, assetCode);
        consorcio.addAsset(assetCode, totalVt);
      }
    } catch (error) {
      console.log(error);
    }

    for (const consorcista of consorcio.consorcistas) {
      consorcista.addVts({ votacion: id, votosEmitidos: [] });
    }

    this.repository.updateConsorcio(consorcio);
    this.repository.saveVoting(newVotacion);
  }

  viewVoting(idVotacion, idConsorcista) {
    const votacion = this.repository.getVotingById(idVotacion);
    const consorcista = this.repository.getConsorcistaById(votacion.getOwnerId(), idConsorcista);
    const saldo = consorcista.getVt() - consorcista.getVotosEmitidos(idVotacion);
    return { votacion, saldo };
  }

  async vote(idVotacion, idConsorcista, option, amountVt) {
    const { ownerId } = this.repository.getVotingById(idVotacion);
    const consorcio = this.repository.getConsorcioById(ownerId);
    const consorcista = consorcio.consorcistas.find(consorcista => consorcista.id === idConsorcista);

    // 1° set el voto en el array vts --> votosEmitidos del consorcista
    if (consorcista.votar(idVotacion, option, amountVt)) {
      // 2° abrir trusline y pagar al consorcista desde el consorcio
      await this.stellarService.makePayment(consorcio.account, consorcista.account, amountVt, option);
      // descontar asset al consorcio
      // ...
      // 3° guardar
      this.repository.updateConsorcio(consorcio);
      return consorcista.getSaldo(idVotacion);
    } else {
      console.log('no pudiste votar');
    }
  }

  async viewVotingResults(idVotacion, idConsorcio) {
    let countVotes = [];
    const votacion = this.repository.getVotingById(idVotacion);
    const { consorcistas } = this.repository.getConsorcioById(idConsorcio);

    const payments = await this.stellarService.getPayments(consorcistas.map(consorcista => consorcista.account));

    for (const option of votacion.getOptions()) {
      const votes = payments.filter(payment => payment.option === option)
        .map(payment => Number(payment.vt))
        .reduce((pv, cv) => pv + cv, 0);

      countVotes.push({ option, votes });
    }

    console.log("SUCCESS!");
    return countVotes;
  }

}
