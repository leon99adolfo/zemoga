import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
//import './events';

export default async ({ expressApp }) => {

  await dependencyInjectorLoader();
  await expressLoader({ app: expressApp });
};
