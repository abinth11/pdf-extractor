"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./frameworks/databases/mongodb/connection"));
const http_1 = __importDefault(require("http"));
const server_1 = __importDefault(require("./frameworks/webserver/server"));
const express_2 = __importDefault(require("./frameworks/webserver/express"));
const routes_1 = __importDefault(require("./frameworks/webserver/routes"));
const connection_2 = __importDefault(require("./frameworks/databases/redis/connection"));
const colors_1 = __importDefault(require("colors"));
const error_handler_1 = __importDefault(require("./frameworks/webserver/middlewares/error-handler"));
const app_error_1 = __importDefault(require("./utils/app-error"));
const swagger_1 = __importDefault(require("./adapters/swagger/swagger"));
const config_1 = __importDefault(require("./config"));
colors_1.default === null || colors_1.default === void 0 ? void 0 : colors_1.default.enable();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
//* connecting mongoDb 
(0, connection_1.default)();
//* connection to redis
const redisClient = (0, connection_2.default)().createRedisClient();
//* express config connection
(0, express_2.default)(app);
//* routes for each endpoint
(0, routes_1.default)(app, redisClient);
//* swagger docs
(0, swagger_1.default)(app, config_1.default.PORT);
//* handles server side errors
app.use(error_handler_1.default);
//* catch 404 and forward to error handler
app.all('*', (req, res, next) => {
    next(new app_error_1.default('Not found', 404));
});
//* starting the server with server config
(0, server_1.default)(server).startServer();
