import AppError from "../../utils/app-error";
import HttpStatusCodes from "../../constants/http-status-codes";
import { IPages } from "../../types/pdf";
import fs from 'fs'
import path from 'path'
import PdfServiceInterface from "../services/pdf-service-interface";

export const ucExtractPages = async (pdfId: string, { pages }: IPages, pdfService: ReturnType<PdfServiceInterface>) => {
    const filePath = path.join(__dirname, "../../uploads", pdfId);

    if (fs.existsSync(filePath)) {
        try {
            const pdfBytes = fs.readFileSync(filePath);
            console.log(pages)
            if (Array.isArray(pages)) {
                const extractedPdf = await pdfService.extractRandomPages(pdfBytes, pages)
                console.log(extractedPdf)
            } else {
                const extractedPdf = await pdfService.extractPagesByRange(pdfBytes, pages.from, pages.to)
                console.log(extractedPdf)
            }
        } catch (error) {
            throw new AppError("Error processing PDF", HttpStatusCodes.INTERNAL_SERVER_ERROR);
        }
    } else {
        throw new AppError("PDF not found with the requested id", HttpStatusCodes.NOT_FOUND);
    }
}