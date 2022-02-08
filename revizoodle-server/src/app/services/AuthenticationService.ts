import * as express from "express"
import {validate} from 'uuid'
import CryptoJs from 'crypto-js'

const userConfig = require('../config/user.config.js');

  export const isAuthenticated = (req: express.Request) => {
    return typeof req.headers.uuid === 'string' && validate(req.headers.uuid);
  }

  export const checkIsAuthenticated =
    (req: express.Request, res: express.Response, next: () => void) => {
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

  export const checkIsTeacher =
    (req: express.Request, res: express.Response, next: () => void) => {
    if(isTeacher(req)) {
      next();
    }
    else {
      res.sendStatus(401);
    }
  }
  export const isTeacher = (req: express.Request) => {
    const uuid = req.headers.uuid;
    const teacherToken = req.headers.teachertoken;

    if(typeof teacherToken !== 'string') {
      return false;
    }

    const bytes  = CryptoJs.AES.decrypt(teacherToken, userConfig.secretKey);

    return uuid === bytes.toString(CryptoJs.enc.Utf8);
  }

  export const getUUID = (req: express.Request): string => {
    const uuid = req.headers.uuid;
    switch (typeof uuid) {
      case 'undefined': return '';
      case 'string': return uuid;
      default: return uuid[0];
    }
  }