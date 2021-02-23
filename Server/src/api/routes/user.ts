import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import UserService from '../../services/userService';

const route = Router();

export default (app: Router) => {
  app.use('/user', route);

  route.get('', async (req: Request, res: Response, next: NextFunction) => {
    // logger
    const _logger: Logger = Container.get('logger');
    _logger.info('Start user.get');

    try {
      const _userService = Container.get(UserService);
      let result = _userService.getUsers();

      _logger.info('Final user.get')
      return res.json(result).status(200);
    }
    catch(e){
      _logger.error('Error user.get: ', e);
      return next(e);
    }
  });

  route.get('/:user', async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params;
    // logger
    const _logger: Logger = Container.get('logger');
    _logger.info('Start user.get');

    try {
      const _userService = Container.get(UserService);
      let result = _userService.getUserByUsername(params.user);
      
      _logger.info('Final user.get')
      return res.json(result).status(200);
    }
    catch(e){
      _logger.error('Error user.get: ', e);
      return next(e);
    }
  });

  route.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    // logger
    const _logger: Logger = Container.get('logger');
    _logger.info('Start user.create');

    try {
      const _userService = Container.get(UserService);
      let objUser = _userService.addUser(body);
      //console.log(result);
      _logger.info('Final user.create')
      return res.json(objUser).status(200);
    }
    catch(e){
      _logger.error('Error user.create: ', e);
      return next(e);
    }
  });

  route.post('/update', async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    // logger
    const _logger: Logger = Container.get('logger');
    _logger.info('Start user.update');

    try {
      const _userService = Container.get(UserService);
      let objUser = _userService.updUser(body);
      //console.log(result);
      _logger.info('Final user.update')
      return res.json(objUser).status(200);
    }
    catch(e){
      _logger.error('Error user.update: ', e);
      return next(e);
    }
  });

  route.post('/delete', async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    // logger
    const _logger: Logger = Container.get('logger');
    _logger.info('Start user.delete');

    try {
      const _userService = Container.get(UserService);
      _userService.delUser(body.user);
      //console.log(result);
      _logger.info('Final user.delete')
      return res.json(true).status(200);
    }
    catch(e){
      _logger.error('Error user.delete: ', e);
      return next(e);
    }
  });

}