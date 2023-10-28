import fs from 'fs/promises';
import { exec } from 'child_process';

export const uCUploadPdfFile = async (fileBuffer: Buffer) => {

    // Define the path for the compressed PDF (output file)
    const compressedPdfPath = 'compressed.pdf';

    // Run Ghostscript to compress the PDF
    const gsCommand = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/printer -dNOPAUSE -dBATCH -dQUIET -sOutputFile=${compressedPdfPath} -`;
    const gsProcess = exec(gsCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Error during PDF compression:', error);
        } else {
            console.log('PDF compression successful.');
        }
    });

    // Write the PDF content to the Ghostscript process
    if (gsProcess.stdin) {
        gsProcess.stdin.write(fileBuffer);
        gsProcess.stdin.end();
    }

    // Wait for the process to complete (optional)
    await new Promise((resolve) => gsProcess.on('close', resolve));

    // Read the compressed PDF
    const compressedPdfBuffer = await fs.readFile(compressedPdfPath);

    // Save the compressed PDF
    await fs.writeFile('compressed.pdf', compressedPdfBuffer);

    // Cleanup temporary files if needed
    await fs.unlink(compressedPdfPath);
};