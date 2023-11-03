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
exports.uCSaveExtractedPdf = void 0;
const app_error_1 = __importDefault(require("../../utils/app-error"));
const http_status_codes_1 = __importDefault(require("../../constants/http-status-codes"));
const pdf_1 = __importDefault(require("../../entities/pdf"));
const uCSaveExtractedPdf = (pdfId, userId, repository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!pdfId) {
        throw new app_error_1.default("Please provide valid pdf id to save the pdf details", http_status_codes_1.default.BAD_REQUEST);
    }
    if (!userId) {
        throw new app_error_1.default("Please provide valid user id to save the pdf details", http_status_codes_1.default.BAD_REQUEST);
    }
    const alreadyHaveCollection = yield repository.findSavedPdfByUserId(userId);
    let newExtractedFile;
    let saved = [pdfId];
    if (alreadyHaveCollection) {
        if (alreadyHaveCollection.saved.includes(pdfId)) {
            throw new app_error_1.default("Already saved this pdf file", http_status_codes_1.default.BAD_REQUEST);
        }
        else {
            saved = [...alreadyHaveCollection.saved, pdfId];
            newExtractedFile = new pdf_1.default({ userId, pdfId, saved });
            const response = yield repository.updateSaved(userId, newExtractedFile);
            return response;
        }
    }
    else {
        newExtractedFile = new pdf_1.default({ userId, pdfId, saved });
        const response = yield repository.saveExtractedPdf(newExtractedFile);
        return response;
    }
});
exports.uCSaveExtractedPdf = uCSaveExtractedPdf;
