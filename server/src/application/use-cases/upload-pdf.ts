import { createWriteStream } from 'fs';
import { Readable } from 'stream';
import { resolve } from 'path';
import { createRandomFileName } from '../../utils/helper-functions';
import AppError from '../../utils/app-error';
import HttpStatusCodes from '../../constants/http-status-codes';

export const uCUploadPdfFile = async (fileBuffer: Buffer) => {
    const destFileName = createRandomFileName()+".pdf"
    const destFilePath = resolve(__dirname, '../../../public', 'uploads', destFileName);
    return new Promise((resolve, reject) => {
        const readStream = new Readable();
        readStream.push(fileBuffer);
        readStream.push(null);

        const writeStream = createWriteStream(destFilePath);

        readStream.pipe(writeStream);

        writeStream.on('error', (err) => {
            console.error('Error writing destination file:', err);
            reject(new AppError("Failed to upload the file", HttpStatusCodes.INTERNAL_SERVER_ERROR));
        });

        writeStream.on('finish', () => {
            console.log('File has been saved to:', destFilePath);
            resolve(destFileName);
        });
    });
};
