import { IPdf } from "@src/types/pdf";

class PDF {
    userId:string;
    pdfId: string;
    createdAt: Date;
    updatedAt: Date;
    saved:string[];
    constructor({ userId,pdfId,saved }: IPdf) {
        this.pdfId = pdfId;
        this.userId = userId;
        this.saved = saved
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

export default PDF;
