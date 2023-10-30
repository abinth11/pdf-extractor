import { v4 as uuidv4 } from 'uuid';
import { PDFDocument } from 'pdf-lib';

export const createRandomFileName = () => uuidv4()


export async function countPagesInPDF(pdfBytes: Uint8Array): Promise<number> {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pageCount = pdfDoc.getPages().length;
    return pageCount;
}
