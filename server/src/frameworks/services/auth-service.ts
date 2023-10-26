import jwt,{JwtPayload} from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import ENVIRONMENT_VARIABLES from '../../config';
export const authService = () => {

  const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };

  const comparePassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
  };

  const generateToken = (payload: JwtPayload) => {
    const token = jwt.sign({ payload }, ENVIRONMENT_VARIABLES.JWT_SECRET, {
      expiresIn: '30m'
    });
    return token; 
  };

  const generateRefreshToken = (payload: JwtPayload) => {
    const token = jwt.sign({ payload }, ENVIRONMENT_VARIABLES.JWT_REFRESH_SECRET, {
      expiresIn: '1d'
    });
    return token;
  };

  const verifyToken = (token: string) => {
    return jwt.verify(token, ENVIRONMENT_VARIABLES.JWT_SECRET);
  }; 

  const decodeToken = (token:string)=>{
    const decodedToken: jwt.JwtPayload | null = jwt.decode(token) as jwt.JwtPayload | null;
    return decodedToken
  }

  return {
    comparePassword,
    generateToken,
    generateRefreshToken,
    hashPassword,
    decodeToken,
    verifyToken,
  };
};

export type AuthService = ReturnType<typeof authService>;