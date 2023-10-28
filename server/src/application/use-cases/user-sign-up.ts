import User from "../../entities/user";
import UserRepoInterface from "../repositories/user-repo-interface";
import HttpStatusCodes from "../../constants/http-status-codes";
import AppError from "../../utils/app-error";
import AuthServiceInterface  from "../services/auth-service-interface";
import { sanitizeUser } from "../sanitize-data/user-sanitize";
import { validateUser } from "../validators";

/**
 * Registers a new user in the system.
 * @param user - The user object containing registration details.
 * @param dbRepository - The database repository for user data.
 * @param authService - The authentication service.
 * @returns An object containing access tokens and user data.
 * @throws {AppError} - Throws an error if a user with the same email already exists or validation fails.
 */
const uCSignUp = async (user: User, dbRepository: ReturnType<UserRepoInterface>, authService: ReturnType<AuthServiceInterface>) => {
    const alreadyRegistered = await dbRepository.findByEmail(user.email);

    if (alreadyRegistered) {
        throw new AppError("User with the same email already exists..,Please login", HttpStatusCodes.CONFLICT);
    }

    const newUser = new User(validateUser(user));
    if (newUser.password) {
        newUser.password = await authService.hashPassword(newUser.password);
    }
    const response = await dbRepository.add(newUser);

    const payload = {
        id: response._id,
        email: response.email
    };
    const accessToken = authService.generateToken(payload);
    const refreshToken = authService.generateRefreshToken(payload);
    const userData = sanitizeUser(response);

    return {
        accessToken,
        refreshToken,
        user: userData
    };
};

export default uCSignUp;
