import ConsorcioService from '../services/ConsorcioService.js'

export default class ConsorcioController {

    constructor() {
        //this.consorcioService = new ConsorcioService(); 
       
    }

    async create(req, res) {
        try {
            const {
                name,
                consorcistas
            } = req.body;
            
            const consorcioService = new ConsorcioService();
            await consorcioService.create(name, consorcistas);

            console.log('reg exitoso')
            res.send(`se creó consorcio ${name}`)
        } catch (error) {
            console.log(error);
        }
    };

    async createVoting(req, res) {
        try {
            const {
                id,
                ownerId,
                details,
                subject,
                options,
                minVoters,
                ending,
            } = req.body;
            
            const votacionService = new VotacionService();
            await votacionService.create(id, ownerId, details, subject, options, minVoters, ending);

            
            res.send(`se creó votacion ${id}`)
        } catch (error) {
            console.log(error);
        }
    };


}


