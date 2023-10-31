import AppError from "../../utils/app-error";
import HttpStatusCodes from "../../constants/http-status-codes";
import { IPages } from "../../types/pdf";
import fs from 'fs'
import path from 'path'
import PdfServiceInterface from "../services/pdf-service-interface";

export const ucExtractPages = async (pdfId: string, { pages }: IPages, pdfService: ReturnType<PdfServiceInterface>) => {

    const filePath = path.join(__dirname, "../../../public/uploads", pdfId);
    const maxMemory = 100 * 1024 * 1024;
    const threshold = maxMemory / 10000;

    if (fs.existsSync(filePath)) {
        try {
            const pdfBytes = fs.readFileSync(filePath);
            console.log(pages)
            let extractedPdf: Uint8Array;
            if (Array.isArray(pages)) {
                extractedPdf = await pdfService.extractRandomPages(pdfBytes, pages)
            } else {
                extractedPdf = await pdfService.extractPagesByRange(pdfBytes, pages.from, pages.to)
            }
            const fileSize = extractedPdf.length;
            const smallFile = fileSize <= threshold
            if (smallFile) {
                console.log("less size")
                return { extractedPdf, smallFile }
            } else {
                console.log("large file")
                const tempFilePath = path.join(__dirname, '../../../public', 'temp', pdfId);
                console.log(tempFilePath)
                fs.writeFileSync(tempFilePath, extractedPdf);
                //  const downloadLink = `/api/download-temp-pdf/${path.basename(tempFilePath)}`;
                return { tempFilePath, smallFile }
            }

        } catch (error) {
            throw new AppError("Error processing PDF", HttpStatusCodes.INTERNAL_SERVER_ERROR);
        }
    } else {
        throw new AppError("PDF not found with the requested id", HttpStatusCodes.NOT_FOUND);
    }
}