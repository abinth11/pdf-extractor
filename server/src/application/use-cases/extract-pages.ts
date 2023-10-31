import AppError from "../../utils/app-error";
import HttpStatusCodes from "../../constants/http-status-codes";
import { IPages } from "../../types/pdf";
import fs from 'fs'
import path from 'path'
import PdfServiceInterface from "../services/pdf-service-interface";

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