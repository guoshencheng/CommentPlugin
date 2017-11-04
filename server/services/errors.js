const NoAuthError = function() {
  this.message = "this operation need login"
  this.name = "NoAuthError";
  this.stack = (new Error()).stack;
}
NoAuthError.prototype.constructor = Error.prototype.constructor;

const UserNotFound = function(id) {
  this.message = `user with id ${id} is not found`;
  this.name = "UserNotFound";
  this.stack = (new Error()).stack;
}


module.exports = {
  NoAuthError, UserNotFound
}
