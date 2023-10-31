import HttpStatusCodes from "../../constants/http-status-codes";
import AppError from "../../utils/app-error";
import path from 'path';
import fs from 'fs';
import PdfServiceInterface from "../services/pdf-service-interface";

/**
 * Find and retrieve a PDF file by its ID.
 * @param pdfId - The unique ID of the PDF file to be retrieved.
 * @param pdfService - The PDF service for processing PDF data.
 * @returns An object containing a readable file stream and the number of pages in the PDF.
 * @throws {AppError} - Throws an error if the PDF with the provided ID is not found,
 * if there's an error processing the PDF, or if the PDF ID is invalid.
 */
export const uCFindPdfById = async (pdfId: string,pdfService:ReturnType<PdfServiceInterface>) => {
    if (!pdfId) {
        throw new AppError("Please provide a valid pdf id", HttpStatusCodes.BAD_REQUEST);
    }

    const filePath = path.join(__dirname, "../../../public/uploads", pdfId);

    if (fs.existsSync(filePath)) {
        try {
            const pdfBytes = fs.readFileSync(filePath); 
            const pages = await pdfService.countPages(pdfBytes)
            const fileStream = fs.createReadStream(filePath);
            return { fileStream, pages };
        } catch (error) {
            throw new AppError("Error processing PDF", HttpStatusCodes.INTERNAL_SERVER_ERROR);
        }
    } else {
        throw new AppError("PDF not found with the requested id", HttpStatusCodes.NOT_FOUND);
    }
};
