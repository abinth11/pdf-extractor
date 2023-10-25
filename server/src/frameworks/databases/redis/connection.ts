import ENVIRONMENT_VARIABLES from '../../../config';
import { createClient } from 'redis'

const redisConnect = () => {
  const createRedisClient = () => {
    const client = createClient({
      url:ENVIRONMENT_VARIABLES.REDIS_URL ,
    })
    // const client = createClient();
    client.on('error', err => console.log('Redis Client Error', err));
    client.connect().then(()=>{
      console.log("Redis connected successfully".bgRed.bold)
    }).catch((err)=>{
      console.log(err)
    })
    return client
    
  };

  return {
    createRedisClient
  };
}

export default redisConnect