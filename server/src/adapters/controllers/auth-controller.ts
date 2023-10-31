import HttpStatusCodes from "../../constants/http-status-codes";
import uCSignUp from "../../application/use-cases/user-sign-up";
import AuthServiceInterface from "../../application/services/auth-service-interface";
import AuthServiceImpl from "../../frameworks/services/auth-service";
import UserRepoInterface from "../../application/repositories/user-repo-interface";
import UserRepoImpl from "../../frameworks/databases/mongodb/repositories/user-repo-impl";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { uCSignIn } from "../../application/use-cases/user-sign-in";

/**
 * Creates an instance of an authentication controller with provided interfaces and implementations.
 * This controller handles user authentication operations such as user registration and sign-in.
 *
 * @param authServiceInterface - Interface for the authentication service.
 * @param authServiceImpl - Implementation of the authentication service.
 * @param userRepoInterface - Interface for the user repository.
 * @param userRepoImpl - Implementation of the user repository.
 * @returns An authentication controller instance with sign-up and sign-in methods.
 */
const authController = (
    authServiceInterface: AuthServiceInterface,
    authServiceImpl: AuthServiceImpl,
    userRepoInterface: UserRepoInterface,
    userRepoImpl: UserRepoImpl) => {

    const authService = authServiceInterface(authServiceImpl())
    const dbRepositoryUser = userRepoInterface(userRepoImpl())

    const signUp = expressAsyncHandler(async (req: Request, res: Response) => {
        const userData = req.body
        const response = await uCSignUp(userData, dbRepositoryUser, authService)
        res.status(HttpStatusCodes.CREATED).json({
            status: "success",
            message: "successfully created new user",
            data: response
        })
    })

    const signIn = expressAsyncHandler(async (req: Request, res: Response) => {
        const { email, password } = req.body
        const response = await uCSignIn(email, password, dbRepositoryUser, authService)
        res.status(HttpStatusCodes.OK).json({
            status: "success",
            message: "successfully logged in",
            data: response
        })
    })

    return {
        signUp,
        signIn
    }
}

export default authController