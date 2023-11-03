"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("../../constants/http-status-codes"));
const user_sign_up_1 = __importDefault(require("../../application/use-cases/user-sign-up"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_sign_in_1 = require("../../application/use-cases/user-sign-in");
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
const authController = (authServiceInterface, authServiceImpl, userRepoInterface, userRepoImpl) => {
    const authService = authServiceInterface(authServiceImpl());
    const dbRepositoryUser = userRepoInterface(userRepoImpl());
    const signUp = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userData = req.body;
        const response = yield (0, user_sign_up_1.default)(userData, dbRepositoryUser, authService);
        res.status(http_status_codes_1.default.CREATED).json({
            status: "success",
            message: "successfully created new user",
            data: response
        });
    }));
    const signIn = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const response = yield (0, user_sign_in_1.uCSignIn)(email, password, dbRepositoryUser, authService);
        res.status(http_status_codes_1.default.OK).json({
            status: "success",
            message: "successfully logged in",
            data: response
        });
    }));
    return {
        signUp,
        signIn
    };
};
exports.default = authController;
