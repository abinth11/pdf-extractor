
export interface PagesObj {
    from:number;
    to:number
}

export type IPages = number[] | PagesObj;

export interface IPdf {
    userId:string;
    pdfId:string;
    saved:string[];
    createdAt?:Date;
    updatedAt?:Date;
}