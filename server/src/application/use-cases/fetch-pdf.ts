import HttpStatusCodes from "../../constants/http-status-codes";
import AppError from "../../utils/app-error";
import path from 'path';
import fs from 'fs';
import { countPagesInPDF } from "../../utils/helper-functions";

export const uCFindPdfById = async (pdfId: string) => {
    if (!pdfId) {
        throw new AppError("Please provide a valid pdf id", HttpStatusCodes.BAD_REQUEST);
    }

    const filePath = path.join(__dirname, "../../uploads", pdfId);

    if (fs.existsSync(filePath)) {
        try {
            const pdfBytes = fs.readFileSync(filePath); 
            const pages = await countPagesInPDF(pdfBytes)
            console.log(pages)
            const fileStream = fs.createReadStream(filePath);
            return { fileStream, pages };
        } catch (error) {
            throw new AppError("Error processing PDF", HttpStatusCodes.INTERNAL_SERVER_ERROR);
        }
    } else {
        throw new AppError("PDF not found with the requested id", HttpStatusCodes.NOT_FOUND);
    }
};
