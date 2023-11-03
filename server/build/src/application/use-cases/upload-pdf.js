"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uCUploadPdfFile = void 0;
const fs_1 = require("fs");
const stream_1 = require("stream");
const path_1 = __importDefault(require("path"));
const helper_functions_1 = require("../../utils/helper-functions");
const app_error_1 = __importDefault(require("../../utils/app-error"));
const http_status_codes_1 = __importDefault(require("../../constants/http-status-codes"));
/**
 * Uploads a PDF file to the server.
 * @param fileBuffer - A Buffer containing the PDF file to upload.
 * @returns A Promise that resolves with the uploaded file name or rejects with an error.
 * @throws {AppError} - Throws an error if the upload fails.
 */
const uCUploadPdfFile = (fileBuffer) => __awaiter(void 0, void 0, void 0, function* () {
    if (!fileBuffer) {
        throw new app_error_1.default("A pdf file is required", http_status_codes_1.default.BAD_REQUEST);
    }
    const destFileName = (0, helper_functions_1.createRandomFileName)() + ".pdf";
    const destFilePath = path_1.default.join(__dirname, "../../../public/uploads", destFileName);
    return new Promise((resolve, reject) => {
        const readStream = new stream_1.Readable();
        readStream.push(fileBuffer);
        readStream.push(null);
        const writeStream = (0, fs_1.createWriteStream)(destFilePath);
        readStream.pipe(writeStream);
        writeStream.on('error', (err) => {
            console.error('Error writing destination file:', err);
            reject(new app_error_1.default("Failed to upload the file", http_status_codes_1.default.INTERNAL_SERVER_ERROR));
        });
        writeStream.on('finish', () => {
            resolve(destFileName);
        });
    });
});
exports.uCUploadPdfFile = uCUploadPdfFile;
