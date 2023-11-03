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
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfService = void 0;
const pdf_lib_1 = require("pdf-lib");
const pdfService = () => {
    const countPages = (pdfBuffer) => __awaiter(void 0, void 0, void 0, function* () {
        const pdfDoc = yield pdf_lib_1.PDFDocument.load(pdfBuffer);
        const pageCount = pdfDoc.getPages().length;
        return pageCount;
    });
    const extractRandomPages = (pdfBuffer, randomPageNumbers) => __awaiter(void 0, void 0, void 0, function* () {
        const pdfDoc = yield pdf_lib_1.PDFDocument.load(pdfBuffer);
        const extractedDoc = yield pdf_lib_1.PDFDocument.create();
        for (const pageNumber of randomPageNumbers) {
            if (pageNumber >= 1 && pageNumber <= pdfDoc.getPageCount()) {
                const [copiedPage] = yield extractedDoc.copyPages(pdfDoc, [pageNumber - 1]);
                extractedDoc.addPage(copiedPage);
            }
        }
        return extractedDoc.save();
    });
    const extractPagesByRange = (pdfBuffer, rangeStart, rangeEnd) => __awaiter(void 0, void 0, void 0, function* () {
        const pdfDoc = yield pdf_lib_1.PDFDocument.load(pdfBuffer);
        const extractedDoc = yield pdf_lib_1.PDFDocument.create();
        for (let i = rangeStart; i <= rangeEnd; i++) {
            if (i >= 1 && i <= pdfDoc.getPageCount()) {
                const [copiedPage] = yield extractedDoc.copyPages(pdfDoc, [i - 1]);
                extractedDoc.addPage(copiedPage);
            }
        }
        return extractedDoc.save();
    });
    return {
        countPages,
        extractRandomPages,
        extractPagesByRange
    };
};
exports.pdfService = pdfService;
