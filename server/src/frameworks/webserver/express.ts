import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import { limiter } from './middlewares/rate-limiter';


const expressConfig = (app: Application) => {
  if (process.env.NODE_ENV?.trim()==='development') {
    app.use(morgan('dev'));
  }
  
  app.use((req, res, next) => {
    res.header('Access-Control-Expose-Headers', 'X-Total-Pages');
    next();
  });
  
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(limiter);
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        imgSrc: ["'self'", 'data:'],
        frameSrc: ["'self'", 'https:']
      }
    })
  );
  app.use(mongoSanitize());
};

export default expressConfig;