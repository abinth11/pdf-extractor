"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdf_controller_1 = __importDefault(require("../../../adapters/controllers/pdf-controller"));
const express_1 = __importDefault(require("express"));
const file_upload_1 = require("../middlewares/file-upload");
const pdf_service_interface_1 = require("../../../application/services/pdf-service-interface");
const pdf_service_1 = require("../../../frameworks/services/pdf-service");
const pdf_repo_interface_1 = require("../../../application/repositories/pdf-repo-interface");
const pdf_repo_impl_1 = require("../../../frameworks/databases/mongodb/repositories/pdf-repo-impl");
const verify_token_1 = __importDefault(require("../middlewares/verify-token"));
const pdfHandlerRoute = (redisClient) => {
    const controller = (0, pdf_controller_1.default)(pdf_service_interface_1.pdfServiceInterface, pdf_service_1.pdfService, pdf_repo_interface_1.pdfRepoInterface, pdf_repo_impl_1.pdfRepoImpl);
    const router = express_1.default.Router();
    router.post('/upload', file_upload_1.upload.single('pdf'), controller.uploadPdfFile);
    router.get('/:pdfId', controller.findPdfById);
    router.post('/extract-pages/:pdfId', controller.extractPages);
    router.post('/save-extracted', verify_token_1.default, controller.saveExtractedPdf);
    router.get('/saved', verify_token_1.default, controller.findSavedPdfByUserId);
    return router;
};
exports.default = pdfHandlerRoute;
