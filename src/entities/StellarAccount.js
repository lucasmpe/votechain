export default class StellarAccount {
  /**
   * @param {String} id
   * @param {String} publicKey
   * @param {String} secret
   */

  constructor(id, publicKey, secret) {
    this.id = id;
    this.publicKey = publicKey;
    this.secret = secret;
  }
}