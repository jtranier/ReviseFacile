const authenticationService = require('../services/AuthenticationService');
const userConfig = require('../config/user.config.js');
const CryptoJs = require('crypto-js');

exports.requestTeacherAccess = (req, res) => {

  if (req.body.password === userConfig.teacherPassword) {
    res.json({
      success: true,
      teacherToken: CryptoJs.AES.encrypt(
          authenticationService.getUUID(req),
          userConfig.secretKey,
      ).toString(),
    });
  } else {
    res.status(403).json({error: {message: 'Mot de passe invalide !'}});
  }
};

exports.isTeacher = (req, res) => {
  res.json({
    isTeacher: authenticationService.isTeacher(req)
  });
}
