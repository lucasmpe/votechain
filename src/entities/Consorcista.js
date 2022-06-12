export default class Consorcista {
/**
* @param {String} id
* @param {String} depto
* @param {Integer} vt
* @param {StellarAccount} account
* @param {Array<vt>} vts
*/

  constructor(id, depto, vt, account = null, vts = []) {
    this.id = id;
    this.depto = depto;
    this.vt = vt;
    this.account = account;
    this.vts = vts;
  }

  setStellarAccount(account) {
    this.account = account;
  }

  addvts () {};

  votar(Votacion, amount) {
    return true;
  }

}