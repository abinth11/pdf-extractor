import pdfController from "../../../adapters/controllers/pdf-controller";
import { RedisClient } from "../../../app";
import express from 'express'
import { upload } from "../middlewares/file-upload";
import { pdfServiceInterface } from "../../../application/services/pdf-service-interface";
import { pdfService } from "../../../frameworks/services/pdf-service";
import { pdfRepoInterface } from "../../../application/repositories/pdf-repo-interface";
import { pdfRepoImpl } from "../../../frameworks/databases/mongodb/repositories/pdf-repo-impl";
import verifyToken from "../middlewares/verify-token";

const pdfHandlerRoute = (redisClient:RedisClient)=>{
    
    const controller = pdfController(pdfServiceInterface,pdfService,pdfRepoInterface,pdfRepoImpl)
    const router = express.Router()

    router.post('/upload',upload.single('pdf'),controller.uploadPdfFile)
    router.get('/:pdfId',controller.findPdfById)
    router.post('/extract-pages/:pdfId',controller.extractPages)
    router.post('/save-extracted',verifyToken,controller.saveExtractedPdf)
    router.get('/saved',verifyToken,controller.findSavedPdfByUserId)

    return router
}

export default pdfHandlerRoute