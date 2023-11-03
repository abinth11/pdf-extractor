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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServiceInterface = void 0;
const authServiceInterface = (service) => {
    const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () { return yield service.hashPassword(password); });
    const comparePassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () { return yield service.comparePassword(password, hashedPassword); });
    const generateToken = (payload) => service.generateToken(payload);
    const generateRefreshToken = (payload) => service.generateRefreshToken(payload);
    const decodeToken = (token) => service.decodeToken(token);
    const verifyToken = (token) => service.verifyToken(token);
    return {
        hashPassword,
        comparePassword,
        generateToken,
        generateRefreshToken,
        decodeToken,
        verifyToken,
    };
};
exports.authServiceInterface = authServiceInterface;
