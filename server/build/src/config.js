"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
if (process.env.NODE_ENV === "development") {
    dotenv_1.default.config({ path: path_1.default.join(__dirname, `..`, `.env.development`) });
}
else {
    dotenv_1.default.config({ path: path_1.default.join(__dirname, `..`, `.env.production`) });
}
const ENVIRONMENT_VARIABLES = {
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    REDIS_URL: process.env.REDIS_URL
};
exports.default = ENVIRONMENT_VARIABLES;
