const uuidv4 = require('uuid');

class AuthenticationService {

  isAuthenticated(req) {
    return uuidv4.validate(req.headers.uuid);
  }
}

module.exports = new AuthenticationService();