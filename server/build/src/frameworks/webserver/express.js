"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const helmet_1 = __importDefault(require("helmet"));
const rate_limiter_1 = require("./middlewares/rate-limiter");
const expressConfig = (app) => {
    var _a;
    if (((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.trim()) === 'development') {
        app.use((0, morgan_1.default)('dev'));
    }
    app.use((req, res, next) => {
        res.header('Access-Control-Expose-Headers', 'X-Total-Pages');
        next();
    });
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(rate_limiter_1.limiter);
    app.use(helmet_1.default.contentSecurityPolicy({
        directives: {
            imgSrc: ["'self'", 'data:'],
            frameSrc: ["'self'", 'https:']
        }
    }));
    app.use((0, express_mongo_sanitize_1.default)());
};
exports.default = expressConfig;
