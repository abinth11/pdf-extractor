import HttpStatusCodes from "../../constants/http-status-codes";
import { uCUploadPdfFile } from "../../application/use-cases/upload-pdf";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { uCFindPdfById } from "../../application/use-cases/fetch-pdf";

const pdfController = () => {

    const uploadPdfFile = expressAsyncHandler(async (req: Request, res: Response) => {
        const fileBuffer = req.file?.buffer as Buffer
        console.log(req.ip)
        const response = await uCUploadPdfFile(fileBuffer)
        console.log(response)
        res.status(HttpStatusCodes.OK).json({
            status: "success",
            message: "successfully uploaded your pdf file",
            data: response
        })
    })

    const findPdfById = expressAsyncHandler(async (req: Request, res: Response) => {
        const pdfId = req.params.pdfId as string
        const {fileStream,pages} =  await uCFindPdfById(pdfId)
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('X-something','abskdfjsldfjsdkfjsdkf')
        res.setHeader('X-Total-Pages', pages); 
        fileStream.pipe(res);
    })

    return {
        uploadPdfFile,
        findPdfById
    }
}

export default pdfController