import fs from 'fs';
import Consorcio from '../entities/Consorcio.js';

export default class Repository {


    getConsorcios() {

    }

    getConsorcioById(id) {
        const consorcios = JSON.parse(fs.readFileSync(process.cwd() + '/repository/consorcios.json'));
        const {
            name,
            account,
            consorcistas
        } = consorcios.find(consorcio => consorcio.id === id);

        return new Consorcio(id, name, account, consorcistas);

    }

    saveConsorcio(consorcio) {

        try {

            //const consorcios = JSON.parse(fs.readFileSync(consorcioFile));
            const consorcios = JSON.parse(fs.readFileSync(process.cwd() + '/repository/consorcios.json'));

            // validar el id antes de fondear las cuentas

            consorcios.push(consorcio);

            fs.writeFileSync(process.cwd() + '/repository/consorcios.json', JSON.stringify(consorcios));
            console.log('The consorcio was appended to file!');

        } catch (error) {
            console.log(error)
        }
    }
}