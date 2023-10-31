import { IPdf } from "@src/types/pdf";

class PDF {
    userId:string;
    pdfId: string;
    createdAt: Date;
    updatedAt: Date;
    constructor({ userId,pdfId }: IPdf) {
        this.pdfId = pdfId;
        this.userId = userId;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

export default PDF;
