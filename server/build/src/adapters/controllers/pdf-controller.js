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
const http_status_codes_1 = __importDefault(require("../../constants/http-status-codes"));
const upload_pdf_1 = require("../../application/use-cases/upload-pdf");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const fetch_pdf_1 = require("../../application/use-cases/fetch-pdf");
const extract_pages_1 = require("../../application/use-cases/extract-pages");
const save_extracted_pdf_1 = require("../../application/use-cases/save-extracted-pdf");
const fetch_saved_pdf_1 = require("../../application/use-cases/fetch-saved-pdf");
/**
 * Creates an instance of a PDF controller with provided interfaces and implementations.
 * This controller handles operations related to PDF files, including uploading, retrieval, and page extraction.
 *
 * @param pdfServiceInterface - Interface for the PDF service.
 * @param pdfServiceImpl - Implementation of the PDF service.
 * @returns A PDF controller instance with methods for uploading, finding by ID, and extracting pages from PDF files.
 */
const pdfController = (pdfServiceInterface, pdfServiceImpl, pdfRepo, pdfRepoImpl) => {
    const pdfService = pdfServiceInterface(pdfServiceImpl());
    const dbRepositoryPdf = pdfRepo(pdfRepoImpl());
    const uploadPdfFile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const fileBuffer = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
        const response = yield (0, upload_pdf_1.uCUploadPdfFile)(fileBuffer);
        res.status(http_status_codes_1.default.OK).json({
            status: "success",
            message: "successfully uploaded your pdf file",
            data: response
        });
    }));
    const findPdfById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const pdfId = req.params.pdfId;
        const { fileStream, pages } = yield (0, fetch_pdf_1.uCFindPdfById)(pdfId, pdfService);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('X-Total-Pages', pages);
        res.status(http_status_codes_1.default.OK);
        fileStream.pipe(res);
    }));
    const extractPages = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const pdfId = req.params.pdfId;
        const pages = req.body;
        const fileStream = yield (0, extract_pages_1.ucExtractPages)(pdfId, pages, pdfService);
        res.setHeader('Content-Type', 'application/pdf');
        res.status(http_status_codes_1.default.OK);
        fileStream.pipe(res);
    }));
    const saveExtractedPdf = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.userId;
        const pdfId = req.body.pdfId;
        console.log(pdfId);
        console.log(req.body);
        const response = yield (0, save_extracted_pdf_1.uCSaveExtractedPdf)(pdfId, userId, dbRepositoryPdf);
        res.status(http_status_codes_1.default.CREATED).json({
            status: "success",
            message: "successfully saved the file",
            data: response
        });
    }));
    const findSavedPdfByUserId = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.userId;
        const savedPdf = yield (0, fetch_saved_pdf_1.uCFindSavedPdf)(userId, dbRepositoryPdf);
        res.status(http_status_codes_1.default.OK).json({
            status: "success",
            message: "successfully retrieved saved pdf files by user id",
            data: savedPdf
        });
    }));
    return {
        uploadPdfFile,
        findPdfById,
        extractPages,
        saveExtractedPdf,
        findSavedPdfByUserId
    };
};
exports.default = pdfController;
