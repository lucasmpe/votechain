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
  };

  setStellarAccount(account) {
    this.account = account;
  };

  addVts(vtForVoting) {
    this.vts.push(vtForVoting); // vts = [ {votacion: 1, votosEmitidos: [ {option: VOTOP1, vt: 10}, ...] }, ...]
  };

  getVt() {
    return this.vt;
  };

  votar(idVotacion, option, amount) {

    if (amount > this.vt - this.getVotosEmitidos(idVotacion)) return false;

    const votacion = this.vts.find(votacion => votacion.votacion === idVotacion);
    const indexVotacion = this.vts.findIndex(votaciones => votaciones.votacion === idVotacion);
    
    if (votacion.votosEmitidos.find(voto => voto.option === option) === undefined) {
      votacion.votosEmitidos.push({option, vt: amount});
      this.vts.splice(indexVotacion, 1, votacion);
      return true;
    } // falta el control de no poder votar más de una vez la misma opción
    
    return false
  };

  getVotosEmitidos(idVotacion) {
    const votacion = this.vts.find(votacion => votacion.votacion === Number(idVotacion));
    return votacion.votosEmitidos.length === 0
      ? 0 
      : votacion.votosEmitidos.map(votosEmitidos => Number(votosEmitidos.vt)).reduce((pv, cv) => pv + cv, 0);
  };

  getSaldo(idVotacion) {
    return this.getVt() - this.getVotosEmitidos(idVotacion)
  };

}