import pdfController from "../../../adapters/controllers/pdf-controller";
import { RedisClient } from "../../../app";
import express from 'express'
import { upload } from "../middlewares/file-upload";
import { pdfServiceInterface } from "../../../application/services/pdf-service-interface";
import { pdfService } from "../../../frameworks/services/pdf-service";

const pdfHandlerRoute = (redisClient:RedisClient)=>{
    
    const controller = pdfController(pdfServiceInterface,pdfService)
    const router = express.Router()

    router.post('/upload',upload.single('pdf'),controller.uploadPdfFile)
    router.get('/:pdfId',controller.findPdfById)
    router.post('/extract-pages/:pdfId',controller.extractPages)

    return router
}

export default pdfHandlerRoute