import HttpStatusCodes from "../../constants/http-status-codes";
import { uCUploadPdfFile } from "../../application/use-cases/upload-pdf";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { uCFindPdfById } from "../../application/use-cases/fetch-pdf";
import PdfServiceInterface from "../../application/services/pdf-service-interface";
import PdfService from "../../frameworks/services/pdf-service";
import { ucExtractPages } from "../../application/use-cases/extract-pages";
import { IPages } from "../../types/pdf";

/**
 * Creates an instance of a PDF controller with provided interfaces and implementations.
 * This controller handles operations related to PDF files, including uploading, retrieval, and page extraction.
 *
 * @param pdfServiceInterface - Interface for the PDF service.
 * @param pdfServiceImpl - Implementation of the PDF service.
 * @returns A PDF controller instance with methods for uploading, finding by ID, and extracting pages from PDF files.
 */
const pdfController = (pdfServiceInterface: PdfServiceInterface, pdfServiceImpl: PdfService) => {

    const pdfService = pdfServiceInterface(pdfServiceImpl())

    const uploadPdfFile = expressAsyncHandler(async (req: Request, res: Response) => {
        const fileBuffer = req.file?.buffer as Buffer
        const response = await uCUploadPdfFile(fileBuffer)
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
        const fileStream = await ucExtractPages(pdfId, pages, pdfService)
        res.setHeader('Content-Type', 'application/pdf');
        res.status(HttpStatusCodes.OK)
        fileStream.pipe(res);
    })

    return {
        uploadPdfFile,
        findPdfById,
        extractPages
    }
}

export default pdfController