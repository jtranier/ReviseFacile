import uuidv4 from 'uuid'
import CryptoJs from 'crypto-js'

const userConfig = require('../config/user.config.js');

  const isAuthenticated = (req) => {
    return uuidv4.validate(req.headers.uuid);
  }

  const checkIsAuthenticated = (req, res, next) => {
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

  const checkIsTeacher = (req, res, next) => {
    if(isTeacher(req)) {
      next();
    }
    else {
      res.sendStatus(401);
    }
  }
  
  const isTeacher = (req) => {
    const uuid = req.headers.uuid;
    const teacherToken = req.headers.teachertoken;

    if(!teacherToken) {
      return false;
    }

    const bytes  = CryptoJs.AES.decrypt(teacherToken, userConfig.secretKey);

    return uuid === bytes.toString(CryptoJs.enc.Utf8);
  }

  const getUUID = (req) => {
    return req.headers.uuid;
  }


module.exports = {
  isAuthenticated,
  checkIsAuthenticated,
  checkIsTeacher,
  isTeacher,
  getUUID,
};