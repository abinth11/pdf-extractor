"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomFileName = void 0;
const uuid_1 = require("uuid");
const createRandomFileName = () => (0, uuid_1.v4)();
exports.createRandomFileName = createRandomFileName;
