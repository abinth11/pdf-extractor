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
const user_1 = __importDefault(require("../../entities/user"));
const http_status_codes_1 = __importDefault(require("../../constants/http-status-codes"));
const app_error_1 = __importDefault(require("../../utils/app-error"));
const user_sanitize_1 = require("../sanitize-data/user-sanitize");
const validators_1 = require("../validators");
/**
 * Registers a new user in the system.
 * @param user - The user object containing registration details.
 * @param dbRepository - The database repository for user data.
 * @param authService - The authentication service.
 * @returns An object containing access tokens and user data.
 * @throws {AppError} - Throws an error if a user with the same email already exists or validation fails.
 */
const uCSignUp = (user, dbRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const alreadyRegistered = yield dbRepository.findByEmail(user.email);
    if (alreadyRegistered) {
        throw new app_error_1.default("User with the same email already exists..,Please login", http_status_codes_1.default.CONFLICT);
    }
    const newUser = new user_1.default((0, validators_1.validateUser)(user));
    if (newUser.password) {
        newUser.password = yield authService.hashPassword(newUser.password);
    }
    const response = yield dbRepository.add(newUser);
    const payload = {
        id: response._id,
        email: response.email
    };
    const accessToken = authService.generateToken(payload);
    const refreshToken = authService.generateRefreshToken(payload);
    const userData = (0, user_sanitize_1.sanitizeUser)(response);
    return {
        accessToken,
        refreshToken,
        user: userData
    };
});
exports.default = uCSignUp;
