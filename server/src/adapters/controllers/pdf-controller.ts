import HttpStatusCodes from "../../constants/http-status-codes";
import { uCUploadPdfFile } from "../../application/use-cases/upload-pdf";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { uCFindPdfById } from "../../application/use-cases/fetch-pdf";
import PdfServiceInterface from "../../application/services/pdf-service-interface";
import PdfService from "../../frameworks/services/pdf-service";
import { ucExtractPages } from "../../application/use-cases/extract-pages";
import { IPages } from "../../types/pdf";

const pdfController = (pdfServiceInterface: PdfServiceInterface, pdfServiceImpl: PdfService) => {

    const pdfService = pdfServiceInterface(pdfServiceImpl())

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

    const findPdfById = expressAsyncHandler(async (req: Request, res: Response) => {
        const pdfId = req.params.pdfId as string
        const { fileStream, pages } = await uCFindPdfById(pdfId, pdfService)
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('X-Total-Pages', pages);
        res.status(HttpStatusCodes.OK)
        fileStream.pipe(res);
    })

    const extractPages = expressAsyncHandler(async (req: Request, res: Response) => {
        const pdfId = req.params.pdfId as string
        const pages = req.body as IPages
        const response = await ucExtractPages(pdfId, pages, pdfService)
        if (response.smallFile) {
            res.setHeader('Content-Disposition', 'attachment; filename="extracted.pdf"');
            res.setHeader('Content-Type', 'application/pdf');
            res.send(response.extractedPdf);
        } else {
            res.download(response.tempFilePath, 'extracted.pdf', (err) => {
                if (err) {
                    console.log(err)
                }
            });
        }
    })

    return {
        uploadPdfFile,
        findPdfById,
        extractPages
    }
}

export default pdfController