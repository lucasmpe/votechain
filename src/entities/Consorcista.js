export default class Consorcista {
/**
* @param {String} id
* @param {String} depto
* @param {Integer} peso
* @param {StellarAccount} account
* @param {Array<Asset>} assets
*/

  constructor(id, depto, peso, account = null, assets = []) {
    this.id = id;
    this.depto = depto;
    this.peso = peso;
    this.account = account;
    this.assets = assets;
  }

  setStellarAccount(account) {
    this.account = account;
  }

  addAssets () {};

  votar(Votacion, amount) {
    return true;
  }

}