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
exports.pdfServiceInterface = void 0;
const pdfServiceInterface = (service) => {
    const countPages = (pdfBuffer) => __awaiter(void 0, void 0, void 0, function* () { return yield service.countPages(pdfBuffer); });
    const extractRandomPages = (pdfBuffer, pages) => __awaiter(void 0, void 0, void 0, function* () { return yield service.extractRandomPages(pdfBuffer, pages); });
    const extractPagesByRange = (pdfBuffer, from, to) => __awaiter(void 0, void 0, void 0, function* () { return yield service.extractPagesByRange(pdfBuffer, from, to); });
    return {
        countPages,
        extractPagesByRange,
        extractRandomPages
    };
};
exports.pdfServiceInterface = pdfServiceInterface;
