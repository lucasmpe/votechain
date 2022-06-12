export default class Votacion {

    constructor(id, ownerId, details, subject, options, minVoters, ending) {
        this.id = id;
        this.ownerId = ownerId;
        this.details = details;
        this.subject = subject;
        this.options = options;
        this.minVoters = minVoters;
        this.created = new Date().toLocaleString;
        this.ending = ending;
    }

    getOptions() {
        return this.options.map(option => option.option);
    }

    isActive() {
        //es mayor a ending
    }

}