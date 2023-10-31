import PdfService from "@src/frameworks/services/pdf-service"

export const pdfServiceInterface = (service:ReturnType<PdfService>) =>{

    const countPages = async (pdfBuffer:Uint8Array) => await service.countPages(pdfBuffer)

    const extractRandomPages = async (pdfBuffer:Uint8Array,pages:number[]) => await service.extractRandomPages(pdfBuffer,pages)

    const extractPagesByRange = async (pdfBuffer:Uint8Array,from:number,to:number) => await service.extractPagesByRange(pdfBuffer,from,to)

    return {
        countPages,
        extractPagesByRange,
        extractRandomPages
    }

}

type PdfServiceInterface = typeof pdfServiceInterface
export default PdfServiceInterface