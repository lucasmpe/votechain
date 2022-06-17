export default class Votacion {

  constructor(id, ownerId, details, subject, options, minVoters = 2, ending = "") {
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

  getOptionsWithDetails() {
    return this.options;
  };

  getSubject() {
    return this.subject;
  };

  getDetails() {
    return this.details;
  }

  getOwnerId() {
    return this.ownerId;
  };

  isActive() {
    return true;
    //es mayor a ending
  };

  showResults(IdVotacion) {

  };

}