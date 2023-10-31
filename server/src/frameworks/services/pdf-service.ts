
import { PDFDocument } from 'pdf-lib';
export const pdfService = () => {

    const countPages = async (pdfBuffer: Uint8Array) => {
        const pdfDoc = await PDFDocument.load(pdfBuffer);
        const pageCount = pdfDoc.getPages().length;
        return pageCount;
    }

    const extractRandomPages = async (pdfBuffer: Uint8Array, randomPageNumbers: number[]) => {
        const pdfDoc = await PDFDocument.load(pdfBuffer);
        const extractedDoc = await PDFDocument.create();

        for (const pageNumber of randomPageNumbers) {
            if (pageNumber >= 1 && pageNumber <= pdfDoc.getPageCount()) {
                const [copiedPage] = await extractedDoc.copyPages(pdfDoc, [pageNumber - 1]);
                extractedDoc.addPage(copiedPage);
            }
        }

        return extractedDoc.save();
    }

    const extractPagesByRange = async (pdfBuffer: Uint8Array, rangeStart: number, rangeEnd: number) => {
        const pdfDoc = await PDFDocument.load(pdfBuffer);
        const extractedDoc = await PDFDocument.create();

        for (let i = rangeStart; i <= rangeEnd; i++) {
            if (i >= 1 && i <= pdfDoc.getPageCount()) {
                const [copiedPage] = await extractedDoc.copyPages(pdfDoc, [i - 1]);
                extractedDoc.addPage(copiedPage);
            }
        }

        return extractedDoc.save();
    }

    return {
        countPages,
        extractRandomPages,
        extractPagesByRange
    }

}

type PdfService = typeof pdfService
export default PdfService