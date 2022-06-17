import fs from 'fs';
import Consorcio from '../entities/Consorcio.js';
import Consorcista from '../entities/Consorcista.js';
import Votacion from '../entities/Votacion.js';

export default class Repository {

  getAllConsorcios() {};

  getConsorcioById(id) {
    const consorcios = JSON.parse(fs.readFileSync(process.cwd() + '/repository/consorcios.json'));
    const {
      name,
      account,
      consorcistas,
      assets,
      votaciones
    } = consorcios.find(consorcio => consorcio.id === Number(id));

    let auxConsorcistas = [];

    for (const consorcista of consorcistas) {
      const {
        id: idConsorcista,
        depto,
        vt,
        account,
        vts
      } = consorcista;
      auxConsorcistas.push(new Consorcista(idConsorcista, depto, vt, account, vts));
    }

    return new Consorcio(Number(id), name, account, auxConsorcistas, assets, votaciones);
  };

  saveConsorcio(consorcio) {
    try {
      const consorcios = JSON.parse(fs.readFileSync(process.cwd() + '/repository/consorcios.json'));
      consorcios.push(consorcio);

      fs.writeFileSync(process.cwd() + '/repository/consorcios.json', JSON.stringify(consorcios));
      console.log('The consorcio was saved to file!');
    } catch (error) {
      console.log(error)
    }
  };

  updateConsorcio(consorcio) {
    try {
      const consorcios = JSON.parse(fs.readFileSync(process.cwd() + '/repository/consorcios.json'));
      const indexConsorcio = consorcios.findIndex(elem => elem.id === consorcio.getId());
      consorcios.splice(indexConsorcio, 1, consorcio);

      fs.writeFileSync(process.cwd() + '/repository/consorcios.json', JSON.stringify(consorcios));
      console.log('The consorcio was updated to file!');
    } catch (error) {
      console.log(error)
    }
  };

  saveVoting(votacion) {
    try {
      const votings = JSON.parse(fs.readFileSync(process.cwd() + '/repository/votaciones.json'));

      votings.push(votacion);

      fs.writeFileSync(process.cwd() + '/repository/votaciones.json', JSON.stringify(votings));
      console.log('The voting was appended to file!');
    } catch (error) {
      console.log(error)
    }
  };

  getVotingById(id) {
    try {
      const votaciones = JSON.parse(fs.readFileSync(process.cwd() + '/repository/votaciones.json'));

      const {
        ownerId,
        details,
        subject,
        options,
        minVoters,
        ending
      } = votaciones.find(votacion => votacion.id === Number(id));

      return new Votacion(Number(id), Number(ownerId), details, subject, options, minVoters, ending);
    } catch (error) {
      console.log(error)
    }
  };

  getConsorcistaById(idConsorcio, idConsorcista) {
    const { consorcistas } = this.getConsorcioById(idConsorcio);

    const {
      id,
      depto,
      vt,
      account,
      vts
    } = consorcistas.find(consorcista => consorcista.id === idConsorcista);

    return new Consorcista(id, depto, vt, account, vts);
  };

}