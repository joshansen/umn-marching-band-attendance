function RecordNotFound() {
  Error.call(this);
  Error.captureStackTrace(this, RecordNotFound);
  this.name = 'RecordNotFound';
  this.message = 'Record Not Found';
}

RecordNotFound.prototype = Object.create(Error.prototype);

module.exports = {
  RecordNotFound: RecordNotFound
};