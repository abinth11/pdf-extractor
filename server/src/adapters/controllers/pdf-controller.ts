import HttpStatusCodes from "@src/constants/http-status-codes";
import { uCUploadPdfFile } from "@src/application/use-cases/upload-pdf";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";

const pdfController = () => {

    const uploadPdfFile = expressAsyncHandler(async (req: Request, res: Response) => {
        const fileBuffer = req.body.file as Buffer
        const response = await uCUploadPdfFile(fileBuffer)
        res.status(HttpStatusCodes.OK).json({
            status: "success",
            message: "successfully uploaded your pdf file",
            data: response
        })
    })

    return {
        uploadPdfFile
    }
}

export default pdfController