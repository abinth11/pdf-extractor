import PDF from "@src/entities/pdf";
import PdfRepoImpl from "@src/frameworks/databases/mongodb/repositories/pdf-repo-impl";

export const pdfRepoInterface = (repository:ReturnType<PdfRepoImpl>)=>{

    const  saveExtractedPdf = async (pdf:PDF) => await repository.saveExtractedPdf(pdf)

    const findSavedPdfByUserId = async (userId:string) => await repository.findSavedPdfByUserId(userId)

    return {
        saveExtractedPdf,
        findSavedPdfByUserId
    }
}

type PdfRepoInterface = typeof pdfRepoInterface
export default PdfRepoInterface