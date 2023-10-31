import { model,Schema, Types } from "mongoose";

const pdfSchema = new Schema({
    userId:{
        type:Types.ObjectId,
        required:true,
        ref:"user"
    },
    saved:{
        type:Array<String>,
        default:[],
    },
    createdAt:{
        type:Date,
        required:true
    },
    updatedAt:{
        type:Date,
        required:true
    }
})

const ExtractedPdf = model("extracted-pdf",pdfSchema)
export default ExtractedPdf