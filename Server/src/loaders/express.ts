import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from '../api';
import config from '../config';
import cors from 'cors';

export default ({ app }: { app: express.Application }) => {
  
  app.get('/status', (req, res) => res.status(200).end());
  app.head('/status', (req, res) => res.status(200).end());
  //app.enable('trust proxy');

  app.use(cors());
  //app.options('*', cors());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  // Load API routes
  app.use(config.api.prefix, apiRoutes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
