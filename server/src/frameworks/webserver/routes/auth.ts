import authController from "../../../adapters/controllers/auth-controller";
import express from 'express'
import { authService } from "../../../frameworks/services/auth-service";
import { authServiceInterface } from "../../../application/services/auth-service-interface";
import { userRepoInterface } from "../../../application/repositories/user-repo-interface";
import { userRepoImpl } from "../../../frameworks/databases/mongodb/repositories/user-repo-impl";
import { loginLimiter } from "../middlewares/rate-limiter";

const authRouter = () =>{

    const controller = authController(authServiceInterface,authService,userRepoInterface,userRepoImpl)
    const router = express.Router()
    router.use(loginLimiter)
    router.post('/sign-up',controller.signUp)
    router.post('/sign-in',controller.signIn)

    return router
}

export default authRouter