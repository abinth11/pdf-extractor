import { NextFunction, Response } from 'express';
import { RedisClient } from '../../../app';
import { CustomRequest } from '../../../types/user';

export function cachingMiddleware(redisClient: RedisClient) {
  return async function (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    const key = req.userId as string
    const data = await redisClient.get(key);
    if (!data) {
      return next();
    } else {
      res.json({ data: JSON.parse(data) });
    }
  };
}