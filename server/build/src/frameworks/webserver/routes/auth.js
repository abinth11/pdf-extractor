"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = __importDefault(require("../../../adapters/controllers/auth-controller"));
const express_1 = __importDefault(require("express"));
const auth_service_1 = require("../../../frameworks/services/auth-service");
const auth_service_interface_1 = require("../../../application/services/auth-service-interface");
const user_repo_interface_1 = require("../../../application/repositories/user-repo-interface");
const user_repo_impl_1 = require("../../../frameworks/databases/mongodb/repositories/user-repo-impl");
const rate_limiter_1 = require("../middlewares/rate-limiter");
const authRouter = () => {
    const controller = (0, auth_controller_1.default)(auth_service_interface_1.authServiceInterface, auth_service_1.authService, user_repo_interface_1.userRepoInterface, user_repo_impl_1.userRepoImpl);
    const router = express_1.default.Router();
    router.use('/sign-in', rate_limiter_1.loginLimiter);
    router.post('/sign-up', controller.signUp);
    router.post('/sign-in', controller.signIn);
    return router;
};
exports.default = authRouter;
