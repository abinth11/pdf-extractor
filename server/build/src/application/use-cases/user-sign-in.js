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
exports.uCSignIn = void 0;
const user_sanitize_1 = require("../sanitize-data/user-sanitize");
const http_status_codes_1 = __importDefault(require("../../constants/http-status-codes"));
const app_error_1 = __importDefault(require("../../utils/app-error"));
/**
 * Login a user in the system.
 * @param email - email of the user
 * @param password - password of the user
 * @param dbRepository - The database repository for data base functions.
 * @param authService - The authentication service contains functions for authentication.
 * @returns An object containing access tokens and user data.
 * @throws {AppError} - Throws an error if email,password are wrong or user does not exists.
 */
const uCSignIn = (email, password, dbRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email) {
        throw new app_error_1.default("Invalid email, Please check your email", http_status_codes_1.default.BAD_REQUEST);
    }
    if (!password) {
        throw new app_error_1.default("Please provide a valid password", http_status_codes_1.default.BAD_REQUEST);
    }
    const user = yield dbRepository.findByEmail(email);
    if (!user) {
        throw new app_error_1.default("This user doesn't exist, Please register", http_status_codes_1.default.NOT_FOUND);
    }
    const isPasswordCorrect = yield authService.comparePassword(password, user.password);
    if (!isPasswordCorrect) {
        throw new app_error_1.default('Incorrect password, Re enter your password', http_status_codes_1.default.UNAUTHORIZED);
    }
    const payload = {
        id: user === null || user === void 0 ? void 0 : user._id,
        email: user === null || user === void 0 ? void 0 : user.email,
    };
    const accessToken = authService.generateToken(payload);
    const refreshToken = authService.generateRefreshToken(payload);
    const userData = (0, user_sanitize_1.sanitizeUser)(user);
    return { accessToken, refreshToken, user: userData };
});
exports.uCSignIn = uCSignIn;
