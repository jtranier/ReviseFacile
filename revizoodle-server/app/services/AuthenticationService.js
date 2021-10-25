const uuidv4 = require('uuid');
const CryptoJs = require('crypto-js');
const userConfig = require('../config/user.config.js');

  isAuthenticated = (req) => {
    return uuidv4.validate(req.headers.uuid);
  }

  checkIsAuthenticated = (req, res, next) => {
    if(isAuthenticated(req)) {
      next();
    }
    else {
      res.status(403).json({
        error: {
          message: 'You are not authenticated',
        },
      });
    }
  }

  checkIsTeacher = (req, res, next) => {
    if(isTeacher(req)) {
      next();
    }
    else {
      res.sendStatus(401);
    }
  }
  
  isTeacher = (req) => {
    const uuid = req.headers.uuid;
    const teacherToken = req.headers.teachertoken;

    if(!teacherToken) {
      return false;
    }

    const bytes  = CryptoJs.AES.decrypt(teacherToken, userConfig.secretKey);

    return uuid === bytes.toString(CryptoJs.enc.Utf8);
  }

  getUUID = (req) => {
    return req.headers.uuid;
  }


module.exports = {
  isAuthenticated,
  checkIsAuthenticated,
  checkIsTeacher,
  isTeacher,
  getUUID,
};