import ConsorcioService from '../services/ConsorcioService.js'

export default class ConsorcioController {

    constructor() {
      //HOLA?? Alguien me escucha? no se escucha Te llame por cel//
        //this.consorcioService = new ConsorcioService(); 
        //console.log('type consorcioService', typeof(this.consorcioService.create));
    }

    async create() {
        try {
            const dataConsorcio = { name: 'Consorcio1', consorcistas: [{depto: '1A', vt: 100}, {depto: '1B', vt: 180}]}
            const consorcio = new ConsorcioService();
            await consorcio.create(dataConsorcio);
            console.log('reg exitoso')
            // res.send(`se creó consorcio con id ${consorcio.id}`)
        } catch (error) {
            console.log(error);
        }
    };

}


