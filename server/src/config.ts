import dotenv from 'dotenv';
dotenv.config();

const  ENVIRONMENT_VARIABLES = {

  DB_URL: process.env.DB_URL as string,

  PORT: process.env.PORT as string,

  NODE_ENV: process.env.NODE_ENV as string,
 
  DB_NAME: process.env.DB_NAME as string,

  JWT_SECRET: process.env.JWT_SECRET as string,

  JWT_REFRESH_SECRET:process.env.JWT_REFRESH_SECRET as string,

  REDIS_URL:process.env.REDIS_URL as string

};

export default ENVIRONMENT_VARIABLES;