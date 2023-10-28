import HttpStatusCodes from "../../constants/http-status-codes";
import { uCUploadPdfFile } from "../../application/use-cases/upload-pdf";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";

const pdfController = () => {

    const uploadPdfFile = expressAsyncHandler(async (req: Request, res: Response) => {
        const fileBuffer = req.file?.buffer as Buffer
        const response = await uCUploadPdfFile(fileBuffer)
        console.log(response)
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