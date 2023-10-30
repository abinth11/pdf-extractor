import { AxiosResponse } from "axios";
import { FormValues } from "../types/form-value";

export abstract class Auth {
    protected EndPoints = {
        SIGN_IN: '/api/v1/auth/sign-in',
        SIGN_UP: '/api/v1/auth/sign-up'
    }
    constructor() { }
    abstract signUp(userInfo: FormValues): void;
    abstract signIn(userInfo: FormValues): void;
}

export abstract class Pdf {
    protected EndPoints = {
        UPLOAD:'/api/v1/pdf/upload',
        FETCH_PDF:'/api/v1/pdf',
        EXTRACT_PAGES:'/api/v1/pdf/extract-pages'
    }
    constructor(){}
    abstract uploadPdf(file:File):Promise<AxiosResponse>
    abstract fetchPdfById(id:string):Promise<AxiosResponse<ArrayBuffer>>
    abstract extractPages(pdfId:string,pages:number[]|{from:number,to:number}):Promise<AxiosResponse>
}
