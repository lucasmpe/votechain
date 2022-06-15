export default class Consorcio {
/**
 * @param {Number} id
 * @param {String} name
 * @param {StellarAccount} account
 * @param {Array<Consorcista>} consorcistas
 * @param {Array<Asset>} assets
 * @param {Array<Votacion>} votaciones
 */

  constructor(id, name, account = null, consorcistas = [], assets = [], votaciones = []) {
    this.id = id;
    this.name = name;
    this.account = account;
    this.consorcistas = consorcistas;
    this.assets = assets;
    this.votaciones = votaciones;
  }

  getId() {
    return this.id;
  }

  setStellarAccount(account) {
    this.account = account;
  }

  addConsorcista(consorcista) {
    this.consorcistas.push(consorcista);
  }

  getTotalVts() {
    return this.consorcistas.map(consorcista => Number(consorcista.vt)).reduce((pv, cv) => pv + cv, 0);
  }
  // [{Vot1Op1: xxx}, {Vot1Op2: xxx}, ..., {Vot2Op1}, ...] xxx = vtTotales
  addAsset(assetCode, amount) {
    this.assets.push({assetCode, amount}); // [{assetCode: valor, amount: valor}]
  }

  addVotacion(votacion) {}

  distribute() {}

  post(votacion) {}

  showResults(votacion) {}

};