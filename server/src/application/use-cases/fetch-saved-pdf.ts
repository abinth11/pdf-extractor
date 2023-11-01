import AppError from "../../utils/app-error";
import PdfRepoInterface from "../repositories/pdf-repo-interface";
import HttpStatusCodes from "../../constants/http-status-codes";

export const uCFindSavedPdf = async (userId: string, repository: ReturnType<PdfRepoInterface>) => {

    if (!userId) {
        throw new AppError("Please provide valid user id to fetch saved files", HttpStatusCodes.BAD_REQUEST)
    }
    const response = await repository.findSavedPdfByUserId(userId)
    return response
}