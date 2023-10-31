import AppError from "../../utils/app-error";
import HttpStatusCodes from "../../constants/http-status-codes";
import { IPages } from "../../types/pdf";
import fs from 'fs'
import path from 'path'
import PdfServiceInterface from "../services/pdf-service-interface";

/**
 * Extract specific pages from a PDF file and return a readable file stream of the extracted content.
 * @param pdfId - The unique ID of the PDF file to extract pages from.
 * @param pages - An object specifying the pages to extract (either an array of specific page numbers or a page range).
 * @param pdfService - The PDF service for processing PDF data.
 * @returns A readable file stream containing the extracted PDF pages.
 * @throws {AppError} - Throws an error if the PDF with the provided ID is not found,
 * if there's an error processing the PDF, if the provided page specification is invalid,
 * or if no pages are selected for extraction.
 */
export const ucExtractPages = async (pdfId: string, { pages }: IPages, pdfService: ReturnType<PdfServiceInterface>) => {

    const filePath = path.join(__dirname, "../../../public/uploads", pdfId);
    if (fs.existsSync(filePath)) {
        try {
            const pdfBytes = fs.readFileSync(filePath);
            let extractedPdf: Uint8Array;
            if (Array.isArray(pages)) {
                if(pages.length===0){
                    throw new AppError("At least select a page to extract new pdf", HttpStatusCodes.BAD_REQUEST);
                }
                extractedPdf = await pdfService.extractRandomPages(pdfBytes, pages)
            } else {
                if (!pages.from || !pages.to) {
                    throw new AppError("From or to value cannot be null", HttpStatusCodes.BAD_REQUEST);
                }
                extractedPdf = await pdfService.extractPagesByRange(pdfBytes, pages.from, pages.to)
            }
            const tempFilePath = path.join(__dirname, '../../../public', 'temp', pdfId);
            fs.writeFileSync(tempFilePath, extractedPdf);

            const fileStream = fs.createReadStream(tempFilePath);

            return fileStream

        } catch (error) {
            throw error
        }
    } else {
        throw new AppError("PDF not found with the requested id", HttpStatusCodes.NOT_FOUND);
    }
}