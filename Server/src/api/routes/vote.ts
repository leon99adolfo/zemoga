import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import VoteService from '../../services/voteService';

const route = Router();

export default (app: Router) => {
  app.use('/vote', route);

  route.post('/newVote', async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    // logger
    const _logger: Logger = Container.get('logger');
    _logger.info('Start vote.newVote');

    try {
      const _voteService = Container.get(VoteService);
      const objUser = _voteService.vote(body.user, body.candidateId, body.isFavorVote);
      //console.log(result);
      _logger.info('Final vote.newVote')
      return res.json(objUser).status(200);
    }
    catch(e){
      _logger.error('Error vote.newVote: ', e);
      return next(e);
    }
  });


  route.get('/votesByuser', async (req: Request, res: Response, next: NextFunction) => {
    // logger
    const _logger: Logger = Container.get('logger');
    _logger.info('Start vote.votesByuser');

    try {
      const _voteService = Container.get(VoteService);
      let result = _voteService.getVotesByUser();

      _logger.info('Final vote.votesByuser')
      return res.json(result).status(200);
    }
    catch(e){
      _logger.error('Error vote.votesByuser: ', e);
      return next(e);
    }
  });
}