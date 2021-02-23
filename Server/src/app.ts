import 'reflect-metadata'; // this is to use typeDI
import express, { Application } from 'express';
import config from './config';

async function startServer() {
  // settings
  const app: Application = express();
  // loaders
  await require('./loaders').default({ expressApp: app });
  // server listen
  app.listen(config.port, () => console.log('server running'));
  
}

startServer();


