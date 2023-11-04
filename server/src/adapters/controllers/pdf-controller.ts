import HttpStatusCodes from "../../constants/http-status-codes";
import { uCUploadPdfFile } from "../../application/use-cases/upload-pdf";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { uCFindPdfById } from "../../application/use-cases/fetch-pdf";
import PdfServiceInterface from "../../application/services/pdf-service-interface";
import PdfService from "../../frameworks/services/pdf-service";
import { ucExtractPages } from "../../application/use-cases/extract-pages";
import { IPages } from "../../types/pdf";
import { CustomRequest } from "../../types/user";
import { uCSaveExtractedPdf } from "../../application/use-cases/save-extracted-pdf";
import PdfRepoInterface from "../../application/repositories/pdf-repo-interface";
import PdfRepoImpl from "../../frameworks/databases/mongodb/repositories/pdf-repo-impl";
import { uCFindSavedPdf } from "../../application/use-cases/fetch-saved-pdf";
import { RedisClient } from "../../app";
import { CacheRepositoryInterface } from "../../application/repositories/cache-repo-interface";
import { CacheRepository } from "../../frameworks/databases/redis/cache-repository";

/**
 * Creates an instance of a PDF controller with provided interfaces and implementations.
 * This controller handles operations related to PDF files, including uploading, retrieval, and page extraction.
 *
 * @param pdfServiceInterface - Interface for the PDF service.
 * @param pdfServiceImpl - Implementation of the PDF service.
 * @param pdfRepo - Interface  for pdf repository
 * @param pdfRepoImpl - implementation of pdf repository
 * @param cacheRepositoryInterface - Interface of cache repo
 * @param cacheRepository - Implementation of caching functions
 * @param redisClient - redis connection type(for caching the data)
 * @returns A PDF controller instance with methods for uploading, finding by ID, and extracting pages from PDF files.
 */
const pdfController = (
    pdfServiceInterface: PdfServiceInterface,
    pdfServiceImpl: PdfService,
    pdfRepo: PdfRepoInterface,
    pdfRepoImpl: PdfRepoImpl,
    cacheRepositoryInterface: CacheRepositoryInterface,
    cacheRepositoryImpl: CacheRepository, 
    redisClient: RedisClient
    ) => {

    const pdfService = pdfServiceInterface(pdfServiceImpl())
    const dbRepositoryPdf = pdfRepo(pdfRepoImpl())
    const dbRepositoryCache = cacheRepositoryInterface(cacheRepositoryImpl(redisClient))

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

    const saveExtractedPdf = expressAsyncHandler(async (req: CustomRequest, res: Response) => {
        const userId = req.userId as string
        const pdfId = req.body.pdfId as string;
        const response = await uCSaveExtractedPdf(pdfId, userId, dbRepositoryPdf)
        res.status(HttpStatusCodes.CREATED).json({
            status: "success",
            message: "successfully saved the file",
            data: response
        })
    })

    const findSavedPdfByUserId = expressAsyncHandler(async (req: CustomRequest, res: Response) => {
        const userId = req.userId as string
        const savedPdf = await uCFindSavedPdf(userId, dbRepositoryPdf, dbRepositoryCache)
        res.status(HttpStatusCodes.OK).json({
            status: "success",
            message: "successfully retrieved saved pdf files by user id",
            data: savedPdf
        })
    })

    return {
        uploadPdfFile,
        findPdfById,
        extractPages,
        saveExtractedPdf,
        findSavedPdfByUserId
    }
}

export default pdfController