import AppError from "../../utils/app-error";
import PdfRepoInterface from "../repositories/pdf-repo-interface";
import HttpStatusCodes from "../../constants/http-status-codes";
import PDF from "../../entities/pdf";

/**
 * Saves information about an extracted PDF file for a user.
 * @param pdfId - The ID of the extracted PDF.
 * @param userId - The ID of the user who is saving the PDF.
 * @param repository - An interface to the PDF repository.
 * @returns A Promise that resolves with a response from the repository.
 * @throws {AppError} - Throws an error if the provided PDF or user IDs are invalid, or if the PDF is already saved by the user.
 */
export const uCSaveExtractedPdf = async (pdfId: string, userId: string, repository: ReturnType<PdfRepoInterface>) => {
    if (!pdfId) {
        throw new AppError("Please provide valid pdf id to save the pdf details", HttpStatusCodes.BAD_REQUEST)
    }
    if (!userId) {
        throw new AppError("Please provide valid user id to save the pdf details", HttpStatusCodes.BAD_REQUEST)
    }
    const alreadyHaveCollection = await repository.findSavedPdfByUserId(userId)
    let newExtractedFile: PDF;
    let saved: string[] = [pdfId]
    if (alreadyHaveCollection) {
        if (alreadyHaveCollection.saved.includes(pdfId)) {
            throw new AppError("Already saved this pdf file", HttpStatusCodes.BAD_REQUEST)
        } else {
            saved = [...alreadyHaveCollection.saved, pdfId]
            newExtractedFile = new PDF({ userId, pdfId, saved })
            const response = await repository.updateSaved(userId, newExtractedFile)
            return response
        }
    } else {
        newExtractedFile = new PDF({ userId, pdfId, saved })
        const response = await repository.saveExtractedPdf(newExtractedFile)
        return response
    }
}