import AppError from "@src/utils/app-error";
import HttpStatusCodes from "@src/constants/http-status-codes";
import fs from 'fs'
import path from 'path'
export const ucDownloadExtractedPdf = (pdfId: string) => {

    const tempFilePath = path.join(__dirname, "../../../public/uploads", pdfId);

    if (fs.existsSync(tempFilePath)) {

        return tempFilePath
        
    } else {
        throw new AppError("File not found with given id", HttpStatusCodes.NOT_FOUND)
    }
}