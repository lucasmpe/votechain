export default class Consorcio {
/**
 * @param {Number} id
 * @param {String} name
 * @param {StellarAccount} account
 * @param {Array<Consorcista>} consorcistas
 * @param {Array<Asset>} assets
 */

  constructor(id, name, account = null, consorcistas = [], assets = []) {
    this.id = id;
    this.name = name;
    this.account = account;
    this.consorcistas = consorcistas;
    this.assets = assets; 
  }

  setStellarAccount(account) {
    this.account = account;
  }

  addConsorcista(consorcista) {
    this.consorcistas.push(consorcista);
  }

  setAssets() {}

  orderAsset() {}

  distribute() {}

  post(votacion) {}

  showResults(votacion) {}

};