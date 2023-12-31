import UserRepoInterface from "../repositories/user-repo-interface";
import { sanitizeUser } from "../sanitize-data/user-sanitize";
import AuthServiceInterface from "../services/auth-service-interface";
import HttpStatusCodes from "../../constants/http-status-codes";
import AppError from "../../utils/app-error";

/**
 * Login a user in the system.
 * @param email - email of the user
 * @param password - password of the user
 * @param dbRepository - The database repository for data base functions.
 * @param authService - The authentication service contains functions for authentication.
 * @returns An object containing access tokens and user data.
 * @throws {AppError} - Throws an error if email,password are wrong or user does not exists.
 */
export const uCSignIn = async (
    email: string,
    password: string,
    dbRepository: ReturnType<UserRepoInterface>,
    authService: ReturnType<AuthServiceInterface>,
) => {
    if (!email) {
        throw new AppError("Invalid email, Please check your email", HttpStatusCodes.BAD_REQUEST)
    }
    if (!password) {
        throw new AppError("Please provide a valid password", HttpStatusCodes.BAD_REQUEST)
    }
    const user = await dbRepository.findByEmail(email);
    if (!user) {
        throw new AppError("This user doesn't exist, Please register", HttpStatusCodes.NOT_FOUND);
    }
    const isPasswordCorrect = await authService.comparePassword(password, user.password);
    if (!isPasswordCorrect) {
        throw new AppError(
            'Incorrect password, Re enter your password',
            HttpStatusCodes.UNAUTHORIZED
        );
    }
    const payload = {
        id: user?._id,
        email: user?.email,
    };
    const accessToken = authService.generateToken(payload);
    const refreshToken = authService.generateRefreshToken(payload);
    const userData = sanitizeUser(user);

    return { accessToken, refreshToken, user: userData };
};