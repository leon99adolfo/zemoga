import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import UserService from '../../services/userService';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  route.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    // logger
    const _logger: Logger = Container.get('logger');
    _logger.info('Start auth.login');

    try {
      const _userService = Container.get(UserService);
      const objUser = _userService.getUserBylogin(body.user, body.pwd);
      //console.log(result);
      _logger.info('Final auth.login')
      return res.json(objUser).status(200);
    }
    catch(e){
      _logger.error('Error auth.login: ', e);
      return next(e);
    }
  });


  route.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    // logger
    const _logger: Logger = Container.get('logger');
    _logger.info('Start auth.register');

    try {
      const _userService = Container.get(UserService);
      _userService.addUser(body);
      _logger.info('Final auth.register')
      return res.json({ result: true }).status(200);
    }
    catch(e){
      _logger.error('Error auth.register: ', e);
      return next(e);
    }
  });

};
