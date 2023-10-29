import HttpStatusCodes from "../../constants/http-status-codes"
import AppError from "../../utils/app-error"
import path from 'path'
import fs from 'fs'

export const uCFindPdfById =  (pdfId: string) => {
    if (!pdfId) {
        throw new AppError("Please provide a valid pdf id", HttpStatusCodes.BAD_REQUEST)
    }
    const filePath = path.join(__dirname,"../../"+"uploads", pdfId);
    if (fs.existsSync(filePath)) { 
        const fileStream = fs.createReadStream(filePath);
        return fileStream
    } else {
        throw new AppError("Pdf not found with requested id", HttpStatusCodes.NOT_FOUND)
    }
}