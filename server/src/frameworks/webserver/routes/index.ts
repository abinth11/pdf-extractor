import { Application } from 'express';
import { RedisClient } from '../../../app';
import authRouter from './auth';

const routes = (app: Application, redisClient: RedisClient) => {

    app.use('/api/v1/auth',authRouter())
  

};

export default routes;