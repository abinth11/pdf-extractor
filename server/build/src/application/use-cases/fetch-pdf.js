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
exports.uCFindPdfById = void 0;
const http_status_codes_1 = __importDefault(require("../../constants/http-status-codes"));
const app_error_1 = __importDefault(require("../../utils/app-error"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/**
 * Find and retrieve a PDF file by its ID.
 * @param pdfId - The unique ID of the PDF file to be retrieved.
 * @param pdfService - The PDF service for processing PDF data.
 * @returns An object containing a readable file stream and the number of pages in the PDF.
 * @throws {AppError} - Throws an error if the PDF with the provided ID is not found,
 * if there's an error processing the PDF, or if the PDF ID is invalid.
 */
const uCFindPdfById = (pdfId, pdfService) => __awaiter(void 0, void 0, void 0, function* () {
    if (!pdfId) {
        throw new app_error_1.default("Please provide a valid pdf id", http_status_codes_1.default.BAD_REQUEST);
    }
    const filePath = path_1.default.join(__dirname, "../../../public/uploads", pdfId);
    if (fs_1.default.existsSync(filePath)) {
        try {
            const pdfBytes = fs_1.default.readFileSync(filePath);
            const pages = yield pdfService.countPages(pdfBytes);
            const fileStream = fs_1.default.createReadStream(filePath);
            return { fileStream, pages };
        }
        catch (error) {
            throw new app_error_1.default("Error processing PDF", http_status_codes_1.default.INTERNAL_SERVER_ERROR);
        }
    }
    else {
        throw new app_error_1.default("PDF not found with the requested id", http_status_codes_1.default.NOT_FOUND);
    }
});
exports.uCFindPdfById = uCFindPdfById;
