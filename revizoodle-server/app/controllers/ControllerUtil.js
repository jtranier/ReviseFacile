const authenticationService = require('../services/AuthenticationService');

class ControllerUtil {

  checkIsAuthenticated(req, res) {
    if(authenticationService.isAuthenticated(req))
      return true;
    else {
      res.status(403).json({
        error: {
          message: 'You are not authenticated',
        },
      });
      return false;
    }
  }

}

module.exports = new ControllerUtil();