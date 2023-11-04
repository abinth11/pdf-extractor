import AppError from "../../utils/app-error";
import PdfRepoInterface from "../repositories/pdf-repo-interface";
import HttpStatusCodes from "../../constants/http-status-codes";
import { CacheRepositoryInterface } from "../repositories/cache-repo-interface";

/**
 * Retrieves a user's saved PDF files from the repository.
 * @param userId - The ID of the user whose saved PDFs are to be retrieved.
 * @param repository - An interface to the PDF repository.
 * @param redisClient - repository for redis (for caching the data)
 * @returns A Promise that resolves with the response from the repository, which may contain the user's saved PDFs.
 * @throws {AppError} - Throws an error if the provided user ID is invalid.
 */
export const uCFindSavedPdf = async (userId: string, repository: ReturnType<PdfRepoInterface>, cacheRepository: ReturnType<CacheRepositoryInterface>) => {

    if (!userId) {
        throw new AppError("Please provide valid user id to fetch saved files", HttpStatusCodes.BAD_REQUEST)
    }

    const response = await repository.findSavedPdfByUserId(userId)
    const cacheOptions = { key: userId, data: JSON.stringify(response), expireTimeSec: 86400 }
    response && await cacheRepository.setCache(cacheOptions)
    return response
}