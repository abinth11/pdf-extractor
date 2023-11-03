"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_error_1 = __importDefault(require("../../../utils/app-error"));
const http_status_codes_1 = __importDefault(require("../../../constants/http-status-codes"));
const auth_service_interface_1 = require("../../../application/services/auth-service-interface");
const auth_service_1 = require("../../../frameworks/services/auth-service");
const verifyToken = (req, res, next) => {
    let token = '';
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        throw new app_error_1.default('Token not found', http_status_codes_1.default.UNAUTHORIZED);
    }
    try {
        const authInstance = (0, auth_service_interface_1.authServiceInterface)((0, auth_service_1.authService)());
        const { payload } = authInstance.verifyToken(token);
        req.userId = payload.id;
        next();
    }
    catch (err) {
        throw new app_error_1.default('Access forbidden, Access token has expired', http_status_codes_1.default.FORBIDDEN);
    }
};
exports.default = verifyToken;
