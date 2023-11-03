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
exports.ucExtractPages = void 0;
const app_error_1 = __importDefault(require("../../utils/app-error"));
const http_status_codes_1 = __importDefault(require("../../constants/http-status-codes"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Extract specific pages from a PDF file and return a readable file stream of the extracted content.
 * @param pdfId - The unique ID of the PDF file to extract pages from.
 * @param pages - An object specifying the pages to extract (either an array of specific page numbers or a page range).
 * @param pdfService - The PDF service for processing PDF data.
 * @returns A readable file stream containing the extracted PDF pages.
 * @throws {AppError} - Throws an error if the PDF with the provided ID is not found,
 * if there's an error processing the PDF, if the provided page specification is invalid,
 * or if no pages are selected for extraction.
 */
const ucExtractPages = (pdfId, pages, pdfService) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path_1.default.join(__dirname, "../../../public/uploads", pdfId);
    if (fs_1.default.existsSync(filePath)) {
        try {
            const pdfBytes = fs_1.default.readFileSync(filePath);
            let extractedPdf;
            if (Array.isArray(pages)) {
                if (pages.length === 0) {
                    throw new app_error_1.default("At least select a page to extract new pdf", http_status_codes_1.default.BAD_REQUEST);
                }
                extractedPdf = yield pdfService.extractRandomPages(pdfBytes, pages);
            }
            else {
                if (!(pages === null || pages === void 0 ? void 0 : pages.from) || !pages.to) {
                    throw new app_error_1.default("From or to value cannot be null", http_status_codes_1.default.BAD_REQUEST);
                }
                else if (pages.from > pages.to) {
                    throw new app_error_1.default("from value must be less than to-1", http_status_codes_1.default.BAD_REQUEST);
                }
                extractedPdf = yield pdfService.extractPagesByRange(pdfBytes, pages === null || pages === void 0 ? void 0 : pages.from, pages === null || pages === void 0 ? void 0 : pages.to);
            }
            const tempFilePath = path_1.default.join(__dirname, '../../../public', 'temp', pdfId);
            fs_1.default.writeFileSync(tempFilePath, extractedPdf);
            const fileStream = fs_1.default.createReadStream(tempFilePath);
            return fileStream;
        }
        catch (error) {
            throw error;
        }
    }
    else {
        throw new app_error_1.default("PDF not found with the requested id", http_status_codes_1.default.NOT_FOUND);
    }
});
exports.ucExtractPages = ucExtractPages;
