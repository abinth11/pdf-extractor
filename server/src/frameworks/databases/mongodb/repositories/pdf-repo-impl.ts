import ExtractedPdf from "../models/extracted-pdf"
import PDF from "@src/entities/pdf"

export const pdfRepoImpl = () => {

    const saveExtractedPdf = async (pdf: PDF) => {
        const newPdf = new ExtractedPdf(pdf)
        return await newPdf.save()
    }

    const updateSaved = async (userId: string, pdf: PDF) => {
        await ExtractedPdf.updateOne({ userId }, { $set: { ...pdf } });
    };

    const findSavedPdfByUserId = async (userId: string) => {
        const savedPdf: PDF | null = await ExtractedPdf.findOne({ userId }).lean()
        return savedPdf
    }

    return {
        saveExtractedPdf,
        findSavedPdfByUserId,
        updateSaved
    }
}

type PdfRepoImpl = typeof pdfRepoImpl
export default PdfRepoImpl