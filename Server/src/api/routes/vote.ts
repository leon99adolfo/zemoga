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

}