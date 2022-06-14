export default class Votacion {

  constructor(id, ownerId, details, subject, options, minVoters, ending) {
    this.id = id;
    this.ownerId = ownerId;
    this.details = details;
    this.subject = subject;
    this.options = options;
    this.minVoters = minVoters;
    this.ending = ending;
  };

  getId() {
    return this.id;
  };

  getOptions() {
    return this.options.map(option => option.option);
  };

  getOwnerId() {
    return this.ownerId;
  };

  isActive() {
    //es mayor a ending
  };

  showResults(IdVotacion) {

  };

}