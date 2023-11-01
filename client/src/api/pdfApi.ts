import { AxiosResponse } from "axios";
import { Pdf } from "./abstract";
import { axiosAuthorized, axiosInstance } from "./config";

class PdfApi extends Pdf {
    constructor() {
        super()
    }
    async uploadPdf(file: File): Promise<AxiosResponse> {
        try {
            const formData = new FormData()
            formData.append('pdf', file)
            const response = await axiosInstance.post(this.EndPoints.UPLOAD, formData)
            return response.data
        } catch (err) {
            throw err
        }
    }

    async fetchPdfById(id: string): Promise<AxiosResponse<ArrayBuffer>> {
        try {
            const response = await axiosInstance.get(`${this.EndPoints.FETCH_PDF}/${id}`, { responseType: 'blob' })
            return response
        } catch (err) {
            throw err
        }
    }

    async extractPages(pdfId: string, pages: number[] | { from: number; to: number; }): Promise<AxiosResponse<ArrayBuffer>> {
        try {
            const response = await axiosInstance.post(`${this.EndPoints.EXTRACT_PAGES}/${pdfId}`, pages, { responseType: 'blob' })
            return response
        } catch (err) {
            throw err
        }

    }

    async fetchSaved(): Promise<AxiosResponse<any, any>> {
        try {
            const response = await axiosAuthorized.get(this.EndPoints.FETCH_ALL_SAVED)
            return response
        } catch (err) {
            throw err
        }

    }

    async savePdf(pdfId: string): Promise<AxiosResponse<any, any>> {
        try {
            const response = await axiosAuthorized.post(this.EndPoints.SAVE_PDF,{pdfId})
            return response
        } catch (err) {
            throw err
        }
    }

}

export default PdfApi