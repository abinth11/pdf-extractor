import { JwtPayload } from 'jsonwebtoken';
import AuthServiceImpl from '@src/frameworks/services/auth-service';

export const authServiceInterface = (service: ReturnType<AuthServiceImpl>) => {

  const hashPassword = async(password: string) => await service.hashPassword(password);

  const comparePassword = async(password: string, hashedPassword: string) =>await service.comparePassword(password, hashedPassword);

  const generateToken = (payload: JwtPayload) => service.generateToken(payload);

  const generateRefreshToken = (payload: JwtPayload) => service.generateRefreshToken(payload);

  const decodeToken = (token:string) => service.decodeToken(token)

  const verifyToken = (token:string) => service.verifyToken(token)


  return {
    hashPassword,
    comparePassword,
    generateToken,
    generateRefreshToken,
    decodeToken,
    verifyToken,
  };
};

type AuthServiceInterface = typeof authServiceInterface

export default AuthServiceInterface