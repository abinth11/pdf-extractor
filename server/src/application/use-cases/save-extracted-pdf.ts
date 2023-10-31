import AppError from "../../utils/app-error";
import PdfRepoInterface from "../repositories/pdf-repo-interface";
import HttpStatusCodes from "../../constants/http-status-codes";
import PDF from "../../entities/pdf";

export const uCSaveExtractedPdf = async (pdfId: string, userId: string, repository: ReturnType<PdfRepoInterface>) => {
    if (!pdfId) {
        throw new AppError("Please provide valid pdf id to save the pdf details", HttpStatusCodes.BAD_REQUEST)
    }
    if (!userId) {
        throw new AppError("Please provide valid user id to save the pdf details", HttpStatusCodes.BAD_REQUEST)
    }
    const newExtractedFile = new PDF({ userId, pdfId })
    const response = await repository.saveExtractedPdf(newExtractedFile)
    return response
}