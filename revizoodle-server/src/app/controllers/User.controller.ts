import * as express from "express"
import * as AuthenticationService from '../services/AuthenticationService'
import CryptoJs from 'crypto-js'

const userConfig = require('../config/user.config.js');

exports.requestTeacherAccess = (req: express.Request, res: express.Response) => {

  if (req.body.password === userConfig.teacherPassword) {
    res.json({
      success: true,
      teacherToken: CryptoJs.AES.encrypt(
          AuthenticationService.getUUID(req),
          userConfig.secretKey,
      ).toString(),
    });
  } else {
    res.status(403).json({error: {message: 'Mot de passe invalide !'}});
  }
};

exports.isTeacher = (req: express.Request, res: express.Response) => {
  res.json({
    isTeacher: AuthenticationService.isTeacher(req)
  });
}
