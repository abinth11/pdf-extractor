import pdfController from "../../../adapters/controllers/pdf-controller";
import { RedisClient } from "../../../app";
import express from 'express'
import { upload } from "../middlewares/file-upload";

const pdfHandlerRoute = (redisClient:RedisClient)=>{
    const controller = pdfController()
    const router = express.Router()

    router.post('/upload',upload.single('pdf'),controller.uploadPdfFile)

    return router
}

export default pdfHandlerRoute