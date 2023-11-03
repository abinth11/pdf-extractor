"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeUser = void 0;
const sanitizeUser = (user) => ({
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
});
exports.sanitizeUser = sanitizeUser;
