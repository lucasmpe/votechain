import VotacionService from '../services/VotacionService.js'
export default class ConsorcistaController {

    constructor() {
        // votacio service  
    }

    viewVoting(req, res) {
        try {
            const {
                idVotacion,
                id: idConsorcista
            } = req.params;

            const votacionService = new VotacionService();
            const dataVotacion = votacionService.viewVoting(idVotacion, idConsorcista);

            res.send(`Estás viendo la votación con id ${dataVotacion.id}`)
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
            const dataVotacion = await votacionService.create(id, ownerId, details, subject, options, minVoters, ending);

            res.send(`se creó votacion ${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    async vote(req, res) {
        try {
            const {
                idVotacion,
                id: idConsorcista
            } = req.params;

            const {
                option,
                amountVt
            } = req.body;

            const votacionService = new VotacionService();
            const saldo = await votacionService.vote(idVotacion, idConsorcista, option, amountVt);

            res.send(`Tu voto fue registrado correctamente. Te quedan de saldo ${saldo}`)
        } catch (error) {
            console.log(error);
        }
    };

}
