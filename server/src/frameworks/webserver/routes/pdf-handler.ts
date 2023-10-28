import pdfController from "@src/adapters/controllers/pdf-controller";
import { RedisClient } from "@src/app";
import express from 'express'

const pdfHandlerRoute = (redisClient:RedisClient)=>{
    const controller = pdfController()
    const router = express.Router()

    router.post('/upload',controller.uploadPdfFile)

    return router
}

export default pdfHandlerRoute