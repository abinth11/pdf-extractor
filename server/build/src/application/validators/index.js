"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const http_status_codes_1 = __importDefault(require("../../constants/http-status-codes"));
const app_error_1 = __importDefault(require("../../utils/app-error"));
const validate_1 = require("./validate");
const validateUser = (user) => {
    if (!(0, validate_1.validateEmail)(user.email)) {
        throw new app_error_1.default("Invalid email address, Enter a valid email address", http_status_codes_1.default.BAD_REQUEST);
    }
    if (!(0, validate_1.validateName)(user.name)) {
        throw new app_error_1.default("Invalid name, Enter a valid name", http_status_codes_1.default.BAD_REQUEST);
    }
    if (!(0, validate_1.validatePassword)(user.password)) {
        throw new app_error_1.default("Password must include at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.", http_status_codes_1.default.BAD_REQUEST);
    }
    return user;
};
exports.validateUser = validateUser;
