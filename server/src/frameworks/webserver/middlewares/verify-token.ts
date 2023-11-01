import { NextFunction, Response } from 'express';
import AppError from '../../../utils/app-error';
import HttpStatusCodes from '../../../constants/http-status-codes';
import { CustomRequest } from '../../../types/user';
import { authServiceInterface } from '../../../application/services/auth-service-interface';
import { authService } from '../../../frameworks/services/auth-service';
import { JwtPayload } from 'jsonwebtoken';


const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let token: string | null = '';
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    throw new AppError('Token not found', HttpStatusCodes.UNAUTHORIZED);
  }
  try {
    const authInstance = authServiceInterface(authService())
    const { payload } = authInstance.verifyToken(token) as JwtPayload

    req.userId = payload.id;
    next();
  } catch (err) {
    throw new AppError('Access forbidden, Access token has expired', HttpStatusCodes.FORBIDDEN);
  }
};

export default verifyToken;