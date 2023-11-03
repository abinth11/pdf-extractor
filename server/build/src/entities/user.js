"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor({ name, email, password }) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = new Date();
    }
}
exports.default = User;
