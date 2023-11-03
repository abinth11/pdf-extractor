"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../../config"));
const redis_1 = require("redis");
const redisConnect = () => {
    const createRedisClient = () => {
        const client = (0, redis_1.createClient)({
            url: process.env.REDIS_URL || config_1.default.REDIS_URL,
        });
        // const client = createClient();
        client.on('error', err => console.log('Redis Client Error', err));
        client.connect().then(() => {
            console.log("Redis connected successfully".bgRed.bold);
        }).catch((err) => {
        });
        return client;
    };
    return {
        createRedisClient
    };
};
exports.default = redisConnect;
