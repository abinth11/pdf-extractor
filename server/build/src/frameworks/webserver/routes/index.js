"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const pdf_handler_1 = __importDefault(require("./pdf-handler"));
const routes = (app, redisClient) => {
    app.use('/api/v1/auth', (0, auth_1.default)());
    app.use('/api/v1/pdf', (0, pdf_handler_1.default)(redisClient));
};
exports.default = routes;
