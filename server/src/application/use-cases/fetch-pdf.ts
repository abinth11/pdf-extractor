import HttpStatusCodes from "../../constants/http-status-codes";
import AppError from "../../utils/app-error";
import path from 'path';
import fs from 'fs';
import PdfServiceInterface from "../services/pdf-service-interface";

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
