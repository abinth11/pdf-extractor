import PDF from "@src/entities/pdf";
import PdfRepoImpl from "@src/frameworks/databases/mongodb/repositories/pdf-repo-impl";

export const pdfRepoInterface = (repository:ReturnType<PdfRepoImpl>)=>{

    const  saveExtractedPdf = async (pdf:PDF) => await repository.saveExtractedPdf(pdf)

    const findSavedPdfByUserId = async (userId:string) => await repository.findSavedPdfByUserId(userId)

    const updateSaved = async (userId:string,pdf:PDF) => await repository.updateSaved(userId,pdf)

    return {
        saveExtractedPdf,
        findSavedPdfByUserId,
        updateSaved
    }
}

type PdfRepoInterface = typeof pdfRepoInterface
export default PdfRepoInterface