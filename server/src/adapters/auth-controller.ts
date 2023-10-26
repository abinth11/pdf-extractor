import HttpStatusCodes from "../constants/http-status-codes";
import uCSignUp from "../application/use-cases/user-sign-up";
import AuthServiceInterface from "../application/services/auth-service-interface";
import AuthServiceImpl from "../frameworks/services/auth-service";
import UserRepoInterface from "../application/repositories/user-repo-interface";
import UserRepoImpl from "../frameworks/databases/mongodb/repositories/user-repo-impl";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";

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

    return {
        signUp
    }


}

export default authController