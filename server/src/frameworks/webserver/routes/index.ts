import { Application } from 'express';
import { RedisClient } from '../../../app';
import authRouter from './auth';
import pdfHandlerRoute from './pdf-handler';

const routes = (app: Application, redisClient: RedisClient) => {

    app.use('/api/v1/auth',authRouter())
    app.use('/api/v1/pdf',pdfHandlerRoute(redisClient))
};

export default routes;