import ExtractedPdf from "../models/extracted-pdf"
import PDF from "@src/entities/pdf"

export const pdfRepoImpl = () => {

    const saveExtractedPdf = async (pdf: PDF) => {
        const newPdf = new ExtractedPdf(pdf)
        return await newPdf.save()
    }

    const findSavedPdfByUserId = async (userId:string) =>{
        const savedPdf = await ExtractedPdf.findOne({_id:userId})
        return savedPdf
    }

    return {
        saveExtractedPdf,
        findSavedPdfByUserId
    }
}

type PdfRepoImpl = typeof pdfRepoImpl
export default PdfRepoImpl